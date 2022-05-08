<?php

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed.');

// SDK uses namespacing - requires PHP 5.3 (actually the SDK states its requirements as 5.3.3)
use OpenCloud\Rackspace;

// New SDK - https://github.com/rackspace/php-opencloud and http://docs.rackspace.com/sdks/guide/content/php.html
// Uploading: https://github.com/rackspace/php-opencloud/blob/master/docs/userguide/ObjectStore/Storage/Object.md

require_once(UPDRAFTPLUS_DIR.'/methods/openstack-base.php');

class UpdraftPlus_BackupModule_cloudfiles_opencloudsdk extends UpdraftPlus_BackupModule_openstack_base {

	public function __construct() {
		parent::__construct('cloudfiles', 'Cloud Files', 'Rackspace Cloud Files', '/images/rackspacecloud-logo.png');
	}

	public function get_client() {
		return $this->client;
	}

	public function get_service($opts, $useservercerts = false, $disablesslverify = null) {

		$user = $opts['user'];
		$apikey = $opts['apikey'];
		$authurl = $opts['authurl'];
		$region = (!empty($opts['region'])) ? $opts['region'] : null;

		include_once(UPDRAFTPLUS_DIR.'/vendor/autoload.php');

		global $updraftplus;

		// The new authentication APIs don't match the values we were storing before
		$new_authurl = ('https://lon.auth.api.rackspacecloud.com' == $authurl || 'uk' == $authurl) ? Rackspace::UK_IDENTITY_ENDPOINT : Rackspace::US_IDENTITY_ENDPOINT;

		if (null === $disablesslverify) $disablesslverify = UpdraftPlus_Options::get_updraft_option('updraft_ssl_disableverify');

		if (empty($user) || empty($apikey)) throw new Exception(__('Authorisation failed (check your credentials)', 'updraftplus'));

		$updraftplus->log("Cloud Files authentication URL: ".$new_authurl);

		$client = new Rackspace($new_authurl, array(
			'username' => $user,
			'apiKey' => $apikey
		));
		$this->client = $client;

		if ($disablesslverify) {
			$client->setSslVerification(false);
		} else {
			if ($useservercerts) {
				$client->setConfig(array($client::SSL_CERT_AUTHORITY, 'system'));
			} else {
				$client->setSslVerification(UPDRAFTPLUS_DIR.'/includes/cacert.pem', true, 2);
			}
		}

		return $client->objectStoreService('cloudFiles', $region);
	}

	/**
	 * This method overrides the parent method and lists the supported features of this remote storage option.
	 *
	 * @return Array - an array of supported features (any features not
	 * mentioned are assumed to not be supported)
	 */
	public function get_supported_features() {
		// This options format is handled via only accessing options via $this->get_options()
		return array('multi_options');
	}

	/**
	 * Retrieve default options for this remote storage module.
	 *
	 * @return Array - an array of options
	 */
	public function get_default_options() {
		return array(
			'user' => '',
			'authurl' => 'https://auth.api.rackspacecloud.com',
			'apikey' => '',
			'path' => '',
			'region' => null
		);
	}
	
	/**
	 * This outputs the html to the settings page for the CloudFiles settings.
	 *
	 * @param  Array $opts - this is an array of CloudFiles settings
	 */
	public function config_print_middlesection() {
	
		global $updraftplus_admin;
	
		$opts = $this->get_options();

		$classes = $this->get_css_classes();

		?>
		<tr class="<?php echo $classes; ?>">
		<th></th>
			<td>
				<?php
					if (!function_exists('json_last_error')) {
					$updraftplus_admin->show_double_warning('<strong>'.__('Warning', 'updraftplus').':</strong> '.sprintf(__('Your web server\'s PHP installation does not included a required module (%s). Please contact your web hosting provider\'s support.', 'updraftplus'), 'json').' '.sprintf(__("UpdraftPlus's %s module <strong>requires</strong> %s. Please do not file any support requests; there is no alternative.", 'updraftplus'), 'Cloud Files', 'json'), 'cloudfiles');
					}
					
				?>
			
				<p><?php _e('Get your API key <a href="https://mycloud.rackspace.com/">from your Rackspace Cloud console</a> (read instructions <a href="http://www.rackspace.com/knowledge_center/article/rackspace-cloud-essentials-1-generating-your-api-key">here</a>), then pick a container name to use for storage. This container will be created for you if it does not already exist.', 'updraftplus');?> <a href="<?php echo apply_filters("updraftplus_com_link", "https://updraftplus.com/faqs/there-appear-to-be-lots-of-extra-files-in-my-rackspace-cloud-files-container/");?>"><?php _e('Also, you should read this important FAQ.', 'updraftplus'); ?></a></p>
			</td>
		</tr>
		<tr class="<?php echo $classes; ?>">
			<th title="<?php _e('Accounts created at rackspacecloud.com are US accounts; accounts created at rackspace.co.uk are UK accounts.', 'updraftplus');?>"><?php _e('US or UK-based Rackspace Account', 'updraftplus');?>:</th>
			<td>
				<select data-updraft_settings_test="authurl" <?php $this->output_settings_field_name_and_id('authurl');?> title="<?php _e('Accounts created at rackspacecloud.com are US-accounts; accounts created at rackspace.co.uk are UK-based', 'updraftplus');?>">
					<option <?php echo ('https://lon.auth.api.rackspacecloud.com' != $opts['authurl']) ? 'selected="selected' : ''; ?> value="https://auth.api.rackspacecloud.com"><?php _e('US (default)', 'updraftplus'); ?></option>
					<option <?php echo ('https://lon.auth.api.rackspacecloud.com' == $opts['authurl']) ? 'selected="selected' : ''; ?> value="https://lon.auth.api.rackspacecloud.com"><?php _e('UK', 'updraftplus'); ?></option>
				</select>
			</td>
		</tr>

		<tr class="<?php echo $classes; ?>">
			<th><?php _e('Cloud Files Storage Region', 'updraftplus');?>:</th>
			<td>
				<select data-updraft_settings_test="region" <?php $this->output_settings_field_name_and_id('region');?>>
					<?php
						$regions = array(
							'DFW' => __('Dallas (DFW) (default)', 'updraftplus'),
							'SYD' => __('Sydney (SYD)', 'updraftplus'),
							'ORD' => __('Chicago (ORD)', 'updraftplus'),
							'IAD' => __('Northern Virginia (IAD)', 'updraftplus'),
							'HKG' => __('Hong Kong (HKG)', 'updraftplus'),
							'LON' => __('London (LON)', 'updraftplus')
						);
						$selregion = (empty($opts['region'])) ? 'DFW' : $opts['region'];
						foreach ($regions as $reg => $desc) {
						?>
						<option <?php if ($selregion == $reg) echo 'selected="selected"'; ?> value="<?php echo $reg;?>"><?php echo htmlspecialchars($desc); ?></option>
						<?php
						}
					?>
				</select>
			</td>
		</tr>

		<tr class="<?php echo $classes; ?>">
			<th><?php _e('Cloud Files Username', 'updraftplus');?>:</th>
			<td><input data-updraft_settings_test="user" type="text" autocomplete="off" style="width: 282px" <?php $this->output_settings_field_name_and_id('user');?> value="<?php esc_attr_e($opts['user']); ?>" />
			<div style="clear:both;">
			<?php echo apply_filters('updraft_cloudfiles_apikeysetting', '<a href="'.apply_filters("updraftplus_com_link", "https://updraftplus.com/shop/cloudfiles-enhanced/").'"><em>'.__('To create a new Rackspace API sub-user and API key that has access only to this Rackspace container, use this add-on.', 'updraftplus').'</em></a>'); ?>
			</div>
			</td>
		</tr>
		<tr class="<?php echo $classes; ?>">
			<th><?php _e('Cloud Files API Key', 'updraftplus');?>:</th>
			<td><input data-updraft_settings_test="apikey" type="<?php echo apply_filters('updraftplus_admin_secret_field_type', 'password'); ?>" autocomplete="off" style="width: 282px" <?php $this->output_settings_field_name_and_id('apikey');?> value="<?php esc_attr_e(trim($opts['apikey'])); ?>" />
			</td>
		</tr>
		<tr class="<?php echo $classes; ?>">
			<th><?php echo apply_filters('updraftplus_cloudfiles_location_description', __('Cloud Files Container', 'updraftplus'));?>:</th>
			<td><input data-updraft_settings_test="path" type="text" style="width: 282px" <?php $this->output_settings_field_name_and_id('path');?> value="<?php esc_attr_e($opts['path']); ?>" /></td>
		</tr>
		<?php

	}

	public function credentials_test($posted_settings) {

		if (empty($posted_settings['apikey'])) {
			printf(__("Failure: No %s was given.", 'updraftplus'), __('API key', 'updraftplus'));
			return;
		}

		if (empty($posted_settings['user'])) {
			printf(__("Failure: No %s was given.", 'updraftplus'), __('Username', 'updraftplus'));
			return;
		}

		$opts = array(
			'user' => $posted_settings['user'],
			'apikey' => stripslashes($posted_settings['apikey']),
			'authurl' => $posted_settings['authurl'],
			'region' => (empty($posted_settings['region'])) ? null : $posted_settings['region']
		);

		$this->credentials_test_go($opts, $posted_settings['path'], $posted_settings['useservercerts'], $posted_settings['disableverify']);
	}
}
