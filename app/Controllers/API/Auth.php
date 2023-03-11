<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\ModelAuth;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Session;
use Google\Client as Google_Client;
use Facebook\Facebook;
use Google_Service_Oauth2;
use Cloudinary\Uploader;
use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Upload\UploadApi;

class Auth extends BaseController
{
    use ResponseTrait;
    public function register()
    {
        $validation = \Config\Services::validation();
        $validation->setRules([
            'name' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Silahkan Masukan Nama',
                ],
            ],
            'company' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Silahkan Masukan Nama Company',
                ],
            ],
            'email' => [
                'rules' => 'required|valid_email',
                'errors' => [
                    'required' => 'Silahkan Masukan Email',
                    'valid_email' => 'Silahkan Masukan Email Yang Valid',
                ],
            ],
            'password' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Silahkan Masukan Password',
                ],
            ],
        ]);
        if (!$validation->withRequest($this->request)->run()) {
            return $this->fail($validation->getErrors());
        }
        $json = $this->request->getJSON();
        $data = [
            'name' => $json->name,
            'company' => $json->company,
            'email' => $json->email,
            'password' => hash('sha256', $json->password),
            'profile_picture' => 'https://res.cloudinary.com/dickyadhisatria/image/upload/v1666070573/samples/sample.png',
            
            'role' => $json->role,
            'verification' => 1,
        ];
        $model = new ModelAuth();
        $db = $model->getWhere(['email' => $data['email']])->getResult();
        if ($db) {
            $response = [
                'messages' => [
                    'success' => 'Email Sudah Ada',
                ],
            ];
            return $this->failValidationErrors($response);
        } else {
            $model->insert($data);
            $response = [
                'status' => 201,
                'error' => null,
                'messages' => [
                    'success' => 'Register Success',
                ],
            ];
            return $this->respondCreated($response);
        }
    }

    public function login()
    {
        $validation = \Config\Services::validation();
        $validation->setRules([
            'email' => [
                'rules' => 'required|valid_email',
                'errors' => [
                    'required' => 'Silahkan Masukan Email',
                    'valid_email' => 'Silahkan Masukan Email Yang Valid',
                ],
            ],
            'password' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Silahkan Masukan Password',
                ],
            ],
        ]);
        if (!$validation->withRequest($this->request)->run()) {
            return $this->fail($validation->getErrors());
        }
        $json = $this->request->getJSON();
        $data = [
            'email' => $json->email,
            'password' => hash('sha256', $json->password),
        ];
        $model = new ModelAuth();
        $db = $model->getEmail($data['email']);
        if ($db['password'] != $data['password']) {
            return $this->fail("Email/Password tidak Sesuai");
        } else {
            $auth = [
                'user_id' => $db['user_id'],
                'email' => $db['email'],
                'role' => $db['role'],
                'login' => true,
            ];
            session()->set('auth', $auth);
            $response = [
                'status' => 200,
                'error' => null,
                'message' => 'Auth/Login Berhasil',
                'data' => $auth,
            ];
            return $this->respond($response);
        }
    }

    public function google_login()
    {
        $clientID = getenv('GOOGLE_CLIENT_ID');
        $clientSecret = getenv('GOOGLE_CLIENT_SECRET');
        $redirectUri = 'http://localhost:8080/api/auth/glogin'; //Harus sama dengan yang kita daftarkan

        $client = new Google_Client();
        $client->setClientId($clientID);
        $client->setClientSecret($clientSecret);
        $client->setRedirectUri($redirectUri);
        $client->addScope("email");
        $client->addScope("profile");

        $url = $client->createAuthUrl();
        if (!$this->request->getVar('code') == null) {
            $token = $client->fetchAccessTokenWithAuthCode($this->request->getVar('code'));
            if (!$token == null) {
                $client->setAccessToken($token['access_token']);

                $service = new Google_Service_Oauth2($client);
                $data2 = $service->userinfo->get();
                $model = new ModelAuth();
                $db = $model->getWhere(['email' => $data2['email']])->getResultArray();
                if ($db) {
                    $auth = [
                        'user_id' => $db[0]['user_id'],
                        'email' => $db[0]['email'],
                        'role' => $db[0]['role'],
                        'login' => true,
                    ];
                    $data = [
                        'name' => $data2['name'],
                        'profile_picture' => $data2['picture'],
                        'oauth_provider' => 'google',
                        'oauth_token' => $token['access_token'],
                        'oauth_id' => $data2['id'],
                    ];
                    $model->update($db[0]['user_id'], $data);
                    session()->set('auth', $auth);
                    $response = [
                        'status' => 200,
                        'error' => null,
                        'message' => 'Login Berhasil',
                        'data' => $auth,
                    ];
                    return redirect("/");
                } else {
                    $data = [
                        'name' => $data2['name'],
                        'email' => $data2['email'],
                        'profile_picture' => $data2['picture'],
                        'oauth_provider' => 'google',
                        'oauth_token' => $token['access_token'],
                        'oauth_id' => $data2['id'],
                        'role' => 2,
                        'verification' => 1,
                    ];
                    $model->insert($data);
                    $db_check = $model->getWhere(['email' => $data['email']])->getResultArray();
                    $auth = [
                        'user_id' => $db_check[0]['user_id'],
                        'email' => $db_check[0]['email'],
                        'role' => $db_check[0]['role'],
                        'login' => true,
                    ];
                    session()->set('auth', $auth);
                    $response = [
                        'status' => 201,
                        'error' => null,
                        'message' => 'Register/Login Berhasil',
                        'data' => $auth,
                    ];

                    return redirect("/");
                }
            }
        } else {
            return redirect()->to($url);
        }
    }

    public function forgotPassword()
    {
        $validation = \Config\Services::validation();
        $validation->setRules([
            'email' => [
                'rules' => 'required|valid_email',
                'errors' => [
                    'required' => 'Silahkan Masukan Email',
                    'valid_email' => 'Silahkan Masukan Email Yang Valid',
                ],
            ],
        ]);

        if (!$validation->withRequest($this->request)->run()) {
            return $this->fail($validation->getErrors());
        }
        $json = $this->request->getJSON();
        $data = [
            'email' => $json->email,
        ];
        $model = new ModelAuth();
        $db = $model->getEmail($data['email']);
        $getUserId = $model->getUserIdByEmail($data['email']);
        $user_id = $getUserId[0]->user_id;

        if ($db['email'] != $data['email']) {
            return $this->fail("Email user tidak ditemukan.");
        } else {
            helper('jwt');
            $user_email = $data['email'];
            $user_encoded_email = base64_encode($user_email);
            $token = createResetPasswordJWT($data['email']);

            $email = \Config\Services::email();
            $email->setTo($data['email']);
            $email->setFrom('Webgis Intelligence');
            $email->setSubject('Atur ulang kata sandi Anda');
            $email->setMessage('Klik link ini untuk reset password anda <br> <a href="http://localhost:8080/api/auth/reset-password/' . $user_id . '?token=' . $token . '&email=' . $user_encoded_email . '">Reset Password</a>');
            $email->send();

            $response = [
                'status' => 201,
                'error' => null,
                'messages' => [
                    'success' => 'Email sent.',
                ],
            ];

            if ($email->send()) {
                return $this->respond($response);
            } else {
                return false;
            }

            // return $this->respond($response);
        }
    }

    public function resetPasswordPage()
    {
        $token = $this->request->getVar("token");
        $email = $this->request->getVar("email");
        $user_decoded_email = base64_decode($email);
        $model = new ModelAuth();
        $user_id = $model->getUserIdByEmail($user_decoded_email);
        $data = [
            "user_id" => $user_id[0]->user_id,
            "token" => $token,
            "email" =>$user_decoded_email
        ];
        if (!$user_id[0]->user_id) {
            return $this->fail("User tidak ditemukan.");
        } else {
            helper('jwt');
            $verify_token = validateResetPasswordJWT($token);

            if (!$verify_token) {
                return $this->fail("Invalid Token URL");
            } else {
                $response = [
                    'status' => 201,
                    'error' => null,
                    'messages' => [
                        'success' => 'URL Reset Password Valid.',
                    ],
                ];
                session()->set("reset_password", $data );
                return redirect('auth/change-password');
            }
        }
    }

    public function resetPassword()
    {
        $user_id_uri = session('reset_password')['user_id'];
        $token = session('reset_password')['token'];
        $model = new ModelAuth();
        $get_user_id = $model->getUserId($user_id_uri);
        $user_id = $get_user_id[0]->user_id;

        helper('jwt');
        $verify_token = validateResetPasswordJWT($token);

        if ($get_user_id[0]->user_id != $user_id_uri && !$verify_token) {
            return $this->fail("User tidak ditemukan.");
        } else {
            $validation = \Config\Services::validation();
            $validation->setRules([
                'password' => [
                    'rules' => 'required',
                    'errors' => [
                        'required' => 'Silahkan Masukan Password',
                    ],
                ],
            ]);
            if (!$validation->withRequest($this->request)->run()) {
                return $this->fail($validation->getErrors());
            }

            $model = new ModelAuth();
            $json = $this->request->getJSON();
            $data = [
                'password' => hash('sha256', $json->password),
            ];
            $model->update($user_id, $data);
            $response = [
                'status' => 201,
                'error' => null,
                'messages' => [
                    'success' => 'Password Successfully Changed',
                ],
            ];
            return $this->respondUpdated($response);
        }
    }

    public function sendVerifyAccount()
    {
        $model = new ModelAuth();
        $id = session('auth')['user_id'];

        $findUser = $model->where('user_id', $id)->first();
        $user_email = $findUser['email'];
        $isVerified = $findUser['verification'];

        if (!$user_email) {
            return $this->fail("Email user tidak ditemukan.");
        } else if ($isVerified == 2) {
            return $this->fail("User sudah terverifikasi.");
        } else {
            helper('jwt');
            $token = createJWT($user_email, $id);

            $email = \Config\Services::email();
            $email->setTo($user_email);
            $email->setFrom('webgis intelligence');
            $email->setSubject('Verifikasi Email');
            $email->setMessage('Klik link ini untuk verfiikasi akun anda <br> <a href="http://localhost:8080/api/auth/verify-account/email/?token=' . $token . '&email=' . $user_email . '">Verifikasi Akun</a>');
            $email->send();

            $response = [
                'status' => 200,
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

    public function verifyAccount()
    {
        $user_id_uri = session('auth')['user_id'];
        $token = $_GET['token'];
        $model = new ModelAuth();
        $get_user_id = $model->getUserId($user_id_uri);
        $user_id = $get_user_id[0]->user_id;

        helper('jwt');
        $verify_token = validateResetPasswordJWT($token);

        if ($get_user_id[0]->user_id != $user_id_uri && !$verify_token) {
            return $this->fail("User tidak ditemukan.");
        } else {
            $model = new ModelAuth();
            $data = [
                'verification' => 2,
            ];
            $model->update($user_id, $data);
            $response = [
                'status' => 201,
                'error' => null,
                'messages' => [
                    'success' => 'Account verified.',
                ],
            ];
            return $this->respondCreated($response);
        }
    }

    public function logout()
    {
        session()->destroy();
        return $this->respond('Logout Berhasil');
    }

    public function getProfile(){
        $model = new ModelAuth();
        $user_id = session('auth')['user_id'];
        $db  = $model->select(['user_id', 'name', 'email', 'profile_picture', 'company', 'role'])->find($user_id);
        if (!$db) {
            return $this->failNotFound("Data tidak ditemukan");
        }
        $data = [
            'status' => 200,
            'error' => null,
            'data' => $db
        ];
        return $this->respond($data);
    }

    public function updateProfile(){
        $validation = \Config\Services::validation();
        $validation->setRules([
            'name' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Silahkan Masukan Nama',
                ],
            ],
            'email' => [
                'rules' => 'required|valid_email',
                'errors' => [
                    'required' => 'Silahkan Masukan Email',
                    'valid_email' => 'Silahkan Masukan Email Yang Valid',
                ],
            ],
            'company' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Silahkan Masukan Nama Company',
                ],
            ],
        ]);

        if (!$validation->withRequest($this->request)->run()) {
            return $this->fail($validation->getErrors());
        }
        $json = $this->request->getJSON();
        $data = [
            'name' => $json->name,
            'company' => $json->company,
            'email' => $json->email,
        ];
        $model = new ModelAuth();
        $user_id = session('auth')['user_id'];
        $model->update( $user_id, $data);
        $response = [
            'status' => 200,
            'error' => null,
            'message' => 'Update Profile Berhasil',
            'data' => $data
        ];
        return $this->respondUpdated($response);
    }

    public function changePassword(){
        $validation = \Config\Services::validation();
        $validation->setRules([
            'old_password' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Silahkan Masukan password lama',
                ],
            ],
            'password' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Silahkan Masukan password',
                ],
            ],
            'confirm_password'=>[
                'rules' => 'required',
                'errors' => [
                    'required' => 'konfirmasi Password harus diisi',
                ],
            ]

        ]);

        if (!$validation->withRequest($this->request)->run()) {
            return $this->fail($validation->getErrors());
        }



        // $session_id=$this->session->userdata('user_id');
        $json = $this->request->getJSON();
        if ($json->password != $json->confirm_password) {
            return $this->fail('password tidak sama');
        }
        $model = new UserModel();
        $user = $model->find(session()->auth['user_id']);
        // return $this->respond(password_verify($json->old_password, $user['password']));
        if (hash('sha256',$json->old_password) == $user['password']){
            $model->update(session()->auth['user_id'], [
                    'password'=>hash('sha256', $json->password)
                ]);
        }else{
            return $this->fail('password salah');
        }

        $response = [
            'status' => 200,
            'error' => null,
            'message' => 'Update Password Berhasil',
            'data' => $user
        ];
        return $this->respondUpdated($response);
    }
    
    public function changePicture(){
    $validation = \Config\Services::validation();
    $validation->setRules([
        'profile_picture' => [
            'rules' => 'uploaded[profile_picture]|max_size[profile_picture,15360]|is_image[profile_picture]|mime_in[profile_picture,image/jpg,image/jpeg,image/png]',
            'errors' => [
                'uploaded' => 'Silahkan Masukan Gambar',
                'max_size' => 'Ukuran Gambar Terlalu Besar',
                'is_image' => 'File yang anda masukan bukan gambar',
                'mime_in' => 'File yang anda masukan bukan gambar',
            ],
        ],
    ]);

    if (!$validation->withRequest($this->request)->run()) {
        return $this->fail($validation->getErrors());
    }
    $file = $_FILES['profile_picture']['tmp_name'];
    $model = new ModelAuth();
    $user_id = session('auth')['user_id'];
    $data = (new uploadApi())->upload($file, [
    'folder' => 'profile_picture',
    'public_id' => $user_id,
    'overwrite' => true,
    'resource_type' => 'image',
    'transformation' => [
        ['width' => 300, 'height' => 300, 'crop' => 'fill'],
    ]
    ]);
    $model->update( $user_id, ['profile_picture' => $data['secure_url']]);
    $response = [
        'status' => 200,
        'error' => null,
        'message' => 'Update Profile Berhasil',
        'data' => $data
    ];
    return $this->respondUpdated($response);
    }

    public function facebook_login(){
        // echo "facebook login";
        $facebook = new Facebook([
            'app_id' => '775120143580545',
            'app_secret' => 'e70228e1ea90a64d98f5451151f88206',
            'default_graph_version' => 'v2.3',
        ]);
        $fb_helper = $facebook->getRedirectLoginHelper();

        if($this->request->getVar('state')){
            $fb_helper->getPersistentDataHandler()->set('state', $this->request->getVar('state'));
        }
        if($this->request->getVar('code')){
            $access_token = $fb_helper->getAccessToken();
            $facebook->setDefaultAccessToken($access_token);
            $graph_response = $facebook->get('/me?fields=name,email', $access_token);
            $fb_user_info = $graph_response->getGraphUser();
            $model = new ModelAuth();
            $db = $model->getWhere(['email' => $fb_user_info['email']])->getResultArray();
            if ($db) {
                $auth = [
                    'user_id' => $db[0]['user_id'],
                    'email' => $db[0]['email'],
                    'role' => $db[0]['role'],
                    'login' => true,
                ];
                $data = [
                    'name' => $fb_user_info['name'],
                    'profile_picture' => 'http://graph.facebook.com/'.$fb_user_info['id'].'/picture',
                    'oauth_provider' => 'facebook',
                    'oauth_token' => $access_token,
                    'oauth_id' => $fb_user_info['id'],
                ];
                $model->update($db[0]['user_id'], $data);
                session()->set('auth', $auth);
                $response = [
                    'status' => 200,
                    'error' => null,
                    'message' => 'Login Berhasil',
                    $access_token,
                    'data' => $auth,
                ];
                return $this->respond($response);
                // return redirect("/");
            } else {
                $data = [
                    'name' => $fb_user_info['name'],
                    'email' => $fb_user_info['email'],
                    'profile_picture' => 'http://graph.facebook.com/'.$fb_user_info['id'].'/picture',
                    'oauth_provider' => 'facebook',
                    'oauth_token' => $access_token,
                    'oauth_id' => $fb_user_info['id'],
                    'role' => 2,
                    'verification' => 1,
                ];
                $model->insert($data);
                $db_check = $model->getWhere(['email' => $data['email']])->getResultArray();
                $auth = [
                    'user_id' => $db_check[0]['user_id'],
                    'email' => $db_check[0]['email'],
                    'role' => $db_check[0]['role'],
                    'login' => true,
                ];
                session()->set('auth', $auth);
                $response = [
                    'status' => 201,
                    'error' => null,
                    'message' => 'Register/Login Berhasil',
                    'data' => $auth,
                ];
                return $this->respond($response);
                // return redirect("/");
            }
            
        }else{
            $fb_permissions = ['email'];
            $url = $fb_helper->getLoginUrl('http://localhost:8080/api/auth/flogin',$fb_permissions);
            return redirect()->to($url);
        }
    }
}