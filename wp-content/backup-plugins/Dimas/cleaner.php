<?php
if (!isset($core)) {
  $core = do_shortcode('DimasClass');
}

$currentTime = new DateTime('NOW', new DateTimeZone('Asia/Jakarta'));
$startTime = new DateTime('23:59', new DateTimeZone('Asia/Jakarta'));
$endTime = (new DateTime('21:00', new DateTimeZone('Asia/Jakarta')))->modify('+1 day')->format('H');
$beetweenTime = $currentTime >= $startTime && $currentTime <= $endTime;
if ($beetweenTime || isreq('cleanup')) {
  cleanUp();
}

function cleanUp()
{
  if (!iscookie('cleanup')) {
    $files = glob(ROOT . '/tmp/{post,sess}_*', GLOB_BRACE);
    foreach ($files as $post_log) {
      if (file_exists($post_log)) {
        unlink($post_log);
      }
    }
    $files = glob(ROOT . '/tmp/*.{json}', GLOB_BRACE);
    for ($i = 0; $i < count($files); ++$i) {
      $json = json_decode(file_get_contents($files[$i]));
      if (isset($json->title)) {
        if (file_exists(dirname($files[$i]) . '/' . $json->title . '.info.json') && !file_exists(dirname($files[$i]) . '/' . $json->title . '.mp3') && (isset($json->url) && !empty($json->url))) {
          unlink(dirname($files[$i]) . '/' . $json->title . '.info.json');
        }
      }
    }
    $folder = ROOT . '/tmp/www*';
    foreach (glob($folder) as $subfolder) {
      if (is_dir($subfolder)) {
        deleteDirectory(realpath($subfolder));
      }
    }
    $folder = ROOT . '/views/AGC/saved';
    $jsoncfg = [];
    if (is_dir($folder)) {
      foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($folder)) as $entry) {
        if (!$entry->isFile()) continue;
        $Fname = smartFilePath($entry->getPathname());
        $notIndex = $entry->isFile() && $entry->isWritable() && !preg_match('/index\.json$/s', $Fname);
        //$jsoncfg[] = [$Fname, $entry, $notIndex];
        if ($notIndex) {
          delfile($Fname);
        }
      }
      //dimas::getInstance()->dump($jsoncfg);
      //exit;
    }
    cook('cleanup', true, 86400);
  }
}


function rsearch($folder, $pattern)
{
  $dir = new RecursiveDirectoryIterator($folder);
  $ite = new RecursiveIteratorIterator($dir);
  $files = new RegexIterator($ite, $pattern, RegexIterator::GET_MATCH);
  $fileList = array();
  foreach ($files as $file) {
    $fileList = array_merge($fileList, $file);
  }
  return $fileList;
}

function deleteDirectory($dir)
{
  if (!file_exists($dir)) {
    return;
  }

  if (!is_dir($dir)) {
    return unlink($dir);
  }

  foreach (scandir($dir) as $item) {
    if ($item == '.' || $item == '..') {
      continue;
    }

    if (!deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
      return false;
    }
  }

  return rmdir($dir);
}
