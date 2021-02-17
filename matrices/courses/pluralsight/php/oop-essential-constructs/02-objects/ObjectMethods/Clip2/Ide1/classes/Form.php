<?php

class Form{
    public $name;
    public $id;

    public function setName($name = null){
        if($name){
            return $this->name = $name;
        }
        return false;
    }
    public function getFormStartTagWithAttributes(){
        return "<form name=\"$this->name\" id=\"$this->id\"";
    }
}