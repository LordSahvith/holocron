<?php

class Person 
{
  private $_name;
  private $_job;
  private $_age;

  public function __construct($name, $job, $age)
  {
    $this->_name = $name;
    $this->_job = $job;
    $this->_age = $age;
  }

  public function changeJob($newJob)
  {
    $this->_job = $newJob;
  }

  public function happyBirthday()
  {
    ++$this->_age;
  }
}

// Create two new people
$person1 = new Person("Ezio", "Assassin", 30);
$person2 = new Person("Altair", "Grand Master Assassin", 35);

// Output their starting point
echo "<pre>Person 1: ", print_r($person1, TRUE),  "</pre>";
echo "<pre>Person 2: ", print_r($person2, TRUE),  "</pre>";

// give Ezio an promotion and birthday
$person1->changeJob("Head of the Brotherhood");
$person1->happyBirthday();

// Altair just gets a birthday
$person2->happyBirthday();

// Output the ending values
echo "<pre>Person 1: ", print_r($person1, TRUE),  "</pre>";
echo "<pre>Person 2: ", print_r($person2, TRUE),  "</pre>";

?>