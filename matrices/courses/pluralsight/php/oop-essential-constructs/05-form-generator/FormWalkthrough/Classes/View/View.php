<?php
/**
 * Class View
 */
class View {
    public $results;

    /**
     * @param $results
     */
    public function setResults($results){
        $this->results = $results;
    }

    /**
     * @param $param
     * @param $value
     */
    public function set($param, $value){
        $this->$param = $value;
    }

    /**
     * @param $param
     */
    public function render($param){
        require LAYOUTS . $param . '.php';
    }
}