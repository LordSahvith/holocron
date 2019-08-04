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

  $obj = new MyClass;

  echo $obj->prop1;

?>