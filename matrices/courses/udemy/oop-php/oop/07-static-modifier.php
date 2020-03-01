<?php

class Cars {

    static $wheels = 4; 
    static $door = 4; 
    
    static function carDetail() {
        echo Cars::$wheels; // static methods must call static properties
        echo Cars::$door;
    }

}

$car = new Cars();
// echo $car->wheels;  // throws erros since $wheels is static
// echo $car->door; // throws error since $door is static
echo Cars::$door;

Cars::carDetail();


?>