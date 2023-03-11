<?php

namespace App\Libraries\StrategyPattern\TypeLayers;

use App\Libraries\StrategyPattern\Interfaces\TypeLayerInterface;
use App\Models\LineStringModel;

class LineString implements TypeLayerInterface
{
    private LineStringModel $lineStringModel;

    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $this->lineStringModel = new LineStringModel();
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
            $this->lineStringModel->set('layer_id', $layer_id);
            $this->lineStringModel->set('attribute', $attribute);
            $this->lineStringModel->set('geom', "ST_GeomFromText('$wkt')", false);
            return $this->lineStringModel->insert();
            // $this->lineStringModel->store($layer_id, $attribute, $wkt);
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
            $this->lineStringModel->set('layer_id', $layer_id);
            $this->lineStringModel->set('attribute', $attribute);
            $this->lineStringModel->set('geom', "ST_GeomFromText('$wkt')", false);
            return $this->lineStringModel->update($id);
            // $this->lineStringModel->edit($id, $layer_id, $attribute, $wkt);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}