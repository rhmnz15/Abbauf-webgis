<?php

namespace App\Libraries\StrategyPattern\TypeLayers;

use App\Libraries\StrategyPattern\Interfaces\TypeLayerInterface;
use App\Models\PolygonModel;

class Polygon implements TypeLayerInterface
{
    private PolygonModel $polygonModel;

    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $this->polygonModel = new PolygonModel();
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
            $this->polygonModel->set('layer_id', $layer_id);
            $this->polygonModel->set('attribute', $attribute);
            $this->polygonModel->set('geom', "ST_GeomFromText('$wkt')", false);
            return $this->polygonModel->insert();
            // $this->polygonModel->store($layer_id, $attribute, $wkt);
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
            $this->polygonModel->set('layer_id', $layer_id);
            $this->polygonModel->set('attribute', $attribute);
            $this->polygonModel->set('geom', "ST_GeomFromText('$wkt')", false);
            return $this->polygonModel->update($id);
            // $this->polygonModel->edit($id, $layer_id, $attribute, $wkt);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}