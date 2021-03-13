<?php

/**
 * Class Radium_Theme_Importer
 *
 * This class provides the capability to import demo content as well as import widgets and WordPress menus
 *
 * @since 2.2.0
 *
 * @category RadiumFramework
 * @package  NewsCore WP
 * @author   Franklin M Gitonga
 * @link     http://radiumthemes.com/
 *
 */
class Radium_Theme_Importer {

	/**
	 * Holds a copy of the object for easy reference.
	 *
	 * @since 2.2.0
	 *
	 * @var object
	 */
	public $content_demo;

	/**
	 * Flag imported to prevent duplicates
	 *
	 * @since 2.2.0
	 *
	 * @var object
	 */
	public $flag_as_imported = array();

	/**
	 * Holds a copy of the object for easy reference.
	 *
	 * @since 2.2.0
	 *
	 * @var object
	 */
	private static $instance;

	/**
	 * Constructor. Hooks all interactions to initialize the class.
	 *
	 * @since 2.2.0
	 */
	public function __construct() {

		self::$instance = $this;
		// If woocommerce install so content with woocommerce should be install...
		if (class_exists('Woocommerce')) : 
		$this->content_demo = $this->demo_files_path . $this->content_demo_file_name_woocommerce;
		else :
		$this->content_demo = $this->demo_files_path . $this->content_demo_file_name;
		endif;

		add_action( 'admin_menu', array($this, 'add_admin') );

	}

	/**
	 * Add Panel Page
	 *
	 * @since 2.2.0
	 */
	public function add_admin() {

		add_theme_page("Import Demo Data", "Import Demo Data", 'switch_themes', 'radium_demo_installer', array($this, 'demo_installer'));

	}

	/**
	 * [demo_installer description]
	 *
	 * @since 2.2.0
	 *
	 * @return [type] [description]
	 */
	public function demo_installer() {
		?>
			<div class="wrap">
				<h2><span class="dashicons dashicons-update" style="line-height: 29px;"></span> Import Demo Data</h2>
				<div style="background-color: #F5FAFD; margin:10px 0;padding: 10px;color: #0C518F;border: 3px solid #CAE0F3; claer:both; width:90%; line-height:18px;">
					<p class="tie_message_hint">Importing demo data (post, pages, images, theme settings, ...) is the easiest way to setup your theme. It will allow you to quickly edit everything instead of creating content from scratch. When you import the data following things will happen:</p>

					<ul style="padding-left: 20px; list-style-position: inside; list-style-type: square;">
						<li>No existing posts, pages, categories, images, custom post types or any other data will be deleted or modified .</li>
						<li>No WordPress settings will be modified .</li>
						<li>Posts, pages, some images, some widgets and menus will get imported .</li>
						<li>Images will be downloaded from our server, these images are copyrighted and are for demo use only .</li>
						<li>Please click import only once and wait, it can take a couple of minutes</li>
					</ul>
				</div>

				<div style="background-color: #F5FAFD; margin:10px 0; padding: 10px; color: #0C518F; border: 3px solid #CAE0F3; claer:both; width:90%; line-height:18px;">
					<p class="tie_message_hint">Before you begin, make sure all the required plugins are activated.</p>
				</div>
				<form method="post" class="js-one-click-import-form">
					<input type="hidden" name="demononce" value="<?php echo wp_create_nonce('radium-demo-code'); ?>" />
					<input name="reset" class="panel-save button-primary" type="submit" value="Import Demo Data" />
					<input type="hidden" name="action" value="demo-data" />
				</form>

				<script>
					jQuery( function ( $ ) {
						$( '.js-one-click-import-form' ).on( 'submit', function () {
							$( this ).append( '<p style="font-width: bold; font-size: 1.5em;"><span class="spinner" style="display: inline-block; float: none;"></span> Importing now, please wait!</p>' );
							$( this ).find( '.panel-save' ).attr( 'disabled', true );
						} );
					} );
				</script>

				<br />
				<br />
			</div>

		<?php

		$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

		if( 'demo-data' == $action && check_admin_referer('radium-demo-code' , 'demononce')){

			$this->set_demo_data( $this->content_demo );

			$this->set_demo_menus();

		}

	}


	public function set_demo_data( $file ) {

		if ( !defined('WP_LOAD_IMPORTERS') ) define('WP_LOAD_IMPORTERS', true);

		require_once ABSPATH . 'wp-admin/includes/import.php';

		$importer_error = false;

		if ( !class_exists( 'WP_Importer' ) ) {

			$class_wp_importer = ABSPATH . 'wp-admin/includes/class-wp-importer.php';

			if ( file_exists( $class_wp_importer ) ){

				require_once($class_wp_importer);

			} else {

				$importer_error = true;

			}

		}

		if ( !class_exists( 'WP_Import' ) ) {

			$class_wp_import = dirname( __FILE__ ) .'/wordpress-importer.php';

			if ( file_exists( $class_wp_import ) )
				require_once($class_wp_import);
			else
				$importer_error = true;

		}

		if($importer_error){

			die("Error on import");

		} else {

			if(!is_file( $file )){

				echo "The XML file containing the dummy content is not available or could not be read .. You might want to try to set the file permission to chmod 755.<br/>If this doesn't work please use the Wordpress importer and import the XML file (should be located in your download .zip: Sample Content folder) manually ";

			} else {

			   $wp_import = new WP_Import();
			   $wp_import->fetch_attachments = true;
			   $wp_import->import( $file );

			}

		}

	}

	public function set_demo_menus() {}


}