<?php
session_start();
@ob_start();
header('Access-Control-Allow-Origin: *');
header("X-Robots-Tag: noindex, nofollow", true);
require __DIR__ . '/vendor/autoload.php';

use \Curl\Curl;

if (!function_exists("fixhtml")){
function fixhtml($html){
$domnew = new \DOMDocument('1.0', 'UTF-8');
libxml_use_internal_errors(true);
$domnew->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
$xpath = new DOMXpath($domnew); 
return $domnew->saveHTML();
}
}

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
 $headers[] = "Origins: https://onhax.me";
$curl->setHeaders($headers);
$curl->setUserAgent("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)");
$curl->setOpt(CURLOPT_ENCODING, 'gzip');
$curl->setOpt(CURLOPT_AUTOREFERER, true);
$curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
$curl->setOpt(CURLOPT_SSL_VERIFYHOST, false);
$curl->setOpt(CURLOPT_CAINFO, realpath("cacert.pem"));
$curl->setOpt(CURLOPT_RETURNTRANSFER, true);
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->setCookieFile("cookie.txt"); $curl->setCookieJar("cookie.txt");

$curl_log = fopen("verbose.txt", 'w+');
$url = "https://www.uxfree.com";
if (isset($_GET["path"])){
  $url .= $_GET["path"];
} 
$curl->verbose(true, $curl_log);
$curl->setUserAgent("Mozilla/5.0 (Linux; Android 7.0; Redmi Note 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36");
$curl->setReferrer("https://translate.google.co.id/m/translateLxg");
$curl->get($url);
//rewind($curl_log);
//$output= fread($curl_log, 5028);
if ($curl->error){
  echo "Error: ";
  exit;
} else {
  $page = $curl->getRawResponse();
  $html = str_get_html($page);
  $title = $html->find("title",0)->plaintext;
  $title = html_entity_decode($title);
  $title = preg_replace("(uxfree\.com|–)", '', strtolower($title));
  $title = trim($title);
  $title = ucwords($title);
  $_SESSION["title"]=$title;
}

if (!isset($_GET["path"])){
  foreach ($html->find("a") as $a){
    $hr = $a->href;
    $h2 = parse_url($hr);
    $a->href="?path=".$h2["path"];
  }
  foreach ($html->find("img") as $img){
    $img->src=$img->attr["data-src"];
  }
  foreach ($html->find("ins,script") as $e){
    $e->outertext="";
  }
  echo $html->save();
}

if (isset($_GET["path"])){
//if (strpos($url, '/dload/') !== false){
  ///dload/468279/
  $c = $html->find(".main",0);
  foreach($c->find("div,a,h1,ins,span,p,img,script,style") as $all){
    if ($all->tag == 'h1'){
      $all->innertext=$title;
      $all->for = "title";
    }
    if ($all->tag == 'a'){
      $h = $all->href;
      $host="https://www.uxfree.com";
      if (preg_match("(\/appeal\/)", $h) && strpos($h, $host) === false){
        $all->href="https://dimaslanjaka.github.io/page/safelink.html?url=".base64_encode($host.$h);
        $all->target="_blank";
      }
      if (!preg_match("(\/dload\/)", $_GET["path"])){
      if (preg_match("(\/dload\/)", $h)){
        $all->href="//dimaslanjaka-storage.000webhostapp.com/".basename(__FILE__)."?path=".$h;
      }
      } else {
        $all->href="https://dimaslanjaka.github.io/page/safelink.html?url=".base64_encode($all->href);
      }
    }
    if ($all->hasAttribute("class")){
      if (preg_match("(pagination|adbox|load\-more|more\-post|sidebar|bread\-crumbs|post\-meta|adbanner)", $all->class)){
        $all->outertext="";
      }
    }
    if ($all->hasAttribute("id")){
      if (preg_match("(comment)", $all->id)){
        $all->outertext="";
      }
    }
    if ($all->tag == 'img'){
      if ($all->hasAttribute("data-src")){
        $all->src="https://res.cloudinary.com/dimaslanjaka/image/fetch/".$all->attr["data-src"];
        $all->removeAttribute("data-src");
      } else {
        $all->src="https://res.cloudinary.com/dimaslanjaka/image/fetch/".$all->src;
      }
    }
      foreach ($all->attr as $name => $value){
        
        if ($name == "style"){
         // echo $name."/".$value;
          $all->removeAttribute("style");
        }
        if (preg_match("(sizes|srcset)", $name)){
          $all->removeAttribute($name);
        }
      }
    
    if (preg_match("(script|ins|style)", $all->tag)){
      $all->outertext="";
    }
  }
 // echo '<h1 for="title">'. $title .'</h1>';
  echo $c->outertext;
  echo "<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/jQuery-linkify/2.1.7/linkify.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/jQuery-linkify/2.1.7/linkify-jquery.min.js'></script><script src='https://codepen.io/dimaslanjaka/pen/BGwZLP.js'></script>";
} 

//var_dump($page);
fclose($curl_log);

if (isset($_GET["path"]) && preg_match("(\/dload\/)", $_GET["path"])){
  echo '<title>'.$title.'</title>';
  foreach ($html->find("link,style") as $css){
    if (!preg_match("(rss|xml)", $css->type)){
      echo $css->outertext;
    }
  }
  $ox = ob_get_contents();
  ob_clean();
  ob_start();
  echo fixhtml($ox);
  die();
} else if (isset($_GET["path"])){
  $dir = "articles";
  $sl = "en";
  $tl = "id";
  include(realpath("saver.php"));
}

