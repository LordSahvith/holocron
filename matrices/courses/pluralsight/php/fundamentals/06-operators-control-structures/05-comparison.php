<?php

// equal operator
var_dump('8' == 8); // returns true 

// not equal operator
var_dump('8' != 8); // returns false 

echo PHP_EOL;

// identical operator (data type)
var_dump(8 === 8); // returns true

// not identical operator (data type)
var_dump(8 !== 8); // returns false

echo PHP_EOL;

var_dump('8' === 8); // returns false - string is not an int
var_dump('8' !== 8); // returns true - string is not an int

echo PHP_EOL;

// greater than 
var_dump(4 > 7); // returns false

// less than 
var_dump(4 < 7); // returns true

echo PHP_EOL;

// greater than or equal to 
var_dump(4 >= 7); // returns false

// less than or equal too
var_dump(4 <= 7); // returns true