<?php

namespace App\Libraries\Repositories;

use App\Models\LayerSwitcherModel;

class LayerSwitcherRepository
{
    private LayerSwitcherModel $layerSwitcherModel;

    public function __construct()
    {
        $this->layerSwitcherModel = new LayerSwitcherModel();
    }

    public function findById($id)
    {
        try {
            $layerSwitcher = $this->layerSwitcherModel->find($id);
            if (!$layerSwitcher) {
                throw new \Exception('Data tidak ditemukan', 404);
            }
            return $layerSwitcher;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function getAll()
    {
        try {
            return $this->layerSwitcherModel->findAll();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function store(string $title, string $name, string $link_mapfile)
    {
        try {
            return $this->layerSwitcherModel->insert([
                'title' => $title,
                'name' => $name,
                'link_mapfile' => $link_mapfile
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function update($id, string $title, string $name, string $link_mapfile)
    {
        try {
            return $this->layerSwitcherModel->update($id, [
                'title' => $title,
                'name' => $name,
                'link_mapfile' => $link_mapfile
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function destroy($id)
    {
        try {
            return $this->layerSwitcherModel->delete($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
