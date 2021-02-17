<?php
//Load the class
require 'classes/Form.php';

//Create new object
$form = new Form();

//Destroy using unset()
unset($form);
var_dump($form);

$form = new Form();
$form = null;
var_dump($form);
