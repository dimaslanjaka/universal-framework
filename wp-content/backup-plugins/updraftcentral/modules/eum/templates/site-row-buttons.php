<?php if (!defined('ABSPATH')) die('No direct access.'); ?>
<div class="updraft_site_actions btn-group btn-group-sm updraftcentral-hide-in-other-tabs updraftcentral-show-in-tab-eum" role="group">
	<div class="icon-row-1">
		<button type="button" class="btn btn-primary updraftcentral_site_general">
			<span class="dashicons dashicons-admin-settings"></span>
			<?php _e('General', 'updraftcentral'); ?>
		</button>
		<button type="button" class="btn btn-primary updraftcentral_site_advanced">
			<span class="dashicons dashicons-admin-advanced"></span>
			<?php _e('Advanced', 'updraftcentral'); ?>
		</button>

	</div>
	<div class="icon-row-2">
		<button type="button" class="btn btn-primary updraftcentral_site_plugins">
			<span class="dashicons dashicons-admin-plugins"></span>
			<?php _e('Plugins', 'updraftcentral'); ?>
		</button>
		<button type="button" class="btn btn-primary updraftcentral_site_themes">
			<span class="dashicons dashicons-admin-appearance"></span>
			<?php _e('Themes', 'updraftcentral'); ?>
		</button>
		<button type="button" class="btn btn-primary updraftcentral_site_logs">
			<span class="dashicons dashicons-admin-logs"></span>
			<?php _e('Logs', 'updraftcentral'); ?>
		</button>
	</div>
</div>
