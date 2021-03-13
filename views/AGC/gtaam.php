<?php

use Curl\Curl;

$no_add_title = 1;
$curl = new Curl();
$headers = ['Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5', 'Connection: Keep-Alive', 'Cache-Control: max-age=0', 'Upgrade-Insecure-Requests: 1', 'DNT: 1', 'Keep-Alive: 300', 'Content-type: */*;charset=UTF-8', 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7', 'Accept-Language: en-us,en;q=0.5', 'Pragma: no-cache', 'Origins: https://translate.google.co.id'];
$curl->setHeaders($headers);
$useragent = 'Opera/9.80 (J2ME/MIDP; Opera Mini/4.2.14912/870; U; id) Presto/2.4.15';
$curl->setUserAgent($useragent);
$curl->setReferrer('https://translate.google.co.id/m/translate');
$curl->setOpt(CURLOPT_ENCODING, 'gzip');
$curl->setOpt(CURLOPT_AUTOREFERER, true);
$curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
$curl->setOpt(CURLOPT_CAINFO, __DIR__ . '/cacert.pem');
//$curl->setOpt(CURLOPT_COOKIESESSION, true);
$curl->setOpt(CURLOPT_RETURNTRANSFER, true);
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->setCookieFile(COOKIEFILE);
$curl->setCookieJar(COOKIEFILE);
$paths = '/\/category\/|\/tag\/|\/label\/|\/p\/|\/feeds\/|\/search/m';

$url = 'https://gtaam.blogspot.com';
$parse_url = parse_url($url);

if (isset($_REQUEST['path']) && !empty($_REQUEST['path']) && !preg_match($paths, $_REQUEST['path'])) {
  $url .= trim(urldecode($_REQUEST['path']));
  $curl->get($url);
  if ($curl->error) {
    echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
  } else {
    $html = str_get_html($curl->response);
    $_SESSION['title'] = $post_title = ucwords(preg_replace('/gtaam\-\s/m', '', strtolower($html->find('title', 1)->plaintext)));
    $post = $html->find('div.post', 0)->outertext;
    $post = str_get_html($post);
    $post->find('div.post-footer', 0)->outertext = '';
    foreach ($post->find('*') as $tag) {
      if ($tag->hasAttribute('itemprop')) {
        $tag->removeAttribute('itemprop');
      }
      if ($tag->hasAttribute('style')) {
        $tag->removeAttribute('style');
      }
      if ('img' != $tag->tag) {
        if (empty($tag->innertext)) {
          $tag->outertext = '';
        }
      }
    }
    foreach ($post->find('img') as $tag) {
      if ($tag->hasAttribute('data-cfsrc')) {
        $tag->src = $tag->getAttribute('data-cfsrc');
        $tag->removeAttribute('data-cfsrc');
      }
      if (strpos($tag->src, 'gratis31')) {
        $tag->src = str_replace('www.gratis31.com', 'www.bagas31.info', $tag->src);
      }
      $img_a = new AGCURL();
      $img_b = $img_a->imgcdn($tag->src);
      if (isset($img_b->url)) {
        $tag->src = $img_b->url;
      } else {
        $tag->setAttribute('src', 'https://res.cloudinary.com/dimaslanjaka/image/fetch/' . $tag->src);
      }
      if ($tag->hasAttribute('srcset')) {
        $tag->removeAttribute('srcset');
      }
      if ($tag->hasAttribute('sizes')) {
        $tag->removeAttribute('sizes');
      }
      if ($tag->hasAttribute('border')) {
        $tag->removeAttribute('border');
      }
      if ($tag->hasAttribute('data-original-height')) {
        $tag->removeAttribute('data-original-height');
      }
      if ($tag->hasAttribute('data-original-width')) {
        $tag->removeAttribute('data-original-width');
      }
      $tag->title = $post_title;
    }
    foreach ($post->find('script,ins,#adsense-content,.breadcrumbs,.post-meta,.hreview,.ads-posting') as $removed) {
      $removed->outertext = '';
    }
    foreach ($post->find('.post-title') as $notr) {
      $notr->class = 'notranslate';
      $notr->for = 'title';
    }
    foreach ($post->find('a') as $a) {
      $a->class = 'notranslate';
      if ($a->hasAttribute('style')) {
        $a->removeAttribute('style');
      }
      if (isset($a->href)) {
        if (false !== strpos($a->href, $parse_url['host'])) {
          $href = parse_url($a->href);
          $a->href = 'https://web-manajemen.blogspot.com/p/search.html?q=' . str_replace(['-', '.html'], ['+', ''], end(explode('/', $href['path'])));
          $a->target = '_blank';
          $a->rel = 'follow';
        } else {
          $a->href = 'https://dimaslanjaka.github.io/page/safelink.html?url=' . base64_encode($a->href);
        }
      }
      if (isset($a->imageanchor)) {
        $a->outertext = $a->innertext;
      }
    }
    $cont = $post->save();
    $cont = '<!--original--><div id="agcontent">' . $cont . '</div>';
    $tl = 'id';
    $sl = 'en';
    $dir = 'articles';
    $_SESSION['body'] = $sess = gtrans::i()->grammar("$sl-$tl", $cont);
    echo html_entity_decode($sess);
  }
} else {
  if (isset($_REQUEST['path'])) {
    $path = trim(urldecode($_REQUEST['path']));
    if (preg_match($paths, $path)) {
      $url .= $path;
    }
  }
  $curl->get($url);
  if ($curl->error) {
    echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
  } else {
    $log = file_get_contents(__DIR__ . '/log.txt');
    $htm = str_get_html($curl->response);
    $list = [];
    $list2 = [];
    $post = $htm->find('.blog-posts', 0)->outertext;
    $post = str_get_html($post);
    foreach ($post->find('a') as $a) {
      $parse_href = parse_url($a->href);
      $E = end(explode('/', $parse_href['path']));
      if (isset($parse_href['path']) && !empty($parse_href['path']) && '/' != $parse_href['path'] && false !== strpos($a->href, $parse_url['host'])) {
        if (false === strpos($log, $E)) {
          echo '<a href="/AGC/gtaam?path=' . $parse_href['path'] . '" id="newtab" data-name="gtaam">' . $a->innertext . '</a><br>';
        }
      }
    }

    echo '<hr>';
    $pagi = str_get_html($htm->find('.blog-pager', 0)->outertext);
    foreach ($pagi->find('a') as $p) {
      $h = parse_url($p->href);
      if (isset($h['path']) && strlen($h['path']) > 1) {
        echo '<a href="/AGC/gtaam?path=' . urlencode($h['path'] . '?' . $h['query']) . '">Load Other Articles [' . $p->title . ']</a><br>';
      }
    }
    echo '<hr>';
    $_SESSION['title'] = 'GTA MOD ANDROID';
    if (!isset($_REQUEST['path'])) {
      echo '<h2>Updated From Feeds</h2>';
      $xml = simplexml_load_file($url . '/rss.xml?redirect=false');
      $parsed_results_array = [];
      foreach ($xml as $entry) {
        foreach ($entry->item as $item) {
          // $parsed_results_array[] = json_decode(json_encode($item), true);
          $items['title'] = (string) $item->title;
          //$items['description'] = (string) $item->description;
          $items['link'] = (string) $item->link;
          $parsed_results_array[] = $items;
        }
      }

      foreach ($parsed_results_array as $rss) {
        $l = parse_url($rss['link']);
        $e = explode('/', $l['path']);
        $rss['link'] = '/AGC/gtaam?path=' . $l['path'];
        if (false === strpos($log, end($e))) {
          echo '<a href="' . $rss['link'] . '" id="newtab" data-name="gtaam">' . $rss['title'] . '</a><br>';
        }
      }
    }
  }
}
