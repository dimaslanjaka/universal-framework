<body class="az-body az-dashboard-eight" itemscope="" itemtype="http://schema.org/WebPage">
  <a itemprop="license" rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/us/deed.en_US" class="d-none"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/CC-BY-NC-SA.svg/1280px-CC-BY-NC-SA.svg.png" alt="Creative Commons logo with terms BY-NC-SA." /></a>
  <?php
  include __DIR__ . '/header-nav.php';
  include __DIR__ . '/navbar.php';
  ?>

  <div class="az-content az-content-dashboard-eight">
    <div class="container d-block" id="<?= uniqid('body_C') ?>">
      <?php
      /**
       * breadcrumbs
       */
      $bread = array_unique(explode('/', router::i()->request));
      $breadh = '<nav aria-label="breadcrumb" class="d-none d-lg-block d-xl-block">
      <ol class="breadcrumb" vocab="http://schema.org/" typeof="BreadcrumbList">';
      $count_b = '/';
      foreach ($bread as $index => $brc) {
        $count_b .= $brc;
        $breadcrumb_file = ROOT . '/views' . $count_b;
        $hrefb = file_exists($breadcrumb_file) || file_exists($breadcrumb_file . '.php') ? $count_b : false;
        if (!$hrefb) {
          continue;
        }
        if ($index != count($bread) - 1) {
          $count_b .= '/';

          $breadh .= '<li class="breadcrumb-item" property="itemListElement" typeof="ListItem"><a href="' . $hrefb . '" property="item" typeof="WebPage"><span property="name">' . $brc . '</span></a><meta property="position" content="' . $index . '"></li>';
        } else {
          $breadh .= '<li class="breadcrumb-item active" aria-current="page" property="itemListElement" typeof="ListItem"><a href="' . $hrefb . '" property="item" typeof="WebPage"><span property="name">' . $brc . '</span></a><meta property="position" content="' . $index . '"></li>';
        }
      }
      $breadh .= '</ol>
      </nav>';
      echo $breadh;
      ?>
      <div class="d-none">
        <h1 itemprop="name"><?= $site_title ?></h1>
      </div>
      <div itemprop="description">
        <?php
        if (file_exists($content)) {
          include $content;
        } else {
          include dimas::i()->root_view . '/404.php';
        }
        ?>
      </div>
      <div class="d-none" itemprop="publisher" itemscope="" itemtype="http://schema.org/Person"><span itemprop="name">Dimas Lanjaka</span></div>
      <?php
      if (isset($site_img) && isset($site_title)) {
        echo '<img class="d-none" itemprop="image" src="' . $site_img . '" alt="cover art: ' . $site_title . '" />';
      }
      ?>
    </div><!-- container -->
  </div><!-- az-content -->