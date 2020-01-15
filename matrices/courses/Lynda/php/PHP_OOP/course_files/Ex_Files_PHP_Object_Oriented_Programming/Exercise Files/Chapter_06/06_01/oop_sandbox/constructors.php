<?php

class Sofa {

  public static $instance_count = 0;

  public $seats = 3;
  public $arms = 2;

}

class Couch extends Sofa {
  var $arms = 0;
}

class Loveseat extends Sofa {
  var $seats = 2;
}

$sofa = new Sofa();
echo 'Sofa<br />';
echo '- seats: ' . $sofa->seats . '<br />';
echo '- arms: ' . $sofa->arms . '<br />';
echo '<br />';

$couch = new Couch();
echo 'Couch<br />';
echo '- seats: ' . $couch->seats . '<br />';
echo '- arms: ' . $couch->arms . '<br />';
echo '<br />';

$loveseat = new Loveseat();
echo 'Loveseat<br />';
echo '- seats: ' . $loveseat->seats . '<br />';
echo '- arms: ' . $loveseat->arms . '<br />';
echo '<br />';

echo 'Instance count: ' . Sofa::$instance_count . '<br />';

?>
