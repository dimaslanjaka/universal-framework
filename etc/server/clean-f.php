<?php

if (user()->is_admin() || LOCAL) {
  if (isset($_REQUEST['clean_cache'])) {
    \Filemanager\file::emptyDir(ROOT . '/tmp/html');
    \Filemanager\file::emptyDir(ROOT . '/processed/html');
    \Filemanager\file::emptyDir(ROOT . '/src/Session/sessions');
    \Filemanager\file::emptyDir(ROOT . '/tmp/optimized');
    e(['error' => false, 'message' => 'Cache cleaned success']);
  }

  if (isset($_REQUEST['latest'])) {
    $config = \JSON\json::init()->load(ROOT . '/config.json', true);
    $config_modified = false;
    $latest = $latestFileName = '';
    $latestFileName = latestFile([ROOT . '/src/MVC/', ROOT . '/views/'], false);
    $latestFile = filectime($latestFileName);
    $dateLatest = new DateTime(date('c', $latestFile));
    $latest = $dateLatest->format('c'); //'/d/m/Y/h/i/s/B'
    if (LOCAL) {
      if (isset($_REQUEST['force'])) {
        $latest = md5(uniqid($latest));
        $config->result['cache']['ext'] = $latest;
        $config_modified = true;
      }
    }
    $config->result['app']['environtment'] = \MVC\helper::env('dev') ? 'development' : 'production';
    $config->result['app']['domain'] = $_SERVER['HTTP_HOST'];
    $config->result['app']['root'] = ROOT;
    $config->result['app']['protocol'] = (!empty($_SERVER['HTTPS']) && 'off' !== $_SERVER['HTTPS'] || 443 == $_SERVER['SERVER_PORT']) ? 'https' : 'http';
    if ($config_modified) {
      $config->save();
    }

    e(['result' => [remove_root($latestFileName), $latest], 'conf' => $config->result]);
  }
}
exit;
