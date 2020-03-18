<?php 

$info = simplexml_load_file("test.xml");

// update
$info->user->name->nameCoordinate->xName = "this works too";
$info->user->name->nameCoordinate->yName = 3;

// save the updated document
$info->asXML('test.xml');