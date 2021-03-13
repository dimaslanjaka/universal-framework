<?php

if ('POST' == $_SERVER['REQUEST_METHOD']) {
  $core->hj();
  $ytid = (isset($_POST['id']) && !empty($_POST['id']) ? trim(urldecode($_POST['id'])) : false);
  $vtitle = (isset($_POST['title']) && !empty($_POST['title']) ? trim(urldecode($_POST['title'])) : false);
  //$bytes >= 1048576
  if ($ytid && $vtitle) {
    $checkFile = false;
    $dir = $_SERVER['DOCUMENT_ROOT'] . '/tmp/';
    $fileMp3 = $dir . trim($vtitle) . '.mp3';
    $infofile = $dir . $ytid . '.json';
    if (!file_exists($infofile)) {
      file_put_contents($infofile, dimas::i()->cj(['title' => $vtitle]));
      $checkFile = true;
    } else {
      $J = file_get_contents($infofile);
      $desc = json_decode($J);
      if (isset($_REQUEST['check']) && false !== strpos($j, 'drive.google.com')) {
        echo json_encode(['success' => 'file was uploaded', 'uploaded' => true]);
        exit;
      }
      if (file_exists($fileMp3)) {
        $sz = filesize($fileMp3);
        if ($sz <= 10) {
          $checkFile = true;
        }
      } else {
        $checkFile = true;
      }
    }

    if ($checkFile) {
      $c = str_replace(['Deletingoriginal file ', 'Deleting original file', ' (pass -k to keep)'], ['', ''], exec('youtube-dl --no-playlist --ignore-config --write-info-json --extract-audio --audio-format mp3 --audio-quality 320K --cookies=D:/agcontents/tmp/cookie.txt --cache-dir=D:/agcontents/tmp/ --output="D:/agcontents/tmp/' . $vtitle . '.%(ext)s" "https://www.youtube.com/watch?v=' . $ytid . '"')); //--audio-quality 0 (better)
      $core->dump(['file' => trim($c), 'id' => $ytid, 'success' => true]);
    } else {
      $o = ['file' => $fileMp3, 'info' => $infofile, 'id' => $ytid, 'desc' => $desc];
      if (file_exists($fileMp3)) {
        $sz = filesize($fileMp3);
        if ($sz >= 11) {
          $o['success'] = true;
        }
      }
      $core->dump($o);
    }
  }
  exit;
}
