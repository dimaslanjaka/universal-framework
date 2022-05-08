<?php
/*
 * Plugin Name:Wordpress Auto Spinner - Post Rewriter
 * Plugin URI: http://codecanyon.net/item/wordpress-auto-spinner-articles-rewriter/4092452?ref=ValvePress
 * Description: Automatically rewrite your articles to create fresh content.
 * Version: 3.8.2
 * Author: ValvePress
 * Author URI: http://codecanyon.net/user/ValvePress/portfolio?ref=ValvePress
 */

/* Copyright 2012-2018 Wordpress Auto Spinner - Wordpress Rewriter Plugin (email : sweetheatmn@gmail.com) */
define ( 'WP_VALVE_PROXY', false );

/*
 * Editor stylesheets
 */
function wp_auto_spinner_mce_css($mce_css) {
	if (! empty ( $mce_css ))
		$mce_css .= ',';
	
	$mce_css .= plugins_url ( 'css/style.editor.css', __FILE__ );
	
	return $mce_css;
}

add_filter ( 'mce_css', 'wp_auto_spinner_mce_css' );

/*
 * ------------------------------------------------------------------------*
 * Function Selected
 * ------------------------------------------------------------------------
 */
if (! function_exists ( 'opt_selected' )) {
	function opt_selected($src, $val) {
		if (trim ( $src ) == trim ( $val ))
			echo ' selected="selected" ';
	}
}

/* Add a new meta box to the admin menu. */
add_action ( 'admin_menu', 'wp_auto_spinner_create_meta_box' );

/**
 * Function for adding meta boxes to the admin.
 */
function wp_auto_spinner_create_meta_box() {
	$wp_spinner_types = get_option ( 'wp_spinner_types', array (
			'post',
			'product' 
	) );
	
	foreach ( $wp_spinner_types as $type ) {
		
		add_meta_box ( 'wp_auto_spinner-meta-boxes', 'Wordpress Auto Spinner ', 'wp_auto_spinner_meta_boxes', $type, 'normal', 'high' );
	}
}
function wp_auto_spinner_meta_boxes() {
	require_once ('meta.php');
	wp_auto_spinner_metabox ();
}
 


/**
 * Function for adding header style sheets and js
 */
function wp_auto_spinner_admin_head() {
	echo '<link rel="stylesheet" type="text/css" href="' . plugins_url ( 'css/style.wpautospinner.css', __FILE__ ) . '" />';
	echo '<script src="' . plugins_url ( 'js/main.wpautospinner.js?v=1.8.0', __FILE__ ) . '" type="text/javascript"></script>';
}
add_action ( 'admin_head-post-new.php', 'wp_auto_spinner_admin_head' );
add_action ( 'admin_head-post.php', 'wp_auto_spinner_admin_head' );
function wp_auto_spinner_load_custom_admin_styles() {
	wp_register_style ( 'wp_auto_spinner_custom_dashicons', plugins_url ( 'css/dashicon-styles.css', __FILE__ ), false, '1.0.0' );
	wp_enqueue_style ( 'wp_auto_spinner_custom_dashicons' );
}

add_action ( 'admin_enqueue_scripts', 'wp_auto_spinner_load_custom_admin_styles' );

// settings page
function wp_auto_spinner_admin_head_options() {
	echo '<link rel="stylesheet" type="text/css" href="' . plugins_url ( 'css/style.wpautospinner.css', __FILE__ ) . '">';
	echo '<script src="' . plugins_url ( 'js/options.wpautospinner.js', __FILE__ ) . '" type="text/javascript"></script>';
}
add_action ( 'admin_head-wp_auto_spinner_settings', 'wp_auto_spinner_admin_head_options' );

// synonyms page
function wp_auto_spinner_admin_head_synonyms() {
	echo '<link rel="stylesheet" type="text/css" href="' . plugins_url ( 'css/synonyms.wpautospinner.css', __FILE__ ) . '">';
	echo '<script src="' . plugins_url ( 'js/synonyms.wpautospinner.js', __FILE__ ) . '" type="text/javascript"></script>';
}
function wp_auto_spinner_admin_head_thesaurus() {
	echo '<link rel="stylesheet" type="text/css" href="' . plugins_url ( 'css/synonyms.wpautospinner.css', __FILE__ ) . '">';
	echo '<script src="' . plugins_url ( 'js/thesaurus.wpautospinner.js', __FILE__ ) . '" type="text/javascript"></script>';
}

// edit page
add_action ( 'admin_print_scripts-' . 'edit.php', 'wp_auto_spinner_admin_edit' );

// bulk pin scripts
function wp_auto_spinner_admin_edit() {
	wp_enqueue_script ( 'wp_auto_spinner_bulk_spin', plugins_url ( '/js/bulk-spin.js', __FILE__ ) );
}

/*
 * Function to add menu settings page
 */
add_action ( 'admin_menu', 'wp_auto_spinner_control_menu' );
function wp_auto_spinner_control_menu() {
	// add_submenu_page('options-general.php', 'wp_auto_spinner-control', 'wp_auto_spinner control', 'manage_options', 'wp_auto_spinner-control-menu', 'wp_auto_spinner_control_options');
	// add_menu_page( 'WP spinner Synonyms', 'WP Spinner', 'administrator', 'wp_auto_spinner', 'wp_auto_spinner_synonyms_fn', plugins_url('images/spin.png',__FILE__), 77777787777777 );
	add_menu_page ( 'WP spinner Synonyms', 'Auto Spinner', 'administrator', 'wp_auto_spinner', 'wp_auto_spinner_synonyms_fn', 'dashicons-wp-spinner-pencil-square-o', 77777787777777 );
	
	$synonymsSlug = add_submenu_page ( 'wp_auto_spinner', 'Wp Auto Spinner synonyms', 'Thesaurus', 'administrator', 'wp_auto_spinner', 'wp_auto_spinner_synonyms_fn' );
	add_action ( 'admin_head-' . $synonymsSlug, 'wp_auto_spinner_admin_head_synonyms' );
	
	$synonymsSlug = add_submenu_page ( 'wp_auto_spinner', 'Wp Auto Spinner custom thesaurus', 'My thesaurus', 'administrator', 'wp_auto_spinner_thesaurus', 'wp_auto_spinner_thesaurus' );
	add_action ( 'admin_head-' . $synonymsSlug, 'wp_auto_spinner_admin_head_thesaurus' );
	
	add_submenu_page ( 'wp_auto_spinner', 'Wp Auto Spinner settings', 'Settings', 'administrator', 'wp_auto_spinner_settings', 'wp_auto_spinner_fn' );
	
	$queueSlug = add_submenu_page ( 'wp_auto_spinner', 'Wp Auto Spinner Spinning Queue', 'Queue', 'administrator', 'wp_auto_spinner_queue', 'wp_auto_spinner_queue' );
	add_action ( 'admin_head-' . $queueSlug, 'wp_auto_spinner_admin_head_log' );
	
	$logSlug = add_submenu_page ( 'wp_auto_spinner', 'Wp Auto Spinner Log', 'Log', 'administrator', 'wp_auto_spinner_log', 'wp_auto_spinner_log' );
	add_action ( 'admin_head-' . $logSlug, 'wp_auto_spinner_admin_head_log' );
}
function wp_auto_spinner_admin_head_log() {
	echo '<link rel="stylesheet" type="text/css" href="' . plugins_url ( 'css/style.log.css', __FILE__ ) . '">';
	echo '<script src="' . plugins_url ( 'js/log.js', __FILE__ ) . '" type="text/javascript"></script>';
}
function wp_auto_spinner_synonyms_fn() {
	require_once (dirname ( __FILE__ ) . '/synonyms.php');
	wp_auto_spinner_synonyms ();
}
function wp_auto_spinner_thesaurus() {
	require_once (dirname ( __FILE__ ) . '/thesaurus.php');
	wp_auto_spinner_thesaurus_f ();
}
function wp_auto_spinner_queue() {
	require_once (dirname ( __FILE__ ) . '/spinner_queue.php');
	wp_auto_spinner_queue_fn ();
}
function wp_auto_spinner_fn() {
	require_once (dirname ( __FILE__ ) . '/options.php');
	wp_auto_spinner_settings ();
}

/**
 * Filter the content to check if the post is spinned or not if not spinned let's spin it.
 */
// add_filter( 'the_title', 'wp_auto_spinner_the_content_filter', 20 );
// add_filter( 'the_title_rss', 'wp_auto_spinner_the_content_filter_rss', 20 );
function wp_auto_spinner_the_content_filter($post_id) {
	
	// read post
	global $post;
	
	// check if auto spin is enabled or not
	$autospin = get_option ( 'wp_auto_spin', array () );
	if (! in_array ( 'OPT_AUTO_SPIN_ACTIVE', $autospin )) {
		return $title;
	}
	
	// check if single post
	if (1) {
		
		// check if spinned or not
		
		$post_arr = get_post ( $post_id );
		if ($spinned == 'spinned') {
			return $title;
		}
		
		// ok it is not spinned check if manual spinning disabled
		if (! in_array ( 'OPT_AUTO_SPIN_ACTIVE_MANUAL', $autospin )) {
			// now manual spining is active let's check if this is a manual
			$manual = get_post_meta ( $post_id, 'wp_auto_spinner_manual_flag', 1 );
			if ($manual == 'manual') {
				// manual post and manual is active should be spinned
				return $title;
			}
		}
		
		// check if deserve spin or in execluded category
		$execl = get_option ( 'wp_auto_spin_execl', array () );
		if (! in_category ( $execl, $post_id )) {
			
			// SPIN THE POST
			$content = $post_arr->post_content;
			$ttl = $post_arr->post_title;
			$originalcontent = $content;
			
			// classes
			require_once (dirname ( __FILE__ ) . '/inc/class.spin.php');
			require_once (dirname ( __FILE__ ) . '/inc/class.spintax.php');
			
			$spin = new wp_auto_spin_spin ( $post_id, $ttl, $content );
			$spinned = $spin->spin ();
			$spinned_ttl = $spinned ['spinned_ttl'];
			$spinned_cnt = $spinned ['spinned_cnt'];
			$spintaxed_ttl = $spinned ['spintaxed_ttl'];
			$spintaxed_cnt = $spinned ['spintaxed_cnt'];
			$content = $spintaxed_cnt;
			$post->post_content = $content;
			
			// update the post
			$my_post = array ();
			$my_post ['ID'] = $post_id;
			$my_post ['post_content'] = $content;
			
			// check if we should updat the slug .
			if (in_array ( 'OPT_AUTO_SPIN_SLUG', $autospin )) {
				$my_post ['post_name'] = '';
			}
			
			// update spinned title if allowed
			if (in_array ( 'OPT_AUTO_SPIN_ACTIVE_TTL', $autospin )) {
				
				$my_post ['post_title'] = $spintaxed_ttl;
				$post->post_title = $spintaxed_ttl;
			} else {
			}
			
			// update it's status to spined
			update_post_meta ( $post_id, 'wp_auto_spinner_spinned_flag', 'spinned' );
			
			wp_auto_spinner_log_new ( 'Already Posted Post >> Do Spin', 'Post with id {' . $post_id . '} is already posted but eligiable to be spinned . spinned successfully .' );
			
			// Update the post into the database
			remove_filter ( 'content_save_pre', 'wp_filter_post_kses' );
			wp_update_post ( $my_post );
			add_filter ( 'content_save_pre', 'wp_filter_post_kses' );
			
			if (in_array ( 'OPT_AUTO_SPIN_ACTIVE_TTL', $autospin )) {
				
				return $spintaxed_ttl;
			} else {
				
				return $title;
			}
		} else {
			
			return $title;
		}
	} else {
		
		return $title;
	}
} // end filtering
function wp_auto_spinner_the_content_filter_rss($title) {
	global $post;
	
	// check if auto spin is enabled or not
	$autospin = get_option ( 'wp_auto_spin', array () );
	
	if (! in_array ( 'OPT_AUTO_SPIN_ACTIVE', $autospin )) {
		return $title;
	}
	
	if (1) {
		
		// check if spinned or not
		$post_id = get_the_id ();
		
		$spinned = get_post_meta ( $post_id, 'wp_auto_spinner_spinned_flag', 1 );
		
		// get the post
		
		$post_arr = get_post ( $post_id );
		
		if ($spinned == 'spinned') {
			
			return $title;
		}
		
		// check if deserve spin or not
		$execl = get_option ( 'wp_auto_spin_execl', array () );
		
		if (! in_category ( $execl, $post_id )) {
			
			// let's spin this post
			
			$content = $post_arr->post_content;
			$ttl = $post_arr->post_title;
			$originalcontent = $content;
			
			require_once (dirname ( __FILE__ ) . '/inc/class.spin.php');
			require_once (dirname ( __FILE__ ) . '/inc/class.spintax.php');
			
			$spin = new wp_auto_spin_spin ( $post_id, $ttl, $content );
			
			$spinned = $spin->spin ();
			
			$spinned_ttl = $spinned ['spinned_ttl'];
			$spinned_cnt = $spinned ['spinned_cnt'];
			$spintaxed_ttl = $spinned ['spintaxed_ttl'];
			$spintaxed_cnt = $spinned ['spintaxed_cnt'];
			
			$content = $spintaxed_cnt;
			
			$post->post_content = $content;
			
			// update the post
			$my_post = array ();
			$my_post ['ID'] = $post_id;
			$my_post ['post_content'] = $content;
			
			// update spinned title if allowed
			if (in_array ( 'OPT_AUTO_SPIN_ACTIVE_TTL', $autospin )) {
				$my_post ['post_title'] = $spintaxed_ttl;
				$post->post_title = $spintaxed_ttl;
			}
			
			// check if we should updat the slug .
			if (in_array ( 'OPT_AUTO_SPIN_SLUG', $autospin )) {
				$my_post ['post_name'] = '';
			}
			
			// update it's status to spined
			update_post_meta ( $post_id, 'wp_auto_spinner_spinned_flag', 'spinned' );
			
			wp_auto_spinner_log_new ( 'Already Posted Post >> Do Spin', 'Post with id {' . $post_id . '} is already posted but eligiable to be spinned . spinned successfully .' );
			
			// Update the post into the database
			remove_filter ( 'content_save_pre', 'wp_filter_post_kses' );
			wp_update_post ( $my_post );
			add_filter ( 'content_save_pre', 'wp_filter_post_kses' );
			
			if (in_array ( 'OPT_AUTO_SPIN_ACTIVE_TTL', $autospin )) {
				
				return $spintaxed_ttl;
			} else {
				
				return $title;
			}
		} else {
			
			return $title;
		}
	} else {
		
		return $title;
	}
} // end filtering

$wp_spinner_types = get_option ( 'wp_spinner_types', array (
		'post',
		'product' 
) );

foreach ( $wp_spinner_types as $type ) {
	
	add_action ( 'publish_' . $type, 'wp_auto_spinner_publish', 1 );
}

// SPIN ON PUBLISH
function wp_auto_spinner_publish($post_id) {
	
	// if quick edit mode ignore it .
	if (isset ( $_SERVER ['HTTP_REFERER'] ) && stristr ( $_SERVER ['HTTP_REFERER'], 'edit.php' ))
		return;
	
	// check if an edit of an original post
	if (isset ( $_POST ['save'] ) && trim ( $_POST ['save'] != 'editpost' )) {
		return;
	}
	
	global $post;
	
	// check if already checked if yes return
	$checked = get_post_meta ( $post_id, 'wp_auto_spinner_checked', 1 );
	
	if (trim ( $checked ) != '')
		return;
	
	// set checked flag to yes
	update_post_meta ( $post_id, 'wp_auto_spinner_checked', 'yes' );
	
	// INSTANT SPIN : manual + manual spin enabled or auto + auto spin enabled + spin on publish enabled
	$autospin = get_option ( 'wp_auto_spin', array () );
	
	if ((isset ( $_POST ['publish'] ) && in_array ( 'OPT_AUTO_SPIN_ACTIVE_MANUAL', $autospin )) || (! isset ( $_POST ['publish'] )) && in_array ( 'OPT_AUTO_SPIN_ACTIVE', $autospin ) && in_array ( 'OPT_AUTO_SPIN_PUBLISH', $autospin )) {
		
		// INSTANT SPIN
		wp_auto_spinner_log_new ( 'New Post >> Publish', 'New post with id {' . $post_id . '} is going to be published and deserve spinning' );
		
		$execl = get_option ( 'wp_auto_spin_execl', array () );
		
		if (in_category ( $execl, $post_id )) {
			
			wp_auto_spinner_log_new ( 'New Post >> Cancel Spin', 'Post in an execluded from spinning category . ignore post .' );
			return;
		} else {
			wp_auto_spinner_post_spin ( $post_id );
		}
	} elseif (! isset ( $_POST ['publish'] ) && in_array ( 'OPT_AUTO_SPIN_ACTIVE', $autospin )) {
		
		// SCHEDULED SPIN
		wp_auto_spinner_log_new ( 'New Post >> Publish', 'New post with id {' . $post_id . '} is going to be published sent to spin queue' );
		
		// add the scheduled spin meta
		update_post_meta ( $post_id, 'wp_auto_spinner_scheduled', 'yes' );
	}
	
	return;
	
	// Manual post check
	if (isset ( $_POST ['publish'] )) {
		update_post_meta ( $post_id, 'wp_auto_spinner_manual_flag', 'manual' );
	}
	
	// if publish action disabled return
	$opt = get_option ( 'wp_auto_spin', array () );
	if (! in_array ( 'OPT_AUTO_SPIN_PUBLISH', $opt ))
		return;
	
	// get the post
	$post_arr = get_post ( $post_id );
	
	// if no spin shortcode exists
	if (stristr ( $post_arr->post_content, '{nospin}' )) {
		echo ' post contains no spin tag';
	}
	
	wp_auto_spinner_log_new ( 'New Post >> Publish', 'New post with id {' . $post_id . '} is going to be published' );
	
	// check if auto spin is enabled or not
	$autospin = get_option ( 'wp_auto_spin', array () );
	if (! in_array ( 'OPT_AUTO_SPIN_ACTIVE', $autospin )) {
		wp_auto_spinner_log_new ( 'New Post >> Cancel Spin', 'Automated spinning is disabled . ignore post .' );
		return;
	}
	
	// check if it is already spinned checked
	$spinned = get_post_meta ( $post_id, 'wp_auto_spinner_spinned_flag', 1 );
	if ($spinned == 'spinned') {
		
		wp_auto_spinner_log_new ( 'New Post >> Cancel Spin', 'Post {' . $post_id . '} already passed spinning filter . ignore it' );
		
		return;
	}
	
	// check if it is manual and manual spin disabled
	if (isset ( $_POST ['publish'] )) {
		if (! in_array ( 'OPT_AUTO_SPIN_ACTIVE_MANUAL', $autospin )) {
			update_post_meta ( $post_id, 'wp_auto_spinner_spinned_flag', true );
			wp_auto_spinner_log_new ( 'New Post >> Cancel Spin', 'Manual post and manual posts spinning disabled . ignore post .' );
			return;
		}
	}
	
	// check if deserve spin or not
	$execl = get_option ( 'wp_auto_spin_execl', array () );
	
	if (in_category ( $execl, $post_id )) {
		
		wp_auto_spinner_log_new ( 'New Post >> Cancel Spin', 'Post in an execluded from spinning category . ignore post .' );
		return;
	}
	
	// let's spin this post
	
	$content = $post_arr->post_content;
	$ttl = $post_arr->post_title;
	$originalcontent = $content;
	
	// spin libs
	require_once (dirname ( __FILE__ ) . '/inc/class.spin.php');
	require_once (dirname ( __FILE__ ) . '/inc/class.spintax.php');
	
	// spin start
	$spin = new wp_auto_spin_spin ( $post_id, $ttl, $content );
	$spinned = $spin->spin ();
	
	// spinned cnt
	$spinned_ttl = $spinned ['spinned_ttl'];
	$spinned_cnt = $spinned ['spinned_cnt'];
	$spintaxed_ttl = $spinned ['spintaxed_ttl'];
	$spintaxed_cnt = $spinned ['spintaxed_cnt'];
	$content = $spintaxed_cnt;
	
	// update the post
	$my_post = array ();
	$my_post ['ID'] = $post_id;
	$my_post ['post_content'] = $content;
	
	// update spinned title if allowed
	if (in_array ( 'OPT_AUTO_SPIN_ACTIVE_TTL', $autospin )) {
		$my_post ['post_title'] = $spintaxed_ttl;
		@$post->post_title = $spintaxed_ttl;
	}
	
	// check if we should updat the slug .
	if (in_array ( 'OPT_AUTO_SPIN_SLUG', $autospin )) {
		$my_post ['post_name'] = '';
	}
	
	// update it's status to spined
	update_post_meta ( $post_id, 'wp_auto_spinner_spinned_flag', 'spinned' );
	
	wp_auto_spinner_log_new ( 'New Post >> Do Spin', 'Post with id {' . $post_id . '} spinned successfully .' );
	
	// Update the post into the database
	remove_filter ( 'content_save_pre', 'wp_filter_post_kses' );
	wp_update_post ( $my_post );
	add_filter ( 'content_save_pre', 'wp_filter_post_kses' );
}

/*
 * Spin this post function
 * @post_id: post id to spin
 * return : none
 */
function wp_auto_spinner_post_spin($post_id) {
	 
	
	// let's spin this post
	// get the post
	$post_arr = get_post ( $post_id );
	
	// spin options
	$autospin = get_option ( 'wp_auto_spin', array () );
	
	$content = $post_arr->post_content;
	$ttl = $post_arr->post_title;
	$originalcontent = $content;
	
	// spin libs
	require_once (dirname ( __FILE__ ) . '/inc/class.spin.php');
	require_once (dirname ( __FILE__ ) . '/inc/class.spintax.php');
	
	// spin start
	$spin = new wp_auto_spin_spin ( $post_id, $ttl, $content );
	$spinned = $spin->spin_wrap ();
	
	// spinned cnt
	$spinned_ttl = $spinned ['spinned_ttl'];
	$spinned_cnt = $spinned ['spinned_cnt'];
	$spintaxed_ttl = $spinned ['spintaxed_ttl'];
	$spintaxed_cnt = $spinned ['spintaxed_cnt'];
	$content = $spintaxed_cnt;
	
	// update the post
	$my_post = array ();
	$my_post ['ID'] = $post_id;
	
	if (! in_array ( 'OPT_AUTO_SPIN_DEACTIVE_CNT', $autospin )) {
		$my_post ['post_content'] = $content;
	}
	
	// update spinned title if allowed
	if (in_array ( 'OPT_AUTO_SPIN_ACTIVE_TTL', $autospin )) {
		$my_post ['post_title'] = $spintaxed_ttl;
	}
	
	// check if we should updat the slug .
	if (in_array ( 'OPT_AUTO_SPIN_SLUG', $autospin )) {
		$my_post ['post_name'] = '';
	}
	
	wp_auto_spinner_log_new ( 'New Post >> Do Spin', 'Post with id {' . $post_id . '} spinned successfully .' );
	
	remove_filter ( 'content_save_pre', 'wp_filter_post_kses' );
	
	wp_update_post ( $my_post );
	// add_filter('content_save_pre', 'wp_filter_post_kses');
}

/*
 * differ if the post is manually spinned or not by saving
 */
add_action ( 'save_post', 'wp_auto_spinner_save_meta_data' );
function wp_auto_spinner_save_meta_data($post_id) {
	
	// SCHEDULED POSTS TO QUEUE
	if (! wp_is_post_revision ( $post_id )) {
		
		$publish = (isset ( $_POST ['post_status'] )) ? $_POST ['post_status'] : '';
		
		$autospin = get_option ( 'wp_auto_spin', array () );
		
		if ((trim ( $publish ) == 'publish' && isset ( $_POST ['post_date'] ))) {
			// this is a scheduled post let's schedule for spin if eligible
			
			// check if already checked if yes return
			$checked = get_post_meta ( $post_id, 'wp_auto_spinner_checked', 1 );
			
			if (trim ( $checked ) != '')
				return;
			
			// set checked flag to yes
			update_post_meta ( $post_id, 'wp_auto_spinner_checked', 'yes' );
			
			// if manual enabled schedule
			if (in_array ( 'OPT_AUTO_SPIN_ACTIVE_MANUAL', $autospin )) {
				// schedule it manual post spinning enable
				// SCHEDULED SPIN
				wp_auto_spinner_log_new ( 'New Post >> Schedule', 'New scheduled post with id {' . $post_id . '}   sent to spin queue' );
				
				// add the scheduled spin meta
				update_post_meta ( $post_id, 'wp_auto_spinner_scheduled', 'yes' );
			}
			
			// scheduled post
		} else {
			
			// Draft posts
			// SPIN Draft posts
			$status = get_post_status ( $post_id );
			
			if ($status == 'draft' && trim ( $publish ) == '' && in_array ( 'OPT_AUTO_SPIN_DRAFT', $autospin )) {
				
				$spinned_cnt = get_post_meta ( $post_id, 'spinned_cnt', 1 );
				
				if (trim ( $spinned_cnt ) != '')
					return;
				
				wp_auto_spinner_log_new ( 'New Post >>Draft Schedule', 'New draft post with id {' . $post_id . '}   sent to spin queue' );
				
				// add the scheduled spin meta
				update_post_meta ( $post_id, 'wp_auto_spinner_scheduled', 'yes' );
			}
		}
	} // not revision
}

/**
 * custom request for metabox buttons
 */
function wp_auto_spinner_parse_request($wp) {
	
	// only process requests with "my-plugin=ajax-handler"
	if (array_key_exists ( 'wp_auto_spinner', $wp->query_vars )) {
		
		if ($wp->query_vars ['wp_auto_spinner'] == 'ajax') {
			
			require_once ('p_ajax.php');
			exit ();
		} elseif ($wp->query_vars ['wp_auto_spinner'] == 'cron') {
			
			wp_auto_spinner_spin_function ();
			exit ();
		} elseif ($wp->query_vars ['wp_auto_spinner'] == 'test') {
			require_once 'test.php';
			exit ();
		} elseif ($wp->query_vars ['wp_auto_spinner'] == 'backup_synonyms') {
			require_once 'backup_synonyms.php';
			exit ();
		}
	}
}
add_action ( 'parse_request', 'wp_auto_spinner_parse_request' );

add_action ( 'wp_ajax_wp_auto_spinner_ajax', 'wp_auto_spinner_ajax_callback' );
function wp_auto_spinner_ajax_callback() {
	require_once 'p_ajax.php';
	die ();
}
function wp_auto_spinner_query_vars($vars) {
	$vars [] = 'wp_auto_spinner';
	return $vars;
}
add_filter ( 'query_vars', 'wp_auto_spinner_query_vars' );

/*
 * bulk pin ajax
 */
require_once 'asajax.php';

/*
 * LOG PAGE
 */
require_once 'as_log.php';

/*
 * spinner scheduler one post each 30 second
 */
require_once ('spinner_schedule.php');

/*
 * DB TABLES
 */

register_activation_hook ( __FILE__, 'create_table_wp_auto_spinner' );
require_once 'tables.php';

/*
 * custom coulmn spin status
 *
 */

/*
 * $wp_spinner_types = get_option('wp_spinner_types',array('post','product') );
 *
 * foreach ($wp_spinner_types as $type){
 * add_filter('manage_'.$type.'_posts_columns' , 'wp_auto_spinner_posts_columns');
 * }
 *
 *
 * add_action("manage_posts_custom_column", "wp_auto_spinner_columns_display");
 *
 * //add field function
 * function wp_auto_spinner_posts_columns($columns){
 *
 * return array_merge($columns,
 * array('Spin_Status' => 'Spin<br>Status' ));
 *
 * }
 *
 * //display field
 * function wp_auto_spinner_columns_display($coulmn){
 * if($coulmn == 'Spin_Status'){
 * global $post;
 * $post_id=$post->ID;
 *
 * //check if scheduled
 * $sched=get_post_meta($post_id, 'wp_auto_spinner_scheduled', true);
 *
 * if(trim($sched) != ''){
 * echo 'Scheduled';
 * }else{
 *
 * //not scheduled check if spinned
 * $spinned_cnt=get_post_meta($post_id, 'spinned_cnt', true);
 *
 * if( !empty($spinned_cnt) ){
 *
 * echo 'Spinnned';
 *
 * }else{
 * echo '--';
 * }
 *
 * }
 *
 * }
 * }
 *
 */

// nospin shortcode skip
function wp_auto_spinner_nospin_shortcode($atts, $content = null) {
	return $content;
}
add_shortcode ( 'nospin', 'wp_auto_spinner_nospin_shortcode' );

/*
 * deandev widget
 */
require_once 'widget.php';

/*
 * update
 */
require_once 'updated.php';

/*
 * rating
 */
require_once ('rating.php');

/*
 * License
 */
require_once 'aslicense.php';

/*
 * Ajax requests
 */
require_once 'pajax.php';

/**
 * custom sort by length function to sort html founds
 * 
 * @param unknown $a
 * @param unknown $b
 * @return number
 */
function wp_auto_spinner_sort_by_length($a, $b) {
	return strlen ( $b ) - strlen ( $a );
}
 