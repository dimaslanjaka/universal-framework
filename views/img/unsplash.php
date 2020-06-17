<?php

$saved = ROOT . '/tmp/saved.json';
$res = read_file($saved, []);
if (is_string($res)) {
  $res = json_decode($res, true);
}

$api = new \Extender\request('https://unsplash.it');

if (isset($_REQUEST['url'])) {
  $api->setUrl(urldecode(trim($_REQUEST['url'])));
} else if (isset($_REQUEST['label'])) {
  $api->setUrl('https://source.unsplash.com/1600x900/?' . $_REQUEST['label']);
  exit;
}

$url = $api->url;
$cache = ROOT . '/tmp/img/' . md5($url);
if (file_exists($cache) && !headers_sent()) {
  header_remove('x-powered-by');
  header_remove('pragma');
  send_cache_header($cache);
  $lastModified = gmdate('D, d M Y H:i:s', filemtime($cache)) . ' GMT';
  header("Cache-Control: private");
  header("Content-type: image/jpeg");
  header("ETag: " . md5_file($cache));
  header("Last-Modified: $lastModified");
  // 1 day expires
  header('Expires: ' . gmdate("D, d M Y H:i:s", ((60 * 60 * 24 * 1) + strtotime($lastModified))));
}

if (!isset($res[$url])) {
  $api->set_method('get');
  $api->exec();
  for ($i = 0; $i < 2; ++$i) {
    if (isset($api->responseHeaders['Location'])) {
      $api->get($api->responseHeaders['Location']);
    } else {
      break;
    }
  }
  $res[$url] = $api->url;
  write_file($saved, $res, true);
  write_file($cache, $api->response, true);
  header('Content-Type: ' . $api->responseHeaders['Content-Type'], true);
  echo $api->response;
} else if (file_exists($cache)) {
  header('Content-Type: ' . mime_content_type($cache), true);
  echo read_file($cache);
} else {
  $api->set_url($res[$url])->set_method('get')->exec();
  writeCache();
}

function writeCache()
{
  global $res, $url, $saved, $cache, $api;
  $res[$url] = $api->url;
  write_file($saved, $res, true);
  write_file($cache, $api->response, true);
  header('Content-Type: ' . $api->responseHeaders['Content-Type'], true);
  echo $api->response;
}

function send_cache_header($cache_file_name, $check_request = false)
{
  if (headers_sent()) {
    return;
  }
  $mtime = @filemtime($cache_file_name);

  if ($mtime > 0) {
    $gmt_mtime = gmdate('D, d M Y H:i:s', $mtime) . ' GMT';
    $etag = sprintf('%08x-%08x', crc32($cache_file_name), $mtime);

    header('ETag: "' . $etag . '"', true);
    header('Last-Modified: ' . $gmt_mtime, true);
    header('Cache-Control: private', true);
    // we don't send an "Expires:" header to make clients/browsers use if-modified-since and/or if-none-match

    if ($check_request) {
      if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && !empty($_SERVER['HTTP_IF_NONE_MATCH'])) {
        $tmp = explode(';', $_SERVER['HTTP_IF_NONE_MATCH']); // IE fix!
        if (!empty($tmp[0]) && strtotime($tmp[0]) == strtotime($gmt_mtime)) {
          header('HTTP/1.1 304 Not Modified');

          return false;
        }
      }

      if (isset($_SERVER['HTTP_IF_NONE_MATCH'])) {
        if (str_replace(['\"', '"'], '', $_SERVER['HTTP_IF_NONE_MATCH']) == $etag) {
          header('HTTP/1.1 304 Not Modified');

          return false;
        }
      }
    }
  }

  return true;
}
