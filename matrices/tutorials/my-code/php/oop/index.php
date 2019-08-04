<?php

  class MyClass {
    public $prop1 = "This is a class property!";

    public function setProperty($newVal) {
      $this->prop1 = $newVal;
    }

    public function getProperty() {
      return $this->prop1 . "<br />";
    }
  }

  // create two objects
  $obj = new MyClass;
  $obj2 = new MyClass;

  // Get the value of $prop1 from both objects
  echo $obj->getProperty();
  echo $obj2->getProperty();

  // Set new values for both objects
  $obj->setProperty("I'm a new property value.");
  $obj2->setProperty("I'm the second one.");

  // output both objects' $prop1 value
  echo $obj->getProperty();
  echo $obj2->getProperty();

?>