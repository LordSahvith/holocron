<?php

  class MyClass 
  {
    public $prop1 = "This is a class property!";

    public static $count = 0;

    public function __construct()
    {
      echo 'The class "', __CLASS__ , '" was initiated!<br />';
    }  

    public function __destruct()
    {
      echo 'The class "', __CLASS__, '" was destroyed.<br />';
    }

    public function __toString()
    {
      echo "Using the toString methogd: ";
      return $this->getProperty();
    }

    public function setProperty($newVal) 
    {
      $this->prop1 = $newVal;
    }

    private function getProperty() 
    {
      return $this->prop1 . "<br />";
    }

    public static function plusOne()
    {
      return "The count is " . ++self::$count . ".<br />";
    }
  }

  class MyOtherClass extends MyClass
  {
    public function __construct()
    {
      parent::__construct(); // call the parent class's constructor
      echo 'The new constructor in "', __CLASS__ , '".<br />';
    }  

    public function newMethod() 
    {
      echo "From a new method in " . __Class__ . ".<br />";
    }

    public function callProtected() 
    {
      // this works because it extends MyClass so it can access getProperty();
      echo $this->getProperty();
    }
  }

  do 
  {
    // Call plusOne without instantiating MyClass
    echo MyClass::plusOne();
  } while ( MyClass::$count < 10);
?>