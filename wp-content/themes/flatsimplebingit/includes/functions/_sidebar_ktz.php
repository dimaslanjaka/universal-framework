<?php
/*
/*-----------------------------------------------*/
/* KENTOOZ SIDEBAR FRAMEWORK
/* Website: kentooz.com
/* The Author: Gian Mokhammad Ramadhan 
/* Social network :twitter.com/g14nnakal facebook.com/gianmr
/* Version :1.0
/*-----------------------------------------------*/

// Do not load directly...
if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/*******************************************
# Register sidebar on hook system ~ post
*******************************************/
if ( !function_exists('ktz_sidebar_wgt_init') ) {
function ktz_sidebar_wgt_init() {
    register_sidebar(array('name' => __( 'Footer 1', 'ktz_theme_textdomain' ),'id' => 'widget_fot1','before_widget' => '<aside id="%1$s" class="widget %2$s">','after_widget' => '</aside>','before_title' => '<h4 class="widget-title"><span class="ktz-blocktitle">','after_title' => '</span></h4>', ));
    register_sidebar(array('name' => __( 'Footer 2', 'ktz_theme_textdomain' ),'id' => 'widget_fot2','before_widget' => '<aside id="%1$s" class="widget %2$s">','after_widget' => '</aside>','before_title' => '<h4 class="widget-title"><span class="ktz-blocktitle">','after_title' => '</span></h4>', ));
    register_sidebar(array('name' => __( 'Footer 3', 'ktz_theme_textdomain' ),'id' => 'widget_fot3','before_widget' => '<aside id="%1$s" class="widget %2$s">','after_widget' => '</aside>','before_title' => '<h4 class="widget-title"><span class="ktz-blocktitle">','after_title' => '</span></h4>', ));
    register_sidebar(array('name' => __( 'Footer 4', 'ktz_theme_textdomain' ),'id' => 'widget_fot4','before_widget' => '<aside id="%1$s" class="widget %2$s">','after_widget' => '</aside>','before_title' => '<h4 class="widget-title"><span class="ktz-blocktitle">','after_title' => '</span></h4>', ));
    register_sidebar(array('name' => __( 'Footer 5', 'ktz_theme_textdomain' ),'id' => 'widget_fot5','before_widget' => '<aside id="%1$s" class="widget %2$s">','after_widget' => '</aside>','before_title' => '<h4 class="widget-title"><span class="ktz-blocktitle">','after_title' => '</span></h4>', ));
    register_sidebar(array('name' => __( 'Footer 6', 'ktz_theme_textdomain' ),'id' => 'widget_fot6','before_widget' => '<aside id="%1$s" class="widget %2$s">','after_widget' => '</aside>','before_title' => '<h4 class="widget-title"><span class="ktz-blocktitle">','after_title' => '</span></h4>', ));
	}
add_action( 'widgets_init', 'ktz_sidebar_wgt_init' );
}