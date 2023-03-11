<?php

namespace App\Controllers\API;

use App\Libraries\Repositories\LayerRepository;
use App\Models\LayerDefaultsModel;
use CodeIgniter\RESTful\ResourceController;

class LayerDefaults extends ResourceController
{
  public function index()
  {
    $model = new LayerDefaultsModel();
    $all = $model->get()->getResult();
    if ($all) {
      foreach ($all as $row) {
      $data[] = [
        'id' => $row->id,
        'layer_parent' => $row->layer_parent,
        'layer_title' => $row->layer_title,
        'layer_param' => $row->layer_param,
        'validation' => $row->validation,
        'link' => $row->link

      ];
    }
    } else {
      return $this->respond(['message' => 'No data found'], 404);
    }
    return $this->respond($data, 200);
  }
  public function show($id = null)
  {
    $model = new LayerDefaultsModel();
    $data = $model->getWhere(['id' => $id])->getRow();
    if ($data) {
      return $this->respond($data);
    } else {
      return $this->failNotFound('No Data Found with id ' . $id);
    }
  }
  // create batch upload and check if data exist then send error
  public function batchCreate()
  {
    $model = new LayerDefaultsModel();
    $data = $this->request->getJSON();
    $exist = [];
    $arr = [];
    $new = [];
    foreach ($data as $row) {
    $valid = url_title($row->layer_title, '_', true);
      $arr[] = [
        'layer_parent' => $row->layer_parent,
        'layer_title' => $row->layer_title,
        'layer_param' => $row->layer_param,
        'validation' => "fclass=$valid",
      ];
    }
    for ($i = 0; $i < count($arr); $i++) {
      $check = $model->getWhere(['layer_parent' => $arr[$i]['layer_parent'], 'layer_title' => $arr[$i]['layer_title'], 'layer_param' => $arr[$i]['layer_param']])->getRow();
      if ($check) {
        $exist[] = $arr[$i];
      } else {
        $new[] = $arr[$i];
      }
    }
    $response = [
      'Already Exist' => $exist,
      'New Data' => $new,
    ];
    if (empty($new)) {
      return $this->respond($response, 400);
    } else {
      $model->insertBatch($new);
      return $this->respond($response, 201);
    }
  }
  public function create()
  {
    $json = $this->request->getJSON();
    $model = new LayerDefaultsModel();
    $valid = url_title($json->layer_title, '_', true);
    $data = [
      'layer_parent' => $json->layer_parent,
      'layer_title' => $json->layer_title,
      'layer_param' => $json->layer_param,
      'validation' => $valid,
    ];
    $check = $model->getWhere($data)->getRow();
    if ($check) {
      return $this->fail('Data already exists');
    } 
    $model->insert($data);
      $response = [
        'status' => 201,
        'error' => null,
        'messages' => [
          'success' => 'Data has been created'
        ]
      ];
      return $this->respondCreated($response);
    
  }
  public function update ($id = null)
  {
    $json = $this->request->getJSON();
    $model = new LayerDefaultsModel();
    $find = $model->getWhere(['id' => $id]);
    if ($find) {
    $valid = url_title($json->layer_title, '_', true);
    $data = [
      'id' => $json->id,
      'layer_parent' => $json->layer_parent,
      'layer_title' => $json->layer_title,
      'layer_param' => $json->layer_param,
      'validation' => "fclass=$valid"
    ];
    $model->update($id, $data);
    $response = [
      'status' => 200,
      'error' => null,
      'messages' => [
        'success' => 'Data has been updated'
      ]
    ];
    return $this->respond($response);
    }
    return $this->failNotFound('No Data Found with id ' . $id);
  }
  public function delete($id = null)
  {
    $model = new LayerDefaultsModel();
    $data = $model->getWhere(['id' => $id]);
    if ($data) {
      $model->delete($id);
      $response = [
        'status' => 200,
        'error' => null,
        'messages' => [
          'success' => 'Data has been deleted'
        ]
      ];
      return $this->respondDeleted($response);
    } else {
      return $this->failNotFound('No Data Found with id ' . $id);
    }
  }
}