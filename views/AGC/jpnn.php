<?php

//https://www.jpnn.com/tag/e-commerce

$home = 'https://www.jpnn.com';
$parse_url = parse_url($home);
$agc = new gtrans();
$curl = $agc->cURL(false);
$paths = '/^\/tag\/|^\/{0,1}$/m';
$req = isset($_REQUEST['path']) ? trim(urldecode($_REQUEST['path'])) : false;

if (!$req) {
  precom('is homepage');
  index($home);
} elseif ($req && preg_match($paths, $req)) {
  precom('is page restricted');
  index($home . $req);
} elseif ($req && !preg_match($paths, $req)) {
  precom('is contents');
}

function index($url)
{
  global $curl;
  global $agc;
  $curl = $agc->fetch_contents($curl, $url);
  $html = str_get_html($curl->response);
  if ($html) {
    if ($html->find('a')) {
      foreach ($html->find('a') as $a) {
        $href = parse_url($a->href);
        if (isset($href['path'])) {
          if (preg_match('/^\/news/s', $href['path'])) {
            $a->href = '/AGC/jpnn?path=' . $href['path'] . (isset($href['query']) && !empty(trim($href['query'])) ? '?' . $href['query'] : false);
            $a->id = 'newtab';
            $a->{'data-name'} = 'agc';
            echo $a->outertext . '<br/>';
          }
        }
      }
    }
  }
}
