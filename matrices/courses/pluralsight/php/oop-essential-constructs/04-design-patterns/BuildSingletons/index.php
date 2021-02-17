<?php
//Load the static factory service
require 'classes/ObjectFactoryService.php';

//Pickup config
$params = require 'config/config.php';

//Get a session object for state use
$session = ObjectFactoryService::getSession();
$session->start();

//Get required objects from the service
$db = ObjectFactoryService::getDb($params);
$model = ObjectFactoryService::getModel($db);
$view = ObjectFactoryService::getView();

//Get results from the db
$users = $model->getUsers();

//Save the user result state
$session->save(['users' => $users]);

//Set the results into the view container
$view->setResults($users);

//Generate the response
$view->render();

