<?php
$gcode = isset($_GET['code']) ? $_GET['code'] : '';
$google->setAuthCode($gcode);
$client = $google->client();
if (!is_array($client)) {
  if (isset($_SESSION['user'])) {
    $user = $_SESSION['user'];
    $user->username = strtok($user->email, '@');
    if (!email_exists($user->email)) {
      //$core->header_redirect('/register', 1);
?>
<div class="row">
  <div class="col-md-12">
    <div class="alert alert-danger" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
      <strong>Sorry!</strong> You Not Registered at all companies
      <div countdown="7" data-callback="rdr" class="m-2"></div>
    </div>
  </div>
</div>
<?php
    } else {
      //$core->header_redirect('/dashboard', 1);
?>
<div class="alert alert-success" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span>
  </button>
  <strong>Well done!</strong> You successfully login using google <br><a href="/dashboard">Goto Dashboard</a>
  <div countdown="3" data-callback="rdd" class="m-2"></div>
</div>
<?php
    }
  }
} else {
  ?>
<div class="alert alert-danger" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span>
  </button>
  <strong>Oh Snap!</strong> Your login failed
  <p class="bg-white">
    <?= $client['error_description']; ?>
  </p>
  <div countdown="10" data-callback="rdr" class="m-2"></div>
  <a href="<?= $google->auth(); ?>" class="btn btn-success">Re-login
  </a>
</div>
<?php
}
?>
<script>
  function rdr() {
    location.replace('/login');
  }
  function rdd() {
    location.replace('/dashboard');
  }
</script>