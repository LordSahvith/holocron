<?php
//Load the class
require 'classes/Form.php';

//Instantiate a form object
$form = new Form();

//Cloning an object creates a duplicate with replicated properties and methods
$anotherForm = clone $form;

//Testing in this manner identifies unique objects
if($anotherForm === $form){
    echo 'They are aliases';
}else{
    echo 'They are duplicates';
}

echo PHP_EOL;

/*Assigning creates an alias to the original object. This allows
two variables to write to the same values. In this case, $anotherForm
only contains an object identifier which allows access to the same object.*/
$anotherForm = $form;

//Testing in this manner identifies the alias and, therefore, the same object
if($anotherForm == $form){
    echo 'They are aliases';
}else{
    echo 'They are duplicates';
}

