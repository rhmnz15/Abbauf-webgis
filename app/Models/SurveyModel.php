<?php

namespace App\Models;

use CodeIgniter\Model;

class SurveyModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'surveys';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $insertID         = 0;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields = ['user_id', 'geom', 'survey_date'];

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

    public function store($user_id, $survey_date, $latitude, $longitude)
    {
        $now = date('Y-m-d H:i:s', time());
        $survey_date = date('Y-m-d H:i:s', strtotime($survey_date));
        return $this->db->query("INSERT INTO public.\"surveys\" (user_id, geom, survey_date, created_at, updated_at)
            VALUES ($user_id, ST_Point($latitude, $longitude), '$survey_date', '$now', '$now')
        ");
    }

    public function updateSurvey($id, $user_id, $survey_date, $latitude, $longitude)
    {
        $now = date('Y-m-d H:i:s', time());
        return $this->db->query("UPDATE public.\"surveys\" 
            SET user_id = $user_id, 
                survey_date = '$survey_date', 
                geom = ST_Point($latitude, $longitude),
                updated_at = '$now'
            WHERE id = $id
        ");
    }
}