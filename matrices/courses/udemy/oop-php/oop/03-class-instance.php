<?php

class Cars {

    
    function greeting() {
        echo "hello world";
    }

}

// Instance is a "copy" of a class 
$bmw = new Cars();

// call a method with the arrow ->
$bmw->greeting();


?>