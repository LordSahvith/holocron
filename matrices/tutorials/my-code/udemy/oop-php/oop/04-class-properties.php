<?php

class Cars {

    // Properties are variables inside the class
    var $wheel_count = 4;
    var $door_count = 4;
    
    function carDetail() {
        echo "this car has " . $this->wheel_count . " wheels<br />";
    }

}

$bmw = new Cars();
$subaru = new Cars();

// calling a property doesn't require the prepended $
$subaru->wheel_count = 8; // reasigns value

$bmw->carDetail(); // prints 4
$subaru->carDetail(); // prints 8


?>