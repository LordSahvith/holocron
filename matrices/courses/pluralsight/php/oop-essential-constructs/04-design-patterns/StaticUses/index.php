<?php
//Load the classes
require 'classes/Form.php';
require 'classes/StringLengthValidator.php';
require 'classes/InputText.php';

//Form attributes
$name = 'Login';
$id = 'Form1';

//The username input
$usernameInput = new InputText();
$usernameInput->setLabel('username');
$usernameInput->setRequired();

//The password input
$passwordInput = new InputText();
$passwordInput->setType('password');
$passwordInput->setLabel('password');
$passwordInput->setRequired();

//The submit button
$submitInput = new InputText();
$submitInput->setType('submit');

//Set the form fields
$fields = [
    'username' => $usernameInput,
    'password' => $passwordInput,
    'submit' => $submitInput,
];

$form = new Form($name, $id, $fields);

//If the form was submitted
if(!empty($_POST['Username']) && !empty($_POST['Password'])){
    $username = ctype_alnum($_POST['Username'])?$_POST['Username']:null;
    $password = ctype_alnum($_POST['Password'])?$_POST['Password']:null;
    StringLengthValidator::setMaximum(30);
    StringLengthValidator::setMinimum(5);
    if(StringLengthValidator::validate($username)
        && StringLengthValidator::validate($password)){
        echo "<h1>Thank you for logging in $username</h1>";
        exit;
    } else {
        echo "invalid input, username and password must be between 5 and 30 characters";
    }
}

echo '<h1>Hello. Please login</h1>';
echo $form->getStartTag() . PHP_EOL;
foreach($form->getFields() as $field){
    if($field->label) echo $field->label . ": ";
    echo $field->getInput() . '<br/>';
}
echo $form->getEndTag();

