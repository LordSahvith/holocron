<?php
//Define a path constants for requires
define('CLASSES', __DIR__ . '/Classes/');
define('LAYOUTS', __DIR__ . '/Layouts/');
require 'Controllers/AppController.php';

$controller = new AppController();
$controller->init();