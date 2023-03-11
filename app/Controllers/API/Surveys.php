<?php

namespace App\Controllers\API;

use App\Models\SurveyModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class Surveys extends ResourceController
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
            $model = new SurveyModel();
            $model->select([
                'surveys.id',
                'surveys.user_id',
                'ST_AsText(surveys.geom) as geom',
                'surveys.survey_date',
                'surveys.created_at',
                'surveys.updated_at',
                'users.name',
                'users.email',
            ])->join('users', 'users.user_id = surveys.user_id');
            return $this->respond($model->findAll());
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage());
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
            $model = new SurveyModel();
            $survey = $model->select([
                'surveys.id',
                'surveys.user_id',
                'ST_AsText(surveys.geom) as geom',
                'surveys.survey_date',
                'surveys.created_at',
                'surveys.updated_at',
                'users.name',
                'users.email',
            ])->join('users', 'users.user_id = surveys.user_id')->find($id);
            if (!$survey) {
                return $this->failNotFound("Data tidak ditemukan");
            }
            return $this->respond($survey);
        } catch (\Throwable $th) {
            return $this->fail('Ooops!, Ada kesalahan');
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
                'wkt' => 'required',
                'survey_date' => 'required'
            ]);
            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }
            $model = new SurveyModel();
            $model->set('user_id', session()->auth['user_id']);
            $model->set('survey_date', date('Y-m-d H:i:s', strtotime($this->request->getVar('survey_date'))));
            $wkt = $this->request->getVar('wkt');
            $model->set('geom', "ST_GeomFromText('$wkt')", false);
            $model->insert();

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
                'survey_date' => 'required',
                'wkt' => 'required'
            ]);
            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }
            $model = new SurveyModel();
            $survey = $model->find($id);
            if (!$survey) {
                return $this->failNotFound("Data tidak ditemukan");
            }
            
            $model->set('user_id', session()->auth['user_id']);
            $model->set('survey_date', date('Y-m-d H:i:s', strtotime($this->request->getVar('survey_date'))));
            $wkt = $this->request->getVar('wkt');
            $model->set('geom', "ST_GeomFromText('$wkt')", false);
            $model->update($id);

            return $this->respondUpdated($model->select(['id', 'user_id', 'ST_AsText(geom) as geom', 'survey_date'])->find($id));
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
            $model = new SurveyModel();
            $survey = $model->find($id);
            if (!$survey) {
                return $this->failNotFound("Data tidak ditemukan");
            }
            $model->delete($id);
            return $this->respondDeleted([
                "message" => "Data berhasil dihapus"
            ]);
        } catch (\Throwable $th) {
            return $this->fail('Ooops!, Ada kesalahan');
        }
    }
}