<?php

if (isset($_REQUEST['fetch'])) {
  $theme = new MVC\themes();
  $scan = Filemanager\scan::scandir($theme->config_folder);
  for ($i = 0; $i < count($scan); ++$i) {
    $file = $scan[$i];
    $path = realpath($file['path']);
    if (false !== strpos(serialize($file), 'theme-admin') || !isset($file['path'])) {
      unset($scan[$i]);
      continue;
    }
    if (!$path) {
      unlink($file['path']);
      unset($scan[$i]);
      continue;
    }

    // exclude some
    if (!isset($scan[$i]['content'])) {
      unset($scan[$i]);
      continue;
    }
    // check if view content exists
    $contentFile = \MVC\helper::platformSlashes(ROOT) . $scan[$i]['content'];
    if (!file_exists($contentFile)) {
      // if view content not exist, delete it
      unlink($file['path']);
      unset($scan[$i]);
      continue;
    }
  }
  $scan = array_values(array_filter($scan));
  e($scan);
}
