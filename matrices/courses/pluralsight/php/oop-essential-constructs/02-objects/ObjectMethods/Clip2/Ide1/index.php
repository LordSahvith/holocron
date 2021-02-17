<?php
//Load the class
require 'classes/Form.php';


$form = new Form();
$name = 'LoginForm';

if($form->setName($name)){
    echo 'Success';
}else{
    echo 'Alert, no value passed';
};