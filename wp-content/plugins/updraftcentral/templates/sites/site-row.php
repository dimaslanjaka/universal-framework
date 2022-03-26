<div class="ui-sortable-handle" data-site_id="<?php echo $site->site_id;?>">
	<div class="row updraftcentral_site_row<?php if (!empty($site->unlicensed)) echo ' site_unlicensed';?><?php if ($suspended) echo ' suspended';?>" <?php echo $site_data_attributes;?>>

		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-6 order-1 updraftcentral_row_sitelabel" title="<?php _e('Drag to set the site order', 'updraftcentral'); ?>">

			<?php
			if (empty($site->description)) {
				?>
				<div class="updraft_site_title">
					<a href="<?php esc_attr_e($site->url); ?>"><?php echo htmlspecialchars($site->url); ?></a> <span class="updraftcentral_site_dashboard dashicons dashicons-wordpress-alt updraftcentral-show-in-other-tabs" title="<?php esc_attr_e('Go to the WordPress dashboard', 'updraftcentral');?>"></span>
					<?php if (!empty($site->unlicensed)) { ?>
						<br><span class="updraft_site_unlicensed"><?php _e('A licence is required to manage this site', 'updraftcentral');?></span>
					<?php } ?>
				</div>
				<?php
			} else {
				?>
				<div class="updraft_site_title">
					<span class="updraftcentral_site_sort_icon dashicons dashicons-sort" title="<?php _e('Drag to set the site order', 'updraftcentral'); ?>"></span>
					<span title="<?php esc_attr_e($site->url); ?>"><?php echo htmlspecialchars($site->description);?><?php echo $site_alert_icon; ?></span>
					<?php
					
						$container_class = '';
						if (empty($available_updates['plugins']) && empty($available_updates['themes']) && empty($available_updates['core']) && empty($available_updates['translations'])) {
							$container_class = 'updates_count_container_hidden';
						}

						$plugin_class = '';
						if (empty($available_updates['plugins'])) {
							$plugin_class = 'updates_count_item_hidden';
						}

						$theme_class = '';
						if (empty($available_updates['themes'])) {
							$theme_class = 'updates_count_item_hidden';
						}

						$core_class = '';
						if (empty($available_updates['core'])) {
							$core_class = 'updates_count_item_hidden';
						}

						$translation_class = '';
						if (empty($available_updates['translations'])) {
							$translation_class = 'updates_count_item_hidden';
						}

					?>
					<div class="updraft_updates_count_container <?php echo $container_class; ?>">
						<span class="updraft_updates_count_label"><?php _e('Available Updates', 'updraftcentral'); ?>:</span>
						<span class="badge badge-warning updraft_updates_count_item updraft_available_plugins <?php echo $plugin_class; ?>"><?php _e('Plugins', 'updraftcentral'); ?><span class="updraft_updates_count updraft_plugins_count">(<?php echo $available_updates['plugins'];?>)</span></span>
						<span class="badge badge-info updraft_updates_count_item updraft_available_themes <?php echo $theme_class; ?>"><?php _e('Themes', 'updraftcentral'); ?><span class="updraft_updates_count updraft_themes_count">(<?php echo $available_updates['themes'];?>)</span></span>
						<span class="badge badge-danger updraft_updates_count_item updraft_available_core <?php echo $core_class; ?>"><?php _e('WordPress Core', 'updraftcentral'); ?></span>
						<span class="badge badge-success updraft_updates_count_item updraft_available_translations <?php echo $translation_class; ?>"><?php _e('Translations', 'updraftcentral'); ?></span>
					</div>
				</div>
				<br class="updraft-full-hidden">
				<a href="<?php esc_attr_e($site->url); ?>" target="_blank" class="updraftcentral_site_url_after_description"><?php esc_attr_e($site->url); ?></a>
				<?php if (!empty($site->unlicensed)) { ?>
					<br><span class="updraft_site_unlicensed"><?php _e('A licence is required to manage this site', 'updraftcentral');?></span>
				<?php } ?>
				<br>
				<?php
			}
			?>
		</div>
		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-6 order-2 updraftcentral_row_site_buttons">
			<div class="updraftcentral_row_container">
				<div class="updraft_site_actions btn-group btn-group-sm updraftcentral-hide-in-other-tabs updraftcentral-show-in-tab-sites" role="group">
				<button class="btn btn-primary updraftcentral_site_backup_now" title="<?php esc_attr_e('Backup', 'updraftcentral');?>">
					<span class="dashicons dashicons-backup-now"></span>
					<?php _e('Backup', 'updraftcentral'); ?>
				</button>
				<button class="btn btn-primary updraftcentral_site_backup_now_increment" title="<?php esc_attr_e('Increment', 'updraftcentral'); ?>">
					<span class="dashicons dashicons-backup-now"></span>
					<?php _e('Increment', 'updraftcentral'); ?>
				</button>
				<button type="button" class="btn btn-primary updraftcentral_site_dashboard">
						<span class="dashicons dashicons-wordpress-alt"></span>
						<?php _e('Dashboard', 'updraftcentral'); ?>
				</button>
				</div>

				<?php do_action('updraftcentral_site_row_after_buttons', $site); ?>
				<?php require 'site-menu.php'; ?>

			</div>
		</div>

		<?php do_action('updraftcentral_site_row_details', $site); ?>

		<div class="updraftcentral_row_extracontents order-last"></div>

	</div>

</div>
