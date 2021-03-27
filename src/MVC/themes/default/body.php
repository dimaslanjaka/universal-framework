<body>

  <!--Main Navigation-->
  <header>

    <!--Navbar-->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
      <div class="container">
        <a class="navbar-brand" href="#"><strong>MDB</strong></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-7" aria-controls="navbarSupportedContent-7" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent-7">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Profile</a>
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

    <!-- Intro Section -->
    <div class="view jarallax" data-jarallax='{"speed": 0.2}' style="background-image: url('https://mdbootstrap.com/img/Photos/Others/gradient2.png'); background-repeat: no-repeat; background-size: cover; background-position: center center;">
      <div class="mask rgba-purple-slight">
        <div class="container h-100 d-flex justify-content-center align-items-center">
          <div class="row pt-5 mt-3">
            <div class="col-md-12 wow fadeIn mb-3">
              <div class="text-center">
                <h1 class="display-4 font-weight-bold mb-5 wow fadeInUp">Our New Course is Ready</h1>
                </li>
                <h5 class="mb-5 wow fadeInUp" data-wow-delay="0.2s">It comes with a lot of new features, easy to follow
                  videos and images. Check it out now!</h5>
                <div class="wow fadeInUp" data-wow-delay="0.4s">
                  <a class="btn btn-purple btn-rounded"><i class="fas fa-user left"></i> Sign up!</a>
                  <a class="btn btn-outline-purple btn-rounded"><i class="fas fa-book left"></i> Learn more</a>
                </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </header>
  <!--Main Navigation-->

  <?php
  if (isset($content) && file_exists($content)) {
    include $content;
  } else {
    echo '404';
  }
  ?>
</body>