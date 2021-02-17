<?php
// Model Access Class
class Model {
    public $result;
    public $db;
    public function __construct($db){
        $this->db = $db;
    }

    public function getUsers(){
        $sql = 'SELECT id, firstname, lastname, haircolor FROM users';
        return $this->db->query($sql, PDO::FETCH_ASSOC);
    }
}