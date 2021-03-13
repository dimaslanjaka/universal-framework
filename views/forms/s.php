<?php

$id = isset($subrequest[1]) ? $subrequest[1] : null;
$g = $wpdb->get_row("SELECT * FROM short_url WHERE url = '$id' ");
if (!$id || !$g) {
  $core->header_redirect('/s/404=URL_NOT_FOUND');
  die();
}
$g->site_img = base64_decode($g->site_img);
$g->site_title = base64_decode($g->site_title);
$g->meta_title = base64_decode($g->meta_title);
$g->site_desc = base64_decode($g->site_desc);
$g->meta_description = base64_decode($g->meta_description);
$parse = parse_url($g->location);
$site_title = (!empty(trim($g->meta_title)) ? trim($g->meta_title) : trim($g->site_title));
$site_desc = (!empty(trim($g->meta_description)) ? trim($g->meta_description) : trim($g->site_desc));
$site_img = trim($g->site_img);
define('THEME_HEADER', $_SERVER['DOCUMENT_ROOT'] . '/views/shortlink/themes/header.php');
define('THEME_FOOTER', $_SERVER['DOCUMENT_ROOT'] . '/views/shortlink/themes/footer.php');
define('THEME_CONTENT', $_SERVER['DOCUMENT_ROOT'] . '/views/shortlink/themes/content.php');
