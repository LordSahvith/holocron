<?php

class Form{
    public $name;

    public function __construct(){
        echo 'We are building something cool!';
    }

    public function setName($name = null){
        if($name){
            $this->name = $name;
        }else{
            $this->name = self::NAME;
        }
    }

    public function getName(){
        return $this->name;
    }
}
