<?php
echo 'Test from ' . __FILE__ . '<br/>';

//require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');
// get execluded cateogries array
$execl = get_option('wp_auto_spin_execl', array());

//var_dump($execl);

// The Query
$the_query = new WP_Query(array(
  'category__not_in' => $execl,
  'post_status' => array('publish', 'draft', 'pending'),
  'posts_per_page' => 100,
  'ignore_sticky_posts' => true,
  'post_type' => 'any',
  'meta_query' => array(
    array(
      'key' => 'wp_auto_spinner_scheduled',
      'compare' => 'EXISTS',
    ), array(
      'key' => 'spinned_cnt',
      'compare' => 'NOT EXISTS',
    )
  )

));

var_dump($the_query->have_posts());
