<?php

namespace App\Models;

use CodeIgniter\Model;

class LayerDefaultsModel extends Model
{
    protected $table = 'layer_defaults';
    protected $primaryKey = 'id';
    protected $allowedFields = ['layer_parent', 'layer_title', 'layer_param', 'validation', 'link', 'created_at', 'updated_at', 'deleted_at'];
    protected $useTimestamps = true;
    protected $useSoftDeletes = false;
    protected $returnType = 'App\Entities\Layer';
    protected $useAutoIncrement = true;

    // Dates
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];
}
