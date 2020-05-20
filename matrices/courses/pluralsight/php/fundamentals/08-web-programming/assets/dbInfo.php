<?php

$dbPassword = "";
$dbUserName = "root";
$dbServer = "localhost";
$dbName = "phpfundamentals";

$connection = new mysqli($dbServer, $dbUserName, $dbPassword, $dbName);

if ($connection->connect_errno) {
    die("Database Connection Failed, Reason: " . $connection->connect_error);
}

?>