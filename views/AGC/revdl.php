<?php

session_start();
ob_start();
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
 $headers[] = 'Origins: http://www.revdl.com';
$curl->setHeaders($headers);
$curl->setUserAgent('Mozilla/5.0 (Linux; Android 7.0; Redmi Note 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36');
$curl->setReferrer('https://translate.google.co.id/m/translate');
$curl->setOpt(CURLOPT_ENCODING, 'gzip');
$curl->setOpt(CURLOPT_AUTOREFERER, true);
$curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
$curl->setOpt(CURLOPT_CAINFO, realpath('cacert.pem'));
$curl->setOpt(CURLOPT_COOKIESESSION, true);
$curl->setOpt(CURLOPT_RETURNTRANSFER, true);
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->setCookieFile('cookie.txt'); $curl->setCookieJar('cookie.txt');

if (isset($_GET['manual'])) {
  $F = <<<EOF
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
  form{margin-top:50px}
  </style>
  <div class="container">
  <form action="?" class="form-group">
  <div class="control-group">
  <input type="url" name="path" class="form-control" value="https://www.revdl.com/fortnite-apk-data-download2.html/" />
  <input type="hidden" name="generate" />
  <button type="submit button" class="btn-default form-control btn">Grab</button>
  </div>
  </form>
  </div>
EOF;
  echo $F;
} elseif (!isset($_GET['path'])) {
  $url = 'https://www.revdl.com';
  $curl->get($url);
  $page = $curl->response;
  $html = str_get_html($page);
  foreach ($html->find('a') as $tag) {
    $href = $tag->attr['href'];
    $href = str_replace('https://www.revdl.com', '?generate&path=', strtolower($href));
    $tag->setAttribute('href', $href);
  }
  echo $html->save();
} elseif (isset($_GET['path'])) {
  $path = str_replace('https://www.revdl.com', '', urldecode($_GET['path']));
  $_SESSION['victim'] = $url = 'https://www.revdl.com' . urldecode($path);

  $curl->setReferrer($url);
  $curl->setReferer($url);
  $page = $curl->get($url);
  $html = str_get_html($curl->response);
  $_SESSION['title'] = $title = $html->find('title', 0)->plaintext;
  $c = $html->find('#dlbox ul a', 0);
  $_SESSION['revdownload'] = $urldownload = $c->href;
  $pagedownload = $curl->get($urldownload);
  if (isset($_GET['download'])) {
    header('Location: revdownload.php');
    die();
  }
  if (isset($_GET['path'])) {
    $cnt = $html->find('.entry-content', 0);
    foreach ($cnt->find('div,a,i,span,img,video,h1,h2,h3,h4,h5') as $tag) {
      if (preg_match('(h1|h2|h3|h4|h5|a)', $tag->tag)) {
        if ($tag->hasAttribute('class')) {
          $tag->setAttribute('class', 'notranslate ' . $tag->getAttribute('class'));
        } else {
          $tag->setAttribute('class', 'notranslate');
        }
      }
      if ($tag->hasAttribute('style')) {
        $tag->removeAttribute('style');
      }
      if (preg_match('/(vcard)/i', $tag->getAttribute('class'))) {
        $tag->innertext = 'Website Manajemen Indonesia';
      }
      if ('a' == $tag->tag) {
        $tag->href = 'https://web-manajemen.blogspot.com';
      }
      if ($tag->hasAttribute('data-cfsrc') && 'img' == $tag->tag && empty($tag->getAttribute('src'))) {
        $cdn = 'https://res.cloudinary.com/dimaslanjaka/image/fetch/';
        $tag->setAttribute('src', $cdn . $tag->attr['data-cfsrc']);
      }
    }
    $chtml = $cnt->outertext;
    $rev = ['>revdl<', '>RevDl<', '>revdl<', '>Revdl<', '> revdl<', '>revDl<', '>RevDL<', '>revDL<'];
    $chtml = str_replace($rev, '> Website Manajemen Indonesia <', $chtml);
    echo trim($chtml);
    $external = 'https://dimaslanjaka-storage.000webhostapp.com';
    $c->setAttribute('href', $external . '/revdl.php?download&path=' . $_GET['path']);
    $c->setAttribute('class', 'w3-btn w3-green');
    $c->setAttribute('target', '_blank');
    $title = 'DOWNLOAD ' . $_SESSION['title'];
    $c->innertext = $title;
    echo "<h1 for='title' class='notranslate'>$title</h1>";
    echo trim("<div class='w3-center w3-container w3-border notranslate'>" . $c->outertext . '</div>');
  } //generate
}

//page will be expired in
/*
if (!preg_match('/(dl1.revdownload|s1.revdownload)/mi', $pagedownload)){
$curl->get($url);
$curl->get($urldownload);
}

$output = ob_get_contents();
$_SESSION["body"] = $output;
ob_clean();
ob_start();
if (isset($_GET["path"]) && isset($_GET["generate"])){
$param = explode("/", rtrim($_GET["path"],'/'));
$filename = end($param);
    if (!is_dir("apk")){
    $oldmask = umask(0);
    mkdir("apk", 0777);
    umask($oldmask);
     }
//$filename = rtrim($_GET["path"],'/');
if (!file_exists("apk/".$filename) && isset($_GET["generate"]) && isset($_GET["path"])){
  //$output = utf8_encode($output);
  file_put_contents("apk/".$filename, $output . PHP_EOL, LOCK_EX);
}
}
echo $output;
$post = $_SESSION["revdownload"];
$victim = $_SESSION["victim"];
//include(realpath("mail.php"));

*/

$tl = 'id';
$sl = 'en';
if (isset($_GET['path'])) {
  $output = ob_get_contents();
  ob_clean();
  ob_start();
  $_SESSION['body'] = $output;
  echo $output;

  include realpath('translate.js.php');
}

     if (!is_dir('apk')) {
       $oldmask = umask(0);
       mkdir('apk', 0777);
       umask($oldmask);
     }
if (isset($_GET['path'])) {
  $path = urldecode($_GET['path']);
  $f = preg_replace('/(((https?)\:\/\/)?www\.revdl\.com|\/)/', '', $path);
  $b = "<h1 for='title'>" . $_SESSION['title'] . '</h1>';
  $b .= '<div>' . $_SESSION['body'] . '</div>';
  if (preg_match('(barees|storage)', $_SERVER['HTTP_HOST'])) {
    $_SESSION['target_translate'] = 'http://' . $_SERVER['HTTP_HOST'] . '/apk/' . $f;
  } else {
    $_SESSION['target_translate'] = 'http://dimaslanjaka-storage.000webhostapp.com/apk/' . $f;
  }
  echo '<hr/><center><a href="index.php?sl=' . $sl . '&tl=' . $tl . '">Send This To Blogger</a></center><hr/>';
  if (!file_exists('apk/' . $f)) {
    file_put_contents('apk/' . $f, $b . PHP_EOL, LOCK_EX);
  } elseif (isset($_GET['save'])) {
    file_put_contents('apk/' . $f, $b . PHP_EOL, LOCK_EX);
  }
}
