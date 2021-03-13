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

if( function_exists( 'jetpack_photon_url' ) ) {
    add_filter( 'jetpack_photon_url', 'jetpack_photon_url', 10, 3 );
}

/*
* Add featured images * first in kabar themes
* If has_thumb elseif firstimage else no image
* BFI_thumbs https://github.com/bfintal/bfi_thumb
*/
function get_first_image_src() {
    $content = get_the_content();
    $image_regex = "/<img [^>]*src=[\"']([^\"^']*)[\"']/";
    preg_match($image_regex, $content, $match);

    if (empty($match))
        return "";
    return $match[1];
}
function get_first_image_src_forhead() {
	global $post;
	if (!is_page()) {
		$content = apply_filters('the_content', $post->post_content);
	} else {
		$content = get_the_content();
	}
    $image_regex = "/<img [^>]*src=[\"']([^\"^']*)[\"']/";
    preg_match($image_regex, $content, $match);

    if (empty($match))
        return "";
    return $match[1];
}
function ktz_getpost_images_upload() {
    global $post,$wpdb;
    $postid = $post->ID;
    $results = '';
	$attachment_id = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE post_parent = $postid AND post_type = 'attachment' AND post_mime_type LIKE 'image/%%' LIMIT 1 ;" );
    // get the correct image html for the selected size
	$image = wp_get_attachment_image_src($attachment_id, 'full');
	$results = $image[0];
    return $results;
}
if ( !function_exists('ktz_featured_just_img_link') ) :
function ktz_featured_just_img_link( $width, $height ) { 
	global $post;
	$permalink = get_permalink();
	$title = get_the_title();
	$get_imgpost_upload = ktz_getpost_images_upload();
	$params = array( 'width' => $width, 'height' => $height, 'crop' => true );
	$thumb = get_post_thumbnail_id();
	$img_url = wp_get_attachment_url( $thumb,'full' ); 
	$fisrtimg_url = get_first_image_src();
	$img_default = get_template_directory_uri() . '/includes/assets/img/no-image/image-blank.jpg'; 
	
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$image = apply_filters( 'jetpack_photon_url', $img_url, 'resize='. $width . ',' . $height );
	else :
		$image = bfi_thumb( $img_url, $params ); //resize & crop featured image
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$image_upload = apply_filters( 'jetpack_photon_url', $get_imgpost_upload, 'resize='. $width . ',' . $height );
	else :
		$image_upload = bfi_thumb( $get_imgpost_upload, $params ); //resize & crop featured image
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() ) ) :
		$first_image = apply_filters( 'jetpack_photon_url', $fisrtimg_url, 'resize='. $width . ',' . $height );
	else :
		$first_image = bfi_thumb( $fisrtimg_url, $params ); 
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$default_image = apply_filters( 'jetpack_photon_url', $img_default, 'resize='. $width . ',' . $height );
	else :
		$default_image = bfi_thumb( $img_default, $params ); 
	endif;
	
	if ( $image ) { 
		echo $image;
	} elseif ( $first_image ) {
		echo $first_image;
	} elseif ( $image_upload ) {
		echo $image_upload;
	} else { 
		echo $default_image;
	} 
} 
endif;
if ( !function_exists('ktz_featured_just_img') ) :
function ktz_featured_just_img( $width, $height ) { 
	global $post;
	$permalink = get_permalink();
	$title = get_the_title();
	$params = array( 'width' => $width, 'height' => $height, 'crop' => true );
	$thumb = get_post_thumbnail_id();
	$img_url = wp_get_attachment_url( $thumb,'full' ); 
	$fisrtimg_url = get_first_image_src(); 
	$get_imgpost_upload = ktz_getpost_images_upload();
	$img_default = get_template_directory_uri() . '/includes/assets/img/no-image/image-blank.jpg'; 
	
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$image = apply_filters( 'jetpack_photon_url', $img_url, 'resize='. $width . ',' . $height );
	else :
		$image = bfi_thumb( $img_url, $params ); //resize & crop featured image
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$image_upload = apply_filters( 'jetpack_photon_url', $get_imgpost_upload, 'resize='. $width . ',' . $height );
	else :
		$image_upload = bfi_thumb( $get_imgpost_upload, $params ); //resize & crop featured image
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$first_image = apply_filters( 'jetpack_photon_url', $fisrtimg_url, 'resize='. $width . ',' . $height );
	else :
		$first_image = bfi_thumb( $fisrtimg_url, $params ); 
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$default_image = apply_filters( 'jetpack_photon_url', $img_default, 'resize='. $width . ',' . $height );
	else :
		$default_image = bfi_thumb( $img_default, $params ); 
	endif;
	
	if ( $image ) { 
		echo '<img src="' . $image . '" alt="' . $title . '" width="'.$width.'" height="'.$height.'" title="' . $title . '" />';
	} elseif ( $first_image ) {
		echo '<img src="' . $first_image . '" alt="' . $title . '" width="'.$width.'" height="'.$height.'" title="' . $title . '" />';
	} elseif ( $image_upload ) {
		echo '<img src="' . $image_upload . '" alt="' . $title . '" width="'.$width.'" height="'.$height.'" title="' . $title . '" />';;
	} else { 
		echo '<img src="' . $default_image . '" alt="' . $title . '" width="'.$width.'" height="'.$height.'" title="' . $title . '" />';
	} 
} 
endif;
if ( !function_exists('ktz_featured_just_img_width') ) :
function ktz_featured_just_img_width( $width ) { 
	global $post;
	$permalink = get_permalink();
	$title = get_the_title();
	$params = array( 'width' => $width );
	$thumb = get_post_thumbnail_id();
	$img_url = wp_get_attachment_url( $thumb,'full' ); 
	$fisrtimg_url = get_first_image_src(); 
	$get_imgpost_upload = ktz_getpost_images_upload();
	$img_default = get_template_directory_uri() . '/includes/assets/img/no-image/image-blank.jpg'; 
	
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$image = apply_filters( 'jetpack_photon_url', $img_url, 'resize='. $width );
	else :
		$image = bfi_thumb( $img_url, $params ); //resize & crop featured image
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$image_upload = apply_filters( 'jetpack_photon_url', $get_imgpost_upload, 'resize='. $width );
	else :
		$image_upload = bfi_thumb( $get_imgpost_upload, $params ); //resize & crop featured image
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$first_image = apply_filters( 'jetpack_photon_url', $fisrtimg_url, 'resize='. $width );
	else :
		$first_image = bfi_thumb( $fisrtimg_url, $params ); 
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$default_image = apply_filters( 'jetpack_photon_url', $img_default, 'resize='. $width );
	else :
		$default_image = bfi_thumb( $img_default, $params ); 
	endif;
	
	if ( $image ) { 
		echo '<img src="' . $image . '" alt="' . $title . '" width="'.$width.'" height="auto" title="' . $title . '" />';
	} elseif ( $first_image ) {
		echo '<img src="' . $first_image . '" alt="' . $title . '" width="'.$width.'" height="auto" title="' . $title . '" />';
	} elseif ( $image_upload ) {
		echo '<img src="' . $image_upload . '" alt="' . $title . '" width="'.$width.'" height="auto" title="' . $title . '" />';;
	} else { 
		echo '<img src="' . $default_image . '" alt="' . $title . '" width="'.$width.'" height="auto" title="' . $title . '" />';
	} 
} 
endif;
if ( !function_exists('ktz_featured_img') ) :
function ktz_featured_img( $width, $height ) { 
	global $post;
	$permalink = get_permalink();
	$title = get_the_title();
	$params = array( 'width' => $width, 'height' => $height, 'crop' => true );
	$thumb = get_post_thumbnail_id();
	$img_url = wp_get_attachment_url( $thumb,'full' ); 
	$fisrtimg_url = get_first_image_src(); 
	$get_imgpost_upload = ktz_getpost_images_upload();
	$img_default = get_template_directory_uri() . '/includes/assets/img/no-image/image-blank.jpg'; 
	
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$image = apply_filters( 'jetpack_photon_url', $img_url, 'resize='. $width . ',' . $height );
	else :
		$image = bfi_thumb( $img_url, $params ); //resize & crop featured image
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$image_upload = apply_filters( 'jetpack_photon_url', $get_imgpost_upload, 'resize='. $width . ',' . $height );
	else :
		$image_upload = bfi_thumb( $get_imgpost_upload, $params ); //resize & crop featured image
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$first_image = apply_filters( 'jetpack_photon_url', $fisrtimg_url, 'resize='. $width . ',' . $height );
	else :
		$first_image = bfi_thumb( $fisrtimg_url, $params ); 
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$default_image = apply_filters( 'jetpack_photon_url', $img_default, 'resize='. $width . ',' . $height );
	else :
		$default_image = bfi_thumb( $img_default, $params ); 
	endif;
	
	if ( $image ) { 
		echo '<a href="' . $permalink . '" class="ktz_thumbnail pull-left" title="Permalink to ' . $title . '">';
		echo '<img src="' . $image . '" class="media-object" alt="' . $title . '" width="'.$width.'" height="'.$height.'" title="' . $title . '" />';
		echo '</a>';
	} elseif ( $first_image ) {
		echo '<a href="' . $permalink . '" class="ktz_thumbnail pull-left" title="Permalink to ' . $title . '">';
		echo '<img src="' . $first_image . '" class="media-object" alt="' . $title . '" width="'.$width.'" height="'.$height.'" title="' . $title . '" />';
		echo '</a>';
	} elseif ( $image_upload ) {
		echo '<a href="' . $permalink . '" class="ktz_thumbnail pull-left" title="Permalink to ' . $title . '">';
		echo '<img src="' . $image_upload . '" alt="' . $title . '" width="'.$width.'" height="'.$height.'" title="' . $title . '" />';
		echo '</a>';
	} else { 
		echo '<a href="' . $permalink . '" class="ktz_thumbnail pull-left" title="Permalink to ' . $title . '">';
		echo '<img src="' . $default_image . '" class="media-object" alt="' . $title . '" width="'.$width.'" height="'.$height.'" title="' . $title . '" />';
		echo '</a>';
	} 
} 
endif;

if ( !function_exists('ktz_featured_img_width') ) :
function ktz_featured_img_width( $width ) { 
	global $post;
	$permalink = get_permalink();
	$title = get_the_title();
	$params = array( 'width' => $width );
	$thumb = get_post_thumbnail_id();
	$img_url = wp_get_attachment_url( $thumb,'full' ); 
	$fisrtimg_url = get_first_image_src(); 
	$get_imgpost_upload = ktz_getpost_images_upload();
	$img_default = get_template_directory_uri() . '/includes/assets/img/no-image/image-blank.jpg'; 
	
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$image = apply_filters( 'jetpack_photon_url', $img_url, 'resize='. $width );
	else :
		$image = bfi_thumb( $img_url, $params ); //resize & crop featured image
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$image_upload = apply_filters( 'jetpack_photon_url', $get_imgpost_upload, 'resize='. $width );
	else :
		$image_upload = bfi_thumb( $get_imgpost_upload, $params ); //resize & crop featured image
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$first_image = apply_filters( 'jetpack_photon_url', $fisrtimg_url, 'resize='. $width );
	else :
		$first_image = bfi_thumb( $fisrtimg_url, $params ); 
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$default_image = apply_filters( 'jetpack_photon_url', $img_default, 'resize='. $width );
	else :
		$default_image = bfi_thumb( $img_default, $params ); 
	endif;
	
	if ( $image ) { 
		echo '<a href="' . $permalink . '" class="ktz_thumbnail" title="Permalink to ' . $title . '">';
		echo '<img src="' . $image . '" class="media-object" alt="Permalink to ' . $title . '" width="'.$width.'" height="auto" title="Permalink to ' . $title . '" />';
		echo '</a>';
	} elseif ( $first_image ) {
		echo '<a href="' . $permalink . '" class="ktz_thumbnail" title="Permalink to ' . $title . '">';
		echo '<img src="' . $first_image . '" class="media-object" alt="Permalink to ' . $title . '" width="'.$width.'" height="auto" title="Permalink to ' . $title . '" />';
		echo '</a>';
	} elseif ( $image_upload ) {
		echo '<a href="' . $permalink . '" class="ktz_thumbnail" title="Permalink to ' . $title . '">';
		echo '<img src="' . $image_upload . '" alt="Permalink to ' . $title . '" width="'.$width.'" height="auto" title="Permalink to ' . $title . '" />';
		echo '</a>';
	} else { 
		echo '<a href="' . $permalink . '" class="ktz_thumbnail" title="Permalink to ' . $title . '">';
		echo '<img src="' . $default_image . '" class="media-object" alt="Permalink to ' . $title . '" width="'.$width.'" height="auto" title="Permalink to ' . $title . '" />';
		echo '</a>';
	} 
} 
endif;

if ( !function_exists('ktz_get_dl_image') ) :
function ktz_get_dl_image() { 
	global $post;
	$title = get_the_title();
	$thumb = get_post_thumbnail_id();
	
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$img_url = apply_filters( 'jetpack_photon_url', wp_get_attachment_url( $thumb,'full' ), 'resize='. $width );
	else :
		$img_url = wp_get_attachment_url( $thumb,'full' ); 
	endif;
	if (function_exists( 'jetpack_photon_url' ) && class_exists( 'Jetpack' ) && method_exists( 'Jetpack', 'get_active_modules' ) && in_array( 'photon', Jetpack::get_active_modules() )) :
		$fisrtimg_url = apply_filters( 'jetpack_photon_url', get_first_image_src(), 'resize='. $width );
	else :
		$fisrtimg_url = get_first_image_src(); 
	endif;
	
	if ( $img_url ) { 
		echo '<a href="' . $img_url . '" class="btn btn-block btn-default ktz-downloadbtn" target="_blank" title="' . $title . '">Download Full Image</a>';
	} elseif ( $fisrtimg_url ) {
		echo '<a href="' . $fisrtimg_url . '" class="btn btn-block btn-default ktz-downloadbtn" target="_blank" title="' . $title . '">Download Full Image</a>';
	} else {
		echo '';
	} 
}
add_action( 'ktz_get_dl_image', 'ktz_get_dl_image' );
endif;