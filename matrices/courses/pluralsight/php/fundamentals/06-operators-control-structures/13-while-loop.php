<?php

$stuff = true;
$initStuff = 0;

while ($stuff) {
    echo "Hi, I'm stuff.".PHP_EOL;
    $stuff = false;
}

while ($initStuff < 5) {
    echo "initStuff here.".PHP_EOL;
    $initStuff++;
}