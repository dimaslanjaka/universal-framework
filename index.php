<?php

//require_once __DIR__ . '/vendor/autoload.php';
#import configuration
include_once __DIR__ . '/config.php';

use MVC\helper;
use MVC\router;
use MVC\themes;

$router = new router();
# start environtment as development for debugging
$router->environtment('development');
//exit(var_dump($router));

$theme =  new themes();
# set theme material bootstrap pro + font awesome pro 5
$theme->set('mdb');

$theme_manager = 'theme-manager';
$application_folder = '';
$view_folder = 'views';
$view_folder = __DIR__ . DIRECTORY_SEPARATOR . $application_folder . DIRECTORY_SEPARATOR . $view_folder . DIRECTORY_SEPARATOR;
define('VIEWPATH', $view_folder);

if (isset($_REQUEST['json'])) {
	header('Content-type: application/json');
}

$rc = new router();

$view = VIEWPATH . $rc->findRoute() . '.php';
# glype proxy
if (str_replace('.php', '', $view) == 'index/bot/glype/admin') {
	include __DIR__ . '/bot/glype/admin.php';
	exit;
}

# default router
if (!realpath($view)) {
	# if file not exists return 400 bad request
	http_response_code(400);
	if (defined('ENVIRONTMENT')) {
		if (ENVIRONMENT != 'development') {
			# skip debug if environtment not development
			$view = '';
		}
	}
	$basename = basename($view, '.php');
	if ($basename == $theme_manager) {
		$theme->admin();
		exit;
	} else if ($basename == 'load-asset') {
		$parse = helper::parse_url2(helper::geturl());
		if (isset($parse['query']['src'])) {
			helper::load_asset($parse['query']['src']);
			exit;
		}
	}
	# exit now
	exit(trim("$view Not found"));
} elseif ($view = realpath($view)) {
	# if file exists, set as view
	$theme->view($view);
	# render view in theme
	$theme->render();
}
