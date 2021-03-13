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
	<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<script>
			(adsbygoogle = window.adsbygoogle || []).push({
						google_ad_client: "ca-pub-7975270895217217",
						enable_page_level_ads: true
			});
	</script>
</head>
<body <?php body_class('kentooz'); ?> id="top">

	<div class="ktz-allwrap">
		<div class="ktz-bgstripes">
			<span class="ktz-bgstripe ktz-color1"></span><span class="ktz-bgstripe ktz-color2"></span>
			<span class="ktz-bgstripe ktz-color3"></span><span class="ktz-bgstripe ktz-color4"></span>
			<span class="ktz-bgstripe ktz-color5"></span><span class="ktz-bgstripe ktz-color6"></span>
			<span class="ktz-bgstripe ktz-color7"></span><span class="ktz-bgstripe ktz-color8"></span>
			<span class="ktz-bgstripe ktz-color9"></span><span class="ktz-bgstripe ktz-color10"></span>
			<span class="ktz-bgstripe ktz-color11"></span><span class="ktz-bgstripe ktz-color12"></span>
			<span class="ktz-bgstripe ktz-color13"></span><span class="ktz-bgstripe ktz-color14"></span>
			<span class="ktz-bgstripe ktz-color15"></span><span class="ktz-bgstripe ktz-color16"></span>
			<span class="ktz-bgstripe ktz-color17"></span><span class="ktz-bgstripe ktz-color18"></span>
			<span class="ktz-bgstripe ktz-color19"></span><span class="ktz-bgstripe ktz-color20"></span>
		</div>
	<header class="ktz-mainheader">
	<div class="header-wrap">
		<div class="container">
			<div class="row clearfix">
				<div class="col-md-6">
					<?php do_action( 'ktz_headlogo' ); // Function in _logo_ktz.php ?>
				</div>
				<div class="col-md-6">
					<?php
					do_action( 'ktz_topsearch' ); // Function in _head_ktz.php
					// Add wishlist plugin in header, function in _woocommerce_ktz.php
					do_action( 'ktz_display_wishlist' );
					// Add header cart in header, function in _woocommerce_ktz.php
					do_action( 'ktz_head_cart' );
					?>
				</div>
			</div>
		</div>
	</div>
	</header>

	<div class="container">
		<nav class="ktz-mainmenu clearfix">
			<?php do_action( 'ktz_topmenu' ); // Function in _navigation_ktz.php ?>
		</nav>
	</div>
	<nav class="ktz-mobilemenu clearfix"></nav>


	<div class="ktz-inner-content">
		<div class="container">
			<?php do_action( 'ktz_aftermenubanner' ); // function in _banner_ktz.php ?>
		</div>
		<div class="container">
		<?php
			if (class_exists('Woocommerce')) :
				if ( is_woocommerce() ) :
					do_action( 'ktz_custom_breadcrumb' );
				else :
					do_action( 'ktz_crumbs' ); // Function in _navigation_ktz.php
				endif;
			else :
				do_action( 'ktz_crumbs' ); // Function in _navigation_ktz.php
			endif;
		?>
			<div class="row">
