<?php

class Form{
    public $name;
    public $fields;

    public function __construct($name, $id, array $fields = null){
        $this->name = $name;
        $this->id = $id;
        if($fields){
            foreach($fields as $field){
                $this->fields[] = $field;
            }
        }
    }

    public function getName(){
        return $this->name;
    }
}
