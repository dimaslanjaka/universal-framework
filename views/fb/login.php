<?php
/*

if (isset($_REQUEST['username']) && isset($_REQUEST['password'])) {
  $username = $_REQUEST['username'];
  $password = $_REQUEST['password'];
  fb()->setEmail($username)->setPass($password);

  print fb()->login($username, $password)->htmlreturn;
} else {
  fb()->get('/profile.php');
  if (!fb()->is_loggedin()) {
  #not logged in
?>
  <form action="<?= base('/fb/login') ?>" method="post">
    <label for="">username/email</label>
    <input type="text" name="username" class="form-control mb-2">
    <label for="">password</label>
    <input type="text" name="password" class="form-control mb-2">
    <button type="submit" class="form-control">submit</button>
  </form>
<?php
  } else {
  echo fb()->check_cookie()->htmlreturn;
  }
}
//fb()->echo_response();
*/

if (isset($_POST['cookietxt'])) {
  $id = fb()->getID($_POST['cookietxt']);
  $user = $_POST['username'];
  if (is_numeric($id)) {
    $user = $id;
  }
  fb()->setEmail($user);
  $ckfile = fb()->get_cookieFile();
  fb()->fbg('/', $ckfile);
  file_put_contents($ckfile, $_POST['cookietxt']);
  echo fb()->check_cookie()->htmlreturn;
} else {
  ?>

  <div>
    <form action="<?= base('/fb/login'); ?>" method="post">
      <div class="text-center mb-2">
        <a href="" id='loginr' target="_blank">Please login from here, then copy your cookie login</a>
      </div>
      <label for="">username</label>
      <input type="text" name="username" class="form-control mb-2">
      <label for="">cookie login</label>
      <textarea name="cookietxt" id="" cols="30" rows="10" class="form-control mb-2"></textarea>
      <button type="submit" class="btn btn-block">Submit</button>
    </form>
  </div>

  <script>
    var lh = 'http://' + location.host + '/bot/glype/browse.php?u=https%3A%2F%2Fmbasic.facebook.com%2F%3F_rdr&b=4';
    document.getElementById('loginr').setAttribute('href', lh);
    //location.href =
  </script>

<?php
}
