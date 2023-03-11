<?php

namespace App\Controllers\API;

use App\Models\FeatureModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class Features extends ResourceController
{
    use ResponseTrait;
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        try {
            $model = new FeatureModel();
            return $this->respond($model->findAll());
        } catch (\Throwable $th) {
            return $this->fail('Ooops!, terjadi kesahalan');
        }
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */

    public function indexAjax()
    {
        try {
            $param['draw'] = isset($_REQUEST['draw']) ? $_REQUEST['draw'] : '';
            $start = isset($_REQUEST['start']) ? $_REQUEST['start'] : '';
            $length = isset($_REQUEST['length']) ? $_REQUEST['length'] : '';
            $searchValue = isset($_REQUEST['search']['value']) ? $_REQUEST['search']['value'] : '';

            $model          = new FeatureModel();
            $data           = $model->searchAndDisplay($searchValue, $start, $length);
            $totalCount     = $model->searchAndDisplay($searchValue);
    
            $jsonData = [
                'draw'              => intval($param['draw']),
                'recordsTotal'      => count($totalCount),
                'recordsFiltered'   => count($totalCount),
                'data'              => $data
            ];
    
            return json_encode($jsonData);
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage());
        }
    }

    public function show($id = null)
    {
        try {
            $model = new FeatureModel();
            $feature = $model->find($id);
            if (!$feature) {
                return $this->failNotFound('Data tidak ditemukan');
            }
            return $this->respond($feature);
        } catch (\Throwable $th) {
            return $this->fail('Ooops!, terjadi kesahalan');
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
                'name' => 'required'
            ]);
            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }
            $model = new FeatureModel();
            $model->insert(['name' => $this->request->getVar('name')]);
            return $this->respondCreated([
                "message" => "Data berhasil disimpan"
            ]);
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage());
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
                'name' => 'required'
            ]);
            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }
            $model = new FeatureModel();
            $feature = $model->find($id);
            if (!$feature) {
                return $this->failNotFound('Data tidak ditemukan');
            }
            $model->update($id, ['name' => $this->request->getVar('name')]);
            return $this->respondUpdated($model->find($id));
        } catch (\Throwable $th) {
            return $this->fail('Ooops!, terjadi kesahalan');
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
            $model = new FeatureModel();
            $feature = $model->find($id);
            if (!$feature) {
                return $this->failNotFound('Data tidak ditemukan');
            }
            $model->delete($id);
            return $this->respondDeleted([
                'message' => 'Data berhasil dihapus'
            ]);
        } catch (\Throwable $th) {
            return $this->fail('Ooops!, terjadi kesahalan');
        }
    }
}