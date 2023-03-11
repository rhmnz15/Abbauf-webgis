<?php

namespace App\Controllers\web;

class User extends \App\Controllers\BaseController
{
    public function index()
    {
        return view('user/index');
    }

    public function package()
    {
        return view('user/package');
    }

    public function poi()
    {
        return view('user/poi');
    }

    public function shp()
    {
        return view('user/shp');
    }
    public function userInformation()
    {
        return view('user/userInformation');
    }
    
}