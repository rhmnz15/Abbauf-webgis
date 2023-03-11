<?php

namespace App\Models;

use CodeIgniter\Model;

class LayerModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'layers';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $insertID         = 0;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['name', 'type', 'user_id'];

    // Dates
    protected $useTimestamps = true;
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
    
    /**
     * store
     *
     * @param  mixed $user_id
     * @param  mixed $name
     * @param  mixed $type
     * @return void
     */
    public function store($user_id, $name, $type)
    {
        $builder = $this->db->table('layers');
        $builder->insert([
            'user_id' => $user_id,
            'name' => $name,
            'type' => ucfirst($type)
        ]);
        return $this->db->insertID();
    }
        
    /**
     * edit
     *
     * @param  mixed $id
     * @param  mixed $user_id
     * @param  mixed $name
     * @param  mixed $type
     * @return void
     */
    public function edit($id, $user_id, $name, $type)
    {
        $builder = $this->db->table('layers');
        $builder->update([
            'user_id' => $user_id,
            'name' => $name,
            'type' => ucfirst($type)
        ], ['id' => $id]);
        return $this->db->insertID();
    }
}