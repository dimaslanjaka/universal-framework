<?php

/** @noinspection DuplicatedCode */

/*if (count($_COOKIE) <= 50) {
  foreach ($_COOKIE as $key => $val) {
  if (!is_numeric($key) || !is_string($key)) {
  continue;
  }
  setcookie('same-site-cookie', $key, ['samesite' => 'Lax']);
  setcookie('cross-site-cookie', $key, ['samesite' => 'None', 'secure' => true]);
  }
}*/

header('X-Powered-By: L3n4r0x');

//import configuration
include_once __DIR__ . '/config.php';

use DDOS\runner;
use MVC\helper;
use MVC\router;
use MVC\themes;

// force redirect, this is our project, you can remove this
if ('103.146.203.101' == $_SERVER['HTTP_HOST'] && !LOCAL) {
    header('Location: https://ns.webmanajemen.com' . $_SERVER['REQUEST_URI']);
    // force https
    if (isset($_SERVER['HTTPS']) && 'on' != $_SERVER['HTTPS']) {
        header('Location: https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
    } else {
        // tell browser to access https only
        header('Strict-Transport-Security: max-age=31536000');
    }
}

// run DDOS protector
new runner();

// start theme
$theme = new themes();

////// Custom maintenance start
//@todo disable maintenance mode for admin
//this maintenance applied on production mode (NON LOCALHOST)
if (!LOCAL) { //change this
    if (isset($_REQUEST['release'])) {
        \Cookie\helper::hours('release-maintenance', 'true', 1);
    }
    if (!isset($_COOKIE['release-maintenance'])) {
        //maintenance(); //uncomment this to enable
    }
}
////// Custom maintenance end

////// Zone Shutdown Start
$shut = get_conf()['app']['shutdown'];
if (!LOCAL) { // do shutdown if not localhost
    $theme->shutdown($shut);
}
////// Zone Shutdown End

////// build template start

/**
 * Template configuration.
 */
$template = get_conf()['app']['theme'];
/**
 * Template stack builder.
 *
 * @todo exclude default template from scopes
 */
$template_stack = [];
if (!empty($template)) {
    foreach ($template as $key => $value) {
        if ('default' == $key) {
            continue;
        }
        $template_stack[$key] = $value;
    }
}

// Set template by zone divider
$theme->setThemeByZones(
    $template_stack,
    get_conf()['app']['theme']['default']
);

////// build template end

$application_folder = empty(CONFIG['app']['root']) ? __DIR__ : ROOT;
$view_folder = CONFIG['app']['views'];
// special access
switch (get_zone()) {
    case 'load-asset':
        // load static asset by ?src=
        $parse = helper::parse_url2(helper::geturl());
        if (isset($parse['query']['src'])) {
            helper::load_asset($parse['query']['src']);
            exit;
        }
        break;

    case 'superuser': // superuser framework
    case 'server': //server framework
        //set folder etc for root views
        $view_folder = 'etc';
        break;
}

$view_folder = "{$application_folder}/{$view_folder}/";
define('VIEWPATH', $view_folder);

$rc = new router();
$view = helper::fixSlash(VIEWPATH . $rc->findRoute() . '.php');

// glype proxy
if ('index/bot/glype/admin' == str_replace('.php', '', $view)) {
    /** @noinspection PhpIncludeInspection */
    include __DIR__ . '/bot/glype/admin.php';
    exit;
}

// start output buffering
ob_start();

// default router
if (!realpath($view)) {
    // if file not exists return 400 bad request
    http_response_code(400);
    $basename = basename($view, '.php');

    /**
     * next index finder.
     */
    $check_next_index = preg_replace('/\.php$/s', '', $view) . '/index.php';
    if ($check_next_index = realpath($check_next_index)) {
        $check_next_index = helper::fixSlash($check_next_index);
        $check_next_index = preg_replace('/\.php$/s', '', $check_next_index);
        if ($pos_views = strpos($check_next_index, '/views')) {
            $check_next_index = substr($check_next_index, $pos_views + strlen('/views'));
        } elseif ($pos_views = strpos($check_next_index, '/etc')) {
            $check_next_index = substr($check_next_index, $pos_views + strlen('/etc'));
        }
        /** @noinspection PhpUndefinedVariableInspection */
        $router->redirect($check_next_index);
        exit;
    }

    ////// if router ended with slash (/) below codes will find next index.php or previous file php
    ////// dashboard/ maybe to dashboard/index or dashboard.php if exists

    /**
     * Previous index finder.
     */
    $check_prev_index = preg_replace('/\/index\.php$/s', '', $view) . '.php';
    if ($check_prev_index = realpath($check_prev_index)) {
        $check_prev_index = helper::fixSlash($check_prev_index);
        $check_prev_index = preg_replace('/\.php$/s', '', $check_prev_index);
        if ($pos_views = strpos($check_prev_index, '/views')) {
            $check_prev_index = substr($check_prev_index, $pos_views + strlen('/views'));
        } elseif ($pos_views = strpos($check_prev_index, '/etc')) {
            $check_prev_index = substr($check_prev_index, $pos_views + strlen('/etc'));
        }
        /** @noinspection PhpUndefinedVariableInspection */
        $router->redirect($check_prev_index);
        exit;
    }

    // check if form controller is exist, then include them without rendering template
    $form_c = substr($view, 0, -4) . '-f.php';
    if (file_exists($form_c)) {
        http_response_code(200);
        /** @noinspection PhpIncludeInspection */
        include $form_c;
        die();
    }

    // exit now
    if ('development' != get_env()) {
        // skip debug if environtment not development
        $view = '';
    }
    http_response_code(404);
    include __DIR__ . '/404.php';
} elseif ($view = realpath($view)) {
    // if file exists, set as view
    $theme->view($view);
    /**
     * @noinspection PhpUndefinedVariableInspection
     * @var bool render if Disabled Cache on browser
     */
    $is_hard_reload = $router->is_hard_reload();
    /**
     * @var bool force render if page cache not exists / expired
     */
    $cache_expired = cache_expired(2);
    /**
     * @var bool disable cache based on meta
     */
    $no_cache = !$theme->meta['cache'];
    /**
     * @var bool disable cache on CORS
     */
    $cors = CORS;
    /**
     * @var bool temporarily disable on production
     */
    $production = ('production' == get_env());
    /**
     * @var bool Is refresh cache request
     */
    $refreshCache = $router->is_header('Refresh-Cache');

    // set all indicator to integer for convert into boolean on next event
    settype($is_hard_reload, 'integer');
    settype($no_cache, 'integer');
    settype($cache_expired, 'integer');
    settype($cors, 'integer');

    if ('development' == get_env()) {
        // noindex on development mode, for SEO reasons
        header('X-Robots-Tag: noindex, nofollow', true);
    }

    /*
     if (!CORS) {
        echo showAlert('bottom');
    }
     */

    // No Cache Mode
    header('Cache-Status: no-cache(' . __LINE__ . "), hard({$is_hard_reload}), cache_expired({$cache_expired}), no_cache({$no_cache}), cors({$cors})", true);

    if (isset($_COOKIE['beautify']) || isset($_REQUEST['beautify'])) {
        // beautify html
        $theme->render();
    } else {
        // minified html
        render($theme);
    }

    // load admin tools
    //$theme->load_admin_tools();
}
