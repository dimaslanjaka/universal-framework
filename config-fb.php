<?php
# facebook instance

if (!defined('ROOT')) {
  define('ROOT', realpath(__DIR__));
}

$fb = new Facebook\client();
function fb()
{
  global $fb;

  return $fb->get_instance();
}
//exit(var_dump(fb()));
