<?php

class Student {

  public static $grades = ['Freshman', 'Sophomore', 'Junior', 'Senior'];
  private static $total_students = 0;

  public static function motto() {
    return "To learn PHP OOP!";
  }

  public static function count() {
    return self::$total_students;
  }

  public static function add_student() {
    self::$total_students++;
  }

}

?>
