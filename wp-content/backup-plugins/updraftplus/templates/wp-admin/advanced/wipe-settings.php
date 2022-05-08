<?php
	if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed');
?>
<div class="advanced_tools wipe_settings">
	<h3><?php _e('Wipe settings', 'updraftplus');?></h3>
	<p><?php echo __('This button will delete all UpdraftPlus settings and progress information for in-progress backups (but not any of your existing backups from your cloud storage).', 'updraftplus').' '.__('You will then need to enter all your settings again. You can also do this before deactivating/deinstalling UpdraftPlus if you wish.', 'updraftplus');?></p>
	<form method="post" action="<?php echo esc_url(add_query_arg(array('error' => false, 'updraft_restore_success' => false, 'action' => false, 'page' => 'updraftplus'))); ?>">
		<input type="hidden" name="action" value="updraft_wipesettings" />
		<input type="submit" class="button-primary updraft_wipe_settings" value="<?php _e('Wipe settings', 'updraftplus'); ?>" onclick="var delete = confirm('<?php echo esc_js(__('This will delete all your UpdraftPlus settings - are you sure you want to do this?', 'updraftplus'));?>'); if (delete) { updraft_settings_form_changed = false; }; return delete;">
	</form>
</div>