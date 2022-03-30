<?php

if ('POST' == $_SERVER['REQUEST_METHOD']) {
  header('Content-type: application/json');
  $server = [];
  if (function_exists('apache_request_headers')) {
    $headers = apache_request_headers();
    foreach ($headers as $header => $value) {
      //echo "$header: $value <br />\n";
      $server[$header] = $value;
    }
  } else {
    $server = $_SERVER;
  }
  exit(json_encode($server, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
}
