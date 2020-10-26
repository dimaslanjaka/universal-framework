<?php

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

use MVC\helper;
use MVC\router;
use MVC\themes;

// force redirect, this is our project, you can remove this
if ('103.146.203.101' == $_SERVER['HTTP_HOST'] && !LOCAL) {
  header('Location: http://ns.webmanajemen.com' . $_SERVER['REQUEST_URI']);
  // force https
  if (isset($_SERVER['HTTPS']) && 'on' != $_SERVER['HTTPS']) {
    header('Location: https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
  } else {
    // tell browser to access https only
    header('Strict-Transport-Security: max-age=31536000');
  }
}

// run DDOS protector
new \DDOS\runner();

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
    $check_next_index = \MVC\helper::fixSlash($check_next_index);
    $check_next_index = preg_replace('/\.php$/s', '', $check_next_index);
    if ($pos_views = strpos($check_next_index, '/views')) {
      $check_next_index = substr($check_next_index, $pos_views + strlen('/views'));
    } else if ($pos_views = strpos($check_next_index, '/etc')) {
      $check_next_index = substr($check_next_index, $pos_views + strlen('/etc'));
    }
    die($router->redirect($check_next_index));
  }

  ////// if router ended with slash (/) below codes will find next index.php or previous file php
  ////// dashboard/ maybe to dashboard/index or dashboard.php if exists

  /**
   * Previous index finder.
   */
  $check_prev_index = preg_replace('/\/index\.php$/s', '', $view) . '.php';
  if ($check_prev_index = realpath($check_prev_index)) {
    $check_prev_index = \MVC\helper::fixSlash($check_prev_index);
    $check_prev_index = preg_replace('/\.php$/s', '', $check_prev_index);
    if ($pos_views = strpos($check_prev_index, '/views')) {
      $check_prev_index = substr($check_prev_index, $pos_views + strlen('/views'));
    } else if ($pos_views = strpos($check_prev_index, '/etc')) {
      $check_prev_index = substr($check_prev_index, $pos_views + strlen('/etc'));
    }
    die($router->redirect($check_prev_index));
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
  if (!CORS) {
    //echo showAlert('bottom');
  }
  if ($no_cache || $cors || $refreshCache || $is_hard_reload || $cache_expired) {
    // disabled cache mode
    header('Cache-Status: no-cache(' . __LINE__ . "), hard({$is_hard_reload}), cache_expired({$cache_expired}), no_cache({$no_cache}), cors({$cors})", true);

    return render($theme);
  } else {
    // enabled cache mode
    header('Cache-Status: true(' . __LINE__ . "), hard({$is_hard_reload}), cache_expired({$cache_expired}), no_cache({$no_cache}), cors({$cors})", true);

    return load_cache(page_cache(), $theme);
  }
}

/**
 * Get current theme instance
 *
 * @return \MVC\themes
 */
function theme()
{
  global $theme;
  return $theme;
}

function showAlert($position)
{
  return '<div class="alert-' . $position . ' alert alert-danger">
	<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
	<strong>Sorry!</strong> Jika anda melihat tulisan ini, kami sedang melakukan pemeliharaan sistem. Jangan melakukan transaksi apapun sebelum tulisan ini <b>menghilang</b>. Agar tidak terjadi hal yang tidak diinginkan
  </div>';
}

/**
 * Identify cached page by hour
 *
 * @param integer $hour
 * @return bool
 */
function cache_expired(int $hour = 24)
{
  $file_indicator = normalize_path(page_cache());

  if (file_exists($file_indicator)) {
    $is_24hours = time() - filemtime($file_indicator) > $hour * 3600;
    if ($is_24hours) {
      \Filemanager\file::delete($file_indicator);

      return true;
    } else {
      return false; // cache valid
    }
  } else {
    return true;
  }
}

/**
 * Render theme
 *
 * @param \MVC\themes $theme
 * @return void
 */
function render(\MVC\themes $theme)
{
  //global $theme;
  // render view in theme
  $theme->render();

  if (!CORS && $theme->meta['theme']) {
    process_page($theme->meta['obfuscate'], $theme);
    if ('development' == get_env() && $theme->meta['theme']) {
      echo '<!--' . get_includes() . '-->';
    }
  }
}

/**
 * Process page to using obfuscate mode or not
 *
 * @param boolean $obfuscatejs
 * @param \MVC\themes $theme
 * @return void
 */
function process_page(bool $obfuscatejs, \MVC\themes $theme)
{
  //global $theme;
  $dom = new SmartDOMDocument('1.0', 'ISO-8859-15');
  $dom->preserveWhiteSpace = true;
  $dom->formatOutput = true;

  $c = ob_get();

  if (!$dom->loadHTML($c)) {
    \HTML\js::var('HTML_ERROR', json_encode(['error' => true, 'message' => 'HTML Optimizer failed']));
    echo $c;

    return;
  }

  $xpath = new SmartDOMXpath($dom);
  $title = getTitle($dom);

  $scripts = $xpath->query('//script');
  if (!empty($scripts)) {
    foreach ($scripts as $script) {
      if ($script->hasAttribute('type') && 'application/ld+json' == $script->getAttribute('type')) {
        $script->innerHTML = json_encode(json_decode(innerHTML($script)));
      }
    }
  }

  $imgs = $xpath->query('//img');
  if (!empty($imgs)) {
    foreach ($imgs as $img) {
      if (!$img->hasAttribute('title')) {
        $img->setAttribute('title', $title);
      }
      if (!$img->hasAttribute('alt')) {
        $img->setAttribute('alt', $title);
      }
      if (!$img->hasAttribute('rel')) {
        $img->setAttribute('rel', 'image');
      }
    }
  }

  $styles = $xpath->query('//style');
  if (!empty($styles)) {
    foreach ($styles as $style) {
      $style->innerHTML = trim(mincss(innerHTML($style)));
    }
  }

  $textareas = $xpath->query('//textarea');
  if (!empty($textareas)) {
    foreach ($textareas as $area) {
      $inner = trim(html_entity_decode($area->innerHTML));
      if (is_json(trim($inner))) {
        $area->setAttribute('innerhtml', base64_encode(\JSON\json::json($inner, false, false)));
      }
    }
  }

  $result = $dom->saveHTML();
  $result = prefilter(htmlmin($result));
  resolve_dir(dirname(page_cache()));
  \Filemanager\file::file(page_cache(), $result, true);
  /**
   * @var string Load admin toolbox
   */
  $result = str_replace('</html>', '', $result);
  echo $result;
  $theme->load_admin_tools();

  echo '</html>';
}

$syntaxHighlighter = null;
/**
 * Fix <pre/> syntax highlight
 *
 * @param string $c
 * @return string
 */
function prefilter(string $c)
{
  global $syntaxHighlighter;
  $dom = new SmartDOMDocument('1.0', 'ISO-8859-15');
  $dom->preserveWhiteSpace = true;
  $dom->formatOutput = false;

  if (!$dom->loadHTML($c)) {
    \HTML\js::var('HTML_ERROR', json_encode(['error' => true, 'message' => 'HTML Optimizer failed']));
    echo $c;

    return;
  }

  $xpath = new SmartDOMXpath($dom);

  $title = getTitle($dom);
  $pres = $xpath->query('//pre');
  if (!empty($pres)) {
    foreach ($pres as $pre) {
      if (is_json($pre->innerHTML)) {
        $pre->innerHTML = \JSON\json::beautify(json_decode($pre->innerHTML));
        if (!$syntaxHighlighter) {
          $syntaxHighlighter = true;
          insertBodyFirst($xpath, createScript($dom, ['src' => '/assets/highlight.js/loader.js', 'cache' => 'true']));
        }
        if (empty(trim($pre->getAttribute('class')))) {
          $pre->setAttribute('class', 'json');
        }
      }
      if (empty(trim($pre->getAttribute('title')))) {
        $pre->setAttribute('title', $title);
      }
    }
  }

  $textareas = $xpath->query('//textarea');
  if (!empty($textareas)) {
    foreach ($textareas as $area) {
      if ($area->hasAttribute('innerhtml')) {
        $area->innerHTML = base64_decode($area->getAttribute('innerhtml'));
        $area->removeAttribute('innerhtml');
      }
    }
  }

  return $dom->saveHTML();
}

/**
 * Get page identifier
 *
 * @return string
 */
function identifier()
{
  return md5(UID . serialize(\Session\session::gets(['login', 'coupon'])));
}

/**
 * Get page cache
 *
 * @return string
 */
function page_cache()
{
  $path = ROOT . '/tmp/html/';
  $path .= \MVC\helper::get_clean_uri(\MVC\helper::geturl());
  $path .= '/' . identifier();
  $path .= '.html';
  $path = normalize_path($path);

  return $path;
}

/**
 * Minify HTML
 *
 * @param string $ori
 * @return string
 */
function htmlmin(string $ori)
{
  //return preg_replace('/<!--.*?-->|\s+/s', ' ', $ori);
  $no_tab = preg_replace('/\n|\t|\n+|\t+/m', '', $ori);
  $no_comments = preg_replace('/<!--.*?-->/m', '', $no_tab);
  $between_tags = preg_replace('/\>\s+\</', '><', $no_comments);

  return $between_tags;
}

/**
 * Get All included files
 *
 * @return string|false|void
 */
function get_includes()
{
  $included = array_values(array_filter(array_map(function ($arr) {
    if (is_string($arr)) {
      if (strpos($arr, 'vendor')) {
        return '';
      }
    }

    return $arr;
  }, get_included_files())));
  $included[] = 'total included files: ' . count(get_included_files());
  $inc = \JSON\json::json($included, false, false);

  return $inc;
}

/**
 * Load page cached
 *
 * @param string $page_cache
 * @return void
 */
function load_cache(string $page_cache, \MVC\themes $theme)
{
  //global $theme, $alert;
  $optimized_buffer = \Filemanager\file::get($page_cache);
  $add = trim('<script>async_process(location.href);</script>');
  /**
   * @var string Load admin toolbox
   */
  $optimized_buffer = str_replace('</html>', $add, $optimized_buffer);
  echo $optimized_buffer;
  $theme->load_admin_tools();

  echo '</html>';
}

/**
 * Minify inline css from buffer
 *
 * @param string $css
 * @return string
 */
function mincss($css)
{
  $css = preg_replace('/\/\*[^*]*\*+([^\/][^*]*\*+)*\//m', '', $css); // remove comments in beautify css
  $css = preg_replace('/\/\*((?!\*\/).)*\*\//', '', $css); // negative look ahead
  $css = preg_replace('/\s{2,}/', ' ', $css);
  $css = preg_replace('/\s*([:;{}])\s*/', '$1', $css);
  $css = preg_replace('/;}/', '}', $css);
  // clean whitespaces
  /*$css = preg_replace(
  "/(\t|\n|\v|\f|\r| |\xC2\x85|\xc2\xa0|\xe1\xa0\x8e|\xe2\x80[\x80-\x8D]|\xe2\x80\xa8|\xe2\x80\xa9|\xe2\x80\xaF|\xe2\x81\x9f|\xe2\x81\xa0|\xe3\x80\x80|\xef\xbb\xbf)+/",
  "",
  $css
  );*/
  $css = preg_replace('/\s+/m', ' ', $css);

  return $css;
}
