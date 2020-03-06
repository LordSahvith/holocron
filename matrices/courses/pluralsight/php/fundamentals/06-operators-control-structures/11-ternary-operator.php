<?php

$things = ['thing1', 'thing2', 'thing3'];
$count = count($things);

$outcome = ($count > 0) ? "hey I'm not empty. I've got ".count($things)." things." : "you got nothing";
echo $outcome;

echo PHP_EOL;