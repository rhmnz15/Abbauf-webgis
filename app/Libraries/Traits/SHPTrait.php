<?php

namespace App\Libraries\Traits;

use App\Models\SHPModel;
use CodeIgniter\I18n\Time;
use ZipArchive;

/**
 * 
 */
trait SHPTrait
{
    protected $SHP_DIR = FCPATH . "shp";
    protected $SHP_DIR_RESULTS = FCPATH . "shp/results/";
    protected $MAPFILE_DIR = FCPATH . "/mapfiles";
    protected $tableName;

    /**
     * Memulai proses generate MapFile
     *
     * @param mixed $file
     * @param mixed $name
     * @param mixed $type
     * @return void
     */
    public function process($file, $name, $type)
    {
        try {
            $file = $this->extractZip($file);
            if ($file) {
                $this->importFilesBySHPExtension();
                $this->resetAllFiles();
                // $this->generateMapFile($name, $type);
            } else {
                $this->resetAllFiles();
                throw new \Exception('File SHP tidak ditemukan');
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * dropTable
     *
     * @param  mixed $tableName
     * @return void
     */
    public function dropTable($tableName)
    {
        try {
            $db = db_connect();
            return $db->query("DROP TABLE $tableName");
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * destroyMapFile
     *
     * @param  mixed $mapfile
     * @return void
     */
    public function destroyMapFile($mapfile)
    {
        try {
            return unlink($this->MAPFILE_DIR . "/$mapfile.map");
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function extractZip($fileName)
    {
        try {
            $zip = new ZipArchive;
            if ($zip->open($this->SHP_DIR . "/$fileName.zip") === TRUE) {
                $zip->extractTo($this->SHP_DIR . '/results');
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
            $myfiles = array_diff(scandir($this->SHP_DIR_RESULTS), array('.', '..'));
            $result = array_merge([], $myfiles);
            foreach ($result as $val) {
                if (explode('.', $val)[1] == 'shp') {
                    if (count(explode(' ', $val)) > 1) {
                        $this->resetAllFiles();
                        throw new \Exception('Nama file SHP tidak boleh ada sepasi');
                    }
                    $this->executeImportSHPFile($val);
                }
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Membuat nama table random
     *
     * @return void
     */
    private function generateTableName()
    {
        try {
            $date = new Time('now', 'Asia/Jakarta', 'id_ID');
            return $date->format('Y-m-d-H:i:s');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * executeImportSHPFile
     *
     * @param  mixed $file_name
     * @return void
     */
    public function executeImportSHPFile($file_name)
    {
        try {
            // $type = 'MULTIPOLYGON';
            // $shp_name = '';
            $hostname = env('database.default.hostname');
            $dbname = env('database.default.database');
            $username = env('database.default.username');
            $password = env('database.default.password');
            $this->tableName = $this->generateTableName();
            $arr = explode(':', $this->SHP_DIR_RESULTS);
            $file = implode(':\\', $arr).$file_name;
            exec("ogr2ogr -f PostgreSQL PG:\"host='{$hostname}' user='{$username}' dbname='{$dbname}' password='{$password}'\" -lco FID=gid -lco GEOMETRY_NAME=geom -nln {$this->tableName} -nlt GEOMETRY $file", $output);
            // ogr2ogr -f PostgreSQL PG:"host='localhost' user='postgres' dbname='test' password='postgres'" -nln test_table -nlt GEOMETRY C:\xampp-v8.0\htdocs\codeigniter4\webgis\public\shp/results/gis_osm_natural_free_1.shp
            // ogr2ogr -f PostgreSQL PG:"host='localhost' user='postgres' dbname='test' password='postgres'" -lco FID=id -lco GEOMETRY_NAME=geom -nln test_table -nlt GEOMETRY C:\xampp-v8.0\htdocs\codeigniter4\webgis\public\shp/results/gis_osm_natural_free_1.shp
            // exec(`ogr2ogr -f PostgreSQL -sql "SELECT ISO2, NAME AS country_name FROM wborders WHERE REGION = 2" -nlt {$type} PG:"dbname='{$dbname}' user='{$username}' password='{$password}'" -nln africa_countries -lco SCHEMA=chp01 -lco GEOMETRY_NAME={$shp_name} {$file_name}`);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * generateMapFile
     *
     * @param  mixed $name
     * @param  mixed $type
     * @return void
     */
    private function generateMapFile($name, $type)
    {
        try {
            $hostname = env('database.default.hostname');
            $dbname = env('database.default.database');
            $username = env('database.default.username');
            $password = env('database.default.password');
            $port = env('database.default.port');
            $tpl = "
            LAYER
                METADATA
                    \"DESCRIPTION\" \"$name\"
                    \"wms_title\" \"$name\"
                    \"wms_enable_request\" \"*\"
                    \"ows_name\" \"$name\"
                    \"ows_srs\" \"EPSG:4326\"
                    \"gml_include_items\" \"all\"
                    \"gml_featureid\" \"gid\"
                    \"ows_enable_request\" \"*\"
                END

                PROJECTION
                    \"init=epsg:4326\"
                END

                NAME \"$name\"
                CONNECTIONTYPE postgis
                CONNECTION \"user=$username dbname=$dbname host=$hostname port=$port password=$password\"
                DATA \"geom FROM $name using unique gid using srid=4326\"
                TYPE $type
                STATUS ON

                CLASS
                    NAME \"$name\"
                    STYLE
                        COLOR \"#DF2E2E\"
                        OUTLINECOLOR 0 0 0
                        LINECAP BUTT
                        TRANSPARENCY 50
                        WIDTH 2
                        PATTERN
                            1 4
                        END
                    END
                END

                PROCESSING \"CLOSE_CONNECTION=DEFER\"

            END
            ";
            $handle = fopen($this->MAPFILE_DIR . "/" . $this->tableName . ".map", 'a');
            fwrite($handle, $tpl);
            fclose($handle);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Menghapus semua file yang terdapat di directory shp
     *
     * @return void
     */
    private function resetAllFiles()
    {
        try {
            $files = array_merge(glob($this->SHP_DIR . "/*"), glob($this->SHP_DIR_RESULTS . "/*")); // get all file names
            foreach ($files as $file) { // iterate files
                if (is_file($file)) {
                    unlink($file); // delete file
                }
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * getSHPDir
     *
     * @return string
     */
    public function getSHPDir(): string
    {
        try {
            return $this->SHP_DIR;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * getTableName
     *
     * @return string
     */
    public function getTableName(): string
    {
        try {
            return $this->tableName;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * mergeLinkMapFile
     *
     * @param array|SHPModel $shp
     * @return array
     */
    public function mergeLinkMapFile(array|SHPModel $shp): array
    {
        try {
            return array_merge($shp, [
                'mapfile' => base_url("mapfiles/{$shp['table_name']}.map")
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}