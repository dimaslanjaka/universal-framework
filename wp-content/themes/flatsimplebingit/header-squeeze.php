<!DOCTYPE html>
<!--[if IE 7]><html class="ie7 no-js"  <?php language_attributes(); ?><![endif]-->
<!--[if lte IE 8]><html class="ie8 no-js"  <?php language_attributes(); ?><![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html class="not-ie no-js" <?php language_attributes(); ?>><!--<![endif]-->

<head>

	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	
	<!-- Meta responsive compatible mode on IE and chrome, and zooming 1 by kentooz themes -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- mobile optimized meta by kentooz themes -->
	<meta name="HandheldFriendly" content="True" />
	<meta name="MobileOptimized" content="320" />

	<!-- Title by kentooz themes -->
	<title><?php wp_title( '|', true, 'right' ); ?></title>

	<?php wp_head(); ?>
	
	<?php
	/*
	* Width setting
	*/
	global $post;
	if (isset($post->ID)) {
		$meta_values = get_post_custom($post->ID);
	}
	if(	isset($meta_values['ktz_width_squeeze'] ) ) {
		$ktz_width_sqz = $meta_values['ktz_width_squeeze'][0];
		echo '<style type="text/css" media="screen">'; 
		echo '.ktz-allwrap.wrap-squeeze,'; 
	echo '.footer-squeeze,'; 
	echo '.ktz-footbg-squeeze{'; 
		echo 'width:100%;max-width:' .  $ktz_width_sqz . ';';
		echo '}';
	echo '@media only screen and (max-width: 992px) {'; 
		echo '.ktz-allwrap.wrap-squeeze,'; 
		echo '.footer-squeeze,'; 
		echo '.ktz-footbg-squeeze{width:90%;}'; 
	echo '}'; 
	echo '</style>'; 
	}
	?>
	
	<?php
	/*
	* Style setting
	*/
	global $post;
	if (isset($post->ID)) {
		$meta_values = get_post_custom($post->ID);
	}
	if( isset($meta_values['ktz_contentbg_squeeze']) ){
		$ktz_contentbg = unserialize($meta_values['ktz_contentbg_squeeze'][0]);
	} else {
	 	$ktz_contentbg = '';
	}
	
	if ( !isset($ktz_contentbg['background-image']) || $ktz_contentbg['background-image'] == "" ){
	 	$ktz_contentbg_url = "";
	} else {
	 	$ktz_contentbg_url = "url('". $ktz_contentbg['background-image'] . "')";
	}
	 
	if ( !isset($ktz_contentbg['background-color']) || $ktz_contentbg['background-color'] == "" ){
	 	$ktz_contentbg['background-color'] = "#fff";
	}
	 
	if ( !isset($ktz_contentbg['background-attachment']) || $ktz_contentbg['background-attachment'] == "" ){
	 	$ktz_contentbg['background-attachment'] = "";
	}
	 
	if ( !isset($ktz_contentbg['background-position']) || $ktz_contentbg['background-position'] == "" ){
	 	$ktz_contentbg['background-position'] = "";
	}
	 
	if ( !isset($ktz_contentbg['background-repeat']) || $ktz_contentbg['background-repeat'] == "" ){
	 	$ktz_contentbg['background-repeat'] = "";
	}
	if(	isset($meta_values['ktz_margintop_squeeze'] ) ) {
		$ktz_margintop_sqz = $meta_values['ktz_margintop_squeeze'][0];
		echo '<style type="text/css" media="screen">'; 
		echo '.ktz-allwrap.wrap-squeeze{'; 
		echo 'margin-top:' .  $ktz_margintop_sqz . ';';
		echo 'background:' . $ktz_contentbg['background-color'] . ' ' . $ktz_contentbg_url . ' ' . $ktz_contentbg['background-repeat'] . ' ' .  $ktz_contentbg['background-position'] . ' ' .  $ktz_contentbg['background-attachment'] . ';'; 
		echo '}';
	echo '</style>'; 
	}
	?>

</head>

<body <?php body_class('kentooz ktz-squeeze'); ?> id="top">
	<?php
	/*
	* Header setting
	*/
	global $post;
	if (isset($post->ID)) {
	 	$meta_values = get_post_custom($post->ID);
	}
	if(	isset($meta_values['ktz_headbg_squeeze'] ) && $meta_values['ktz_headbg_squeeze'][0] != '' ) {
		$ktz_headerbg = $meta_values['ktz_headbg_squeeze'][0];
		echo '<div class="ktz-footbg-squeeze">';
		echo '<img src="' . $ktz_headerbg . '" title="Header ' . get_the_title() . '" alt="Header ' . get_the_title() . '" />'; 
		echo '</div>';
	}
	?>
	<div class="ktz-allwrap wrap-squeeze">
	
	<div class="container">
	<div class="row">