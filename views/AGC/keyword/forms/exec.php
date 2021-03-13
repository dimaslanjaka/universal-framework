<?php

use agc_service\Service;

//$core->hj();
$class = new Service();
if (isreq('class')) {
  $init = $class->getClass(isreq('class'));
  if (is_object($init)) {
    $init->set(isreq('class'));
    $content = $init->content();
    if (!isreq('html')) {
      $core->dump($content);
    } else {
      printr($content);
    }
    exit;
  }
}
exit;
