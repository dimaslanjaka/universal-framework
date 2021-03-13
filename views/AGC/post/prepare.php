<?php
define('codemirror', true);
define('summernote', true);
stylesheet('https://fonts.googleapis.com/css?family=Euphoria+Script');
$idform = uniqid('form_');
?>

<div class="content">
  <h1 id="head">Auto Generated Content Editor</h1>

  <div id="myHeader">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item bg-primary">
        <a class="nav-link active" id="composer-tab" data-toggle="tab" href="#composer" role="tab" aria-controls="composer" aria-selected="true">Visual Editor</a>
      </li>
      <li class="nav-item bg-primary">
        <a class="nav-link" id="plaintext-tab" data-toggle="tab" href="#plaintext" role="tab" aria-controls="plaintext" aria-selected="false">HTML Editor</a>
      </li>
      <li class="nav-item bg-primary">
        <a class="nav-link" id="live-tab" data-toggle="tab" href="#live" role="tab" aria-controls="live" aria-selected="false">Preview</a>
      </li>
      <li class="nav-item bg-info">
        <a class="nav-link" id="wp-tab" data-toggle="tab" href="#wp" role="tab" aria-controls="wp" aria-selected="false">Wordpress</a>
      </li>
      <li class="nav-item">
        <button id="save-blogger" type="button" class="btn btn-success">
          Save <i class="fab fa-blogger"></i>
        </button>
      </li>
    </ul>
  </div>
  <div class="tab-content mt-2" id="myTabContent">
    <div class="tab-pane fade show active" id="composer" role="tabpanel" aria-labelledby="composer-tab">
      <div>
        <input name="" id="title-visual" class="form-control" value="<?= isreq('title') ?>"></input>
      </div>
      <div id="summernote"></div>
    </div>
    <div class="tab-pane fade" id="plaintext" role="tabpanel" aria-labelledby="plaintext-tab">
      <form id="<?= $idform ?>" action="/AGC/post/blogger" method="post">
        <input name="title" id="title-plaintext" cols="30" rows="10" class="form-control" value="<?= isreq('title') ?>"></input>
        <textarea name="body" id="body-plaintext" cols="30" rows="10" class="form-control">Codemirror Initializing</textarea>
        <input type="hidden" name="save">
        <div class="btn-group" id="btn-save">
          <button class="btn btn-primary" id="autoFormatSelection">
            Beautify
          </button>
          <button class="btn btn-primary" data-toggle="tooltip-primary" title="Comment Selected" id="commentSelection-true">
            Comment
          </button>
          <button class="btn btn-primary" data-toggle="tooltip-primary" title="unComment Selected" id="commentSelection-false">
            Uncomment
          </button>
          <button class="btn btn-warning" id="save-wp">
            Save <i class="fab fa-wordpress"></i>
          </button>
          <button id="save-blogger" type="button" class="btn btn-success">
            Save <i class="fab fa-blogger"></i>
          </button>
        </div>
      </form>
      <blockquote>
        <p>Search And Replace:</p>
        <dl>
          <dt>Ctrl-F / Cmd-F</dt>
          <dd>Start searching</dd>
          <dt>Ctrl-G / Cmd-G</dt>
          <dd>Find next</dd>
          <dt>Shift-Ctrl-G / Shift-Cmd-G</dt>
          <dd>Find previous</dd>
          <dt>Shift-Ctrl-F / Cmd-Option-F</dt>
          <dd>Replace</dd>
          <dt>Shift-Ctrl-R / Shift-Cmd-Option-F</dt>
          <dd>Replace all</dd>
        </dl>
      </blockquote>

    </div>
    <div class="tab-pane fade" id="live" role="tabpanel" aria-labelledby="live-tab">
      <div id="live-preview" class="">
        <?= agcparser::getInstance()->parsingview(isreq('body'), false, ['highlight' => false])->combine()->__toString(); ?>
      </div>
    </div>
    <div class="tab-pane fade show" id="wp" role="tabpanel" aria-labelledby="wp-tab">
      <form action="/AGC/post/wordpress" method="post" id="wp-post">
        <label for="">Title Post</label>
        <input type="text" required name="title" id="wp-title" class="form-control" placeholder="Title" value="<?= isreq('title') ?>">
        <label for="">Body Post</label>
        <textarea required name="body" id="wp-body" cols="30" rows="10" class="form-control"><?= isreq('body') ?></textarea>
        <label for="">Category (separate with commas <b>(,)</b>)</label>
        <input type="text" name="category" class="form-control" required value="Uncategorized">

        <label for="">Tags (separate with commas <b>(,)</b>)</label>
        <input type="text" name="tag" required class="form-control" value="<?= isreq('sl') . '-' . isreq('tl') ?>">
        <input type="hidden" name="sl" value="<?= isreq('sl') ?>">
        <input type="hidden" name="tl" value="<?= isreq('tl') ?>">
        <input type="hidden" name="hash" value="<?= isreq('hash') ?>">
        <button type="submit" class="btn btn-success mt-2">Send to <i class="fab fa-wordpress"></i></button>
      </form>
    </div>
  </div>

</div>
<div class="nohighlight">
  <pre id="source" class="d-none">
    <?= agcparser::getInstance()->parsingview(isreq('body'), false, ['highlight' => false])->save_depencies()->__toString(); ?>
</pre>
</div>

<?php
echo agcparser::getInstance()->load_depencies()::$backup_html;

//$script[] = __DIR__ . '/js/' . basename(__FILE__, '.php') . '.js';
