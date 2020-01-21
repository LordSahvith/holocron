<?php
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

    public function getFullName()
    {
        echo "Author-getFullName()<br />";
        echo parent::getFullName() . " a.k.a. ". $this->penName . "<br />";
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
