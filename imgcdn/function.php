<?php
require __DIR__ . '/Curl/StringUtil.php';
require __DIR__ . '/Curl/ArrayUtil.php';
require __DIR__ . '/Curl/Url.php';
require __DIR__ . '/Curl/CaseInsensitiveArray.php';
require __DIR__ . '/Curl/Curl.php';
if (!defined('ROOT')) {
  define('ROOT', $_SERVER['DOCUMENT_ROOT']);
}

use Curl\Curl;

function md($f)
{
  $oldmask = umask(0);
  mkdir($f, 0777);
  umask($oldmask);
}

function createjson($img)
{
  header('Content-type: application/json; charset=utf-8');
  if (!filter_var($img, FILTER_VALIDATE_URL)) {
    if (file_exists($img)) {
      $img = str_replace(ROOT, '', $img);
      $img = str_replace(__DIR__, '', $img);
      $img = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://' . $_SERVER['HTTP_HOST'] . $img;
    }
  }
  if (filter_var($img, FILTER_VALIDATE_URL)) {
    echo json_encode([
      'url' => $img,
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  } else {
    //$ext = (new SplFileInfo($img))->getExtension();
    echo json_encode(['invalid' => $img], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  }
  exit;
}

function cURLinit()
{
  $curl = new Curl();
  $headers[] = 'Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5';
  $headers[] = 'Connection: Keep-Alive';
  $headers[] = 'Cache-Control: max-age=0';
  $headers[] = 'Upgrade-Insecure-Requests: 1';
  $headers[] = 'DNT: 1';
  $headers[] = 'Keep-Alive: 300';
  $headers[] = 'Content-type: */*;charset=UTF-8';
  $headers[] = 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7';
  $headers[] = 'Accept-Language: en-us,en;q=0.5';
  $headers[] = 'Pragma: no-cache';
  $headers[] = 'Origins: https://translate.google.co.id';
  $curl->setHeaders($headers);
  $curl->setUserAgent('Mozilla/5.0 (Linux; Android 7.0; Redmi Note 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36');
  $curl->setOpt(CURLOPT_ENCODING, 'gzip');
  $curl->setOpt(CURLOPT_AUTOREFERER, true);
  $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
  $curl->setOpt(CURLOPT_CAINFO, realpath(__DIR__ . '/cacert.pem'));
  $curl->setOpt(CURLOPT_RETURNTRANSFER, true);
  $curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
  $curl->setOpt(CURLOPT_COOKIESESSION, true);
  $curl->setOpt(CURLOPT_VERBOSE, true);
  $curl->setCookieFile(__DIR__ . '/cookie.txt');
  $curl->setCookieJar(__DIR__ . '/cookie.txt');

  return $curl;
}

/**
 * Encrypt string with key
 *
 * @param string $string
 * @param string $key
 * @return string
 */
function enc_encrypt($string, $key = 'DimasLanjaka')
{
  $result = '';
  for ($i = 0; $i < strlen($string); $i++) {
    $char = substr($string, $i, 1);
    $keychar = substr($key, ($i % strlen($key)) - 1, 1);
    $char = chr(ord($char) + ord($keychar));
    $result .= $char;
  }

  return base64_encode($result);
}

/**
 * Decrypt from enc_encrypt
 *
 * @param string $string
 * @param string $key
 * @return string
 */
function enc_decrypt($string, $key = 'DimasLanjaka')
{
  $result = '';
  $string = base64_decode($string);

  for ($i = 0; $i < strlen($string); $i++) {
    $char = substr($string, $i, 1);
    $keychar = substr($key, ($i % strlen($key)) - 1, 1);
    $char = chr(ord($char) - ord($keychar));
    $result .= $char;
  }

  return $result;
}
