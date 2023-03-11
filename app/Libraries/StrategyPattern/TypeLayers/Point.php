<?php

namespace App\Libraries\StrategyPattern\TypeLayers;

use App\Libraries\StrategyPattern\Interfaces\TypeLayerInterface;
use App\Models\PointModel;

class Point implements TypeLayerInterface
{
    private PointModel $pointModel;

    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $this->pointModel = new PointModel();
    }
    /**
     * store
     *
     * @param  mixed $layer_id
     * @param  mixed $attribute
     * @param  mixed $wkt
     * @return void
     */
    public function store($layer_id, $attribute, $wkt)
    {
        try {
            $this->pointModel->set('layer_id', $layer_id);
            $this->pointModel->set('attribute', $attribute);
            $this->pointModel->set('geom', "ST_GeomFromText('$wkt')", false);
            return $this->pointModel->insert();
            // $this->pointModel->store($layer_id, $attribute, $wkt);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * update
     *
     * @param  mixed $id
     * @param  mixed $layer_id
     * @param  mixed $attribute
     * @param  mixed $wkt
     * @return void
     */
    public function update($id, $layer_id, $attribute, $wkt)
    {
        try {
            $this->pointModel->set('layer_id', $layer_id);
            $this->pointModel->set('attribute', $attribute);
            $this->pointModel->set('geom', "ST_GeomFromText('$wkt')", false);
            return $this->pointModel->update($id);
            // $this->pointModel->edit($id, $layer_id, $attribute, $wkt);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}