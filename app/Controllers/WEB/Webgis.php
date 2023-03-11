<?php

namespace App\Controllers\web;

class Webgis extends \App\Controllers\BaseController  
{
    public function index()
    {
        return view('webgis/index');
    }
}
