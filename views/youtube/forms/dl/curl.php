<?php

function curlGet($URL, $type = null)
{
  $ch = curl_init();
  $timeout = 3;
  curl_setopt($ch, CURLOPT_URL, $URL);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
  curl_setopt($ch, CURLOPT_ENCODING, '');
  /* if you want to force to ipv6, uncomment the following line */
  //curl_setopt( $ch , CURLOPT_IPRESOLVE , 'CURLOPT_IPRESOLVE_V6');
  $tmp = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $totalsize = strlen($httpCode);
  $stats = curl_getinfo($ch);

  $size1 = $stats['size_download'];
  $size2 = $stats['download_content_length'];

  if ($size1 > 1 && $size1 > $size2) {
    $downloadSize = $size1;
    $compression = $totalsize / $size1;
  } elseif ($size2 > 1) {
    $downloadSize = $size2;
    $compression = $totalsize / $size2;
  } else {
    $compression = 0;
    $downloadSize = $totalsize;
  }
  if ('size' == $type) {
    return ['compression' => $compression, 'size' => $downloadSize];
  }
  curl_close($ch);

  return $tmp;
}

/*
 * function to use cUrl to get the headers of the file
 */
function get_location($url)
{
  $my_ch = curl_init();
  curl_setopt($my_ch, CURLOPT_URL, $url);
  curl_setopt($my_ch, CURLOPT_HEADER, true);
  curl_setopt($my_ch, CURLOPT_NOBODY, true);
  curl_setopt($my_ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($my_ch, CURLOPT_TIMEOUT, 10);
  $r = curl_exec($my_ch);
  foreach (explode("\n", $r) as $header) {
    if (0 === strpos($header, 'Location: ')) {
      return trim(substr($header, 10));
    }
  }

  return '';
}

function get_size($url)
{
  $my_ch = curl_init();
  curl_setopt($my_ch, CURLOPT_URL, $url);
  curl_setopt($my_ch, CURLOPT_HEADER, true);
  curl_setopt($my_ch, CURLOPT_NOBODY, true);
  curl_setopt($my_ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($my_ch, CURLOPT_TIMEOUT, 10);
  $r = curl_exec($my_ch);
  foreach (explode("\n", $r) as $header) {
    if (0 === strpos($header, 'Content-Length:')) {
      return trim(substr($header, 16));
    }
  }

  return '';
}

function get_description($url)
{
  $my_description = '';
  $fullpage = curlGet($url);
  $dom = new DOMDocument();
  @$dom->loadHTML($fullpage);
  $xpath = new DOMXPath($dom);
  $tags = $xpath->query('//div[@class="info-description-body"]');
  foreach ($tags as $tag) {
    $my_description .= (trim($tag->nodeValue));
  }

  return utf8_decode($my_description);
}
