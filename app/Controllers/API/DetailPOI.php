<?php

namespace App\Controllers\API;

use App\Libraries\Repositories\DetailPOIRepository;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\Response;
use CodeIgniter\RESTful\ResourceController;

class DetailPOI extends ResourceController
{
    use ResponseTrait;

    public function __construct()
    {
        $this->detailPOIRepository = new DetailPOIRepository();
    }
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        try {
            return $this->respond($this->detailPOIRepository->getAll());
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage());
        }
    }

    /**
     * mengambil data detail poi berdasarkan poi_id
     *
     * @param  mixed $poi_id
     * @return Response
     */
    public function getDetailPOIByPOIId($poi_id): Response
    {
        try {
            return $this->respond($this->detailPOIRepository->getDetailPOIsByPOIId($poi_id));
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
            return $this->respond($this->detailPOIRepository->show($id));
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage());
        }
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
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
        //
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        try {
            $poi = $this->detailPOIRepository->show($id);
            if (!$poi) {
                return $this->failNotFound("Data tidak ditemukan");
            }
            $this->detailPOIRepository->destroy($id);
            return $this->respondDeleted([
                "message" => "Data berhasil dihapus"
            ]);
        } catch (\Throwable $th) {
            return $this->fail('Ooops!, Terjadi kesalahan');
        }
    }
}