<?php
/**
 * Class Model
 */
class Model {
    public $pdo;

    /**
     * @param $pdo
     */
    public function __construct($pdo){
        $this->db = $pdo;
    }

    /**
     * @return mixed
     */
    public function getUsers(){
        $sql = "SELECT * FROM `users`";
        return $this->db->query($sql, PDO::FETCH_ASSOC);
    }

    /**
     * @return mixed
     */
    public function getCountry(){
        $sql = 'SELECT `name` FROM country';
        return $this->db->query($sql, PDO::FETCH_ASSOC);
    }

    /**
     * @param $data
     */
    public function saveUser($data){
        try{
            $sql = "INSERT INTO `users`(`first_name`, `last_name`, `email`, `email_preferred_contact`, `country`) VALUES (:first_name, :last_name, :email, :email_preferred_contact, :country)";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':first_name', $data['first_name'], PDO::PARAM_STR, 50 );
            $stmt->bindParam(':last_name', $data['last_name'], PDO::PARAM_STR, 50 );
            $stmt->bindParam(':email', $data['email'], PDO::PARAM_STR, 50 );
            $stmt->bindParam(':email_preferred_contact', $data['email_preferred_contact'], PDO::PARAM_STR, 1 );
            $stmt->bindParam(':country', $data['country'], PDO::PARAM_STR, 100 );
            $stmt->execute();
        }
        catch (PDOException $e){
            echo $e->getMessage();
        }
    }
}