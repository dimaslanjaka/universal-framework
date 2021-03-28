<?php
$google = $client = new GoogleExt\client();
$blogger_auth = $google->create_auth_url('blogger', '/auth/google');
$google_auth = $google->create_auth_url('', '/auth/google');
?>
<section>
  <div class="container">
    <div class="container bcontent">
      <div class="card custom-card">
        <div class="row no-gutters">
          <div class="col-sm-5">
            <img class="card-img" src="<?= GoogleExt\client::get_profile_picture() ?>" alt="<?= GoogleExt\client::get_profile_name() ?> Card">
          </div>
          <div class="col-sm-7">
            <div class="card-body">
              <h5 class="card-title"><?= GoogleExt\client::get_profile_name() ?></h5>
              <div class="btn-group">
                <a id="google" class="btn btn-sm text-white btn-google" href="<?= $google_auth ?>">
                  Login with Google
                </a>
                <a id="blogger" class="btn btn-sm text-white btn-blogger" href="<?= $blogger_auth ?>">
                  Login with Blogger
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<pre class="d-none">{}</pre>