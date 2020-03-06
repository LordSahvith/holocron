<?php

$things = ['thing1', 'thing2', 'thing3'];
$count = count($things);

switch ($count) {
    case 0:
        echo "you have nothing.";
        break;
    case 1:
        echo "you have 1 thing.";
        break;
    default:
        echo "you have $count things.";
        break;
}
echo PHP_EOL;
