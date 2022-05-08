<?php

/**
 * Fired during plugin activation
 *
 * @link       http://pagefrog.com
 * @since      1.0.0
 *
 * @package    pagefrog
 * @subpackage pagefrog/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    pagefrog
 * @subpackage pagefrog/includes
 * @author     PageFrog Team <team@pagefrog.com>
 */
class PageFrog_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
    add_option( 'pagefrog_do_activation_redirect', true );
	}

}
