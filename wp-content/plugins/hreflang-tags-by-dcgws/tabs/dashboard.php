<?php
/**
 *
 *  @package HREFLANG Tags Pro\Tabs\Dashboard
 *  @since 1.3.3
 *
 */

if ( ! function_exists( 'add_filter' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit();
}
?>
  <div id="dashboard" class="hreflangtab metabox-holder">
  <form action="<?php echo esc_url(admin_url('options.php')); ?>" method="post" id="hreflang-conf" enctype="multipart/form-data" accept-charset="<?php echo esc_attr(get_bloginfo('charset')); ?>">
  <?php settings_fields('hreflang-settings-group'); ?>
    <table class="form-table">
      <tbody>
        <tr valign="top">
          <th scope="row"> <label for="hreflang_post_types">
              <?php _e('Content Types', 'hreflang-tags-by-dcgws'); ?>
            </label>
          </th>
          <td>
        <?php
		$post_types = get_post_types( array( 'public' => true, 'exclude_from_search' => false ),'objects');
		if ( is_array( $post_types ) && $post_types !== array() ) {
			foreach ( $post_types as $post_type ) {
				echo '<input type="checkbox" name="hreflang_post_types[]" id="hreflang_post_types_'.$post_type->name.'" value="'.$post_type->name.'"';
				if (is_array(get_option('hreflang_post_types'))) {
					if (in_array($post_type->name, get_option('hreflang_post_types'))) {
						echo ' checked="checked"';
					}
				}
				echo '/>
				<label for="hreflang_post_types_'.$post_type->name.'">'.$post_type->label.'</label>
				<br>';
			}
		}
		$taxonomies = get_taxonomies( array( 'public' => true),'objects');
		if (is_array($taxonomies) && $taxonomies !== array()) {
			foreach ($taxonomies as $taxonomy) {
				echo '<input type="checkbox" name="hreflang_post_types[]" id="hreflang_post_types_'.$taxonomy->name.'" value="'.$taxonomy->name.'"';
				if (is_array(get_option('hreflang_post_types'))) {
					if (in_array($taxonomy->name, get_option('hreflang_post_types'))) {
						echo ' checked="checked"';
					}
				}
				echo '/>
				<label for="hreflang_post_types_'.$taxonomy->name.'">'.$taxonomy->label.'</label>
				<br>';
			}
		}
		?>
            <br>
            <span class="hreflang_settings_description">
            <?php _e('These are the types of content that you want to set HREFLANG Tags metaboxes for.','hreflang-tags-by-dcgws'); ?>
            </span></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="submit">
    <input type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes">
  </p>
  </form>
	<p class="submit">
    <a href="javascript:void(0);" class="button button-destructive erase-all" data-warning="<?php _e('Warning! Are you sure you want to delete all your hreflang tags? You cannot undo this action.', 'hreflang-tags-by-dcgws'); ?>"><?php _e('Erase all Hreflang Tags', 'hreflang-tags-by-dcgws'); ?></a>
  </p>

  <h2><?php _e('How-to/Tutorial Video','hreflang-tags-by-dcgws'); ?></h2>
  <p><?php _e('I get many requests for documentation or instructions on how to set up HREFLANG Tags. I\'ve prepared a video that I think will help you.','hreflang-tags-by-dcgws'); ?></p>
  <p><iframe width="560" height="315" src="https://www.youtube.com/embed/GWzrrNNGX1Y" frameborder="0" allowfullscreen></iframe></p>
  <p>
  	<?php _e('If you feel this plugin has helped you and you would like to say thanks, click <a target="_blank" href="https://www.PayPal.Me/DCGWS/5usd">here</a> to send me $5. Thanks!<br>David, DCGWS Founder','hreflang-tags-by-dcgws'); ?>
  </p>
