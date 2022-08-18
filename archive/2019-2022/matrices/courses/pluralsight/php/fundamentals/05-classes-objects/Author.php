<?php
class Author extends Person
{
    public static $selfStaticTest = "33th";
    private $penName = "Your Holiness";

    public function __construct($alias, $firstName, $lastName, $yearBorn) {
        parent::__construct($firstName, $lastName, $yearBorn);
        $this->penName = $alias;
    }

    public function getPenName()
    {
        return $this->penName.PHP_EOL;
    }
    
    public function getCompleteName()
    {
        return $this->getFullName() . " a.k.a. ". $this->penName . "<br />";
    }

    public function getFullName()
    {
        echo "Author-getFullName()<br />";
        $personFullName = parent::getFullName();
        echo $personFullName . " a.k.a. ". $this->penName . "<br />";
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
