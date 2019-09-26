<?php

class Furniture {

  var $width;
  var $depth;
  var $height;
  var $is_seating = false;
  var $is_sleeper = false;
  var $is_upholstered = false;

  function area() {
    return floatval($this->width) * floatval($this->depth);
  }

  function volume() {
    return $this->area() * floatval($this->height);
  }
}

class Bed extends Furniture {
  var $is_sleeper = true;
}

class Sofa extends Furniture {
  var $is_seating = true;
  var $is_upholstered = true;

  var $seats = 3;
  var $has_seatcushions = true;
  var $has_backcushions = true;
  var $arms = 2;

  var $depth_opened;

  function area_opened() {
    if(!$this->is_sleeper) { return $this->area(); }
    return floatval($this->width) * floatval($this->depth_opened);
  }
}

class Couch extends Sofa {
  var $arms = 0;
}

class Loveseat extends Sofa {
  var $seats = 2;
}

class Bench extends Couch {
  var $has_backcushions = false;
}

function inspect_class($class_name) {
  $output = '';

  $output .= $class_name;
  $parent_class = get_parent_class($class_name);
  if($parent_class != '') {
    $output .= " extends {$parent_class}";
  }
  $output .= "\n";

  $class_vars = get_class_vars($class_name);
  ksort($class_vars);
  $output .=  "properties: \n";
  foreach($class_vars as $k => $v) {
    $output .=  "- {$k}: {$v}\n";
  }

  $class_methods = get_class_methods($class_name);
  sort($class_methods);
  $output .=  "methods: \n";
  foreach($class_methods as $k) {
    $output .=  "- {$k}\n";
  }

  return $output;
}

$class_names = ['Furniture', 'Bed', 'Couch', 'Loveseat', 'Bench'];
foreach($class_names as $class_name) {
  echo nl2br(inspect_class($class_name));
  echo '<br />';
}
echo "<hr />";

$sofa = new Sofa;
$sofa->width = 4;
$sofa->depth = 2;
$sofa->height = 3;
echo 'Area: ' . $sofa->area() . "<br />";
echo 'Volume: ' . $sofa->volume() . "<br />";

echo 'Area opened: ' . $sofa->area_opened() . "<br />";
$sofa->is_sleeper = true;
$sofa->depth_opened = 7;
echo 'Area opened: ' . $sofa->area_opened() . "<br />";

echo "<hr />";

$bench = new Bench;
$bench->width = 3;
$bench->depth = 1.5;
$bench->height = 1;
echo 'Area: ' . $bench->area() . "<br />";
echo 'Seating? ' . ($bench->is_seating ? 'true' : 'false') ."<br />";
echo 'Sleeping? ' . ($bench->is_sleeper ? 'true' : 'false') ."<br />";
echo 'Backcushions? ' . ($bench->has_backcushions ? 'true' : 'false') ."<br />";

?>
