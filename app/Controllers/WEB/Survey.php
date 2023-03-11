<?php

namespace App\Controllers\web;

class Survey extends \App\Controllers\BaseController
{
    public function index()
    {
		return view('survey/index');
    }
}
