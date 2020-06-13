<?php

use Crypto\crypt;
use JSON\json;

$crypt = new crypt();
if (user()->is_admin()) {
  if (isset($_REQUEST['e'])) {
    json::json(['result' => $crypt->encrypt('dimaslanjaka', $_REQUEST['e'])]);
    exit;
  }
  if (isset($_REQUEST['d'])) {
    json::json(['result' => $crypt->decrypt('dimaslanjaka', $_REQUEST['d'])]);
    exit;
  }
}
