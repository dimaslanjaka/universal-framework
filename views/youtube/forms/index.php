<?php

$cfg_detail = $core->folder($_SERVER['DOCUMENT_ROOT'] . '/assets/config/youtube/trending') . '/index.json';
if (file_exists($cfg_detail)) {
  $timest = strtotime('+1 days', filectime($cfg_detail));
  $days_ago = date('Y-m-d', $timest);
}
$date_expired = (isset($days_ago) ? $days_ago < date('Y-m-d') : null);
if (!file_exists($cfg_detail) || $date_expired) {
  $arr = [
    'part' => 'id,snippet',
    'key' => GOOGLE_CLIENT_KEY,
    'topicId' => '/m/04rlf',
    'maxResults' => (get_option('yt-trending-max') ? get_option('yt-trending-max') : 10),
  ];
  $vid = 'https://www.googleapis.com/youtube/v3/search?' . http_build_query($arr);
  $re = get_home_url(); //home_url(add_query_arg([$_GET], $wp->request)) . '/' . http_build_query($arr);
  $json = api_($vid, $re);
} else {
  $json = json_decode(file_get_contents($cfg_detail));
  if (isset($json->error)) {
    unlink($cfg_detail);
    $I = ROOT . '/assets/config/youtube/trending/ID.json';
    if (file_exists($I)) {
      $json = json_decode(file_get_contents($I));
    }
  }
}

if (!isset($json->title)) {
  $json->title = 'trending music ' . date('d M Y');
  $json->desc = $json->title;
}
$site_title = $json->title;
$site_desc = $json->desc;
if (!file_exists($cfg_detail) || $date_expired) {
  file_put_contents($cfg_detail, $core->cj($json));
}

//$core->dump($json);
