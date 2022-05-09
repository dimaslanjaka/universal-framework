<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Superfast
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head <?php echo superfast_itemtype_schema( 'WebSite' ); ?>>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> <?php echo superfast_itemtype_schema( 'WebPage' ); ?>>

<div class="site inner-wrap" id="site-container">
	
	<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e( 'Skip to content', 'superfast' ); ?></a>
	
	<?php 
		global $post;
		
		// Prevent error in 404 page
		$id = ( isset( $post->ID ) ? get_the_ID() : NULL );
		
		$header_display = get_post_meta( $id, '_gmr_header_key', true ); 
		
		if ( ! $header_display || is_search() ) :
	?>

		<header id="masthead" class="site-header" role="banner" <?php echo superfast_itemtype_schema( 'WPHeader' ); ?>>
		<?php
			$enable_logo = get_theme_mod( 'gmr_active-logosection', 0 );
			if ( $enable_logo === 0 ) {
		?>
				<div class="container">
					<div class="clearfix gmr-headwrapper">
						<?php 
							do_action( 'gmr_the_custom_logo' );
							do_action( 'idblog_core_top_banner' );
						?>
					</div>
				</div>
				
		<?php 	
			}
		?>
				
			<?php
			// Menu style via customizer
			$menu_style = get_theme_mod( 'gmr_menu_style', 'gmr-boxmenu' );
			?>
			
			<div class="top-header">
				<?php if ( $menu_style == 'gmr-boxmenu' ) : ?>
				<div class="container">
				<?php endif; ?>
					<div class="gmr-menuwrap clearfix">
					<?php if ( $menu_style == 'gmr-fluidmenu' ) : ?>
					<div class="container">
					<?php endif; ?>
						<a id="gmr-responsive-menu" href="#menus">
							<?php esc_html_e( 'MENU', 'superfast' ); ?>
						</a>
						<nav id="site-navigation" class="gmr-mainmenu" role="navigation" <?php echo superfast_itemtype_schema( 'SiteNavigationElement' ); ?>>
							<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => 'ul', 'menu_id' => 'primary-menu', 'link_before' => '<span itemprop="name">', 'link_after' => '</span>' ) ); ?>
						</nav><!-- #site-navigation -->
					</div>
				</div>
			</div><!-- .top-header -->
		</header><!-- #masthead -->

	<?php 	
		endif;
	?>

	<?php if ( ! is_page_template('page_builder.php') ) : ?>
		<div id="content" class="gmr-content">
		
			<?php 
				$setting = 'gmr_slider_shortcode';
				$mod = get_theme_mod( $setting, customizer_library_get_default( $setting ) );
				if ( isset($mod) && !empty($mod) && is_front_page() ) {
			?>
				<div class="gmr-slider">
					<div class="container">
						<?php echo do_shortcode($mod); ?>
					</div>
				</div>
			<?php
				}
			?>
		
			<?php do_action( 'idblog_core_top_banner_after_menu' ); ?>
			<div class="container">
				<div class="row">
					<?php do_action( 'idblog_core_view_breadcrumbs' ); ?>
	<?php endif; ?>