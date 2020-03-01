<?php 
echo "<h1>PHP basics</h1>";

// dealing with integers
echo "<h2>Dealing with integers.</h2>";
$regInt = 1234;
$octNum = 01234;
$hexNum = 0xABC;
$binaryNum = 0b1000;

var_dump($regInt);
echo "<br />";
var_dump($octNum);
echo "<br />";
var_dump($hexNum);
echo "<br />";
var_dump($binaryNum);
// end of integers

// floating numbers
echo "<h2>Dealing with Floats.</h2>";
$float = 1.234;
$scientific1 = 0.1234E4;
$scientific2 = 1234E-4;

var_dump($float);
echo "<br />";
var_dump($scientific1);
echo "<br />";
var_dump($scientific2);
// end of floats

// booleans
echo "<h2>Dealing with Booleans.</h2>";
$bool1 = true;
$bool2 = false;
$hasValue1 = 12;
$hasValue2 = "Value";
$noValue1 = 0;
$noValue2 = "";
$noValue3 = [];

var_dump($bool1);
echo "<br />";
var_dump($bool2);
echo "<br />";
var_dump((bool)$hasValue1);
echo "<br />";
var_dump((bool)$hasValue2);
echo "<br />";
var_dump((bool)$noValue1);
echo "<br />";
var_dump((bool)$noValue2);
echo "<br />";
var_dump((bool)$noValue3);
// end of booleans

// Constants
echo "<h2>Dealing with Constants.</h2>";
define('NEW_CONSTANT', "this is a constant");

echo NEW_CONSTANT;
// end contants

// Determine Type
echo "<h2>Determining Types.</h2>";

define('CHECK_CONSTANT', "this is a constant");
$intVar = 1234;
$stringVar = "String";
$boolVar = false;
$floatVar = 12.34;

echo is_int($intVar) . "<br />";
echo is_string($stringVar) . "<br />";
echo is_bool($boolVar) . "<br />";
echo is_float($floatVar) . "<br />";
echo defined('CHECK_CONSTANT');
// end Determine type