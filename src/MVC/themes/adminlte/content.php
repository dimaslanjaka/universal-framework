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
<html>

<head>
  <?php include __DIR__ . '/meta.php'; ?>
  <!-- Font Awesome -->
  <link rel="stylesheet" href="/assets/css/all.min.css" />
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
  <!-- Tempusdominus Bbootstrap 4 -->
  <link rel="stylesheet" href="<?= get_urlpath(__DIR__ . '/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css') ?>" />
  <!-- iCheck -->
  <link rel="stylesheet" href="<?= get_urlpath(__DIR__ . '/plugins/icheck-bootstrap/icheck-bootstrap.min.css') ?>" />
  <!-- JQVMap -->
  <link rel="stylesheet" href="<?= get_urlpath(__DIR__ . '/plugins/jqvmap/jqvmap.min.css') ?>" />
  <!-- Theme style -->
  <link rel="stylesheet" href="<?= get_urlpath(__DIR__ . '/css/adminlte.min.css') ?>" />
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="<?= get_urlpath(__DIR__ . '/plugins/overlayScrollbars/css/OverlayScrollbars.min.css') ?>" />
  <!-- Daterange picker -->
  <link rel="stylesheet" href="<?= get_urlpath(__DIR__ . '/plugins/daterangepicker/daterangepicker.css') ?>" />
  <!-- summernote -->
  <link rel="stylesheet" href="<?= get_urlpath(__DIR__ . '/plugins/summernote/summernote-bs4.css') ?>" />
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet" />
</head>

<body class="hold-transition sidebar-mini layout-fixed">
  <div class="wrapper">
    <?php include __DIR__ . '/menu.php'; ?>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Dashboard</h1>
            </div>
            <!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active">Dashboard v1</li>
              </ol>
            </div>
            <!-- /.col -->
          </div>
          <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <?php
          if (isset($content) && file_exists($content)) {
            include $content;
          } else {
            echo '404';
          }
          ?>
        </div>
      </section>
    </div>

    <footer class="main-footer">
      <strong>Copyright &copy; 2014-2019
        <a href="http://adminlte.io">AdminLTE.io</a>.</strong>
      All rights reserved.
      <div class="float-right d-none d-sm-inline-block">
        <b>Version</b> 3.0.5
      </div>
    </footer>

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Control sidebar content goes here -->
    </aside>
  </div>

  <!-- jQuery -->
  <script src="<?= get_urlpath(__DIR__ . '/plugins/jquery/jquery.min.js') ?>"></script>
  <!-- jQuery UI 1.11.4 -->
  <script src="<?= get_urlpath(__DIR__ . '/plugins/jquery-ui/jquery-ui.min.js') ?>"></script>
  <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
  <script>
    $.widget.bridge("uibutton", $.ui.button);
  </script>
  <!-- Bootstrap 4 -->
  <script src="<?= get_urlpath(__DIR__ . '/plugins/bootstrap/js/bootstrap.bundle.min.js') ?>"></script>
  <!-- ChartJS -->
  <script src="<?= get_urlpath(__DIR__ . '/plugins/chart.js/Chart.min.js') ?>"></script>
  <!-- Sparkline -->
  <script src="<?= get_urlpath(__DIR__ . '/plugins/sparklines/sparkline.js') ?>"></script>
  <!-- JQVMap <script src="<?= get_urlpath(__DIR__ . '/plugins/jqvmap/jquery.vmap.min.js') ?>"></script>
  <script src="<?= get_urlpath(__DIR__ . '/plugins/jqvmap/maps/jquery.vmap.usa.js') ?>"></script>-->

  <!-- jQuery Knob Chart -->
  <script src="<?= get_urlpath(__DIR__ . '/plugins/jquery-knob/jquery.knob.min.js') ?>"></script>
  <!-- daterangepicker -->
  <script src="<?= get_urlpath(__DIR__ . '/plugins/moment/moment.min.js') ?>"></script>
  <script src="<?= get_urlpath(__DIR__ . '/plugins/daterangepicker/daterangepicker.js') ?>"></script>
  <!-- Tempusdominus Bootstrap 4 -->
  <script src="<?= get_urlpath(__DIR__ . '/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js') ?>"></script>
  <!-- Summernote -->
  <script src="<?= get_urlpath(__DIR__ . '/plugins/summernote/summernote-bs4.min.js') ?>"></script>
  <!-- overlayScrollbars -->
  <script src="<?= get_urlpath(__DIR__ . '/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js') ?>"></script>
  <!-- AdminLTE App -->
  <script src="<?= get_urlpath(__DIR__ . '/js/adminlte.min.js') ?>"></script>
  <!-- AdminLTE dashboard demo (This is only for demo purposes) <script src="<?= get_urlpath(__DIR__ . '/js/pages/dashboard.js') ?>"></script> -->

  <!-- AdminLTE for demo purposes -->
  <!--<script src="<?= get_urlpath(__DIR__ . '/js/demo.js') ?>"></script>-->
  <?php include __DIR__ . '/script.php' ?>
</body>