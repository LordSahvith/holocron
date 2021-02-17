<?php
//Load the class
require 'classes/Form.php';

$form = new Form();

$form->set('id', 'itemId');
unset($form->id);
echo $form->id;

$form->set('id', 'itemId');
$form->id = null;
echo $form->id;

$form->set('id', 'itemId');
$form->set('id');
echo $form->id;