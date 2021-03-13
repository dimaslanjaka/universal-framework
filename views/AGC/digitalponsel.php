<?php

header('X-Robots-Tag: index, nofollow', true);
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
ob_start();
require __DIR__ . '/vendor/autoload.php';

session_start();

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
$headers[] = 'Origins: https://www.revdl.com';
$curl->setHeaders($headers);
$curl->setUserAgent($_SERVER['HTTP_USER_AGENT']);
$curl->setReferrer('https://www.facebook.com');

$curl->setCookieFile('cookie.txt');
$curl->setCookieJar('cookie.txt');

if (!isset($_GET['path'])) {
  $url = 'https://www.digitalponsel.com';
  $page = $curl->get($url);
  $html = str_get_html($curl->response);
  foreach ($html->find('a') as $a) {
    $href = $a->href;
    if (false !== strpos($href, $url)) {
      $path = str_replace($url, '', $href);
      $a->href = '?path=' . $path;
    }
  }
  foreach ($html->find('script') as $r) {
    $r->outertext = '';
  }
  echo $html->save();
  die();
}
$page_u = 'https://www.digitalponsel.com' . urldecode($_GET['path']);
$page = $curl->get($page_u);
$html = str_get_html($page);
$c = $html->find('#content .entry', 0);
$_SESSION['title'] = $title = $html->find('title', 0)->plaintext;
foreach ($c->find('script,ins,div,a,style,meta,span,img,h1') as $rem) {
  if ('h1' == $rem->tag) {
    $rem->for = 'title';
    /*
    if ($rem->hasAttribute('class')){
      $rem->class = 'notranslate '.$rem->class;
    } else {
      $rem->class = 'notranslate';
    }
    */
  }

  ($rem->hasAttribute('style') ? $rem->removeAttribute('style') : false);
  ($rem->hasAttribute('onload') ? $rem->removeAttribute('onload') : false);
  ($rem->hasAttribute('onerror') ? $rem->removeAttribute('onerror') : false);
  if (preg_match('(ctaText|postTitle)', $rem->attr['class'])) {
    $rem->outertext = '';
  }
  if (preg_match('(ins|script|style)', $rem->tag)) {
    $rem->outertext = '';
  }
  if ('a' == $rem->tag) {
    $rem->href = 'https://web-manajemen.blogspot.com';
    $rem->rel = 'follow, noopener';
  }
  if ('img' == $rem->tag) {
    ($rem->hasAttribute('sizes') ? $rem->removeAttribute('sizes') : false);
    $cdn = 'https://res.cloudinary.com/dimaslanjaka/image/fetch/';
    (isset($rem->attr['data-pagespeed-lazy-src']) && false === strpos($rem->attr['src'], 'https://www.digitalponsel.com') ? $rem->setAttribute('src', $cdn . $rem->attr['data-pagespeed-lazy-src']) : false);
    foreach ($rem->attr as $n => $v) {
      if (!preg_match('(src|alt|title)', $n) || preg_match('(pagespeed)', $n)) {
        $rem->removeAttribute($n);
        //$rem->attr[$n] = '';
      }
    }
  }
}
echo $c->outertext;

//file_put_contents("digitalponsel.css", file_get_contents("https://www.digitalponsel.com/wp-content/themes/diansastro2/A.style.css.pagespeed.cf.XIx6h_Lz40.css"));

//echo '<link href="digitalponsel.css" rel="stylesheet" />';
$dir = 'articles';
$sl = 'id';
$tl = 'en';
include 'saver.php';
