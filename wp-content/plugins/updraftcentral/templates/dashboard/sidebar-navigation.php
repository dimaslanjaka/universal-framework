<?php
/**
 * This file displays main navigation items (i.e. Modules) in sidebar
 */
	if (!defined('ABSPATH')) die('No direct access allowed');
	// @codingStandardsIgnoreFile
?>
<div id="updraft-central-navigation-sidebar" class="updraft-central-sidebar">
  <div class="logo">
    <img class="logo-portrait" src="<?php echo UD_CENTRAL_URL.'/images/updraft_central_logo.png';?>" alt="UpdraftCentral" width="150" height="150">
    <img class="logo-landscape" src="<?php echo UD_CENTRAL_URL.'/images/updraftcentral-logo-icon.png';?>" alt="UpdraftCentral" width="35" height="35">
  </div>
	<?php do_action('updraftcentral_main_navigation_before_items'); ?>
	<?php 
		$icons = array(
			'sites' => 'wordpress-alt sites',
			'backups' => 'cloud backups',
			'analytics' => 'chart-area analytics',
			'comments' => 'admin-comments comments',
			'users' => 'admin-users users',
			'updates' => 'download updates',
			'updraftvault' => 'lock updraftvault',
			'wpo' => 'share-alt wpo',
			'advancedtools' => 'admin-settings advancedtools',
			'plugin' => 'admin-plugins',
			'theme' => 'admin-appearance',
			'media' => 'admin-media',
			'pages' => 'admin-pages',
			'posts' => 'admin-posts',
			'events' => 'events'
		);

		// N.B. If you need to add a sub menu for a particular module you need to attach
		// a key-valued item in the array, where the key is the ID (same with the key names found in $icons array above)
		// and the value is an array of key-valued pairs containing the label for the sub menu as key and the value is a
		// selector (e.g. "#button_id" or ".button_class_name") of the button where the click event is to be triggered.
		//
		// Example:
		// ['sites'] => array(
		//		'Add new site' => '#updraftcentral_dashboard_newsite',
		//		'Import or export settings' => '#updraftcentral_dashboard_export_settings',
		// );
		$menus = array('sites' => array(
			__('Add new site', 'updraftcentral') => '#updraftcentral_dashboard_newsite',
			__('Import / export', 'updraftcentral') => '#updraftcentral_dashboard_export_settings',
		));
		$sub_menus = apply_filters('updraftcentral_sub_menus', $menus);
		
	?>
	<div id="visible-modules-container">
	<?php $first = true;
		$updraftcentral_modules_visibility = get_user_meta($updraft_central->user->user_id, 'updraftcentral_modules_visibility', true );
		$hidden_modules_html = '';
		foreach ($main_navigation_items as $id => $item) {
			$classes = '';
			if ($first) {
				$classes .= 'updraft-menu-item-links-active';
				$first = false;
			}
			if (!empty($item['classes'])) {
				$classes .= implode(' ', $item['classes']);
			}
			$icon = (!empty($icons[$id])) ? $icons[$id] : 'info';
			$always_visible_menu_items = array('sites', 'notices');

			$has_sub_menus = false;
			if (!empty($sub_menus) && isset($sub_menus[$id])) {
				$menus = $sub_menus[$id];
				$has_sub_menus = true;

				$sub_menu_items = '<ul>';
				foreach($menus as $key => $value) {
					$sub_menu_items .= '<li><span class="dashicons dashicons-arrow-right-alt updraft-sub-menu-bullet"></span> <a class="updraft-sub-menu-link" data-module="'.$id.'" data-selector="'.esc_attr($value).'">'.htmlspecialchars($key).'</a></li>';
				}
				$sub_menu_items .= '</ul>';
			}

			if (in_array($id, $always_visible_menu_items)) { ?>
				<div class="updraft-menu-item-container">
					<button
						id="updraft-menu-item-<?php echo $id; ?>"
						class="updraft-menu-item updraft-menu-item-<?php echo $id; ?> updraft-menu-item-links <?php echo $classes; ?>">
						<span class="dashicons dashicons-<?php echo $icon; ?>" tabindex="0"><span class="uc-icon-proxy" title="<?php echo $item['label']; ?>" data-toggle="tooltip" data-placement="right"></span></span>
						<span class="menu-label"><?php echo htmlspecialchars($item['label']); ?></span>
						<?php if ($has_sub_menus) : ?>
							<span class="updraft-sub-menu-icon"><span class="updraft-sub-menu-arrow-left">&#9658;</span><span class="updraft-sub-menu-arrow-down" style="display:none;">&#9660;</span><div class="updraft-sub-menu" style="display:none;"><?php echo $sub_menu_items; ?></div></span>
						<?php endif; ?>
					</button>
				</div>
			<?php } else {
					if (!isset($updraftcentral_modules_visibility[$id]) || $updraftcentral_modules_visibility[$id]) { ?>
						<div class="updraft-menu-item-container">
							<button
								id="updraft-menu-item-<?php echo $id; ?>"
								class="updraft-menu-item updraft-menu-item-<?php echo $id; ?> updraft-menu-item-links <?php echo $classes; ?>">
							<span class="dashicons dashicons-<?php echo $icon; ?>" tabindex="0"><span class="uc-icon-proxy" title="<?php echo $item['label']; ?>" data-toggle="tooltip" data-placement="right"></span></span>
							<span class="menu-label"><?php echo htmlspecialchars($item['label']); ?></span>
							<?php if ($has_sub_menus) : ?>
								<span class="updraft-sub-menu-icon"><span class="updraft-sub-menu-arrow-left">&#9658;</span><span class="updraft-sub-menu-arrow-down" style="display:none;">&#9660;</span><div class="updraft-sub-menu" style="display:none;"><?php echo $sub_menu_items; ?></div></span>
							<?php endif; ?>
							</button>
							<button class="module-visibility"
								title="<?php esc_attr_e('Hide module', 'updraftcentral'); ?>">
								<span class="dashicons dashicons-hidden"></span>
							</button>
						</div>
				<?php
					} else {
						$hidden_module = '';
						$hidden_module .= '<div class="updraft-menu-item-container">';
						$hidden_module .= sprintf('<button id="updraft-menu-item-%1$s" class="updraft-menu-item updraft-menu-item-%2$s updraft-menu-item-links %3$s">', $id, $id, $classes);
						$hidden_module .= sprintf('<span class="dashicons dashicons-%1$s" title="%2$s" data-toggle="tooltip" data-placement="right" tabindex="0"></span>', $icon, $item['label']);
						$hidden_module .= sprintf('<span class="menu-label">%1$s</span>', htmlspecialchars($item['label']));
						$hidden_module .= '</button>';
						$hidden_module .= sprintf('<button class="module-visibility" title="%1$s"><span class="dashicons dashicons-visibility"></span></button>', esc_attr__('Show module', 'updraftcentral'));
						$hidden_module .= '</div>';
						echo $hidden_module;
						$hidden_modules_html .= $hidden_module;
					}
				}
		}
	?>
	</div>
	<div id="hidden-modules-container" class="updraft-menu-item-container hidden-modules">
		<button class="updraft-menu-item uc-hidden-modules-menu">
			<span class="dashicons dashicons-menu modules-open"></span>
			<span class="menu-label uc-hidden-modules-label"><?php _e('Hidden Modules', 'updraftcentral'); ?></span>
		</button>
		<button class="updraft-menu-item uc-hidden-modules-close">
			<span class="dashicons dashicons-menu modules-close dashicons-no"></span>
			<span class="menu-label uc-hidden-modules-label"><?php _e('Hidden Modules', 'updraftcentral'); ?></span>
		</button>
	</div>
	<div id="hidden-modules-menu">
		<?php echo $hidden_modules_html; ?>
	</div>
	<button id="updraft-central-sidebar-button">
	  <span class="dashicons arrow-left updraft-central-sidebar-button-icon">
	    <img src="<?php echo UD_CENTRAL_URL.'/images/icons/collapse-menu-icon-close.svg';?>" alt="UpdraftCentral" width="20" height="13"></span>
    <span class="dashicons arrow-right updraft-central-sidebar-button-icon" style="display: none;">
      <img src="<?php echo UD_CENTRAL_URL.'/images/icons/collapse-menu-icon-open.svg';?>" alt="UpdraftCentral" width="20" height="13"></span>
  </button>
</div>
