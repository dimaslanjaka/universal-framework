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
$headers[] = 'Origins: https://translate.google.co.id';
$curl->setHeaders($headers);
$curl->setUserAgent($_SERVER['HTTP_USER_AGENT']);
$curl->setReferrer('https://translate.google.co.id/m/translate');
$curl->setOpt(CURLOPT_ENCODING, 'gzip');
$curl->setOpt(CURLOPT_AUTOREFERER, true);
$curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
$curl->setOpt(CURLOPT_CAINFO, realpath('cacert.pem'));
$curl->setOpt(CURLOPT_RETURNTRANSFER, true);
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->setCookieFile('cookie.txt');
$curl->setCookieJar('cookie.txt');
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
//https://onhax.me
$url = 'https://layarindo21.ws';
if (isset($_GET['path'])) {
  $url .= $_GET['path'];
} elseif (isset($_GET['url'])) {
  $path = str_replace($url, '', $_GET['url']);
  header('Location: ' . basename(__FILE__) . "?path=$path");
  die();
}
$curl->get($url);

function ErrorC($what)
{
  global $curl;
  $t = '<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">';
  echo 'Using Proxy: ' . $_SESSION['proxy'] . '<br />';
  if (preg_match('(error|proxy|matot)', $what)) {
    $t .= 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . '<br/>';
    $t .= "Proxy Failed, <a href='?retry'>Set Proxy Ulang</a>";

    return $t;
  } elseif (preg_match('(empty|kosong)', strtolower($what))) {
    $t .= 'Response Header: ' . json_encode($curl->responseHeaders) . '<br/>';
    $t .= "Server Response Kosong, Harap ulangi atau <a href='?retry'>Ganti Proxy</a>";
    if ($t) {
      return $t;
    }
  }
}

if ($curl->error) {
  echo ErrorC('proxy');
  die();
} elseif (empty($curl->response)) {
  echo ErrorC('kosong');
  die();
} else {
  $html = str_get_html($curl->response);
}
if (!isset($_GET['path'])) {
  foreach ($html->find('a,script') as $tag) {
    if ('script' == $tag->tag) {
      if ($tag->hasAttribute('src')) {
        if (preg_match('(\.php)', $tag->src)) {
          $tag->outertext = '';
        }
      }
    }
    if ('a' == $tag->tag) {
      $tag->href = str_replace($url, '?path=', $tag->href);
    }
  }
  echo $html->save();
  die();
}

$downlink = '';
$i = 1;
if (isset($_GET['path'])) {
  foreach ($html->find('a') as $a) {
    if (false !== strpos($a->href, 'kangpost.com')) {
      $url_parts = parse_url($a->href);
      parse_str($url_parts['query'], $url_query);
      $dl = base64_decode($url_query['r']);
      $downlink .= '<a href="' . $dl . '" target="_blank" title="" alt="">Server ' . $i++ . '</a>' . "\n";
    }
  }
  foreach ($html->find('*') as $tag) {
    if (preg_match('(h1|h2|h3|h4|h5|a)', strtolower($tag->tag))) {
      if ($tag->hasAttribute('class')) {
        $tag->class = 'notranslate ' . $tag->class;
      } else {
        $tag->class = 'notranslate';
      }
    }
  }
  $content = '';
  foreach ($html->find('.desc') as $desc) {
    $content .= $desc->outertext;
  }
  $imgX = '';
  foreach ($html->find('img') as $img) {
    if (isset($img->attr['data-original'])) {
      $cdn = 'https://dimaslanjaka-storage.000webhostapp.com';
      $types = explode('.', $img->src);
      $type = end($types);
      if (empty($type)) {
        $type = 'jpeg';
      }
      $img->src = $cdn . "/img.php?type=$type&url=" . (isset($img->attr['data-original']) ? $img->attr['data-original'] : $img->src);
      (isset($img->attr['data-original']) ? $img->removeAttribute('data-original') : false);
      $img->width = '150px';
      $img->height = '150px';
      $img->style = 'display:inline-block';
      $img->class = 'img-thumbnail';
      foreach ($img->attr as $n => $v) {
        if (!preg_match('(alt|title|src|data|width|height|class|id|style)', $n)) {
          $img->removeAttribute($n);
        }
      }
      $imgX .= $img->outertext;
    }
  }

  $title = $html->find('title', 0)->plaintext;
  $title = preg_replace('(layarkaca21.com|layarindo21|-|online|streaming)', '', strtolower($title));
  $title = preg_replace('(nonton)', 'Download', strtolower($title));
  $_SESSION['title'] = trim($title);

  //echo "<h1 for='title' class='notranslate'>$title</h1>";
  echo "<div id='img-wrap' class='container w3-container'>$imgX</div>";
  echo "<div class='container w3-container'>$content</div><div class='container w3-container'><center>$downlink</center></div>";
  //echo '<script src="https://codepen.io/dimaslanjaka/pen/yQaNEp.js"></script>';
  echo '<link href="https://codepen.io/dimaslanjaka/pen/yQaNEp.css" rel="stylesheet" />';
  echo '<script>
function imagE(image_url){

    var http = new XMLHttpRequest();

    http.open("HEAD", image_url, false);
    //http.open("GET", image_url, false);
    http.send();
    return http.status;
    //return http.status != 404;

}

function chx(){
$( "img" ).each(function() {
  var image_url = $(this).attr("src");
  var img_this = $(this);
  if (imagE(image_url) !== 200){
    img_this.remove();
  }
/*$.get(image_url)
    .done(function() {

    }).fail(function() {
         img_this.remove();
    });*/
});
}/*
setTimeout(function() {
if(typeof jQuery=="undefined") {
    var headTag = document.getElementsByTagName("head")[0];
    var jqTag = document.createElement("script");
    jqTag.type = "text/javascript";
    jqTag.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    jqTag.onload = chx;
    headTag.appendChild(jqTag);
} else { chx(); }
}, 500);*/
var limit = 0;
function keluar_ga(){
$( "img" ).each(function() {
  var image_url = $(this).attr("src");
  var img_this = $(this);
  img_this.on("error", function (){ img_this.attr("src", "https://res.cloudinary.com/dimaslanjaka/image/fetch/http://media.wired.com/photos/5926db217034dc5f91becd6b/master/w_900,c_limit/so-logo-s.jpg"); })
});
 //return $("body").html("*"+limit+"\n");
 //clearInterval(udah);
}

var udah = setInterval(keluar_ga, 100);
</script>';

  $dir = 'movies';
  $tl = 'en';
  $sl = 'id';
  include realpath('saver.php');
}
