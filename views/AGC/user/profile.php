<?php if (is_user_logged_in() && isset($_SESSION['google_user'])) { ?>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <div class="card" id="profile-info">
          <img class="card-img-top" src="https://steamuserimages-a.akamaihd.net/ugc/851597095570947012/6ED65F93C2D0D1771721FDBA40184FA655648CF7/" alt="<?= $_SESSION['google_user']->name; ?>">
          <div class="card-body text-center">
            <img class="avatar rounded-circle" src="<?= $_SESSION['google_user']->picture; ?>" alt="<?= $_SESSION['google_user']->name; ?>">
            <h4 class="card-title"><?= $_SESSION['google_user']->name; ?>
            </h4>
            <h6 class="card-subtitle mb-2 text-muted">AGC Client</h6>
            <p class="card-text">
              <table id="profile">
                <tr>
                  <th>
                    NAME
                  </th>
                  <td>
                    <?= isset($_SESSION['google_user']->name) ? $_SESSION['google_user']->name : ''; ?>
                  </td>
                </tr>
                <tr>
                  <th>GOOGLE ID</th>
                  <td><?= isset($_SESSION['google_user']->id) ? $_SESSION['google_user']->id : ''; ?>
                  </td>
                </tr>
                <tr>
                  <th>
                    EMAIL
                  </th>
                  <td>
                    <?= isset($_SESSION['google_user']->email) ? $_SESSION['google_user']->email : ''; ?>
                  </td>
                </tr>
                <tr>
                  <th>
                    <a href="https://www.youtube.com/channel/UCGNaoefvJRfd15fo-LQ0zvg" id="newtab" data-name="AGC">SUBSCRIBED</a>
                  </th>
                  <td>
                    <?= $_SESSION['subscribed'] ? '<span class="tx-success">YES</span>' : '<span class="tx-danger"><b>NO</b>, please subscribe <a href="https://www.youtube.com/channel/UCGNaoefvJRfd15fo-LQ0zvg" id="newtab"
        data-name="AGC">this channel</a> first to access AGC</span>'; ?>
                  </td>
                </tr>
                <tr>
                  <th>
                    VERIFIED EMAIL
                  </th>
                  <td>
                    <?= isset($_SESSION['google_user']->verifiedEmail) && $_SESSION['google_user']->verifiedEmail ? '<span class="tx-success">YES</span>' : '<span class="tx-danger">NO</span>'; ?>
                  </td>
                </tr>
                <tr>
                  <th>
                    LIVE
                  </th>
                  <td>
                    <?= isset($_SESSION['google_user']->locale, $_SESSION['token']) ? country_name($_SESSION['google_user']->locale) . '_' . date('dmyhis', $_SESSION['token']['created'] + $_SESSION['token']['expires_in']) : ''; ?>
                  </td>
                </tr>
              </table>
            </p>
            <a href="#" class="btn btn-info d-none">Follow</a>
            <a href="#" class="btn btn-outline-info d-none">Message</a>
          </div>
        </div>
      </div>
      <!--/row-->
      <div class="col-12 col-sm-8 col-md-6 col-lg-8">
        <form class="bg-white p-5">
          <div class="form-group row">
            <label for="email5" class="col-sm-4 col-md-2 col-form-label">Blogger Email</label>
            <div class="col-sm-8 col-md-10">
              <div class="input-group">
                <input type="password" class="form-control" id="email5" placeholder="name.secret@blogger.com" value="<?= get_user_meta(get_current_user_id(), 'blogger_email', true); ?>">
                <div class="input-group-prepend">
                  <div class="input-group-text" id="view-email" view-for="email5"><i class="fas fa-eye"></i></div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row" aria-disabled="">
            <label for="giturl" class="col-sm-4 col-md-2 col-form-label">Github Link</label>
            <div class="col-sm-8 col-md-10">
              <input type="url" class="form-control" id="giturl" placeholder="https://github.com/username" value="<?= get_user_meta(get_current_user_id(), 'github_url', true); ?>">
            </div>
          </div>
          <div class="form-group row" aria-disabled="">
            <label for="fburl" class="col-sm-4 col-md-2 col-form-label">Facebook Link</label>
            <div class="col-sm-8 col-md-10">
              <input type="url" class="form-control" id="fburl" placeholder="https://www.facebook.com/username" value="<?= get_user_meta(get_current_user_id(), 'facebook_url', true); ?>">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-8 offset-sm-4 col-md-10 offset-md-2">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="check5">
                <label class="form-check-label" for="check5">
                  I have agree with the terms and conditions. (check this to save)
                </label>
              </div>
              <pre id="result-ajax"></pre>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-10">
              <button type="submit" class="btn btn-primary d-none" disabled>Sign in</button>
            </div>
          </div>
        </form>
      </div>
      <!--/row-->
    </div>
  </div>
  <hr />
  <?php
  include __DIR__ . '/../lists.php';
  stylesheet(__DIR__ . '/../css/lists.css');
  if (!isset($google) || (isset($google) && get_class($google) != 'wpgoogle')) {
    $google = new wpgoogle(['redirect_uri' => (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . '://' . WP_HOST . '/' . $request]);
  }
  if (!$google->isSubsribed()) {
    check_subscriber($google->client); ?>
    <div class="modal hide fade" id="modal-unsubscribe">
      <div class="modal-header">
        <a class="close d-none" data-dismiss="modal">×</a>
        <h3 class="tx-danger">SUBSCRIBE FIRST</h3>
      </div>
      <div class="modal-body bg-white">
        <p class="tx-danger text-center">
          Sorry, you must subscribe to our <a href="<?= ytURL(); ?>" class="tx-success" target="_blank" id="newtab" data-name="AGC">YouTube channel</a> first before using AGC. Then
          reload this page to check.
        </p>
        <div id="info-user"></div>
      </div>
      <div class="modal-footer">
        <a href="<?= ytURL(); ?>" class="btn btn-success" target="_blank" id="newtab" data-name="AGC">Subscribe to YouTube channel</a>
        <b class="tx-white">OR</b> <a href="<?= $google->auth_url() ?>" class="btn btn-warning">Change Google Account</a>
      </div>
    </div>
  <?php
  } ?>

<?php
} else {
?>
  <div class="text-center" disabled>
    Login Using <a href="<?= $google->auth_url(); ?>" class="icon-button google-plus btn btn-danger" title="Login using google"><i class="fab fa-google"></i><span></span></a>
  </div>
  <script>
    location.replace('/AGC/login');
  </script>
<?php
}
$script[] = __DIR__ . '/js/' . basename(__FILE__, '.php') . '.js';
stylesheet(__DIR__ . '/css/' . basename(__FILE__, '.php') . '.css');
