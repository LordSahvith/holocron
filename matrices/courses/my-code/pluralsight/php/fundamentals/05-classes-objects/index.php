<?php

namespace index;

echo "<h1>PHP Classes & Objects</h1>";

class Person 
{
    const AVG_LIFE_SPAN = 79;

    public $firstName;
    public $lastName;
    public $yearBorn;

    function __construct($firstName = "", $lastName = "", $yearBorn = "")
    {
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->yearBorn = $yearBorn;
    }

    public function getFirstName() 
    {
        return $this->firstName;
    }

    public function setFirstName($tempName)
    {
        $this->firstName = $tempName;
    }
}

$myObject = new Person("Lord", "Sahvith", "3350bby");

echo $myObject::AVG_LIFE_SPAN;
echo "<br />";
echo $myObject->firstName;
echo "<br />";

$myObject->firstName = "Darth";
echo $myObject->firstName . " ";
echo $myObject->lastName . " ";
echo $myObject->yearBorn;
echo "<br />";

$myObject->setFirstName("Your Holiness");
echo $myObject->firstName;
echo "<br />";

$secObject = new Person("Billy", "Bob", 1945);
$secObject->setFirstName("billy");
echo $secObject->firstName;
echo $secObject->yearBorn;
echo "<br />";

$thirdObject = new Person();
$thirdObject->setFirstName("Another one");
echo $thirdObject->getFirstName();
echo "<br />";

?>