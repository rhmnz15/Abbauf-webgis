<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class ModelAuth extends Model
{

    protected $table = "users";
    protected $primaryKey = "user_id";
    protected $allowedFields = ['name', 'email', 'password', 'profile_picture', 'oauth_provider', 'oauth_token', 'oauth_id', 'role', 'verification', 'company'];
    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    public function getEmail($email)
    {
        $builder = $this->table("users");
        $data = $builder->where("email", $email)->first();

        if (!$data) {
            throw new Exception("Data Auth Tidak Ditemukan");
        }
        return $data;
    }

    public function getUserId($user_id)
    {
        $builder = $this->table("users");
        $data = $builder->select('user_id')->where("user_id", $user_id)->get()->getResult();

        if (!$data) {
            throw new Exception("Data Auth Tidak Ditemukan");
        }
        return $data;
    }

    public function getUserIdByEmail($email)
    {
        $builder = $this->table("users");
        $data = $builder->select('user_id')->where('email', $email)->get()->getResult();
        if (!$data) {
            throw new Exception("Data Auth Tidak Ditemukan");
        }

        return $data;
    }

    public function getEmailById($user_id)
    {
        $builder = $this->table("users");
        $data = $builder->select('email')->where('user_id', $user_id)->get()->getResult();
        if (!$data) {
            throw new Exception("Data Auth Tidak Ditemukan");
        }

        return $data;
    }

   

}