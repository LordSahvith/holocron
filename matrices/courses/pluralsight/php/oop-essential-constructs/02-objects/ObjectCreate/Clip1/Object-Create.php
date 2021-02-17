<?php
//Load the class
require 'classes/Form.php';

//Instantiate a form object
$form = new Form();
var_dump($form);

echo PHP_EOL;

//Instantiates another form object
$anotherForm = new Form();
var_dump($anotherForm);

echo PHP_EOL;

//Verify data type
echo gettype($form);
