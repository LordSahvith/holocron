<?php

class Bicycle {

  public static $instance_count = 0;

  public $brand;
  public $model;
  public $year;
  public $category;
  public $description = 'Used bicycle';
  protected $weight_kg = 0.0;
  protected static $wheels = 2;

  public const CATEGORIES = ['Road', 'Mountain', 'Hybrid', 'Cruiser', 'City', 'BMX'];

  public static function create() {
    $class_name = get_called_class(); // must retrieve string first
    $obj = new $class_name;           // "new" expects a class or a string
    // $obj = new static              // self & static work here too!
    self::$instance_count++;
    return $obj;
  }

  public function name() {
    return $this->brand . " " . $this->model . " (" . $this->year . ")";
  }

  public static function wheel_details() {
    $wheel_string = static::$wheels == 1 ? "1 wheel" : static::$wheels . " wheels";
    return "It has " . $wheel_string . ".";
  }

  public function weight_kg() {
    return $this->weight_kg . ' kg';
  }

  public function set_weight_kg($value) {
    $this->weight_kg = floatval($value);
  }

  public function weight_lbs() {
    $weight_lbs = floatval($this->weight_kg) * 2.2046226218;
    return $weight_lbs . ' lbs';
  }

  public function set_weight_lbs($value) {
    $this->weight_kg = floatval($value) / 2.2046226218;
  }

}

?>
