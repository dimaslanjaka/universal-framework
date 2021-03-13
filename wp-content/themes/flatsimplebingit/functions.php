<?php

/*-----------------------------------------------*/
/* KENTOOZ FRAMEWORK
/* Version :1.01
/* You can add your own function here!
/* But don't change anything in this file!
/*-----------------------------------------------*/

// Load kentooz framework
require_once TEMPLATEPATH . '/includes/init.php';
$kentooz_declare = new KENTOOZ();
$kentooz_declare->init();

/*
 * Core infinite scroll jetpack
 * Since v.1.1.5
 */
function ktz_infinite_scroll_init()
{
  add_theme_support('infinite-scroll', [
    'type' => 'scroll',
    'footer_widgets' => false,
    'container' => 'ktz-infinitescroll-jetpack',
    'wrapper' => true,
    'render' => false,
    'posts_per_page' => false,
  ]);
}
add_action('after_setup_theme', 'ktz_infinite_scroll_init');
