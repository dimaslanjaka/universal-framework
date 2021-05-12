<?php

$class = new GoogleExt\client();
/**
 * @var Google\Client
 */
$client = $class->custom_client('blogger', '/auth/google');
$service = new GoogleExt\blogger($client);

// determine blog id
if (!isset($_REQUEST['bid']) || !isset($_REQUEST['pid'])) {
  if (isset($_SERVER['HTTP_REFERER'])) {
    redirect($_SERVER['HTTP_REFERER']);
  } else {
    redirect(getOrigin('/blogger/list-posts'));
  }
  exit();
}

// set blog id
$service->set_blog_id($_REQUEST['bid']);
// get single post
$singlepost = $service->posts->get($_REQUEST['bid'], $_GET['pid']);
?>

<div class="container">
  <form action="" method="post">
    <div class="form-group mb-2"><label for="">Title</label><input type="text" class="form-control" id="title" value="<?= (isset($singlepost->title) ? $singlepost->title : "") ?>" name="title"></div>

    <div class="form-group mb-2">
      <label for="">Content</label>

      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="editor-tab" data-toggle="tab" href="#editor" role="tab" aria-controls="editor" aria-selected="true">Editor</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="preview-tab" data-toggle="tab" href="#preview" role="tab" aria-controls="preview" aria-selected="false">Preview</a>
        </li>
      </ul>

      <div class="tab-content border" id="myTabContent">
        <div class="tab-pane fade show active" id="editor" role="tabpanel" aria-labelledby="editor-tab"><textarea id="body" name="body" class="form-control" cols="5"><?php echo isset($singlepost->content) ? htmlentities($singlepost->content) : 'Contet Empty';  ?></textarea></div>
        <div class="tab-pane fade" id="preview" role="tabpanel" aria-labelledby="preview-tab"><iframe id="FileFrame" src="about:blank" frameborder="0" width="100%"></iframe></div>
      </div>
    </div>

    <div class="form-group mb-2">
      <label for="">Label</label>
      <input name="label" type="text" class="form-control" value="<?= implode(", ", $singlepost->labels) ?>"><small class="form-text text-muted">
        Separate with commas (,)
      </small>
    </div>

    <div class="form-group">
      <input type="hidden" name="update">
      <input type="hidden" name="blogid" value="<?= $_REQUEST['bid'] ?>">
      <input type="hidden" name="postid" value="<?= $_REQUEST['pid'] ?>">
      <button type="submit" class="btn btn-primary">Update</button>
    </div>
  </form>
</div>