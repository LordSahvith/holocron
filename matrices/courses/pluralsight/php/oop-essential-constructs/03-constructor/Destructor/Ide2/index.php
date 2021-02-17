<?php
//Load the class
require 'classes/Form.php';

$form = new Form();

echo $form->getName() . PHP_EOL;

unset($form);

echo PHP_EOL . "Now we are";