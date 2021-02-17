<?php
//Load the class
require 'classes/Form.php';


$form = new Form();
$name = 'LoginForm';
$id = 'FormA';

$form->setName($name)->setId($id);

echo $form->name . PHP_EOL . $form->id;
