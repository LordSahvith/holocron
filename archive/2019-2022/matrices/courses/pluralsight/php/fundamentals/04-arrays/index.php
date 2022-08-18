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
sort($sortedAssocArray); // notice keys are now indexed, use asort() or ksort() for associative arrays
echo "<pre>";
print_r($sortedAssocArray);
echo "</pre><br />";
asort($assocArray); // notice keys are kept and sorted by value
echo "<pre>";
print_r($assocArray);
echo "</pre><br />";
ksort($assocArray); // notice keys are kept and sorted by key
echo "<pre>";
print_r($assocArray);
echo "</pre><br />";
echo count($characters);
echo "<br />";

foreach ($characters as $character)
{
    echo $character . "<br />";
}

foreach ($assocArray as $key => $value)
{
    echo $key . " : " . $value . "<br />";
}

$multiDimensionalArray = array(
    "Hero" => array(
        "Batman" => array("is cool", "and stuff"),
        "Superman" => array("is kinda cool", "some stuff"),
        "Kylar Stern" => array("is a badass", "super stuff")
    ),
    "Villian" => array(
        "Joker" => array("is cool", "and stuff"),
        "Lex Luthor" => array("is kinda cool", "some stuff"),
        "Durzo Blint" => array("is a badass", "super stuff")
    )
);
echo "<pre>";
print_r($multiDimensionalArray);
echo "</pre><br />";


?>