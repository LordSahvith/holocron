<?php
echo "<h1>PHP Functions</h1>";

// Functions Basics
function begin()
{
    echo "Start...<br />";
}
begin();


function takesParameter($param)
{
    echo $param . "<br />";
}
takesParameter("this was passed through function.");


function takesMultipleParmas($param1, $param2)
{
    echo $param1 . " : " . $param2 . "<br />";
}
takesMultipleParmas("this is param1", "this is param2");


function defaultParam($param1, $param2 = "default parameter")
{
    echo $param1 . " : " . $param2 . "<br />";
}
defaultParam("first parameter");
defaultParam("first parameter", "second parameter");


function getParameter()
{
    return "this is a parameter from a function call.";
}
takesParameter(getParameter());


$variableFunctionName = "getParameter";
echo $variableFunctionName() . " Used with a variable function.<br />";
$variableFuntionString = $variableFunctionName() . " Used with variable function.<br />";

takesMultipleParmas("first parameter", $variableFunctionName());
takesMultipleParmas("first parameter", $variableFuntionString);
// end of Functions Basics

// Function Scope
echo "<h3>before scopeExample1() call</h3>";
$outside = "outside";
$inside = "outside";
echo "$" . "outside = " . $outside . "<br />";
echo "$" . "inside = " . $inside . "<br />";

function scopeExample1() 
{
    $inside = "inside";
    $outside = "inside";
    echo "<h3>inside scopeExample1() call</h3>";
    echo "$" . "outside = " . $outside . "<br />";
    echo "$" . "inside = " . $inside . "<br />";
}
scopeExample1();

echo "<h3>after scopeExample1() call</h3>";
echo "$" . "outside = " . $outside . "<br />";
echo "$" . "inside = " . $inside . "<br />";

function scopeExample2() 
{
    $outside = "inside";
    echo "<h3>inside scopeExample2() call</h3>";
    echo "$" . "outside = " . $outside . "<br />";
    return $outside;
}

$outside = scopeExample2();
echo "<h3>after scopeExample2() call on $" . "outside</h3>";
echo "$" . "outside = " . $outside . "<br />";

function scopeExample3() 
{
    $inside = "inside";
    echo "<h3>inside scopeExample3() call</h3>";
    echo "$" . "inside = " . $inside . "<br />";
    return $inside;
}

$inside = scopeExample3();
echo "<h3>after scopeExample2() call on $" . "inside</h3>";
echo "$" . "inside = " . $inside . "<br />";
// end of Function Scope

// Global Variables
echo "<h3>before globalExample() call</h3>";
$outside = "outside";
echo "$" . "outside = " . $outside . "<br />";

function globalExample() 
{
    global $outside; // global must be declared in function
    $outside = "inside";
    echo "<h3>inside globalExample() call</h3>";
    echo "$" . "outside = " . $outside . "<br />";
}
globalExample();

echo "<h3>after globalExample() call</h3>";
echo "$" . "outside = " . $outside . "<br />";
// end of Global Variables

?>