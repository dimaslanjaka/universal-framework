<?php

/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package MaterialWP
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">

	<?php wp_head(); ?>
	<!--<link rel="stylesheet" href="https://mdbootstrap.com/wp-includes/css/dist/block-library/style.css?ver=5.3.2">
	<link rel="stylesheet" href="https://mdbootstrap.com/wp-content/themes/mdbootstrap4/css/compiled-4.11.0.min.css?ver=4.11.0">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.10.1/css/mdb.min.css" rel="stylesheet">
	-->
	<link rel='stylesheet' href='https://dimaslanjaka.github.io/Web-Manajemen/css/compiled.block.css' type='text/css' media='all' />
	<link rel='stylesheet' href='https://git.webmanajemen.com/Web-Manajemen/css/compiled.min.css' type='text/css' media='all' />
</head>

<body <?php body_class(); ?>>
	<div id="page" class="site">

		<header id="masthead" class="site-header" role="banner">
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
				<div class="container">
					<div class="navbar-brand mb-0"><a href="<?php echo esc_url(home_url('/')); ?>" rel="home"><?php bloginfo('name'); ?></a></div>
					<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarNav">
						<?php
						$args = array(
							'theme_location' => 'primary',
							'depth'      => 2,
							'container'  => false,
							'menu_class'     => 'navbar-nav',
							'walker'     => new Bootstrap_Walker_Nav_Menu()
						);
						if (has_nav_menu('primary')) {
							wp_nav_menu($args);
						}
						?>
					</div>

				</div>
			</nav>
		</header><!-- #masthead -->

		<div id="content" class="site-content mt-2">