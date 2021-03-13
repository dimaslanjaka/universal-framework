<div class="updraft_site_actions btn-group btn-group-sm more-option-container">
	<button id="btn_group_drop" type="button" class="btn btn-primary more-option" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		<span class="dashicons dashicons-menu"></span>
		<span class="label hidden invisible"><?php _e('More', 'updraftcentral'); ?></span>
	</button>
	<div class="dropdown-menu dropdown-menu-right" aria-labelledby="btn_group_drop" data-site_id="<?php echo $site->site_id; ?>">
	<?php
		if (empty($site->description)) {
	?>
	<a class="dropdown-item" href="#">
	<span class="updraft-dropdown-item updraftcentral_site_adddescription">
	<span class="dashicons dashicons-edit"> </span>
	<span><?php _e('Site configuration', 'updraftcentral'); ?></span>
	</span>
	</a>
	<?php
		} else {
	?>
	<a class="dropdown-item" href="#">
	<span class="updraft-dropdown-item updraftcentral_site_adddescription updraftcentral_site_editdescription">
	<span class="dashicons dashicons-edit"> </span>
	<span><?php _e('Site configuration', 'updraftcentral'); ?></span>
	</span>
	</a>
	<?php
		}
	?>
	<a class="dropdown-item" href="#">
		<span class="updraft-dropdown-item updraftcentral_site_delete">
			<span class="dashicons dashicons-no-alt"></span>
			<span><?php _e('Remove site', 'updraftcentral'); ?></span>
		</span>
	</a>
	<?php

		// Return items/menus should be in the following format: array(array('id' => integer, 'visibility' => 'hidden|visible', 'class' => 'anyclassname', 'dashicon' => 'unlock', 'label' => 'menu label of choice'))
		$extra_site_menus = apply_filters('updraftcentral_extra_site_menus', array(), $site->site_id);
		if (!empty($extra_site_menus)) {
			foreach ($extra_site_menus as $menu) {
				$display = ('hidden' === $menu['visibility']) ? 'none' : 'block';
	?>
			<a id="<?php echo $menu['id']; ?>" class="dropdown-item" href="#" style="display:<?php echo $display; ?>;">
				<span class="updraft-dropdown-item <?php echo $menu['class']; ?>">
					<span class="dashicons dashicons-<?php echo $menu['dashicon']; ?>"> </span>
					<span><?php echo $menu['label']; ?></span>
				</span>
			</a>
	<?php
			}
		}
	?>
</div>
</div>