<?php
//A limited text input field
class InputText{
    public $type = 'text';
    public $label;
    public $value;
    public $required;

    public function getInput(){
        return "<input type=\"$this->type\" name=\"$this->label\" $this->required/>";
    }

    public function setLabel($label){
        $this->label = ucfirst($label);
    }

    public function setValue($value){
        $this->value = $value;
    }

    public function setType($type){
        $this->type = $type;
    }

    public function setRequired(){
        $this->required = 'required';
    }
}