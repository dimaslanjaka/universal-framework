<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/javascript/javascript.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/xml/xml.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/htmlmixed/htmlmixed.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/css/css.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/addon/hint/show-hint.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/addon/hint/css-hint.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/addon/hint/html-hint.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/addon/hint/javascript-hint.js"></script>
<script src="https://codemirror.net/2/lib/util/formatting.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/addon/display/autorefresh.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/addon/search/search.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/addon/search/searchcursor.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/addon/search/jump-to-line.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/addon/search/match-highlighter.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/addon/dialog/dialog.js"></script>
<?php

stylesheet([__DIR__ . '/css/' . basename(__FILE__, '.php') . '.css', 'https://fonts.googleapis.com/css?family=Euphoria+Script', 'https://cdn.jsdelivr.net/gh/summernote/summernote@develop/dist/summernote-bs4.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.css', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/theme/material.css', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/addon/hint/show-hint.css', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/addon/dialog/dialog.css']);
if (is_user_logged_in() && (current_user_can('administrator') || current_user_can('editor')) && isset($_SESSION['body_translated'])) {
  $page = get_page_by_title($_SESSION['title'], OBJECT, 'post');
  if (is_wp_error($page)) {
    $posttitle = $_SESSION['title'];
    $postid = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE post_title = '" . $posttitle . "'");
    var_dump($postid);
  } else {
    if ($page && $page->post_status != 'publish') {
      $page = null;
    }
    if (isset($page->ID)) {
      $cats = wp_get_post_categories($page->ID);
      $category_name = [];
      for ($i = 0; $i < count($cats); $i++) {
        $category_name[] = get_the_category_by_ID($cats[$i]);
      }
    }
    //precom($page);
  }
  //precom($page);
  ?>

  <div class="content">
    <h1 id="head">Auto Generated Content Editor</h1>

    <div id="myHeader">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item bg-primary">
          <a class="nav-link active" id="composer-tab" data-toggle="tab" href="#composer" role="tab" aria-controls="composer" aria-selected="true">Visual Editor</a>
        </li>
        <li class="nav-item bg-primary">
          <a class="nav-link" id="plaintext-tab" data-toggle="tab" href="#plaintext" role="tab" aria-controls="plaintext" aria-selected="false">Plaintext Editor</a>
        </li>
        <li class="nav-item bg-primary">
          <a class="nav-link" id="live-tab" data-toggle="tab" href="#live" role="tab" aria-controls="live" aria-selected="false">Preview</a>
        </li>
        <li class="nav-item bg-primary">
          <a class="nav-link" id="wp-tab" data-toggle="tab" href="#wp" role="tab" aria-controls="wp" aria-selected="false"><i class="fab fa-wordpress"></i></a>
        </li>
      </ul>
    </div>
    <div class="tab-content mt-2" id="myTabContent">
      <div class="tab-pane fade show active" id="composer" role="tabpanel" aria-labelledby="composer-tab">
        <div>
          <input name="" id="title-visual" class="form-control" value="<?= $_SESSION['title'] ?>"></input>
        </div>
        <div id="summernote"></div>
      </div>
      <div class="tab-pane fade" id="plaintext" role="tabpanel" aria-labelledby="plaintext-tab">
        <form action="/AGC/send" method="post">
          <?php
            if ($page && isset($page->ID)) {
              echo '<input type="hidden" name="id" value="' . $page->ID . '">';
            }
            ?>
          <input name="title" id="title-plaintext" cols="30" rows="10" class="form-control" value="<?= $_SESSION['title'] ?>"></input>
          <textarea name="body" id="body-plaintext" cols="30" rows="10" class="form-control">Codemirror Initializing</textarea>
          <input type="hidden" name="save">
          <div class="btn-group">
            <button class="btn btn-primary" id="autoFormatSelection">
              Beautify
            </button>
            <button class="btn btn-primary" id="commentSelection-true">
              Comment Selected
            </button>
            <button class="btn btn-primary" id="commentSelection-false">
              Uncomment Selected
            </button>
            <button class="btn btn-warning" id="save-wp">
              Save <i class="fab fa-wordpress"></i>
            </button>
            <button type="submit" class="btn btn-success">
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
        </div>
      </div>
      <div class="tab-pane fade show" id="wp" role="tabpanel" aria-labelledby="wp-tab">
        <form action="" method="post" id="wp-post">
          <label for="">Title Post</label>
          <input type="text" name="title-wp" id="wp-title" class="form-control" placeholder="Title" value="<?= $page && isset($page->post_title) ? $page->post_title : false ?>">
          <label for="">Body Post</label>
          <textarea name="body-wp" id="wp-body" cols="30" rows="10" class="form-control"><?= $page && isset($page->post_content) ? $page->post_content : false ?></textarea>
          <label for="">Category</label>
          <?php
            if ($page && !empty($page) && !empty(wp_get_post_categories($page->ID)) && isset($category_name)) {
              echo '<input type="text" name="category" value="' . implode(', ', $category_name) . '" id="" class="form-control">';
            } else {
              echo '<input type="text" name="category" value="' . implode(', ', !isset($_SESSION['category']) ? parseTags($_SESSION['title']) : array_filter($_SESSION['category'])) . '" id="" class="form-control">';
            }
            ?>

          <label for="">Tags</label>
          <?php
            if (!$page) {
              echo '<input type="text" name="tag" value="' . implode(', ', !isset($_SESSION['tag']) ? parseTags($_SESSION['title']) : array_filter($_SESSION['tag'])) . '" id="" class="form-control">';
            } else {
              $tg = [];
              foreach (wp_get_post_tags($page->ID) as $tags) {
                $tg[] = $tags->name;
              }
              echo '<input type="text" name="tag" id="" value="' . implode(', ', $tg) . '" class="form-control">';
            }
            ?>
          <input type="hidden" name="<?= $page && isset($page->ID) ? 'update-wp' : 'save-wp' ?>" class="d-none">
          <button type="submit" class="btn btn-success mt-2"><?= $page && isset($page->ID) ? 'Update' : 'Save' ?> <i class="fab fa-wordpress"></i></button>
        </form>
      </div>
    </div>

  </div>
  <div class="nohighlight">
    <pre id="source" class="d-none"><?= agcparser::getInstance()->parsingview(isses('body_translated'), false, ['highlight' => false])->save_depencies()->__toString(); ?>
</pre>
  </div>

<?php
}
echo agcparser::getInstance()->load_depencies()::$backup_html;

$script[] = __DIR__ . '/js/' . basename(__FILE__, '.php') . '.js';
