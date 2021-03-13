<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $_SESSION['title'] = strip_slashes_recursive(isreq('title'));
  $_SESSION['body'] = strip_slashes_recursive(isreq('body'));
  $_SESSION['hash'] = isreq('hash');
  $_SESSION['sl'] = $_SESSION['source_lang'] = isreq('sl');
  //precom($_REQUEST);
} else {
?>
  <script>
    location.replace('/AGC/login');
  </script>
<?php
}
//$script[] = __DIR__ . '/js/process.js';
//stylesheet(__DIR__ . '/css/process.css');
$country = list_languages();
$listC = '';
foreach ($country as $key => $value) {
  if ($key != isreq('sl')) {
    $listC .= '<option value="' . strtolower($key) . '" ' . ($key == 'en' ? 'selected' : false) . '>' . $country->$key->name . ' (' . $country->$key->native . ')</option>';
  }
}
$T = 'Processor' . time();
?>

<form id="<?= $T ?>" method="POST" action="/AGC/post/translator">
  <input type="hidden" name="niche" value="<?= isreq('niche') ?>">
  <input type="hidden" name="target" value="<?= isreq('target_translator') ?>">
  <div class="form-row">
    <div id="" class="col-md-4">
      <div class="input-group mb-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Original language</div>
        </div>
        <input type="hidden" id="srclang" name="source_lang" value="<?= isses('sl') ?>">
        <input type="text" class="form-control" readonly value="<?= country_name(isses('sl')) ?>">
      </div>
      <div class="input-group mb-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Translate to <b class="tx-danger ml-2">*</b></div>
        </div>
        <select name="to_lang" id="tolang" class="form-control">
          <?= $listC ?>
        </select>
      </div>
      <div id='hash_post' class="input-group mb-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Hash</div>
        </div>
        <input type="text" name="hash" id="" class="form-control" readonly value="<?= isses('hash') ?>">
      </div>
      <div class="input-group mb-2" style="height: 100px">
        <div class="input-group-prepend">
          <div class="input-group-text">Title <b class="tx-danger ml-2">*</b></div>
        </div>
        <textarea id="title_post" class="form-control" name="title"><?= isses('title') ?></textarea>
      </div>
      <label for="">Proxies (HTTPS) <a href="/AGC/proxy" data-name="proxy" id="newtab">GET HERE</a></label>
      <textarea name="" id="proxy_list" cols="30" rows="10" class="form-control">
        <?php
        $fp = ROOT . '/views/AGC/forms/proxy.txt';
        $pl = file($fp, FILE_SKIP_EMPTY_LINES);
        $if = implode("\n", $pl);
        $ps = preg_replace('/\s+|\t/m', "\n", $if);
        //$ps = preg_replace('/\s/m', '', $ps);
        echo trim($ps);
        ?>
      </textarea>
      <hr>
      <button type="button" data-form="<?= $T ?>" class="btn btn-lg btn-block btn-success">Preview now</button>
      <button id='complex' disabled class="btn btn-lg btn-block btn-success">Use this article</button>
    </div>
    <div class="col mt-2">
      <h5 style="position: absolute;top:0;right:0" class="tx-white bg-primary p-2">Preview</h5>
      <textarea class="form-control d-none" name="body" readonly><?= isses('body') ?></textarea>
      <div id="AGCR" style="overflow:auto;height:500px;width:100%"><?= isses('body') ?></div>
    </div>
  </div>
</form>

<script>
  var HASH = '<?= isreq('hash') ?>';
  var NICHE = '<?= isreq('niche') ?>';
</script>