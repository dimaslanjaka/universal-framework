<body class="az-body az-dashboard-eight">
  <?php
  include __DIR__ . '/header-nav.php';
  include __DIR__ . '/navbar.php';
  ?>

  <div class="az-content az-content-dashboard-eight">
    <div class="container d-block">
      <?php if (file_exists($content)) {
    include $content;
  } else {
    include dimas::i()->root_view . '/404.php';
  } ?>
    </div><!-- container -->
  </div><!-- az-content -->