<?php

$things = ['thing1', 'thing2', 'thing3'];
$count = count($things);

if ($count > 3) {
    echo "hey I'm not empty. I've got ".$count." things.";
} elseif ($count == 3) {
    echo "you've got three things";
} else {
    echo "you got nothing";
}
echo PHP_EOL;