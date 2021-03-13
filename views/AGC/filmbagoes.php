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
$curl->setOpt(CURLOPT_ENCODING, 'gzip');
$curl->setOpt(CURLOPT_AUTOREFERER, true);
$curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
$curl->setOpt(CURLOPT_SSL_VERIFYHOST, false);
$curl->setOpt(CURLOPT_CAINFO, realpath('cacert.pem'));
$curl->setOpt(CURLOPT_RETURNTRANSFER, true);
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->setCookieFile('cookie.txt'); $curl->setCookieJar('cookie.txt');

$curl_log = fopen('verbose.txt', 'w+');
$url = 'http://filmbagoes.com';
if (isset($_GET['path'])) {
  $url .= $_GET['path'];
}
$curl->verbose(true, $curl_log);
$curl->setUserAgent('Mozilla/5.0 (Linux; Android 7.0; Redmi Note 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36');
$curl->setReferrer('https://translate.google.co.id/m/translateLxg');
$curl->get($url);
//rewind($curl_log);
//$output= fread($curl_log, 5028);
if ($curl->error) {
  die();
} else {
  $page = $curl->getRawResponse();
  $html = str_get_html($page);
}
if (!isset($_GET['path']) || empty($_GET['path']) || isset($_GET['path']) && preg_match('(\/genre\/|\/cast\/)', $_GET['path'])) {
  foreach ($html->find('a') as $a) {
    if ($a->hasAttribute('href')) {
      $h = parse_url($url);
      $hr = $a->href;
      $h2 = parse_url($hr);
      if (preg_match('/' . preg_quote($h['host']) . '/', $h2['host'])) {
        //$a->href = preg_replace('/^((https?|ftp):\/\/)?'.preg_quote($h["host"]).'/', '?path=', $hr);
        $a->href = '?path=' . $h2['path'];
        //die(var_dump($h2));
      }
    }
  }
  die($html->save());
}
if (isset($_GET['verbose'])) {
  echo '<pre>' . print_r($output, 1) . '</pre>';
  fclose($curl_log);
  die();
}
if (isset($_GET['path'])) {
  $title = $html->find('title', 0)->plaintext;
  $regx = '(streaming|nonton|filmbagoes|movie21|online)';
  $title = preg_replace($regx, '', strtolower($title));
  $_SESSION['title'] = $title = trim($title);
  $_SESSION['title'] = $title;
  $c = $html->find('.entry-content', 0);
  foreach ($c->find('a,img,span,table,tr,td,tbody,thead,div,i,b,strong,h1,h2,h3,h4,h5,article') as $tag) {
    if ('a' == $tag->tag) {
      $a = $tag;
      if ($a->hasAttribute('href')) {
        $h = parse_url($url);
        $hr = $a->href;
        $h2 = parse_url($hr);
        if (preg_match('/' . preg_quote($h['host']) . '/', $h2['host']) && !preg_match('(mvdown21)', $hr)) {
          $q = $h2['path'];
          $q = preg_replace('(\/|-)', ' ', $q);
          $q = trim($q);
          $a->href = '//web-manajemen.blogspot.com/p/search.html?q=' . $q;
        //die(var_dump($h2));
        } else {
          $a->href = 'https://dimaslanjaka.github.io/page/safelink.html?url=' . base64_encode($a->href);
          $a->target = '_blank';
        }
      }
    }
    if ('article' == $tag->tag) {
      $tag->outertext = '';
    }
    if ($tag->hasAttribute('style')) {
      $tag->removeAttribute('style');
    }
    if ($tag->hasAttribute('itemprop')) {
      $tag->removeAttribute('itemprop');
    }
    if ($tag->hasAttribute('itemtype')) {
      $tag->removeAttribute('itemtype');
    }
    if ($tag->hasAttribute('itemscope')) {
      $tag->removeAttribute('itemscope');
    }
    if ($tag->hasAttribute('class')) {
      if (preg_match('(widget\-title|social\-share)', $tag->class)) {
        $tag->outertext = '';
      }
    }
  }
  echo $c->outertext;
}
echo '<h1 for="title">' . ucwords($title) . '</h1>';
fclose($curl_log);

$dir = 'movies';
$sl = 'id';
$tl = 'en';
include realpath('saver.php');
