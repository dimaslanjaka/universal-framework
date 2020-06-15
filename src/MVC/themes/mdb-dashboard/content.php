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
?>
<!DOCTYPE html>
<html lang="en" class="full-height" manifest="framework.appcache">

<head>
  <?php
  include __DIR__ . '/meta.php';
  ?>
  <!-- Font Awesome -->
  <link rel="stylesheet" href="/assets/css/all.css">
  <!-- Bootstrap core CSS -->
  <link href="/assets/mdb-dashboard/css/bootstrap.min.css" rel="stylesheet">
  <!-- Material Design Bootstrap -->
  <link href="/assets/mdb-dashboard/css/mdb.min.css" rel="stylesheet">
  <!-- Your custom styles (optional) -->
  <link rel="stylesheet" href="<?= \MVC\helper::get_url_path(__DIR__ . '/css/style.min.css', true); ?>">
</head>

<body class="fixed-sn mdb-skin">
  <header>
    <?php
    include __DIR__ . '/menu.php';
    ?>
  </header>
  <!-- Main Navigation -->

  <main class="mb-3 mt-0 pt-3">
    <div class="container-fluid mt-5">
      <?php
      if (isset($content) && file_exists($content)) {
        include $content;
      } else {
        echo '404';
      }
      ?>
    </div>
  </main>

  <!-- SCRIPTS -->
  <!-- JQuery -->
  <script type="text/javascript" src="/assets/mdb-dashboard/js/jquery-3.4.1.min.js"></script>
  <!-- Bootstrap tooltips -->
  <script type="text/javascript" src="/assets/mdb-dashboard/js/popper.min.js"></script>
  <!-- Bootstrap core JavaScript -->
  <script type="text/javascript" src="/assets/mdb-dashboard/js/bootstrap.min.js"></script>
  <!-- MDB core JavaScript -->
  <script type="text/javascript" src="/assets/mdb-dashboard/js/mdb.min.js"></script>

  <!-- Custom scripts -->
  <script>
    /** Minify */
    $(document).ready(function() {
      $("#button-collapse").sideNav();
      new WOW().init();
      var target = $(location).attr("hash");
      var offset = ($(this).attr('data-offset') ? $(this).attr('data-offset') : 0);
      if ($(target).length) {
        $('body,html').animate({
          scrollTop: $(target).offset().top - offset
        }, 700);
      }
    });
  </script>

  <?php
  include __DIR__ . '/script.php';
  include __DIR__ . '/../admin.php';
  ?>

</body>

</html>