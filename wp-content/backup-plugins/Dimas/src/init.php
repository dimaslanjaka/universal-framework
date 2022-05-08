<?php

require plugin_dir_path(__FILE__) . 'wp/wp-folder.php';
require plugin_dir_path(__FILE__) . 'wp/wp-func.php';
// Include the config interface.
require plugin_dir_path(__FILE__) . 'YT/youtube-dl.config.php';
// Include helper functions for usort.
require plugin_dir_path(__FILE__) . 'YT/comparisonfunctions.usort.php';
require plugin_dir_path(__FILE__) . 'wp/wp-class.php';
require plugin_dir_path(__FILE__) . 'wp/wp-utils.php';
require plugin_dir_path(__FILE__) . 'wp/wp-wpdb.php';
require plugin_dir_path(__FILE__) . 'wp/wp-users.php';
require plugin_dir_path(__FILE__) . 'wp/wp-google.php';
require plugin_dir_path(__FILE__) . 'wp/wp-google2.php';
require plugin_dir_path(__FILE__) . 'wp/wp-pdo.php';
require plugin_dir_path(__FILE__) . 'wp/wp-accounting.php';
require plugin_dir_path(__FILE__) . 'wp/wp-form.php';
require plugin_dir_path(__FILE__) . 'wp/wp-curl.php';
require plugin_dir_path(__FILE__) . 'wp/wp-html.php';
require plugin_dir_path(__FILE__) . 'wp/wp-dom.php';
require plugin_dir_path(__FILE__) . 'wp/wp-json.php';
require plugin_dir_path(__FILE__) . 'wp/wp-process.php';
require plugin_dir_path(__FILE__) . 'wp/wp-proxy.php';
require plugin_dir_path(__FILE__) . 'YT/YouTubeDownloader.php';
require plugin_dir_path(__FILE__) . 'YT/youtube-dl.class.php';
require plugin_dir_path(__FILE__) . 'agc/loader/dimas.js.php';
require plugin_dir_path(__FILE__) . 'agc/loader/dimas.translate.php';
require plugin_dir_path(__FILE__) . 'agc/loader/dimas.curl.php';
require plugin_dir_path(__FILE__) . 'proxy/loader.php';
require plugin_dir_path(__FILE__) . 'agc/autoload.php';
require plugin_dir_path(__FILE__) . 'wp/wp-sitemap.php';
add_action('plugins_loaded', 'database_AGC');
function database_AGC()
{
  require_once plugin_dir_path(__FILE__) . 'db/init.php';
}
$request = router::i()->request;
$subrequest = explode('/', $request);

if ('shortlink' == get_option('site_default') || 'shortlink' == $subrequest[0]) {
  define('THEME_HEADER', $_SERVER['DOCUMENT_ROOT'] . '/views/shortlink/themes/header.php');
  define('THEME_FOOTER', $_SERVER['DOCUMENT_ROOT'] . '/views/shortlink/themes/footer.php');
  define('THEME_CONTENT', $_SERVER['DOCUMENT_ROOT'] . '/views/shortlink/themes/content.php');
} elseif ('youtube' == $subrequest[0] || 'youtube' == get_option('site_default')) {
  define('THEME_HEADER', $_SERVER['DOCUMENT_ROOT'] . '/views/youtube/themes/header.php');
  define('THEME_FOOTER', $_SERVER['DOCUMENT_ROOT'] . '/views/youtube/themes/footer.php');
  define('THEME_CONTENT', $_SERVER['DOCUMENT_ROOT'] . '/views/youtube/themes/content.php');
}

/*
 * Protect Js
 */
if (defined('ROOT')) {
  if (is_dir(ROOT . '/tmp')) {
    if (!file_exists(ROOT . '/tmp/.htaccess')) {
      $htaccess = 'deny from all

      <Files ~ "\.(png|jpg|svg|jpeg|ico|gif)$">
          Allow from all
      </Files>';
      file_put_contents(ROOT . '/tmp/.htaccess', $htaccess, LOCK_EX);
    }
  }
}
