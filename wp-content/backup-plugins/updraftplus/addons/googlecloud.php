<?php
// @codingStandardsIgnoreStart
/*
UpdraftPlus Addon: googlecloud:Google Cloud Support
Description: Google Cloud Support
Version: 1.3
Shop: /shop/googlecloud/
Include: includes/googlecloud
IncludePHP: methods/addon-base-v2.php
RequiresPHP: 5.2.4
Latest Change: 1.12.35
*/
// @codingStandardsIgnoreEnd

/*
Potential enhancements:
- Implement the permission to not use SSL (we currently always use SSL).
*/

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed');

if (!class_exists('UpdraftPlus_RemoteStorage_Addons_Base_v2')) require_once(UPDRAFTPLUS_DIR.'/methods/addon-base-v2.php');

class UpdraftPlus_Addons_RemoteStorage_googlecloud extends UpdraftPlus_RemoteStorage_Addons_Base_v2 {

	private $service;

	private $client;

	private $chunk_size = 2097152;

	private $storage_classes;

	private $bucket_locations;

	public function __construct() {
		// 3rd parameter: chunking? 4th: Test button?

		$this->storage_classes = array(
			'STANDARD' => __('Standard', 'updraftplus'),
			'DURABLE_REDUCED_AVAILABILITY' => __('Durable reduced availability', 'updraftplus'),
			'NEARLINE' => __('Nearline', 'updraftplus'),
		);

		$this->bucket_locations = array(
			'US' => __('United States', 'updraftplus').' ('.__('multi-region location', 'updraftplus').')',
			'ASIA' => __('Asia Pacific', 'updraftplus').' ('.__('multi-region location', 'updraftplus').')',
			'EU' => __('European Union', 'updraftplus').' ('.__('multi-region location', 'updraftplus').')',
			'us-central1' => __('Central United States', 'updraftplus').' (1, Iowa)',
			'us-east1' => __(' Eastern United States', 'updraftplus').' (1, South Carolina)',
			'us-east4' => __('Eastern United States', 'updraftplus').' (4, North Virginia)',
			'us-west1' => __('Western United States', 'updraftplus').' (1, Oregon)',
			'asia-east1' => __('Eastern Asia-Pacific', 'updraftplus').' (1, Taiwan)',
			'asia-northeast1' => __('North-east Asia', 'updraftplus').' (1, Tokyo)',
			'asia-southeast1' => __('South-east Asia', 'updraftplus').' (1, Singapore)',
			'australia-southeast1' => __('South-east Australia', 'updraftplus').' (1, Sydney)',
			'europe-west1' => __('Western Europe', 'updraftplus').' (1, Belgium)',
			'europe-west2' => __('Western Europe', 'updraftplus').' (2, London)',
			'europe-west3' => __('Western Europe', 'updraftplus').' (3, Frankfurt)',
		);

		parent::__construct('googlecloud', 'Google Cloud Storage', true, true);

		if (defined('UPDRAFTPLUS_UPLOAD_CHUNKSIZE') && UPDRAFTPLUS_UPLOAD_CHUNKSIZE>0) $this->chunk_size = max(UPDRAFTPLUS_UPLOAD_CHUNKSIZE, 512*1024);
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
			'clientid' => '',
			'secret' => '',
			'project_id' => '',
			'bucket_path' => '',
			'storage_class' => '',
			'bucket_location' => '',
		);
	}

	protected function options_exist($opts) {
		if (is_array($opts) && !empty($opts['clientid']) && !empty($opts['secret']) && !empty($opts['bucket_path'])) return true;
		return false;
	}

	public function do_upload($file, $from) {
		return $this->do_upload_engine($file, $from, true);
	}

	/**
	 * The code in this method is basically copied and slightly adjusted from our Google Drive module
	 *
	 * @param  string  $basename
	 * @param  string  $from
	 * @param  boolean $try_again
	 * @return array
	 */
	private function do_upload_engine($basename, $from, $try_again = true) {
		global $updraftplus;
		
		$opts = $this->options;
		$service = $this->service;

		list ($bucket_name, $path) = $this->split_bucket_path($opts['bucket_path']);
		
		if (empty($bucket_name)) {
			_e("Failure: No bucket details were given.", 'updraftplus');
			return;
		}

		$bucket = $this->create_bucket_if_not_existing($bucket_name);
		if (is_wp_error($bucket)) throw new Exception("Google Cloud Storage: Error accessing or creating bucket: ".$bucket->get_error_message());


		$storage_object = new Google_Service_Storage_StorageObject();
		$storage_object->setName($path.$basename);
		$storage_object->setBucket($bucket_name);

		// In Google Cloud Storage, the storage class is a property of buckets, not objects - i.e. objects simply inherit from the bucket
// $storage_class = (!empty($opts['storage_class']) && isset($this->storage_classes[$opts['storage_class']])) ? $opts['storage_class'] : 'STANDARD';
// $storage_object->setStorageClass($storage_class);
		
		$this->client->setDefer(true);

		$request = $this->service->objects->insert($bucket_name, $storage_object, array(
			'mimeType' => $updraftplus->get_mime_type_from_filename($basename),
			'uploadType' => 'media'
		));

		$hash = md5($basename);
		$transkey = 'gcresume_'.$hash;
		// This is unset upon completion, so if it is set then we are resuming
		$possible_location = $updraftplus->jobdata_get($transkey);

		$size = 0;
		$local_size = filesize($from);

		if (is_array($possible_location)) {

			$headers = array('content-range' => "bytes */".$local_size);

			$http_request = new Google_Http_Request(
				$possible_location[0],
				'PUT',
				$headers,
				''
			);
			$response = $this->client->getIo()->makeRequest($http_request);
			$can_resume = false;
			if (308 == $response->getResponseHttpCode()) {
				$range = $response->getResponseHeader('range');
				if (!empty($range) && preg_match('/bytes=0-(\d+)$/', $range, $matches)) {
					$can_resume = true;
					$possible_location[1] = $matches[1]+1;
					$updraftplus->log("$basename: upload already began; attempting to resume from byte ".$matches[1]);
				}
			}
			if (!$can_resume) {
				$updraftplus->log("$basename: upload already began; attempt to resume did not succeed (HTTP code: ".$response->getResponseHttpCode().")");
			}
		}

		if (!class_exists('UpdraftPlus_Google_Http_MediaFileUpload')) {
			include_once(UPDRAFTPLUS_DIR.'/includes/google-extensions.php');
		}
		
// (('.zip' == substr($basename, -4, 4)) ? 'application/zip' : 'application/octet-stream'),
		$media = new UpdraftPlus_Google_Http_MediaFileUpload(
			$this->client,
			$request,
			$updraftplus->get_mime_type_from_filename($basename),
			null,
			true,
			$this->chunk_size
		);
		$media->setFileSize($local_size);

		if (!empty($possible_location)) {
// $media->resumeUri = $possible_location[0];
// $media->progress = $possible_location[1];
			$media->updraftplus_setResumeUri($possible_location[0]);
			$media->updraftplus_setProgress($possible_location[1]);
			$size = $possible_location[1];
		}
		if ($size >= $local_size) return true;

		$status = false;
		if (false == ($handle = fopen($from, 'rb'))) {
			$updraftplus->log("Google Cloud Storage: failed to open file: $basename");
			$updraftplus->log("$basename: ".sprintf(__('%s Error: Failed to open local file', 'updraftplus'), 'Google Drive'), 'error');
			return false;
		}
		if ($size > 0 && 0 != fseek($handle, $size)) {
			$updraftplus->log("Google Cloud Storage: failed to fseek file: $basename, $size");
			$updraftplus->log("$basename (fseek): ".sprintf(__('%s Error: Failed to open local file', 'updraftplus'), 'Google Drive'), 'error');
			return false;
		}

		$pointer = $size;

		try {
			while (!$status && !feof($handle)) {
				$chunk = fread($handle, $this->chunk_size);
				// Error handling??
				$pointer += strlen($chunk);
				$status = $media->nextChunk($chunk);
				$updraftplus->jobdata_set($transkey, array($media->updraftplus_getResumeUri(), $media->getProgress()));
				$updraftplus->record_uploaded_chunk(round(100*$pointer/$local_size, 1), $media->getProgress(), $from);
			}
			
		} catch (Google_Service_Exception $e) {
			$updraftplus->log("ERROR: Google Cloud Storage upload error (".get_class($e)."): ".$e->getMessage().' (line: '.$e->getLine().', file: '.$e->getFile().')');
			$this->client->setDefer(false);
			fclose($handle);
			$updraftplus->jobdata_delete($transkey);
			if (false == $try_again) throw($e);
			// Reset this counter to prevent the something_useful_happened condition's possibility being sent into the far future and potentially missed
			if ($updraftplus->current_resumption > 9) $updraftplus->jobdata_set('uploaded_lastreset', $updraftplus->current_resumption);
			return $this->do_upload_engine($basename, $from, false);
		}

		// The final value of $status will be the data from the API for the object
		// that has been uploaded.
		$result = false;
		if (false != $status) $result = $status;

		fclose($handle);
		$this->client->setDefer(false);
		$updraftplus->jobdata_delete($transkey);

		return true;
		
	}

	public function do_download($file, $fullpath, $start_offset) {

		global $updraftplus;

		list ($bucket, $path) = $this->split_bucket_path($this->options['bucket_path']);
		
		try {
			$objects = $this->service->objects->listObjects($bucket, array('prefix' => $path.$file));
		} catch (Google_Service_Exception $e) {
			return new WP_Error('google_service_exception', sprintf(__('%s Service Exception.', 'updraftplus'), __('Google Cloud', 'updraftplus')).' '.__('You do not have access to this bucket.', 'updraftplus'));
		}
		
		$results = array();
		
		foreach ($objects['items'] as $item) {

			if (preg_match("#^/*([^/]+)/(.*)$#", $item['name'], $bmatches)) {
				$name = $bmatches[2];
			} else {
				$name = $item['name'];
			}

			if ($name !== $file) continue;
			
			$remote_size = $item['size'];
			// Not selfLink
			$link = $item['mediaLink'];

		}

		if (empty($link)) return false;

		return $updraftplus->chunked_download($file, $this, $remote_size, true, $link, $this->chunk_size);
		
	}
	
	public function chunked_download($file, $headers, $link) {

		$request = $this->client->getAuth()->sign(new Google_Http_Request($link, 'GET', $headers, null));

		$http_request = $this->client->getIo()->makeRequest($request);

		$http_response_code = $http_request->getResponseHttpCode();

		if (200 == $http_response_code || 206 == $http_response_code) {
			return $http_request->getResponseBody();
		} else {
			$updraftplus->log("Google Drive download: failed: unexpected HTTP response code: ".$http_response_code);
			$updraftplus->log(sprintf(__("%s download: failed: file not found", 'updraftplus'), 'Google Drive'), 'error');
			return false;
		}

	}

	public function do_delete($file) {

		list ($bucket, $path) = $this->split_bucket_path($this->options['bucket_path']);

		try {
			$delete = $this->service->objects->delete($bucket, $path.$file);
			return true;
		} catch (Google_Service_Exception $e) {
			return new WP_Error('google_service_exception',  sprintf(__('%s Service Exception.', 'updraftplus'), __('Google Cloud', 'updraftplus')).' '.__('You do not have access to this bucket', 'updraftplus'));
		}
		
	}

	public function do_listfiles($match = 'backup_') {
		global $updraftplus;
		
		$opts = $this->options;

		if (empty($opts['secret']) || empty($opts['clientid']) || empty($opts['project_id']) || empty($opts['bucket_path'])) return new WP_Error('no_settings', sprintf(__('No %s settings were found', 'updraftplus'), __('Google Cloud', 'updraftplus')));
		
		$service = $this->service;
		if (is_wp_error($service) || false == $service) return $service;
		
		list ($bucket, $path) = $this->split_bucket_path($opts['bucket_path']);
		
		try {
			$objects = $service->objects->listObjects($bucket, array('prefix' => $path.$match));
		} catch (Google_Service_Exception $e) {
			return new WP_Error('google_service_exception', sprintf(__('%s Service Exception.', 'updraftplus'), __('Google Cloud', 'updraftplus')).' '.__('You do not have access to this bucket.', 'updraftplus'));
		}
		
		$results = array();
		
		foreach ($objects['items'] as $item) {
			if (preg_match("#^/*([^/]+)/(.*)$#", $item['name'], $bmatches)) {
				$name = $bmatches[2];
			} else {
				$name = $item['name'];
			}
			
			$results[] = array('name' => $name, 'size' => $item['size']);
		}
		
		return $results;
	}
	
	/**
	 * Revoke a Google account refresh token
	 *
	 * @param  boolean $unsetopt - indicates if the options should be unset or not
	 */
	public function gcloud_auth_revoke($unsetopt = true) {
		$opts = $this->get_options();
		$ignore = wp_remote_get('https://accounts.google.com/o/oauth2/revoke?token='.$opts['token']);
		if ($unsetopt) {
			$opts['token'] = '';
			unset($opts['ownername']);
			$this->set_options($opts, true);
		}
	}
	
	/**
	 * Acquire single-use authorization code from Google OAuth 2.0
	 */
	public function gcloud_auth_request() {
		$opts = $this->get_options();
		// First, revoke any existing token, since Google doesn't appear to like issuing new ones
		if (!empty($opts['token'])) $this->gcloud_auth_revoke();
		// We use 'force' here for the approval_prompt, not 'auto', as that deals better with messy situations where the user authenticated, then changed settings

		$params = array(
			'response_type' => 'code',
			'client_id' => $opts['clientid'],
			'redirect_uri' => $this->redirect_uri(),
			'scope' => apply_filters('updraft_googlecloud_scope', 'https://www.googleapis.com/auth/devstorage.full_control https://www.googleapis.com/auth/userinfo.profile'),
			'state' => 'token',
			'access_type' => 'offline',
			'approval_prompt' => 'force'
		);
		if (headers_sent()) {
			global $updraftplus;
			$updraftplus->log(sprintf(__('The %s authentication could not go ahead, because something else on your site is breaking it. Try disabling your other plugins and switching to a default theme. (Specifically, you are looking for the component that sends output (most likely PHP warnings/errors) before the page begins. Turning off any debugging settings may also help).', ''), 'Google Cloud'), 'error');
		} else {
			header('Location: https://accounts.google.com/o/oauth2/auth?'.http_build_query($params, null, '&'));
		}
	}
	
	/**
	 * Get a Google account refresh token using the code received from gdrive_auth_request
	 */
	public function gcloud_auth_token() {
		$opts = $this->get_options();
		if (isset($_GET['code'])) {
			$post_vars = array(
				'code' => $_GET['code'],
				'client_id' => $opts['clientid'],
				'client_secret' => $opts['secret'],
				'redirect_uri' => UpdraftPlus_Options::admin_page_url().'?action=updraftmethod-googlecloud-auth',
				'grant_type' => 'authorization_code'
			);

			$result = wp_remote_post('https://accounts.google.com/o/oauth2/token', array('timeout' => 25, 'method' => 'POST', 'body' => $post_vars));

			if (is_wp_error($result)) {
				$add_to_url = "Bad response when contacting Google: ";
				foreach ($result->get_error_messages() as $message) {
					global $updraftplus;
					$updraftplus->log("Google Cloud authentication error: ".$message);
					$add_to_url .= $message.". ";
				}
				header('Location: '.UpdraftPlus_Options::admin_page_url().'?page=updraftplus&error='.urlencode($add_to_url));
			} else {
				$json_values = json_decode(wp_remote_retrieve_body($result), true);
				if (isset($json_values['refresh_token'])) {

					 // Save token
					$opts['token'] = $json_values['refresh_token'];
					$this->set_options($opts, true);

					if (isset($json_values['access_token'])) {
						$opts['tmp_access_token'] = $json_values['access_token'];
						$this->set_options($opts, true);
						// We do this to clear the GET parameters, otherwise WordPress sticks them in the _wp_referer in the form and brings them back, leading to confusion + errors
						header('Location: '.UpdraftPlus_Options::admin_page_url().'?action=updraftmethod-googlecloud-auth&page=updraftplus&state=success');
					}

				} else {

					$msg = __('No refresh token was received from Google. This often means that you entered your client secret wrongly, or that you have not yet re-authenticated (below) since correcting it. Re-check it, then follow the link to authenticate again. Finally, if that does not work, then use expert mode to wipe all your settings, create a new Google client ID/secret, and start again.', 'updraftplus');

					if (isset($json_values['error'])) $msg .= ' '.sprintf(__('Error: %s', 'updraftplus'), $json_values['error']);

					header('Location: '.UpdraftPlus_Options::admin_page_url().'?page=updraftplus&error='.urlencode($msg));
				}
			}
		} else {
			header('Location: '.UpdraftPlus_Options::admin_page_url().'?page=updraftplus&error='.urlencode(__('Authorization failed', 'updraftplus')));
		}
	}
	
	
	private function redirect_uri() {
		return UpdraftPlus_Options::admin_page_url().'?action=updraftmethod-googlecloud-auth';
	}
	
	/**
	 * Get a Google account access token using the refresh token
	 *
	 * @param  string $refresh_token
	 * @param  string $client_id
	 * @param  string $client_secret
	 */
	private function access_token($refresh_token, $client_id, $client_secret) {

		global $updraftplus;
		$updraftplus->log("Google Cloud: requesting access token: client_id=$client_id");

		$query_body = array(
			'refresh_token' => $refresh_token,
			'client_id' => $client_id,
			'client_secret' => $client_secret,
			'grant_type' => 'refresh_token'
		);

		$result = wp_remote_post('https://accounts.google.com/o/oauth2/token',
			array(
				'timeout' => '15',
				'method' => 'POST',
				'body' => $query_body
			)
		);

		if (is_wp_error($result)) {
			$updraftplus->log("Google Cloud error when requesting access token");
			foreach ($result->get_error_messages() as $msg) $updraftplus->log("Error message: $msg");
			return false;
		} else {
			$json_values = json_decode($result['body'], true);
			if (isset($json_values['access_token'])) {
				$updraftplus->log("Google Cloud: successfully obtained access token");
				return $json_values['access_token'];
			} else {
				$updraftplus->log("Google Cloud error when requesting access token: response does not contain access_token. Response: ".(is_string($result['body']) ? str_replace("\n", '', $result['body']) : json_encode($result['body'])));
				return false;
			}
		}
	}
	
	public function do_bootstrap($opts, $connect) {
		global $updraftplus;

		if (!empty($this->service) && is_object($this->service) && is_a($this->service, 'Google_Service_Storage')) return $this->service;
		
		if (empty($opts)) $opts = $this->get_options();

		if (empty($opts['token']) || empty($opts['clientid']) || empty($opts['secret'])) {
			$updraftplus->log('Google Cloud: this account is not authorised');
			$updraftplus->log('Google Cloud: '.__('Account is not authorized.', 'updraftplus'), 'error', 'googlecloudnotauthed');
			return new WP_Error('not_authorized', __('Account is not authorized.', 'updraftplus'));
		}
		$access_token = $this->access_token($opts['token'], $opts['clientid'], $opts['secret']);
		
		$spl = spl_autoload_functions();
		if (is_array($spl)) {
			// Workaround for Google Cloud CDN plugin's autoloader
			if (in_array('wpbgdc_autoloader', $spl)) spl_autoload_unregister('wpbgdc_autoloader');
			// http://www.wpdownloadmanager.com/download/google-drive-explorer/ - but also others, since this is the default function name used by the Google SDK
			if (in_array('google_api_php_client_autoload', $spl)) spl_autoload_unregister('google_api_php_client_autoload');
		}

		if ((!class_exists('Google_Config') || !class_exists('Google_Client') || !class_exists('Google_Service_Storage') || !class_exists('Google_Http_Request')) && !function_exists('google_api_php_client_autoload_updraftplus')) {
			include_once(UPDRAFTPLUS_DIR.'/includes/Google/autoload.php');
		}

		$config = new Google_Config();
		$config->setClassConfig('Google_IO_Abstract', 'request_timeout_seconds', 60);
		// In our testing, $service->about->get() fails if gzip is not disabled when using the stream wrapper
		if (!function_exists('curl_version') || !function_exists('curl_exec') || (defined('UPDRAFTPLUS_GOOGLECLOUD_DISABLEGZIP') && UPDRAFTPLUS_GOOGLECLOUD_DISABLEGZIP)) {
			$config->setClassConfig('Google_Http_Request', 'disable_gzip', true);
		}

		$client = new Google_Client($config);
		$client->setClientId($opts['clientid']);
		$client->setClientSecret($opts['secret']);
		$client->setApplicationName("UpdraftPlus WordPress Backups");
		$client->setRedirectUri($this->redirect_uri());
		$client->setScopes('https://www.googleapis.com/auth/devstorage.full_control');

		// Do we have an access token?
		if (empty($access_token) || is_wp_error($access_token)) {
			$updraftplus->log('ERROR: Have not yet obtained an access token from Google (has the user authorised?)');
			$updraftplus->log(__('Have not yet obtained an access token from Google - you need to authorise or re-authorise your connection to Google Cloud.', 'updraftplus'), 'error');
			return $access_token;
		}

		$client->setAccessToken(json_encode(array(
			'access_token' => $access_token,
			'refresh_token' => $opts['token']
		)));

		$io = $client->getIo();
		$setopts = array();

		$ssl_disableverify = isset($opts['ssl_disableverify']) ? $opts['ssl_disableverify'] : UpdraftPlus_Options::get_updraft_option('updraft_ssl_disableverify');
		$ssl_useservercerts = isset($opts['ssl_useservercerts']) ? $opts['ssl_useservercerts'] : UpdraftPlus_Options::get_updraft_option('updraft_ssl_useservercerts');

		if (is_a($io, 'Google_IO_Curl')) {

			$setopts[CURLOPT_SSL_VERIFYPEER] = $ssl_disableverify ? false : true;
			if (!$ssl_useservercerts) $setopts[CURLOPT_CAINFO] = UPDRAFTPLUS_DIR.'/includes/cacert.pem';
			// Raise the timeout from the default of 15
			$setopts[CURLOPT_TIMEOUT] = 60;
			$setopts[CURLOPT_CONNECTTIMEOUT] = 15;
			if (defined('UPDRAFTPLUS_IPV4_ONLY') && UPDRAFTPLUS_IPV4_ONLY) $setopts[CURLOPT_IPRESOLVE] = CURL_IPRESOLVE_V4;
		} elseif (is_a($io, 'Google_IO_Stream')) {
			$setopts['timeout'] = 60;
			// We had to modify the SDK to support this
			// https://wiki.php.net/rfc/tls-peer-verification - before PHP 5.6, there is no default CA file
			if (!$ssl_useservercerts || (version_compare(PHP_VERSION, '5.6.0', '<'))) $setopts['cafile'] = UPDRAFTPLUS_DIR.'/includes/cacert.pem';
			if ($ssl_disableverify) $setopts['disable_verify_peer'] = true;
		}

		$io->setOptions($setopts);

		$service = new Google_Service_Storage($client);
		$this->client = $client;
		$this->service = $service;

		return $this->service;

	}

	/**
	 * Is a multipurpose function for getting request
	 * Is called by the authenticate link and calls auth_request or auth_token
	 */
	public function action_auth() {
		if (isset($_GET['state'])) {
			if ('success' == $_GET['state']) add_action('all_admin_notices', array($this, 'show_authed_admin_success'));
			elseif ('token' == $_GET['state']) $this->gcloud_auth_token();
			elseif ('revoke' == $_GET['state']) $this->gcloud_auth_revoke();
		} elseif (isset($_GET['updraftplus_googleauth'])) {
			$this->gcloud_auth_request();
		}
	}

	public function show_authed_admin_success() {

		global $updraftplus_admin;

		$opts = $this->get_options();

		if (empty($opts['tmp_access_token'])) return;
		$tmp_opts = $opts;
		$tmp_opts['token'] = $opts['tmp_access_token'];

		$message = '';
		try {
			$service = $this->bootstrap($tmp_opts);

			if (false != $this->client && !is_wp_error($this->client)) {
				$oauth2 = new Google_Service_Oauth2($this->client);
			}

			if (false != $oauth2 && !empty($oauth2->userinfo)) {
				$userinfo = $oauth2->userinfo->get();
				$username = $userinfo->name;
				$opts['ownername'] = $username;
			}

		} catch (Exception $e) {
			if (is_a($e, 'Google_Service_Exception')) {
				$errs = $e->getErrors();
				$message .= __('However, subsequent access attempts failed:', 'updraftplus');
				if (is_array($errs)) {
					$message .= '<ul style="list-style: disc inside;">';
					foreach ($errs as $err) {
						$message .= '<li>';
						if (!empty($err['reason'])) $message .= '<strong>'.htmlspecialchars($err['reason']).':</strong> ';
						if (!empty($err['message'])) {
							$message .= htmlspecialchars($err['message']);
						} else {
							$message .= htmlspecialchars(serialize($err));
						}
						$message .= '</li>';
					}
					$message .= '</ul>';
				} else {
					$message .= htmlspecialchars(serialize($errs));
				}
			}
		}

		$updraftplus_admin->show_admin_warning(__('Success', 'updraftplus').': '.sprintf(__('you have authenticated your %s account.', 'updraftplus'), __('Google Cloud', 'updraftplus')).' '.((!empty($username)) ? sprintf(__('Name: %s.', 'updraftplus'), $username).' ' : '').$message);

		unset($opts['tmp_access_token']);
		$this->set_options($opts, true);

	}
	
	/**
	 * Google require lower-case only; that's not such a hugely obvious one, so we automatically munge it. We also trim slashes.
	 *
	 * @param  string $bucket_path
	 * @return array
	 */
	private function split_bucket_path($bucket_path){
		if (preg_match("#^/*([^/]+)/(.*)$#", $bucket_path, $bmatches)) {
			$bucket = $bmatches[1];
			$path = trailingslashit($bmatches[2]);
		} else {
			$bucket = trim($bucket_path, " /");
			$path = "";
		}
		
		return array(strtolower($bucket), $path);
	}
	
	public function credentials_test($posted_settings) {
		return $this->credentials_test_engine($posted_settings);
	}
	
	/**
	 * This method will take the passed in credentials and try and connect and write data to the remote storage option
	 *
	 * @param  Array $posted_settings - an array of settings
	 * @return Null - returns if there is an error
	 */
	public function credentials_test_engine($posted_settings) {

		$this->options = $this->get_options();
		$opts = $this->options;

		if (empty($opts['token']) || empty($posted_settings['clientid']) || empty($posted_settings['secret']) || $posted_settings['clientid'] != $opts['clientid'] || $posted_settings['secret'] != $opts['secret']) {
			_e("You must save and authenticate before you can test your settings.", 'updraftplus');
			return;
		}

		$ssl_useservercerts = (bool) $posted_settings['useservercerts'];
		$ssl_disableverify = (bool) $posted_settings['disableverify'];

		// Not currently used: we always do SSL.
		// Without SSL is possible: https://cloud.google.com/storage/docs/reference-uris?hl=en
// $nossl = $posted_settings['nossl'];
		
		$opts['ssl_useservercerts'] = $ssl_useservercerts;
		$opts['ssl_disableverify'] = $ssl_disableverify;

		$service = $this->bootstrap($opts);

		if (is_wp_error($service)) {
			echo __("Failed", 'updraftplus').". ";
			foreach ($service->get_error_messages() as $key => $msg) {
				echo "$msg\n";
			}
			return;
		}

		$storage_class = (!empty($posted_settings['storage_class']) && isset($this->storage_classes[$posted_settings['storage_class']])) ? $posted_settings['storage_class'] : 'STANDARD';

		$bucket_location = (!empty($posted_settings['bucket_location']) && isset($this->bucket_locations[$posted_settings['bucket_location']])) ? $posted_settings['bucket_location'] : 'US';

		$opts['bucket_location'] = $bucket_location;
		$opts['storage_class'] = $storage_class;

		list ($bucket_name, $path) = $this->split_bucket_path($posted_settings['bucket_path']);
		
		if (empty($bucket_name)) {
			_e("Failure: No bucket details were given.", 'updraftplus');
			return;
		}

		// Project ID only needed if creating a bucket
		if (isset($posted_settings['project_id'])) {
			$project_id = (string) $posted_settings['project_id'];
			$opts['project_id'] = $project_id;
		}

		// Save them so that create_bucket_if_not_existing uses them instead of the saved ones
		$this->options = $opts;
		$this->service = $service;

		$bucket = $this->create_bucket_if_not_existing($bucket_name, $storage_class, $bucket_location);
	
		if (is_wp_error($bucket)) {
			echo __("Failed", 'updraftplus').". ";
			foreach ($bucket->get_error_messages() as $key => $msg) {
				echo "$msg\n";
			}
			return;
		} elseif (!is_a($bucket, 'Google_Service_Storage_Bucket')) {
			echo __("Failed", 'updraftplus').". (".serialize($bucket).")";
			return;
		}

		$random_file_name = md5(rand()).'.tmp';

		$storage_object = new Google_Service_Storage_StorageObject();
		$storage_object->setName($random_file_name);
		$storage_object->setBucket($bucket_name);
		
		try {
			$result = $service->objects->insert($bucket_name, $storage_object, array(
				'data' => 'UpdraftPlus connection test temporary file - you can delete this',
				'mimeType' => 'text/plain',
				'uploadType' => 'media'
			));
		} catch (Exception $e) {
			echo __('Failure', 'updraftplus').": ".__('We successfully accessed the bucket, but the attempt to create a file in it failed.', 'updraftplus')."\n";
			echo $e->getMessage();
			return;
		}

		if (is_a($result, 'Google_Service_Storage_StorageObject')) {
			echo __('Success', 'updraftplus').": ".__('We accessed the bucket, and were able to create files within it.', 'updraftplus')."\n";
			try {
				$delete_result = $service->objects->delete($bucket_name, $random_file_name);
			} catch (Exception $e) {
				echo ' '.__('Delete failed:', 'updraftplus').' '.$e->getMessage();
			}
			return;
		} else {
			echo __('Failure', 'updraftplus').": ".__('We successfully accessed the bucket, but the attempt to create a file in it failed.', 'updraftplus').' ('.get_class($result).')';
		}

	}

	/**
	 * Requires project ID to actually create
	 * Returns a Google_Service_Storage_Bucket if successful
	 * Defaults to STANDARD / US, if the options are not passed and if nothing is in the saved settings
	 *
	 * @param  string  $bucket_name
	 * @param  boolean $storage_class
	 * @param  boolean $location
	 * @return array
	 */
	private function create_bucket_if_not_existing($bucket_name, $storage_class = false, $location = false) {

		$opts = empty($this->options) ? $this->get_options() : $this->options;

		if (!is_array($opts) || empty($opts['token'])) return new WP_Error('googlecloud_not_authorised', __('Account is not authorized.', 'updraftplus'));

		$service = empty($this->service) ? $this->bootstrap() : $this->service;

		if (is_wp_error($service)) return $service;

		try {
			$bucket_object = $service->buckets->get($bucket_name);
			if (is_a($bucket_object, 'Google_Service_Storage_Bucket') && isset($bucket_object->name)) return $bucket_object;
			return new WP_Error('googlecloud_unexpected_exception', 'Google Cloud Access Error (unknown response): '.serialize($bucket_object));
		} catch (Google_Service_Exception $e) {
			$errors = $e->getErrors();
			$codes = '';
			if (is_array($errors)) {
				foreach ($errors as $err) {
					// One other possibility is 'forbidden'
					if (is_array($err) && isset($err['reason'])) {
						if ('notFound' == $err['reason']) {
							$not_found = true;
						} else {
							$codes .= ($codes) ? ', '.$err['reason'] : $err['reason'];
						}
					}
				}
			}
			if (empty($not_found)) {
				return new WP_Error('google_service_exception_'.$codes, sprintf(__('%s Service Exception.', 'updraftplus'), __('Google Cloud', 'updraftplus')).' '.__('You do not have access to this bucket.', 'updraftplus').' ('.$codes.')');
			}
		} catch (Exception $e) {
			return new WP_Error('google_misc_exception', 'Google Cloud Access Error ('.get_class($e).'): '.$e->getMessage(), 'updraftplus');
		}
		
		// If we get here, then the result is 'not found'. Try to create.

		if (empty($opts['project_id'])) return new WP_Error('googlecloud_no_project_id', __('You must enter a project ID in order to be able to create a new bucket.', 'updraftplus'));

		$bucket = new Google_Service_Storage_Bucket();
		$bucket->setName($bucket_name);

		if (false === $location) {
			$location = (isset($opts['bucket_location']) && isset($this->bucket_locations[$opts['bucket_location']])) ? $opts['bucket_location'] : 'US';
		}

		if (false === $storage_class) {
			$storage_class = (isset($opts['storage_class']) && isset($this->storage_classes[$opts['storage_class']])) ? $opts['storage_class'] : 'STANDARD';
		}

		global $updraftplus;
		$updraftplus->log("Attempting to create bucket $bucket_name with $location/$storage_class");

		$bucket->setLocation($location);
		$bucket->setStorageClass($storage_class);

		try {
			$bucket_object = $service->buckets->insert($opts['project_id'], $bucket);
			if (is_a($bucket_object, 'Google_Service_Storage_Bucket') && isset($bucket_object->name)) return $bucket_object;
			return new WP_Error('googlecloud_unexpected_exception', 'Google Cloud Access Error (unknown response/2): '.serialize($bucket_object));
		} catch (Google_Service_Exception $e) {
			$errors = $e->getErrors();
			$codes = '';
			if (is_array($errors)) {
				foreach ($errors as $err) {
					// One other possibility is 'forbidden'
					if (is_array($err) && isset($err['reason'])) {
						if ('notFound' == $err['reason']) {
							$not_found = true;
						} else {
							$codes .= ($codes) ? ', '.$err['reason'] : $err['reason'];
						}
					}
				}
			}
			if (empty($not_found)) {
				return new WP_Error('google_service_exception_'.$codes, sprintf(__('%s Service Exception.', 'updraftplus'), __('Google Cloud', 'updraftplus')).' '.__('You do not have access to this bucket.', 'updraftplus').' ('.$codes.')');
			}
		} catch (Exception $e) {
			return new WP_Error('google_misc_exception', 'Google Cloud Access Error ('.get_class($e).'): '.$e->getMessage(), 'updraftplus');
		}

		// There's nothing that can reach here; but a default doesn't hurt

		return new WP_Error('googlecloud_unexpected_exception', 'Google Cloud Access Error (unknown response/3)');

	}
	
	/**
	 * This function returns a boolean value to indicate if a test button should be printed or not.
	 *
	 * @return Boolean - boolean value to indicate if a test button should be printed or not.
	 */
	public function should_print_test_button() {
		$opts = $this->get_options();
		if (!is_array($opts) || empty($opts['token'])) return false;
		return true;
	}

	/**
	 * This outputs the html to the settings page for the Google Cloud settings.
	 *
	 * @param  Array $opts - this is an array of Google Cloud settings
	 */
	public function do_config_print($opts) {
		global $updraftplus_admin;
		
		$bucket_path = empty($opts['bucket_path']) ? '' : untrailingslashit($opts['bucket_path']);
		$accesskey = empty($opts['accesskey']) ? '' : $opts['accesskey'];
		$secret = empty($opts['secret']) ? '' : $opts['secret'];
		$client_id = empty($opts['clientid']) ? '' : $opts['clientid'];
		$project_id = empty($opts['project_id']) ? '' : $opts['project_id'];
		$storage_class = empty($opts['storage_class']) ? 'STANDARD' : $opts['storage_class'];
		$bucket_location = empty($opts['bucket_location']) ? 'US' : $opts['bucket_location'];

		$classes = $this->get_css_classes();

		?>
		<tr class="<?php echo $classes; ?>">
			<td></td>
			<td>
				<img alt="<?php _e(sprintf(__('%s logo', 'updraftplus'), 'Google Cloud')); ?>" src="<?php echo esc_attr(UPDRAFTPLUS_URL.'/images/googlecloud.png'); ?>"><br>
				<p><?php printf(__('Do not confuse %s with %s - they are separate things.', 'updraftplus'), '<a href="https://cloud.google.com/storage">Google Cloud</a>', '<a href="https://drive.google.com">Google Drive</a>'); ?></p>

			<?php
				$admin_page_url = UpdraftPlus_Options::admin_page_url();
				// This is advisory - so the fact it doesn't match IPv6 addresses isn't important
				if (preg_match('#^(https?://(\d+)\.(\d+)\.(\d+)\.(\d+))/#', $admin_page_url, $matches)) {
				echo '<p><strong>'.htmlspecialchars(sprintf(__("%s does not allow authorisation of sites hosted on direct IP addresses. You will need to change your site's address (%s) before you can use %s for storage.", 'updraftplus'), __('Google Cloud', 'updraftplus'), $matches[1], __('Google Cloud', 'updraftplus'))).'</strong></p>';
				} else {
				?>

				<p><a href="https://updraftplus.com/support/configuring-google-cloud-api-access-updraftplus/"><strong><?php _e('For longer help, including screenshots, follow this link. The description below is sufficient for more expert users.', 'updraftplus');?></strong></a></p>

				<p><a href="https://console.developers.google.com"><?php _e('Follow this link to your Google API Console, and there activate the Storage API and create a Client ID in the API Access section.', 'updraftplus');?></a> <?php _e("Select 'Web Application' as the application type.", 'updraftplus');?></p><p><?php echo htmlspecialchars(__('You must add the following as the authorised redirect URI (under "More Options") when asked', 'updraftplus'));?>: <kbd><?php echo UpdraftPlus_Options::admin_page_url().'?action=updraftmethod-googlecloud-auth'; ?></kbd>

				</p>
				<?php
				}
			?>

			</td>
			</tr>
		
		<tr class="<?php echo $classes; ?>">
			<th><?php echo __('Google Cloud', 'updraftplus').' '.__('Client ID', 'updraftplus'); ?>:</th>
			<td>
				<input type="text" data-updraft_settings_test="clientid" autocomplete="off" style="width:442px" <?php $this->output_settings_field_name_and_id('clientid');?> value="<?php echo esc_attr($client_id); ?>" />
				<br><em><?php _e('If Google later shows you the message "invalid_client", then you did not enter a valid client ID here.', 'updraftplus');?></em>
			</td>
		</tr>
		
		<tr class="<?php echo $classes; ?>">
			<th><?php echo __('Google Cloud', 'updraftplus').' '.__('Client Secret', 'updraftplus'); ?>:</th>
			<td><input data-updraft_settings_test="secret" type="<?php echo apply_filters('updraftplus_admin_secret_field_type', 'password'); ?>" style="width:442px" <?php $this->output_settings_field_name_and_id('secret');?> value="<?php echo esc_attr($secret); ?>" /></td>
		</tr>

		<?php
		$updraftplus_admin->storagemethod_row_multi(
			$classes,
			'Google Cloud '.__('Project ID', 'updraftplus').':',
			'<input data-updraft_settings_test="project_id" title="'.esc_attr(sprintf(__('Enter the ID of the %s project you wish to use here.', 'updraftplus'), 'Google Cloud')).'" type="text" style="width:442px" '. $this->output_settings_field_name_and_id('project_id', true) .' value="'.esc_attr($project_id).'"><br><em>'.__('N.B. This is only needed if you have not already created the bucket, and you wish UpdraftPlus to create it for you.', 'updraftplus').' '.__('Otherwise, you can leave it blank.', 'updraftplus').' <a href="https://updraftplus.com/faqs/where-do-i-find-my-google-project-id/">'.__('Go here for more information.', 'updraftplus').'</a></em>'
		);
		$updraftplus_admin->storagemethod_row_multi(
			$classes,
			'Google Cloud '.__('Bucket', 'updraftplus').':',
			'<input data-updraft_settings_test="bucket_path" title="'.esc_attr(sprintf(__('Enter the name of the %s bucket you wish to use here.', 'updraftplus'), 'Google Cloud').' '.__('Bucket names have to be globally unique. If the bucket does not already exist, then it will be created.').' '.sprintf(__('e.g. %s', 'updraftplus'), 'mybackups/workwebsite.')).'" type="text" style="width:442px"  '. $this->output_settings_field_name_and_id('bucket_path', true) .' value="'.esc_attr($bucket_path).'"><br><a href="https://cloud.google.com/storage/docs/bucket-naming?hl=en"><em>'.__("See Google's guidelines on bucket naming by following this link.", 'updraftplus').'</a> '.sprintf(__('You must use a bucket name that is unique, for all %s users.', 'updraftplus'), __('Google Cloud', 'updraftplus')).'</em>'
		);

		?>
		<tr class="<?php echo $classes; ?>">
			<th><?php _e('Storage class', 'updraftplus');?>:<br><a href="https://cloud.google.com/storage/docs/storage-classes"><em><?php _e('(Read more)', 'updraftplus');?></em></a></th>
			<td>
				<select data-updraft_settings_test="storage_class" <?php $this->output_settings_field_name_and_id('storage_class');?>>
					<?php
					foreach ($this->storage_classes as $id => $description) {
						echo '<option value="'.$id.'" '.(($id == $storage_class) ? ' selected="selected"' : '').'>'.htmlspecialchars($description).'</option>';
					}
					?>
				</select>
				<br>
				<em><?php echo __('This setting applies only when a new bucket is being created.', 'updraftplus').' '.__('Note that Google do not support every storage class in every location - you should read their documentation to learn about current availability.', 'updraftplus');?></em>
			</td>
		</tr>
		
		<tr class="<?php echo $classes; ?>">
			<th><?php _e('Bucket location', 'updraftplus');?>:<br><a href="https://cloud.google.com/storage/docs/bucket-locations"><em><?php _e('(Read more)', 'updraftplus');?></em></a></th>
			<td>
				<select data-updraft_settings_test="bucket_location" <?php $this->output_settings_field_name_and_id('bucket_location');?>>
					<?php
					foreach ($this->bucket_locations as $id => $description) {
						echo '<option value="'.$id.'" '.(($id == $bucket_location) ? ' selected="selected"' : '').'>'.htmlspecialchars($description).'</option>';
					}
					?>
				</select>
				<br>
				<em><?php echo __('This setting applies only when a new bucket is being created.', 'updraftplus');?></em>

			</td>
		</tr>
		
		<tr class="<?php echo $classes; ?>">
			<th><?php _e('Authenticate with Google');?>:</th>
			<td>
				<p><?php if (!empty($opts['token'])) echo __("<strong>(You appear to be already authenticated,</strong> though you can authenticate again to refresh your access if you've had a problem).", 'updraftplus'); ?>

				<?php
				if (!empty($opts['token']) && !empty($opts['ownername'])) {
					echo '<br>'.sprintf(__("Account holder's name: %s.", 'updraftplus'), htmlspecialchars($opts['ownername'])).' ';
				}
				?>
				</p>
				<p>
					<a class="updraft_authlink" href="<?php echo UpdraftPlus_Options::admin_page_url();?>?action=updraftmethod-googlecloud-auth&page=updraftplus&updraftplus_googleauth=doit"><?php _e("<strong>After</strong> you have saved your settings (by clicking 'Save Changes' below), then come back here once and click this link to complete authentication with Google.", 'updraftplus');?></a>
				</p>
			</td>
		</tr>
		
		<?php

	}
}

// Do *not* instantiate here; it is a storage module, so is instantiated on-demand
// $updraftplus_addons_googlecloud = new UpdraftPlus_Addons_RemoteStorage_googlecloud;
