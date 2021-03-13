<?php

//include __DIR__ .'/core/loader/index.php';

use Curl\Curl;

$curl = new Curl();
$curl->setHeaders(['Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5', 'Connection: Keep-Alive', 'Cache-Control: max-age=0', 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7', 'Content-type: */*;charset=UTF-8', 'Pragma: no-cache', 'DNT: 1', 'Accept-Language: en-us,en;q=0.5', 'Keep-Alive: 300', 'Upgrade-Insecure-Requests: 1', 'Origins: https://www.facebook.com']);
$curl->setUserAgent($_SERVER['HTTP_USER_AGENT']);
$curl->setReferrer('https://translate.google.co.id/m/translate');
$curl->setOpt(CURLOPT_ENCODING, 'gzip');
$curl->setOpt(CURLOPT_AUTOREFERER, true);
$curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
$curl->setOpt(CURLOPT_CAINFO, realpath('cacert.pem'));
$curl->setOpt(CURLOPT_RETURNTRANSFER, true);
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->setCookieFile(__DIR__ . '/cookie.txt');
$curl->setCookieJar(__DIR__ . '/cookie.txt');
$paths = '/^\/(page|category|tag)/m';
//$url = "https://www.bagas31.info/2018/10/magix-vegas-pro-16-build-307-full-version.html";
$log = file_get_contents(ROOT . '/views/AGC/log.txt');
$url = 'http://158.69.54.218/movie/i-live-alone-episode-194-tv-series/';
if (isset($_GET['path'])) {
  $url .= $_GET['path'];
} elseif (isset($_GET['s'])) {
  $url .= '/?s=' . $_GET['s'];
  $searchpage = 1;
}
$curl->get($url);
$page = $curl->response;
if ($curl->error) {
  echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
} else {
  $html = str_get_html($page);
  $title = 'DOWNLOAD ' . $html->find('title', 0)->plaintext;
  $title = parsetitle($title);
  $_SESSION['title'] = $title;
  $c = $html->find('.inner-wrap', 0);
  if (null == $c) {
    unset($c);
    $c = $html;
  }
  $ahr = [];

  echo "<h1 for='title' class='notranslate'>$title</h1>";
  foreach ($c->find('a') as $tag) {
    if ('a' == $tag->tag) {
      $download_link = strpos($tag->href, 'cogihot.info') && $tag->hasAttribute('alt');
      if (strpos($tag->href, '/movie/') && !preg_match('/\/(category|tag|\d)\//m', $tag->href) && !empty($tag->href) || $download_link) {
        if ($download_link) {
          if (!$tag->title) {
            $tag->title = $tag->alt;
          }
          $hrf = '<a href="' . $tag->href . '" title="' . $tag->title . '" alt="' . $tag->alt . '" style="color:red" target="_blank" rel="nofollow">Download ' . maketitle($tag->href) . ' <i class="fas fa-download"></i></a>';
          if (!in_array($hrf, $ahr)) {
            $ahr[] = $hrf;
            echo $hrf . '<hr/>';
          }
        }
        $hrf = '<a href="http://web-manajemen.blogspot.com/p/search.html?q=' . maketitle($tag->href) . '" title="' . $tag->title . '" alt="' . $tag->alt . '" target="_blank" rel="follow">Download ' . maketitle($tag->href) . '</a>';
        if (!in_array($hrf, $ahr)) {
          $ahr[] = $hrf;
        }
      }
    }
  } ?>
<ul>
  <?php
    foreach ($ahr as $td) {
      echo "<li>$td</li>";
    } ?>
</ul>
<?php
  //echo $c->find('div.post-entry', 0)->outertext;
}

function maketitle($href)
{
  $ttl = end(explode('/', rtrim($href, '/')));
  $ttl = str_replace(' ', '-', str_replace(['tv-series', '(TV series)'], '', $ttl));
  $ttl = preg_replace('/\W|\-+|\s+/', ' ', $ttl);

  return $ttl;
}

function parsetitle($title)
{
  return ucwords(strtolower(str_replace(['(TV Series) indoxxi lk21 Online Sub Indo', 'Nonton Streaming Film'], '', $title)));
}
