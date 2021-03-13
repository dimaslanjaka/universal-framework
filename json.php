<?php

function hj()
{
  header('Content-type: application/json; charset=utf-8');
}

function cj($data)
{
  return json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
}

if ('POST' == $_SERVER['REQUEST_METHOD']) {
  try {
    file_put_contents($_SERVER['DOCUMENT_ROOT'] . '/tmp/post_' . date('dmy'), cj($_POST) . "\n\n", FILE_APPEND);
  } catch (\Throwable $th) {
    //throw $th;
  }
}
