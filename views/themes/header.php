<?php
$GOOGLE = json_decode(file_get_contents(realpath(ROOT . '/config/google.json')));
$site_title = isset($title) && !empty($title) ? $title : get_bloginfo('name');
$site_title = preg_replace('/[^A-Za-z0-9\s]/m', ' ', $site_title);
$site_title = preg_replace('/\s+/', ' ', $site_title);
$site_desc = isset($description) && !empty($description) ? $description : get_bloginfo('description');
$site_desc = preg_replace('/[\<\>\<\-\=\"\']/m', ' ', $site_desc);
$site_desc = preg_replace('/\s+/', ' ', $site_desc);
$site_img = isset($thumb) && !empty($thumb) ? $thumb : (get_site_icon_url() ? get_site_icon_url() : 'https://res.cloudinary.com/dimaslanjaka/image/fetch/https://imgdb.net/images/3600.jpg');
$email = get_option('admin_mail') ? get_option('admin_mail') : get_bloginfo('admin_email');
$twitter = get_option('admin_twitter') ? get_option('admin_twitter') : $email;
$site_admin = get_option('admin_fullname') ? get_option('admin_fullname') : $email;

if (is_user_logged_in()) {
  $_SESSION['allowed_shrink'] = 1;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <?php
  do_action('wp_meta_tag');
  ?>
  <title>
    <?= $site_title; ?>
  </title>

  <!-- vendor css -->
  <link href="/assets/components/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/4.5.6/css/ionicons.min.css" rel="stylesheet">
  <link href="/assets/components/typicons.font/src/font/typicons.css" rel="stylesheet">
  <link href="/assets/components/flag-icon-css/css/flag-icon.min.css" rel="stylesheet">
  <link rel="stylesheet" href="/assets/components/datatables.net-dt/css/jquery.dataTables.min.css">
  <link rel="stylesheet" href="/assets/components/datatables.net-responsive-dt/css/responsive.dataTables.min.css">
  <link rel="stylesheet" href="/assets/components/select2/dist/css/select2.min.css">

  <!-- style -->
  <style>
    pre {
      white-space: pre-wrap;
      /* Since CSS 2.1 */
      white-space: -moz-pre-wrap;
      /* Mozilla, since 1999 */
      white-space: -pre-wrap;
      /* Opera 4-6 */
      white-space: -o-pre-wrap;
      /* Opera 7 */
      word-wrap: break-word;
      /* Internet Explorer 5.5+ */
      max-width: 100%;
    }
  </style>
  <?php
  if (isset($style) && !empty($style)) {
    echo '<style>';
    if (!is_array($style)) {
      if (file_exists($style)) {
        //echo '<link rel="stylesheet" href="' . $core->path_to_url($style) . '">';
        include $style;
      }
    } else {
      foreach (array_filter($style) as $css) {
        if (file_exists($css)) {
          //echo '<link rel="stylesheet" href="' . $core->path_to_url($css) . '">';
          include $css;
        }
      }
    }
    echo '</style>';
  }
  ?>

</head>

<body class="az-body">