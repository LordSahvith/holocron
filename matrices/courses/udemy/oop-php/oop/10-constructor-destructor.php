<?php

class Cars {

    public $wheels = 4; 
    public $door = 4; 
    
    function __construct() { // builds dependencies
        echo $this->wheels; 
        echo $this->door;
    }
    
    function __destruct() { // undoes construct
        echo $this->wheels; 
        echo $this->door;
    }

}

$car = new Cars();

?>