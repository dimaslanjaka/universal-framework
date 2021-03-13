<?php

//https://compressedapp.blogspot.com/2018/10/dragon-ball-z-shin-budokia-for-android.html
use Curl\Curl;

//$no_add_title = 1;
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

$url = 'https://compressedapp.blogspot.com';
$parse_url = parse_url($url);

if (!isset($_REQUEST['path']) || (isset($_REQUEST['path']) && preg_match($paths, trim(urldecode($_REQUEST['path']))))) {
  if (isset($_REQUEST['path'])) {
    $url .= trim(urldecode($_REQUEST['path']));
  }
  $curl->get($url);
  if ($curl->error) {
    echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
  } else {
    $htm = str_get_html($curl->response);
    $home = str_get_html($htm->find('div#main', 0)->outertext);
    foreach ($home->find('.entry-title') as $article) {
      echo str_replace('https://compressedapp.blogspot.com/', '/AGC/compressedapp?path=/', $article->innertext) . '<br>';
    }

    $pagi = str_get_html($home->find('#blog-pager', 0)->outertext);
    foreach ($pagi->find('a') as $p) {
      $pa = parse_url($p->href);
      if (isset($pa['path']) && strlen($pa['path']) > 5) {
        echo '<a href="/AGC/compressedapp?path=' . urlencode($pa['path'] . '?' . $pa['query']) . '">Load Other Articles [' . $p->title . ']</a>';
      }
    }
  }
} elseif (isset($_REQUEST['path']) && !preg_match($paths, trim(urldecode($_REQUEST['path'])))) {
  if (isset($_REQUEST['path'])) {
    $url .= trim(urldecode($_REQUEST['path']));
  }
  $curl->get($url);
  if ($curl->error) {
    echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
  } else {
    $htm = str_get_html($curl->response);
    $_SESSION['title'] = $post_title = ucwords(preg_replace('/gtaam\-\s/m', '', strtolower($htm->find('title', 0)->plaintext)));
    $article = str_get_html(str_replace('compressedapp.blogspot.in', 'compressedapp.blogspot.com', $htm->find('.entry-content', 0)->outertext));
    foreach ($article->find('meta') as $r) {
      $r->outertext = '';
    }
    foreach ($article->find('*') as $r) {
      if ($r->hasAttribute('style')) {
        $r->removeAttribute('style');
      }
      if ($r->hasAttribute('itemprop')) {
        $r->removeAttribute('itemprop');
      }
      if ($r->hasAttribute('class')) {
        $r->removeAttribute('class');
      }
      if ($r->hasAttribute('id')) {
        $r->removeAttribute('id');
      }
      if ($r->hasAttribute('dir')) {
        $r->removeAttribute('dir');
      }
    }

    foreach ($article->find('a') as $a) {
      //echo json_encode([parse_url($a->href)['host'], $parse_url['host']]).'<br>';
      if (false !== strpos($a->href, $parse_url['host'])) {
        $p = parse_url($a->href);
        $a->href = 'https://web-manajemen.blogspot.com/p/search.html?q=' . end(explode('/', $p['path']));
        $a->rel = 'follow';
      } else {//exit($parse_url['host'].'/'.$a->href);
        $a->href = 'https://dimaslanjaka.github.io/page/safelink.html?url=' . base64_encode($a->href);
        $a->target = '_blank';
      }
      if (!empty($a->innertext)) {
        $in = str_get_html($a->innertext);
        if (count($in->find('img')) > 0) {
          $a->outertext = $a->innertext;
        }
      }
    }

    foreach ($article->find('img') as $img) {
      if ($img->hasAttribute('data-cfsrc')) {
        $img->src = $img->getAttribute('data-cfsrc');
        $img->removeAttribute('data-cfsrc');
      }
      if (strpos($img->src, 'gratis31')) {
        $img->src = str_replace('www.gratis31.com', 'www.bagas31.info', $img->src);
      }
      $img_a = new AGCURL();
      $img_b = $img_a->imgcdn($img->src);
      if (isset($img_b->url)) {
        $img->src = $img_b->url;
      } else {
        $img->setAttribute('src', 'https://res.cloudinary.com/dimaslanjaka/image/fetch/' . $img->src);
      }
      if ($img->hasAttribute('srcset')) {
        $img->removeAttribute('srcset');
      }
      if ($img->hasAttribute('sizes')) {
        $img->removeAttribute('sizes');
      }
      if ($img->hasAttribute('border')) {
        $img->removeAttribute('border');
      }
      if ($img->hasAttribute('data-original-height')) {
        $img->removeAttribute('data-original-height');
      }
      if ($img->hasAttribute('data-original-width')) {
        $img->removeAttribute('data-original-width');
      }
      $img->title = $post_title;
    }

    $cont = '<!--original--><div id="agcontent">' . $article->save() . '</div>';
    $tl = 'id';
    $sl = 'en';
    $dir = 'articles';
    $_SESSION['body'] = $sess = gtrans::i()->grammar("$sl-$tl", $cont);
    echo html_entity_decode($cont);
  }
}
