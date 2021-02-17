<?php
//Load the class
require 'classes/Form.php';

$form = new Form();

//Log some data
$data = 'Some data to log';
$form->logger($data);

//Echo the page content
echo $form->loadHtml();