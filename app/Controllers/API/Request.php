<?php

namespace App\Controllers\API;

use App\Models\DetailPackageModel;
use App\Models\FeatureModel;
use App\Models\PackageModel;
use App\Models\UserModel;
use App\Models\UserPackagesModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class Request extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use Responsetrait;
    public function requestPackageCustom()
    {
        try {
            $modelPackage = new PackageModel();
            $modelDetailPackage = new DetailPackageModel();
            $modelFeature = new FeatureModel();
            $id_user = htmlspecialchars(session("auth")["user_id"]);

            $json = $this->request->getJSON();
            $dataPackage = [
                'name' => $json->package_name,
                'status' => 'f',
                'category' => 'custom',
                'price' => 0,
                'user_id' => $id_user,
            ];

            $dataFeature = [
                'feature_id' => [$json->feature_id],
            ];

            $feature_id = $dataFeature['feature_id'][0];

            //validasi feature
            $indexFeature = 0;
            foreach ($feature_id as $key => $val) {
                $isExist = $modelFeature->where('id', $feature_id[$indexFeature])->get()->getResult();
                if (!$isExist) {
                    return $this->fail('ID fitur tidak ditemukan.');
                };
                $indexFeature++;
            };

            $modelPackage->insert($dataPackage);

            $package_id = $modelPackage->getInsertID();

            // push array
            $result = [];
            $index = 0;
            foreach ($feature_id as $key => $val) {
                array_push($result, array(
                    'package_id' => $package_id,
                    'feature_id' => $feature_id[$index],
                ));
                $index++;
            };

            // var_dump($result);
            $modelDetailPackage->insertBatch($result);

            $response = [
                'status' => 200,
                'error' => null,
                'messages' => [
                    'success' => 'Package created to detail_packages',
                ],
                'data' => $modelDetailPackage->affectedRows(),
            ];

            if ($modelDetailPackage->affectedRows() > 0) {
                return $this->respond($response);
            }

        } catch (\Throwable$th) {
            return $this->fail('Error 500');
        }
    }

    public function listRequestPackageUser()
    {
        try {

            $db = \Config\Database::connect();
            $builder = $db->table('packages');
            $query = $builder->select("packages.*, detail_packages.feature_id, features.name AS feature_name");
            $query = $builder->where("packages.status = 'f' AND packages.category='custom'");
            $query = $builder->join('detail_packages', 'detail_packages.package_id = packages.id');
            $query = $builder->join('features', 'features.id = detail_packages.feature_id')->get()->getResult();
            // var_dump($query);  

            // $query = $db->query("
            // SELECT DISTINCT
            //     packages.*, 
            //     detail_packages.feature_id,
            //     features.name AS feature_name
            // FROM 
            //     packages
            // WHERE 
            //     packages.status = 'f' AND packages.category='custom'
            // JOIN 
            //     detail_packages ON detail_packages.packages.id = packages.id
            // JOIN
            //     features ON features.id = detail_packages.feature_id'
              
            // ")->getResult();
             
            // var_dump($query);
            $response = [
                'status' => 200,
                'error' => null,
                'messages' => [
                    'success' => 'Successfuly get all request package from user',
                ],
                'data' => $query,
            ];

            return $this->respond($response);
        } catch (\Throwable$th) {
            return $this->fail('Error 400');
        }
    }
    
    public function getPackageUserByID()
    {
        try {
            $modelPackage = new PackageModel();
            $package_id = $this->request->uri->getSegment(4);
            var_dump($package_id);
            $isExist = $modelPackage->where('id', $package_id)->get()->getResult();
            if (!$isExist) {
                return $this->fail('ID package tidak ditemukan.');
            };

            $db = \Config\Database::connect();
            $builder = $db->table('packages');
            $query = $builder->select("packages.*, detail_packages.*, features.name AS feature_name");
            $query = $builder->where("packages.id = $package_id");
            $query = $builder->where("packages.status = 'f'");
            $query = $builder->where("packages.category = 'custom'");
            $query = $builder->join('detail_packages', 'detail_packages.package_id = packages.id');
            $query = $builder->join('features', 'features.id = detail_packages.feature_id')->get()->getResult();
            // var_dump($query);

            $response = [
                'status' => 200,
                'error' => null,
                'messages' => [
                    'success' => 'Successfuly get request package from user',
                ],
                'data' => $query,
            ];

            return $this->respond($response);
        } catch (\Throwable$th) {
            return $this->fail('Error 400');
        }
    }

    public function acceptRequestUser()
    {
        try {
            $modelPackage = new PackageModel();
            $modelUser = new UserModel();
            $package_id = $this->request->uri->getSegment(4);
            // var_dump($package_id);

            $isExist = $modelPackage->where('id', $package_id)->get()->getResult();
            if (!$isExist) {
                return $this->fail('ID package tidak ditemukan.');
            };

            $user_package = $isExist[0]->user_id;
            $get_user = $modelUser->where('user_id', $user_package)->get()->getResult();
            $user_email = $get_user[0]->email;

            $json = $this->request->getJSON();
            $data = [
                'price' => $json->price,
                'status' => 't',
            ];

            $modelPackage->update($package_id, $data);

            $email = \Config\Services::email();
            $email->setTo($user_email);
            $email->setFrom('Webgis Intelligence');
            $email->setSubject('Lakukan checkout pada package anda.');
            $email->setMessage('package accepted');
            $email->send();

            $response = [
                'status' => 200,
                'error' => null,
                'messages' => [
                    'success' => 'Successfully accept user custom package.',
                ],
                'data' => $data,
            ];

            if ($email->send()) {
                return $this->respond($response);
            }
        } catch (\Throwable$th) {
            return $this->fail('Error 400');
        }
    }

    public function index()
    {
        try {
            $data = array();
            $req = $this->request->getVar();

            $no = $req['start'];

            $model = new UserPackagesModel();

            foreach ($model->getAll($req) as $field) {
                $no++;

                $row = array();
                $row[] = $no;
                $row[] = $field->package_id;
                $row[] = $field->user_id;
                $row[] = $field->status;
                $row[] = $field->active_date;
                $row[] = $field->experied_date;

                // $row[]  = '<a href="/users/edit/' . $field->id . '" class="btn btn-info btn-sm edit" data-id="' . $field->id . '"><i class="fa fa-pencil"></i></a>&nbsp;<a href="/pegawai/delete/' . $field->id . '" class="btn btn-danger btn-sm delete" onclick="return confirm(\'Apakah Anda yakin ingin menghapus data ini?\')"><i class="fa fa-trash"></i></a>';

                $data[] = $row;
            }

            $output = array(
                "draw" => $req['draw'],
                "recordsTotal" => $model->countAll(),
                "recordsFiltered" => $model->countFiltered($req),
                "data" => $data,
            );

            return json_encode($output);
            // return $this->respond($data);
        } catch (\Throwable$th) {
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
        //
    }

    /**
     * Return a new resource object, with default properties
     *
     * @return mixed
     */
    function new () {
        //
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
        //
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        //
    }
}