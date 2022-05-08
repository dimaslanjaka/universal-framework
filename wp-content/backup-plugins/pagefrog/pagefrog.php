<?php
/*
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://pagefrog.com
 * @since             1.0.0
 * @package           pagefrog
 *
 * @wordpress-plugin
 * Plugin Name:       Facebook Instant Articles & Google AMP Pages by PageFrog
 * Plugin URI:        http://pagefrog.com/
 * Description:       The PageFrog plugin allows you to easily publish and manage your content directly from WordPress for Facebook Instant Articles (FBIA) and Google Accelerated Mobile Pages (AMP) with full support for ads and analytics.
 * Version:           1.0.9
 * Author:            PageFrog Team
 * Author URI:        http://pagefrog.com/
 * Text Domain:       pagefrog
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'PF__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-pagefrog-activator.php
 */
function activate_pagefrog() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-pagefrog-activator.php';
	PageFrog_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-pagefrog-deactivator.php
 */
function deactivate_pagefrog() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-pagefrog-deactivator.php';
	PageFrog_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_pagefrog' );
register_deactivation_hook( __FILE__, 'deactivate_pagefrog' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-pagefrog.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_pagefrog() {

	$plugin = new PageFrog();
	$plugin->run();

}
run_pagefrog();
