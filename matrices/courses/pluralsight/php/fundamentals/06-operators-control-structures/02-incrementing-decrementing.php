<?php

$firstNumber = 1;
$secondNumber = 10;
$thirdNumber = 1;
$fourthNumber = 10;

echo PHP_EOL;

echo '$firstNumber before post increment '. $firstNumber . PHP_EOL;
$firstNumber++; // print variable then increment
echo '$firstNumber after post increment ' . $firstNumber . PHP_EOL;
echo '$firstNumber post incrementing here ' . $firstNumber++ . PHP_EOL;
echo '$firstNumber after post incrementing in echo ' . $firstNumber . PHP_EOL . PHP_EOL;

echo '$secondNumber before post decrement '. $secondNumber . PHP_EOL;
$secondNumber--; // print variable then decrement
echo '$secondNumber after post decrement ' . $secondNumber . PHP_EOL;
echo '$secondNumber post decrementing here ' . $secondNumber-- . PHP_EOL;
echo '$secondNumber after post incrementing in echo ' . $secondNumber . PHP_EOL . PHP_EOL;

echo '$thirdNumber before pre increment '. $thirdNumber . PHP_EOL;
++$thirdNumber; // increment then print variable 
echo '$thirdNumber after pre increment ' . $thirdNumber . PHP_EOL;
echo '$thirdNumber pre incrementing here ' . ++$thirdNumber . PHP_EOL;
echo '$thirdNumber after pre incrementing in echo ' . $thirdNumber . PHP_EOL . PHP_EOL;

echo '$fourthNumber before post decrement '. $fourthNumber . PHP_EOL;
--$fourthNumber; // decrement then print variable 
echo '$fourthNumber after post decrement ' . $fourthNumber . PHP_EOL;
echo '$fourthNumber post decrementing here ' . --$fourthNumber . PHP_EOL;
echo '$fourthNumber after post incrementing in echo ' . $fourthNumber . PHP_EOL . PHP_EOL;
