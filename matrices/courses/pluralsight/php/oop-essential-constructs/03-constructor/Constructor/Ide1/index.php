<?php
//Load the class
require 'classes/Form.php';

$name = 'Login';
$id = 'Form1';

$loginForm = new Form($name, $id);

$name = 'Register';
$id = 'Form2';
$registerForm = new Form($name, $id);

echo $loginForm->getName() . PHP_EOL;
echo $registerForm->getName();
