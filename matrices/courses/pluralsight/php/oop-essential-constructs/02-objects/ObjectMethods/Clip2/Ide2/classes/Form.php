<?php

class Form{
    public $name;
    public $id;
    public $valid = false;

    public function setName($name){
        $this->name = $name;
        return $this;
    }

    public function setId($id){
        $this->id = $id;
        return $this;
    }
}
