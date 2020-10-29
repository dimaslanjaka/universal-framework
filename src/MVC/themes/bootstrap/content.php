<?php
$element = new HTML\element();
?>
<!doctype html>
<html lang="en">

<head>
  <?php include __DIR__ . '/meta.php'; ?>
  <!-- Icons for this template -->
  <!--<link rel="icon" href="<?= path2url(__DIR__ . '/favicon.ico') ?>">-->
  <link href="<?= path2url(__DIR__ . '/fontawesome-5/css/all.css') ?>" rel="stylesheet" type="text/css">
  <!-- Stylesheet -->
  <link href="<?= path2url(__DIR__ . '/bootstrap/dist/css/bootstrap.min.css') ?>" rel="stylesheet">
  <style>
    <?php include __DIR__ . '/custom/custom.min.css' ?>
  </style>
</head>

<body>

  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <a class="navbar-brand" href="#">APOTEK</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Warehouses
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/warehouses">Main</a>
            <a class="dropdown-item" href="/warehouses/login">Login</a>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Product</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/product">Main Products</a>
            <a class="dropdown-item" href="/product/items">Product Items</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="/product/in">Product In</a>
            <a class="dropdown-item" href="/product/out">Product Out</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="/categories">Product Categories</a>
            <a class="dropdown-item" href="/brands">Product Brands</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/producer">Producer</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/consumer">Consumer</a>
        </li>
      </ul>
    </div>
  </nav>

  <main role="main" class="container">
    <?php
    if (isset($content) && file_exists($content)) {
      include $content;
    } else {
      echo '404';
    }
    ?>
  </main>

  <footer class="mt-4 navbar-dark bg-dark">
    <div class="mini-footer">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="copyright-text">
              <p>© <?= date('Y') ?>
                <a href="#">Apotek</a>. All rights reserved. Created by
                <a href="https://web-manajemen.blogspot.com">Dimas Lanjaka</a>
              </p>
            </div>

            <div class="go_top">
              <span class="icon-arrow-up"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Bootstrap core JavaScript
================================================== -->
  <!-- Placed at the end of the document so the pages load faster -->
  <script src="<?= path2url(__DIR__ . '/node_modules/jquery/dist/jquery.min.js') ?>"></script>
  <script src="<?= path2url(__DIR__ . '/bootstrap/dist/js/bootstrap.bundle.js') ?>"></script>
  <?php
  include __DIR__ . '/script.php';
  ?>
</body>

</html>