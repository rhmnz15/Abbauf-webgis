<?php
use App\Models\ModelAuth;
use Firebase\JWT\JWT ;

function getJWT($authHeader)
{

    if (is_null($authHeader)) {
        throw new Exception("Auth JWT Gagal");
    }
    return explode(".", $authHeader)[1];
}

function validateJWT($encodedToken)
{
    $key = getenv('JWT_SECRET_KEY');
    $decodedToken = JWT::decode($encodedToken, $key ,array('HS256'));
    $modelAuth = new ModelAuth();

    $modelAuth->getEmail($decodedToken->email);
}
function decodedJWT(){
    $request = \Config\Services::request();
    $header = $request->getServer('HTTP_AUTHORIZATION');
    $key = getenv('JWT_SECRET_KEY');
    $decodedToken = JWT::decode($header, $key ,array('HS256'));
    return $decodedToken;
}

function createJWT($email,$id){
    $waktuReq = time();

    $waktuToken = getenv('JWT_TIME_TO_LIVE');
    $waktuExp = $waktuReq + $waktuToken;

    $payload = [
        'user_id' => $id,
        'email' => $email,
        'iat' => $waktuReq,
        'exp' => $waktuExp,
    ];

    $jwt = JWT::encode($payload, getenv('JWT_SECRET_KEY'), 'HS256');
    return $jwt;
}

function createResetPasswordJWT($email)
{
    $waktuReq = time();

    $waktuToken = getenv('JWT_RESETPASSWORD_TIME');
    $waktuExp = $waktuReq + $waktuToken;

    $payload = [
        'email' => $email,
        'iat' => $waktuReq,
        'exp' => $waktuExp,
    ];

    $jwt = JWT::encode($payload, getenv('JWT_SECRET_KEY'), 'HS256');
    return $jwt;
}

function validateResetPasswordJWT($token)
{
    $key = getenv('JWT_SECRET_KEY');
    $decodedToken = JWT::decode($token, $key, ['HS256']);
    
    return $decodedToken;
}