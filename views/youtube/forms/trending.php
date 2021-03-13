<?php

//https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=IN&maxResults=25&key=AIzaSyDnemEYJkjnqgXlXOTbB71I2SBO8O5OIDY
if (isset($subrequest[2])) {
  $id = $VID = $subrequest[2];
}
$cfg_detail = $core->folder($_SERVER['DOCUMENT_ROOT'] . '/assets/config/youtube/trending') . '/' . (isset($id) ? $id : date('d')) . '.json';

if (file_exists($cfg_detail)) {
  $timest = strtotime('+3 days', filectime($cfg_detail));
  $days_ago = date('Y-m-d', $timest);
  $date_expired = $days_ago < date('Y-m-d');
}

if (!file_exists($cfg_detail) || $date_expired) {
  $k = GOOGLE_CLIENT_KEY;
  $arr = [
    'part' => 'id,snippet,statistics,contentDetails',
    'key' => $k,
    'regionCode' => country_code($id),
    'chart' => 'mostPopular',
    'maxResults' => (get_option('yt-trending-max') ? get_option('yt-trending-max') : 10),
  ];
  $vid = 'https://www.googleapis.com/youtube/v3/videos?' . http_build_query($arr);
  $re = home_url(add_query_arg([$_GET], $wp->request)) . '/' . http_build_query($arr);
  $json = api_($vid, $re);
} else {
  $json = json_decode(file_get_contents($cfg_detail));
}

foreach ($json->items as $j) {
  $view = $j->statistics->viewCount;
  if (!isset($j->charts)) {
    $charts = ['view' => $view, 'view_length' => strlen($view), 'dataChart' => [1], 'dataChartCount' => null];
    for ($i = 1; $i < date('t'); ++$i) {
      $rand = mt_rand(1, $view);
      $charts['dataChart'][] = ($rand > 1000 ? $rand % 100 : $rand);
    }
    sort($charts['dataChart']);
    $charts['dataChartCount'] = range(1, count($charts['dataChart']));
    $charts['createdAt'] = date('Y/m/d H:i:s');
    $j->charts = $charts;
  }
}

if ($core->isDump()) {
  $core->dump($json);
}

if (!isset($json->title)) {
  $json->title = 'Trending in ' . country_name($id);
}

$site_title = $json->title;
$site_description = $json->desc = "Popular videos in $site_title";
$site_img_svg = $json->svg = 'https://lipis.github.io/flag-icon-css/flags/4x3/' . (2 == strlen($id) ? strtolower($id) : 'id') . '.svg';
$site_img = $json->png = '/assets/img/countries/flags/' . (2 == strlen($id) ? strtolower($id) : 'id') . '.png';
if (!file_exists($cfg_detail) && (is_array($json) || is_object($json))) {
  file_put_contents($cfg_detail, $core->cj($json));
}
if ((isset($id) && !empty($id) && 2 == strlen($id)) && (!empty($json) && (isset($json->items) && count($json->items) > 1))) {
  $core->sitemap('youtube');
}
