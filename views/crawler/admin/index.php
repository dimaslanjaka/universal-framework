<?php
include __DIR__ . '/func.php';
if (!isAdmin()) {
  echo 'Only for admin';
  return;
}
$client = gclient();

// authenticate code from Google OAuth Flow
if (isset($_GET['code'])) {
  $token = $client->gClient->fetchAccessTokenWithAuthCode($_GET['code']);
  $client->gClient->setAccessToken($token);
  _file_($client->tokenFile, $token, true);
}
if (isAdmin()) {
  $client->saveConfig();
?>
  <main>
    <section class="text-center">
      <a target='_blank' href='<?= $client->gClient->createAuthUrl() ?>' class='text-center rounded btn-primary btn' id='newtab' data-name='login'><i class="fab fa-google"></i></a>
    </section>
    <section>
      <div class="row">
        <div class="col-md-3">
          <h4 class="text-center">Movies</h4>
          <form action="" method="post" id="movies">
            <input type="hidden" name="movies" value="1">
            <div class="form-group">
              <label for=""><i class="fas fa-user"></i> Blogger ID</label>
              <input type="text" class="form-control" name="bloggerid" value="<?= $client->movies->bloggerID ?>" />
            </div>
            <div class="form-group">
              <label for=""><i class="fab fa-blogger"></i> Blog ID</label>
              <input type="text" class="form-control" name="blogid" value="<?= $client->movies->blogID ?>" />
            </div>
            <div class="form-group">
              <button class="btn btn-primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
<?php
}



if (!empty($client->movies) && isset($client->movies->blogID) && ctype_alnum($client->movies->blogID)) {
  if (isreq('movies') || !iscookie('updateMovies')) {
    $client->updateMovies();
    cook('updateMovies', 1, 18400);
  }
}
