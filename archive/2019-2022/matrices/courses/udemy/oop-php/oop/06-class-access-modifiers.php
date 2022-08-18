<?php

class Cars {

    public $wheels = 4; // available to all
    private $door = 4; // available to this class
    protected $vehicle = "car"; // available to subclasses
    
    function carDetail() {
        echo $this->wheels;
        echo $this->door;
        echo $this->vehicle;
    }

}

$car = new Cars();

// this works since carDetail() is inside class
$car->carDetail(); 

echo $car->wheels; // works since it's public
echo $car->door; // throws error since it's private
echo $car->vehicle; // throws error since it's protected


?>