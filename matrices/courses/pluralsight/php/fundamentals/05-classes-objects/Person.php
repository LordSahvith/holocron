<?php
class Person 
{
    const AVG_LIFE_SPAN = 79;

    private $firstName;
    private $lastName;
    private $yearBorn;

    public static $test = "testing complete.";

    public function __construct($firstName = "", $lastName = "", $yearBorn = "")
    {
        echo "Person Constructor.<br />";
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

    public function getAge() {
        return 25;
    }
}
?>
