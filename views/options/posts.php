<?php
$args = array(
  'post_type' => 'post',
  'orderby'    => 'ID',
  'post_status' => 'publish',
  'order'    => 'DESC',
  'posts_per_page' => -1 // this will retrive all the post that is published
);
$result = new WP_Query($args);
if ($result->have_posts()) : ?>
  <?php while ($result->have_posts()) : $result->the_post(); ?>
  <?php
  $argp = [
    'title' => the_title(),
    'content' => the_content()
  ];
    //the_title();
    precom($result);
  ?>
  <?php endwhile; ?>
  <?php endif;
wp_reset_postdata(); ?>