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
* Register CSS on hook system
*/
if( !function_exists('ktz_register_css') ) {
function ktz_register_css() {
	if( !is_admin() ) {
			/*
			 * default_theme_fonts from includes/admin/googlefont/functions.php
			 */
			global $default_theme_fonts;
			
			$getheadinggfont = ot_get_option( 'ktz_heading_font' );	
			$getbodygfont = ot_get_option( 'ktz_body_font' );		
			
			$getheadinggfont_arr = '';
			if( isset($getheadinggfont['font-family']) ){
				$getheadinggfont_arr = $getheadinggfont['font-family'];
				$getheadinggfont_arr = str_replace(' ', '+', $getheadinggfont_arr);
			}
			$getbodygfont_arr = '';
			if( isset($getbodygfont['font-family'])  ){
				$getbodygfont_arr = $getbodygfont['font-family'];
				$getbodygfont_arr = str_replace(' ', '+', $getbodygfont_arr);
			}
			
			if (! empty ( $getheadinggfont['font-family'] ) && ! empty ( $getbodygfont['font-family'] ) ) {
				$gofontfamily = $getheadinggfont_arr . '|' . $getbodygfont_arr;
			} elseif (! empty ( $getheadinggfont['font-family'] ) ) {
				$gofontfamily = $getheadinggfont_arr . '|Open+Sans:light,lightitalic,regular,regularitalic,600,600italic,bold,bolditalic,800,800italic';
			} elseif (! empty ( $getbodygfont['font-family'] ) ) {
				$gofontfamily = $getbodygfont_arr;
			} else {
				$gofontfamily = 'Open+Sans:light,lightitalic,regular,regularitalic,600,600italic,bold,bolditalic,800,800italic';
			}
			
			$query_args = array(
				'family' => $gofontfamily
			);
			
			wp_register_style( 'ktz_google_font_link', add_query_arg( $query_args, "https://fonts.googleapis.com/css" ), array(), '1.0', 'all' );
			wp_register_style( 'ktz-bootstrap-min',ktz_url . 'includes/assets/css/bootstrap.min.css', array(), '1.0', 'all' );
			wp_register_style( 'ktz-video-min',ktz_url . 'includes/assets/video-js/video-js.min.css', array(), '1.0', 'all' );
			wp_register_style( 'ktz-woocommerce-css', ktz_url . 'woocommerce/assets/css/woocommerce.css', '1.0', 'all' ); 
			wp_register_style( 'ktz-main-css',ktz_url . 'style.css',array(), '1.0', 'all' );
		}
	}
add_action( 'init', 'ktz_register_css');
}
		

/*
* Enqueue CSS on hook system
*/
if( !function_exists('ktz_enqueue_css') ) {
function ktz_enqueue_css()  { 
	global $post;
	if( !is_admin() ) { 
	
		wp_enqueue_style( 'ktz_google_font_link' ); 
	
		if( is_object($post) ) :
		$meta_values = get_post_custom($post->ID);
		endif;
		
        wp_enqueue_style( 'ktz-bootstrap-min' ); 
		
		if ( is_single() && has_post_format('video') ) :		
		wp_enqueue_style( 'ktz-video-min' );
		endif;
		
		if (class_exists( 'woocommerce' )) { 
		wp_enqueue_style( 'ktz-woocommerce-css' );
		}
		
        wp_enqueue_style( 'ktz-main-css' );  	
		}
	}
add_action( 'wp_enqueue_scripts', 'ktz_enqueue_css' );    
}

/*
* Add stylish option in header and call via WP_HEAD
*/
if ( !function_exists('ktz_headcss') ) {
function ktz_headcss() { 
	global $post;
	/*
	* Background setting
	*/
	 if (isset($post->ID)) {
	 	$meta_values = get_post_custom($post->ID);
	 }
	 if( isset($meta_values['ktz_dynamicbg']) ){
			$ktz_mainbg = unserialize($meta_values['ktz_dynamicbg'][0]);
	 	if($ktz_mainbg['background-image'] =="" && $ktz_mainbg['background-color'] =="" ){
	 		$ktz_mainbg = ot_get_option( 'ktz_bodybg', array() );
	 	}
	 } else {
	 	$ktz_mainbg = ot_get_option( 'ktz_bodybg', array() );
	 }
	
	if ( !isset($ktz_mainbg['background-image']) || $ktz_mainbg['background-image'] == "" ){
	 	$ktz_mainbg_url = "";
	} else {
	 	$ktz_mainbg_url = "url('". $ktz_mainbg['background-image'] . "')";
	}
	 
	if ( !isset($ktz_mainbg['background-color']) || $ktz_mainbg['background-color'] == "" ){
	 	$ktz_mainbg['background-color'] = "#eee";
	}
	 
	if ( !isset($ktz_mainbg['background-attachment']) || $ktz_mainbg['background-attachment'] == "" ){
	 	$ktz_mainbg['background-attachment'] = "";
	}
	 
	if ( !isset($ktz_mainbg['background-position']) || $ktz_mainbg['background-position'] == "" ){
	 	$ktz_mainbg['background-position'] = "";
	}
	 
	if ( !isset($ktz_mainbg['background-repeat']) || $ktz_mainbg['background-repeat'] == "" ){
	 	$ktz_mainbg['background-repeat'] = "";
	}
	/*
	* Header setting
	*/
	$ktz_headerbg = ot_get_option( 'ktz_headerbg', array() );
	if ( !isset($ktz_headerbg['background-image']) || $ktz_headerbg['background-image'] == "" ){
	 	$ktz_headerbg_url = "";
	} else {
	 	$ktz_headerbg_url = "url('". $ktz_headerbg['background-image'] . "')";
	}
	 
	if ( !isset($ktz_headerbg['background-color']) || $ktz_headerbg['background-color'] == "" ){
	 	$ktz_headerbg['background-color'] = "#fff";
	}
	 
	if ( !isset($ktz_headerbg['background-attachment']) || $ktz_headerbg['background-attachment'] == "" ){
	 	$ktz_headerbg['background-attachment'] = "";
	}
	 
	if ( !isset($ktz_headerbg['background-position']) || $ktz_headerbg['background-position'] == "" ){
	 	$ktz_headerbg['background-position'] = "";
	}
	 
	if ( !isset($ktz_headerbg['background-repeat']) || $ktz_headerbg['background-repeat'] == "" ){
	 	$ktz_headerbg['background-repeat'] = "";
	}
	/*
	* Header squeeze setting
	*/
	$ktz_headerbg_squeeze = ot_get_option( 'ktz_headerbg_squeeze', array() );
	if ( !isset($ktz_headerbg_squeeze['background-image']) || $ktz_headerbg_squeeze['background-image'] == "" ){
	 	$ktz_headerbg_squeeze_url = "";
	} else {
	 	$ktz_headerbg_squeeze_url = "url('". $ktz_headerbg_squeeze['background-image'] . "')";
	}
	 
	if ( !isset($ktz_headerbg_squeeze['background-color']) || $ktz_headerbg_squeeze['background-color'] == "" ){
	 	$ktz_headerbg_squeeze['background-color'] = "#fff";
	}
	 
	if ( !isset($ktz_headerbg_squeeze['background-attachment']) || $ktz_headerbg_squeeze['background-attachment'] == "" ){
	 	$ktz_headerbg_squeeze['background-attachment'] = "";
	}
	 
	if ( !isset($ktz_headerbg_squeeze['background-position']) || $ktz_headerbg_squeeze['background-position'] == "" ){
	 	$ktz_headerbg_squeeze['background-position'] = "";
	}
	 
	if ( !isset($ktz_headerbg_squeeze['background-repeat']) || $ktz_headerbg_squeeze['background-repeat'] == "" ){
	 	$ktz_headerbg_squeeze['background-repeat'] = "";
	}
	/*
	* Body Font setting
	*/
	$ktz_mainfont = ot_get_option( 'ktz_body_font', array() );
	if ( !isset($ktz_mainfont['font-family']) || $ktz_mainfont['font-family'] == "" ){
	 	$ktz_mainfont['font-family'] = "Open Sans:light,lightitalic,regular,regularitalic,600,600italic,bold,bolditalic,800,800italic";
	}
	 
	if ( !isset($ktz_mainfont['font-color']) || $ktz_mainfont['font-color'] == "" ){
	 	$ktz_mainfont['font-color'] = "#34495e";
	}
	 
	if ( !isset($ktz_mainfont['font-size']) || $ktz_mainfont['font-size'] == "" ){
	 	$ktz_mainfont['font-size'] = "13px";
	}
	 
	if ( !isset($ktz_mainfont['font-style']) || $ktz_mainfont['font-style'] == "" ){
	 	$ktz_mainfont['font-style'] = "normal";
	}
	/*
	* Heading Font setting
	*/
	$ktz_headingfont = ot_get_option( 'ktz_heading_font', array() );
	if ( !isset($ktz_headingfont['font-family']) || $ktz_headingfont['font-family'] == "" ){
	 	$ktz_headingfont['font-family'] = "Open Sans:light,lightitalic,regular,regularitalic,600,600italic,bold,bolditalic,800,800italic";
	}
	 
	if ( !isset($ktz_headingfont['font-color']) || $ktz_headingfont['font-color'] == "" ){
	 	$ktz_headingfont['font-color'] = "#2c3e50";
	}
	 
	if ( !isset($ktz_headingfont['font-style']) || $ktz_headingfont['font-style'] == "" ){
	 	$ktz_headingfont['font-style'] = "normal";
	}
	$getheadinggfont = '';
	$getbodygfont = '';
	if (! empty ( $ktz_headingfont['font-family'] ) ) { 
	$getheadinggfont = preg_split( '/:/',  $ktz_headingfont['font-family'] );
	$getheadinggfont = '"' . $getheadinggfont[0] . '",';
	}
	if( ! empty ( $ktz_mainfont['font-family'] ) ){
	$getbodygfont = preg_split( '/:/',  $ktz_mainfont['font-family'] );
	$getbodygfont = '"' . $getbodygfont[0] . '",';
	}
	echo '<style type="text/css" media="screen">';
	// body
	echo 'body{';
		echo 'background:' . $ktz_mainbg['background-color'] . ' ' . $ktz_mainbg_url . ' ' . $ktz_mainbg['background-repeat'] . ' ' .  $ktz_mainbg['background-position'] . ' ' .  $ktz_mainbg['background-attachment'] . ';'; 
		echo 'font-family:' . $getbodygfont . 'sans-serif;';
		echo 'font-size:' . $ktz_mainfont['font-size'] . ';';
		echo 'font-style:' . $ktz_mainfont['font-style'] . ';';
		echo 'color:' . $ktz_mainfont['font-color'] . ';';
	echo '}';
	// Header
	echo '.ktz-mainheader{';
		echo 'background:' . $ktz_headerbg['background-color'] . ' ' . $ktz_headerbg_url . ' ' . $ktz_headerbg['background-repeat'] . ' ' .  $ktz_headerbg['background-position'] . ' ' .  $ktz_headerbg['background-attachment'] . ';'; 
	echo '}';
	// Logo color
	$ktz_colorlogo = ot_get_option( 'ktz_colorlogo' );
	if ( !isset($ktz_colorlogo) || $ktz_colorlogo == '' ){
	 	$ktz_colorlogo_hex = '#2c3e50';
	} else {
	 	$ktz_colorlogo_hex = $ktz_colorlogo;
	}
	$ktz_colorlogodesc = ot_get_option( 'ktz_colorlogodesc' );
	if ( !isset($ktz_colorlogodesc) || $ktz_colorlogodesc == '' ){
	 	$ktz_colorlogodesc_hex = '#999';
	} else {
	 	$ktz_colorlogodesc_hex = $ktz_colorlogodesc;
	}
	echo '.ktz-logo h1.homeblogtit a,';
	echo '.ktz-logo h1.homeblogtit a:visited,';
	echo '.ktz-logo h1.homeblogtit a:hover,';
	echo '.ktz-logo .singleblogtit a,';
	echo '.ktz-logo .singleblogtit a:hover,';
	echo '.ktz-logo .singleblogtit a:active,';
	echo '.ktz-logo .singleblogtit a:focus,';
	echo '.ktz-logo .singleblogtit a:visited {';
		echo 'color:' . $ktz_colorlogo_hex;
	echo '}';
	echo '.ktz-logo .desc {';
		echo 'color:' . $ktz_colorlogodesc_hex;
	echo '}';
	// Heading font family, style and color
	echo 'h1,h2,h3,h4,h5,h6,.ktz-logo div.singleblogtit{';
		echo 'font-family:' . $getheadinggfont . ' helvetica;';
		echo 'font-style:' . $ktz_headingfont['font-style'] . ';';
		echo 'color:' . $ktz_headingfont['font-color'] . ';';
	echo '}';
	// color
	echo 'a,';
	echo 'a:hover,';
	echo 'a:focus,';
	echo 'a:active,';
	echo '#breadcrumbs-wrap a:hover,';
	echo '#breadcrumbs-wrap a:focus,';
	echo 'a#cancel-comment-reply-link:hover{';
		echo 'color:' . ot_get_option('ktz_colorscheme') . ';';
	echo '}';
	// Background
	echo '.entry-content input[type=submit],';
	echo '.page-link a,';
	echo 'input#comment-submit,';
	echo '.wpcf7 input.wpcf7-submit[type="submit"],';
	echo '.bbp_widget_login .bbp-login-form button,';
	echo '#wp-calendar tbody td:hover,';
	echo '#wp-calendar tbody td:hover a,';
	echo '.slicknav_menu,';
	echo '.ktz-bbpsearch button,';
	echo 'input#comment-submit,';
	echo '.ktz-mainmenu,';
	echo '.ktz-prevnext a{';
		echo 'background:' .  ot_get_option('ktz_colorscheme') . ';';
	echo '}';
	// Background default
	echo '.page-link a:hover{';
		echo 'background:#4c4c4c;color:#ffffff;';
	echo '}';
	//Border color
	echo '.ktz-allwrap.wrap-squeeze{';
		echo 'border-color:' . ot_get_option('ktz_colorscheme') . ';';
	echo '}';
	// Background-color
	echo '.pagination > .active > a,';
	echo '.pagination > .active > span,';
	echo '.pagination > .active > a:hover,';
	echo '.pagination > .active > span:hover,';
	echo '.pagination > .active > a:focus,';
	echo '.pagination > .active > span:focus {';
		echo 'background-color:' .  ot_get_option('ktz_colorscheme') . ';';
	echo '}';
	// Border color
	echo '.pagination > .active > a,';
	echo '.pagination > .active > span,';
	echo '.pagination > .active > a:hover,';
	echo '.pagination > .active > span:hover,';
	echo '.pagination > .active > a:focus,';
	echo '.pagination > .active > span:focus{';
		echo 'border-color:' .  ot_get_option('ktz_colorscheme') . ' ' . ot_get_option('ktz_colorscheme') . ' ' . ot_get_option('ktz_colorscheme') . ' transparent;';
	echo '}';
	$categories_get = ot_get_option( 'ktz_categories', array() );
	if ($categories_get){
	foreach ($categories_get as $category) { 
		$cat_array = get_category($category['category']);
		if ( !isset($category['background']['background-image']) || $category['background']['background-image'] == "" ){
			$bg_url = "";
		} else {
			$bg_url = "url('". $category['background']['background-image'] . "') ";
		}
		if ( !isset($category['background']['background-color']) || $category['background']['background-color'] == "" ){
			$bg_col = "";
		} else {
			$bg_col = $category['background']['background-color'] . " ";
		}
		if ( !isset($category['background']['background-repeat']) || $category['background']['background-repeat'] == "" ){
			$bg_rep = "";
		} else {
			$bg_rep = $category['background']['background-repeat'] . " ";
		}
		if ( !isset($category['background']['background-position']) || $category['background']['background-position'] == "" ){
			$bg_pos = "";
		} else {
			$bg_pos = $category['background']['background-position'] . " ";
		}
		if ( !isset($category['background']['background-attachment']) || $category['background']['background-attachment'] == "" ){
			$bg_att = "";
		} else {
			$bg_att = $category['background']['background-attachment'] . " ";
		}
		update_option('category_icon_' . $category['category'] , $category['icon']);

	if ( ! is_wp_error( $cat_array ) ) :
	if ( is_category( $cat_array->slug ) ) :
	echo '.category-' . $cat_array->slug . ' .page-link a{';
		echo 'background:' . $category['color'] . ';';
	echo '}';
	echo '.category-' . $cat_array->slug . ' .page-link a:hover	{';
		echo 'background:#4c4c4c;color:#ffffff;';
	echo '}';
	echo '.category-' . $cat_array->slug . ' .pagination > .active > a,';
	echo '.category-' . $cat_array->slug . ' .pagination > .active > span,';
	echo '.category-' . $cat_array->slug . ' .pagination > .active > a:hover,';
	echo '.category-' . $cat_array->slug . ' .pagination > .active > span:hover,';
	echo '.category-' . $cat_array->slug . ' .pagination > .active > a:focus,';
	echo '.category-' . $cat_array->slug . ' .pagination > .active > span:focus{';
		echo 'background-color:' .  $category['color'] . ';';
	echo '}';
	echo '.category-' . $cat_array->slug . ' .pagination > .active > a,';
	echo '.category-' . $cat_array->slug . ' .pagination > .active > span,';
	echo '.category-' . $cat_array->slug . ' .pagination > .active > a:hover,';
	echo '.category-' . $cat_array->slug . ' .pagination > .active > span:hover,';
	echo '.category-' . $cat_array->slug . ' .pagination > .active > a:focus,';
	echo '.category-' . $cat_array->slug . ' .pagination > .active > span:focus{';
		echo 'border-color:' .  $category['color'] . ';';
	echo '}';
	echo '.category-' . $cat_array->slug . ' a:hover,';
	echo '.category-' . $cat_array->slug . ' a:focus,'; 
	echo '.category-' . $cat_array->slug . ' a:active {';
		echo 'color:' .  $category['color'] . ';'; 
	echo '}';
	echo 'body.category-' .  $cat_array->slug . '{';
	    echo 'background:' .  $bg_col . ''.$bg_url.'' . $bg_rep . '' .  $bg_pos . '' .  $bg_att . ';';
	echo '}';
	else :
		echo '';
	endif;
	endif; 		
		}
	}
	echo '</style>';
	}
add_action( 'wp_head', 'ktz_headcss', 10 );	
}