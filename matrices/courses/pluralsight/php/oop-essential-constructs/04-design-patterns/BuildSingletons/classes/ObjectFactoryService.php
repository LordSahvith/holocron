<?php
//A objects factory class
require 'Session.php';
require 'Model.php';
require 'View.php';

class ObjectFactoryService {
    public static $db;
    public static $session;
    public static $model;
    public static $view;

    public static function getDb(array $connectParams = null){
        if(!self::$db){
            try{
                $config = [PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION];
                self::$db = new PDO($connectParams['db']['dsn'],
                    $connectParams['db']['user'],
                    $connectParams['db']['pass'],
                    $config);
            }catch(PDOException $e){
                echo 'Failed connection' . $e->getMessage();
            }
        }
        return self::$db;
    }

    public static function getSession(){
        if(!self::$session){
            self::$session = new Session();
        }
        return self::$session;
    }

    public static function getModel($db){
        if(!self::$model){
            self::$model = new Model($db);
        }
        return self::$model;
    }

    public static function getView(){
        if(!self::$view){
            self::$view = new View();
        }
        return self::$view;
    }
}