<?php if (!defined('UD_CENTRAL_DIR')) die('No direct access allowed'); ?>

<div id="updraftcentral_panel_notices" class="updraftcentral-show-in-tab-notices updraftcentral-hide-in-other-tabs">

	<h2><?php _e('Comparison of UpdraftCentral versions: Free, Premium, Cloud', 'updraftcentral');?></h2>

	<p>
		<?php _e('The free, self-hosted version of UpdraftCentral is a fully functional dashboard to manage all your backups and updates in one place.', 'updraftcentral');?>
		
		<?php _e("However, with an upgrade, you get even more and can save even more time.", 'updraftcentral');?>	
	</p>

	<p> 
		<?php _e('UpdraftCentral Premium has an added, handy Analytics, Comment, User, Plugin and Theme Management modules, and more to come in future. Our UpdraftCentral Cloud version has this too, plus the additional convenience of having it completely hosted on UpdraftPlus.com, maintained and personally supported by our team (i.e. "Software as a Service, SaaS").', 'updraftcentral');?>
	</p>

	<table class="updraftcentral_comparison">
		<tbody>
		<tr>
			<td></td>
			<td class="logo">
				<img src="<?php echo UD_CENTRAL_URL.'/images/updraft_central_logo.png';?>" alt="UpdraftCentral" width="150" height="150">
			</td>
			<td class="logo">
				<img src="<?php echo UD_CENTRAL_URL.'/images/updraft_central_premium_logo.png';?>" alt="<?php esc_attr_e('UpdraftCentral Premium', 'updraftcentral');?>" width="150" height="150">
			</td>
			<td class="logo">
				<img src="<?php echo UD_CENTRAL_URL.'/images/updraft_central_cloud_logo.png';?>" alt="<?php esc_attr_e('UpdraftCentral Cloud', 'updraftcentral');?>" width="150" height="150">
			</td>
		</tr>
		<tr>
			<td></td>
			<td>
				<p><?php _e('Installed', 'updraftcentral');?></p>
			</td>
			<td>
				<p><a href="https://updraftcentral.com"><?php _e('Upgrade now', 'updraftcentral');?></a></p>
			</td>
			<td>
				<p><a href="https://updraftcentral.com"><?php _e('Upgrade now', 'updraftcentral');?></a></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Comprehensive backup management', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Update themes, plugins and WordPress core', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Manage UpdraftPlus advanced tools', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Export/Import websites and settings', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Manage UpdraftVault', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Manage WP-Optimize', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Manage Auto Updates', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('RSA encryption', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Instant overview of important KPIs using Google Analytics', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-no-alt" aria-label="<?php esc_attr_e('No', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Manage WordPress comments', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-no-alt" aria-label="<?php esc_attr_e('No', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Manage WordPress users', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-no-alt" aria-label="<?php esc_attr_e('No', 'updraftcentral');?>"></span></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Manage WordPress plugins', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-no-alt" aria-label="<?php esc_attr_e('No', 'updraftcentral');?>"></span></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Manage WordPress themes', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-no-alt" aria-label="<?php esc_attr_e('No', 'updraftcentral');?>"></span></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Manage Tags', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-no-alt" aria-label="<?php esc_attr_e('No', 'updraftcentral');?>"></span></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Suspend/Unsuspend website management', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-no-alt" aria-label="<?php esc_attr_e('No', 'updraftcentral');?>"></span></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Self-hosted', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-no-alt" aria-label="<?php esc_attr_e('No', 'updraftcentral');?>"></span></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Fully hosted on our website', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-no-alt" aria-label="<?php esc_attr_e('No', 'updraftcentral');?>"></span></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-no-alt" aria-label="<?php esc_attr_e('No', 'updraftcentral');?>"></span></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
		<tr>
			<td class="txt-left">
				<p><?php _e('Personal support from the developers', 'updraftcentral');?></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-no-alt" aria-label="<?php esc_attr_e('No', 'updraftcentral');?>"></span></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
			<td>
				<p><span class="dashicons dashicons-yes" aria-label="<?php esc_attr_e('Yes', 'updraftcentral');?>"></span></p>
			</td>
		</tr>
				<tr>
			<td></td>
			<td>
				<p><?php _e('Installed', 'updraftcentral');?></p>
			</td>
			<td>
				<p><a href="https://updraftcentral.com"><?php _e('Upgrade now', 'updraftcentral');?></a></p>
			</td>
			<td>
				<p><a href="https://updraftcentral.com"><?php _e('Upgrade now', 'updraftcentral');?></a></p>
			</td>
		</tr>
		</tbody>
	</table> 
</div>
