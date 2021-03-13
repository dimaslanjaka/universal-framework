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
* ADD TABLE SQL FUNCTION
*/
function ktzTableName() {
	global $wpdb;
	return $wpdb->prefix . 'ktz_stars_votes';
}

function ktzcreate_table() {
	global $wpdb;
	$table = ktzTableName();
	$sql = "CREATE TABLE IF NOT EXISTS $table (
			`voter_ip` VARCHAR(15) NOT NULL,
			`post_id` BIGINT(20) UNSIGNED NOT NULL,
			KEY `post_id`(`post_id`),
			KEY `voter_ip`(`voter_ip`));";
	$wpdb->query($sql);
}
add_action( 'after_switch_theme', 'ktzcreate_table' );

function ktzVote($post_id, $voter_ip) {
	global $wpdb;
	$table = ktzTableName();
	return $wpdb->get_row($wpdb->prepare("SELECT `post_id` FROM $table WHERE `voter_ip` = %s AND `post_id` = %d LIMIT 0, 1", $voter_ip, $post_id));
}
function kztCookieName($post_id) {
		return 'ktz_sr_' . $post_id;
}
function ktz_handle_vote() {
	global $wpdb;
	$table = ktzTableName();
	// Support for older wp versions
	if( ! defined('YEAR_IN_SECONDS') ) {
		define('YEAR_IN_SECONDS', 365 * 24 * 60 * 60);
	}
	$post_id = intval(@$_POST['post_id']);
	$rating = intval(@$_POST['rating']);
	$IP = isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'];
	$cookie_name = kztCookieName($post_id);
	if( isset($_COOKIE[$cookie_name]) || ktzVote($post_id, $IP) !== null) {
		setcookie( $cookie_name, 'true', time() + YEAR_IN_SECONDS, '/');
		die(json_encode(array('status' => 0)));
	}
	$current_rating = intval(get_post_meta($post_id, 'ktz_stars_rating', true));
	$current_votes = intval(get_post_meta($post_id, 'ktz_stars_rating_count', true));
	if( (empty($current_rating) && $current_rating !== 0) || (empty($current_votes) && $current_votes !== 0) || $rating > 5 || $rating < 1) {
		die(json_encode(array(
			'status' => 2,
			'current_votes' => $current_votes,
			'current_rating' => $current_rating
		)));
	}
	update_post_meta($post_id, 'ktz_stars_rating', $current_rating + $rating);
	update_post_meta($post_id, 'ktz_stars_rating_count', $current_votes + 1);
	$wpdb->insert(
		$table,
		array(
			'voter_ip' => $IP,
			'post_id' => $post_id
		),
		array('%s', '%d')
	);
	setcookie( $cookie_name, 'true', time() + YEAR_IN_SECONDS, '/');
	die(json_encode(array(
		'status' => 1,
		'votes' => $current_votes + 1,
		'total' => $current_rating + $rating,
		'result' => ($current_rating + $rating) / ($current_votes + 1)
	)));
}
add_action('wp_ajax_ktz_stars_rating','ktz_handle_vote');
add_action('wp_ajax_nopriv_ktz_stars_rating','ktz_handle_vote');

/*
* DISPLAY AJAX STAR RATE FUNCTION
*/
if ( !function_exists('ktz_ajaxstar_SEO') ) :
function ktz_ajaxstar_SEO() {
	global $post;
	$rating = get_post_meta($post->ID, 'ktz_stars_rating', true);
	$votes = get_post_meta($post->ID, 'ktz_stars_rating_count', true);
	if( $rating === '' ) {
		$rating = 5;
		add_post_meta($post->ID, 'ktz_stars_rating', 1);
	}
	if( $votes === '' ) {
		$votes = 1;
		add_post_meta($post->ID, 'ktz_stars_rating_count', 1);
	}
	$votes = intval($votes);
	$rating = intval($rating);
	if( $votes === 0 ) {
		$result = 5;
	} else {
		$result = $rating / $votes;
	}
	echo '<div class="ktz-stars-outer">';
	echo '<span class="ktz-rate-title">Rate[<span class="ktz-stars-rating-value rating">';
	echo is_int($result) ? $result : number_format($result, 2);
	echo '</span>/<span class="ktz-stars-rating-count votes">' . $votes . '</span>]:</span>';
	echo '<div class="ktz-stars-wrapper" data-post-id="';
	echo $post->ID;
	echo '">';
	echo '<div class="ktz-stars-overlay" style="width:' . (100 - $result * 100 / 5) . '%"></div>';
	echo '<a href="#" data-value="1" title="1/5">&#9733;</a>';
	echo '<a href="#" data-value="2" title="2/5">&#9733;</a>';
	echo '<a href="#" data-value="3" title="3/5">&#9733;</a>';
	echo '<a href="#" data-value="4" title="4/5">&#9733;</a>';
	echo '<a href="#" data-value="5" title="5/5">&#9733;</a>';
	echo '</div>';
	echo '<div class="ktz-stars-value">';
	echo '<span class="item">';
	echo '<a href="' . get_permalink() . '" class="fn url" title="' . get_the_title() . '">' . get_the_title() . '</a>,';
	echo '</span>';
	echo '<span class="ktz-stars-rating-value rating">';
	echo is_int($result) ? $result : number_format($result, 2);
	echo '</span> / <span>5</span> (<span class="ktz-stars-rating-count votes">' .  $votes . '</span>' . __('votes', 'ktz_theme_textdomain') . ')';
	echo '</div>';
	echo '</div>';
	echo '<noscript>' . __('You need to enable JavaScript to vote', 'ktz_theme_textdomain') . '</noscript>';
	}
endif;
/*
Display in widget
*/
if ( !function_exists('ktz_ajaxstar_SEO_widget') ) :
function ktz_ajaxstar_SEO_widget() {
	global $post;
	$rating = get_post_meta($post->ID, 'ktz_stars_rating', true);
	$votes = get_post_meta($post->ID, 'ktz_stars_rating_count', true);
	if( $rating === '' ) {
		$rating = 5;
		add_post_meta($post->ID, 'ktz_stars_rating', 5);
	}
	if( $votes === '' ) {
		$votes = 1;
		add_post_meta($post->ID, 'ktz_stars_rating_count', 1);
	}
	$votes = intval($votes);
	$rating = intval($rating);
	if( $votes === 0 ) {
		$result = 5;
	} else {
		$result = $rating / $votes;
	}
	echo '<div class="ktz-stars-outer ktz-star-widget">';
	echo '<div class="ktz-stars-wrapper" data-post-id="';
	echo $post->ID;
	echo '">';
	echo '<div class="ktz-stars-overlay" style="width:' . (100 - $result * 100 / 5) . '%"></div>';
	echo '<a href="#" data-value="1" title="1/5">&#9733;</a>';
	echo '<a href="#" data-value="2" title="2/5">&#9733;</a>';
	echo '<a href="#" data-value="3" title="3/5">&#9733;</a>';
	echo '<a href="#" data-value="4" title="4/5">&#9733;</a>';
	echo '<a href="#" data-value="5" title="5/5">&#9733;</a>';
	echo '</div>';
	echo '<div class="ktz-stars-value">';
	echo '<span class="item">';
	echo '<a href="' . get_permalink() . '" class="fn url" title="' . get_the_title() . '">' . get_the_title() . '</a>,';
	echo '</span>';
	echo '<span class="ktz-stars-rating-value rating">';
	echo is_int($result) ? $result : number_format($result, 2);
	echo '</span> / <span>5</span> (<span class="ktz-stars-rating-count votes">' .  $votes . '</span>' . __('votes', 'ktz_theme_textdomain') . ')';
	echo '</div>';
	echo '</div>';
	echo '<noscript>' . __('You need to enable JavaScript to vote', 'ktz_theme_textdomain') . '</noscript>';
	}
endif;
/*
Display in widget
*/
if ( !function_exists('ktz_ajaxstar_SEO_single') ) :
function ktz_ajaxstar_SEO_single() {
	global $post;
	$rating = get_post_meta($post->ID, 'ktz_stars_rating', true);
	$votes = get_post_meta($post->ID, 'ktz_stars_rating_count', true);
	if( $rating === '' ) {
		$rating = 5;
		add_post_meta($post->ID, 'ktz_stars_rating', 5);
	}
	if( $votes === '' ) {
		$votes = 1;
		add_post_meta($post->ID, 'ktz_stars_rating_count', 1);
	}
	$votes = intval($votes);
	$rating = intval($rating);
	if( $votes === 0 ) {
		$result = 5;
	} else {
		$result = $rating / $votes;
	}
	echo '<div class="ktz-stars-outer ktz-star-single hreview-aggregate">';
	echo '<div class="ktz-stars-wrapper" data-post-id="';
	echo $post->ID;
	echo '">';
	echo '<div class="ktz-stars-overlay" style="width:' . (100 - $result * 100 / 5) . '%"></div>';
	echo '<a href="#" data-value="1" title="1/5">&#9733;</a>';
	echo '<a href="#" data-value="2" title="2/5">&#9733;</a>';
	echo '<a href="#" data-value="3" title="3/5">&#9733;</a>';
	echo '<a href="#" data-value="4" title="4/5">&#9733;</a>';
	echo '<a href="#" data-value="5" title="5/5">&#9733;</a>';
	echo '</div>';
	echo '<div class="ktz-stars-value">';
	echo '<span class="item">';
	echo '<a href="' . get_permalink() . '" class="fn url" title="' . get_the_title() . '">' . get_the_title() . '</a>,';
	echo '</span>';
	echo '<span class="ktz-stars-rating-value rating" itemprop="ratingValue">';
	echo is_int($result) ? $result : number_format($result, 2);
	echo '</span> / <span>5</span> ( <span class="ktz-stars-rating-count votes" itemprop="ratingCount">' .  $votes . '</span>' . __('votes', 'ktz_theme_textdomain') . ' )';
	echo '</div>';
	echo '</div>';
	echo '<noscript>' . __('You need to enable JavaScript to vote', 'ktz_theme_textdomain') . '</noscript>';
	}
add_action( 'ktz_ajaxstar_SEO_single', 'ktz_ajaxstar_SEO_single' );
endif;

/* 
SET cookie functions / add action via wp_ajax_
*/
function ktz_setcookie() {
	global $post;
	$thepost_id = get_the_ID();
	$dlgroup = (isset($_REQUEST["dlgroup"])) ? $_REQUEST["dlgroup"] : '';
	$href = (isset($_REQUEST["href"])) ? $_REQUEST["href"] : '';
	$cookiehash = md5($href);
	setcookie('ktz_cookie_'.$cookiehash, 'downloaded_'.$thepost_id, time()+60*60*24*365, '/');
	die();
}
add_action('wp_ajax_ktz_setcookie', 'ktz_setcookie');
add_action('wp_ajax_nopriv_ktz_setcookie', 'ktz_setcookie');