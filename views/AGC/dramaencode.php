<?php

$paths = '/^\/(category|author)/m';
$log = file_get_contents(ROOT . '/views/AGC/log.txt');

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
$curl->setOpt(CURLOPT_ENCODING, 'gzip');

$curl->setCookieFile(TEMP . '/cookie.txt');
$curl->setCookieJar(TEMP . '/cookie.txt');

$u = 'https://www.dramaencode.com';
if (!isset($_GET['path'])) {
  $homepage = 1;
}
if (isset($_GET['path'])) {
  $u .= trim(urldecode($_GET['path']));
} elseif (isset($_GET['s'])) {
  $u .= '/?s=' . $_GET['s'];
  $searchpage = 1;
}

$agc = new gtrans;
$curl = $agc->fetch_contents($curl, $u);
$html = str_get_html($curl->response);
$_SESSION['title'] = $html->find('title', 0)->plaintext;
$c = $html->find('.entry-content', 0);
$log = file_get_contents(ROOT . '/views/AGC/log.txt');
if (null == $c) {
  unset($c);
  $c = $html;
}
$inserted = [];
foreach ($c->find('div,script,a,form,span,img') as $tag) {
  if ($tag->hasAttribute('class') && 'mh-social-bottom' == $tag->getAttribute('class')) {
    $tag->outertext = '';
  }
  if ('form' == $tag->tag) {
    $tag->attr['action'] = '?s=';
  }
  if ('script' == $tag->tag) {
    if (isset($tag->src) && preg_match('/(safelinku\.com|wts\.pw)/m', $tag->src) || preg_match('/(safelinku\.com|wts\.pw)/m', $tag->innertext)) {
      $tag->outertext = '';
    }
  }
  if ('img' == $tag->tag) {
    if ($tag->hasAttribute('data-lazy-src')) {
      $tag->src = $tag->attr['data-lazy-src'];
    }
    $tag->sizes = '';
    $tag->srcset = '';
    $tag->src = 'https://wp.webmanajemen.com/receiver/?url=' . $tag->src;
  }
  if (preg_match('(a|b|i|h2|h3|h4|h5|h1)', strtolower($tag->tag))) {
    if ($tag->hasAttribute('class')) {
      $tag->class = 'notranslate ' . $tag->class;
    } else {
      $tag->class = 'notranslate';
    }
  }
  if ('a' == $tag->tag) {
    $a = $tag;
    $href = $a->href;
    $ori_href = $a->href;
    $a->target = '_blank';
    if (false !== strpos($href, 'https://www.dramaencode.com')) {
      if (isset($searchpage) || isset($homepage)) {
        $href = str_replace('https://www.dramaencode.com', '?path=', $href);
      } elseif (!isset($searchpage) || !isset($homepage)) {
        $href = str_replace('https://www.dramaencode.com', '', $href);
        $href = preg_replace('(\/|[0-9]+)', '', $href);
        $href = str_replace('-', ' ', $href);
        if (empty($href)) {
          $href = 'download';
        }
        $href = 'https://web-manajemen.blogspot.com/p/search.html?q=' . $href;
      }
      $a->href = $href;

      if (!isset($_REQUEST['path']) || preg_match($paths, $_REQUEST['path'])) {
        if (!preg_match('/\/author\/|\/category\/|\/page\/|tutorial\-download\-di|jadwal\-rilis|\#comment|\#respond|path\=\/$/m', $href) && !preg_match_all('/\[\…\]/m', $a->innertext) && !in_array($href, $inserted)) {
          $inserted[] = $href;
          if ($a->find('img', 0)) {
            if ($a->find('img', 0)->hasAttribute('alt')) {
              $a->innertext = $a->find('img', 0)->getAttribute('alt');
            } elseif ($a->find('img', 0)->hasAttribute('title')) {
              $a->innertext = $a->find('img', 0)->getAttribute('title');
            }
          }
          echo $a->outertext . '<hr/>';
        }
      }
    } else {
      if (gtrans::i()->download_site($a->href)) {
        $a->href = 'https://dimaslanjaka.github.io/page/safelink.html?url=' . base64_encode($a->href);
      }
    }
  }
}

if (isset($_GET['path'])) {
  $dir = 'movies';
  $sl = 'id';
  $tl = 'en';
  $o = '<div id="AGC-dramaencode">' . $c->outertext . '</div>';
  $rev = ['>revdl<', '>RevDl<', '>revdl<', '>Revdl<', '> revdl<', '>dramaencode.com<', '>RevDL<', '>revDL<', '>www.dramaencode.com<'];
  $o = str_replace($rev, '> Website Manajemen Indonesia <', $o);
  $o = str_replace('Kesusahan download di dramaencode', 'Tutorial Download', $o);
  $_SESSION['body'] = gtrans::i()->grammar("$sl-$tl", '<!--original-->' . $o);
  echo $_SESSION['body'];
}
