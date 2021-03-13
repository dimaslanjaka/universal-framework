<?php

define('smartwizard', 1);
define('toastr', 1);
//stylesheet(__DIR__ . '/css/wordpress.css');
//$script[] = __DIR__ . '/js/wordpress.js';
$whu = get_user_meta(get_current_user_id(), 'wp-webhook-url');
if (isURL($whu)) {
  jscfg('WEBHOOK_URL', $whu, true);
}
$whp = get_user_meta(get_current_user_id(), 'wp-webhook-password');
if ($whp) {
  jscfg('WEBHOOK_PASS', $whp, true);
}
$fid = uniqid('fo_');
jscfg('FORM_ID', $fid, true);
?>

<hr>
<form action="" method="post" id="<?= $fid ?>">
  <div id="smartwizard">
    <ul>
      <li><a href="#step-1">Article<br /><small>Edit the article</small></a></li>
      <li><a href="#step-2">Webhook<br /><small>Set webhook URL</small></a></li>
      <li><a href="#step-3">Submit<br /><small>Submit article to your <i class="fab fa-wordpress tx-primary"></i></small></a></li>
    </ul>

    <div>
      <div id="step-1" class="">
        <div class="input-group mb-3">
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2" data-toggle="tooltip-primary" title="Article title">Title</span>
          </div>
          <input type="text" required name="title" class="form-control" placeholder="Input article title" value="<?= isreq('title') ?>">
        </div>
        <label for="">Body (not editable)</label>
        <textarea name="body" readonly class="form-control mb-3 d-none" placeholder="Article Body">
        <?= agcparser::getInstance()->parsingview(isreq('body'), false, ['highlight' => false])->load_depencies()->combine()->__toString(); ?>
        </textarea>
        <div id="summernote" style="height:500px;overflow:auto" class="mb-3">
          <div class="border">
            <?= agcparser::getInstance()->parsingview(isreq('body'), false, ['highlight' => false])->load_depencies()->combine()->__toString(); ?>
          </div>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2" data-toggle="tooltip-primary" title="Categories separate with commas (, )">Cat
              <span class="fa-stack fa-xs ml-1">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fas fa-question fa-stack-1x fa-inverse"></i>
              </span>
            </span>
          </div>
          <input type="text" required name="category" class="form-control" placeholder="Input article category" value="<?= isreq('category') ?>">
        </div>

        <div class="input-group mb-3">
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2" data-toggle="tooltip-primary" title="Tags separate with commas (, )">Tag
              <span class="fa-stack fa-xs ml-1">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fas fa-question fa-stack-1x fa-inverse"></i>
              </span>
            </span>
          </div>
          <input type="text" required name="tag" class="form-control" placeholder="Post Tags" value="<?= isreq('tag') ?>">
        </div>
      </div>
      <div id="step-2" class="">
        <div class="input-group mb-3">
          <div class="input-group-append">
            <span class="input-group-text tx-danger" id="basic-addon2" data-toggle="tooltip-primary" title="Webhook URL">URL
              <span class="fa-stack fa-xs ml-1">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fas fa-question fa-stack-1x fa-inverse"></i>
              </span>
            </span>
          </div>
          <input type="url" required name="webhook-url" class="form-control" placeholder="https://example.com/<?= date('Y') ?>/WMI_post_inserter" pattern="https?://.*" value="<?= get_user_meta(get_current_user_id(), 'wp-webhook-url', true) ?>">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-append">
            <span class="input-group-text tx-danger" id="basic-addon2" data-toggle="tooltip-primary" title="Webhook Password">PW&nbsp;
              <span class="fa-stack fa-xs ml-1">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fas fa-question fa-stack-1x fa-inverse"></i>
              </span>
            </span>
          </div>
          <input type="text" required name="webhook-pass" class="form-control" value="<?= get_user_meta(get_current_user_id(), 'wp-webhook-pass', true) ?>">
        </div>
        <div class="mb-3">
          <button id="webhook-test" class="btn btn-block btn-warning">Test Webhook</button>
        </div>
        <div class="container">
          <img src="https://2.bp.blogspot.com/-4xi_TBLN3bA/XgDQMNBec3I/AAAAAAAAAio/nWF5J1cz2BAb7sQQYbpVytQF0WsVMHMwQCLcBGAsYHQ/s1600/Screenshot_1.png" alt="" srcset="" class="img-thumbnail">
        </div>
      </div>
      <div id="step-3" class="">
        <input type="hidden" name="sl" value="<?= isreq('sl') ?>">
        <input type="hidden" name="tl" value="<?= isreq('tl') ?>">
        <input type="hidden" name="hash" value="<?= isreq('hash') ?>">
        <button id="submitter" type="submit" data-recaptcha='no-action' disabled class="btn btn-success btn-block">Submit article</button>
      </div>
    </div>

    <span id="tutorial" class="text-lg-right float-md-right"><a href="/AGC/post/tutorial#wordpress" target="_blank" id="newtab" data-title="tutorial">Tutorial <i class="fab fa-wordpress"></i> Webhook</a></span>
  </div>
</form>
<div id="snackbar"></div>
<script>
  var wburl = document.getElementsByName("webhook-url");
  if (wburl && typeof WEBHOOK_URL != 'undefined') {
    wburl.value = WEBHOOK_URL;
  }
</script>