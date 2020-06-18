<?php
# facebook instance

use Facebook\client;

if (!defined('ROOT')) {
  define('ROOT', realpath(__DIR__));
}

$fb = new client();
function fb()
{
  global $fb;

  return $fb->get_instance();
}
//exit(var_dump(fb()));
