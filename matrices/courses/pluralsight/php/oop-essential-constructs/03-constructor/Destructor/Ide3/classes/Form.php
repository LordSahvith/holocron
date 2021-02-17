<?php

class Form{
    const NAME = 'form1';
    public $name;
    public $db;

    public function __construct($name, $db){
        $this->setName($name);
        $this->db = $db;
    }

    public function __destruct(){
        echo 'We are done';
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
