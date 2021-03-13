<?php

session_start();
@ob_start();
header('Access-Control-Allow-Origin: *');
header('X-Robots-Tag: noindex, nofollow', true);
require __DIR__ . '/vendor/autoload.php';

use Curl\Curl;

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
 $headers[] = 'Origins: https://onhax.me';
$curl->setHeaders($headers);
$curl->setUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
//$curl->verbose(true, STDERR);
//$curl->verbose(true);
$curl->setOpt(CURLOPT_ENCODING, 'gzip');
$curl->setOpt(CURLOPT_AUTOREFERER, true);
$curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
$curl->setOpt(CURLOPT_SSL_VERIFYHOST, false);
$curl->setOpt(CURLOPT_CAINFO, realpath('cacert.pem'));
$curl->setOpt(CURLOPT_RETURNTRANSFER, true);
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->setCookieFile('cookie.txt'); $curl->setCookieJar('cookie.txt');
function save_this()
{
  $furl = (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
  $furl = str_replace('?retry', '', $furl);
  $_SESSION['last_page'] = $furl;
  header('Location: /index.php?set_proxy');

  return $_SESSION['last_page'];
}
if (isset($_GET['retry'])) {
  save_this();
}
$proxy = (isset($_SESSION['proxy']) ? $_SESSION['proxy'] : die(save_this()));
$curl->setProxy($proxy);
$curl->setProxyTunnel();

//$url = "https://onhax.me";
$url = 'https://onhax.me/chrooma-keyboard-apk';

$curl_log = fopen('verbose.txt', 'a') or die('failed open verbose.txt');
$curl->verbose(true, $curl_log);
/*
$curl->setOpt(CURLOPT_VERBOSE, true);
$curl->setOpt(CURLOPT_STDERR, $curl_log);

if (isset($_GET["path"])){
  $url .=$_GET["path"];
} else if (isset($_GET["url"])){
  $path = str_replace($url, "", $_GET["url"]);
  header("Location: ".basename(__FILE__)."?path=$path");
  die();
}
*/
//$curl->setRetry(5);
$curl->setReferrer($url);
//$curl->setOpt(CURLOPT_DNS_CACHE_TIMEOUT, 5);
//$curl->setOpt(CURLOPT_DNS_USE_GLOBAL_CACHE, false);
//$curl->setOpt(CURLOPT_HEADER, true);
//$curl->setOpt(CURLOPT_HTTPGET, true);
$curl->get($url);
$output = fread($curl_log, 2048);
/*
preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $output, $matches);
  $cookies = array();
  foreach($matches[1] as $item) {
    parse_str($item, $cookie);
    $cookies = array_merge($cookies, $cookie);
  }
*/
echo '<pre>' . print_r($output, 1) . '</pre>';
//var_dump($curl->responseCookies);
//var_dump($curl->getResponseCookies());
fclose($curl_log);
/*
function ErrorC($what){
  $t = '<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">';
  echo "Using Proxy: ".$_SESSION["proxy"]."<br />";
  if (preg_match('(error|proxy|matot)', $what)){
  $t .= 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . '<br/>';
  $t .= "Proxy Failed, <a href='?retry'>Set Proxy Ulang</a> ".$curl->response;
  return $t;
  } else if (preg_match('(empty|kosong)', strtolower($what))){
  $t .= "Response Header: ".json_encode($curl->responseHeaders)."<br/>";
  $t .= "Server Response Kosong, Harap ulangi atau <a href='?retry'>Ganti Proxy</a>";
  if ($t) {
  return "<div class='container'><div class='jumbotron'><p>".$t."</p></div></div>";
  }
  }
}

if ($curl->error) {
  echo ErrorC("proxy"); die();
} else if (empty($curl->response)){
  echo ErrorC("kosong"); die();
} else {
  echo $curl->response;
  $html = str_get_html($curl->response);
}
*/
