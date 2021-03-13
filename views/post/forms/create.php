<?php

if ('POST' == $_SERVER['REQUEST_METHOD'] && !empty($_POST['action']) && 'new_post' == $_POST['action']) {
  // Do some minor form validation to make sure there is content
  if (isset($_POST['title'])) {
    $title = wp_strip_all_tags($_POST['title']);
  } else {
    $err = 'Please enter the title';
  }
  if (isset($_POST['description'])) {
    $description = $_POST['description'];
  } else {
    $err .= ' - Please enter the content';
  }
  $tags = trim($_POST['post_tags']);
  if (false !== strpos($tags, ',')) {
    $tags = explode(',', $tags);
  } else {
    $tags = [$tags];
  }

  // Add the content of the form to $post as an array
  $new_post = [
    'post_title' => $title,
    'post_content' => $description,
    'tags_input' => $tags,
    'post_status' => 'publish',           // Choose: publish, preview, future, draft, etc.
    'post_type' => 'post',
    'post_category' => [$_POST['cat']],
  ];

  //save the new post and return its ID
  $pid = wp_insert_post($new_post);
  //insert taxonomies like categories tags or custom
  wp_set_post_terms($pid, (array) ($_POST['cat']), 'category', true);

  //insert custom fields
  update_post_meta($pid, 'meta_key_name', $_POST['meta_value']);
}
