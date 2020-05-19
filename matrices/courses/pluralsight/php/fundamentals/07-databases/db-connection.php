<?php

$dbPassword = "";
$dbUserName = "root";
$dbServer = "localhost";
$dbName = "phpfundamentals";

$connection = new mysqli($dbServer, $dbUserName, $dbPassword, $dbName);

if ($connection->connect_errno) {
    exit("Database Connection Failed, Reason: " . $connection->connect_error);
}

// $query = "DELETE FROM authors WHERE first_name='bob'";
// $query = "UPDATE Authors SET pen_name='The Scruffy Batman' WHERE first_name='batman'";
$query = "INSERT INTO Authors (first_name, last_name, pen_name) VALUES ('Drew', 'Karpyshyn', 'The Mage')";

$connection->query($query);

echo "Newly created author id: " . $connection->insert_id . PHP_EOL;

$connection->close();