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

echo Student::$grades[0] . "<br />";
echo Student::motto() . "<br />";

// echo Student::$total_students . "<br />"; // Error
echo Student::count() . "<br />";
Student::add_student();
echo Student::count() . "<br />";


// Static properties and methods are inherited
class PartTimeStudent extends Student {
}

echo PartTimeStudent::$grades[0] . "<br />";
echo PartTimeStudent::motto() . "<br />";

// Changes are shared too!
PartTimeStudent::$grades[] = 'Alumni';
echo implode(', ', Student::$grades) . "<br />";

Student::add_student();
Student::add_student();
Student::add_student();
PartTimeStudent::add_student();

echo Student::count() . "<br />";
echo PartTimeStudent::count() . "<br />";

?>
