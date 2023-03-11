<?php

namespace App\Controllers\API;

use App\Libraries\Services\LayerSwitcherService;
use App\Models\LayerSwitcherModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class LayerSwitchers extends ResourceController
{
    use ResponseTrait;

    private LayerSwitcherService $layerSwitcherService;

    public function __construct()
    {
        $this->layerSwitcherService = new LayerSwitcherService();
    }

    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        try {
            return $this->respond($this->layerSwitcherService->getAll());
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage(), 400, $th->getCode());
        }
    }

    public function indexAjax()
    {
        $param['draw'] = isset($_REQUEST['draw']) ? $_REQUEST['draw'] : '';
        $start = isset($_REQUEST['start']) ? $_REQUEST['start'] : '';
        $length = isset($_REQUEST['length']) ? $_REQUEST['length'] : '';
        $searchValue = isset($_REQUEST['search']['value']) ? $_REQUEST['search']['value'] : '';

        $model = new LayerSwitcherModel();
        $data = $model->searchAndDisplay($searchValue, $start, $length);
        $totalCount = $model->searchAndDisplay($searchValue);

        $jsonData = [
            'draw' => intval($param['draw']),
            'recordsTotal' => count($totalCount),
            'recordsFiltered' => count($totalCount),
            'data' => $data
        ];

        return json_encode($jsonData);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        try {
            return $this->respond($this->layerSwitcherService->show($id));
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage(), 400, $th->getCode());
        }
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        try {
            $valid = $this->validate([
                'name' => 'required',
                'title' => 'required'
            ]);

            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }

            $this->layerSwitcherService->store(
                $this->request->getVar('title'),
                $this->request->getVar('name')
            );

            return $this->respondCreated([
                "message" => "Data berhasil disimpan"
            ]);
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage(), 400, $th->getCode());
        }
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        try {
            $valid = $this->validate([
                'name' => 'required',
                'title' => 'required'
            ]);

            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }

            $this->layerSwitcherService->update(
                $id,
                $this->request->getVar('title'),
                $this->request->getVar('name')
            );

            return $this->respondUpdated($this->layerSwitcherService->show($id));
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage(), 400, $th->getCode());
        }
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        try {
            $this->layerSwitcherService->destroy($id);
            return $this->respondDeleted([
                "message" => "Data berhasil dihapus"
            ]);
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage(), 400, $th->getCode());
        }
    }
}
