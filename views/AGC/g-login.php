<div class="container">
  <!-- Display login button / Google profile information -->
  <?= isset($_SESSION['subscribed']) && 1 === $_SESSION['subscribed'] ? 'Congrats, You Already Subscribed' : 'Sorry, You Not Yet Subscribed. Retry <a href="' . $gClient->auth_url() . '"><img src="https://m.alfascorpii.co.id/web_lib/img/gmail_login.png" alt="Login Using Google"/></a>'; ?>
</div>
<script>
  <?php
if (isset($_SESSION['subscribed']) && 1 === $_SESSION['subscribed']) {
  ?>
  location.replace = '/AGC/userinfo';
  <?php
}
?>
</script>