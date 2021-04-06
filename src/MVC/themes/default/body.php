<body>

  <!--Main Navigation-->
  <header>
    <!--div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">Company name</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="#">Features</a>
        <a class="p-2 text-dark" href="#">Enterprise</a>
        <a class="p-2 text-dark" href="#">Support</a>
        <a class="p-2 text-dark" href="#">Pricing</a>
      </nav>
      <a class="btn btn-outline-primary" href="#">Sign up</a>
    </div-->
    <!--Navbar-->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar" role="navigation">
      <div class="container">
        <a class="navbar-brand" href="/" title="Universal Framework"><strong>UF</strong></a>
        <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/auth/google">Google Auth</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/blogger">Blogger</a>
            </li>
          </ul>
          <form class="form-inline">
            <div class="md-form my-0">
              <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
            </div>
          </form>
        </div>
      </div>
    </nav>
  </header>
  <!--Main Navigation-->

  <?php
  if (isset($content) && file_exists($content)) {
    include $content;
  } else {
    echo '404';
  }
  ?>

  <section>
    <?php
    if (is_admin()) {
      include __DIR__ . '/../meta-editor.php';
    }
    ?>
  </section>
</body>