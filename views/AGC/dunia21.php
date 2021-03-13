<?php
$url = "https://dunia21.net";
if (isset($_GET["path"])){
  $url .=$_GET["path"];
}
session_start();
@ob_start();
header('Access-Control-Allow-Origin: *');
header('Origin: https://dunia21.net');
header('Origins: https://dunia21.net');
header('Host: https://dunia21.net');
header("X-Robots-Tag: noindex, nofollow", true);
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
$curl->setUserAgent($_SERVER["HTTP_USER_AGENT"]);
$curl->setReferrer("https://translate.google.co.id/m/translate");
$curl->setOpt(CURLOPT_ENCODING, 'gzip');
$curl->setOpt(CURLOPT_AUTOREFERER, true);
$curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
$curl->setOpt(CURLOPT_CAINFO, realpath("cacert.pem"));
$curl->setOpt(CURLOPT_RETURNTRANSFER, true);
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->setCookieFile("cookie.txt"); $curl->setCookieJar("cookie.txt");
$curl->get($url);

$page = $curl->getRawResponse();
$html = str_get_html($page);

$title = $_SESSION["title"] = $html->find("title",0)->plaintext;

if (!isset($_GET["path"])){
  foreach ($html->find("a") as $tag){
    if ($tag->tag == 'a'){
      $tag->href=preg_replace("(https?\:\/\/dunia21\.net|https?\:\/\/dunia21\.org)", "?path=", $tag->href);
    }
  }
  echo $html->save();
}

if (isset($_GET["path"])){
$down = $html->find(".download-movie",0);
foreach ($down->find("a") as $a){
  if (preg_match("(dl\.layarkaca)", $a->href)){
    $href = $a->href;
    $nop = preg_replace("(https?\:\/\/)", "", $href);
    $e = explode("/", $nop);
    $e = $e[0].'/get/'.$e[1];
    if (isset($e[2]) && !empty($e[2]) && strlen($e[2]) > 5){
      $e .= '/'.$e[2];
    }
    $sfl = "https://web-manajemen.blogspot.com/p/redirect.html?url=".base64_encode("http://".$e);
    $a->href=$sfl;
  }
  if (preg_match("(petunjuk\-cara\-download)", strtolower($a->href))){
    $href = $a->href;
    $href = preg_replace("(\/|\-)", " ", $href);
    $href = trim($href);
    $a->href = "//web-manajemen.blogspot.com/p/search.html?q=".$href;
    $a->style = "display:none";
  }
}
$ctext = $html->find("article",0);
$xtitle = $ctext->find("h1",0)->plaintext;
$xtitle = preg_replace("(lk21|dunia21|layarkaca21|download|nonton|streaming|online)", "", strtolower($xtitle));
$xtitle = "Download ".trim(ucwords(trim($xtitle)));
$ctext->find("h1",0)->innertext = $xtitle;
$ctext->find("h1",0)->setAttribute("for","title");
foreach ($ctext->find("a,div,i,span,h2,h3,img,footer,h1,script") as $tag){
  if ($tag->hasAttribute("class")){
    if (preg_match("(hidden)", $tag->class)){
      $tag->removeAttribute("class");
    }
  }
  if ($tag->tag == 'img'){
    if (!preg_match("(^https?\:\/\/)", $tag->src)){
      $tag->src="http:".$tag->src;
    }
    $tag->src = "https://res.cloudinary.com/dimaslanjaka/image/fetch/".$tag->src;
  }
  ($tag->hasAttribute("itemprop") ? $tag->removeAttribute("itemprop") : false);
  ($tag->hasAttribute("style") ? $tag->removeAttribute("style") : false);
  ($tag->hasAttribute("itemtype") ? $tag->removeAttribute("itemtype") : false);
  ($tag->hasAttribute("itemscope") ? $tag->removeAttribute("itemscope") : false);
  ($tag->hasAttribute("rel") ? $tag->removeAttribute("rel") : false);
  if ($tag->hasAttribute("class") && preg_match("(show\-more|comments)", $tag->class)){
    $tag->outertext="";
  }
  if ($tag->tag == 'a'){
    $a=$tag;
    $href = $a->href;
    $href = preg_replace("(https?\:\/\/|\/|\-|dunia21\.net|dunia21\.org)", " ", $href);
    $href = trim($href);
    $a->href = "//web-manajemen.blogspot.com/p/search.html?q=".$href;
  }
}
$css = <<<EOF
<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css");
.content *,.keyword *,.keywords * { max-width:100%}
.keywords h3 { margin-right: 15px; color: #666 } 
.keywords h3::before { content: "#"; }
.keywords h3::after { content: "-"; }
.content h3 { display: inline-block; }
.keywords h3 { display: block }
.content-wrapper {
        position: relative
    }
    .content-wrapper::before {
        background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 1) 100%);
        background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 1) 100%);
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 1) 100%);
        filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#00ffffff', endColorstr='#ffffff', GradientType=0);
        bottom: 0;
        left: 0;
        position: absolute;
        width: 100%;
        color: #fff;
        height: 50px;
        /*content: '';*/
        /*z-index: 3*/
    }
    .keywords h3 a {
        color: #666
    }
    .content {
        position: relative
    }
    .content h2,
    .content h3 {
        font-style: normal;
        display: inline-block;
        font-weight: 400;
        margin: 0;
        padding: 0;
        font-size: 90%
    }
    .content-media,
    .show-more {
        font-size: 80%
    }
    .content h2 {
        width: 90px
    }
    .content-poster {
        margin-bottom: 10px
    }
</style>
EOF;
echo $css;
$xc = $ctext->outertext;
$xc = str_replace("</h3>, ","</h3> ",$xc);
echo $xc;
echo $down->outertext;

$dir ="movies";
$sl = "id";
$tl = "en";
$no_add_title = true;
include(realpath("saver.php"));
}