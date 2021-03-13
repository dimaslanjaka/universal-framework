<div id="updraft-dashnotice" class="updated">
	<div style="float:right;"><a href="#" onclick="jQuery('#updraft-dashnotice').slideUp(); jQuery.post(ajaxurl, {action: 'updraft_ajax', subaction: 'dismissdashnotice', nonce: '<?php echo wp_create_nonce('updraftplus-credentialtest-nonce');?>' });"><?php printf(__('Dismiss (for %s months)', 'updraftplus'), 12); ?></a></div>

	<h3><?php _e('Thank you for backing up with UpdraftPlus!', 'updraftplus');?></h3>
	
	<a href="<?php echo apply_filters('updraftplus_com_link', 'https://updraftplus.com/');?>"><img style="border: 0px; float: right; height: 150px; width: 150px; margin: 20px 15px 15px 35px;" alt="UpdraftPlus" src="<?php echo UPDRAFTPLUS_URL.'/images/ud-logo-150.png'; ?>"></a>

	<?php
		echo '<p><strong>'.__('Free Newsletter', 'updraftplus').'</strong> <br>'.__('UpdraftPlus news, high-quality training materials for WordPress developers and site-owners, and general WordPress news. You can de-subscribe at any time.', 'updraftplus').' <a href="'.apply_filters('updraftplus_com_link', "https://updraftplus.com/newsletter-signup").'">'.__('Follow this link to sign up.', 'updraftplus').'</a></p>';

		echo '<p><strong>'.__('UpdraftPlus Premium', 'updraftplus').'</strong> <br>'.__('For personal support, the ability to copy sites, more storage destinations, encrypted backups for security, multiple backup destinations, better reporting, no adverts and plenty more, take a look at the premium version of UpdraftPlus - the world’s most popular backup plugin.', 'updraftplus').' <a href="'.apply_filters('updraftplus_com_link', "https://updraftplus.com/comparison-updraftplus-free-updraftplus-premium/").'">'.__('Compare with the free version', 'updraftplus').'</a> / <a href="'.apply_filters('updraftplus_com_link', "https://updraftplus.com/shop/updraftplus-premium/").'">'.__('Go to the shop.', 'updraftplus').'</a></p>';

		echo '<p><strong>'.__('UpdraftCentral', 'updraftplus').'</strong> <br>'.__('UpdraftCentral is a powerful remote control plugin for WordPress that allows you to control all your UpdraftPlus installs and backups from one central location.', 'updraftplus').' '.__('You can even use it to centrally manage and update all themes, plugins and WordPress core on all your sites without logging into them!', 'updraftplus').' <a href="https://wordpress.org/plugins/updraftcentral/">'.__('Download it for free from WordPress.org', 'updraftplus').'</a> / <a href="'.apply_filters('updraftplus_com_link', "https://updraftplus.com/updraftcentral/").'">'.__('Explore our Cloud and Premium versions.', 'updraftplus').'</a></p>';
		
		echo '<p><strong>'.__('WP-Optimize', 'updraftplus').'</strong> <br>'.__("When you've backed up your database, we recommend you install our WP-Optimize plugin to streamline it for better website performance.", "updraftplus").' <a href="https://wordpress.org/plugins/wp-optimize/">'.__('WP-Optimize (free)', 'updraftplus').'</a></p>';

		echo '<p><strong>'.__('More Quality Plugins', 'updraftplus').'</strong> <br><a href="https://www.simbahosting.co.uk/s3/shop/">'.__('Premium WooCommerce plugins', 'updraftplus').'</a> | <a href="https://wordpress.org/plugins/two-factor-authentication/">'.__('Free two-factor security plugin', 'updraftplus').'</a></p>';
		
	?>
	
	<div style="float:right;"><a href="#" onclick="jQuery('#updraft-dashnotice').slideUp(); jQuery.post(ajaxurl, {action: 'updraft_ajax', subaction: 'dismissdashnotice', nonce: '<?php echo wp_create_nonce('updraftplus-credentialtest-nonce');?>' });"><?php printf(__('Dismiss (for %s months)', 'updraftplus'), 12); ?></a></div>

	<p>&nbsp;</p>
	
</div>
