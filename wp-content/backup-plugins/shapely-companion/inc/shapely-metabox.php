<?php



/* Fire our meta box setup function on the post editor screen. */
add_action( 'load-post.php', 'shapely_companion_post_meta_boxes_setup' );
add_action( 'load-post-new.php', 'shapely_companion_post_meta_boxes_setup' );

/* Meta box setup function. */
function shapely_companion_post_meta_boxes_setup() {

	/* Add meta boxes on the 'add_meta_boxes' hook. */
	add_action( 'add_meta_boxes', 'shapely_companion_add_post_meta_boxes' );

	/* Save post meta on the 'save_post' hook. */
	  add_action( 'save_post', 'shapely_companion_save_post_class_meta', 10, 2 );

}

/* Create one or more meta boxes to be displayed on the post editor screen. */
function shapely_companion_add_post_meta_boxes() {

	add_meta_box(
		'shapely-companion-portfolio-link',      // Unique ID
		esc_html__( 'Custom Portfolio Link', 'shapely-companion' ),    // Title
		'shapely_companion_portfolio_link',   // Callback function
		'jetpack-portfolio',         // Admin page (or post type)
		'side',         // Context
		'high'         // Priority
	);
}

/* Display the post meta box. */
function shapely_companion_portfolio_link( $post ) {
	?>

	<?php wp_nonce_field( basename( __FILE__ ), 'shapely_companion_portfolio_link_nonce' ); ?>

  <p>
	<label for="shapely-companion-portfolio-link"><?php _e( "Use this if you'd like to link your custom portfolio/project works to external websites. Defaults to dedicated portfolio URL.", 'shapely-companion' ); ?></label>
	<br />
	<input class="widefat" type="text" name="shapely-companion-portfolio-link" id="shapely-companion-portfolio-link" value="<?php echo esc_url( get_post_meta( $post->ID, 'shapely_companion_portfolio_link', true ) ); ?>" size="30" />
  </p>
<?php }

/* Save the meta box's post metadata. */
function shapely_companion_save_post_class_meta( $post_id, $post ) {

	/* Verify the nonce before proceeding. */
	if ( ! isset( $_POST['shapely_companion_portfolio_link_nonce'] ) || ! wp_verify_nonce( $_POST['shapely_companion_portfolio_link_nonce'], basename( __FILE__ ) ) ) {
		return $post_id;
	}

	/* Get the post type object. */
	$post_type = get_post_type_object( $post->post_type );

	/* Check if the current user has permission to edit the post. */
	if ( ! current_user_can( $post_type->cap->edit_post, $post_id ) ) {
		return $post_id;
	}

	/* Get the posted data and sanitize it for use as an HTML class. */
	$new_meta_value = ( isset( $_POST['shapely-companion-portfolio-link'] ) ? esc_url( $_POST['shapely-companion-portfolio-link'] ) : '' );

	/* Get the meta key. */
	$meta_key = 'shapely_companion_portfolio_link';

	/* Get the meta value of the custom field key. */
	$meta_value = get_post_meta( $post_id, $meta_key, true );

	/* If a new meta value was added and there was no previous value, add it. */
	if ( $new_meta_value && '' == $meta_value ) {
		add_post_meta( $post_id, $meta_key, $new_meta_value, true );
	} // End if().

	elseif ( $new_meta_value && $new_meta_value != $meta_value ) {
		update_post_meta( $post_id, $meta_key, $new_meta_value );
	} /* If there is no new meta value but an old value exists, delete it. */
	elseif ( '' == $new_meta_value && $meta_value ) {
		delete_post_meta( $post_id, $meta_key, $meta_value );
	}
}

?>
