<?php
if (!isset($google)) $google = google_client();
if (!is_user_logged_in()) {
?>
  <div class="az-signin-wrapper">
    <div class="az-card-signin">
      <h1 class="az-logo">A<span>G</span>C</h1>
      <div class="az-signin-header">
        <h2>Welcome back!</h2>
        <h4>Please sign in to continue</h4>
        <form action="/AGC/login" method="POST" id="ajax" class="d-none" disabled>
          <input type="hidden" name="login">
          <div class="form-group">
            <label>Email</label>
            <input type="text" name="email" class="form-control" placeholder="demo@<?= $_SERVER['SERVER_NAME']; ?>">
          </div><!-- form-group -->
          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" class="form-control" placeholder="Enter your password">
          </div><!-- form-group -->
          <button class="btn btn-az-primary btn-block">Sign In</button>
        </form>
        <div class="text-center">
          <a href="<?= $google->auth_url(); ?>" class="icon-button google-plus btn btn-danger" title="login using google"><i class="fab fa-google"></i><span></span></a>
        </div>
        <div class="alert alert-info mt-2" role="alert">
          This authentication using following scopes : <br />
          <?php
          $c = parse_url2($google->auth_url());
          $e = preg_split('/\s/m', $c['query']['scope']);
          foreach ($e as $x) {
            if (strpos($x, 'youtube')) {
              $x .= ' <i class="fab fa-youtube"></i>';
            } else if (strpos($x, 'blogger')) {
              $x .= ' <i class="fab fa-blogger"></i>';
            } else {
              $x .= ' <i class="fas fa-user"></i>';
            }

            echo $x . '<br/>';
          }
          ?>
        </div>
      </div><!-- az-signin-header -->
      <div class="az-signin-footer d-none" aria-disabled="">
        <p><a href="forgot">Forgot password ?</a></p>
        <p>Don't have an account ? <a href="signup">Create an Account</a></p>
      </div><!-- az-signin-footer -->
    </div><!-- az-card-signin -->
  </div><!-- az-signin-wrapper -->
<?php
} else {
?>
  <a href="#" class="icon-button twitter d-none"><i class="fab fa-twitter"></i><span></span></a>
  <a href="#" class="icon-button facebook d-none"><i class="fab fa-facebook"></i><span></span></a>
  <a href="#" class="icon-button youtube d-none"><i class="fab fa-youtube"></i><span></span></a>
  <a href="#" class="icon-button pinterest d-none"><i class="fab fa-pinterest"></i><span></span></a>
  <div class="text-center mb-5">
    <table class="" style="margin-left:auto;margin-right:auto">
      <td>
        <h4 class="align-text-bottom">Relogin Using</h4>
      </td>
      <td><a href="<?= $google->auth_url(); ?>" class="icon-button google-plus btn btn-danger" title="Login using google"><i class="fab fa-google"></i><span></span></a></td>
    </table>
  </div>

<?php
  include __DIR__ . '/user/profile.php';
}
//precom(parse_url2($google->auth_url()));
//precom($google);
