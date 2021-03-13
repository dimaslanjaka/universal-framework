<?php
session_start();
ob_start();
header('Access-Control-Allow-Origin: *');
header("X-Robots-Tag: index, nofollow", true);
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
ob_start();
require __DIR__ . '/vendor/autoload.php';
use \Curl\Curl;

$curl = new Curl();
$headers[] = 'Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5'; 
 $headers[] = 'Connection: Keep-Alive';
 $headers[] = 'Cache-Control: max-age=0';
// $headers[] = 'Upgrade-Insecure-Requests: 1';
// $headers[] = 'DNT: 1';
 $headers[] = 'Keep-Alive: 300';
 $headers[] = 'Content-type: */*;charset=UTF-8';
 $headers[] = "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7";
 $headers[] = "Accept-Language: en-us,en;q=0.5";
 $headers[] = "Pragma: no-cache";
 $headers[] = "Origins: http://sitelagump3.com";
$curl->setHeaders($headers);
$curl->setUserAgent("Mozilla/5.0 (Linux; Android 7.0; Redmi Note 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36");
$curl->setOpt(CURLOPT_ENCODING, 'gzip');
$curl->setOpt(CURLOPT_AUTOREFERER, true);
$curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
$curl->setOpt(CURLOPT_SSL_VERIFYHOST, false);
$curl->setOpt(CURLOPT_CAINFO, realpath("cacert.pem"));
$curl->setOpt(CURLOPT_RETURNTRANSFER, true);
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->setOpt(CURLOPT_COOKIESESSION, true);
$curl->setCookieFile("cookie.txt"); $curl->setCookieJar("cookie.txt");
function save_this(){
  $furl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
  $_SESSION["last_page"] = $furl;
  header("Location: /index.php?set_proxy");
  return $_SESSION["last_page"];
}
if (isset($_GET["retry"])){
  save_this();
}
$proxy = (isset($_SESSION["proxy"]) ? $_SESSION["proxy"] : die(save_this()));
$curl->setProxy($proxy);
$curl->setProxyTunnel();

$url = "http://sitelagump3.com";

if (isset($_GET["path"])){
  $url .= $_GET["path"];
} else if (isset($_GET["q"])){
  $url .= "/search.php?q=".$_GET["q"];
} else if (isset($_GET["url"])){
  $path = str_replace($url, basename(__FILE__)."?path=", $_GET["url"]);
  header("Location: $path");
  die($path);
}

//$url = "http://sitelagump3.com/lagu/108979/download-musik-kowe-tresnaku-mp3.html";
$curl->setReferrer($url);
$curl->get($url);
function ErrorC($what){
  $t = '<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">';
  global $proxy;
  echo "Using Proxy: ".$proxy."<br />";
  if (preg_match('(error|proxy|matot)', $what)){
    $t .= 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . '<br/>';
    $t .= "Proxy Failed, <a href='?retry'>Set Proxy Ulang</a>";
    return $t;
  } else if (preg_match('(empty|kosong)', strtolower($what))){
    $t .= "Response Header: ".json_encode($curl->responseHeaders)."<br/>";
    $t .= "Server Response Kosong, Harap ulangi atau <a href='?retry'>Ganti Proxy</a>";
    return $t;
  }
}

if ($curl->error) {
  echo ErrorC("proxy");
} else if (empty($curl->response)){
  echo ErrorC("kosong");
} else {
$page = $curl->response;

$html = str_get_html($page);

if (!isset($_GET["path"])){
  $a = $html->find("a");
  foreach ($a as $link){
    $link->href = str_replace($url, "?path=", $link->href);
  }
  $form = $html->find("form",0);
  $form->attr["action"] = str_replace($url, "?path=/search.php?", $form->action);
  echo $html->save();
  die();
}

if (isset($_GET["path"])){
  if (empty($_GET["path"])){ 
    die("Path required");
  }
if (false !== $html->find("title",0)){  
$title = $html->find("title",0);
$title = str_replace(" terbaru", "", strtolower($title->plaintext));
$_SESSION["title"] = $title;
} else {
  die(var_dump($curl->response));
}
$audio = $html->find("audio",0);
$audio_src = $audio->attr["src"];
$content = $html->find("div.content-video",0);
$_SESSION["media"] = $audio_src;
foreach($html->find("img") as $img){
  $path = "https://res.cloudinary.com/dimaslanjaka/image/fetch/".$img->src;
  $img->setAttribute("src",$path);
}
foreach ($content->find("a") as $a){
   $href=$a->getAttribute("href");
   $lasturl = explode("/", $_GET["path"]);
   $lasturl = end($lasturl);
   $lasturl = preg_replace("(\-|\.html)", " ", $lasturl);
   $a->target = '_blank';
   $a->setAttribute("href", "https://web-manajemen.blogspot.com/p/search.html?q=".$lasturl);
}
$content_video = $content->outertext;
$content_video = str_replace("SiteLaguMp3.Com", "", $content_video);

$t = "<h1 for='title'>$title</h1>";
$audio_src = $_SESSION["media"];
$c .= $content_video;
$c .= "<center><audio controls>
  <source src='$audio_src' type='audio/ogg'>
  <source src='$audio_src' type='audio/mpeg'>
  <source src='$audio_src' type='audio/mp3'>
  <source src='$audio_src' type='audio/wav'>
Your browser does not support the audio element.
</audio></center>";

$dir = "mp3";
$sl = "id";
$tl = "en";
include(realpath("saver.php"));
}
}