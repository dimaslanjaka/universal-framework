<?php
if (isset($_COOKIE['dimas'])) {
  ?>
<div class="az-signin-wrapper">
  <div class="az-card-signin">
    <h1 class="az-logo">Companies <span>Panel</span></h1>
    <?php if ('yes' == get_option('google-login')) { ?>
    <div class="text-center social-btn">
      <a href="#" class="btn btn-primary btn-block d-none"><i class="fab fa-facebook"></i> Sign in with
        <b>Facebook</b></a>
      <a href="#" class="btn btn-info btn-block d-none"><i class="fab fa-twitter"></i> Sign in with <b>Twitter</b></a>
      <a href="<?= $google->auth(); ?>"
        class="btn btn-danger btn-block"><i class="fab fa-google"></i> Sign in with <b>Google</b></a>
    </div>
    <div class="or-seperator"><i>or</i></div>
    <?php } ?>
    <form action="/login" method="post" id="ajax">
      <!--id ajax-->
      <input type="hidden" name="login">
      <div class="form-group">
        <label>Email/Username</label>
        <input type="text" class="form-control" placeholder="Enter your email/username" name="email" required>
      </div><!-- form-group -->
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" placeholder="Enter your password" name="password" required>
      </div><!-- form-group -->
      <div class="form-group">
        <button class="btn btn-az-primary btn-block" type="submit" id="wp-submit">Sign In</button>
      </div>
    </form>
    <div class="az-signin-header">
      <h4>Please sign in to continue</h4>
    </div><!-- az-signin-header -->
    <div class="az-signin-footer d-none">
      <p><a href="">Forgot password?</a></p>
      <p>Don't have an account? <a href="/register">Create an Account</a></p>
    </div><!-- az-signin-footer -->
  </div><!-- az-card-signin -->
</div><!-- az-signin-wrapper -->

<style>
  .az-header,
  .az-iconbar,
  .az-iconbar-primary {
    display: none;
  }
</style>
<?php
} else {
    ?>
You disallowed access this page
<?php
  }
