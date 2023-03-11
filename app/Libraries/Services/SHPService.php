<?php

namespace App\Libraries\Services;

use App\Libraries\Repositories\SHPRepository;
use CodeIgniter\HTTP\Files\UploadedFile;
use CodeIgniter\I18n\Time;
use ZipArchive;

class SHPService
{
    const SHP_DIR           = FCPATH . "shp/";
    const SHP_DIR_RESULTS   = self::SHP_DIR . "results/";
    const MAP_FILE_DIR      = FCPATH . "mapfiles/";
    const MAP_FILE_TEMPLATE = self::MAP_FILE_DIR . "template.map";

    private $hostname;
    private $database;
    private $username;
    private $password;
    private $port;

    private string $tableName;
    private string $pathResult;

    private SHPRepository $shpRepository;

    public function __construct()
    {
        $this->shpRepository    = new SHPRepository();
        $this->hostname         = env('database.default.hostname');
        $this->database         = env('database.default.database');
        $this->username         = env('database.default.username');
        $this->password         = env('database.default.password');
        $this->port             = env('database.default.port');
    }

    public function getAll()
    {
        try {
            $data = [];
            foreach ($this->shpRepository->getAll() as $shp) {
                $data[] = $this->mergeLinkMapFile($shp);
            }
            return $data;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function show($id)
    {
        try {
            return $this->mergeLinkMapFile($this->shpRepository->show($id));
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function store(UploadedFile $file, $user_id, $name, $type, $status)
    {
        try {
            if ($file->isValid() && !$file->hasMoved()) {
                $fileName = $file->getRandomName();
                $a = $file->move(self::SHP_DIR, $fileName);
            } else {
                throw new \Exception('File tidak valid');
            }

            $this->tableName = $this->generateTableName();
            if (!$this->extractZip($fileName)) {throw new \Exception('File gagal di extract');
            }

            $this->importFilesBySHPExtension();
            $this->resetAllFiles();

            if ($type == 1) $typestr = "POINT";
            elseif ($type == 2) $typestr = "POLYGON";
            else $typestr = "LINESTRING";

            $this->generateMapFile($this->tableName, [
                'name' => $name,
                'tableName' => $this->tableName,
                'type' => $typestr,
            ]);
            return $this->shpRepository->store($user_id, $name, $type, $this->tableName, $status);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function update($id, UploadedFile $file, $user_id, $name, $type, $status)
    {
        try {
            $shp = $this->shpRepository->findById($id);
            $this->destroyMapFile($shp['table_name']);
            $this->dropTable($shp['table_name']);

            if ($file->isValid() && !$file->hasMoved()) {
                $fileName = $file->getRandomName();
                $file->move(self::SHP_DIR, $fileName);
            } else {
                throw new \Exception('File tidak valid');
            }
            
            $this->tableName = $this->generateTableName();
            if (!$this->extractZip($fileName)) {
                throw new \Exception('File gagal di extract');
            }

            $this->importFilesBySHPExtension();
            $this->resetAllFiles();

            if ($type == 1) $typestr = "POINT";
            elseif ($type == 2) $typestr = "POLYGON";
            else $typestr = "LINESTRING";

            $this->generateMapFile($this->tableName, [
                'name' => $name,
                'tableName' => $this->tableName,
                'type' => $typestr,
            ]);
            
            return $this->shpRepository->update($id, $user_id, $name, $type, $this->tableName, $status);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function destroy($id)
    {
        try {
            $shp = $this->shpRepository->findById($id);
            $this->destroyMapFile($shp['table_name']);
            $this->dropTable($shp['table_name']);
            return $this->shpRepository->destroy($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * extractZip
     *
     * @param string $fileName
     * @return bool
     */
    public function extractZip($fileName): bool
    {
        try {
            $zip = new ZipArchive;
            if ($zip->open(self::SHP_DIR . $fileName) === TRUE) {
                $zip->extractTo(self::SHP_DIR_RESULTS);
                $zip->close();
                return true;
            }
            return false;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function importFilesBySHPExtension()
    {
        try {
            $myfiles    = array_diff(scandir(self::SHP_DIR_RESULTS), array('.', '..'));
            $result     = array_merge([], $myfiles);
            foreach ($result as $val) {
                if (explode('.', $val)[1] == 'shp') {
                    if (count(explode(' ', $val)) > 1) {
                        $this->resetAllFiles();
                        throw new \Exception('Nama file SHP tidak boleh ada sepasi');
                    }
                    return $this->executeImportSHPFile($val);
                }
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    private function resetAllFiles()
    {
        try {
            $files = array_merge(glob(self::SHP_DIR . ""), glob(self::SHP_DIR_RESULTS . "")); // get all file names
            foreach ($files as $file) { // iterate files
                if (is_file($file)) {
                    unlink($file); // delete file
                }}
            } catch (\Throwable $th) {
                throw $th;
            }
        }
    
        public function executeImportSHPFile($fileName)
        {
            try {
                $hostname   = $this->hostname;
                $dbname     = $this->database;
                $username   = $this->username;
                $password   = $this->password;
                $arr        = explode(':', self::SHP_DIR_RESULTS);
                $file       = implode(':\\', $arr) . $fileName;
    
                exec("shp2pgsql -I -s 4326 -c {$file} {$this->tableName}", $output, $return);
                $db = db_connect();
                if (!$return) {
                    $sql = "";
                    for ($i = 0; $i < count($output); $i++) {
                        $sql .= $output[$i];
                    }
                    $db->query($sql);
                }
    
                // exec("ogr2ogr -f PostgreSQL PG:\"host='{$hostname}' user='{$username}' dbname='{$dbname}' password='{$password}'\" -lco FID=gid -lco GEOMETRY_NAME=geom -nln {$this->tableName} -nlt GEOMETRY $file", $output);
                // return "ogr2ogr -f PostgreSQL PG:\"host='{$hostname}' user='{$username}' dbname='{$dbname}' password='{$password}'\" -lco FID=gid -lco GEOMETRY_NAME=geom -nln {$this->tableName} -nlt GEOMETRY $file";
                // ogr2ogr -f PostgreSQL PG:"host='localhost' user='postgres' dbname='test' password='postgres'" -nln test_table -nlt GEOMETRY C:\xampp-v8.0\htdocs\codeigniter4\webgis\public\shp/results/gis_osm_natural_free_1.shp
                // ogr2ogr -f PostgreSQL PG:"host='localhost' user='postgres' dbname='test' password='postgres'" -lco FID=id -lco GEOMETRY_NAME=geom -nln test_table -nlt GEOMETRY C:\xampp-v8.0\htdocs\codeigniter4\webgis\public\shp/results/gis_osm_natural_free_1.shp
                // exec(`ogr2ogr -f PostgreSQL -sql "SELECT ISO2, NAME AS country_name FROM wborders WHERE REGION = 2" -nlt {$type} PG:"dbname='{$dbname}' user='{$username}' password='{$password}'" -nln africa_countries -lco SCHEMA=chp01 -lco GEOMETRY_NAME={$shp_name} {$fileName}`);
            } catch (\Throwable $th) {
                throw $th;
            }
        }
    
        private function generateTableName()
        {
            try {
                $date = new Time('now', 'Asia/Jakarta', 'id_ID');
                return $date->format('YmdHis');
            } catch (\Throwable $th) {
                throw $th;
            }
        }
    
        /**
         * generateMapFile
         *
         * @param string $fileMapName
         * @param array $vars
         * @return int
         */
        public function generateMapFile(string $fileMapName, array $vars): int|false
        {
            try {
                $handle = fopen(self::MAP_FILE_TEMPLATE, 'r');
                $read = fread($handle, 1000);
                fclose($handle);
                $read = $this->strReplace($read, $vars);
                return $this->writeFile($read, $fileMapName);
            } catch (\Throwable $th) {
                throw $th;
            }
        }
    
        /**
         * writeFile
         *
         * @param string $txt
         * @param string $fileMapName
         * @return int|false
         */
        public function writeFile(string $txt, string $fileMapName): int|false
        {
            try {
                $handle = fopen(self::MAP_FILE_DIR . "$fileMapName.map", 'x+');
                $write = fwrite($handle, $txt);
                fclose($handle);
                return $write;
            } catch (\Throwable $th) {
                throw $th;
            }
        }
    
        /**
         * strReplace
         *
         * @param string $text
         * @param array $vars
         * @return string
         */
        public function strReplace(string $text, array $vars): string
        {
            try {
                $vars = array_merge($vars, [
                    'username' => $this->username,
                    'dbname' => $this->database,
                    'hostname' => $this->hostname,
                    'port' => $this->port,
                    'password' => $this->password,
                ]);
                foreach ($vars as $key => $value) {
                    $text = str_replace("$$key", $value, $text);
                }
                return $text;
            } catch (\Throwable $th) {
                throw $th;
            }
        }
    
        public function mergeLinkMapFile($shp): array
        {
            try {
                return array_merge($shp, [
                    'mapfile' => base_url("mapfiles/{$shp['table_name']}.map")
                ]);
            } catch (\Throwable $th) {
                throw $th;
            }
        }
    
        public function destroyMapFile(string $mapfile)
        {
            try {
                return unlink(self::MAP_FILE_DIR . "$mapfile.map");
            } catch (\Throwable $th) {
                throw $th;
            }
        }
    
        public function dropTable(string $tableName)
        {
            try {
                $db = db_connect();
                return $db->query("DROP TABLE \"$tableName\"");
            } catch (\Throwable $th) {
                throw $th;
            }
        }
    }   