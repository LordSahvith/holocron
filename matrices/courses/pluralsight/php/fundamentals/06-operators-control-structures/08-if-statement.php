<?php

$things = ['thing1', 'thing2', 'thing3'];

if (count($things) > 0) {
    echo "hey I'm not empty. I've got ".count($things)." things.";
} else {
    echo "you got nothing";
}
echo PHP_EOL;