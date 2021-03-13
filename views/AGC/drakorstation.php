<?php

$paths = '/^\/(cara\-(memunculkan\-subtitle|download)|drama\-(korea|china|ongoing)\-?|movie\-(korea|ongoing|china)\-?|author\/|pasang\-iklan|author\/|page\/)|(\#respond|\#comment)$|^\/$/m';
$log = file_get_contents(ROOT . '/views/AGC/log.txt');
$curl = Curl();
$url = 'http://drakorstation.net';
if (isset($_GET['path'])) {
  $url .= trim(urldecode($_GET['path']));
}

$agc = new gtrans($curl);
$curl = $agc->fetch_contents($curl, $url, 'movies');
$parse_url = parse_url($url);
$page = $curl->response;
//exit($page);
$html = str_get_html($page);
$log = file_get_contents(ROOT . '/views/AGC/log.txt');
$pathURL = trim(urldecode(isreq('path')));
//precom($pathURL, preg_match($paths, $pathURL));
if (!isset($_GET['path']) || preg_match($paths, $pathURL)) {
  //$_SESSION['title'] = $html->find('title', 0)->plaintext;

  $agc->generateIndex($html, $url, $paths, ['router' => '/AGC/drakorstation', 'niche' => 'movies']);
} elseif ((isset($_REQUEST['path']) || !empty($_REQUEST['path'])) && !preg_match($paths, $_REQUEST['path'])) {
  $service = new agc_service\Service();
  $init = $service->getClass($url);
  $init->set($url, $curl);
  $cont = $init->content();
  $cont = agcparser::getInstance()->parsingview($cont, false, true, ['highlight' => true])->clean_inline_style('figure', 'table')->save_depencies()->combine()->__toString();
  $_SESSION['body'] = $cont;
  $dir = 'movies/' . $parse_url['host'];
  echo "<div id=\"agc_result\">$cont</div>";
}
