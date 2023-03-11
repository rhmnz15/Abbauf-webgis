<?php

namespace App\Controllers\API;
use CodeIgniter\RESTful\ResourceController;

class UploadShp extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        try{

            $model = new SHPModel();
            $data = $model->orderBy('created_at', 'DESC')->findAll();
            return $this->respond($data);
        }catch (\Throwable $th) {
            return $this->fail('Ooops!, terjadi kesahalan');
        }
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        try{

            $model = new SHPModel();
            $data = $model->find(['id' => $id]);
            if(!$data) return $this->failNotFound('Data Tidak Ditemukan');
            return $this->respond($data[0]);
        }catch (\Throwable $th) {
          return $this->fail('Fail to get data by id'); 
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
                // 'name' => 'required',
                // 'price' => 'required',
                // 'status' => 'required',
                // 'category' => 'required'

                'name' => 'required',
                'type' => 'required',
                'table_name' => 'required',
                'status' => 'required'
            ]);
            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }
             $user_id_uri = session('auth')['user_id'];

            $model = new SHPModel();
            $model->insert([
                'user_id' => $this->request->session(  )->getVar('user_id'),
                'name' => $this->request->getVar('name'),
                'type' => $this->request->getVar('table_name'),
                'status' => $this->request->getVar('status')
            ]);
            return $this->respondUpdated([
                "message" => "Data berhasil disimpan"
            ]);
        } catch (\Throwable $th) {
            return $this->fail('data gagal tersimpan');
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
                // 'name' => 'required',
                // 'price' => 'required',
                // 'status' => 'required',
                // 'category' => 'required'

                'name' => 'required',
                'type' => 'required',
                'table_name' => 'required',
                'status' => 'required'
            ]);
            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }
             $user_id_uri = session('auth')['user_id'];

            $model = new SHPModel();
            $model->insert([
                'user_id' => $this->request->session($user_id_uri)->getVar('user_id'),
                'name' => $this->request->getVar('name'),
                'type' => $this->request->getVar('table_name'),
                'status' => $this->request->getVar('status')
            ]);
            return $this->respondCreated([
                "message" => "Data berhasil disimpan"
            ]);
        } catch (\Throwable $th) {
            return $this->fail('data gagal tersimpan');
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
            $model = new SHPModel();
            $shp = $model->find($id);
            if (!$shp) {
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
