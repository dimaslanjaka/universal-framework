<?php

$var = $_SESSION['var'];
if (!isset($var['title']) && !isset($var['content'])) {
  echo 'title/content required';

  return;
}

//$content = $var['content'];

$canonical = isset($var['canonical']) ? $var['canonical'] : (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . strtok($_SERVER['REQUEST_URI'], '?');
if (!isset($desc)) {
  $desc = isset($var['desc']) ? $var['desc'] : '';
}
if (!isset($fbcomment)) {
  $fbcomment = isset($var['fbcomment']) ? true : false;
}
if (!isset($title)) {
  $title = $var['title'];
}
if (!isset($share)) {
  $share = isset($var['share']) ? true : false;
}
if (!defined('ENVIRONMENT')) {
  e([
    'error' => true,
    'message' => 'framework environtment doesnt exists',
    'current' => __FILE__
  ]);
}
?>
<!DOCTYPE html>
<html lang="en" class="full-height" manifest="framework.appcache" environtment="<?= ENVIRONMENT ?>" cache="<?= CONFIG['cache']['key'] ?>">

<head>
  <?php
  include __DIR__ . '/meta.php';
  ?>
  <!-- Font Awesome -->
  <link rel="stylesheet" href="/assets/css/all.min.css">
  <!-- Bootstrap core CSS -->
  <link href="<?= get_urlpath(__DIR__ . '/core/css/bootstrap.min.css'); ?>" rel="stylesheet">
  <!-- Material Design Bootstrap -->
  <link href="<?= get_urlpath(__DIR__ . '/core/css/mdb.min.css'); ?>" rel="stylesheet">
  <!-- Your custom styles (optional) -->
  <link rel="stylesheet" href="<?= get_urlpath(__DIR__ . '/css/style.min.css'); ?>">
  <link href="<?= get_urlpath(__DIR__ . '/core/css/style.min.css'); ?>" rel="stylesheet">
</head>

<?php include __DIR__ . '/body.php'; ?>

</html>