<?php
//require_once __DIR__ . '/agc_service.php';

use agc_service\Service;

$class = new Service();
if (isreq('create', 'post')) {
  $url = isreq('url');
  if (isURL($url)) {
    $parse = parse_url2($url);
    if (isset($parse['host'])) {
      $className = str_replace('.', '_', $parse['host']);
      _file_(__DIR__ . "/{$className}.php", "<?php\n");
    }
  }
}

//var_dump($class->getServices());
