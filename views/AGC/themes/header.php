<?php

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <?= do_action('wp_meta_tag'); ?>

  <!-- vendor css -->
  <link href="/assets/components/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/4.5.6/css/ionicons.min.css" rel="stylesheet">
  <link href="/assets/components/typicons.font/src/font/typicons.css" rel="stylesheet">

  <!-- azia CSS -->
  <link rel="stylesheet" href="/template/css/azia.css">


  <!-- style -->
  <style>
    .btn,
    button {
      white-space: normal;
      word-wrap: break-word;
      max-width: 100%;
    }

    .modal-body img {
      max-width: 100%;
    }
  </style>
  <?php
  stylesheet($style);
  if (!isset($_COOKIE['ip'])) {
    scriptIP();
  }
  ?>
  <script type="text/javascript">
    var TIMER_START = Date.now();
    <?php include __DIR__ . '/js/ajax.js'; ?>
  </script>
</head>