<?php
include "Person.php";
include "Author.php";

echo "<h1>PHP Include Files</h1>";

$newAuthor = new Author("Lord", "Sahvith", "3350bby");
echo $newAuthor->getFullName();
$newAuthor->setFirstName("Darth");
echo $newAuthor->getFullName();

?>