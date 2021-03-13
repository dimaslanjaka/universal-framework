<?php

/**
 * Load the Nav Walker Edit
 */
require_once plugin_dir_path( __FILE__ ) . 'class-shapely-walker-nav-menu-edit.php';
add_filter( 'wp_edit_nav_menu_walker', 'shapely_walker_nav_menu_edit', 10 );

function shapely_walker_nav_menu_edit() {
	return 'Shapely_Walker_Nav_Menu_Edit';
}

function shapely_nav_menu_setup() {
	add_meta_box( 'shapely-homepage-sections', __( 'Homepage Sections', 'shapely-companion' ), 'shapely_nav_menu_item_link_meta_box', 'nav-menus', 'side', 'default' );
}

add_action( 'admin_head-nav-menus.php', 'shapely_nav_menu_setup' );

function shapely_nav_menu_item_link_meta_box() {
	global $_nav_menu_placeholder, $nav_menu_selected_id;
	$_nav_menu_placeholder = 0 > $_nav_menu_placeholder ? $_nav_menu_placeholder - 1 : -1;
	$widgets_name = array();
	?>
	<div class="customlinkdiv" id="shapelysectionsdiv">
		<input type="hidden" value="custom" name="menu-item[<?php echo $_nav_menu_placeholder; ?>][menu-item-type]" />
		<p id="menu-item-url-wrap" class="wp-clearfix">
			<label class="howto" for="custom-menu-item-url"><?php _e( 'Section', 'shapely-companion' ); ?></label>
			<select id="shapely-section-item-widget" name="menu-item[<?php echo $_nav_menu_placeholder; ?>][menu-item-url]" type="text" class="code menu-item-textbox">
				<option value="0"><?php _e( 'Select a Section', 'shapely-companion' ); ?></option>
				<?php

				if ( is_active_sidebar( 'sidebar-home' ) ) {
					$sidebars = wp_get_sidebars_widgets();
					$widgets = $sidebars['sidebar-home'];
					foreach ( $widgets as $widget ) {
						$widget_id = _get_widget_id_base( $widget );
						if ( ! isset( $widgets_name[ $widget_id ] ) ) {
							$widgets_args = get_option( 'widget_' . $widget_id );
							$widgets_name[ $widget_id ] = $widgets_args;
						}

						// current id
						$current_id = str_replace( $widget_id . '-', '', $widget );
						if ( isset( $widgets_name[ $widget_id ][ $current_id ] ) && isset( $widgets_name[ $widget_id ][ $current_id ]['title'] ) && '' != $widgets_name[ $widget_id ][ $current_id ]['title'] ) {
							$title = $widgets_name[ $widget_id ][ $current_id ]['title'];
						} else {
							$title = $widget;
						}

						echo '<option value="' . $widget . '">' . $title . '</option>';
					}
				}

				?>
			</select>
		</p>
		<p id="menu-item-name-wrap" class="wp-clearfix">
			<label class="howto" for="custom-menu-item-name"><?php _e( 'URL', 'shapely-companion' ); ?></label>
			<input id="shapely-section-item-url" name="menu-item[<?php echo $_nav_menu_placeholder; ?>][menu-item-url]" type="text" class="regular-text menu-item-textbox" />
		</p>
		<p id="menu-item-name-wrap" class="wp-clearfix">
			<label class="howto" for="custom-menu-item-name"><?php _e( 'Label', 'shapely-companion' ); ?></label>
			<input id="shapely-section-item-name" name="menu-item[<?php echo $_nav_menu_placeholder; ?>][menu-item-title]" type="text" class="regular-text menu-item-textbox" />
		</p>

		<p class="button-controls wp-clearfix">
			<span class="add-to-menu">
				<input type="submit"<?php wp_nav_menu_disabled_check( $nav_menu_selected_id ); ?> class="button submit-add-to-menu right" value="<?php esc_attr_e( 'Add to Menu', 'shapely-companion' ); ?>" name="add-shapely-section-menu-item" id="submit-shapelysection" />
				<span class="spinner"></span>
			</span>
		</p>

	</div><!-- /.customlinkdiv -->
	<?php
}

add_action( 'wp_update_nav_menu_item', 'shapely_update_menu_item', 10, 3 );

function shapely_update_menu_item( $menu_id, $menu_item_db_id, $args ) {

	if ( isset( $_POST['menu-item'] ) && count( $_POST['menu-item'] ) == 1 ) {
		if ( isset( $_POST['menu-item']['-1'] ) ) {
			$menu_item = $_POST['menu-item']['-1'];

			if ( isset( $menu_item['menu-item-extra'] ) && 'shapely-section' == $menu_item['menu-item-extra'] ) {
				update_post_meta( $menu_item_db_id, '_menu_item_extra', 'shapely-section' );
			}

			if ( isset( $menu_item['menu-item-widget'] ) ) {
				update_post_meta( $menu_item_db_id, '_menu_item_widget', sanitize_text_field( $menu_item['menu-item-widget'] ) );
			}
		}
	}

}
