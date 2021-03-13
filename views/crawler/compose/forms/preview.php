<?php

use agc_service\Service;

//$core->hj();
$result = [];
$done = [];
if (isreq('proxies')) {
  $p = explode("\n", isreq('proxies'));
  $f = file(ROOT . '/views/AGC/forms/proxy.txt', FILE_SKIP_EMPTY_LINES);
  $f = array_unique(array_merge($f, $p));
  //exit(implode("\n", $f));
  file_put_contents(ROOT . '/views/AGC/forms/proxy.txt', implode("\n", $f));
}
if (isreq('url')) {
  $url = isreq('url');
  if (is_iterable($url)) {
    foreach ($url as $u) {
      gdata($u);
    }
  } else {
    gdata($url);
  }
  if (!isreq('html')) {
    $core->dump($result);
  } else {
    echo implode('<br/>', $result);
  }
}

function gdata($u)
{
  global $result, $done;
  if (empty($u) || !isURL($u) || in_array($u, $done)) return;
  $done[] = $u;
  $class = new Service();
  $init = $class->getClass($u);
  if (is_object($init)) {
    $init->set($u);
    $content = $init->content();
    if (isreq('translate')) {
      $init->sendHTML($content, isreq('rewrite'));
      if (isreq('sl')) $init->setSourceLang(isreq('sl'));
      if (isreq('tl')) $init->setTargetLang(isreq('tl'));
      $translate = $init->translate(null, isreq('rewrite'));
      if ($translate) {
        $bh = str_get_html($translate);
        printr($translate);
      }
    } else {
      $result[] = $content;
    }
  }
  return $init;
}

exit;
