<?php 

namespace App\Libraries\StrategyPattern\Interfaces;

interface TypeLayerInterface 
{        
    /**
     * store
     *
     * @param  mixed $layer_id
     * @param  mixed $attribute
     * @param  mixed $data_coordinate
     * @return void
     */
    public function store($layer_id, $attribute, $data_coordinate);
    
    /**
     * update
     *
     * @param  mixed $id
     * @param  mixed $layer_id
     * @param  mixed $attribute
     * @param  mixed $data_coordinate
     * @return void
     */
    public function update($id, $layer_id, $attribute, $data_coordinate);
}