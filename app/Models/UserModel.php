<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'users';
    protected $primaryKey       = 'user_id';
    protected $useAutoIncrement = true;
    protected $insertID         = 0;
    protected $returnType       = 'array';
    // protected $useSoftDeletes   = true;
    protected $protectFields    = true;
    protected $allowedFields    = [ 
                                    'name',
                                    'email',
                                    'password',
                                    'profile_picture',
                                    'oauth_id',
                                    'oauth_provider',
                                    'oauth_token',
                                    'role',
                                    'verification',
                                    'company' 
                                  ];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    // protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = ['name'=>'required', 'email'=>'required', 'profile_picture'=>'required', 'role'=>'required', 'verification'=>'required', 'company'=>'required'];
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

    public function searchAndDisplay($key = null, $start = 0, $length = 0)
    {
        $builder = $this->db->table('users');
        if ($key) {
            $arrKey = explode(" ", $key);
            for ($i=0; $i < count($arrKey); $i++) { 
                $builder = $builder->like('name', $arrKey[$i]);
                $builder = $builder->orLike('email', $arrKey[$i]);
            }
        }
        if ($start != 0 or $length != 0) {
            $builder = $builder->limit($length, $start);
        }
        return $builder->where('role', '1')->orderBy('name')->get()->getResult();
    }

    public function searchAndDisplayAdmin($key = null, $start = 0, $length = 0)
    {
        $builder = $this->db->table('users');
        if ($key) {
            $arrKey = explode(" ", $key);
            for ($i=0; $i < count($arrKey); $i++) { 
                $builder = $builder->like('name', $arrKey[$i]);
                $builder = $builder->orLike('email', $arrKey[$i]);
            }
        }
        if ($start != 0 or $length != 0) {
            $builder = $builder->limit($length, $start);
        }
        return $builder->where('role', '1')->orderBy('name')->get()->getResult();
    }

    public function searchAndDisplayUsers($key = null, $start = 0, $length = 0)
    {
        $builder = $this->db->table('users');
        if ($key) {
            $arrKey = explode(" ", $key);
            for ($i=0; $i < count($arrKey); $i++) { 
                $builder = $builder->like('name', $arrKey[$i]);
                $builder = $builder->orLike('email', $arrKey[$i]);
            }
        }
        if ($start != 0 or $length != 0) {
            $builder = $builder->limit($length, $start);
        }
        return $builder->where('role', '2')->orderBy('name')->get()->getResult();
    }
}

   

