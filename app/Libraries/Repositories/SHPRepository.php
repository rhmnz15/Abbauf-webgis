<?php

namespace App\Libraries\Repositories;

use App\Libraries\Traits\SHPTrait;
use App\Models\SHPModel;

class SHPRepository
{
    use SHPTrait;

    private SHPModel $shpModel;

    /**
     * Instanciate Model
     *
     * @return void
     */
    public function __construct()
    {
        $this->shpModel = new SHPModel();
    }

    public function findById($id)
    {
        try {
            $shp = $this->shpModel->find($id);
            if (!$shp) {
                throw new \Exception('Data tidak ditemukan');
            }
            return $shp;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function getAll(): array
    {
        try {
            return $this->shpModel->findAll();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Menampilkan SHP
     *
     * @param  mixed $id
     * @return void
     */
    public function show($id)
    {
        try {
            $shp = $this->shpModel->find($id);
            if (!$shp) {
                throw new \Exception('Data tidak ditemukan', 404);
            }
            return $shp;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function store($user_id, $name, $type, $tableName, $status)
    {
        try {
            return $this->shpModel->insert([
                'user_id' => $user_id,
                'name' => $name,
                'type' => $type,
                'table_name' => $tableName,
                'status' => $status
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function update($id, $user_id, $name, $type, $tableName, $status)
    {
        try {
            return $this->shpModel->update($id, [
                'user_id' => $user_id,
                'name' => $name,
                'type' => $type,
                'table_name' => $tableName,
                'status' => $status
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Menghapus SHP
     *
     * @param  mixed $id
     * @return void
     */
    public function destroy($id)
    {
        try {
            return $this->shpModel->delete($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}