<?php
if (!defined('ABSPATH')) die('No direct access.');
/**
 * This file displays top navigation links such as `Full Screen`, `Help` and `Setttings`
 */
?>
<div id="updraft-central-navigation">
	<span class="updraft-mobile-menu dashicons dashicons-menu"></span>
	<div class="updraft-central-logo">
		<img class="logo-landscape" src="<?php echo UD_CENTRAL_URL.'/images/updraftcentral-logo-landscape.png';?>" alt="UpdraftCentral" width="165" height="30">
  </div>
	<div class="top_menu_right">
		<?php do_action('updraftcentral_main_navigation_after_items'); ?>
		<?php if (!empty($common_urls['get_licences'])) :?>
		<a
			href="<?php esc_attr_e($common_urls['get_licences']);?>"
			id="updraftcentral_licence_info"
			title="<?php esc_attr_e('This is your licence usage/availability count.', 'updraftcentral');
				if (!empty($common_urls['get_licences']) && $how_many_licences_available >= 0) {
				echo ' '.__('Follow the link to purchase more licences.', 'updraftcentral');
				}
				?>"
			class="updraftcentral_licence_info">
				<span class="updraftcentral_licences_in_use"><?php echo $how_many_licences_in_use;?></span>
				 /
				<span class="updraftcentral_licences_total"><?php echo ($how_many_licences_available < 0) ? '&#8734;' : $how_many_licences_available;?></span>
		</a>
		<?php endif;?>
		<button class="btn updraftcentral-settings" type="button"><span class="dashicons updraftcentral-settings-icon" title="<?php esc_attr_e('Settings', 'updraftcentral');?>"></span>
		<button class="btn updraftcentral-help" type="button"><span class="dashicons updraftcentral-help-icon" title="<?php esc_attr_e('Help', 'updraftcentral');?>"></span>
		<button class="btn updraft-full-screen" type="button"><span class="dashicons updraft-full-screen-icon" title="<?php esc_attr_e('Full screen', 'updraftcentral');?>"></span>
		<span class="dashicons updraftcentral-profile" title="<?php esc_attr_e('Profile', 'updraftcentral');?>"></span>
		<?php do_action('updraftcentral_main_navigation_after_icons'); ?>
	</div>
</div>
