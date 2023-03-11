<?php

namespace App\Libraries\Repositories;

use App\Libraries\StrategyPattern\TypeLayer;
use App\Libraries\StrategyPattern\TypeLayers\LineString;
use App\Libraries\StrategyPattern\TypeLayers\Point;
use App\Libraries\StrategyPattern\TypeLayers\Polygon;
use App\Models\LayerModel;

class LayerRepository
{
    /**
     * store
     *
     * @param  mixed $user_id
     * @param  mixed $name
     * @param  mixed $type
     * @param  mixed $attribute
     * @param  mixed $wkt
     * @return void
     */
    public static function store($user_id, $name, $type, $attribute, $wkt)
    {
        try {
            $model = new LayerModel();
            $layer_id = $model->store($user_id, $name, $type);

            $context = new TypeLayer(new Point());

            if ($type == 'point') {
                $context->store($layer_id, $attribute, $wkt);
            } elseif ($type == 'polygon') {
                $context->setStrategy(new Polygon());
                $context->store($layer_id, $attribute, $wkt);
            } elseif ($type == 'linestring') {
                $context->setStrategy(new LineString());
                $context->store($layer_id, $attribute, $wkt);
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    
    /**
     * update
     *
     * @param  mixed $id
     * @param  mixed $user_id
     * @param  mixed $name
     * @param  mixed $type
     * @param  mixed $attribute
     * @param  mixed $wkt
     * @return void
     */
    public static function update($id, $user_id, $name, $type, $attribute, $wkt)
    {
        try {
            $model = new LayerModel();
            $layer_id = $model->edit($id, $user_id, $name, $type);

            $context = new TypeLayer(new Point());

            if ($type == 'point') {
                $context->update($id, $layer_id, $attribute, $wkt);
            } elseif ($type == 'polygon') {
                $context->setStrategy(new Polygon());
                $context->update($id, $layer_id, $attribute, $wkt);
            } elseif ($type == 'linestring') {
                $context->setStrategy(new LineString());
                $context->update($id, $layer_id, $attribute, $wkt);
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}