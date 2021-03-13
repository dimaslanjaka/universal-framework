<?php
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Function to import widgets based on a JSON config file
 * JSON file is generated using plugin: Widget Importer / Exporter
 *
 * @link https://github.com/stevengliebe/widget-importer-exporter
 */
function shapely_companion_add_default_widgets() {
	$json             = '{"sidebar-1":{"search-2":{"title":""},"recent-posts-2":{"title":"","number":5},"categories-2":{"title":"","count":0,"hierarchical":0,"dropdown":0}},"sidebar-home":{"shapely_home_parallax-2":{"title":"We Change Everything WordPress","image_src":"https:\/\/colorlib.com\/shapely\/wp-content\/uploads\/sites\/12\/2016\/03\/photo-1443527216320-7e744084f5a7-1.jpg","image_pos":"background-full","body_content":"This is the only WordPress theme you will ever want to use.","button1":"Read More","button2":"Download Now","button1_link":"#","button2_link":"#","border_bottom":""},"shapely_home_parallax-3":{"title":"SEO Friendly","image_src":"https:\/\/colorlib.com\/shapely\/wp-content\/uploads\/sites\/12\/2016\/03\/macbook-preview-flexible.png","image_pos":"left","body_content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar luctus sem, eget porta orci. Maecenas molestie dui id diam feugiat, eu tincidunt mauris aliquam. Duis commodo vitae ligula et interdum. Maecenas faucibus mattis imperdiet. In rhoncus ac ligula id ultricies.","button1":"Read more","button2":"","button1_link":"#","button2_link":"","border_bottom":""},"shapely_home_parallax-4":{"title":"Portfolio Section","image_src":"https:\/\/colorlib.com\/shapely\/wp-content\/uploads\/sites\/12\/2016\/03\/flexible-portfolio.png","image_pos":"right","body_content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar luctus sem, eget porta orci. Maecenas molestie dui id diam feugiat, eu tincidunt mauris aliquam. Duis commodo vitae ligula et interdum.","button1":"See it in action","button2":"","button1_link":"#","button2_link":"","border_bottom":""},"shapely_home_parallax-5":{"title":"Small Parallax Section","image_src":"https:\/\/colorlib.com\/shapely\/wp-content\/uploads\/sites\/12\/2016\/12\/photo-1452723312111-3a7d0db0e024.jpg","image_pos":"background-small","body_content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus imperdiet rhoncus porta. Ut quis sem quis purus lobortis dictum. Aliquam nec dignissim nisl. Vivamus cursus feugiat sapien, eget tincidunt leo ornare quis.","button1":"MORE INFO","button2":"","button1_link":"#","button2_link":"","border_bottom":""},"shapely_home_parallax-6":{"title":"Limitless Options","image_src":"https:\/\/colorlib.com\/shapely\/wp-content\/uploads\/sites\/12\/2016\/12\/photo-1440557653082-e8e186733eeb-1.jpg","image_pos":"bottom","body_content":"Phasellus sed nisi ac dui interdum semper. Etiam consequat fermentum sollicitudin. Fusce vulputate porta faucibus. Vivamus nulla tellus, accumsan non efficitur id, pretium quis ante","button1":"Download Now","button2":"","button1_link":"#","button2_link":"","border_bottom":""},"shapely_home_portfolio-2":{"title":"Our Latest Projects","body_content":"Here is our latest projects. You&#039;ll love them!"},"shapely_home_testimonial-2":{"title":"What Our Customers Say","limit":5,"image_src":"https:\/\/colorlib.com\/shapely\/wp-content\/uploads\/sites\/12\/2016\/12\/photo-1451417379553-15d8e8f49cde.jpg"},"shapely_home_contact-2":{"title":"Contact us","image_src":"","body_content":"Mauris vestibulum, metus at semper efficitur, est ex tincidunt elit, vitae tincidunt sem sem in est. Sed eget enim nunc.","phone":"(650) 652-8500","address":"33 Farlane Street Keilor East VIC 3033, New York","email":"mail@mail.com","contactform":32,"socialicons":""},"shapely_home_clients-2":{"title":"Our Main Clients","client_logo":{"img":["https:\/\/colorlib.com\/shapely\/wp-content\/uploads\/sites\/12\/2016\/03\/colorlib-logo.png","https:\/\/colorlib.com\/shapely\/wp-content\/uploads\/sites\/12\/2016\/03\/js-logo.png","https:\/\/colorlib.com\/shapely\/wp-content\/uploads\/sites\/12\/2016\/03\/html5-logo.png","https:\/\/colorlib.com\/shapely\/wp-content\/uploads\/sites\/12\/2016\/03\/css-logo.png","https:\/\/colorlib.com\/shapely\/wp-content\/uploads\/sites\/12\/2016\/03\/less-logo.png","https:\/\/colorlib.com\/shapely\/wp-content\/uploads\/sites\/12\/2016\/03\/sass-logo.png","https:\/\/colorlib.com\/shapely\/wp-content\/uploads\/sites\/12\/2016\/03\/bootstrap-logo.jpg","https:\/\/colorlib.com\/shapely\/wp-content\/uploads\/sites\/12\/2016\/03\/adobe-logo.png","https:\/\/colorlib.com\/shapely\/wp-content\/uploads\/sites\/12\/2016\/03\/facebook-logo.png"],"link":["#","#","#","#","#","#","#","#","#"]}},"shapely_home_cfa-2":{"title":"Do you like this awesome WordPress theme?","button":"Download Now","button_link":"#"}}}';
	$config           = json_decode( $json );
	$sidebars_widgets = get_option( 'sidebars_widgets' );
	# Parse config
	foreach ( $config as $sidebar => $elemements ) {
		# verify if the sidebar doesn't have ny widgets
		if ( false === strpos( $sidebar, 'orphaned_widgets' ) && ! is_active_sidebar( $sidebar ) ) {
			# create an empty array for active widgets
			$this_sidebar_active_widgets = array();
			# parse all widgets for current sidebar
			foreach ( $elemements as $id_widget => $args ) {
				# add current widget to current sidebar
				$this_sidebar_active_widgets[] = $id_widget;
				# split widget name in order to get widget name and index
				$id_widget_parts = explode( '-', $id_widget );
				# get widget index
				$index_widget = end( $id_widget_parts );
				#remove widget index from array
				array_pop( $id_widget_parts );
				#generate widget name
				$widget_name = implode( '-', $id_widget_parts );
				#get all widgets who are like current widget
				$widgets = get_option( 'widget_' . $widget_name );
				#check if current index exist in array
				if ( ! isset( $widgets[ $index_widget ] ) ) {

					#check if a contact form 7 exist.
					if ( false !== strpos( $id_widget, 'shapely_home_contact' ) ) {
						$cf_args = array(
							'post_type'   => 'wpcf7_contact_form',
							'post_status' => 'publish',
							'fields'      => 'ids',
						);
						$cf7     = get_posts( $cf_args );
						if ( ! empty( $cf7 ) && isset( $cf7[0] ) ) {
							$args->contactform = $cf7[0];
						}
					}

					#add current widget with his index and args
					$widgets[ $index_widget ] = get_object_vars( $args );

				}
				#update widgets who are like current widget
				update_option( 'widget_' . $widget_name, $widgets );
			}
			$sidebars_widgets[ $sidebar ] = $this_sidebar_active_widgets;
		}
	}
	update_option( 'sidebars_widgets', $sidebars_widgets );
}

add_action( 'wp_ajax_shapely_companion_import_content', 'shapely_companion_import_content' );

function shapely_companion_import_content() {

	if ( isset( $_POST['import'] ) ) {

		if ( 'import-all' == $_POST['import'] ) {

			$frontpage_title = __( 'Front Page', 'shapely-companion' );
			$blog_title      = __( 'Blog', 'shapely-companion' );

			$frontpage_id = wp_insert_post(
				array(
					'post_title'  => $frontpage_title,
					'post_status' => 'publish',
					'post_type'   => 'page',
				)
			);
			$blog_id      = wp_insert_post(
				array(
					'post_title'  => $blog_title,
					'post_status' => 'publish',
					'post_type'   => 'page',
				)
			);

			if ( - 1 != $frontpage_id ) {
				update_post_meta( $frontpage_id, '_wp_page_template', 'page-templates/template-home.php' );
			} // End if().

			update_option( 'show_on_front', 'page' );
			update_option( 'page_on_front', $frontpage_id );
			update_option( 'page_for_posts', $blog_id );
			shapely_companion_add_default_widgets();

		} elseif ( 'import-widgets' == $_POST['import'] ) {
			shapely_companion_add_default_widgets();
		} elseif ( 'set-frontpage' == $_POST['import'] ) {

			$frontpage_title = __( 'Front Page', 'shapely-companion' );
			$blog_title      = __( 'Blog', 'shapely-companion' );

			$frontpage_id = wp_insert_post(
				array(
					'post_title'  => $frontpage_title,
					'post_status' => 'publish',
					'post_type'   => 'page',
				)
			);
			$blog_id      = wp_insert_post(
				array(
					'post_title'  => $blog_title,
					'post_status' => 'publish',
					'post_type'   => 'page',
				)
			);

			if ( - 1 != $frontpage_id ) {
				update_post_meta( $frontpage_id, '_wp_page_template', 'page-templates/template-home.php' );
			} // End if().

			update_option( 'show_on_front', 'page' );
			update_option( 'page_on_front', $frontpage_id );
			update_option( 'page_for_posts', $blog_id );

		}

		update_option( 'shapely_imported_demo', true );

		echo wp_json_encode(
			array(
				'status'  => true,
				'message' => 'ok',
			)
		);
	} else {
		echo wp_json_encode(
			array(
				'status'  => false,
				'message' => 'nok',
			)
		);
	}// End if().

	exit();

}
