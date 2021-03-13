<div class="container">
  <div class="text-center">
    <h1>AGC BLOGGER</h1>
  </div>
</div>
<div class="container mb-3">
  <div style="margin-left:auto;margin-right:auto">
    <button class="btn btn-primary" id="show-v"><i class="fab fa-youtube"></i> Show Video Login Tutorial</button>
  </div>
  <div id="video-e" class="embed-responsive embed-responsive-16by9">
    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/W1sBB6KlwIU?rel=0" allowfullscreen></iframe>
  </div>
</div>

<center id="loading">
  <div class="lds-dual-ring"></div>
  <pre id="debug"></pre>
</center>
<center id="verification">
  <div id="channels"></div>
  <div class="d-block btn-group">
    <button class="loginBtn loginBtn--youtube d-inline-block"><a href="https://www.youtube.com/channel/UCGNaoefvJRfd15fo-LQ0zvg?view_as=subscriber" target="_blank" class="text-white">Subscribe To Continue</a></button>
    <button id="verify" class="btn btn-success d-inline-block">Verify</a></button>
    <button id="auth" class="btn btn-info d-inline-block">Retry</a></button>
  </div>
</center>
<center>
  <button id="google" class="loginBtn loginBtn--google">
    Login with Google
  </button>
</center>
<center>
  <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  <!-- Text only responsive -->
  <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7975270895217217" data-ad-slot="4894289831" data-ad-format="link" data-full-width-responsive="true"></ins>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</center>
<div class="container">
  <div id="footer">
    <div class="text-center">
      <h2>Script Builded By <a href="//fb.me/dimaslanjaka1" target="_blank">L3n4r0x</a></h2>
    </div>
  </div>
</div>

<script>
  const FOLDER = '/AGC';
  const AUTH_URL = '<?= $gClient->auth_url(); ?>';
  const keys = '<?= GOOGLE_CLIENT_KEY; ?>';
  <?php
  if (isset($_SESSION['subscribed']) && 1 === $_SESSION['subscribed'] && is_user_logged_in()) {
    if (!isset($_GET['redirect'])) {
      ?>
      location.replace('/AGC/lists');
  <?php
    }
  }
  ?>
</script>