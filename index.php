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

//import configuration
include_once __DIR__ . '/config.php';

use MVC\helper;
use MVC\router;
use MVC\themes;

// force redirect
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
new \DDOS\runner();

// start theme
$theme = new themes();

// set theme material bootstrap pro + font awesome pro 5
$theme->set('mdb-dashboard');

$theme_manager = 'theme-manager';
$application_folder = '';
$view_folder = 'views';
$view_folder = __DIR__ . DIRECTORY_SEPARATOR . $application_folder . DIRECTORY_SEPARATOR . $view_folder . DIRECTORY_SEPARATOR;
define('VIEWPATH', $view_folder);

if ($theme->isJSONRequest()) {
	header('Content-type: application/json');
}

$rc = new router();

$view = helper::fixSlash(VIEWPATH . $rc->findRoute() . '.php');

// glype proxy
if ('index/bot/glype/admin' == str_replace('.php', '', $view)) {
	include __DIR__ . '/bot/glype/admin.php';
	exit;
}

// cleaner
if ('development' == $router->get_env()) {
	if ($router->is_req('clean')) {
		\Filemanager\file::empty(ROOT . '/tmp/html');
		\Filemanager\file::empty(ROOT . '/processed/html');
		\Filemanager\file::empty(ROOT . '/tmp/optimized');
	}
}

// start output buffering
ob_start();

// default router
if (!realpath($view)) {
	// if file not exists return 400 bad request
	http_response_code(400);

	$basename = basename($view, '.php');
	if ($basename == $theme_manager) {
		$theme->admin();
		exit;
	} elseif ('load-asset' == $basename) {
		$parse = helper::parse_url2(helper::geturl());
		if (isset($parse['query']['src'])) {
			helper::load_asset($parse['query']['src']);
			exit;
		}
	}

	/**
	 * next index finder.
	 */
	$check_next_index = preg_replace('/\.php$/s', '', $view) . '/index.php';
	if ($check_next_index = realpath($check_next_index)) {
		$check_next_index = \MVC\helper::fixSlash($check_next_index);
		$check_next_index = preg_replace('/\.php$/s', '', $check_next_index);
		$check_next_index = substr($check_next_index, strpos($check_next_index, '/views') + strlen('/views'));
		exit($router->redirect($check_next_index));
	}

	////// if router ended with slash (/) below codes will find next index.php or previous file php
	////// dashboard/ maybe to dashboard/index or dashboard.php

	/**
	 * Previous index finder.
	 */
	$check_prev_index = preg_replace('/\/index\.php$/s', '', $view) . '.php';
	if ($check_prev_index = realpath($check_prev_index)) {
		$check_prev_index = \MVC\helper::fixSlash($check_prev_index);
		$check_prev_index = preg_replace('/\.php$/s', '', $check_prev_index);
		$check_prev_index = substr($check_prev_index, strpos($check_prev_index, '/views') + strlen('/views'));
		exit($router->redirect($check_prev_index));
	}
	//e([$check_prev_index, $view]);

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
	if (
		cache_expired() // render if cache expired
		|| $router->is_hard_reload() // render if Disabled Cache on browser
		|| !realpath(page_cache()) // force render if page cache not exists
		|| ENVIRONMENT == 'production' // temporarily disable on production
		|| CORS // disable cache on CORS
		|| !$theme->meta['cache']  // disable cache based on meta
	) {
		header('Cache-Status: no-cache');
		render();
	} else {
		header('Cache-Status: true');
		load_cache(page_cache());
	}
}

function cache_expired(int $hour = 24)
{
	$file_indicator = normalize_path(page_cache());

	if (file_exists($file_indicator)) {
		$is_24hours = time() - filemtime($file_indicator) > $hour * 3600;
		if ($is_24hours) {
			\Filemanager\file::delete($file_indicator);
		} else {
			return false; // cache valid
		}
	}
	resolve_file($file_indicator, UID);

	return true; // cache not saved or expired
}

function render()
{
	global $theme;
	// render view in theme
	$theme->render();

	if (!CORS && $theme->meta['theme']) {
		process_page($theme->meta['obfuscate']);
		if ('development' == get_env() && $theme->meta['theme']) {
			echo '<!--' . get_includes() . '-->';
		}
	}
}


function process_page(bool $obfuscatejs = true)
{
	global $router;
	$buffer_content = ob_get_clean();
	$is_reloaded = $router->is_hard_reload();
	$is_development = 'development' == get_env();

	echo optimize($buffer_content, $obfuscatejs, UID, $is_development, $is_reloaded, page_cache());
}

function identifier()
{
	return md5(UID . serialize(\Session\session::gets(['login', 'coupon'])));
}

function page_cache()
{
	return ROOT . '/processed/html/'
		. '/' . identifier()
		. '.html';
}

function htmlmin(string $ori)
{
	return preg_replace('/<!--.*?-->|\s+/s', ' ', $ori);
}

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

function load_cache(string $page_cache)
{
	$optimized_buffer = \Filemanager\file::get($page_cache);
	$script = file_get_contents(__DIR__ . '/index-optimizer.min.js');
	$add = trim("<script>async_process(location.href);async_process(location.href);$script</script>");
	$optimized_buffer = str_replace('</html>', $add . '</html>', $optimized_buffer);
	echo htmlmin($optimized_buffer);
}


/**
 * HTML Optimizer and Obfuscator.
 *
 * @param \MVC\router $router
 * @param string      $buffer_content
 * @param bool        $obfuscatejs
 * @param string      $uri
 * @param bool        $is_development
 * @param bool        $is_reloaded
 * @param string      $filesave
 *
 * @return void
 */
function optimize(string $buffer_content, bool $obfuscatejs, string $uri, bool $is_development, bool $is_reloaded, string $filesave)
{
	$dom = \simplehtmldom\helper::str_get_html($buffer_content);

	$scripts = $dom->find('script');
	if ($scripts) {
		$script_index = 0;
		foreach ($scripts as $js) {
			++$script_index;
			$scriptText = trim($js->innertext);
			if ($js->src || empty($scriptText)) {
				continue;
			} elseif ('application/ld+json' == $js->type) {
				$js->innertext = preg_replace('/\s+/m', '', $scriptText);
				continue;
			}
		}
	}

	$styles = $dom->find('style');
	if ($styles) {
		$css_index = 0;
		foreach ($styles as $css) {
			$css->innertext = trim(mincss($css->innertext));
		}
	}

	$imgs = $dom->find('img');
	if ($imgs) {
		foreach ($imgs as $img) {
			if (!$img->title) {
				$img->title = $dom->title();
			}
			if (!$img->alt) {
				$img->alt = $dom->title();
			}
			if (!$img->rel) {
				$img->rel = 'image';
			}
		}
	}

	/**
	 * @todo Apply HTML Minification only on production
	 */
	if (!$is_development) {
		// minify page
		$dom->find('html', 0)->outertext = htmlmin($dom->find('html', 0)->outertext);
		// save minified
		$result = $dom->save();
		// release
		unset($dom);
		// new dom
		$dom = \simplehtmldom\helper::str_get_html($result);
	}

	// prettyprint pretext
	$pres = $dom->find('pre');
	if ($pres) {
		$pre_index = 0;
		foreach ($pres as $pre) {
			++$pre_index;
			$inner = $pre->innertext;
			if (!$pre->title) {
				$pre->title = "pre($pre_index)";
			}
			if (\JSON\json::is_json($inner)) {
				$pre->innertext = \JSON\json::beautify(json_decode($inner));
			}
		}
	}

	$result = $dom->save();
	resolve_dir(dirname($filesave));
	file_put_contents($filesave, $result);

	return $result;
}

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
