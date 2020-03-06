<?php

$things = true;

for ($i = 0; $i < 5; $i++) :
    echo "alternate syntax is aliright.".PHP_EOL;
endfor;

while ($things) :
    echo "alternate syntax is kinda weird.".PHP_EOL;
    $things = false;
endwhile;

if (!$things) :
    echo "I'm back!.".PHP_EOL;
else :
    echo "I'm lost.".PHP_EOL;
endif;