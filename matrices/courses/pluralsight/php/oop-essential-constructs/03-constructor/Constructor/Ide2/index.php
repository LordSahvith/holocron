<?php
//Load the classes
require 'classes/Form.php';
require 'classes/Field.php';

$type = 'text';
$name = 'username';
$fields[] = new Field($type, $name);

$name = 'password';
$fields[] = new Field($type, $name);

$name = 'Login';
$id = 'Form1';
$form = new Form($name, $id, $fields);

//Output
echo $form->getStartTag() . PHP_EOL;
foreach($form->getFields() as $field) {
    echo ucfirst($field->getName()) . ': ' . $field->getTag() . PHP_EOL;
}
echo $form->getEndTag();