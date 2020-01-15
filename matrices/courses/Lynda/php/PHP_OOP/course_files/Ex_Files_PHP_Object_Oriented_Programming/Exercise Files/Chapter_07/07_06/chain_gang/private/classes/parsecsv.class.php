<?php

class ParseCSV {

  public $filename;
  private $header;
  private $data=[];

  public function __construct($filename='') {
    if($filename != '') {
      $this->filename = $filename;
    }
  }

  public function parse() {
    $file = fopen($this->filename, 'r');
    while(!feof($file)) {
      $row = fgetcsv($file, 0, ',');
      if($row == [NULL] || $row === FALSE) { continue; }
      if(!$this->header) {
     	  $this->header = $row;
      } else {
        $this->data[] = array_combine($this->header, $row);
     	}
    }
    fclose($file);
    return $this->data;
  }

}

?>
