<div data-site_id="<?php echo $site->site_id;?>">
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
					<span title="<?php esc_attr_e($site->url); ?>"><?php echo htmlspecialchars($site->description);?></span>
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
