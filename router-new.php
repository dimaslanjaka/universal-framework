<?php

$request = router::i()->request;
$subrequest = explode('/', $request);
$squence = '';

$dev = __DIR__ . '/router-dev.php';
if (file_exists($dev)) {
  include $dev;
}

$groot = get_option('site_default');
$core->dump(router::i()->realtime());
