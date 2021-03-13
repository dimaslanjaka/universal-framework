<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://pagefrog.com
 *
 * @package    pagefrog
 * @subpackage pagefrog/public
 */

class PageFrog_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Generate an Instant-Articles-formatted feed
	 */
	public function generate_instant_articles_feed() {

    $rss_template = PF__PLUGIN_DIR . 'templates/pagefrog-feed.php';
		load_template($rss_template);
	}

}