<?php

/**
 * Detect is localhost.
 *
 * @see https://web-manajemen.blogspot.com/2020/10/php-detect-user-client-ip-xampp-or.html
 *
 * @return bool
 */
function isLocalHost()
{
  $whitelist = [
    '127.0.0.1',
    '::1',
  ];

  return in_array($_SERVER['REMOTE_ADDR'], $whitelist);
}

/**
 * Get client ip, when getenv supported (maybe cli).
 *
 * @see https://web-manajemen.blogspot.com/2020/10/php-detect-user-client-ip-xampp-or.html
 *
 * @return string
 */
function get_client_ip()
{
  $ipaddress = '';

  if (isLocalHost()) {
    $ipaddress = getLocalIp();
  } else {
    if (getenv('HTTP_CLIENT_IP')) {
      $ipaddress = getenv('HTTP_CLIENT_IP');
    } elseif (getenv('HTTP_X_FORWARDED_FOR')) {
      $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    } elseif (getenv('HTTP_X_FORWARDED')) {
      $ipaddress = getenv('HTTP_X_FORWARDED');
    } elseif (getenv('HTTP_FORWARDED_FOR')) {
      $ipaddress = getenv('HTTP_FORWARDED_FOR');
    } elseif (getenv('HTTP_FORWARDED')) {
      $ipaddress = getenv('HTTP_FORWARDED');
    } elseif (getenv('REMOTE_ADDR')) {
      $ipaddress = $ipaddress = getenv('REMOTE_ADDR');
    } else {
        /**
         * Return to method 2.
         */
      $ipaddress = get_client_ip2();
    }
  }

  return $ipaddress;
}

/**
 * Get client ip, when running on webserver.
 *
 * @see https://web-manajemen.blogspot.com/2020/10/php-detect-user-client-ip-xampp-or.html
 *
 * @return void
 */
function get_client_ip2()
{
  $ipaddress = '';
  if (isLocalHost()) {
    $ipaddress = getLocalIp();
  } else {
    if (isset($_SERVER['HTTP_CLIENT_IP'])) {
      $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
      $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } elseif (isset($_SERVER['HTTP_X_FORWARDED'])) {
      $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    } elseif (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
      $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    } elseif (isset($_SERVER['HTTP_FORWARDED'])) {
      $ipaddress = $_SERVER['HTTP_FORWARDED'];
    } elseif (isset($_SERVER['REMOTE_ADDR'])) {
      $ipaddress = $_SERVER['REMOTE_ADDR'];
    } else {
      $ipaddress = 'UNKNOWN';
    }
  }

  return $ipaddress;
}

/**
 * Get localhost ip.
 *
 * @see https://web-manajemen.blogspot.com/2020/10/php-detect-user-client-ip-xampp-or.html
 *
 * @return string
 */
function getLocalIp()
{
  if (defined('PHP_MAJOR_VERSION') && PHP_MAJOR_VERSION >= 5) {
    $localIP = gethostbyname(gethostname());
  } else {
    $localIP = gethostbyname(php_uname('n'));
  }

  return $localIP;
}
