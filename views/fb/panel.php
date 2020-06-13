<?php
if (!fb()->is_loggedin()) {
  echo 'please <a href="' . base('/fb/login') . '">login</a> first';

  return;
}
if (fb()->check_cookie()->error) {
  echo fb()->errorMessage . '. <hr/>';
  echo 'please verify your facebook account, and accept this login browser from your official <a href="http://fb.me">facebook</a> account. Then <a href="' . base('/fb/login') . '">Re-login</a> from here again.';

  return;
}
if ('POST' == $_SERVER['REQUEST_METHOD'] && isset($_POST['type'])) {
  fb()->put_config($_POST);
}
$config = fb()->get_config();
$reactionType = isset($config->type) ? $config->type : false;
$limitReact = isset($config->limit) ? $config->limit : 5;
$friend = isset($config->friend) ? $config->friend : false;
$pages = isset($config->pages) ? $config->pages : false;
$groups = isset($config->groups) ? $config->groups : false;
?>

<section>
  <h2>Welcome, <?= $_SESSION['fb_email']; ?>
  </h2>
  <div class="p-3">
    <form action="<?= base('/fb/panel'); ?>" method="post" class="">
      <div class="md-form mb-2">
        <label for="reactList">Type Reactions</label>
        <select name="type" id="reactList" class="mdb-select mb-2">
          <option value="" disabled>Select Reactions</option>
          <?php
      foreach (fb()->getListReactions() as $key => $value) {
        echo '<option value="' . $key . '" ' . ((int) $reactionType == (int) $key ? 'selected' : false) . '>' . $value . '</option>';
      }
      ?>
        </select>
      </div>
      <div class="md-form mb-2">
        <label for="LimitExec">Maximum executions once runned</label>
        <input type="number" name="limit" id="LimitExec" class="form-control" value="<?= (int) $limitReact; ?>">
      </div>
      <div class="text-center mb-2">
        <b>Likes</b>
      </div>
      <div class="form-row mb-2">

        <div class="col">
          <div class="switch">
            <label>
              <b class="mr-5"><i class="fad fa-user mr-2"></i>Friends</b> OFF
              <input type="checkbox" id="friend" name="friends" <?= $friend ? 'selected' : false; ?>>
              <span class="lever"></span> ON
            </label>
          </div>
        </div>
        <div class="col">
          <div class="switch">
            <label>
              <b class="mr-5"><i class="fad fa-users mr-2"></i>Groups</b> OFF
              <input type="checkbox" id="groups" name="groups" <?= $groups ? 'selected' : false; ?>>
              <span class="lever"></span> ON
            </label>
          </div>
        </div>
        <div class="col">
          <div class="switch">
            <label>
              <b class="mr-5"><i class="fad fa-pager mr-2"></i>Pages</b> OFF
              <input type="checkbox" id="pages" name="pages" <?= $pages ? 'selected' : false; ?>>
              <span class="lever"></span> ON
            </label>
          </div>
        </div>
      </div>
  </div>
  <div class="md-form mb-2 block">
    <button type="submit" class="btn btn-block"><i class="fad fa-save"></i> Save</button>
  </div>
  <div class="clear"></div>

  </form>
  </div>
</section>

<section class="pt-3">
  <div class="text-center">
    Log Activities
  </div>
  <div class="">
    <?php
  fb()->setOpt(CURLOPT_FOLLOWLOCATION, true);
  $c = fb()->fbg('/me/allactivity');
  $html = str_get_html($c);
  if ($html) {
    //print $html->outertext;
    if ($html->find('.loadedSection')) {
      $cl = $html->find('.loadedSection', 0);
      if ($a = $cl->find('a')) {
        foreach ($a as $link) {
          $link->setAttribute('target', '_blank');
          $link->setAttribute('rel', 'nofollow noopener');
          if ($link->getAttribute('href')) {
            $parse = parse_url($link->getAttribute('href'));
            if (!isset($parse['host'])) {
              $link->setAttribute('href', 'https://m.facebook.com' . $link->getAttribute('href'));
            }
          }
        }
      }
      if ($logc = $cl->find('.c')) {
        foreach ($logc as $logw) {
          if (!preg_match('/\b(liked|menyukai|menanggapi|reacted)\b/m', $logw->outertext)) {
            continue;
          }
          $logw->setAttribute('class', 'p-2 border m-2');
          if ($fxx = $logw->find('.fcg')) {
            foreach ($fxx as $fx) {
              $fx->outertext = '';
            }
          }
          $logcont = $logw->outertext;

          echo $logcont;
        }
      }
    }
  }
  ?>
  </div>
</section>