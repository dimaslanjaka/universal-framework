<?php

//include __DIR__ .'/core/loader/index.php';

use Curl\Curl;
use agc_service\Service;
use simplehtmldom\str_get_html;

$class = new Service();

$paths = '/^\/(page\/|author\/|category\/|tag\/|store\/)/m';
$url = 'https://www.bagas31.info';
if (isset($_GET['path'])) {
  $url .= trim(urldecode($_GET['path']));
}

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
$curl->setUserAgent('Mozilla/5.0 (Linux; Android 7.0; Redmi Note 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36');
$curl->setReferrer('https://translate.google.co.id/m/translate');
$curl->setOpt(CURLOPT_ENCODING, 'gzip');
$curl->setOpt(CURLOPT_AUTOREFERER, true);
$curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
$curl->setOpt(CURLOPT_CAINFO, realpath(ROOT . '/views/AGC/cacert.pem'));
$curl->setOpt(CURLOPT_COOKIESESSION, true);
$curl->setOpt(CURLOPT_RETURNTRANSFER, true);
$curl->setOpt(CURLOPT_FOLLOWLOCATION, true);
$curl->setCookieFile(ROOT . '/tmp/cookie.txt');
$curl->setCookieJar(ROOT . '/tmp/cookie.txt');
$agc = new gtrans($curl);
$niche = 'download';
$curl = $agc->fetch_contents($curl, $url, $niche);
$parse_url = parse_url($url);
$page = $curl->response;
$html = str_get_html($page);
$log = file_get_contents(ROOT . '/views/AGC/log.txt');
$pathURL = trim(urldecode(isreq('path')));
$init = $class->getClass($url);
if (is_object($init)) {
  $init->set($url, $curl);
}
if (!isset($_GET['path']) || preg_match($paths, $pathURL)) {
  $agc->generateIndex($html, $url, $paths, ['router' => '/AGC/bagas31', 'niche' => $niche]);
} else if (isset($_REQUEST['path']) || !empty($_REQUEST['path'])) {
  $tl = 'en';
  $sl = 'id';
  if (!isreq('gen')) {
    if (!preg_match($paths, $_REQUEST['path'])) {
      trycatch(function () {
        global $init, $agc, $tl, $sl;
        $cont = $init->content();
        $cont = $agc->grammar("$tl-$sl", $cont);
        $cont = agcparser::getInstance()->parsingview($cont, false, true, ['highlight' => true])->clean_inline_style('figure', 'font', 'table', 'div', 'img')->save_depencies()->combine()->__toString();
        $_SESSION['body'] = $cont;
        echo $cont;
      });
    } else if (isses('target_translate')) {
      trycatch(function () {
        global $init, $agc, $tl, $sl, $curl;
        $cont = $init->content();
        $cont = $agc->grammar("$tl-$sl", $cont);
        $cont = agcparser::getInstance()->parsingview($cont, false, true, ['highlight' => true])->clean_inline_style('figure', 'font', 'table', 'div', 'img')->save_depencies()->combine()->__toString();
        /**
         * Set curl proxy
         */
        if (isreq('proxy')) {
          sess('proxy', trim(isreq('proxy')));
          $curl->setProxy(trim(isreq('proxy')));
          $curl->setProxyTunnel(true);
        }
        /**
         * Create filename
         */
        $fne = explode('/', str_replace('https://wp.webmanajemen.com/receiver/', '', isses('target_translate')));
        $fne = array_filter($fne);
        $fn = end($fne);
      });
    }
  }
}
$dir = 'download/' . $parse_url['host'];
