<?php

namespace App\Controllers\API;

use App\Libraries\Services\SHPService;
use App\Models\SHPModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;

class SHPs extends ResourceController
{
    use ResponseTrait;

    private SHPService $shpService;

    /**
     * Instance
     *
     * @return void
     */
    public function __construct()
    {
        $this->shpService = new SHPService();
    }

    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        try {
            $model = new UserModel();
        
            $shps=$this->shpService->getAll();
            foreach($shps as $key => $value)
            {
                
                $shps[$key]['user']=$model->find($value['user_id']);
            }
            return $this->respond($shps);
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage(), 400, $th->getCode());
        }
    }

    public function indexAjax()
    {
        $param['draw']  = isset($_REQUEST['draw']) ? $_REQUEST['draw'] : '';
        $start          = isset($_REQUEST['start']) ? $_REQUEST['start'] : '';
        $length         = isset($_REQUEST['length']) ? $_REQUEST['length'] : '';
        $searchValue    = isset($_REQUEST['search']['value']) ? $_REQUEST['search']['value'] : '';

        $model          = new SHPModel();
        $data           = $model->searchAndDisplay($searchValue, $start, $length);
        $totalCount     = $model->searchAndDisplay($searchValue);

        $jsonData = [
            'draw'              => intval($param['draw']),
            'recordsTotal'      => count($totalCount),
            'recordsFiltered'   => count($totalCount),
            'data'              => $data
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
            return $this->respond($this->shpService->show($id));
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
                'type' => 'required',
                'status' => 'required'
            ]);

            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }

            $this->shpService->store(
                $this->request->getFile('file'),
                session()->auth['user_id'],
                $this->request->getVar('name'),
                $this->request->getVar('type'),
                $this->request->getVar('status')
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
                'name' => 'required'
            ]);
            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }
            $model = new SHPModel();
            $feature = $model->find($id);
            if (!$feature) {
                return $this->failNotFound('Data tidak ditemukan');
            }
            $model->update($id, ['name' => $this->request->getVar('name')]);
            $response = [
                'status' => 200,
                'error'  => null,
                'message' => [
                    'success' => 'Data Updated'
                ]
            ];
            return $this->respond($response);
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
            $this->shpService->destroy($id);
            return $this->respondDeleted([
                "message" => "Data berhasil dihapus"
            ]);
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage(), 400, $th->getCode());
        }
    }
} 