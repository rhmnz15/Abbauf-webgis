<?php

namespace App\Controllers\web;

use App\Models\POIModel;

class POI extends \App\Controllers\BaseController
{
    public function index()
    {
        try {
            $poi = new POIModel();
            $data = $poi->select([
                'pois.id',
                'pois.user_id',
                'pois.name',
                'pois.status',
                'COUNT(detailpois.poi_id) as total_pois'
            ])->join('detailpois', 'detailpois.poi_id = pois.id')->groupBy('pois.id')->get()->getResult();
            return view('datatables/poi-datatable', ['poi_datatables' => $data]);
        } catch (\Throwable $th) {
            return view('errors/cli/error_404');
        }
    }
}