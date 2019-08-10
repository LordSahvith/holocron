2<?php 

/**
 * A simple class
 * 
 * 
 * A long description of class that
 * will span as many lines and necessary.
 * This is optional but the short description
 * is recommended and only needs short explanation
 * 
 * 
 * short description. a class that does so and so
 * 
 * @author Caleb Anderson <email@email.com>
 * @copyright 2019 Tutorials
 * @license https://www.php.net/license/3_01.txt PHP License 3.01
 */

 Class SimpleClass 
 {
   /**
    * A public variable
    *
    * @var string stores data for the class
    */
    public $foo;

    /**
     * Sets $foo to a new value upon class instantiation
     * 
     * @param string $val a value required for the class
     * @return void
     */
    public function __construct($val)
    {
      $this->foo = $val;
    }

    /**
     * Multiplies two integers
     * 
     * Accepts a pair of inegers and returens thh
     * product of the two
     * 
     * @param int $bat a number to be multiplied
     * @param int $baz a number to be multiplied
     * @return int the product of the two parameters
     */
    public function bar($bat, $baz)
    {
      return $bat * $baz;
    }
 }

?>