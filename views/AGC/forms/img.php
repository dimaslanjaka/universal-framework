<?php
header('Access-Control-Allow-Origin: *');
header('X-Robots-Tag: noindex, nofollow', true);
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
$headers[] = 'Origins: https://translate.google.co.id';
$curl->setHeaders($headers);
$curl->setUserAgent('Mozilla/5.0 (Linux; Android 7.0; Redmi Note 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36');

$curl->setOpt(CURLOPT_ENCODING, 'gzip');
$curl->setOpt(CURLOPT_AUTOREFERER, true);
$curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
$curl->setOpt(CURLOPT_CAINFO, realpath(ROOT . '/views/AGC/cacert.pem'));
$curl->setOpt(CURLOPT_RETURNTRANSFER, true);
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->setOpt(CURLOPT_COOKIESESSION, true);
$curl->setOpt(CURLOPT_VERBOSE, true);
$curl->setCookieFile(TEMP . '/cookie.txt');
$curl->setCookieJar(TEMP . '/cookie.txt');
if (isset($_GET['proxy'])) {
  $proxy = $_GET['proxy'];
} elseif (isset($_SESSION['proxy'])) {
  $proxy = $_SESSION['proxy'];
} else {
  $proxy = '';
}
if (!empty($proxy)) {
  $curl->setProxy($proxy);
  $curl->setProxyTunnel();
}
$query = html_entity_decode($_SERVER['REQUEST_URI']);
$url_parts = parse_url($query);
if (false !== parse_str($url_parts['query'], $url_query)) {
  $url = $url_query['url'];
  $curl->setReferrer($url_query['url']);
} else {
  die('Failed Parsing');
}
//$url = $_GET["url"];
$curl->get($url);
$content = $curl->response;
$types = $curl->responseHeaders['Content-Type'];

if (false !== $content) {
  header('Content-type: ' . $types);
  echo $content;
} else {
  var_dump($url, $types, $proxy, $content);
}
exit;
