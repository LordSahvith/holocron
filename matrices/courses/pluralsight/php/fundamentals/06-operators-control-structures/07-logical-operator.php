<?php

$greater = 4 > 2;
$lesser = 4 < 8;

$false = false;
$true = true;

var_dump($greater);
var_dump($lesser);

var_dump($greater && $lesser);

var_dump($false && $true);

var_dump($false || $true);

var_dump(!$true);