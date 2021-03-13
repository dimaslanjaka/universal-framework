<?php
session_start();
ob_start();
require __DIR__ . '/vendor/autoload.php';
use \Curl\Curl;
$curl = new Curl();
$headers[] = 'Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5'; 
 $headers[] = 'Connection: Keep-Alive';
 $headers[] = 'Cache-Control: max-age=0';
 $headers[] = 'Upgrade-Insecure-Requests: 1';
 $headers[] = 'DNT: 1';
 $headers[] = 'Keep-Alive: 300';
 $headers[] = 'Content-type: */*;charset=UTF-8';
 $headers[] = "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7";
 $headers[] = "Accept-Language: en-us,en;q=0.5";
 $headers[] = "Pragma: no-cache";
 $headers[] = "Origins: https://translate.google.co.id";
$curl->setHeaders($headers);
$curl->setUserAgent("Mozilla/5.0 (Linux; Android 7.0; Redmi Note 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36");
$curl->setReferrer("https://translate.google.co.id/m/translate");
$curl->setOpt(CURLOPT_ENCODING, 'gzip');
$curl->setOpt(CURLOPT_AUTOREFERER, true);
$curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
$curl->setOpt(CURLOPT_CAINFO, realpath("cacert.pem"));
$curl->setOpt(CURLOPT_COOKIESESSION, true);
$curl->setOpt(CURLOPT_RETURNTRANSFER, true);
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->setCookieFile("cookie.txt"); $curl->setCookieJar("cookie.txt");

/*
$blog = "https://fontawesome.blogspot.com/2014/05/font-awasome-with-psd-css-and-cheat-code.html";
$page = $curl->get($blog);
$html = str_get_html($page);
$bcom = "";
foreach($html->find("a") as $a){
  if ($a->hasAttribute("id") && preg_match("(comment)", $a->id) && preg_match("(iframe\.g)", $a->href)){
    $bcom = $a->href;
  }
}

$bcom_g = $curl->get($bcom);

echo $curl->response;
*/

$sitemapUrl = "http://www.example.com/sitemap.xml";

// cUrl handler to ping the Sitemap submission URLs for Search Engines…
function myCurl($url){
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  $rx = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  $r["html"]=$rx;
  $r["http_code"]=$httpCode;
  return $r;
}

//Google
$googleu = "http://www.google.com/webmasters/sitemaps/ping?sitemap=".$sitemapUrl;
//$google = myCurl($googleu);

$bingu = "http://www.bing.com/ping?siteMap=".$sitemapUrl; 
//$bing = myCurl($bingu); 

$asku = "http://submissions.ask.com/ping?sitemap=".$sitemapUrl; 
$ask = myCurl($asku);

var_dump( $ask );
