<?php

$dbPassword = '';
$dbUserName = 'root';
$dbServer = 'localhost';
$dbName = 'phpfundamentals';

$connection = new mysqli($dbServer, $dbUserName, $dbPassword, $dbName);

if ($connection->connect_errno) {
    exit('Database Connection Failed. Exception: '. $connection->connect_error);
}

$query = 'SELECT * FROM Authors';

$authors = $connection->query($query);

if ($authors->num_rows > 0) {
    while ($singleAuthor = $authors->fetch_assoc()) {
        print_r($singleAuthor);
    }
}

$authors->close();
$connection->close();