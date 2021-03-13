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
* Register javascript on hook system ~ header
*/
if( !function_exists('ktz_register_jascripts') ) {
function ktz_register_jascripts() {
	if( !is_admin() ) {
		wp_register_script( 'modernizr-respon',ktz_url . 'includes/assets/js/modernizr-2.6.2-respond-1.3.0.min.js', array(), false, false );
		wp_register_script( 'ktz-jsscript-js',ktz_url . 'includes/assets/js/jsscript.min.js',array('jquery'), false, true );
		wp_register_script( 'ktz-rating-js',ktz_url . 'includes/assets/js/rating.js',array('jquery'), false, true );
		wp_register_script( 'ktz-video-js',ktz_url . 'includes/assets/video-js/video.js',array('jquery'), false, false );
		wp_register_script( 'ktz-frontendwoocommerce-js',ktz_url . 'includes/assets/js/woo.frontend.min.js',array('jquery'), false, true );
		wp_register_script( 'ktz-woocommercemain-js',ktz_url . 'includes/assets/js/woo.custom.main.js',array('jquery'), false, true );
		wp_register_script( 'ktz-main-js',ktz_url . 'includes/assets/js/custom.main.js',array('jquery'), false, true );
		}
	}
add_action( 'init', 'ktz_register_jascripts' );
}

/*
* Enqueue javascript on hook system ~ header
*/
if( !function_exists('ktz_jsscripts') ) {
function ktz_jsscripts() {
	global $is_IE, $post;
	if( !is_admin() ) {
		if ( is_singular() ) { wp_enqueue_script( 'comment-reply' ); }
		wp_enqueue_script('modernizr-respon');
		wp_enqueue_script('ktz-jsscript-js');
		wp_enqueue_script('ktz-rating-js');
		if ( is_single() && has_post_format('video') ):
		wp_enqueue_script('ktz-video-js');
		endif;
		wp_enqueue_script('ktz-main-js');
		if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
		wp_enqueue_script('ktz-frontendwoocommerce-js');
		wp_enqueue_script('ktz-woocommercemain-js');
		}
		wp_localize_script('ktz-rating-js', 'ktz_ajax_data', array(
			'ajax_url' => admin_url( 'admin-ajax.php' ),
			'codes' => array(
				'SUCCESS' => 1,
				'PREVIOUSLY_VOTED' => 0,
				'REQUEST_ERROR' => 2,
				'UNKNOWN' => -1
			),
			'messages' => array(
				'success' => __('You\'ve voted correctly', 'ktz_theme_textdomain'),
				'previously_voted' => __('You had previously voted', 'ktz_theme_textdomain'),
				'request_error' => __('The request was malformed, try again', 'ktz_theme_textdomain'),
				'unknown' => __('An unknown error has occurred, try to vote again', 'ktz_theme_textdomain')
			)
		));
		}
	}
add_action( 'wp_enqueue_scripts','ktz_jsscripts' );
}

/**
 * Add Js Require For VideoJS
 */		
if ( !function_exists('ktz_require_videojs') ) :
function ktz_require_videojs(){
	global $post;
    if( !is_object($post) ) 
        return;
		$ktz_self_video_mp4_mt = get_post_custom_values('ktz_self_video_mp4', $post->ID); 
		$ktz_self_video_webm_mt = get_post_custom_values('ktz_self_video_webm', $post->ID); 
		$ktz_self_video_ogg_mt = get_post_custom_values('ktz_self_video_ogg', $post->ID); 
		$ktz_self_video_mp4 = $ktz_self_video_mp4_mt[0];
		$ktz_self_video_webm = $ktz_self_video_webm_mt[0];
		$ktz_self_video_ogg = $ktz_self_video_ogg_mt[0];
if ( is_single() && has_post_format('video') ):
	if ( ( isset($ktz_self_video_mp4_mt) && $ktz_self_video_mp4 != '' ) 
	|| ( isset($ktz_self_video_webm_mt) && $ktz_self_video_webm != '' ) 
	|| ( isset($ktz_self_video_ogg_mt) && $ktz_self_video_ogg != '' ) ) :
	echo '<script type="text/javascript">';
		echo 'videojs.options.flash.swf = "' . ktz_url . 'includes/assets/video-js/video-js.swf";';
		echo "\r\n";
	echo '</script>';
	endif;
endif;
}
add_action( 'wp_footer', 'ktz_require_videojs' );
endif;

if ( !function_exists('ktz_exitsplash_squeezepage_js') ) :
function ktz_exitsplash_squeezepage_js() {
	global $post;
	if (isset($post->ID)) {
		$meta_values = get_post_custom($post->ID);
	}
	if(	isset($meta_values['ktz_exit_splash_squeeze_enable'] ) && $meta_values['ktz_exit_splash_squeeze_enable'][0] == 'yes' ) {
	$ktz_url_splash = $meta_values['ktz_url_splash_squeeze'][0];
	$ktz_text_splash = $meta_values['ktz_text_splash_squeeze'][0];
?>
<script language="javascript" type="text/javascript">
// This JS from https://wordpress.org/plugins/exit-screen-plugin/ small edit by kentooz
/* <![CDATA[ */
function  kpg_exsc_onclick(e) {	return kpg_exsc_testclick(e,'A');}
function  kpg_exsc_onsubmit(e) { return kpg_exsc_testclick(e,'FORM'); }
var kpg_exsc_testlink = document.createElement("a");
function  kpg_exsc_testclick(e,t) {
	kpg_exsc_unload_on=true;
	var e = e || window.event;
	if (e.target) {
		targ = e.target;
	} else if (e.srcElement) {
		targ = e.srcElement;
	}
	if (targ.nodeType == 3) 
		targ = targ.parentNode;
	var tag=targ;
	while (tag.tagName.toUpperCase()!='HTML' && tag.tagName.toUpperCase()!=t) {
		tag=tag.parentNode;
	}
	if (tag.tagName.toUpperCase()!=t) {
		return true;
	}
	if (typeof tag.kpgfunc == 'function') {
		var ansa=true;
		e.cancelBubble=true;
		ansa=tag.kpgfunc(e);
		if (!ansa) {
			e.returnValue=false;
			return false; 
		}
	}

	var fref=null;
	if (t=='A') fref=tag.href;
	if (t=='FORM') fref=tag.action;
	if (fref) { 
		if (fref.toLowerCase().indexOf('javascript:')!=-1) {
			kpg_exsc_unload_on=false;
			return true;
		}
		if (fref.indexOf('http://')!=-1 && fref.indexOf('https://')!=-1 && fref.indexOf('ftp://')!=-1) {
			kpg_exsc_unload_on=false;
			return true;
		}
		var hostname=null;
		if (t=='A') hostname=tag.hostname.toLowerCase();
		if (t=='FORM') {
			kpg_exsc_testlink.href=fref;
			hostname=kpg_exsc_testlink.hostname.toLowerCase();
		}
		if (hostname==location.hostname.toLowerCase()) {
			kpg_exsc_unload_on=false;
			return true;
		}
		return true;
	}
		
	return true;
}
function kpg_exsc_installLinks() {
	var tags = document.getElementsByTagName('A');
	for (var i = 0; i < tags.length; i++) {
		tag=tags[i];
		if (typeof tag.onclick == 'function') {
			tag.kpgfunc=tag.onclick;
		} else {
			tag.kpgfunc=null;
		}
		tag.onclick=kpg_exsc_onclick;
	}
}

function kpg_exsc_installForms() {
	var tags = document.getElementsByTagName('FORM');
	for (var i = 0; i < tags.length; i++) {
		tag=tags[i];
		if (tag) {
			if (typeof tag.onsubmit == 'function') {
				tag.kpgfunc=tag.onsubmit;
			} else {
				tag.kpgfunc='';
			}
			tag.onsubmit=kpg_exsc_onsubmit;
		}
	}
}
function kpg_exsc_exitscreen_action(e) {
	kpg_exsc_installLinks();
	kpg_exsc_installForms();
	window.onbeforeunload = DisplayExitSplash;
}

	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", function(event) { kpg_exsc_exitscreen_action(event); }, false);
	} else if (window.attachEvent) {
		window.attachEvent("onload", function(event) { kpg_exsc_exitscreen_action(event); });
	} else {
		var oldFunc = window.onload;
		window.onload = function() {
			if (oldFunc) {
				oldFunc();
			}
				kpg_exsc_exitscreen_action('load');
			};
	}
if (navigator.userAgent.indexOf('MSIE') !=-1 || navigator.userAgent.indexOf('Chrome') !=-1  ) {
	document.open();
	document.write("<iframe id='kpg_exit_iframe' frameBorder='0' border='0' scrolling='no' src='<?php echo $ktz_url_splash; ?>' style='width:100%;height:10000px;border:0px;margin:0;padding:0;background-color:white;position:absolute;top:0;left:0;right:0;bottom:0;visibility:hidden;display:none;'></iframe>");
	document.close();
}
var kpg_exsc_unload_on=true;
var exitsplashmessage="<?php echo $ktz_text_splash; ?>";
function DisplayExitSplash(e) {
	var e = e || window.event;
	if (!kpg_exsc_unload_on) {
		//e.returnValue=null;
		return;
	}
	
	if (navigator.userAgent.indexOf('MSIE') !=-1  || navigator.userAgent.indexOf('Chrome') !=-1 ) { 
		window.scrollTo(0,0);
		document.body.style.padding=0;
		document.body.style.margin=0;
		var nframe=document.getElementById('kpg_exit_iframe');
		nframe.style.display="block";
		nframe.style.visibility="visible";
	} else if (navigator.userAgent.indexOf('Mozilla') !=-1) {
		window.location.href="<?php echo $ktz_url_splash; ?>";
	} else {
		window.onbeforeunload = null;
		return;
	}
	window.onbeforeunload = null;
	return exitsplashmessage;
 }
 function kpg_exit_show() {

 }
/* ]]> */
</script>
<?php
	};
};

add_action( 'ktz_exitsplash_squeezepage_js', 'ktz_exitsplash_squeezepage_js' );
endif;

/**
 * Add Js Require For VideoJS
 */		
if ( !function_exists('ktz_mustread_js') ) :
function ktz_mustread_js() {
if ( is_single() ) :
	if ( ot_get_option('ktz_popup_activated') == 'yes' ) :
	echo '<script type="text/javascript">';
	echo 'jQuery(document).ready(function ($) {';
	echo '\'use strict\';';
	    echo '$(function() {';
		echo '$(window).scroll(function(){';
			echo 'var distanceTop = $(\'div.tab-comment-wrap\').offset().top - $(window).height();';
	
			echo 'if ($(window).scrollTop() > distanceTop){';
				echo '$(\'#ktz_slidebox\').animate({\'right\':\'0px\'},300);';
			echo '} else {';
				echo '$(\'#ktz_slidebox\').stop(true).animate({\'right\':\'-430px\'},100);';
			echo '}';
		echo '});';
		echo '$(\'#ktz_slidebox .close\').bind(\'click\',function(){';
		    echo '$(\'#ktz_slidebox\').stop(true).animate({\'right\':\'-430px\'},100, function(){';
			echo '$(\'#ktz_slidebox\').remove();';
		    echo '});';
		    echo 'return false;';
		echo '});';
	    echo '});';
	echo '});';
	echo '</script>';
	endif;
endif;
};
add_action( 'wp_footer', 'ktz_mustread_js' );
endif;