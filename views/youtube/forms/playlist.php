<?php

if (isset($_REQUEST['url'])) {
  $id = parse_url($_REQUEST['url']);
  $get_string = $id['query'];
  parse_str($get_string, $id);
  $id = $VID = $id['v'];
} elseif (isset($subrequest[2])) {
  $id = $VID = $subrequest[2];
} elseif ('youtube' == $groot) {
  $id = $VID = $subrequest[1];
}

if (!isset($id) || empty($id)) {
  if ('youtube' != $groot) {
    $core->header_redirect('/youtube/index');
    exit;
  }
}

$cfg_detail = $core->folder($_SERVER['DOCUMENT_ROOT'] . '/assets/config/youtube/playlist') . '/' . $id . '.json';
if (file_exists($cfg_detail)) {
  $timest = strtotime('+30 days', filectime($cfg_detail));
  $days_ago = date('Y-m-d', $timest);
  $date_expired = $days_ago < date('Y-m-d');
}

$k = (get_option('google_key') ? get_option('google_key') : GOOGLE_CLIENT_KEY);
$arr = [
  'part' => 'id,snippet,contentDetails',
  'playlistId' => $id,
  'status' => 2,
  'hl' => 'en',
  'key' => $k,
  'maxResults' => 50,
];
$vid = 'https://www.googleapis.com/youtube/v3/playlistItems/?' . http_build_query($arr);
$re = home_url(add_query_arg([$_GET], $wp->request)) . '/' . http_build_query($arr);

if (!file_exists($cfg_detail) || $date_expired) {
  $json = api_($vid, $re);
} else {
  $json = json_decode(file_get_contents($cfg_detail));
}
if (empty($json) || !isset($json->items[0])) {
  $json = api_($vid, $re);
  $date_expired = true;
}

if (!file_exists($cfg_detail) || $date_expired) {
  file_put_contents($cfg_detail, $core->cj($json));
}

$r = [];
//$json = api_($vid, $re);
foreach ($json->items as $v) {
  $r[] = $v;
}
if (isset($json->nextPageToken)) {
  $arr['pageToken'] = $json->nextPageToken;
  $vid = 'https://www.googleapis.com/youtube/v3/playlistItems/?' . http_build_query($arr);
  $json = api_($vid, $re);
  foreach ($json->items as $v) {
    $r[] = $v;
  }
  if (isset($json->nextPageToken)) {
    $arr['pageToken'] = $json->nextPageToken;
    $vid = 'https://www.googleapis.com/youtube/v3/playlistItems/?' . http_build_query($arr);
    $json = api_($vid, $re);
    foreach ($json->items as $v) {
      $r[] = $v;
    }
    if (isset($json->nextPageToken)) {
      $arr['pageToken'] = $json->nextPageToken;
      $vid = 'https://www.googleapis.com/youtube/v3/playlistItems/?' . http_build_query($arr);
      $json = api_($vid, $re);
      foreach ($json->items as $v) {
        $r[] = $v;
      }
      if (isset($json->nextPageToken)) {
        $arr['pageToken'] = $json->nextPageToken;
        $vid = 'https://www.googleapis.com/youtube/v3/playlistItems/?' . http_build_query($arr);
        $json = api_($vid, $re);
        foreach ($json->items as $v) {
          $r[] = $v;
        }
      }
    }
  }
}
//$core->vardump($json);
$title = $site_title = 'Playlist';
$description = $site_description = 'Playlist Of ' . (isset($json->items[0]) ? $json->items[0]->snippet->title : false);
