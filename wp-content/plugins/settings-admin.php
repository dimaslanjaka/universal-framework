<?php

/**
 * Handles the main plugin settings
 *
 * @since 0.1
 */
function widgets_reset_theme_page() {

// Some variables
	$plugin_name = __('Widgets Reset', 'widgets_reset');
	$settings_page_title = __('Widgets Reset', 'widgets_reset');
	$hidden_field_name = 'reset_widgets';
	$plugin_data = get_plugin_data( WIDGETS_RESET . '/widgets-reset.php' );

// See if information has been posted
	if ( $_POST[$hidden_field_name] == 'Y' ) :
		update_option( 'sidebars_widgets', $null );

	?>

		<div class="wrap">
			<h2><?php echo $settings_page_title; ?></h2>

		<div class="updated" style="margin: 15px 0;">
			<p><strong><?php _e('All of your widgets have now been reset.', 'logic'); ?></strong></p>
		</div>

	<?php else : ?>

		<div class="wrap">
			<h2><?php echo $settings_page_title; ?></h2>
	<?php
	endif;
?>

<div id="poststuff">

	<form name="form0" method="post" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI'] ); ?>" style="border:none;background:transparent;">

	<?php require_once( WIDGETS_RESET . '/settings.php' ); ?>

	<p class="submit" style="clear:both;">
		<input type="submit" name="Submit"  class="button-primary" value="<?php _e( 'Reset All Widgets', 'widgets_reset' ) ?>" />
		<input type="hidden" name="<?php echo $hidden_field_name; ?>" value="Y" />
	</p>

	</form>

</div>

</div>

<?php

}

?>