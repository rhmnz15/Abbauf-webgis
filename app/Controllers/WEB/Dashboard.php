<?php

namespace App\Controllers\web;


class Dashboard extends \App\Controllers\BaseController
{
    public function index()
    {
        return view('dashboard/index');
    }

    public function managementuser()
    {
        return view('dashboard/management-user');
    }

    public function packagesetting()
    {
        return view('dashboard/package-setting');
    }

    public function poi()
    {
        return view('dashboard/poi');
    }

    public function shp()
    {
        return view('dashboard/shp');
    }

    public function survey()
    {
        return view('dashboard/survey');
    }

    public function testing()
    {
        return view('testing');
    }
}
