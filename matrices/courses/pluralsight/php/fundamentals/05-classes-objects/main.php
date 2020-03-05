<?php
include_once "Person.php";
require "Author.php"; // must exist otherwise script will stop

echo "<h1>PHP Include Files</h1>";

$newAuthor = new Author("Your Holiness", "Lord", "Sahvith", "3350bby");
echo $newAuthor->getFullName();
$newAuthor->setFirstName("Darth");
echo $newAuthor->getFullName();

?>