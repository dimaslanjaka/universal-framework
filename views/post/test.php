<?php

if (isset($_GET['create'])) {// Create post object
  $my_post = [
    'post_title' => wp_strip_all_tags(
    'Test'
     ),
    'post_content' => 'Test',
    'post_status' => 'publish',
    'post_author' => 1,
    'post_category' => [8, 39],
  ];

  // Insert the post into the database
  var_dump(wp_insert_post($my_post));
}
