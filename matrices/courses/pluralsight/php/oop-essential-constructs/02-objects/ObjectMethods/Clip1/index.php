<?php
//Load the class
require 'classes/Form.php';

$attributes = [
    'nameAttribute' => 'Registration',
    'classAttribute' => 'FormClass1',
];

$id = 'FormId';

$form = new Form();
$form->setFormAttribs($attributes);
$form->setId($id);

echo $form->classAttribute . PHP_EOL;
echo $form->nameAttribute . PHP_EOL;
echo $form->id;
