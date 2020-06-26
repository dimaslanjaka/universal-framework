<?php

if (user()->is_admin() || LOCAL) {
  if (isset($_REQUEST['clean_cache'])) {
    \Filemanager\file::empty(ROOT . '/tmp/html');
    \Filemanager\file::empty(ROOT . '/processed/html');
    \Filemanager\file::empty(ROOT . '/src/Session/sessions');
    \Filemanager\file::empty(ROOT . '/tmp/optimized');
    e(['error' => false, 'message' => 'Cache cleaned success']);
  }

  if (isset($_REQUEST['latest'])) {
    $latestFileName = latestFile([ROOT . '/src/MVC/', ROOT . '/libs/', ROOT . '/views/'], false);
    $latestFile = filectime($latestFileName);
    $dateLatest = new DateTime(date('c', $latestFile));
    $latest = $dateLatest->format('/d/m/Y/h/i/s/B');
    if (isset($_REQUEST['force'])) {
      $latest = md5(uniqid($latest));
    }
    $config = \JSON\json::init()->load(ROOT . '/config.json', true);
    $config->result['cache']['ext'] = $latest;
    $config->save();
    e(['result' => remove_root($latestFileName) . " $latest", 'conf' => $config->result]);
  }
}
exit;
