<?php
// @codingStandardsIgnoreStart
/*
UpdraftPlus Addon: s3-enhanced:Amazon S3, enhanced
Description: Adds enhanced capabilities for Amazon S3 users
Version: 1.6
Shop: /shop/s3-enhanced/
RequiresPHP: 5.3.3
Latest Change: 1.12.6
*/
// @codingStandardsIgnoreEnd

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed');

use Aws\Iam\IamClient;

$updraftplus_addon_s3_enhanced = new UpdraftPlus_Addon_S3_Enhanced;

class UpdraftPlus_Addon_S3_Enhanced {

	public function __construct() {
		add_action('updraft_s3_extra_storage_options', array($this, 'extra_storage_options'));
		add_filter('updraft_s3_storageclass', array($this, 'storageclass'), 10, 3);
		add_action('updraftplus_settings_page_init', array($this, 'updraftplus_settings_page_init'));
		add_action('updraft_s3_newuser', array($this, 'newuser'));
		add_filter('updraft_s3_apikeysetting', array($this, 'apikeysettings'));
		add_action('updraft_s3_print_new_api_user_form', array($this, 's3_print_new_api_user_form'));
		add_filter('updraft_s3_newuser_go', array($this, 'newuser_go'), 10, 2);
	}

	public function storageclass($class, $s3, $opts) {
	
		if (((is_a($s3, 'UpdraftPlus_S3') || is_a($s3, 'UpdraftPlus_S3_Compat')) && is_array($opts) && !empty($opts['rrs']))) {
			if ('STANDARD_IA' == $opts['rrs'] || 'STANDARD' == $opts['rrs']) {
				$class = $opts['rrs'];
			}
		}

		return $class;
	}

	/**
	 * This method outputs html to the page for the extra storage options.
	 *
	 * @param  Object $backup_module_object - This is an instance of the remote storage object.
	 */
	public function extra_storage_options($backup_module_object) {

		$opts = $backup_module_object->get_options();

		$classes = $backup_module_object->get_css_classes();
		?>
		<tr class="<?php echo $classes;?>">
			<th><?php _e('Storage class', 'updraftplus');?>:<br><a href="https://aws.amazon.com/s3/storage-classes/"><em><?php _e('(Read more)', 'updraftplus');?></em></a></th>
			<td>
				<?php
					$rrs = empty($opts['rrs']) ? 'STANDARD' : $opts['rrs'];
					if (!empty($rrs) && 'STANDARD_IA' != $rrs) $rrs = 'STANDARD';
				?>
				<select <?php $backup_module_object->output_settings_field_name_and_id('rrs');?> data-updraft_settings_test="rrs">
					<option value="STANDARD" <?php if ('STANDARD' == $rrs) echo ' selected="selected"';?>><?php _e('Standard', 'updraftplus');?></option>
					<option value="STANDARD_IA" <?php if ('STANDARD_IA' == $rrs) echo ' selected="selected"';?>><?php _e('Standard (infrequent access)', 'updraftplus');?></option>
				</select>
			</td>
		</tr>
		<tr class="<?php echo $classes;?>">
			<th><?php _e('Server-side encryption', 'updraftplus');?>:<br><a href="https://aws.amazon.com/blogs/aws/new-amazon-s3-server-side-encryption/"><em><?php _e('(Read more)', 'updraftplus');?></em></a></th>
			<td><input data-updraft_settings_test="server_side_encryption" title="<?php esc_attr_e(__("Check this box to use Amazon's server-side encryption", 'updraftplus')); ?>" type="checkbox" <?php $backup_module_object->output_settings_field_name_and_id('server_side_encryption');?> value="1" <?php if (!empty($opts['server_side_encryption'])) echo 'checked="checked"';?>/></td>
		</tr>
		<?php
	}
	
	public function updraftplus_settings_page_init() {
		add_action('admin_footer', array($this, 'admin_footer'));
	}

	public function apikeysettings($msg) {
		$msg = '<a href="#" id="updraft_s3_newapiuser">'.__('If you have an AWS admin user, then you can use this wizard to quickly create a new AWS (IAM) user with access to only this bucket (rather than your whole account)', 'updraftplus').'</a>';
		return $msg;
	}

	public function newuser() {
		echo json_encode($this->newuser_go(array(), $_POST));
		die;
	}
	
	public function newuser_go($initial_value = array(), $settings_values) {

		if (empty($settings_values['adminaccesskey'])) {
			return array('e' => 1, 'm' => __('You need to enter an admin access key', 'updraftplus'));
		}
		if (empty($settings_values['adminsecret'])) {
			return array('e' => 1, 'm' => __('You need to enter an admin secret key', 'updraftplus'));
		}
		if (empty($settings_values['newuser'])) {
			return array('e' => 1, 'm' => __('You need to enter a new IAM username', 'updraftplus'));
		}
		if (empty($settings_values['bucket'])) {
			return array('e' => 1, 'm' => __('You need to enter a bucket', 'updraftplus'));
		}
		if (empty($settings_values['region'])) $settings_values['region'] = 'us-east-1';
		if (empty($settings_values['rrs'])) $settings_values['rrs'] = false;

		$allow_download = (!empty($settings_values['allowdownload'])) ? true : false;
		$allow_delete = (!empty($settings_values['allowdelete'])) ? true : false;

		global $updraftplus;

		include_once(UPDRAFTPLUS_DIR.'/methods/s3.php');
		
		$method = new UpdraftPlus_BackupModule_s3;

		$useservercerts = !empty($settings_values['useservercerts']);
		$disableverify = !empty($settings_values['disableverify']);
		$nossl = !empty($settings_values['nossl']);
		
		$adminaccesskey = stripslashes($settings_values['adminaccesskey']);
		$adminsecret = stripslashes($settings_values['adminsecret']);
		$region = $settings_values['region'];
		
		try {
			$service = $method->getS3($adminaccesskey, $adminsecret, $useservercerts, $disableverify, $nossl);
			if (!is_a($service, 'UpdraftPlus_S3_Compat')) {
				$msg = __('Cannot create new AWS user, since the old AWS toolkit is being used.', 'updraftplus');
				$updraftplus->log('Cannot create new AWS user, since the old AWS toolkit is being used.');
				$updraftplus->log($msg, 'error');
				return array('e' => 1, 'm' => __('Error:', 'updraftplus').' '.$msg);
			}
		} catch (AuthenticationError $e) {
			$updraftplus->log('AWS authentication failed ('.$e->getMessage().')');
			$updraftplus->log(__('AWS authentication failed', 'updraftplus').' ('.$e->getMessage().')', 'error');
			return array('e' => 1, 'm' => __('Error:', 'updraftplus').' '.$e->getMessage());
		} catch (Exception $e) {
			return array('e' => 1, 'm' => __('Error:', 'updraftplus').' '.$e->getMessage());
		}
		
		// Create the bucket if necessary
		// Get the bucket
		$path = stripslashes($settings_values['bucket']);
		
		if (preg_match("#^/*([^/]+)/(.*)$#", $path, $bmatches)) {
			$bucket = $bmatches[1];
			$path = trailingslashit($bmatches[2]);
		} else {
			$bucket = $path;
			$path = "";
		}
		
		$location = @$service->getBucketLocation($bucket);
		if ($location) {
			$bucket_exists = true;
			$bucket_verb = __('Region', 'updraftplus').": $location: ";
		}
		
		if (!isset($bucket_exists)) {
			$service->useDNSBucketName(true);
			$gb = @$service->getBucket($bucket, null, null, 1);
			if (false !== $gb) {
				$bucket_exists = true;
				$location = '';
				$bucket_verb = '';
			}
		}
		
		if (!isset($bucket_exists)) {
			$service->setExceptions(true);
			try {
				$try_to_create_bucket = @$service->putBucket($bucket, 'private', $region);
			} catch (Exception $e) {
				$try_to_create_bucket = false;
				$s3_error = $e->getMessage();
			}
			$service->setExceptions(false);
			if ($try_to_create_bucket) {
				$bucket_verb = '';
				$gb = $try_to_create_bucket;
			} else {
				$msg = __("Failure: We could not successfully access or create such a bucket. Please check your access credentials, and if those are correct then try another bucket name (as another AWS user may already have taken your name).", 'updraftplus');
				if (isset($s3_error)) $msg .= "\n\n".sprintf(__('The error reported by %s was:', 'updraftplus'), 'S3').' '.$s3_error;
				return array('e' => 1, 'm' => $msg);
			}
		}
		
		// Create the new IAM user
		include_once(UPDRAFTPLUS_DIR.'/vendor/autoload.php');
		
		$credentials = array(
			'key' => $adminaccesskey,
			'secret' => $adminsecret,
		);
		$iam = IamClient::factory($credentials);
		
		// Try create a new Iam user
		try {
			$response = $iam->createUser(array(
				'Path'=>'/updraftplus/',
				'UserName'=>$settings_values['newuser']
			));
		} catch (Guzzle\Http\Exception\ClientErrorResponseException $e) {
			$response = $e->getResponse();
			$code = $response->getStatusCode();
			$reason = $response->getReasonPhrase();
			if (403 == $code) {
				return array('e' => 1, 'm' => __('Authorisation failed (check your credentials)', 'updraftplus'));
			} elseif (409 == $code && 'Conflict' == $reason) {
				return array('e' => 1, 'm' => __('Conflict: that user already exists', 'updraftplus'));
			} else {
				return array('e' => 1, 'm' => sprintf(__('IAM operation failed (%s)', 'updraftplus'), 5)." (".$e->getMessage().') ('.get_class($e).')');
			}
		} catch (Exception $e) {
			return array('e' => 1, 'm' => sprintf(__('IAM operation failed (%s)', 'updraftplus'), 4).' ('.$e->getMessage().') ('.get_class($e).')');
		}
		
		if (empty($response['User']['UserId']) || empty($response['User']['CreateDate']) || empty($response['User']['UserName'])) {
			return array('e' => 1, 'm' => sprintf(__('IAM operation failed (%s)', 'updraftplus'), 3));
		}
		
		$user = $response['User']['UserName'];
		$id = $response['User']['UserId'];
		$arn = $response['User']['Arn'];
		
		// Add the User to the bucket
		
		// Get the user API key
		try {
			$response = $iam->createAccessKey(array('UserName' => $user));
		} catch (Guzzle\Http\Exception\ClientErrorResponseException $e) {
			return array('e' => 1, 'm' => __('Failed to create user Access Key', 'updraftplus')." (".$e->getMessage().') ('.get_class($e).')');
		} catch (Exception $e) {
			return array('e' => 1, 'm' => __('Operation to create user Access Key failed', 'updraftplus'));
		}
		
		if (empty($response['AccessKey']['UserName']) || empty($response['AccessKey']['AccessKeyId']) || empty($response['AccessKey']['SecretAccessKey'])) {
			return array('e' => 1, 'm' => __('Operation to create user Access Key failed', 'updraftplus').' (2)');
		}
		
		$key = $response['AccessKey']['AccessKeyId'];
		$secret = $response['AccessKey']['SecretAccessKey'];
		
		// policy document
		$pol_doc = '{
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetBucketLocation",
        "s3:ListBucketMultipartUploads"
      ],
      "Resource": "arn:aws:s3:::'.$bucket.'",
      "Condition": {}
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:AbortMultipartUpload",';
		if ($allow_delete) $pol_doc .= '
        "s3:DeleteObject",
        "s3:DeleteObjectVersion",';
		if ($allow_download) $pol_doc .= '
        "s3:GetObject",
        "s3:GetObjectAcl",
        "s3:GetObjectVersion",
        "s3:GetObjectVersionAcl",';
		$pol_doc .= '
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:PutObjectAclVersion"
      ],
      "Resource": "arn:aws:s3:::'.$bucket.'/*",
      "Condition": {}
    },
    {
      "Effect": "Allow",
      "Action": "s3:ListAllMyBuckets",
      "Resource": "*",
      "Condition": {}
    }
  ]
}';
		
		try {
			$response = $iam->putUserPolicy(array(
				'UserName' => $user,
				'PolicyName' => $user.'updraftpolicy',
				'PolicyDocument' => $pol_doc
			));
		} catch (Guzzle\Http\Exception\ClientErrorResponseException $e) {
			return array('e' => 1, 'm' => __('Failed to apply User Policy', 'updraftplus')." (".$e->getMessage().') ('.get_class($e).')');
		} catch (Exception $e) {
			return array('e' => 1, 'm' => __('Failed to apply User Policy'.$e->getMessage()));
		}
		
		return array(
			'e' => 0,
			'u' => htmlspecialchars($user),
			'k' => htmlspecialchars($key),
			's' => htmlspecialchars($secret),
			'l' => $region,
			'c' => $bucket,
			'm' => htmlspecialchars(sprintf(__("Username: %s", 'updraftplus'), $user))."<br>".htmlspecialchars(sprintf(__("Access Key: %s", 'updraftplus'), $key))."<br>".htmlspecialchars(sprintf(__("Secret Key: %s", 'updraftplus'), $secret))
		);
	
	}

	/**
	 * This is called both directly, and made available as an action
	 *
	 * @param  boolean $include_form_apparatus
	 */
	public function s3_print_new_api_user_form($include_form_apparatus = true) {
		?>
		<div id="updraft_s3newapiuser_form">
			<p class="updraft-s3newapiuser-first-para">
				<em><?php echo __('Enter your administrative Amazon S3 access/secret keys (this needs to be a key pair with enough rights to create new users and buckets), and a new (unique) username for the new user and a bucket name.', 'updraftplus').' '.__('These will be used to create a new user and key pair with an IAM policy attached which will only allow it to access the indicated bucket.', 'updraftplus').' '.__('Then, these lower-powered access credentials can be used, instead of storing your administrative keys.', 'updraftplus');?></em>
			</p>
			
			<div id="updraft-s3newapiuser-results"><p></p></div>

			<p class="updraft-s3newapiuser-settings-para">

			<label for="updraft_s3newapiuser_adminaccesskey"><?php _e('Admin access key', 'updraftplus');?></label> <input type="text" id="updraft_s3newapiuser_adminaccesskey" value="">
			<label for="updraft_s3newapiuser_adminsecret"><?php _e('Admin secret key', 'updraftplus');?></label> <input type="text" id="updraft_s3newapiuser_adminsecret" value="">
			<label for="updraft_s3newapiuser_newuser"><?php _e("New IAM username", 'updraftplus');?></label> <input type="text" id="updraft_s3newapiuser_newuser" value="">

			<label for="updraft_s3newapiuser_region"><?php _e('S3 storage region', 'updraftplus');?>:</label>
			<select id="updraft_s3newapiuser_region">
				<?php
					$regions = array(
						'us-east-1' => __('US Standard (default)', 'updraftplus'),
						'us-east-2' => __('US East (Ohio)', 'updraftplus'),
						'us-west-2' => __('US West (Oregon)', 'updraftplus'),
						'us-west-1' => __('US West (N. California)', 'updraftplus'),
						'us-gov-west-1' => __('US Government West (restricted)', 'updraftplus'),
						'canada-central-1' => __('Canada Central', 'updraftplus'),
						'eu-west-1' => __('Europe (Ireland)', 'updraftplus'),
						'eu-west-2' => __('Europe (London)', 'updraftplus'),
						'eu-central-1' => __('Europe (Frankfurt)', 'updraftplus'),
						'ap-northeast-2' => __('Asia Pacific (Seoul)', 'updraftplus'),
						'ap-southeast-1' => __('Asia Pacific (Singapore)', 'updraftplus'),
						'ap-southeast-2' => __('Asia Pacific (Sydney)', 'updraftplus'),
						'ap-south-1' => __('Asia Pacific (Mumbai)', 'updraftplus'),
						'ap-northeast-1' => __('Asia Pacific (Tokyo)', 'updraftplus'),
						'sa-east-1' => __('South America (Sao Paulo)', 'updraftplus'),
						'cn-north-1' => __('China (Beijing) (restricted)', 'updraftplus'),
					);
					$selregion = 'us-east-1';
					foreach ($regions as $reg => $desc) {
					?>
					<option <?php if ($selregion == $reg) echo 'selected="selected"'; ?> value="<?php echo $reg;?>"><?php echo htmlspecialchars($desc); ?></option>
					<?php
					}
				?>
			</select>
			<label for="updraft_s3newapiuser_bucket"><?php _e("S3 bucket", 'updraftplus');?></label><span class="updraft_s3newapiuser_textexplain">s3://</span><input type="text" id="updraft_s3newapiuser_bucket" value="">
			
			<label for="updraft_s3newapiuser_allowdownload"><?php _e("Allow download", 'updraftplus');?></label>
			<input type="checkbox" id="updraft_s3newapiuser_allowdownload" value="1" checked="checked">
			<span class="updraft_s3newapiuser_checkboxexplain"><em><?php _e('Without this permission, you cannot directly download or restore using UpdraftPlus, and will instead need to visit the AWS website.', 'updraftplus');?></em></span>

			<label for="updraft_s3newapiuser_allowdelete"><?php _e("Allow deletion", 'updraftplus');?></label>
			<input type="checkbox" id="updraft_s3newapiuser_allowdelete" value="1" checked="checked">
			<span class="updraft_s3newapiuser_checkboxexplain"><em><?php _e("Without this permission, UpdraftPlus cannot delete backups - you should also set your 'retain' settings very high to prevent seeing deletion errors.", 'updraftplus');?></em></span>

			</p>
			<?php if ($include_form_apparatus) { ?>
			<fieldset>
				<input type="hidden" name="nonce" value="<?php echo wp_create_nonce('updraftplus-credentialtest-nonce');?>">
				<input type="hidden" name="action" value="updraft_ajax">
				<input type="hidden" name="subaction" value="s3_newuser">
			</fieldset>
			<?php } ?>
		</div>
		<?php
	}
	
	public function admin_footer() {
		?>
		<style type="text/css">
			#updraft_s3newapiuser_form label { float: left; clear:left; width: 170px;}
			#updraft_s3newapiuser_form input[type="text"], #updraft_s3newapiuser_form select { float: left; width: 310px; }
			#updraft_s3newapiuser_form input[type="checkbox"] { float: left; }
			#updraft_s3newapiuser_form p { padding-top:0; clear: left; float: left; }
			#updraft_s3newapiuser_form .updraft-s3newapiuser-first-para { margin:1px; }
			#updraft_s3newapiuser_form .updraft-s3newapiuser-settings-para { margin-top:3px; padding-top:0; clear: left; float: left; }
			#updraft_s3newapiuser_form #updraft-s3newapiuser-results { clear: left; float: left; }
			#updraft_s3newapiuser_form #updraft-s3newapiuser-results p { margin: 1px 0; padding: 1px 0; }
			#updraft_s3newapiuser_form .updraft_s3newapiuser_checkboxexplain { width:310px; float:left; }
			#updraft_s3newapiuser_form .updraft_s3newapiuser_textexplain { float:left; width:30px; position:relative; top:3px; }
			#updraft_s3newapiuser_form #updraft_s3newapiuser_bucket { width: 280px; }
		</style>
		<div id="updraft-s3newapiuser-modal" style="display:none;" title="<?php _e('Create new IAM user and S3 bucket', 'updraftplus');?>">
			<?php $this->s3_print_new_api_user_form(); ?>
		</div>

		<script>
		jQuery(document).ready(function($) {
			$('#updraft_s3_newapiuser').click(function(e) {
				e.preventDefault();
				$('#updraft-s3newapiuser-modal').dialog('open');
			});

			var updraft_s3newapiuser_modal_buttons = {};
			
			updraft_s3newapiuser_modal_buttons[updraftlion.cancel] = function() { $(this).dialog("close"); };
			updraft_s3newapiuser_modal_buttons[updraftlion.createbutton] = function() {
				$('#updraft-s3newapiuser-results').html('<p style="color:green">'+updraftlion.trying+'</p>');

				var data = {
					subsubaction: 'updraft_s3_newuser',
					adminaccesskey: $('#updraft_s3newapiuser_adminaccesskey').val(),
					adminsecret: $('#updraft_s3newapiuser_adminsecret').val(),
					newuser: $('#updraft_s3newapiuser_newuser').val(),
					bucket: $('#updraft_s3newapiuser_bucket').val(),
					region: $('#updraft_s3newapiuser_region').val(),
					useservercerts: $('#updraft_ssl_useservercerts').val(),
					disableverify: $('#updraft_ssl_disableverify').val(),
					nossl: $('#updraft_ssl_nossl').val(),
					allowdelete: $('#updraft_s3newapiuser_allowdelete').is(':checked') ? 1 : 0,
					allowdownload: $('#updraft_s3newapiuser_allowdownload').is(':checked') ? 1 : 0,
				};

				updraft_send_command('doaction', data, function(response) {
					
					try {
						resp = $.parseJSON(response);
					} catch(err) {
						console.log(response);
						console.log(err);
						$('#updraft-s3newapiuser-results').html('<p style="color:red;">'+updraftlion.servererrorcode+'</p>');
						alert(updraftlion.unexpectedresponse+' '+response);
						return;
					}
					if (resp.e == 1) {
						$('#updraft-s3newapiuser-results').html('<p style="color:red;">'+resp.m+'</p>');
					} else if (resp.e == 0) {
						$('#updraft-s3newapiuser-results').html('<p style="color:green;">'+resp.m+'</p>');
						$('#updraft_s3_apikey').val(resp.k);
						$('#updraft_s3_apisecret').val(resp.s);
						$('#updraft_s3_rrs').attr('checked', resp.r);
						$('#updraft_s3_path').val(resp.c);
						
						//Clear Admin credentials
						$('#updraft_s3newapiuser_adminaccesskey').val("");
						$('#updraft_s3newapiuser_adminsecret').val("");
						$('#updraft_s3newapiuser_newuser').val("");
						$('#updraft_s3newapiuser_bucket').val("");
						
						//Change link to open dialog to reflect that using IAM user
						$('#updraft_s3_newapiuser').html('<?php echo esc_js(__('You are now using a IAM user account to access your bucket.', 'updraftplus')).' <strong>'.esc_js(__('Do remember to save your settings.', 'updraftplus')).'</strong>';?>');
						
						$('#updraft-s3newapiuser-modal').dialog('close');
					}

				}, { json_parse: false });
			};
			$("#updraft-s3newapiuser-modal").dialog({
				autoOpen: false, height: 525, width: 555, modal: true,
				buttons: updraft_s3newapiuser_modal_buttons
			});

		});
		</script>
		<?php
	}
}
