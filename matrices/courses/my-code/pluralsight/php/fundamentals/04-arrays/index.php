<?php
echo "<h1>PHP Array's</h1>";

$characters = array("Acaelus Thorne", "Azoth", "Peter Parker", "Bruce Wayne");
$alterEgos = ["Durzo Blint", "Kylar Stern", "Spiderman", "Batman"];

echo "<pre>";
print_r($characters);
echo "</pre>";
echo "<br />";
echo "<pre>";
print_r($alterEgos);
echo "</pre>";
echo "<br />";
echo "<br />";

$mixedArray = ["strings", 3, 3.14];
echo "<pre>";
print_r($mixedArray);
echo "</pre>";
echo "<br />";
echo "<br />";

$assocArray = array(
    "firstName" => "Durzo",
    "lastName" => "Blint",
    "job" => "Wetboy"
);

echo "<pre>";
print_r($assocArray);
echo "</pre>";
echo "<br />";
echo "<br />";

echo "$characters[0] <br />"; 
echo "$alterEgos[2] <br />"; 
echo $assocArray["job"] . "<br />";
echo array_key_exists("lastName", $assocArray);
echo in_array("Azoth", $characters);
echo "<br />";
echo "<br />";

array_push($characters, "Clark Kent"); // throws error if array doesn't exist
echo "<pre>";
print_r($characters);
echo "</pre>";
echo "<br />";
$characters[] = "Dessel"; // creates array if it doesn't exist, no error
echo "<pre>";
print_r($characters);
echo "</pre>";
echo "<br />";
$assocArray["age"] = 700;
echo "<pre>";
print_r($assocArray);
echo "</pre>";
echo "<br />";
$deletedItem = array_pop($characters);
echo $deletedItem . "<br />";
echo "<pre>";
print_r($characters);
echo "</pre>";
echo "<br />";
unset($assocArray["age"]);
echo "<pre>";
print_r($assocArray);
echo "</pre><br />";
$sortedCharacters = $characters;
sort($sortedCharacters);
echo "<pre>";
print_r($sortedCharacters);
echo "</pre><br />";
$sortedAssocArray = $assocArray;
sort($sortedAssocArray); // notice keys are now indexed
echo "<pre>";
print_r($sortedAssocArray);
echo "</pre><br />";

?>