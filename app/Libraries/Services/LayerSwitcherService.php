<?php

namespace App\Libraries\Services;

use App\Libraries\Repositories\LayerSwitcherRepository;

class LayerSwitcherService
{
    private LayerSwitcherRepository $layerSwitcherRepository;

    public function __construct()
    {
        $this->layerSwitcherRepository = new LayerSwitcherRepository();
    }

    public function getAll()
    {
        try {
            return $this->layerSwitcherRepository->getAll();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function show($id)
    {
        try {
            return $this->layerSwitcherRepository->findById($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function store(string $title, string $name)
    {
        try {
            return $this->layerSwitcherRepository->store($title, $name, $this->generateLinkMapfile($name));
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function update($id, string $title, string $name)
    {
        try {
            return $this->layerSwitcherRepository->update($id, $title, $name, $this->generateLinkMapfile($name));
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function destroy($id)
    {
        try {
            return $this->layerSwitcherRepository->destroy($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function generateLinkMapfile($fileName)
    {
        return base_url("mapfiles/$fileName.map");
    }
}
