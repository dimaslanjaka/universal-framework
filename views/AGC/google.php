<?php

session_start();
ob_start();
require 'vendor/autoload.php';
require 'dom.php';
//require 'translate.php';
use Curl\Curl;

//use Stichoza\GoogleTranslate\TranslateClient;
//$tr = new TranslateClient();
//$tr->setUrlBase('http://translate.google.cn/translate_a/single');
//$tr->setSource('id');
//$tr->setTarget('en');
//echo $tr->translate();
$curl = new Curl();
$headers = ['Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5', 'Connection: Keep-Alive', 'Cache-Control: max-age=0', 'Upgrade-Insecure-Requests: 1', 'DNT: 1', 'Keep-Alive: 300', 'Content-type: */*;charset=UTF-8', 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7', 'Accept-Language: en-us,en;q=0.5', 'Pragma: no-cache', 'Origins: https://translate.google.co.id'];
$curl->setHeaders($headers);
$useragent = 'Opera/9.80 (J2ME/MIDP; Opera Mini/4.2.14912/870; U; id) Presto/2.4.15';
$curl->setUserAgent($useragent);
$curl->setReferrer('https://translate.google.co.id/m/translate');
$curl->setOpt(CURLOPT_ENCODING, 'gzip');
$curl->setOpt(CURLOPT_AUTOREFERER, true);
$curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
$curl->setOpt(CURLOPT_CAINFO, __DIR__ . 'cacert.pem');
$curl->setOpt(CURLOPT_COOKIESESSION, true);
$curl->setOpt(CURLOPT_RETURNTRANSFER, true);
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->setCookieFile(COOKIEFILE);
$curl->setCookieJar(COOKIEFILE);
/*
if (isset($_GET["proxy"])){
$proxy = $_GET["proxy"];
} else if (isset($_SESSION["proxy"])){
$proxy = $_SESSION["proxy"];
} else {
$proxy = "37.98.175.251:81";
}
if (!empty($proxy)){
$curl->setProxy($proxy);
$curl->setProxyTunnel();
}*/
$query = $_GET['q'] or die('query parameter required');
$url = 'http://www.google.co.uk/search?q=' . $query;
$curl->get($url);
$re = $curl->response;
$html = str_get_html($re);
foreach ($html->find('a') as $a) {
  if ($a->hasAttribute('href') && false !== strpos($a->href, '/url?q=')) {
    $a->href = 'https://www.google.co.uk' . $a->href;
    echo $a->href . '<br/>';
  }
}
 //echo $html->save();
