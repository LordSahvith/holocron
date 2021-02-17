<?php

class Form{
    const NAME = 'StdForm';
    protected $elements = [];
    public $name = 'Login';
    public $valid = false;

    public function getStartTag($attributes = null){
        if(!$attributes)return '<form>';
        $tag = '<form';
        foreach($attributes as $key => $value){
            $tag .= " $key=\"$value\"";
        }
        $tag .= '>';
        return $tag;
    }

    public function getEndTag(){
        return '</form>';
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

    public function setFormAttribs($attribs){
        foreach($attribs as $key => $value){
            $this->$key = $value;
        }
    }

    public function setId($id){
        $this->id = $id;
    }

    public function set($property, $value = null){
        $this->$property = $value;
    }

}
