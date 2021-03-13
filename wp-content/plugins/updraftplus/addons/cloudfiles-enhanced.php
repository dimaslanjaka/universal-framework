<?php
// @codingStandardsIgnoreStart
/*
UpdraftPlus Addon: cloudfiles-enhanced:Rackspace Cloud Files, enhanced
Description: Adds enhanced capabilities for Rackspace Cloud Files users
Version: 1.6
RequiresPHP: 5.3.3
Shop: /shop/cloudfiles-enhanced/
Latest Change: 1.12.18
*/
// @codingStandardsIgnoreEnd

// Future possibility: sub-folders
if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed');

// The new Rackspace SDK is PHP 5.3.3 or later
if (version_compare(phpversion(), '5.3.3', '<') || (defined('UPDRAFTPLUS_CLOUDFILES_USEOLDSDK') && UPDRAFTPLUS_CLOUDFILES_USEOLDSDK)) return;

use OpenCloud\Rackspace;

$updraftplus_addon_cloudfilesenhanced = new UpdraftPlus_Addon_CloudFilesEnhanced;

class UpdraftPlus_Addon_CloudFilesEnhanced {
	
	private $accounts;

	private $regions;
	
	public function __construct() {
		$this->title = __('Rackspace Cloud Files, enhanced', 'updraftplus');
		$this->description = __('Adds enhanced capabilities for Rackspace Cloud Files users', 'updraftplus');
		add_action('updraftplus_settings_page_init', array($this, 'updraftplus_settings_page_init'));
		add_action('updraft_cloudfiles_newuser', array($this, 'newuser'));
		add_filter('updraft_cloudfiles_apikeysetting', array($this, 'apikeysettings'));
		
		$this->accounts = array(
			'us' => __('US (default)', 'updraftplus'),
			'uk' => __('UK', 'updraftplus')
		);
		
		$this->regions = array(
			'DFW' => __('Dallas (DFW) (default)', 'updraftplus'),
			'SYD' => __('Sydney (SYD)', 'updraftplus'),
			'ORD' => __('Chicago (ORD)', 'updraftplus'),
			'IAD' => __('Northern Virginia (IAD)', 'updraftplus'),
			'HKG' => __('Hong Kong (HKG)', 'updraftplus'),
			'LON' => __('London (LON)', 'updraftplus')
		);
	}

	public function updraftplus_settings_page_init() {
		add_action('admin_footer', array($this, 'admin_footer'));
	}

	public function apikeysettings($msg) {
		$msg = '<a href="#" id="updraft_cloudfiles_newapiuser">'.__('Create a new API user with access to only this container (rather than your whole account)', 'updraftplus').'</a>';
		return $msg;
	}
	
	public function create_api_user($use_settings){
		
		if (!isset($use_settings['adminuser'])) {
			return array('e' => 1, 'm' => __('You need to enter an admin username', 'updraftplus'));
		}
		if (empty($use_settings['adminapikey'])) {
			return array('e' => 1, 'm' => __('You need to enter an admin API key', 'updraftplus'));
		}
		if (!isset($use_settings['newuser'])) {
			return array('e' => 1, 'm' => __('You need to enter a new username', 'updraftplus'));
		}
		if (empty($use_settings['container'])) {
			return array('e' => 1, 'm' => __('You need to enter a container', 'updraftplus'));
		}
		// Here, 0 == catches both 0 and false
		if (empty($use_settings['newemail']) || 0 == strpos($use_settings['newemail'], '@')) {
			return array('e' => 1, 'm' => __('You need to enter a valid new email address', 'updraftplus'));
		}
		if (empty($use_settings['location'])) $use_settings['location'] = 'us';
		if (empty($use_settings['region'])) $use_settings['region'] = 'DFW';
		
		include_once(UPDRAFTPLUS_DIR.'/methods/cloudfiles.php');
		include_once(UPDRAFTPLUS_DIR.'/vendor/autoload.php');
		$method = new UpdraftPlus_BackupModule_cloudfiles;
		$useservercerts = !empty($use_settings['useservercerts']);
		$disableverify = !empty($use_settings['disableverify']);
		$auth_url = ('uk' == $use_settings['location']) ? Rackspace::UK_IDENTITY_ENDPOINT : Rackspace::US_IDENTITY_ENDPOINT;
		
		try {
			$service = $method->get_service(array(
				'user' => $use_settings['adminuser'],
				'apikey' => $use_settings['adminapikey'],
				'authurl' => $auth_url,
				'region' => $use_settings['region']
				),
				$useservercerts,
			$disableverify);
		} catch (AuthenticationError $e) {
			$updraftplus->log('Cloud Files authentication failed ('.$e->getMessage().')');
			$updraftplus->log(__('Cloud Files authentication failed', 'updraftplus').' ('.$e->getMessage().')', 'error');
			return false;
		} catch (Exception $e) {
			return array('e' => 1, 'm' => __('Error:', 'updraftplus').' '.$e->getMessage());
		}
		
		// Create the container (if necessary)
		// Get the container
		try {
			$container_object = $service->getContainer($use_settings['container']);
		} catch (Guzzle\Http\Exception\ClientErrorResponseException $e) {
			$container_object = $service->createContainer($use_settings['container']);
		} catch (Exception $e) {
			return array('e' => 1, 'm' => __('Cloud Files authentication failed', 'updraftplus').' ('.get_class($e).', '.$e->getMessage().')');
		}
		
		if (!is_a($container_object, 'OpenCloud\ObjectStore\Resource\Container') && !is_a($container_object, 'Container')) {
			return array('e' => 1, 'm' => __('Cloud Files authentication failed', 'updraftplus').' ('.get_class($container_object).')');
		}
		
		// Create the new user
		$json = json_encode(
			array(
				'user' => array(
					'username' => $use_settings['newuser'],
					'email' => $use_settings['newemail'],
					'enabled' => true
				)
			)
		);
		
		$client = $method->get_client();
		
		try {
			$response = $client->post($auth_url.'users', array('Content-Type' => 'application/json', 'Accept' => 'application/json'), $json)->send()->json();
		} catch (Guzzle\Http\Exception\ClientErrorResponseException $e) {
			$response = $e->getResponse();
			$code = $response->getStatusCode();
			$reason = $response->getReasonPhrase();
			if (403 == $code) {
				return array('e' => 1, 'm' => __('Authorisation failed (check your credentials)', 'updraftplus'));
			} elseif (409 == $code && 'Conflict' == $reason) {
				return array('e' => 1, 'm' => __('Conflict: that user or email address already exists', 'updraftplus'));
			} else {
				return array('e' => 1, 'm' => sprintf(__('Cloud Files operation failed (%s)', 'updraftplus'), 5)." (".$e->getMessage().') ('.get_class($e).')');
			}
		} catch (Exception $e) {
			return array('e' => 1, 'm' => sprintf(__('Cloud Files operation failed (%s)', 'updraftplus'), 4).' ('.$e->getMessage().') ('.get_class($e).')');
		}
		
		if (empty($response['user']['id']) || empty($response['user']['OS-KSADM:password']) || empty($response['user']['username'])) {
			return array('e' => 1, 'm' => sprintf(__('Cloud Files operation failed (%s)', 'updraftplus'), 3));
		}
		
		$user = $response['user']['username'];
		$pass = $response['user']['OS-KSADM:password'];
		$id = $response['user']['id'];
		
		// Add the user to the container
		try {
			$headers = array('X-Container-Write' => $user, 'X-Container-Read' => $user);
			$container_object->getClient()->post($container_object->getUrl(), $headers)->send();
		} catch (Exception $e) {
			return array('e' => 1, 'm' => sprintf(__('Cloud Files operation failed (%s)', 'updraftplus'), 1).' ('.$e->getMessage().') ('.get_class($e).')');
		}
		
		// Get an API key for the user
		try {
			$response = $container_object->getClient()->post($auth_url."users/$id/OS-KSADM/credentials/RAX-KSKEY:apiKeyCredentials/RAX-AUTH/reset", array())->send()->json();
			if (empty($response['RAX-KSKEY:apiKeyCredentials']['apiKey'])) {
				return array('e' => 1, 'm' => sprintf(__('Cloud Files operation failed (%s)', 'updraftplus'), 8));
			}
			$apikey = $response['RAX-KSKEY:apiKeyCredentials']['apiKey'];
		} catch (Exception $e) {
			return array('e' => 1, 'm' => sprintf(__('Cloud Files operation failed (%s)', 'updraftplus'), 7).' ('.$e->getMessage().') ('.get_class($e).')');
		}
		
		return array(
			'e' => 0,
			'u' => htmlspecialchars($user),
			'p' => htmlspecialchars($pass),
			'k' => htmlspecialchars($apikey),
			'a' => $auth_url = ('uk' == $use_settings['location']) ? 'https://lon.auth.api.rackspacecloud.com' : 'https://auth.api.rackspacecloud.com',
			'r' => $use_settings['region'],
			'c' => $use_settings['container'],
			'm' => htmlspecialchars(sprintf(__("Username: %s", 'updraftplus'), $user))."<br>".htmlspecialchars(sprintf(__("Password: %s", 'updraftplus'), $pass))."<br>".htmlspecialchars(sprintf(__("API Key: %s", 'updraftplus'), $apikey))
		);
	}
	
	public function newuser() {
		$use_settings = $_POST;
		$data = $this->create_api_user($use_settings);
		echo json_encode($data);
		die();
	}

	public function admin_footer() {
		$this->modal_css();
		$this->modal_html();
		$this->modal_script();
	}
	
	private function modal_css(){
		?>
		<style type="text/css">
			#updraft_cfnewapiuser_form label {
				float: left;
				clear:left;
				width: 200px;
			}
			#updraft_cfnewapiuser_form input[type="text"],
			#updraft_cfnewapiuser_form select {
				float: left;
				width: 230px;
			}
		</style>
		<?php
	}
	
	public function account_options(){
		return $this->accounts;
	}
	
	private function get_account_options(){
		
		$selaccount = 'us';
		foreach ($this->accounts as $acc => $desc) {
			?><option <?php if ($selaccount == $acc) echo 'selected="selected"'; ?> value="<?php echo $acc;?>"><?php echo htmlspecialchars($desc); ?></option><?php
		};
	}
	
	public function region_options(){
		return $this->regions;
	}
	
	private function get_region_options(){
		
		$selregion = 'DFW';
		foreach ($this->regions as $reg => $desc) {
			?>
			<option <?php if ($selregion == $reg) echo 'selected="selected"'; ?> value="<?php echo $reg;?>"><?php echo htmlspecialchars($desc); ?></option>
			<?php
		};
	}
	
	public function modal_html(){
		?>
		<div id="updraft-cfnewapiuser-modal" title="<?php _e('Create new API user and container', 'updraftplus');?>" style="display:none;">
			<div id="updraft_cfnewapiuser_form">
				<p style="margin:1px; padding-top:0; clear: left; float: left;">
				<em><?php _e('Enter your Rackspace admin username/API key (so that Rackspace can authenticate your permission to create new users), and enter a new (unique) username and email address for the new user and a container name.', 'updraftplus');?></em>
				</p>
				<div id="updraft-cfnewapiuser-results" style="clear: left; float: left;">
					<p></p>
				</div>

				<p style="margin-top:3px; padding-top:0; clear: left; float: left;">

					<label for="updraft_cfnewapiuser_accountlocation"><?php _e('US or UK Rackspace Account', 'updraftplus');?></label>
					<select title="<?php _e('Accounts created at rackspacecloud.com are US accounts; accounts created at rackspace.co.uk are UK accounts.', 'updraftplus');?>" id="updraft_cfnewapiuser_accountlocation">
						<?php $this->get_account_options();?>
					</select>

					<label for="updraft_cfnewapiuser_adminusername"><?php _e('Admin Username', 'updraftplus');?></label>
					<input type="text" id="updraft_cfnewapiuser_adminusername" value="">
					
					<label for="updraft_cfnewapiuser_adminapikey"><?php _e('Admin API Key', 'updraftplus');?></label>
					<input type="text" id="updraft_cfnewapiuser_adminapikey" value="">
					
					<label for="updraft_cfnewapiuser_newuser"><?php _e("New User's Username", 'updraftplus');?></label>
					<input type="text" id="updraft_cfnewapiuser_newuser" value="">
					
					<label for="updraft_cfnewapiuser_newemail"><?php _e("New User's Email Address", 'updraftplus');?></label>
					<input type="text" id="updraft_cfnewapiuser_newemail" value="">

					<label for="updraft_cfnewapiuser_region"><?php _e('Cloud Files Storage Region', 'updraftplus');?>:</label>
					<select id="updraft_cfnewapiuser_region">
						<?php $this->get_region_options();?>
					</select>
					<label for="updraft_cfnewapiuser_container"><?php _e("Cloud Files Container", 'updraftplus');?></label> <input type="text" id="updraft_cfnewapiuser_container" value="">
					
				</p>
				<fieldset>
					<input type="hidden" name="nonce" value="<?php echo wp_create_nonce('updraftplus-credentialtest-nonce');?>">
					<input type="hidden" name="action" value="updraft_ajax">
					<input type="hidden" name="subaction" value="cloudfiles_newuser">
				</fieldset>
			</div>
		</div>
		<?php
	}
	
	private function modal_script(){
		?>
		<script>
		jQuery(document).ready(function($) {
		
			function set_allowable_regions() {
				var account_location = $('#updraft_cfnewapiuser_accountlocation').val();
				console.log(account_location);
				if ('uk' === account_location) {
					$('#updraft_cfnewapiuser_region option[value="LON"]').prop('disabled', false);
				} else {
					var region_selected = $('#updraft_cfnewapiuser_region').val();
					if ('LON' == region_selected) {
						$('#updraft_cfnewapiuser_region').val('DFW');
					}
					$('#updraft_cfnewapiuser_region option[value="LON"]').prop('disabled', true);
				}
			}
		
			jQuery('#updraft_cloudfiles_newapiuser').click(function(e) {
				e.preventDefault();
				jQuery('#updraft-cfnewapiuser-modal').dialog('open');
				set_allowable_regions();
			});
			
			jQuery('#updraft_cfnewapiuser_accountlocation').change(function() {
				set_allowable_regions();
			});

			var updraft_cfnewapiuser_modal_buttons = {};
			
			updraft_cfnewapiuser_modal_buttons[updraftlion.cancel] = function() { jQuery(this).dialog("close"); };
			updraft_cfnewapiuser_modal_buttons[updraftlion.createbutton] = function() {
				jQuery('#updraft-cfnewapiuser-results').html('<p style="color:green">'+updraftlion.trying+'</p>');
				var data = {
					subsubaction: 'updraft_cloudfiles_newuser',
					adminuser: jQuery('#updraft_cfnewapiuser_adminusername').val(),
					adminapikey: jQuery('#updraft_cfnewapiuser_adminapikey').val(),
					newuser: jQuery('#updraft_cfnewapiuser_newuser').val(),
					newemail: jQuery('#updraft_cfnewapiuser_newemail').val(),
					container: jQuery('#updraft_cfnewapiuser_container').val(),
					location: jQuery('#updraft_cfnewapiuser_accountlocation').val(),
					region: jQuery('#updraft_cfnewapiuser_region').val(),
					useservercerts: jQuery('#updraft_ssl_useservercerts').val(),
					disableverify: jQuery('#updraft_ssl_disableverify').val()
				};

				updraft_send_command('doaction', data, function(response) {
					try {
						resp = jQuery.parseJSON(response);
					} catch(err) {
						console.log(err);
						jQuery('#updraft-cfnewapiuser-results').html('<p style="color:red;">'+updraftlion.servererrorcode+'</p>');
						alert(updraftlion.unexpectedresponse+' '+response);
						return;
					}
					if (resp.e == 1) {
						jQuery('#updraft-cfnewapiuser-results').html('<p style="color:red;">'+resp.m+'</p>');
					} else if (resp.e == 0) {
						jQuery('#updraft-cfnewapiuser-results').html('<p style="color:green;">'+resp.m+'</p>');
						jQuery('#updraft_cloudfiles_user').val(resp.u);
						jQuery('#updraft_cloudfiles_apikey').val(resp.k);
						jQuery('#updraft_cloudfiles_authurl').val(resp.a);
						jQuery('#updraft_cloudfiles_region').val(resp.r);
						jQuery('#updraft_cloudfiles_path').val(resp.c);
						jQuery('#updraft_cloudfiles_newapiuser').after('<br><strong>'+updraftlion.newuserpass+'</strong> '+resp.p);
						jQuery('#updraft-cfnewapiuser-modal').dialog('close');
					}
				}, { json_parse: false });
			};
			jQuery("#updraft-cfnewapiuser-modal").dialog({
				autoOpen: false, height: 465, width: 555, modal: true,
				buttons: updraft_cfnewapiuser_modal_buttons
			});
			
		});
		</script>
		<?php
	}
}
