<?php
//Load the class
require 'classes/Form.php';

$form = new Form('FormLogin', 'dbconnection');

echo $form->getName() . PHP_EOL;
