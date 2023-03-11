<?php

namespace App\Controllers\API;

use App\Libraries\Repositories\LayerRepository;
use App\Models\LayerModel;
use CodeIgniter\RESTful\ResourceController;

class Layers extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        try {
            $layer = new LayerModel();
            $layer->join('points', 'layers.id = points.layer_id', 'left');
            $layer->join('linestrings', 'layers.id = linestrings.layer_id', 'left');
            $layer->join('polygons', 'layers.id = polygons.layer_id', 'left');
            return $this->respond($layer->findAll());
        } catch (\Throwable $th) {
            return $this->fail('Ooops!, Ada kesalahan');
        }
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        try {
            $model = new LayerModel();
            $layer = $model->find($id);
            if (!$layer) {
                return $this->failNotFound("Data tidak ditemukan");
            }
            return $this->respond($layer);
        } catch (\Throwable $th) {
            return $this->fail('Ooops!, Terjadi kesalahan');
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
                'wkt' => 'required',
                'attribute' => 'required'
            ]);

            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }

            $type = strtolower($this->request->getVar('type'));
            if (!in_array($type, ['point', 'polygon', 'linestring'])) {
                return $this->fail([
                    'type' => "Type yang dipilih tidak ada dipilihan ['point', 'polygon', 'linestring']"
                ]);
            }

            $attribute = json_encode($this->request->getVar('attribute'));
            if (!$this->isJSON($attribute)) {
                return $this->fail([
                    'attribute' => "Attribute harus berbentuk json"
                ]);
            }

            LayerRepository::store(
                session()->auth['user_id'],
                $this->request->getVar('name'),
                $type,
                $attribute,
                $this->request->getVar('wkt')
            );

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
                'name' => 'required',
                'type' => 'required',
                'wkt' => 'required',
                'attribute' => 'required'
            ]);
            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }
            $type = strtolower($this->request->getVar('type'));
            if (!in_array($type, ['point', 'polygon', 'linestring'])) {
                return $this->fail([
                    'type' => "Type yang dipilih tidak ada dipilihan ['point', 'polygon', 'linestring']"
                ]);
            }

            $attribute = json_encode($this->request->getVar('attribute'));
            if (!$this->isJSON($attribute)) {
                return $this->fail([
                    'attribute' => "Attribute harus berbentuk json"
                ]);
            }

            LayerRepository::update(
                $id,
                session()->auth['user_id'],
                $this->request->getVar('name'),
                $type,
                $attribute,
                $this->request->getVar('wkt')
            );
            
            return $this->respondUpdated();
        } catch (\Throwable $th) {
            return $this->fail('Ooops!, Terjadi kesalahan');
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
            $model = new LayerModel();
            $layer = $model->find($id);
            if (!$layer) {
                return $this->failNotFound("Data tidak ditemukan");
            }
            $model->delete($id);
            return $this->respondDeleted([
                "message" => "Data berhasil dihapus"
            ]);
        } catch (\Throwable $th) {
            return $this->fail('Ooops!, Terjadi kesalahan');
        }
    }

    function isJSON($string)
    {
        return is_string($string) && is_array(json_decode($string, true)) && (json_last_error() == JSON_ERROR_NONE) ? true :
            false;
    }
}