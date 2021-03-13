<?php

if (!function_exists('update_option')) {
  require __DIR__ . 'wp-loader.php';
}
switch ($_SERVER['HTTP_HOST']) {
  case 'short.io':
  if (!get_option('site_default')) {
    update_option('site_default', 'shortlink');
  }
  break;
  case 'youtube.io':
  if (!get_option('site_default')) {
    update_option('site_default', 'youtube');
  }
  break;
  case 'rental.io':
  if (!get_option('site_default')) {
    update_option('site_default', 'rental');
  }
  break;
  case 'warkop.io':
  if (!get_option('site_default')) {
    update_option('site_default', 'warkop');
  }
  break;

  default:
  if (get_option('site_default')) {
    delete_option('site_default');
  }
  break;
}
