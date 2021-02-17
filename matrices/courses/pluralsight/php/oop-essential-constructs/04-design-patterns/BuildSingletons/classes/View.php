<?php
//View Container Class

class View {
    public $results;

    public function setResults($results){
        $this->results = $results;
    }

    public function render(){
        require 'layout/layout.php';
    }
}