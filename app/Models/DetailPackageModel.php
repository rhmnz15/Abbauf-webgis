<?php

namespace App\Models;

use CodeIgniter\Model;

class DetailPackageModel extends Model
{
    protected $DBGroup = 'default';
    protected $table = 'detail_packages';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $insertID = 0;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;
    protected $allowedFields = ['package_id', 'feature_id'];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    // protected $deletedField = 'deleted_at';

    // Validation
    protected $validationRules = ['package_id' => 'required', 'feature_id' => 'required'];
    protected $validationMessages = [];
    protected $skipValidation = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert = [];
    protected $afterInsert = [];
    protected $beforeUpdate = [];
    protected $afterUpdate = [];
    protected $beforeFind = [];
    protected $afterFind = [];
    protected $beforeDelete = [];
    protected $afterDelete = [];

    public function searchAndDisplay($key = null, $start = 0, $length = 0)
    {
        $builder = $this->db->table('detail_packages');
        if ($key) {
            $arrKey = explode(" ", $key);
            for ($i = 0; $i < count($arrKey); $i++) {
                $builder = $builder->like('package_id', $arrKey[$i]);
                $builder = $builder->orLike('feature_id', $arrKey[$i]);
            }
        }
        if ($start != 0 or $length != 0) {
            $builder = $builder->limit($length, $start);
        }
        return $builder->orderBy('id')->get()->getResult();
    }
}