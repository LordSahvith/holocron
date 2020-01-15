<?php

$header = false;
$data = [];
$file = fopen($filename, 'r');
while(!feof($file)) {
  $row = fgetcsv($file, 0, ',');
  if($row == [NULL] || $row === FALSE) { continue; }
  if(!$header) {
 	  $header = $row;
  	} else {
  	  $data[] = array_combine($header, $row);
 	}
}
fclose($file);

?>
