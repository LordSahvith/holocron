<?php

$dbPassword = '';
$dbUserName = 'root';
$dbServer = 'localhost';
$dbName = 'phpfundamentals';

$connection = new mysqli($dbServer, $dbUserName, $dbPassword, $dbName);

if ($connection->connect_errno) {
    exit('Database Connection Failed. Exception: '. $connection->connect_error);
}
