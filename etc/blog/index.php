<?php
header('X-Powered-By: L3n4r0x');

//import configuration
include __DIR__ . '/../../config.php';

use MVC\helper;
use MVC\router;
use MVC\themes;

// start theme
$theme = new themes();
$theme->set('mdb-dashboard');
$theme->view(__DIR__ . '/render.php');
$theme->render();
