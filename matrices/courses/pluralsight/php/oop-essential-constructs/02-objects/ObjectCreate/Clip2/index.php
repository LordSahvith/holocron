<?php
//Load the class
require 'classes/Form.php';

$loginForm = new Form();
$loginForm->setName('Login');
echo $loginForm->getName();

echo PHP_EOL;

$registrationForm = new Form();
$registrationForm->setName('Registration');
echo $registrationForm->getName();