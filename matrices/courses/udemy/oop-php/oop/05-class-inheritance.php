<?php

class Cars {

    // Properties are variables inside the class
    var $wheels = 4;
    var $door = 4;
    var $vehicle = "car";
    
    function carDetail() {
        echo "this " . $this->vehicle . " has " . $this->wheels . " wheels<br />";
    }

}

// inherits from Cars class
class Trucks extends Cars {
    // override properties
    var $wheels = 6; 
    var $vehicle = "truck"; 
}

$tacoma = new Trucks();
$outback = new Cars();

// inherits all methods
$tacoma->carDetail();
$outback->carDetail();


?>