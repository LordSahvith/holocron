<?php

class Cars {

    private $door = 4; 
    
    function getValues() {
        echo $this->door;
    }

    function setValues($value) {
        $this->door = $value;
    }

}

$car = new Cars();
$car->getValues() . PHP_EOL;
$car->setValues(6) . PHP_EOL;
$car->getValues() . PHP_EOL;


?>