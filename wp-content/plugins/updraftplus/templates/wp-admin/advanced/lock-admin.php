<?php
	if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed');
?>
<?php if (!class_exists('UpdraftPlus_Addon_LockAdmin')) : ?>
	<div class="advanced_tools lock_admin">
		<p class="updraftplus-lock-advert">
			<h3><?php _e('Lock access to the UpdraftPlus settings page', 'updraftplus'); ?></h3>
			<a href="<?php apply_filters("updraftplus_com_link", "https://updraftplus.com/shop/updraftplus-premium/");?>">
				<em><?php _e('For the ability to lock access to UpdraftPlus settings with a password, upgrade to UpdraftPlus Premium.', 'updraftplus'); ?></em>
			</a>
		</p>
	</div>
<?php endif;
