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

/**
 * IMPORT EXPORT THEME OPTIONS
 */
add_action( 'init', 'register_options_pages' );

/**
 * Registers all the required admin pages.
 */
function register_options_pages() {

  // Only execute in admin & if OT is installed
  if ( is_admin() && function_exists( 'ot_register_settings' ) ) {
    // Register the pages
    ot_register_settings( 
      array(
        array( 
          'id'              => 'import_export',
          'pages'           => array(
            array(
              'id'              => 'import_export',
              'page_title'      => 'Kentooz Options Import/Export',
              'menu_title'      => 'Import export',
              'capability'      => 'edit_theme_options',
              'menu_slug'       => 'kentooz-import-export',
              'icon_url'        => OT_URL . '/assets/images/ktz-logo-mini.png',
			  'position'        => 62,
              'updated_message' => 'Options updated.',
              'reset_message'   => 'Options reset.',
              'button_text'     => 'Save Changes',
              'show_buttons'    => false,
              'contextual_help' => null,
              'sections'        => array(
                array(
                  'id'          => 'kentooz_import_export',
                  'title'       => __( 'Import/Export', 'ktz_theme_textdomain' )
                )
              ),
              'settings'        => array(
                array(
                    'id'          => 'import_data_text',
                    'label'       => 'Import Theme Options',
                    'desc'        => __( 'Theme Options', 'ktz_theme_textdomain' ),
                    'std'         => '',
                    'type'        => 'import-data',
                    'section'     => 'kentooz_import_export',
                    'rows'        => '',
                    'post_type'   => '',
                    'taxonomy'    => '',
                    'class'       => ''
                  ),
                  array(
                    'id'          => 'export_data_text',
                    'label'       => 'Export Theme Options',
                    'desc'        => __( 'Theme Options', 'ktz_theme_textdomain' ),
                    'std'         => '',
                    'type'        => 'export-data',
                    'section'     => 'kentooz_import_export',
                    'rows'        => '',
                    'post_type'   => '',
                    'taxonomy'    => '',
                    'class'       => ''
                  )
              )
            )
          )
        )
      )
    );
  }
}


/**
 * Export Data option type.
 *
 * @return    string
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_type_export_data' ) ) {
  
  function ot_type_export_data() {
    
    /* format setting outer wrapper */
    echo '<div class="format-setting type-textarea simple has-desc">';
      
      /* description */
      echo '<div class="description">';
        
        echo '<p>' . __( 'Export your Theme Options data by highlighting this text and doing a copy/paste into a blank .txt file. Then save the file for importing into another install of WordPress later. Alternatively, you could just paste it into the <code>Import/export->Import</code> <strong>Theme Options</strong> textarea on another web site.', 'option-tree' ) . '</p>';
        
      echo '</div>';
      
      /* get theme options data */
      $data = get_option( ot_options_id() );
      $data = ! empty( $data ) ? ot_encode( serialize( $data ) ) : '';
        
      echo '<div class="format-setting-inner">';
        echo '<textarea rows="10" cols="40" name="export_data" id="export_data" class="textarea">' . $data . '</textarea>';
      echo '</div>';
      
    echo '</div>';
    
  }
  
}

/**
 * Import Data option type.
 *
 * @return    string
 *
 * @access    public
 * @since     2.0
 */
if ( ! function_exists( 'ot_type_import_data' ) ) {
  
  function ot_type_import_data() {
    
    echo '<form method="post" id="import-data-form">';
      
      /* form nonce */
      wp_nonce_field( 'import_data_form', 'import_data_nonce' );
        
      /* format setting outer wrapper */
      echo '<div class="format-setting type-textarea has-desc">';
        
        /* description */
        echo '<div class="description">';
          
          if ( OT_SHOW_SETTINGS_IMPORT ) echo '<p>' . __( 'Only after you\'ve imported the Settings should you try and update your Theme Options.', 'option-tree' ) . '</p>';
          
          echo '<p>' . __( 'To import your Theme Options copy and paste what appears to be a random string of alpha numeric characters into this textarea and press the "Import Theme Options" button.', 'option-tree' ) . '</p>';
          
          /* button */
          echo '<button class="option-tree-ui-button button button-primary right hug-right">' . __( 'Import Theme Options', 'option-tree' ) . '</button>';
          
        echo '</div>';
        
        /* textarea */
        echo '<div class="format-setting-inner">';
          
          echo '<textarea rows="10" cols="40" name="import_data" id="import_data" class="textarea"></textarea>';

        echo '</div>';
        
      echo '</div>';
    
    echo '</form>';
    
  }
  
}


/*
* Add Information theme kentooz
*/
function ktz_let_to_num( $size ) {
    $let = substr( $size, -1 );
	$ret = substr( $size, 0, -1 );
        switch( strtoupper( $let ) ) {
     	case 'P':
     	    $ret *= 1024;
     	case 'T':
     	    $ret *= 1024;
     	case 'G':
     	    $ret *= 1024;
     	case 'M':
     	    $ret *= 1024;
     	case 'K':
     	    $ret *= 1024;
        }
    return $ret;
}

// Get latest themes
function ktz_latest_theme($interval) {
	if( is_admin() ) {
		$cache = 'ktz_cache_xml_latesttheme';
		$notifier_file_url = wp_remote_get( 'http://www.kentooz.com/latest-themes.xml', array( 'timeout' => 120 ) );
		$body     = wp_remote_retrieve_body($notifier_file_url);
		
		// Store remote HTML file in transient, expire after 6 hours
		set_transient( $cache, $body, $interval );
		
		$xml = simplexml_load_string($body); 
		return $xml;
	}
}

function ktz_themes_info() {
	if( is_admin() ) {
		$xml = ktz_latest_theme(11600); // This tells the function to cache the remote call for 21600 seconds (6 hours)
		$kentooz_theme = wp_get_theme();
			$ktzinfotheme = '<div class="format-setting-wrap"><div class="format-setting-label"><h3 class="label"><strong>System Information</strong></h3></div>';
			$ktzinfotheme .= '<ul>';		
			$ktzinfotheme .= '<li><strong>Theme Name:</strong> ' . $kentooz_theme->Name . '</li>';
			$ktzinfotheme .= '<li><strong>Theme Version:</strong> ' . $kentooz_theme->Version . '</li>';
			$ktzinfotheme .= '<li><strong>Author:</strong> ' . $kentooz_theme->get( 'ThemeURI' ) . '</li>';
			$ktzinfotheme .= '<li><strong>Home URL:</strong>' . home_url() . '</li>';
			$ktzinfotheme .= '<li><strong>Site URL:</strong>' . site_url() . '</li>';
			if ( is_multisite() ) {
				$ktzinfotheme .= '<li><strong>WordPress Version:</strong>' . 'WPMU ' . get_bloginfo('version') . '</li>';
			} else {
				$ktzinfotheme .= '<li><strong>WordPress Version:</strong>'. 'WP ' . get_bloginfo('version') . '</li>';	
			}   	
			if ( function_exists( 'phpversion' ) ) {
				$ktzinfotheme .= '<li><strong>PHP Version:</strong>' . esc_html( phpversion() ) . '</li>';
			}
			if (function_exists( 'size_format' )) {
				$ktzinfotheme .= '<li><strong>Memory Limit:</strong>';
				$mem_limit = ktz_let_to_num( WP_MEMORY_LIMIT );
				if ( $mem_limit < 67108864 ) {
					$ktzinfotheme .= '<mark class="error">' . size_format( $mem_limit ) .' - Recommended memory to at least 64MB. Please see: <a href="http://codex.wordpress.org/Editing_wp-config.php#Increasing_memory_allocated_to_PHP" target="_blank">Increasing memory allocated to PHP</a></mark>';
				} else {
					$ktzinfotheme .= '<mark class="yes">' . size_format( $mem_limit ) . '</mark>';
				}
				$ktzinfotheme .= '</li>';
				$ktzinfotheme .= '<li><strong>WP Max Upload Size:</strong>'. size_format( wp_max_upload_size() ) .' - Recommended is 2MB (Find tutorial about it in <a href="https://www.google.com/#q=WP+Max+Upload+Size" target="_blank">Google</a>)</li>';
			}
			if ( function_exists( 'ini_get' ) ) {
				$ktzinfotheme .= '<li><strong>PHP Time Limit:</strong>'. ini_get('max_execution_time') .'</li>';
			}
			if ( defined('WP_DEBUG') && WP_DEBUG ) {
				$ktzinfotheme .= '<li><strong>WP Debug Mode:</strong><mark class="yes"><b>Yes</b> - If life website please turn off WP debug mode. Please see: <a href="http://codex.wordpress.org/Debugging_in_WordPress" target="_blank">Debugging in WordPress</a></mark></mark></li>';
			} else {
				$ktzinfotheme .= '<li><strong>WP Debug Mode:</strong><mark class="no">No</mark></li>';    
			}			
			$ktzinfotheme .= '</ul></div>';
			$ktzinfotheme .= '<div class="format-setting-wrap">';
			$ktzinfotheme .= '<div class="format-setting-label"><h3 class="label"><strong>Latest release themes from kentooz</strong></h3></div>';
			if ( $xml===null || !is_object( $xml ) ) {
				$ktzinfotheme .= 'Failed to load xml file.';
			} else {
				$ktzinfotheme .= $xml->ktzlatestthemes;
			}
			$ktzinfotheme .= '</div>';
		return $ktzinfotheme;
	}
} 


/*
* Change excerpt 
*/
function new_excerpt_more( $more ) {
	return '';
}
add_filter('excerpt_more', 'new_excerpt_more');


/*
* Fixed BBPRESS error 404 in user
*/
function fix_bbp_404() {
global $wp_query;
if ( class_exists('bbPress') ) {
	if ( bbp_is_single_user() || bbp_is_single_user_edit() ) { 
		if ( $wp_query->bbp_is_single_user || $wp_query->bbp_is_single_user_edit || $wp_query->bbp_is_view ) {
		$wp_query->is_404 = false;
		// Unset nocache_headers
		foreach( wp_get_nocache_headers() as $name => $field_value ) {
		@header( "{$name}: " );
		}
		// Set status 200
		status_header( 200 );
		}
	}
}
}
add_action( 'wp', 'fix_bbp_404' );

/*
* This is Required from wordpress content_width for bootstrap span8 = 620px
*/
if ( ! isset( $content_width ) ) $content_width = 630;

/*
* Filter get_avatar Change avatar CSS on hook system
*/
function ktz_avatar_css($class) {
	$class = str_replace("class='avatar", "class='gravatar-img", $class) ;
	return $class;
}
add_filter( 'get_avatar', 'ktz_avatar_css' );

/*
* Get avatar URL
*/
function ktz_get_avatar_url($get_avatar){
    preg_match("/src='(.*?)'/i", $get_avatar, $matches);
    return $matches[1];
}

/*
* Remove auto p on hook system
*/
if( !function_exists('ktz_remove_wpautop') ) {
function ktz_remove_wpautop( $content ) { 
	$content = trim( do_shortcode( shortcode_unautop ( $content ) ) ); 
	$content = preg_replace('#^<\/p>|^<br />|<p>$|</p><p>\s*( )?\s*<\/p>#', '', $content);
	return $content;
	}
}

/*
* Filter script for better cache performance
*/
function ktz_remove_script_version( $src ){
    $parts = explode( '?ver', $src );
        return $parts[0];
}
add_filter( 'script_loader_src', 'ktz_remove_script_version', 15, 1 );
add_filter( 'style_loader_src', 'ktz_remove_script_version', 15, 1 );

/*
* WP texturize on hook system
*/
function ktz_texturize_SC($content) {
	$content = preg_replace('/\]\[/im', "]\n[", $content);
	return $content;
}

/*
* From functions WP 3.6
* if use WP 3.5 this function cannot work 
* so i used it my own code for support older WP.
*/
function ktz_has_shortcode( $content, $tag ) {
global $wp_version;
if ( $wp_version >= 3.6 ) {
	if ( shortcode_exists( $tag ) ) {
		preg_match_all( '/' . get_shortcode_regex() . '/s', $content, $matches, PREG_SET_ORDER );
		if ( empty( $matches ) )
		return false;
		foreach ( $matches as $shortcode ) {
			if ( $tag === $shortcode[2] )
				return true;
		}
	}
	return false;
	}
}

/*
* Disabling auto format on hook system
*/
function ktz_formatter($content) {
	$new_content = '';
	$pattern_full = '{(\[raw\].*?\[/raw\])}is';
	$pattern_contents = '{\[raw\](.*?)\[/raw\]}is';
	$pieces = preg_split($pattern_full, $content, -1, PREG_SPLIT_DELIM_CAPTURE);
	foreach ($pieces as $piece) {
		if (preg_match($pattern_contents, $piece, $matches)) {
			$new_content .= $matches[1];
		} else {
			$pattern_full_intl = '{(\<!--start_raw-->.*?\<!--end_raw-->)}is';
			$pattern_contents_intl = '{<!--start_raw-->(.*?)\<!--end_raw-->}is';
			$pieces_intl = preg_split($pattern_full_intl, $piece, -1, PREG_SPLIT_DELIM_CAPTURE);
			
			foreach ($pieces_intl as $piece_intl) {
				if (preg_match($pattern_contents_intl, $piece_intl, $matches_intl)) {
					$new_content .= $matches_intl[1];
				} else {
					$new_content .= wptexturize(wpautop($piece_intl));
				}
			}
		}
	}
	return $new_content;
}

/*
* Get template function for shortcode or widget
*/
if ( !function_exists('ktz_get_template') ) {
	function ktz_get_template( $template_name, $part_name = null ) {
		ob_start();
		get_template_part( $template_name, $part_name );
		$output = ob_get_contents();
		ob_end_clean();
		return $output;
	}
}

/*
* Pretty permalink for search page if permalink active
* this function very usefull if use AGC function
*/
function ktz_search_pretty_permalinks(){
  if( !is_admin() and is_search() ):
    if ( is_search() && ! empty( $_GET['s'] ) && get_option('permalink_structure') ) {
        wp_redirect( home_url( "/search/" ) . urlencode( get_query_var( 's' ) ) );
        exit();
    }    
  endif;
}
add_action( 'template_redirect', 'ktz_search_pretty_permalinks' );

/*
* Add theme support on hook system ~ post
*/
if( !function_exists('ktz_setup') ) {
function ktz_setup() {
	/* 
	* Add support for post format
	*/
	add_theme_support( 'post-formats', array( 'link', 'gallery', 'video' ) );
	/* 
	* Add support for thumbnail
	*/
    add_theme_support( 'post-thumbnails' );
	/* 
	* Add auto feed link
	*/
	add_theme_support( 'automatic-feed-links' );
	/* 
	* Just required for WP standart API
	*/
	add_theme_support( 'custom-background' );
	}
add_action(	'after_setup_theme', 'ktz_setup' );
}

/*
* Add editor style on hook system ~ post
* For editor style you can see in editor.css
*/
if(function_exists('add_editor_style')) {
	add_editor_style();
}

/*
* Get limit in the excerpt
* use <?php echo ktz_excerpt(number); ?>
*/
function ktz_excerpt($limit) {
  $excerpt = explode(' ', get_the_excerpt(), $limit);
  if (count($excerpt)>=$limit) {
    array_pop($excerpt);
    $excerpt = implode(" ",$excerpt).'...';
  } else {
    $excerpt = implode(" ",$excerpt);
  }	
  $excerpt = preg_replace('`\[[^\]]*\]`','',$excerpt);
  return $excerpt;
}

/*
* Get transient on hook system
*/
if( !function_exists('request_url') ) {
	function ktz_get_transient($request_url) {  
        $raw_response = wp_remote_get( $request_url, array( 'timeout' => 1 ) );  
        if ( is_wp_error( $raw_response ) )  
            return $raw_response;  
        $code = (int) wp_remote_retrieve_response_code($raw_response);  
        $response = json_decode( wp_remote_retrieve_body($raw_response) );  
        switch( $code ):  
            case 200:  
                return $response;  
            case 304:  
            case 400:  
            case 401:  
            case 403:  
            case 404:  
            case 406:  
            case 420:  
            case 500:  
            case 502:  
            case 503:  
            case 504:  
                return new WP_Error($code, $response->error);  
            default:  
                return new WP_Error($code, __('Invalid response','ktz_theme_textdomain'));  
        endswitch;  
    }  
}

/*
* Set transient on hook system
*/
if( !function_exists('ktz_set_transient') ) {
	function ktz_set_transient($key, $data, $expiration) {  
        // Time when transient expires  
        $expire = time() + $expiration;  
        set_transient( $key, array( $expire, $data ) );  
    }  
} 	

/*
* Setup meta for view post
*/
function ktz_setPostViews($postID) {
    $count_key = 'post_views_count';
    $count = get_post_meta($postID, $count_key, true);
    if($count==''){
        $count = 0;
        delete_post_meta($postID, $count_key);
        add_post_meta($postID, $count_key, '0');
    }else{
        $count++;
        update_post_meta($postID, $count_key, $count);
    }
}

/*
* Get auto keyword from post cats
*/
function ktz_get_keywords_post_cats() {
    global $posts;
    $postcats = "";
    foreach((get_the_category($posts[0]->ID)) as $cat) {
        $postcats .= $cat->cat_name . ', ';
    }
    // strip final comma
    $postcats = substr($postcats, 0, -2);

    return $postcats;
}

/*
* Get auto keyword from post tags
*/
function ktz_get_post_tags() {
    /*
    Retrieves the post's user-defined tags.
    
    This will only work in WordPress 2.3 or newer. On older versions it will
    return an empty string.
    */
    global $posts;
    if ( version_compare( get_bloginfo('version'), '2.3', '>=' ) ) {
        $tags = get_the_tags($posts[0]->ID);
        if ( empty( $tags ) ) {
            return false;
        } else {
            $tag_list = "";
            foreach ( $tags as $tag ) {
                $tag_list .= $tag->name . ', ';
            }
            $tag_list = ktz_strtolower(rtrim($tag_list, " ,"));
            return $tag_list;
        }
    } else {
        return "";
    }
}

/*
* Core meta tags
*/
function ktz_strtolower($text) {
    /*
    Helper function that converts $text to lowercase.
    If the mbstring php plugin exists, then the string functions provided by that
    plugin are used.
    */
    if (function_exists('mb_strtolower')) {
        return mb_strtolower($text, get_bloginfo('charset'));
    } else {
        return strtolower($text);
    }
}

/*
* Get category in home or frontpage for meta keywords
* Returns a comma-delimited list of all the blog's categories.
* The built-in category "Uncategorized" is excluded.
*/
function ktz_get_all_categories($no_uncategorized = TRUE) {
    global $wpdb;

    if ( version_compare( get_bloginfo('version'), '2.3', '>=' ) ) {
        $cat_field = "name";
        $sql = "SELECT name FROM $wpdb->terms LEFT OUTER JOIN $wpdb->term_taxonomy ON ($wpdb->terms.term_id = $wpdb->term_taxonomy.term_id) WHERE $wpdb->term_taxonomy.taxonomy = 'category' ORDER BY name ASC";
    } else {
        $cat_field = "cat_name";
        $sql = "SELECT cat_name FROM $wpdb->categories ORDER BY cat_name ASC";
    }
    $categories = $wpdb->get_results($sql);
    if ( empty( $categories ) ) {
        return "";
    } else {
        $all_cats = "";
        foreach ( $categories as $cat ) {
            if ($no_uncategorized && $cat->$cat_field != "Uncategorized") {
                $all_cats .= $cat->$cat_field . ', ';
            }
        }
        $all_cats = ktz_strtolower(rtrim($all_cats, " ,"));
        return $all_cats;
    }
}

/*
* Get meta keyword in post
* Script from free plugin 
* http://www.g-loaded.eu/2006/01/05/add-meta-tags-wordpress-plugin/
*/
function ktz_get_content_keywords($auto=true) {
    /*
    This is a helper function that returns the post's or page's keywords.
    */
    global $posts;

    $ktz_content_keywords = '';

    /*
     * Custom post field "keywords" overrides post's categories and tags (tags exist in WordPress 2.3 or newer).
     * %cats% is replaced by the post's categories.
     * %tags% us replaced by the post's tags.
     */
    if ( ( is_single()) || is_page() ) {
        $ktz_keyword_fld_meta = get_post_custom_values( 'ktz_meta_keywords', $posts[0]->ID );
        if ( !empty($ktz_keyword_fld_meta) ) {
            // If there is a custom field, use it
            if ( is_single() ) {
                // On single posts, the %cat% tag is replaced by the post's categories
                $ktz_keyword_fld_meta = str_replace("%cats%", ktz_get_keywords_post_cats(), $ktz_keyword_fld_meta);
                // Also, the %tags% tag is replaced by the post's tags (WordPress 2.3 or newer)
                if ( version_compare( get_bloginfo('version'), '2.3', '>=' ) ) {
                    $ktz_keyword_fld_meta = str_replace("%tags%", ktz_get_post_tags(), $ktz_keyword_fld_meta);
                }
            }
            $ktz_content_keywords .= ktz_strtolower($ktz_keyword_fld_meta[0]);
        } elseif ( is_single() ) {  // pages do not support categories and tags
            if ($auto) {
                /*
                 * Add keywords automatically.
                 * Keywords consist of the post's categories and the post's tags (tags exist in WordPress 2.3 or newer).
                 */
                $ktz_content_keywords .= ktz_strtolower(ktz_get_keywords_post_cats());
                $post_tags = ktz_strtolower(ktz_get_post_tags());
                if (!empty($post_tags)) {
                    $ktz_content_keywords .= ", " . $post_tags;
                }
            }
        }
    }

    /**
     * Finally, add the global keyword, if they are set in the theme options.
     * If $ktz_content_keywords is empty, then no global keyword processing takes place.
     */
    if ( !empty($ktz_content_keywords) && (is_single() || is_page()) ) {    // is_single() is true for attachments and custom post types too
        $options = ot_get_option("ktz_meta_keywords");
		$ktz_keyword_fld_meta = get_post_custom_values( 'ktz_meta_keywords', $posts[0]->ID );
        if (!empty($ktz_keyword_fld_meta)) {
            if ( strpos($ktz_keyword_fld_meta[0], '%contentkw%') ) {
                // The user has used the placeholder ``%contentkw%``. Replace it with the content keywords.
                $ktz_content_keywords = str_replace('%contentkw%', $ktz_content_keywords, $ktz_keyword_fld_meta);
            } else {
                $ktz_content_keywords = $ktz_keyword_fld_meta[0];
            }
        }
    }

    return $ktz_content_keywords;
}
/*
* Only available for free theme
*/
function ktz_kentooz_copyright(){
    echo '<span class="kentooz-copyright">Theme by <a href="http://kentooz.com" title="Free and premium responsive wordpress theme">kentooz.com</a></span>';
}