<?php

if (isset($_REQUEST['crypto'])) {
  if (isset($_REQUEST['encrypt'])) {
    $key = (isset($_REQUEST['key']) ? trim($_REQUEST['key']) : (defined('PASS') ? PASS : dimas::i(['x'])->def()->pass));
    $toen = (isset($_REQUEST['txt']) ? trim($_REQUEST['txt']) : exit('Crypto'));
    dimas::i()->dump(['enc' => dimas::i()->ce($toen, $pass)]);
  }
}

if (!is_dir($_SERVER['DOCUMENT_ROOT'] . '/assets/config/youtube')) {
  _folder_($_SERVER['DOCUMENT_ROOT'] . '/assets/config/youtube');
}
