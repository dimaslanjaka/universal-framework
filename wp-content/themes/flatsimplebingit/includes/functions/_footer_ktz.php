<?php
/*
/*-----------------------------------------------*/
/* KENTOOZ THEMES FUNCTION
/* Website    : http://www.kentooz.com
/* The Author : Gian Mokhammad Ramadhan (http://www.gianmr.com)
/* Twitter    : http://www.twitter.com/g14nnakal 
/* Facebook   : http://www.facebook.com/gianmr
/*-----------------------------------------------*/

// Do not load directly...
if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/* 
* Function widget place layout for footer
*/
if ( !function_exists( 'ktz_mainfooter' ) ) :
function ktz_mainfooter() {
	$footer_column = ot_get_option('ktz_footer_columns');
	echo '<div class="row">';
		switch($footer_column) :
			case 'full':
				echo '<div class="col-md-12 widget-area" role="complementary">';
				dynamic_sidebar('widget_fot1');
				echo '</div>';
				break;
			case 'half_half':
				echo '<div class="col-md-6 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot1' );
				echo '</div>';
				echo '<div class="col-md-6 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot2' );
				echo '</div>';
				break;
			case 'onethird_onethird_onethird':					
				echo '<div class="col-md-4 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot1' );
				echo '</div>';
				echo '<div class="col-md-4 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot2' );
				echo '</div>';
				echo '<div class="col-md-4 widget-area sbar">';
				dynamic_sidebar( 'widget_fot3' );
				echo '</div>';
				break;
			case 'twothird_onethird':
				echo '<div class="col-md-8 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot1' );
				echo '</div>';
				echo '<div class="col-md-4 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot2' );
				echo '</div>';
				break;
			case 'onethird_twothird':
				echo '<div class="col-md-4 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot1' );
				echo '</div>';
				echo '<div class="col-md-8 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot2' );
				echo '</div>';
				break;
			case 'onefourth_onefourth_onefourth_onefourth':
				echo '<div class="col-md-3 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot1' );
				echo '</div>';
				echo '<div class="col-md-3 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot2' );
				echo '</div>';
				echo '<div class="col-md-3 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot3' );
				echo '</div>';
				echo '<div class="col-md-3 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot4' );
				echo '</div>';
				break;
			case 'threefourth_onefourth':
				echo '<div class="col-md-9 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot1' );
				echo '</div>';
				echo '<div class="col-md-3 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot2' );
				echo '</div>';
				break;
			case 'onefourth_threefourth':
				echo '<div class="col-md-3 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot1' );
				echo '</div>';
				echo '<div class="col-md-9 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot2' );
				echo '</div>';
				break;
			case 'onesixth_onesixth_onesixth_onesixth_onesixth_onesixth':
				echo '<div class="col-md-2 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot1' );
				echo '</div>';
				echo '<div class="col-md-2 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot2' );
				echo '</div>';
				echo '<div class="col-md-2 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot3' );
				echo '</div>';
				echo '<div class="col-md-2 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot4' );
				echo '</div>';
				echo '<div class="col-md-2 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot5' );
				echo '</div>';
				echo '<div class="col-md-2 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot6' );
				echo '</div>';
				break;
			case 'fivesixth_onesixth':
				echo '<div class="col-md-10 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot1' );
				echo '</div>';
				echo '<div class="col-md-2 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot2' );
				echo '</div>';
				break;
			case 'onesixth_fivesixth':
				echo '<div class="col-md-2 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot1' );
				echo '</div>';
				echo '<div class="col-md-10 widget-area sbar" role="complementary">';
				dynamic_sidebar( 'widget_fot2' );
				echo '</div>';
				break;
		endswitch;
	echo '</div>';
	}
add_action( 'ktz_mainfooter', 'ktz_mainfooter' );
endif;

/* 
* Function sub footer for credits or copyright text
*/
if ( !function_exists( 'ktz_subfooter' ) ) :
function ktz_subfooter() {
	echo '<div class="footercredits pull-left">' . ot_get_option('ktz_footcredits') . '</div>';
	}
add_action( 'ktz_subfooter', 'ktz_subfooter' );
endif;

if ( !function_exists( 'ktz_subfooter_squeeze' ) ) :
function ktz_subfooter_squeeze() {
	echo ot_get_option('ktz_footcredits');
	}
add_action( 'ktz_subfooter_squeeze', 'ktz_subfooter_squeeze' );
endif;