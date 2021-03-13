<?php
/*
/*-----------------------------------------------*/
/* KENTOOZ THEMES FUNCTION
/* Website    : http://www.kentooz.com
/* The Author : Gian Mokhammad Ramadhan (http://www.gianmr.com)
/* Twitter    : http://www.twitter.com/g14nnakal 
/* Facebook   : http://www.facebook.com/gianmr
/*-----------------------------------------------*/

// Do not load directly...
if ( ! defined( 'ABSPATH' ) ) { die( 'Direct access forbidden.' ); }

/*
* Number navigation on hook system
* Call in function ktz_navigation() in includes/functions/function_content.php
*/
function round_num($num, $to_nearest) {
   return floor($num/$to_nearest)*$to_nearest;
}
if ( ! function_exists( 'ktz_pagenavi' ) ):
function ktz_pagenavi($before = '', $after = '') {
    global $wpdb, $wp_query;
    $pagenavi_options = array();
    $pagenavi_options['pages_text'] = __('Page %CURRENT_PAGE% of %TOTAL_PAGES%:','ktz_theme_textdomain');
    $pagenavi_options['current_text'] = __('%PAGE_NUMBER%','ktz_theme_textdomain');
    $pagenavi_options['page_text'] = __('%PAGE_NUMBER%','ktz_theme_textdomain');
    $pagenavi_options['first_text'] = __('First Page','ktz_theme_textdomain');
    $pagenavi_options['last_text'] = __('Last Page','ktz_theme_textdomain');
    $pagenavi_options['next_text'] = __('Next &raquo;','ktz_theme_textdomain');
    $pagenavi_options['prev_text'] = __('&laquo; Previous','ktz_theme_textdomain');
    $pagenavi_options['dotright_text'] = '...';
    $pagenavi_options['dotleft_text'] = '...';
    $pagenavi_options['num_pages'] = 3;
    $pagenavi_options['always_show'] = 0;
    $pagenavi_options['num_larger_page_numbers'] = 0;
    $pagenavi_options['larger_page_numbers_multiple'] = 5;
 
    if (!is_single()) {
        $request = $wp_query->request;
        $posts_per_page = intval(get_query_var('posts_per_page'));
        $paged = intval(get_query_var('paged'));
        $numposts = $wp_query->found_posts;
        $max_page = $wp_query->max_num_pages;
 
        if(empty($paged) || $paged == 0) { $paged = 1; }
 
        $pages_to_show = intval($pagenavi_options['num_pages']);
        $larger_page_to_show = intval($pagenavi_options['num_larger_page_numbers']);
        $larger_page_multiple = intval($pagenavi_options['larger_page_numbers_multiple']);
        $pages_to_show_minus_1 = $pages_to_show - 1;
        $half_page_start = floor($pages_to_show_minus_1/2);
        $half_page_end = ceil($pages_to_show_minus_1/2);
        $start_page = $paged - $half_page_start;
 
        if($start_page <= 0) { $start_page = 1; }
 
        $end_page = $paged + $half_page_end;
        if(($end_page - $start_page) != $pages_to_show_minus_1) { $end_page = $start_page + $pages_to_show_minus_1; }
        if($end_page > $max_page) { $start_page = $max_page - $pages_to_show_minus_1; $end_page = $max_page; }
        if($start_page <= 0) { $start_page = 1; }
 
        $larger_per_page = $larger_page_to_show*$larger_page_multiple;
        $larger_start_page_start = (round_num($start_page, 10) + $larger_page_multiple) - $larger_per_page;
        $larger_start_page_end = round_num($start_page, 10) + $larger_page_multiple;
        $larger_end_page_start = round_num($end_page, 10) + $larger_page_multiple;
        $larger_end_page_end = round_num($end_page, 10) + ($larger_per_page);
 
        if($larger_start_page_end - $larger_page_multiple == $start_page) {
            $larger_start_page_start = $larger_start_page_start - $larger_page_multiple;
            $larger_start_page_end = $larger_start_page_end - $larger_page_multiple;
        }
        if($larger_start_page_start <= 0) { $larger_start_page_start = $larger_page_multiple; }
        if($larger_start_page_end > $max_page) { $larger_start_page_end = $max_page; }
        if($larger_end_page_end > $max_page) { $larger_end_page_end = $max_page; }
        if($max_page > 1 || intval($pagenavi_options['always_show']) == 1) {
			echo $before.'<ul class="pagination">'."\n";
            $pages_text = str_replace("%CURRENT_PAGE%", number_format_i18n($paged), $pagenavi_options['pages_text']);
            $pages_text = str_replace("%TOTAL_PAGES%", number_format_i18n($max_page), $pages_text);
            if(!empty($pages_text)) {
				echo '<li class="disabled">';
                echo '<span>'.$pages_text.'</span>';
				echo '</li>';
            }
			if ( get_previous_posts_link() ) :
				echo '<li>';
				previous_posts_link($pagenavi_options['prev_text']);
				echo '</li>';
			endif;
            if ($start_page >= 2 && $pages_to_show < $max_page) {
                $first_page_text = str_replace("%TOTAL_PAGES%", number_format_i18n($max_page), $pagenavi_options['first_text']);
                echo '<li><a href="'.esc_url(get_pagenum_link()).'" class="first" title="'.$first_page_text.'">1</a></li>';
                if(!empty($pagenavi_options['dotleft_text'])) {
                    echo '<li class="disabled"><span>'.$pagenavi_options['dotleft_text'].'</span></li>';
                }
            }
 
            if($larger_page_to_show > 0 && $larger_start_page_start > 0 && $larger_start_page_end <= $max_page) {
                for($i = $larger_start_page_start; $i < $larger_start_page_end; $i+=$larger_page_multiple) {
                    $page_text = str_replace("%PAGE_NUMBER%", number_format_i18n($i), $pagenavi_options['page_text']);
                    echo '<li><a href="'.esc_url(get_pagenum_link($i)).'" title="'.$page_text.'">'.$page_text.'</a></li>';
                }
            }
 
            for($i = $start_page; $i  <= $end_page; $i++) {
                if($i == $paged) {
                    $current_page_text = str_replace("%PAGE_NUMBER%", number_format_i18n($i), $pagenavi_options['current_text']);
					$page_text = str_replace("%PAGE_NUMBER%", number_format_i18n($i), $pagenavi_options['page_text']);
                    echo '<li class="active"><a href="'.esc_url(get_pagenum_link($i)).'" title="'.$page_text.'">'.$current_page_text.'</a></li>';
                } else {
                    $page_text = str_replace("%PAGE_NUMBER%", number_format_i18n($i), $pagenavi_options['page_text']);
                    echo '<li><a href="'.esc_url(get_pagenum_link($i)).'" title="'.$page_text.'">'.$page_text.'</a></li>';
                }
            }
 
            if ($end_page < $max_page) {
                if(!empty($pagenavi_options['dotright_text'])) {
                    echo '<li class="disabled"><span>'.$pagenavi_options['dotright_text'].'</span></li>';
                }
                $last_page_text = str_replace("%TOTAL_PAGES%", number_format_i18n($max_page), $pagenavi_options['last_text']);
                echo '<li><a href="'.esc_url(get_pagenum_link($max_page)).'" title="'.$last_page_text.'">'.$max_page.'</a></li>';
            }
 
            if($larger_page_to_show > 0 && $larger_end_page_start < $max_page) {
                for($i = $larger_end_page_start; $i <= $larger_end_page_end; $i+=$larger_page_multiple) {
                    $page_text = str_replace("%PAGE_NUMBER%", number_format_i18n($i), $pagenavi_options['page_text']);
                    echo '<li><a href="'.esc_url(get_pagenum_link($i)).'" title="'.$page_text.'">'.$page_text.'</a></li>';
                }
            }
			if ( get_next_posts_link() ) :
				echo '<li>';
				next_posts_link($pagenavi_options['next_text'], $max_page);
				echo '</li>';
			endif;
            echo '</ul>'.$after."\n";
        }
    }
}
endif; 

/*
* Default navigation on hook system
* Call in function ktz_navigation() in includes/functions/function_content.php
*/
if ( ! function_exists( 'ktz_default_nav' ) ) {
function ktz_default_nav() {
	global $wp_query;
	if ( $wp_query->max_num_pages > 1 ) :
	echo '<ul class="pager">';
		if ( get_next_posts_link() ) :
		echo '<li class="previous">';
		echo next_posts_link( __( '&larr; Older posts', 'ktz_theme_textdomain' ) );
		echo '</li>';
		endif;
		if ( get_previous_posts_link() ) :
		echo '<li class="next">';
		echo previous_posts_link( __( 'Newer posts &rarr;', 'ktz_theme_textdomain' ) );
		echo '</li>';
		endif;
	echo '</ul>';
	endif; 
	}
}

/*
* Choice page navigation or default navigation via admin panel
*/
if ( !function_exists('ktz_navigation') ) {
function ktz_navigation() {
		if (ot_get_option('ktz_nav_select') == 'number') { 
			ktz_pagenavi(); 
		} elseif (ot_get_option('ktz_nav_select') == 'default') { 
			ktz_default_nav();
		}
	}
add_action( 'ktz_navigation', 'ktz_navigation' );
}

/* 
* Add comment navigation
* You can find comment navigation function in comments.php
* Call ktz_comment_nav();
*/
if ( ! function_exists( 'ktz_comment_nav' ) ):
function ktz_comment_nav() {
	global $wp_query; ?>
		<div class="pager ktz-nav-comments">
		<?php paginate_comments_links(array('prev_text' => '&laquo;', 'next_text' => '&raquo;')); ?>
		</div>
	<?php
}
endif; 

/*
* Add link pages on hook system
*/
if ( !function_exists('ktz_link_pages') ) :
function ktz_link_pages() {	
	wp_link_pages( array( 'before' => '<div class="page-link"><span>' . __( 'Pages:', 'ktz_theme_textdomain' ) . '</span>', 'after' => '</div>' ) );
	}
add_action( 'ktz_link_pages', 'ktz_link_pages' );
endif;

/*
* Filter add new custom field in menus the name field is icon
* Add filter add_filter( 'wp_setup_nav_menu_item', 'ktz_add_custom_nav_fields' );
* Add action add_action( 'wp_update_nav_menu_item', 'ktz_update_custom_nav_fields', 10, 3 );
* Add filter add_filter( 'wp_edit_nav_menu_walker', 'ktz_edit_walker', 10, 2 );
* @ init.php
*/
function ktz_add_custom_nav_fields( $menu_item ) {
    $menu_item->icon = get_post_meta( $menu_item->ID, '_menu_item_icon', true );
    $menu_item->suptext = get_post_meta( $menu_item->ID, '_menu_item_suptext', true );
    $menu_item->suptextbg = get_post_meta( $menu_item->ID, '_menu_item_suptextbg', true );
    $menu_item->megamenu = get_post_meta( $menu_item->ID, '_menu_item_megamenu', true );
    $menu_item->mgcolumn = get_post_meta( $menu_item->ID, '_menu_item_mgcolumn', true );
    return $menu_item;
}
add_filter( 'wp_setup_nav_menu_item', 'ktz_add_custom_nav_fields' );

function ktz_update_custom_nav_fields( $menu_id, $menu_item_db_id, $args ) {
    $menu_id = (int) $menu_id;
    $menu_item_db_id = (int) $menu_item_db_id;
    // Check if element is properly sent
    if ( isset ( $_REQUEST['menu-item-suptext'] ) &&  is_array( $_REQUEST['menu-item-suptext'] )) :
        $suptext_value = isset($_REQUEST['menu-item-suptext'][$menu_item_db_id]) ? $_REQUEST['menu-item-suptext'][$menu_item_db_id] : null;
        update_post_meta( $menu_item_db_id, '_menu_item_suptext', $suptext_value );
    endif;
    if ( isset ( $_REQUEST['menu-item-suptextbg'] ) &&  is_array( $_REQUEST['menu-item-suptextbg'] )) :
        $suptextbg_value = isset($_REQUEST['menu-item-suptextbg'][$menu_item_db_id]) ? $_REQUEST['menu-item-suptextbg'][$menu_item_db_id] : null;
        update_post_meta( $menu_item_db_id, '_menu_item_suptextbg', $suptextbg_value );
    endif;
    if ( isset ( $_REQUEST['menu-item-icon'] ) &&  is_array( $_REQUEST['menu-item-icon'] )) :
        $subicon_value = isset($_REQUEST['menu-item-icon'][$menu_item_db_id]) ? $_REQUEST['menu-item-icon'][$menu_item_db_id] : null;
        update_post_meta( $menu_item_db_id, '_menu_item_icon', $subicon_value );
    endif;
    if ( isset ( $_REQUEST['menu-item-megamenu'] ) &&  is_array( $_REQUEST['menu-item-megamenu'] )) :
        $megamenu_value = isset($_REQUEST['menu-item-megamenu'][$menu_item_db_id]) ? $_REQUEST['menu-item-megamenu'][$menu_item_db_id] : null;
        update_post_meta( $menu_item_db_id, '_menu_item_megamenu', $megamenu_value );
    endif;
    if ( isset ( $_REQUEST['menu-item-mgcolumn'] ) &&  is_array( $_REQUEST['menu-item-mgcolumn'] )) :
        $mgcolumn_value = isset($_REQUEST['menu-item-mgcolumn'][$menu_item_db_id]) ? $_REQUEST['menu-item-mgcolumn'][$menu_item_db_id] : null;
        update_post_meta( $menu_item_db_id, '_menu_item_mgcolumn', $mgcolumn_value );
    endif;
}
add_action( 'wp_update_nav_menu_item', 'ktz_update_custom_nav_fields', 10, 3 );

function ktz_edit_walker($walker,$menu_id) {
    return 'ktz_Nav_Menu_Edit';
}
add_filter( 'wp_edit_nav_menu_walker', 'ktz_edit_walker', 10, 2 );

/**
 * Create HTML list of nav menu input items.
 *
 * @package WordPress
 * @since 3.0.0
 * @uses Walker_Nav_Menu
 */
class ktz_Nav_Menu_Edit extends Walker_Nav_Menu {
	/**
	 * @see Walker_Nav_Menu::start_lvl()
	 * @since 3.0.0
	 *
	 * @param string $output Passed by reference.
	 */
	function start_lvl( &$output, $depth = 0, $args = array() ) {}

	/**
	 * @see Walker_Nav_Menu::end_lvl()
	 * @since 3.0.0
	 *
	 * @param string $output Passed by reference.
	 */
	function end_lvl( &$output, $depth = 0, $args = array() ) {}

	/**
	 * @see Walker::start_el()
	 * @since 3.0.0
	 *
	 * @param string $output Passed by reference. Used to append additional content.
	 * @param object $item Menu item data object.
	 * @param int $depth Depth of menu item. Used for padding.
	 * @param object $args
	 */
	function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		global $_wp_nav_menu_max_depth;
		$_wp_nav_menu_max_depth = $depth > $_wp_nav_menu_max_depth ? $depth : $_wp_nav_menu_max_depth;

		$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

		ob_start();
		$item_id = esc_attr( $item->ID );
		$removed_args = array(
			'action',
			'customlink-tab',
			'edit-menu-item',
			'menu-item',
			'page-tab',
			'_wpnonce',
		);

		$original_title = '';
		if ( 'taxonomy' == $item->type ) {
			$original_title = get_term_field( 'name', $item->object_id, $item->object, 'raw' );
			if ( is_wp_error( $original_title ) )
				$original_title = false;
		} elseif ( 'post_type' == $item->type ) {
			$original_object = get_post( $item->object_id );
			$original_title = $original_object->post_title;
		}

		$classes = array(
			'menu-item menu-item-depth-' . $depth,
			'menu-item-' . esc_attr( $item->object ),
			'menu-item-edit-' . ( ( isset( $_GET['edit-menu-item'] ) && $item_id == $_GET['edit-menu-item'] ) ? 'active' : 'inactive'),
		);

		$title = $item->title;

		if ( ! empty( $item->_invalid ) ) {
			$classes[] = 'menu-item-invalid';
			/* translators: %s: title of menu item which is invalid */
			$title = sprintf( __( '%s (Invalid)', 'ktz_theme_textdomain' ), $item->title );
		} elseif ( isset( $item->post_status ) && 'draft' == $item->post_status ) {
			$classes[] = 'pending';
			/* translators: %s: title of menu item in draft status */
			$title = sprintf( __('%s (Pending)', 'ktz_theme_textdomain'), $item->title );
		}

		$title = ( ! isset( $item->label ) || '' == $item->label ) ? $title : $item->label;

		$submenu_text = '';
		if ( 0 == $depth )
			$submenu_text = 'style="display: none;"';

		?>
		<li id="menu-item-<?php echo $item_id; ?>" class="<?php echo implode(' ', $classes ); ?>">
			<dl class="menu-item-bar">
				<dt class="menu-item-handle">
					<span class="item-title"><span class="menu-item-title"><?php echo esc_html( $title ); ?></span> <span class="is-submenu" <?php echo $submenu_text; ?>><?php _e( 'sub item', 'ktz_theme_textdomain' ); ?></span></span>
					<span class="item-controls">
						<span class="item-type"><?php echo esc_html( $item->type_label ); ?></span>
						<span class="item-order hide-if-js">
							<a href="<?php
								echo wp_nonce_url(
									esc_url(add_query_arg(
										array(
											'action' => 'move-up-menu-item',
											'menu-item' => $item_id,
										),
										esc_url(remove_query_arg($removed_args, admin_url( 'nav-menus.php' ) ) )
									) ),
									'move-menu_item'
								);
							?>" class="item-move-up"><abbr title="<?php esc_attr_e('Move up', 'ktz_theme_textdomain'); ?>">&#8593;</abbr></a>
							|
							<a href="<?php
								echo wp_nonce_url(
									esc_url(add_query_arg(
										array(
											'action' => 'move-down-menu-item',
											'menu-item' => $item_id,
										),
										esc_url(remove_query_arg($removed_args, admin_url( 'nav-menus.php' ) ) )
									)),
									'move-menu_item'
								);
							?>" class="item-move-down"><abbr title="<?php esc_attr_e('Move down', 'ktz_theme_textdomain'); ?>">&#8595;</abbr></a>
						</span>
						<a class="item-edit" id="edit-<?php echo $item_id; ?>" title="<?php esc_attr_e('Edit Menu Item', 'ktz_theme_textdomain'); ?>" href="<?php
							echo ( isset( $_GET['edit-menu-item'] ) && $item_id == $_GET['edit-menu-item'] ) ? admin_url( 'nav-menus.php' ) : esc_url(add_query_arg( 'edit-menu-item', $item_id, esc_url(remove_query_arg( $removed_args, admin_url( 'nav-menus.php#menu-item-settings-' . $item_id ) ) ) ) );
						?>"><?php _e( 'Edit Menu Item', 'ktz_theme_textdomain' ); ?></a>
					</span>
				</dt>
			</dl>

			<div class="menu-item-settings wp-clearfix" id="menu-item-settings-<?php echo $item_id; ?>">
				<?php if( 'custom' == $item->type ) : ?>
					<p class="field-url description description-wide">
						<label for="edit-menu-item-url-<?php echo $item_id; ?>">
							<?php _e( 'URL', 'ktz_theme_textdomain' ); ?><br />
							<input type="text" id="edit-menu-item-url-<?php echo $item_id; ?>" class="widefat code edit-menu-item-url" name="menu-item-url[<?php echo $item_id; ?>]" value="<?php echo esc_attr( $item->url ); ?>" />
						</label>
					</p>
				<?php endif; ?>
				<p class="description description-thin">
					<label for="edit-menu-item-title-<?php echo $item_id; ?>">
						<?php _e( 'Navigation Label', 'ktz_theme_textdomain' ); ?><br />
						<input type="text" id="edit-menu-item-title-<?php echo $item_id; ?>" class="widefat edit-menu-item-title" name="menu-item-title[<?php echo $item_id; ?>]" value="<?php echo esc_attr( $item->title ); ?>" />
					</label>
				</p>
				<p class="description description-thin">
					<label for="edit-menu-item-attr-title-<?php echo $item_id; ?>">
						<?php _e( 'Title Attribute', 'ktz_theme_textdomain' ); ?><br />
						<input type="text" id="edit-menu-item-attr-title-<?php echo $item_id; ?>" class="widefat edit-menu-item-attr-title" name="menu-item-attr-title[<?php echo $item_id; ?>]" value="<?php echo esc_attr( $item->post_excerpt ); ?>" />
					</label>
				</p>
				<p class="field-link-target description">
					<label for="edit-menu-item-target-<?php echo $item_id; ?>">
						<input type="checkbox" id="edit-menu-item-target-<?php echo $item_id; ?>" value="_blank" name="menu-item-target[<?php echo $item_id; ?>]"<?php checked( $item->target, '_blank' ); ?> />
						<?php _e( 'Open link in a new window/tab', 'ktz_theme_textdomain' ); ?>
					</label>
				</p>
				<p class="field-css-classes description description-thin">
					<label for="edit-menu-item-classes-<?php echo $item_id; ?>">
						<?php _e( 'CSS Classes (optional)', 'ktz_theme_textdomain' ); ?><br />
						<input type="text" id="edit-menu-item-classes-<?php echo $item_id; ?>" class="widefat code edit-menu-item-classes" name="menu-item-classes[<?php echo $item_id; ?>]" value="<?php echo esc_attr( implode(' ', $item->classes ) ); ?>" />
					</label>
				</p>
				<p class="field-xfn description description-thin">
					<label for="edit-menu-item-xfn-<?php echo $item_id; ?>">
						<?php _e( 'Link Relationship (XFN)', 'ktz_theme_textdomain' ); ?><br />
						<input type="text" id="edit-menu-item-xfn-<?php echo $item_id; ?>" class="widefat code edit-menu-item-xfn" name="menu-item-xfn[<?php echo $item_id; ?>]" value="<?php echo esc_attr( $item->xfn ); ?>" />
					</label>
				</p>
				<p class="field-description description description-wide">
					<label for="edit-menu-item-description-<?php echo $item_id; ?>">
						<?php _e( 'Description', 'ktz_theme_textdomain' ); ?><br />
						<textarea id="edit-menu-item-description-<?php echo $item_id; ?>" class="widefat edit-menu-item-description" rows="3" cols="20" name="menu-item-description[<?php echo $item_id; ?>]"><?php echo esc_html( $item->description ); // textarea_escaped ?></textarea>
						<span class="description"><?php _e('The description will be displayed in the menu if the current theme supports it.', 'ktz_theme_textdomain'); ?></span>
					</label>
				</p>
				
				
				
				<?php if ( !$item->menu_item_parent && $item->menu_item_parent == 0 ) : ?>
				<p class="field-custom description">
					<label for="edit-menu-item-megamenu-<?php echo $item_id; ?>">
						<input type="checkbox" id="edit-menu-item-megamenu-<?php echo $item_id; ?>" value="ktz-megamenu" name="menu-item-megamenu[<?php echo $item_id; ?>]"<?php checked( $item->megamenu, 'ktz-megamenu' ); ?> />
						<?php _e( 'Enable kentooz megamenu?', 'ktz_theme_textdomain' ); ?>
					</label><br />
				</p>		
				<?php endif; ?>
				
				<?php if ( !$item->menu_item_parent && $item->menu_item_parent == 0 ) : ?>
				<p class="field-custom description description-wide">
					<label for="edit-menu-item-mgcolumn-<?php echo $item_id; ?>">
						<?php _e( 'Select kentooz megamenu column', 'ktz_theme_textdomain' ); ?><br />
						<select name="menu-item-mgcolumn[<?php echo $item_id; ?>]" id="edit-menu-item-mgcolumn-<?php echo $item_id; ?>" class="widefat code edit-menu-item-custom">
							<option value="ktz-columns-2" <?php selected( $item->mgcolumn, 'ktz-columns-2' ); ?>><?php _e( '2 Column','ktz_theme_textdomain' ); ?></option>
							<option value="ktz-columns-3" <?php selected( $item->mgcolumn, 'ktz-columns-3' ); ?>><?php _e( '3 Column','ktz_theme_textdomain' ); ?></option>
							<option value="ktz-columns-4" <?php selected( $item->mgcolumn, 'ktz-columns-4' ); ?>><?php _e( '4 Column','ktz_theme_textdomain' ); ?></option>
							<option value="ktz-columns-5" <?php selected( $item->mgcolumn, 'ktz-columns-5' ); ?>><?php _e( '5 Column','ktz_theme_textdomain' ); ?></option>
							<option value="ktz-columns-6" <?php selected( $item->mgcolumn, 'ktz-columns-6' ); ?>><?php _e( '6 Column','ktz_theme_textdomain' ); ?></option>
						</select>
					</label>
				</p>		
				<?php endif; ?>
				
				
				<p class="field-custom description description-wide">
					<label for="edit-menu-item-suptext-<?php echo $item_id; ?>">
						<?php _e( 'Kentooz sup text', 'ktz_theme_textdomain' ); ?><br />
						<input type="text" id="edit-menu-item-suptext-<?php echo $item_id; ?>" class="widefat code edit-menu-item-suptext" name="menu-item-suptext[<?php echo $item_id; ?>]" value="<?php echo esc_attr( $item->suptext ); ?>" />
					</label>
				</p>
				
				
				<p class="field-custom description description-wide">
					<label for="edit-menu-item-suptextbg-<?php echo $item_id; ?>">
						<?php _e( 'Kentooz sup text background default(#b01e00)', 'ktz_theme_textdomain' ); ?><br />
						<input type="text" id="edit-menu-item-suptextbg-<?php echo $item_id; ?>" class="widefat code edit-menu-item-suptextbg" name="menu-item-suptextbg[<?php echo $item_id; ?>]" value="<?php echo esc_attr( $item->suptextbg ); ?>" />
					</label>
				</p>
				
				
				<p class="field-custom description description-wide">
					<label for="edit-menu-item-icon-<?php echo $item_id; ?>">
						<?php _e( 'Kentooz menu icon', 'ktz_theme_textdomain' ); ?><br />
						<input type="text" id="edit-menu-item-icon-<?php echo $item_id; ?>" class="widefat code edit-menu-item-icon" name="menu-item-icon[<?php echo $item_id; ?>]" value="<?php echo esc_attr( $item->icon ); ?>" />
					</label>
				</p>
				
				
				

				<p class="field-move hide-if-no-js description description-wide">
					<label>
						<span><?php _e( 'Move', 'ktz_theme_textdomain' ); ?></span>
						<a href="#" class="menus-move-up"><?php _e( 'Up one', 'ktz_theme_textdomain' ); ?></a>
						<a href="#" class="menus-move-down"><?php _e( 'Down one', 'ktz_theme_textdomain' ); ?></a>
						<a href="#" class="menus-move-left"><?php _e( 'To left', 'ktz_theme_textdomain' ); ?></a>
						<a href="#" class="menus-move-right"><?php _e( 'To right', 'ktz_theme_textdomain' ); ?></a>
						<a href="#" class="menus-move-top"><?php _e( 'To the top', 'ktz_theme_textdomain' ); ?></a>
					</label>
				</p>

				<div class="menu-item-actions description-wide submitbox">
					<?php if( 'custom' != $item->type && $original_title !== false ) : ?>
						<p class="link-to-original">
							<?php printf( __('Original: %s', 'ktz_theme_textdomain'), '<a href="' . esc_attr( $item->url ) . '">' . esc_html( $original_title ) . '</a>' ); ?>
						</p>
					<?php endif; ?>
					<a class="item-delete submitdelete deletion" id="delete-<?php echo $item_id; ?>" href="<?php
					echo wp_nonce_url(
						esc_url(add_query_arg(
							array(
								'action' => 'delete-menu-item',
								'menu-item' => $item_id,
							),
							admin_url( 'nav-menus.php' )
						) ),
						'delete-menu_item_' . $item_id
					); ?>"><?php _e( 'Remove', 'ktz_theme_textdomain' ); ?></a> <span class="meta-sep hide-if-no-js"> | </span> <a class="item-cancel submitcancel hide-if-no-js" id="cancel-<?php echo $item_id; ?>" href="<?php echo esc_url( add_query_arg( array( 'edit-menu-item' => $item_id, 'cancel' => time() ), admin_url( 'nav-menus.php' ) ) );
						?>#menu-item-settings-<?php echo $item_id; ?>"><?php _e('Cancel', 'ktz_theme_textdomain'); ?></a>
				</div>

				<input class="menu-item-data-db-id" type="hidden" name="menu-item-db-id[<?php echo $item_id; ?>]" value="<?php echo $item_id; ?>" />
				<input class="menu-item-data-object-id" type="hidden" name="menu-item-object-id[<?php echo $item_id; ?>]" value="<?php echo esc_attr( $item->object_id ); ?>" />
				<input class="menu-item-data-object" type="hidden" name="menu-item-object[<?php echo $item_id; ?>]" value="<?php echo esc_attr( $item->object ); ?>" />
				<input class="menu-item-data-parent-id" type="hidden" name="menu-item-parent-id[<?php echo $item_id; ?>]" value="<?php echo esc_attr( $item->menu_item_parent ); ?>" />
				<input class="menu-item-data-position" type="hidden" name="menu-item-position[<?php echo $item_id; ?>]" value="<?php echo esc_attr( $item->menu_order ); ?>" />
				<input class="menu-item-data-type" type="hidden" name="menu-item-type[<?php echo $item_id; ?>]" value="<?php echo esc_attr( $item->type ); ?>" />
			</div><!-- .menu-item-settings-->
			<ul class="menu-item-transport"></ul>
		<?php
		$output .= ob_get_clean();
	}
}

/*
* Menus functions, Walker Nav Menu, icons, color menus..
*/
function ktz_catnav_class( $classes, $item ) {
	$thisCat = get_term_by('name', $item->title, 'category');
	if( is_object($thisCat) ){
	$classes[] = $thisCat->slug;
	}		
    return $classes;
}
add_filter( 'nav_menu_css_class', 'ktz_catnav_class', 10, 2 );

class ktz_Walker_Nav_Menu extends Walker_Nav_Menu {
        /**
         * @see Walker::$tree_type
         * @since 3.0.0
         * @var string
         */
        var $tree_type = array( 'post_type', 'taxonomy', 'custom' );
        /**
         * @see Walker::$db_fields
         * @since 3.0.0
         * @todo Decouple this.
         * @var array
         */
        var $db_fields = array( 'parent' => 'menu_item_parent', 'id' => 'db_id' );
        /**
         * @see Walker::start_lvl()
         * @since 3.0.0
         *
         * @param string $output Passed by reference. Used to append additional content.
         * @param int $depth Depth of page. Used for padding.
         */
        function start_lvl( &$output, $depth = 0, $args = array() ) {
                $indent = str_repeat("\t", $depth);
                $output .= "\n$indent<ul class=\"sub-menu\">\n";
        }
        /**
         * @see Walker::end_lvl()
         * @since 3.0.0
         *
         * @param string $output Passed by reference. Used to append additional content.
         * @param int $depth Depth of page. Used for padding.
         */
        function end_lvl( &$output, $depth = 0, $args = array() ) {
                $indent = str_repeat("\t", $depth);
                $output .= "$indent</ul>\n";
        }
        /**
         * @see Walker::start_el()
         * @since 3.0.0
         *
         * @param string $output Passed by reference. Used to append additional content.
         * @param object $item Menu item data object.
         * @param int $depth Depth of menu item. Used for padding.
         * @param int $current_page Menu item ID.
         * @param object $args
         */
        function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
                $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
                $class_names = $value = '';
				$classes = empty( $item->classes ) ? array() : (array) $item->classes;
                $classes[] = 'menu-item-' . $item->ID;
				$classes[] = empty( $item->megamenu ) ? '' : $item->megamenu;
				$classes[] = empty( $item->mgcolumn ) ? '' : $item->mgcolumn;
                $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );
                $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';
                $id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args );
                $id = $id ? ' id="' . esc_attr( $id ) . '"' : '';
                $output .= $indent . '<li' . $id . $value . $class_names . '>';
                $atts = array();
                $atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
                $atts['target'] = ! empty( $item->target )     ? $item->target     : '';
                $atts['rel']    = ! empty( $item->xfn )        ? $item->xfn        : '';
                $atts['href']   = ! empty( $item->url )        ? $item->url        : '';
                $atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args );
                $attributes = '';
                foreach ( $atts as $attr => $value ) {
                        if ( ! empty( $value ) ) {
                                $value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
                                $attributes .= ' ' . $attr . '="' . $value . '"';
                        }
                }
                $item_output = $args->before;
                $item_output .= '<a'. $attributes .'>';
					$ktz_icon = ! empty( $item->icon ) ? $item->icon : '';
					if ( ! empty ( $ktz_icon ) ) {
						$item_output .= '<span class="'. $ktz_icon .'"></span>  ';		
					}
				$item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
					$ktz_suptext = ! empty( $item->suptext ) ? $item->suptext : '';
					$ktz_suptextbg = ! empty( $item->suptextbg ) ? $item->suptextbg : '#b01e00';
					if ( ! empty ( $ktz_suptext ) ) {
						$item_output .= '<sup style="background-color:'.$ktz_suptextbg.'">'. $ktz_suptext .'</sup>  ';		
					}
                $item_output .= '</a>';
                $item_output .= $args->after;
                $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
        }
        /**
         * @see Walker::end_el()
         * @since 3.0.0
         *
         * @param string $output Passed by reference. Used to append additional content.
         * @param object $item Page data object. Not used.
         * @param int $depth Depth of page. Not Used.
         */
        function end_el( &$output, $item, $depth = 0, $args = array() ) {
                $output .= "</li>\n";
        }
}
if ( !function_exists('ktzmenu_1_default') ) {
function ktzmenu_1_default(){ 
	echo '<ul id="topmenu" class="sf-menu">';
	wp_list_categories('depth=1&sort_column=menu_order&title_li=' ); 
	echo '</ul>';
	}
}
if( !function_exists('ktz_topmenu')) {
	function ktz_topmenu() {
	wp_nav_menu( array(
	'container' =>false,
	'theme_location' =>'ktzmenu_1',
	'echo' => true,
	'depth' =>  3,
	'fallback_cb' => 'ktzmenu_1_default',
	'items_wrap' => '<ul id="topmenu" class="sf-menu">%3$s</ul>',
	'walker'        => new ktz_Walker_Nav_Menu
	));
	}
add_action( 'ktz_topmenu', 'ktz_topmenu' );
}


if ( !function_exists('ktzmenu_3_default') ) {
	function ktzmenu_3_default() {  
		echo '';
	}
}

/*******************************************
# Sub footer on hook system ~ post
*******************************************/
if ( !function_exists( 'ktz_thirdmenu' ) ) :
function ktz_thirdmenu() {
	if(function_exists('wp_nav_menu')) { 
	$defaults = array(
		'theme_location' => 'ktzmenu_3',
		'depth' => 3,
		'fallback_cb' => 'ktzmenu_3_default',
		'items_wrap'      => '<ul id="footermenu" class="sf-menu">%3$s</ul>',
		'walker'        => new ktz_Walker_Nav_Menu
	);
		wp_nav_menu( $defaults ); 
	} else { 
		ktzmenu_3_default(); 
	}
	}
add_action( 'ktz_thirdmenu', 'ktz_thirdmenu' );
endif;

if ( !function_exists('ktzmenu_4_default') ) {
	function ktzmenu_4_default() {  
		echo '';
	}
}

/*
* Sub footer on hook system ~ post
*/
if ( !function_exists( 'ktz_fourthmenu' ) ) :
function ktz_fourthmenu() {
	if(function_exists('wp_nav_menu')) { 
	$defaults = array(
		'theme_location' => 'ktzmenu_4',
		'depth' => 1,
		'fallback_cb' => 'ktzmenu_4_default',
		'items_wrap'      => '<ul id="footermenu" class="sf-menu">%3$s</ul>',
		'walker'        => new ktz_Walker_Nav_Menu
	);
		wp_nav_menu( $defaults ); 
	} else { 
		ktzmenu_4_default(); 
	}
}
add_action( 'ktz_fourthmenu', 'ktz_fourthmenu' );
endif;

/*******************************************
# Register menu on hook system ~ header
*******************************************/
if ( function_exists( 'register_nav_menus' ) ) {
	register_nav_menus(
	array(
      'ktzmenu_1' => 'Top Menu',
      'ktzmenu_3' => 'Squeeze Menu',
      'ktzmenu_4' => 'Footer Menu',
    ) );
}

/*******************************************
# Breadcrumbs on hook system with rich snipped
*******************************************/
if ( !function_exists('ktz_crumbs') ) {
function ktz_crumbs() {
	global $post;
	if( is_front_page() )
		return;
		if (class_exists('bbPress') && is_bbpress()) :
			bbp_breadcrumb();
		else :
		if ( ot_get_option('ktz_breadcrumbs') == 'yes' ) :
		echo '<div class="breadcrumb-wrap" xmlns:v="http://rdf.data-vocabulary.org/#"><ol class="breadcrumb btn-box">';
		echo '<li><span typeof="v:Breadcrumb"><a href="';
        echo home_url();
        echo '" rel="v:url" property="v:title">';
        echo __('Home','ktz_theme_textdomain');
        echo "</a></span></li>";
        if (is_category()) {
			global $wp_query;
            $cat_obj = $wp_query->get_queried_object();
            $thisCat = $cat_obj->term_id;
            $thisCat = get_category($thisCat);
            $parentCat = get_category($thisCat->parent);
            if ( $thisCat->parent != 0 ) {
				echo '<li><span typeof="v:Breadcrumb"><a href="';
                echo get_category_link( $parentCat->term_id );
				echo '" rel="v:url" property="v:title">';
				echo $parentCat->name;
				echo "</a></span></li>";
				}
		echo '<li><span property="v:title">';
			echo sprintf( __( 'Archive by category "%s"', 'ktz_theme_textdomain' ), single_cat_title( '', false ) );
		echo '</span></li>';
        } elseif (is_post_type_archive()) {
		echo '<li><span property="v:title">';
			echo post_type_archive_title();
		echo '</span></li>';
        }  elseif (is_single()) {
		$category = get_the_category();
		foreach($category as $category) {
		echo '<li><span typeof="v:Breadcrumb"><a href="';
			echo get_category_link($category->term_id);
		echo '" rel="v:url" property="v:title">' . $category->name . '</a></span></li>';
			}
                echo '<li><span property="v:title">' . get_the_title() . '</span></li>';
		} elseif (is_page()) {
                echo '<li><span property="v:title">' . get_the_title() . '</span></li>';
        }
		elseif (is_tag()) {
                echo '<li><span property="v:title">';
					echo single_tag_title();
				echo '</span></li>';
				}
		elseif (is_day()) {echo '<li><span property="v:title">' . __("Archive for ",'ktz_theme_textdomain'); get_the_time('F jS, Y') . '</span></li>';}
		elseif (is_month()) {echo '<li><span property="v:title">' . __("Archive for ",'ktz_theme_textdomain'); get_the_time('F, Y') . '</span></li>';}
		elseif (is_year()) {echo '<li><span property="v:title">' . __("Archive for ",'ktz_theme_textdomain'); get_the_time('Y') . '</span></li>';}
		elseif (is_author()) {echo '<li><span property="v:title">' . __("Author Archive",'ktz_theme_textdomain') . '</span></li>';}
		elseif (isset($_GET['paged']) && !empty($_GET['paged'])) {echo '<li><span property="v:title">' . __("Blog Archives",'ktz_theme_textdomain') . '</span></li>';}
		elseif (is_search()) {echo '<li><span property="v:title">' . __("Search Results",'ktz_theme_textdomain') . '</span></li>';}
		elseif (is_404()) {echo '<li><span property="v:title">' . __("Page not found",'ktz_theme_textdomain') . '</span></li>';}
		echo '</ol></div>';
		endif;
		endif;
	}
add_action('ktz_crumbs', 'ktz_crumbs' );
}

function ktz_custom_bbp_breadcrumb() {
  $args['before'] = '<div class="breadcrumb-wrap"><ol class="breadcrumb btn-box">';
  $args['after'] = '</ol></div>';
  $args['crumbs_before'] = '<li>';
  $args['crumbs_after'] = '</li>';
  $args['sep'] = '/';
  return $args;
}
add_filter('bbp_before_get_breadcrumb_parse_args', 'ktz_custom_bbp_breadcrumb' );