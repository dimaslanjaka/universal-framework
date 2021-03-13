<?php

header('X-Content-Type-Options: nosniff');
use Curl\Curl;

$url = isset($_REQUEST['url']) ? $_REQUEST['url'] : 'https://ytmp3.cc/';
$ref = isset($_REQUEST['ref']) ? $_REQUEST['ref'] : $url;
$cookie = isset($_REQUEST['cookie']) ? $_REQUEST['cookie'] : $_SERVER['DOCUMENT_ROOT'] . '/tmp/cookie.txt';
if (false !== strpos($url, '.js')) {
  header('Content-Type: application/javascript');
} elseif (strpos($url, '.css')) {
  header('Content-Type: text/css');
} elseif (strpos($url, '.png')) {
  header('Content-Type: image/png');
} elseif (strpos($url, '.jpg')) {
  header('Content-Type: image/jpg');
}
$curl = new Curl();
$curl->setUserAgent($_SERVER['HTTP_USER_AGENT']);
$curl->setReferrer($ref);
$curl->setHeader('X-Requested-With', 'XMLHttpRequest');
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->setCookieFile($cookie);
$curl->setCookieJar($cookie);
$curl->get($url);
if ($curl->error) {
  echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
} else {
  echo $curl->response;
}
//var_dump($curl->responseHeaders);
exit;
