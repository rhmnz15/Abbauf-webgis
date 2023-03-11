<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Session;
use CodeIgniter\API\ResponseTrait;
use Config\Services;
use Exception;

class FilterSession implements FilterInterface
{
    use ResponseTrait;
    public function before(RequestInterface $request, $arguments = null)
    {   
        $login = session()->auth;
        if (!$login)
	    {
        echo "invalid";
        return redirect()->to(base_url('auth/login'))->with('error', "Invalid Credential");
	    }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Do something here
    }
}