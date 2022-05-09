<?php
/**
 * Importer plugin filter.
 *
 * @link https://wordpress.org/plugins/one-click-demo-import/
 *
 * @package Superfast
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if ( ! function_exists( 'superfast_ocdi_import_files' ) ) :
	/**
	 * Set one click import demo data. Plugin require is. https://wordpress.org/plugins/one-click-demo-import/
	 *
	 * @since v.1.0.0
	 * @link https://wordpress.org/plugins/one-click-demo-import/faq/
	 *
	 * @return array
	 */
	function superfast_ocdi_import_files() {
		if ( class_exists( 'WooCommerce' ) ) {
			$arr = array(
				array(
					'import_file_name'             	=> 'Demo Import Default Layout',
					'local_import_file'            	=> trailingslashit( get_template_directory() ) . 'inc/demo-data/demo-content.xml',
					'local_import_widget_file'     	=> trailingslashit( get_template_directory() ) . 'inc/demo-data/widgets.json',
					'local_import_customizer_file' 	=> trailingslashit( get_template_directory() ) . 'inc/demo-data/customizer.dat',
					'import_notice'              => __( 'Import demo from http://demo.idtheme.com/superfast/.', 'superfast' ),
				),
				array(
					'import_file_name'   			=> 'Demo Import Masonry Layout',
					'local_import_file'            	=> trailingslashit( get_template_directory() ) . 'inc/demo-data/demo-content.xml',
					'local_import_widget_file'     	=> trailingslashit( get_template_directory() ) . 'inc/demo-data/widgets-masonry.json',
					'local_import_customizer_file' 	=> trailingslashit( get_template_directory() ) . 'inc/demo-data/customizer-masonry.dat',
					'import_notice'              => __( 'Import demo from http://demo.idtheme.com/superfast-masonry/.', 'superfast' ),
				),
				array(
					'import_file_name'   			=> 'Demo Import Woocommerce Layout',
					'local_import_file'            	=> trailingslashit( get_template_directory() ) . 'inc/demo-data/demo-content-woo.xml',
					'local_import_widget_file'     	=> trailingslashit( get_template_directory() ) . 'inc/demo-data/widgets-woo.json',
					'local_import_customizer_file' 	=> trailingslashit( get_template_directory() ) . 'inc/demo-data/customizer-woo.dat',
					'import_notice'              => __( 'Import demo from http://demo.idtheme.com/superfast-woo/.', 'superfast' ),
				)
			);
		} else {
			$arr = array(
				array(
					'import_file_name'             	=> 'Demo Import Default Layout',
					'local_import_file'            	=> trailingslashit( get_template_directory() ) . 'inc/demo-data/demo-content.xml',
					'local_import_widget_file'     	=> trailingslashit( get_template_directory() ) . 'inc/demo-data/widgets.json',
					'local_import_customizer_file' 	=> trailingslashit( get_template_directory() ) . 'inc/demo-data/customizer.dat',
					'import_notice'              => __( 'Import demo from http://demo.idtheme.com/superfast/.', 'superfast' ),
				),
				array(
					'import_file_name'   			=> 'Demo Import Masonry Layout',
					'local_import_file'            	=> trailingslashit( get_template_directory() ) . 'inc/demo-data/demo-content.xml',
					'local_import_widget_file'     	=> trailingslashit( get_template_directory() ) . 'inc/demo-data/widgets-masonry.json',
					'local_import_customizer_file' 	=> trailingslashit( get_template_directory() ) . 'inc/demo-data/customizer-masonry.dat',
					'import_notice'              => __( 'Import demo from http://demo.idtheme.com/superfast-masonry/.', 'superfast' ),
				)
			);
		}
		return $arr;
	}
endif;
add_filter( 'pt-ocdi/import_files', 'superfast_ocdi_import_files' );

if ( ! function_exists( 'superfast_ocdi_after_import' ) ) :
	/**
	 * Set action after import demo data. Plugin require is. https://wordpress.org/plugins/one-click-demo-import/
	 *
	 * @since v.1.0.0
	 * @link https://wordpress.org/plugins/one-click-demo-import/faq/
	 *
	 * @return void
	 */
	function superfast_ocdi_after_import( $selected_import ) {
		
		// Menus to Import and assign - you can remove or add as many as you want
		$top_menu = get_term_by('name', 'Top menus', 'nav_menu');

		set_theme_mod ( 'nav_menu_locations', array(
				'primary' => $top_menu->term_id
			)
		);
		
		if ( 'Demo Import Default Layout' === $selected_import['import_file_name'] ) {
			
			// update option post per page
			update_option( 'posts_per_page', 7 );
			
		}
		if ( 'Demo Import Masonry Layout' === $selected_import['import_file_name'] && class_exists( 'WooCommerce' ) ) {
			
			// update option post per page
			update_option( 'posts_per_page', 6 );
			
			// get page name
			$homepage = get_page_by_title( 'Shop' );
			if ( $homepage ) {
				update_option( 'page_on_front', $homepage->ID );
				update_option( 'show_on_front', 'page' );
			}
			
			// get page name
			$blog = get_page_by_title( 'blog' );
			if ( $blog ) {
				update_option( 'page_for_posts', $blog->ID );
			}
			
		}

	}
endif;
add_action( 'pt-ocdi/after_import', 'superfast_ocdi_after_import' );

// disable generation of smaller images (thumbnails) during the content import
add_filter( 'pt-ocdi/regenerate_thumbnails_in_content_import', '__return_false' );