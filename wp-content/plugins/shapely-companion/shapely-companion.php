<?php
/**
* Plugin Name:       	Shapely Companion
* Plugin URI:        	https://colorlib.com/wp/themes/shapely/
* Description:       	Shapely Companion is a companion plugin for Shapely theme.
* Version:       		1.2.4
* Author: 				Colorlib
* Author URI: 			https://colorlib.com/
* Tested up to: 		5.1
* Requires: 			4.6 or higher
* License: 				GPLv3 or later
* License URI: 			http://www.gnu.org/licenses/gpl-3.0.html
* Requires PHP: 		5.6
* Text Domain: 			shapely-companion
* Domain Path: 			/languages
*
* Copyright 2016-2019 Colorlib support@colorlib.com
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License, version 3, as
* published by the Free Software Foundation.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'SHAPELY_COMPANION', '1.2.4' );

/**
 * Load the Dashboard Widget
 */
require_once plugin_dir_path( __FILE__ ) . 'inc/epsilon-dashboard/class-epsilon-dashboard.php';

/**
 * The helper method to run the class
 *
 * @return Epsilon_Dashboard
 */
function shapely_companion_dashboard_widget() {
	$epsilon_dashboard_args = array(
		'widget_title' => esc_html__( 'From our blog', 'shapely-companion' ),
		'feed_url'  => array( 'https://colorlib.com/wp/feed/' ),
	);
	return Epsilon_Dashboard::instance( $epsilon_dashboard_args );
}

shapely_companion_dashboard_widget();

$current_theme = wp_get_theme();
$current_parent = $current_theme->parent();

if ( 'Shapely' == $current_theme->get( 'Name' ) || ( $current_parent && 'Shapely' == $current_parent->get( 'Name' ) ) ) {

	/**
	 * Load the Widgets
	 */
	require_once plugin_dir_path( __FILE__ ) . 'inc/shapely-widgets.php';

	/**
	 * Load Enqueues
	 */
	require_once plugin_dir_path( __FILE__ ) . '/inc/shapely-enqueues.php';


	/**
	 * Load Helper
	 */
	require_once plugin_dir_path( __FILE__ ) . '/inc/shapely-helper.php';

	/**
	 * Load Import Demo Content Functionality
	 */
	require_once plugin_dir_path( __FILE__ ) . '/inc/shapely-demo-content.php';

	/**
	 * Load Nav Menu Functionality
	 */
	require_once plugin_dir_path( __FILE__ ) . '/inc/shapely-navmenu.php';

	/**
	 * Load Metabox for Portfolio
	 */
	if ( class_exists( 'Jetpack' ) && Jetpack::is_module_active( 'custom-content-types' ) ) {
		$jetpack_portfolio = get_option( 'jetpack_portfolio' );
		if ( $jetpack_portfolio ) {
			require_once plugin_dir_path( __FILE__ ) . '/inc/shapely-metabox.php';
		}
	}
} else {
	add_action( 'admin_notices', 'shapely_companion_admin_notice', 99 );
	function shapely_companion_admin_notice() {
	?>
		<div class="notice-warning notice">
			<p><?php printf( __( 'In order to use the <strong>Shapely Companion</strong> plugin you have to also install the %1$sShapely Theme%2$s', 'shapely-companion' ), '<a href="https://wordpress.org/themes/shapely/" target="_blank">', '</a>' ); ?></p>
		</div>
		<?php
	}
}


