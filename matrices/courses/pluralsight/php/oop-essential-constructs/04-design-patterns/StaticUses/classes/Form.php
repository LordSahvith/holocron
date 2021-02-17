<?php
//A general form class
class Form{
    public $id;
    public $name;
    public $fields = [];

    public function __construct($name, $id, array $fields = null){
        $this->name = $name;
        $this->id = $id;
        $this->fields = $fields;
    }

    public function getStartTag(){
        return "<form id=\"$this->id\" name=\"$this->name\" action=\"index.php\" method=\"post\">";
    }

    public function getFields(){
        return $this->fields;
    }

    public function getEndTag(){
        return '</form>';
    }
}