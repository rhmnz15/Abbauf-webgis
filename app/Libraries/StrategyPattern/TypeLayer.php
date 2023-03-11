<?php 

namespace App\Libraries\StrategyPattern;

use App\Libraries\StrategyPattern\Interfaces\TypeLayerInterface;

class TypeLayer
{    
    private TypeLayerInterface $typeLayerInterface;
        
    /**
     * __construct
     *
     * @param TypeLayerInterface $typeLayerInterface
     * @return void
     */
    public function __construct(TypeLayerInterface $typeLayerInterface)
    {
        $this->typeLayerInterface = $typeLayerInterface;
    }
    
    /**
     * setStrategy
     *
     * @param TypeLayerInterface $typeLayerInterface
     * @return void
     */
    public function setStrategy(TypeLayerInterface $typeLayerInterface)
    {
        $this->typeLayerInterface = $typeLayerInterface;
    }
        
    /**
     * store
     *
     * @param  mixed $layer_id
     * @param  mixed $attribute
     * @param  mixed $data_coordinate
     * @return void
     */
    public function store($layer_id, $attribute, $data_coordinate)
    {
        $this->typeLayerInterface->store($layer_id, $attribute, $data_coordinate);
    }
    
    /**
     * update
     *
     * @param  mixed $id
     * @param  mixed $layer_id
     * @param  mixed $attribute
     * @param  mixed $data_coordinate
     * @return void
     */
    public function update($id, $layer_id, $attribute, $data_coordinate)
    {
        $this->typeLayerInterface->update($id, $layer_id, $attribute, $data_coordinate);
    }
}