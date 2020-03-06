<?php

$things = ['thing1', 'thing2', 'thing3'];
// $count = count($things);

$outcome = $count ?? $thing ?? "Count not here right now."; // checks if variable has been set
echo $outcome;

echo PHP_EOL;