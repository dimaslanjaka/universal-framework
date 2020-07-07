<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (isset($_POST['save_config'])) {
    unset($_POST['save_config']);
    $config = \JSON\json::init()->load(ROOT . '/config.json', true);
    $config->result['cache']['ext'] = $_POST['cache']['ext'];
    $config->save();
  }
}
