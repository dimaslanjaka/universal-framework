<?php
/**
 * Add Simple Metaboxes Settings
 *
 * @package Superfast
 */
 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Register a meta box using a class.
 *
 * @since 1.0.0
 */
class GMR_Metabox_Settings {

    /**
     * Constructor.
     */
	public function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'add_meta_box' ) );
		add_action( 'save_post', array( $this, 'save' ) );
	}

    /**
     * Adds the meta box.
	 *
	 * @param string $post_type
     */
	public function add_meta_box( $post_type ) {
        $post_types = array('post', 'page');
        if ( in_array( $post_type, $post_types )) {
			add_meta_box(
				'gmr_header_metabox'
				,__( 'Theme Settings', 'superfast' )
				,array( $this, 'render_meta_box_content' )
				,$post_type
				,'side'
				,'low'
			);
        }
	}

    /**
     * Save the meta box.
	 *
	 * @param int $post_id Post ID.
	 *
	 * @return int $post_id
     */
	public function save( $post_id ) {
	
		// Check if our nonce is set.
		if ( ! isset( $_POST['gmr_header_box_nonce'] ) )
			return $post_id;

		$nonce = $_POST['gmr_header_box_nonce'];

		// Verify that the nonce is valid.
		if ( ! wp_verify_nonce( $nonce, 'gmr_header_box' ) )
			return $post_id;

		// If this is an autosave, our form has not been submitted,
                //     so we don't want to do anything.
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) 
			return $post_id;

		// Check the user's permissions.
		if ( 'page' == $_POST['post_type'] ) {

			if ( ! current_user_can( 'edit_page', $post_id ) )
				return $post_id;
	
		} else {

			if ( ! current_user_can( 'edit_post', $post_id ) )
				return $post_id;
		}

		// Sanitize the user input using boolean
		$mydata = isset( $_POST['gmr_header_field'] ) ? (bool) $_POST['gmr_header_field'] : false;
		$mydata_section = isset( $_POST['gmr_section_field'] ) ? (bool) $_POST['gmr_section_field'] : false;
		$mydata_footer = isset( $_POST['gmr_footer_field'] ) ? (bool) $_POST['gmr_footer_field'] : false;
		$mydata_sidebar = isset( $_POST['gmr_sidebar_field'] ) ? (bool) $_POST['gmr_sidebar_field'] : false;

		// Update the meta field.
		update_post_meta( $post_id, '_gmr_header_key', $mydata );
		update_post_meta( $post_id, '_gmr_section_key', $mydata_section );
		update_post_meta( $post_id, '_gmr_footer_key', $mydata_footer );
		update_post_meta( $post_id, '_gmr_sidebar_key', $mydata_sidebar );
	}

    /**
     * Renders the meta box.
	 *
	 * @param string $post Post Object.
	 *
	 * @return void
     */
	public function render_meta_box_content( $post ) {
	
		// Add an nonce field so we can check for it later.
		wp_nonce_field( 'gmr_header_box', 'gmr_header_box_nonce' );

		// Use get_post_meta to retrieve an existing value from the database.
		$value = get_post_meta( $post->ID, '_gmr_header_key', true );
		$value_section = get_post_meta( $post->ID, '_gmr_section_key', true );
		$value_footer = get_post_meta( $post->ID, '_gmr_footer_key', true );
		$value_sidebar = get_post_meta( $post->ID, '_gmr_sidebar_key', true );

	?>

		<p>
			<?php // Disable The Header Checkbox ?>
			
			<input type="checkbox" class="checkbox" id="gmr_header_field" name="gmr_header_field" <?php checked( $value ); ?> />
			<label for="gmr_header_field"><?php _e( 'Disable the header for this page?', 'superfast' ); ?></label><br />
			
			<input type="checkbox" class="checkbox" id="gmr_section_field" name="gmr_section_field" <?php checked( $value_section ); ?> />
			<label for="gmr_section_field"><?php _e( 'Disable the section for this page?', 'superfast' ); ?></label><br />
			
			<?php // Disable The Footer Checkbox ?>
			<input type="checkbox" class="checkbox" id="gmr_footer_field" name="gmr_footer_field" <?php checked( $value_footer ); ?> />
			<label for="gmr_footer_field"><?php _e( 'Disable the footer for this page?', 'superfast' ); ?></label><br />
			
			<?php // Disable The Sidebar Checkbox ?>
			<input type="checkbox" class="checkbox" id="gmr_sidebar_field" name="gmr_sidebar_field" <?php checked( $value_sidebar ); ?> />
			<label for="gmr_sidebar_field"><?php _e( 'Disable the sidebar for this page?', 'superfast' ); ?></label>
		
		</p>
		
		<p><?php _e( 'Page template builder is fullwidth so you no need check disable sidebar.', 'superfast' ); ?></p>

	<?php
	}
}


/**
 * Load class GMR_Metabox_Settings
 */
function gmr_metaboxes_settings_init() {
    new GMR_Metabox_Settings();
}

// Load only if dashboard
if ( is_admin() ) {
    add_action( 'load-post.php', 'gmr_metaboxes_settings_init' );
    add_action( 'load-post-new.php', 'gmr_metaboxes_settings_init' );
}