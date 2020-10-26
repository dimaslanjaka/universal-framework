<!doctype html>
<html lang="en">

<head>
  <?php include __DIR__ . '/meta.php'; ?>

  <title>{title}</title>

  <!-- Icons for this template -->
  <link href="/theme/bootstrap/dist/assets/fonts/font-awesome/css/all.min.css" rel="stylesheet" type="text/css">
  <!-- Stylesheet -->
  <!-- build:css -->
  <link href="/theme/bootstrap/assets/css/app.css" rel="stylesheet">
  <!-- endbuild -->
  <style>
    /*css*/
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
        <li class="nav-item active">
          <a class="nav-link" href="#">Group</a>
        </li>
      </ul>
    </div>
  </nav>

  <main role="main" class="container">
    {content}
  </main>

  <!-- Bootstrap core JavaScript
================================================== -->
  <!-- Placed at the end of the document so the pages load faster -->
  <script src="/theme/bootstrap/dist/assets/js/vendor/jquery.slim.min.js"></script>
  <script src="/theme/bootstrap/dist/assets/js/vendor/popper.min.js"></script>
  <script src="/theme/bootstrap/assets/js/vendor/bootstrap.min.js"></script>
  <!-- build:js -->
  <script src="/theme/bootstrap/assets/js/app.js"></script>
  <!-- endbuild -->
  <script>
    /*js*/
  </script>
</body>

</html>