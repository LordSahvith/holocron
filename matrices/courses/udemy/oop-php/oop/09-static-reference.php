<?php

class Cars {

    static $wheels = 4; 
    static $door = 4; 
    
    static function carDetail() {
        echo self::$wheels; // reference self when it's static
        echo self::$door;
    }

}

class Trucks extends Cars {
    static function display() {
        echo parent::carDetail(); // reference parent when accessing parent method
    }
}

$car = new Cars();
$truck = new Trucks();

Cars::carDetail();
$truck->display();


?>