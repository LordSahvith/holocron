<?php

class Form{
    protected $elements = [];
    protected $name;
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
}
