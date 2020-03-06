<?php

$addition = 4;
$subtraction = 4;
$muliplication = 4;
$division = 4;
$exponent = 4;

echo PHP_EOL;
echo 'before: ' . $addition . PHP_EOL;
$addition = $addition + 2;
echo '$addition = $addition + 2 = '. $addition . PHP_EOL;
$addition += 2;
echo '$addition += 2 = '. $addition . PHP_EOL;

echo PHP_EOL;
echo 'before: ' . $subtraction . PHP_EOL;
$subtraction = $subtraction - 2;
echo '$subtraction = $subtraction - 2 = '. $subtraction . PHP_EOL;
$subtraction -= 2;
echo '$subtraction -= 2 = '. $subtraction . PHP_EOL;

echo PHP_EOL;
echo 'before: ' . $muliplication . PHP_EOL;
$muliplication = $muliplication * 2;
echo '$muliplication = $muliplication * 2 = '. $muliplication . PHP_EOL;
$muliplication *= 2;
echo '$muliplication *= 2 = '. $muliplication . PHP_EOL;

echo PHP_EOL;
echo 'before: ' . $division . PHP_EOL;
$division = $division / 2;
echo '$division = $division / 2 = '. $division . PHP_EOL;
$division /= 2;
echo '$division /= 2 = '. $division . PHP_EOL;

echo PHP_EOL;
echo 'before: ' . $exponent . PHP_EOL;
$exponent = $exponent ** 2;
echo '$exponent = $exponent ** 2 = '. $exponent . PHP_EOL;
$exponent **= 2;
echo '$exponent **= 2 = '. $exponent . PHP_EOL;

echo PHP_EOL;