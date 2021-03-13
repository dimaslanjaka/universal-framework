<?php

if (isset($_POST['html'])) {
  $html = trim(stripslashes($_POST['html']));
  $html = str_get_html(htmlspecialchars_decode(utf8_decode(html_entity_decode($html))));
  foreach ($html->find('a') as $tag) {
    if (false !== strpos($tag->href, 'site-download.html')) {
      $p = parse_url($tag->href);
      if (!isset($p['scheme']) && !isset($p['host'])) {
        $p['scheme'] = 'http';
        $p['host'] = 'filelagu45.wapska.com';
        $list = __DIR__ . '../../filelagu45.txt';
        if (file_exists($list)) {
          $log = file_get_contents($list);
        } else {
          $log = '';
        }
        $url = $core->build_url($p);
        if (false === strpos($log, $url)) {
          $inner = str_get_html($tag->innertext);
          file_put_contents($list, $url . '```' . $inner->find('h3', 0)->innertext . "\n", FILE_APPEND . PHP_EOL);
        }
      }
    }
  }
}
