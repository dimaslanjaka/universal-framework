<?php
/**
 * This file displays a link to login form page for not logged in users
 */
if (!defined('UD_CENTRAL_DIR')) die('Security check');

_e('You need to be logged in to see this page.', 'updraftcentral');

if (function_exists('WC') && function_exists('woocommerce_login_form')) {

	if (!function_exists('updraftcentral_woocommerce_login_form_add_redirect_field')) {
		function updraftcentral_woocommerce_login_form_add_redirect_field() {
			echo '<input type="hidden" name="updraftcentral_redirect_on_wc_login" value="'.esc_attr(get_permalink()).'">';
		}
		add_action('woocommerce_login_form', 'updraftcentral_woocommerce_login_form_add_redirect_field');
	}

	echo do_shortcode('[woocommerce_my_account]');
} else {
	if (function_exists('WC') && false != ($myaccount_page_id = get_option('woocommerce_myaccount_page_id'))) {
		$login_url = get_permalink($myaccount_page_id);
	} else {
		$login_url = wp_login_url(get_permalink());
	}
	?>
	<a href="<?php esc_attr_e($login_url);?>"><?php _e('Go here to log in.', 'updraftcentral');?></a>
	<?php
}
