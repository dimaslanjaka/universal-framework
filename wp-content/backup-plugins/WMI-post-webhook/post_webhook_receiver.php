<?php

//require  __DIR__ . '../../../../wp-load.php';
//require  __DIR__ . '../../../../wp-blog-header.php';

add_action('wp', 'WMI_post_init');
function WMI_post_init()
{

  if ('special_cpt' === get_post_type() && is_singular()) {
    return true;
  }
  if (is_WMI_post_inserter()) {
    return WMI_insert_post();
  }
}
//do_action('WMI_create_post_parameter_control');
