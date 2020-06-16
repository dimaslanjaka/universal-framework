<?php
$scan = \Filemanager\scan::scandir(ROOT . '/src/Telkomsel/cookie/dimaslanjaka');
$result = [];
for ($i = 0; $i < count($scan); $i++) {
  $data = (array) $scan[$i];
  $msisdn = str_replace(['.txt'], [''], $data['filename']);

  if (strlen($msisdn) < 10) {
    unlink($data['path']);
    continue;
  }

  $result[] = ['msisdn' => $msisdn, 'location' => normalize_path($data['path']), 'size' => filesize(normalize_path($data['path'])), 'modified' => date('d-m-Y H:i:s', filectime(normalize_path($data['path'])))];
}
e($result);
