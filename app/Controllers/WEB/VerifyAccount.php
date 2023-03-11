<?php

namespace App\Controllers\web;

use App\Models\ModelAuth;
use CodeIgniter\API\ResponseTrait;

class VerifyAccount extends \App\Controllers\BaseController
{
    use ResponseTrait;
    public function sendVerifyAccount($id = null)
    {
        $model = new ModelAuth();
        $id = $this->request->uri->getSegment(3);
        echo $id;

        $findUser = $model->where('user_id', $id)->first();
        $email = $findUser['email'];

        var_dump($email);

        if (!$email) {
            return $this->fail("Email user tidak ditemukan.");
        } else {
            helper('jwt');
            $token = createJWT($email, $id);

            $email = \Config\Services::email();
            $email->setTo('variniazkarin@gmail.com');
            $email->setFrom('tekajetiga749@gmail.com', 'webgis intelligence');
            $email->setSubject('Atur ulang kata sandi Anda');
            $email->setMessage('Klik link ini untuk verfiikasi akun anda <br> <a href="http://localhost:8080/auth/reset-password/' . $id . '?token=' . $token . '&email=' . $email . '">Reset Password</a>');
            $email->send();

            $response = [
                'status' => 201,
                'error' => null,
                'messages' => [
                    'success' => 'Please check your inbox to verify account.',
                ],
            ];
            if ($email->send()) {
                return $this->respond($response);
            } else {
                return false;
            }

        }
    }

}