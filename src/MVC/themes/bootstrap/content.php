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
</head>

<body>

  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <a class="navbar-brand" href="#">APOTEK</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Group</a>
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