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

    public function setProperty($newVal) 
    {
      $this->prop1 = $newVal;
    }

    public function getProperty() 
    {
      return $this->prop1 . "<br />";
    }
  }

  // create a new object
  $obj = new MyClass;

  // output both objects' $prop1 value
  echo $obj->getProperty();

  // output a message at eh end of the file
  echo "End of file.<br />"
?>