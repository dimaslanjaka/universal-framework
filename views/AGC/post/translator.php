<div class="row">
  <div class="col-md-12">
    <center class="mb-2">
      <h2 class="notranslate">If this page not translate to the chosen language, Please <b>Change target language</b> from <b>previous page</b></h2>
      <p class="notranslate">Its mean, the chosen language is <b>unavailable</b></p>
    </center>
    <div style="height: 500px;overflow:auto;width:100%">
      <?= $body; ?>
      <div class="text-center notranslate" style="position: absolute;bottom:0">
        <form action="/AGC/post/translate" method="post">
          <textarea name="body" id="" class="d-none"><?= $body ?></textarea>
          <input type="hidden" name="title" value="<?= $title ?>">
          <input type="hidden" name="tl" value="<?= $tl ?>">
          <input type="hidden" name="sl" value="<?= $sl ?>">
          <input type="hidden" name="target" value="<?= isreq('target') ?>">
          <input type="hidden" name="niche" value="<?= isreq('niche') ?>">
          <input type="hidden" name="hash" value="<?= isreq('hash') ?>">
          <button type="submit" class="btn btn-lg btn-primary" data-toggle="tooltip" title="Process article now">Proccess Now</button>
        </form>
      </div>
    </div>
  </div>
</div>
<?php

$js = new AGCJS();
echo $js->trjs($sl, $tl);
