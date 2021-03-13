<?php

$_SESSION['title'] = 'AGC List';
$jsc = [];
$dirpath = ROOT . '/views/AGC/saved';
if (isreq('niche')) {
  $niche = isreq('niche');
  $folder = "$dirpath/$niche";
  if (file_exists($folder)) {
    foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($folder)) as $entry) {
      if ($entry->isFile() && preg_match('/index\.json$/m', $entry)) {
        if ($entry->isWritable()) {
          $json = json_decode(file_get_contents($entry));
          foreach ($json as $key => $value) {
            if (isreq('hash') && $_SERVER['REQUEST_METHOD'] == 'POST') {
              if ($key == isreq('hash')) {
                $core->dump($value);
              }
            }
            foreach ($value as $key2 => $value2) {
              if (is_bool($value->$key2) === false && $key2 != 'innertext' && $key2 != 'source_lang' && $key2 != 'type') {
                $value->$key2 = CryptoE('agc', $value2);
              }
            }
            if ($value->type == 'post' && $value->sent === false) {
              $jsc[] = '<li><a href="#" data-src="' . $value->source_lang . '" data-hash="' . $key . '" data-href="' . $value->href . '" data-salt="' . CryptoSALT() . '" data-niche="' . $niche . '" data-iv="' . CryptoIV() . '" data-controller="Modal">' . $value->innertext . '</a></li>';
            }
          }
        }
      }
    }
  }
}
