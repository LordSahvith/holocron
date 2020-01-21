<?php

namespace index;

echo "<h1>PHP Classes & Objects</h1>";

class Person1 
{
    const AVG_LIFE_SPAN = 79;

    public $firstName;
    public $lastName;
    public $yearBorn;

    function __construct($firstName = "", $lastName = "", $yearBorn = "")
    {
        echo "Person Constructor.".PHP_EOL;
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
    
    public function getFullName()
    {
        echo "Person-getFullName()<br />";
        return $this->firstName . " " . $this->lastName;
    }
}

class Person 
{
    const AVG_LIFE_SPAN = 79;

    private $firstName;
    private $lastName;
    private $yearBorn;

    public static $test = "testing complete.";

    function __construct($firstName = "", $lastName = "", $yearBorn = "")
    {
        echo "Person Constructor.".PHP_EOL;
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
    
    protected function getFullName()
    {
        echo "Person-getFullName()<br />";
        return $this->firstName . " " . $this->lastName;
    }

    public function getYearBorn()
    {
        return $this->yearBorn;
    }

    public function setYearBorn($yearBorn)
    {
        $this->yearBorn = $yearBorn;
    }
}

class Author extends Person
{
    public static $selfStaticTest = "33th";
    private $penName = "Your Holiness";

    public function getPenName()
    {
        return $this->penName.PHP_EOL;
    }
    
    public function getCompleteName()
    {
        return $this->getFullName() . " a.k.a. ". $this->penName . "<br />";
    }

    public static function getSelfStaticProperty()
    {
        return self::$selfStaticTest;
    }

    public static function getParentStaticProperty()
    {
        return parent::$test;
    }
}

$myObject = new Person1("Lord", "Sahvith", "3350bby");

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

$secObject = new Person1("Billy", "Bob", 1945);
$secObject->setFirstName("billy");
echo $secObject->firstName;
echo $secObject->yearBorn;
echo "<br />";

$thirdObject = new Person();
$thirdObject->setFirstName("Another one");
echo $thirdObject->getFirstName();
echo "<br />";

echo "<h2>Static/Public/Protected/Private</h2>";

$newAuthor = new Author("Darth", "Sahvith", "3350bby");
echo "<br />";
echo $newAuthor->getCompleteName();
echo "<br />";
// echo Author::$selfStaticTest;
echo $newAuthor->getSelfStaticProperty();
echo "<br />";
echo $newAuthor->getParentStaticProperty();
echo "<br />";

echo "<h2>Scope Resolution Operator</h2>";
echo Person::AVG_LIFE_SPAN;
echo "<br />";
echo Person::$test;
echo "<br />";
echo Author::getSelfStaticProperty();

?>