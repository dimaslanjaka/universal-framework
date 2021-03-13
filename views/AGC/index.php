<?php
$gClient = google_client();
?>
<div id="myCarousel" class="carousel slide" data-pause="false">
  <!--data-ride="carousel"-->
  <ol class="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <!-- data-interval="6000" milliseconds NOT seconds! -->
    <div class="carousel-item active" data-interval="6000">
      <img class="first-slide" src="https://about.unimelb.edu.au/__data/assets/image/0034/79846/varieties/large.jpg" alt="First slide">
      <div class="container">
        <div class="carousel-caption d-none d-md-block text-left">
          <h1>TRANSLATION</h1>
          <p>Auto generated contents with different languages.</p>
          <p><a class="btn btn-lg btn-primary" href="/AGC/login" role="button">Sign up today</a></p>
        </div>
      </div>
    </div>
    <div class="carousel-item" data-interval="12000">
      <img class="second-slide" src="https://about.unimelb.edu.au/__data/assets/image/0034/79846/varieties/large.jpg" alt="Second slide">
      <div class="container">
        <div class="carousel-caption d-none d-md-block">
          <h1>FLEXIBLE</h1>
          <p>Super flexible just pick articles with your blog niche.</p>
          <p><a class="btn btn-lg btn-primary" href="/AGC/tutorial" role="button">Learn more</a></p>
        </div>
      </div>
    </div>
    <div class="carousel-item" data-interval="24000">
      <img class="third-slide" src="https://about.unimelb.edu.au/__data/assets/image/0034/79846/varieties/large.jpg" alt="Third slide">
      <div class="container">
        <div class="carousel-caption d-none d-md-block text-right">
          <h1>INSTANT</h1>
          <p>Just one click to create articles instantly.</p>
          <p><a class="btn btn-lg btn-primary" href="/AGC/lists" role="button">Browse AGC</a></p>
        </div>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
<hr class="hr-text" data-content="HOW TO ACCESS AGC">
<div class="row mt-2">
  <div class="col">
    <div>
      <span>
        <script src="https://apis.google.com/js/platform.js"></script>
      </span>
    </div>
    <div>
      <span style="font-size:16px;">Subscribe First</span>
    </div>
    <div>
      <span>
        <div class="g-ytsubscribe" data-channelid="UCGNaoefvJRfd15fo-LQ0zvg" data-count="default" data-layout="full">
        </div>
      </span>
    </div>
    <div>
      <span><iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" frameborder="0" height="200" src="https://www.youtube.com/embed/_A0luuPK63g?rel=0&amp;autoplay=0" width="200"></iframe></span>
    </div>
  </div>
  <div class="col d-none d-lg-block">
    <img src="/assets/img/right-arrow.png" alt="next" width="50" height="50%" style="margin:auto">
  </div>
  <div class="col-md-4">
    <span style="font-size:16px;">Sign in to verify has subscribed</span>
    <a href="<?= (isset($gClient) ? $gClient->auth_url() : '/'); ?>"><img src="https://m.alfascorpii.co.id/web_lib/img/gmail_login.png" alt="Login Using Google" width="100%" height="30%" /></a>
  </div>
  <div class="col d-none d-lg-block">
    <img src="/assets/img/right-arrow.png" alt="next" width="50" height="50%" style="margin:auto">
  </div>
  <div class="col-md-4">
    <span style="font-size:16px;">Create Articles</span>
    <a href="/AGC/lists"><img src="https://cdn4.iconfinder.com/data/icons/seo-and-web-glyph-3/64/seo-and-web-glyph-3-04-512.png" alt="next" width="100%" height="50%" style="margin:auto"></a>
  </div>
</div>




<!-- alerts are for fun of it -->
<div class="alerts-container">

  <div class="row">
    <div id="timed-alert" class="alert alert-info animated tada" role="alert">
      <span id="time"></span>
    </div>
  </div>

</div>