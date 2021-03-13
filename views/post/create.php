<?php
if (isset($err)) {
  echo $err;
}
?>

<!-- New Post Form -->
<div id="postbox" class="card">
  <div class="card-header">Create new post</div>
  <div class="card-body">
    <form id="new_post" method="post" action="">
      <input type="hidden" name="new_post">
      <p><label for="title">Title</label><br />
        <input type="text" id="title" value="" tabindex="1" size="20" name="title" class="form-control" />
      </p>
      <p><label for="description">Description</label><br />
        <textarea id="description" tabindex="3" name="description" cols="50" rows="6" class="form-control"></textarea>
      </p>
      <p>
        <label for="">Categories</label>
        <?php wp_dropdown_categories(['hide_if_empty' => false, 'hide_empty' => false, 'show_option_none' => 'Categories', 'selected' => 1]); ?>
      </p>
      <p><label for="post_tags">Tags</label>
        <input type="text" value="" tabindex="5" size="16" name="post_tags" id="post_tags" class="form-control" /></p>
      <p align="right">
        <input type="submit" value="Publish" tabindex="6" id="submit" name="submit" class="btn btn-primary btn-block" />
      </p>
      <input type="hidden" name="action" value="new_post" />
      <?php wp_nonce_field('new-post'); ?>
    </form>
  </div>
</div>
<!--// New Post Form -->