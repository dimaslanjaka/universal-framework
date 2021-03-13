<?php
if (!defined('UD_CENTRAL_DIR')) die('Security check');

/**
 * Shows default dashboard. List of sites to manage, if available
 */
class UpdraftRC_Action_showmain extends UpdraftRC_Action {

	// No nonce required to show the dashboard
	public $check_nonce = false;

	public function render() {

		// Show the table of existing sites
		$sites_container_classes = apply_filters('updraftcentral_sites_container_classes', 'updraftcentral-show-in-other-tabs updraftcentral-hide-in-tab-notices');

		?>

		<noscript>
			<p><?php _e('UpdraftCentral is a JavaScript application. You will need to have JavaScript enabled in order to use it.', 'updraftcentral');?></p>
		</noscript>

		<div id="updraftcentral_dashboard_existingsites_container" class="<?php echo $sites_container_classes;?>">
			<div id="updraftcentral_dashboard_existingsites">
				<?php echo $this->user->get_sites_html(); ?>
			</div>
		</div>
		<div id="updraftcentral_dashboard_loading"><?php _e('Loading...', 'updraftcentral');?><span class="updraftcentral_spinner updraftcentral_loading_spinner"></span></div>

		<?php

	}
}
