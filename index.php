<?php

session_cache_limiter('nocache');
include __DIR__ . '/wp-loader.php';

if (class_exists('router')) {
  $request = router::i()->request;
  $subrequest = explode('/', $request);
  if (!preg_match('/^(analystic|loader\-wizard)/m', $subrequest[0]) || !class_exists('dimas')) {
    if (preg_match('/^(\d{2,4}|search|views\/|wp\-|page\-|blog|robot?s\.txt)|^sitemap$/m', $subrequest[0]) || empty($subrequest[0]) || !class_exists('dimas')) {
      define('WP_USE_THEMES', true);
      require dirname(__FILE__) . '/wp-blog-header.php';
    } else {
      include __DIR__ . '/router.php';
    }
  }
} else {
  define('WP_USE_THEMES', true);
  require dirname(__FILE__) . '/wp-blog-header.php';
}
