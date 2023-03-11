<?php

namespace App\Controllers\API;

use App\Models\PackageModel;
use App\Models\FeatureModel;
use App\Models\DetailPackageModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class Packages extends ResourceController
{
    use ResponseTrait;
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    private $db;
    public function __construct()
    {
        $this->db = \Config\Database::connect();
    }

    public function index()
    {
        try {
            $model = new PackageModel();
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

    
    public function publiclist()
    {
        $model = new PackageModel();
        $data = [];
        $packages = $model->where('category', 'public')->where('status','t')->orderBy('created_at', 'DESC')->findAll();
        foreach ($packages as $package) {
            array_push($data, array_merge($package, ['features'=>$this->getPackageWithFeatures($package['id'])]));
        }
        
        return $this->respond($data);
    }

    public function indexAjax()
    {
        try {
            $param['draw'] = isset($_REQUEST['draw']) ? $_REQUEST['draw'] : '';
            $start = isset($_REQUEST['start']) ? $_REQUEST['start'] : '';
            $length = isset($_REQUEST['length']) ? $_REQUEST['length'] : '';
            $searchValue = isset($_REQUEST['search']['value']) ? $_REQUEST['search']['value'] : '';

            $model          = new PackageModel();
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
                $model = new PackageModel();
                $modelDetailPackage = new DetailPackageModel();
                $modelFeature = new FeatureModel();
                $data = [];
                $package = $model->find($id);
                if(!$package){
                    return $this->failNotFound();
                }
                $data = array_merge($data, $package);
                $detailPackages = $modelDetailPackage->where('package_id', $package['id'])->findAll();
                $features = [];
                foreach ($detailPackages as $detailPackage) {
                    array_push($features, $modelFeature->find($detailPackage['feature_id']));
                }
                $data = array_merge($data, ['features'=>$features]);

                // $survey = $model->select([
                //     'packages.id',
                //     'packages.user_id',
                //     'packages.price',
                //     'packages.category', 
                //     'detail_packages.feature_id as id_fitur',
                //     'detail_packages.id as id_Detail',
                //     'features.name'

                // ])
                // ->join('detail_packages', 'packages.id = detail_packages.package_id', 'inner')
                // ->join('features', 'features.id = detail_packages.feature_id', 'inner')
                // ->find($id);
                if (!$data) {
                    return $this->failNotFound("Data tidak ditemukan");
                }
                return $this->respond($data);
            } catch (\Throwable $th) {
                return $this->fail($th->getMessage());
            }
        
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create($feature=null)
    {
        try {
            $valid = $this->validate([
                'name' => 'required',
                'price' => 'required',
                'status' => 'required',
                'category' => 'required'
            ]);
            
            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }
            
            $modelPackage = new PackageModel();
            $id_user = htmlspecialchars(session("auth")["user_id"]);
            $modelPackage->insert([
                'name' => $this->request->getVar('name'),
                'price' => $this->request->getVar('price'),
                'status' => $this->request->getVar('status'),
                'user_id' => $id_user,
                'category' => $this->request->getVar('category')
            ]);
            $package_id = $modelPackage->getInsertID();
            
            $features= $this->request->getVar('features');
            $modelDetailPackage = new DetailPackageModel();
            $result = array();

            for ($i=0; $i < count($features) ; $i++) { 
                $result[] = array(
                    'package_id'   => $package_id,
                    'feature_id'   => $features[$i]
                 );
            }
            
            
            $modelDetailPackage->insertBatch($result);
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
                'price' => 'required',
                'status' => 'required',
                'category' => 'required'
            ]);
            
        
            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }
                
            $id_user = htmlspecialchars(session("auth")["user_id"]);
            $data= [
                'name' => $this->request->getVar('name'),
                'price' => $this->request->getVar('price'),
                'status' => $this->request->getVar('status'),
                'user_id' => $id_user,
                'category' => $this->request->getVar('category')       
            ];
            $modelPackage = new PackageModel();
            $findById = $modelPackage->find(['id' => $id]);
            if (!$findById)   return $this->failNotFound('Data Tidak Ditemukan');

            $modelPackage->update($id,$data);
            
            
            $modelDetailPackage = new DetailPackageModel();
            $detFetId = $modelDetailPackage->select("id")->where("package_id",$id)->get()->getResultArray();
                
            foreach ($detFetId as $value) {
                $modelDetailPackage->delete($value['id']);
            }
            
            
            $features= $this->request->getVar('features');
            $result = array();

            for ($i=0; $i < count($features) ; $i++) { 
                $result[] = array(
                    'package_id'   => $findById[0]["id"],
                    // 'feature_id'   => $features[$i]
                );
            }
            
            $modelDetailPackage->getInsertId();
            return $this->respondUpdated([
                "message" => "Data berhasil diupdate"
            ]);
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage());
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
            $model = new PackageModel();
            $modelDetail = new DetailPackageModel();
    
            $model->delete($id);
            $modelDetail->where("package_id", $id)->delete();
    
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

    public function getPackageWithFeatures($package_id)
    {
        // $model = new PackageModel();
        $modelDetailPackage = new DetailPackageModel();
        $modelFeature = new FeatureModel();
        $data = [];
        // $package = $model->where('category','public')->where('status', 't')->find($package_id);
        // if(!$package){
        //     throw new Exception("Not Found", 404);
            
        // }
        // $data = array_merge($data, $package);
        $detailPackages = $modelDetailPackage->where('package_id', $package_id)->findAll();
        $features = [];
        foreach ($detailPackages as $detailPackage) {
            array_push($features, $modelFeature->find($detailPackage['feature_id']));
        }
        return array_merge($data, $features);

    } 
}