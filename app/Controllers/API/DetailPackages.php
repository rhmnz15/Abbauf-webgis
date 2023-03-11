<?php

namespace App\Controllers\API;

use App\Models\DetailPackageModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class DetailPackages extends ResourceController
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
            $model = new DetailPackageModel();
            return $this->respond($model->orderBy('created_at', 'DESC')->findAll());
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage());
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

            $model          = new DetailPackageModel();
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
            $model = new DetailPackageModel();
            $data['detail_packages'] = $model->find(['id' => $id]);
            
            if(!$data) {
                $response = [
                    'status' => 404,
                    'error'  => 404,
                    'messages'=> [
                        'error' => 'Not Found'
                        ]
                    ];
    
                return $this->respond($response);
            };

            return $this->respond($data[0]);
        } catch (\Throwable $th) {
            return $this->fail('Fail to get data');
        }
    }

    /**
     * Return a new resource object, with default properties
     *
     * @return mixed
     */
    public function new()
    {
        //
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        try {
            $model = new DetailPackageModel();
            $data = [
                'package_id' => $this->request->getVar('package_id'),
                'feature_name' => $this->request->getVar('feature_name')
            ];
    
            $model->save($data);
    
            $response = [
                'status' => 200,
                'error'  => null,
                'message'=> [
                    'success' => 'Inserted'
                    ]
                ];
    
            return $this->respondCreated($response);
        } catch (\Throwable $th) {
            return $this->fail('Fail to insert');
        }
    }

    /**
     * Return the editable properties of a resource object
     *
     * @return mixed
     */
    public function edit($id = null)
    {
        //
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        try {
            $model = new DetailPackageModel();
            $data = [
                'package_id' => $this->request->getVar('package_id'),
                'feature_name' => $this->request->getVar('feature_name')
            ];
    
            $findById = $model->find(['id' => $id]);
    
            if(!$findById) {
                $response = [
                    'status' => 404,
                    'error'  => 404,
                    'messages'=> [
                        'error' => 'Not Found'
                        ]
                    ];
    
                return $this->respond($response);
            };
    
            $model->update($id, $data);
    
            $response = [
                'status' => 200,
                'error'  => null,
                'message'=> [
                    'success' => 'Updated'
                    ]
                ];
    
            return $this->respond($response);
        } catch (\Throwable $th) {
            return $this->fail('Fail to update');
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
            $model = new DetailPackageModel();
            $findById = $model->find(['id' => $id]);
    
            if(!$findById) {
                $response = [
                    'status' => 404,
                    'error'  => 404,
                    'messages'=> [
                        'error' => 'Not Found'
                        ]
                    ];
                return $this->respond($response);
            };
    
            $model->delete($id);
    
            $response = [
                'status' => 200,
                'error'  => null,
                'message'=> [
                    'success' => 'Deleted'
                    ]
                ];
    
            return $this->respondDeleted($response);
        } catch (\Throwable $th) {
            return $this->fail('Fail to insert');
        }
    }
}
