<?php

  class MyClass 
  {
    public $prop1 = "This is a class property!";

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

    public function getProperty() 
    {
      return $this->prop1 . "<br />";
    }
  }

  class MyOtherClass extends MyClass
  {
    public function __construct()
    {
      echo 'The new constructor in "', __CLASS__ , '".<br />';
    }  

    public function newMethod() 
    {
      echo "From a new method in " . __Class__ . ".<br />";
    }
  }

  // create a new object
  $newobj = new MyOtherClass;

  // output as string
  echo $newobj->newMethod();

  // Use a method from the parent class
  echo $newobj->getProperty();
?>