<?php

class Form{
    public $name;
    public $id;
    public $fields;

    public function __construct($name, $id, array $fields = null){
        $this->name = $name;
        $this->id = $id;
        if($fields){
            $this->fields = $fields;
        }
    }

    public function getStartTag(){
        return "<form name=\"$this->name\" id=\"$this->id\">";
    }

    public function getEndTag(){
        return "</form>";
    }

    public function getFields(){
        return $this->fields;
    }
}
