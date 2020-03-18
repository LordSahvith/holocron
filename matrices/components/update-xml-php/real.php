<?php 

$xml = simplexml_load_file("real.xml");

$css = $xml->addChild("css")->addAttribute("src", "test");

// // save the updated document
$xml->asXML('real.xml');