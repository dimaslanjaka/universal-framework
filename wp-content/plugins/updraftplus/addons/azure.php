<?php
// @codingStandardsIgnoreStart
/*
UpdraftPlus Addon: azure:Microsoft Azure Support
Description: Microsoft Azure Support
Version: 1.4
Shop: /shop/azure/
Include: includes/azure
IncludePHP: methods/addon-base-v2.php
RequiresPHP: 5.3.3
Latest Change: 1.12.35
*/
// @codingStandardsIgnoreEnd

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed');

if (!class_exists('UpdraftPlus_RemoteStorage_Addons_Base_v2')) require_once(UPDRAFTPLUS_DIR.'/methods/addon-base-v2.php');

class UpdraftPlus_Addons_RemoteStorage_azure extends UpdraftPlus_RemoteStorage_Addons_Base_v2 {

	// https://msdn.microsoft.com/en-us/library/azure/ee691964.aspx - maximum block size is 4MB
	private $chunk_size = 2097152;

	public function __construct() {
		// 3rd parameter: chunking? 4th: Test button?
		parent::__construct('azure', 'Azure', true, true);
		// https://msdn.microsoft.com/en-us/library/azure/ee691964.aspx - maximum block size is 4MB
		if (defined('UPDRAFTPLUS_UPLOAD_CHUNKSIZE') && UPDRAFTPLUS_UPLOAD_CHUNKSIZE > 0) $this->chunk_size = max(UPDRAFTPLUS_UPLOAD_CHUNKSIZE, 4194304);
	}
	
	public function do_upload($file, $from) {
		global $updraftplus;

		$opts = $this->options;
		$service = $this->storage;

		if (is_wp_error($service)) throw new Exception($service->get_error_message());
		if (!is_object($service)) throw new Exception("Azure service error");
		
		$filesize = filesize($from);
		$directory = !empty($opts['directory']) ? trailingslashit($opts['directory']) : "";
		
		$account_name = $opts['account_name']; // Used here only for logging
		
		// Create/check container
		$container_name = $opts['container'];
		$container = $this->create_container($container_name);
		if (is_wp_error($container)) {
			$updraftplus->log("Azure error: ".$container->get_error_message());
			$updraftplus->log("Azure error: ".$container->get_error_message(), 'error');
			return false;
		} elseif (false == $container) {
			$updraftplus->log("Azure error when attempting to access container ($container_name)");
			$updraftplus->log("Azure error when attempting to access container ($container_name)", 'error');
		}
		
		// Perhaps it already exists (if we didn't get the final confirmation
		try {
			$items = $this->listfiles($directory.$file);
			foreach ($items as $item) {
				if (basename($item['name']) == $file && $item['size'] >= $filesize) {
					$updraftplus->log("$file: already uploaded");
					return true;
				}
			}
		} catch (Exception $e) {
			$updraftplus->log($this->description." file check: exception: ($file) (".$e->getMessage().") (line: ".$e->getLine().', file: '.$e->getFile().')');
		}
		
		if (false != ($handle = fopen($from, 'rb'))) {
			if ($filesize <= $this->chunk_size) {
				$updraftplus->log("Azure: will upload file in one operation (azure://$account_name/$container_name/$directory$file)");
				$service->createBlockBlob($opts['container'], $directory.$file, $handle);
				fclose($handle);
			} else {
				// Set up chunked upload

				$hash_key = md5($directory.$file);
				$container = $opts['container'];
				$block_ids_key = "az_block_ids_".$hash_key;

				// Stored last uploaded block
				$block_ids = $updraftplus->jobdata_get("az_block_ids_".$hash_key);

				if (!is_array($block_ids)) $block_ids = array();
				$block = 1;
				while (isset($block_ids[$block])) {
					$block++;
				}

				$uploaded_size = $this->chunk_size * ($block - 1);
				$this->block = $block;
				$this->uploaded_size = $uploaded_size;

				if ($uploaded_size) {
					$updraftplus->log("Resuming Azure upload to azure://$account_name/$container_name/$directory$file from byte: $uploaded_size; block/chunk: $block");
				} else {
					$updraftplus->log("Starting fresh Azure upload to azure://$account_name/$container_name/$directory$file from byte: 0; block/chunk: 1");
				}

				$ret = $updraftplus->chunked_upload($this, $file, "azure://$account_name/$container_name/$directory", $this->description, $this->chunk_size, $uploaded_size, false);

				fclose($handle);
				return $ret;
			}
		} else {
			throw new Exception("Failed to open file for reading: $from");
		}
		
		return true;
	}

	/**
	 * Chunked Upload
	 *
	 * @param  string $file         FIle to be chunked
	 * @param  string $fp           FTP URL
	 * @param  string $chunk_index  This is the chunked index
	 * @param  string $upload_size  This is the upload size
	 * @param  string $upload_start This is the upload start position
	 * @param  string $upload_end   This is the Upload end positions
	 * @return boolean
	 */
	public function chunked_upload($file, $fp, $chunk_index, $upload_size, $upload_start, $upload_end) {

		global $updraftplus;

		$opts = $this->options;
		$directory = !empty($opts['directory']) ? trailingslashit($opts['directory']) : "";

		// Already done?
		$hash_key = md5($directory.$file);
		$block_ids = $updraftplus->jobdata_get("az_block_ids_".$hash_key);
		if (!is_array($block_ids)) $block_ids = array();
		// Return 1, not true, to prevent expensive database logging of all the previous chunks on each resumption
		if (isset($block_ids[$chunk_index])) return 1;
		
		// Each block needs id of the same length
		$block_id = str_pad($chunk_index, 6, "0", STR_PAD_LEFT);
		
		try {
			$data = fread($fp, $upload_size);
			$this->storage->createBlobBlock($opts['container'], $directory.$file, base64_encode($block_id), $data);
		} catch (Exception $e) {
			$updraftplus->log($this->description." upload: exception (".get_class($e)."): ($file) (".$e->getMessage().") (line: ".$e->getLine().', file: '.$e->getFile().')');
			return false;
		}
		
		// Store the Block ID of uploaded block
		if (is_array($block_ids)) {
			$block_ids[$chunk_index] = $block_id;
		} else {
			$block_ids = array($chunk_index => $block_id);
		}
		$updraftplus->jobdata_set("az_block_ids_".$hash_key, $block_ids);
		
		return true;
	}

	/**
	 * This method will send the final block of data to be written to file on the Azure remote storage location
	 *
	 * @param  String $file - the file to read from
	 * @return Boolean - a boolean value to indicate success or failure of the chunked upload finish call
	 */
	public function chunked_upload_finish($file) {
		global $updraftplus;
		$updraftplus->log("Azure: all chunks uploaded; now commmitting blob blocks");
		// Commit the blocks to create the blob

		$opts = $this->get_options();

		$directory = !empty($opts['directory']) ? trailingslashit($opts['directory']) : "";
		$hash_key = md5($directory.$file);

		$block_ids = $updraftplus->jobdata_get("az_block_ids_".$hash_key);
		if (!is_array($block_ids)) return false;

		$blocks = array();
		foreach ($block_ids as $chunk => $b_id) {
			$block = new WindowsAzure\Blob\Models\Block();
			$block->setBlockId(base64_encode($b_id));
			$block->setType('Uncommitted');
			array_push($blocks, $block);
		}

		try {
			$this->storage->commitBlobBlocks($opts['container'], $directory.$file, $blocks);
		} catch (Exception $e) {
			$message = $e->getMessage().' ('.get_class($e).') (line: '.$e->getLine().', file: '.$e->getFile().')';
			$updraftplus->log("Azure service error: ".$message);
			$updraftplus->log($message, 'error');
			return false;
		}
		// Prevent bloat
		$updraftplus->jobdata_delete("az_block_ids_".$hash_key, null);
		return true;
	}

	public function do_download($file, $fullpath, $start_offset) {
		global $updraftplus;

		$opts = $this->options;
		$storage = $this->storage;

		if (is_wp_error($storage)) throw new Exception($storage->get_error_message());
		if (!is_object($storage)) throw new Exception("Azure service error");
		
		$container_name = $opts['container'];
		$directory = !empty($opts['directory']) ? trailingslashit($opts['directory']) : "";
		$this->azure_path = $directory.$file;
		
		try {
			$blob_properties = $storage->getBlobProperties($container_name, $this->azure_path)->getProperties();
		} catch (WindowsAzure\Common\ServiceException $e) {
			if (404 == $e->getCode()) {
				$updraftplus->log("$file: ".sprintf(__("%s Error", 'updraftplus'), 'Azure').": ".__('File not found', 'updraftplus'), 'error');
			}
			throw $e;
		}

		return $updraftplus->chunked_download($file, $this, $blob_properties->getContentLength(), true, $container_name, $this->chunk_size);

	}

	public function chunked_download($file, $headers, $container_name) {

		if (is_array($headers) && !empty($headers['Range']) && preg_match('/bytes=(\d+)-(\d+)$/', $headers['Range'], $matches)) {
			$options = new WindowsAzure\Blob\Models\GetBlobOptions;
			$options->setRangeStart($matches[1]);
			$options->setRangeEnd($matches[2]);
		} else {
			$options = null;
		}

		$blob = $this->storage->getBlob($container_name, $this->azure_path, $options);

		$headers = $blob->getProperties();

		// The Azure SDK turns the string into a stream. In the absence of other options, we change it back.
		$stream = $blob->getContentStream();
		return fread($stream, $headers->getContentLength());
	}

	public function do_delete($file) {
		global $updraftplus;
		$opts = $this->options;
		$service = $this->storage;
		
		$directory = !empty($opts['directory']) ? trailingslashit($opts['directory']) : "";
		$azure_path = $directory.$file;
		
		if (is_object($service) && !is_wp_error($service)) {
			// list blobs
			$blobs = $this->listfiles($file);
			
			// check if needed blob is there
			foreach ($blobs as $blob) {
				if (basename($blob['name']) == $file) {
					try {
						// if match, delete file
						$this->storage->deleteBlob($opts['container'], $azure_path);
						return true;
					} catch (WindowsAzure\Common\ServiceException $e) {
						$updraftplus->log("Azure: File delete failed: Service Exception");
						return false;
					}
				}
			}
			
			// if no, log an error
			$updraftplus->log("Azure file does not exist");
			return false;
		}

		if (is_wp_error($service)) {
			$updraftplus->log("Azure: service was not available (".$service->get_error_message().")");
			return false;
		}

		$updraftplus->log("Azure delete error");
		return false;
	}

	/**
	 * This method is used to get a list of backup files for the remote storage option
	 *
	 * @param  string $match - a string to match when looking for files
	 * @return Array - returns an array of file locations or a WordPress error
	 */
	public function do_listfiles($match = 'backup_') {
		global $updraftplus;
		$opts = $this->get_options();
		
		$directory = !empty($opts['directory']) ? trailingslashit($opts['directory']) : "";
		
		try {
			$service = $this->bootstrap();
			if (!is_object($service)) throw new Exception('Azure service error');
		} catch (Exception $e) {
			$service = $e->getMessage().' ('.get_class($e).') (line: '.$e->getLine().', file: '.$e->getFile().')';
			return $service;
		}
		
		try {
			$list_options = new WindowsAzure\Blob\Models\ListBlobsOptions;
			$list_options->setPrefix($directory.$match);
			
			$blob_list = $this->storage->listBlobs($opts['container'], $list_options);
		} catch (WindowsAzure\Common\ServiceException $e) {
			return new WP_Error('list_files_failed', 'List Files ServiceException');
		}
		
		$blobs = $blob_list->getBlobs();

		$results = array();
		foreach ($blobs as $blob) {
			$blob_name = basename($blob->getName());
			$blob_prop = $blob->getProperties();
			$blob_size = $blob_prop->getContentLength();
			$results[] = array('name' => $blob_name, 'size' => $blob_size);
		}
		
		return $results;
	}

	public function do_credentials_test_parameters() {
		return array(
			'account_name' => 'Account Name',
			'key' => 'Account Key',
			'container' => 'Container',
		);
	}
	
	protected function do_credentials_test($testfile, $posted_settings = array()) {

		global $updraftplus;
		$container_name = $posted_settings['container'];

		$directory = !empty($opts['directory']) ? trailingslashit($opts['directory']) : "";
		try {
			$exists = $this->create_container($container_name);

			if (is_wp_error($exists)) {
				foreach ($exists->get_error_messages() as $key => $msg) {
					echo "$msg\n";
				}
				return false;
			}

		} catch (Exception $e) {
			echo __('Could not access container', 'updraftplus').': '.$e->getMessage().' ('.get_class($e).') (line: '.$e->getLine().', file: '.$e->getFile().')';

			return false;
		}
		try {
			$this->storage->createBlockBlob($container_name, $directory.$testfile, "UpdraftPlus temporary test file - you can remove this.");
		} catch (Exception $e) {
			echo 'Azure: '.__('Upload failed', 'updraftplus').': '.$e->getMessage().' ('.get_class($e).') (line: '.$e->getLine().', file: '.$e->getFile().')';
			return false;
		}

		return true;
		
	}
	
	protected function do_credentials_test_deletefile($testfile, $posted_settings) {
		$container_name = $posted_settings['container'];
		$directory = !empty($opts['directory']) ? trailingslashit($opts['directory']) : "";
		
		try {
			$deleted_file = $this->storage->deleteBlob($container_name, $directory.$testfile);
		} catch (Exception $e) {
			echo __('Delete failed:', 'updraftplus').' '.$e->getMessage().' ('.$e->getCode().', '.get_class($e).') (line: '.$e->getLine().', file: '.$e->getFile().')';
		}

	}

	/**
	 * This method overrides the parent method and lists the supported features of this remote storage option.
	 *
	 * @return Array - an array of supported features (any features not mentioned are assumed to not be supported)
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
			'account_name' => '',
			'key' => '',
			'container' => '',
		);
	}
	
	public function do_bootstrap($opts, $connect = true) {

		// The Azure SDK requires PEAR modules - specifically,  HTTP_Request2, Mail_mime, and Mail_mimeDecode; however, an analysis of the used code paths shows that we only need HTTP_Request2
		if (false === strpos(get_include_path(), UPDRAFTPLUS_DIR.'/includes/PEAR')) set_include_path(UPDRAFTPLUS_DIR.'/includes/PEAR'.PATH_SEPARATOR.get_include_path());
		include_once(UPDRAFTPLUS_DIR.'/includes/WindowsAzure/WindowsAzure.php');
		include_once(UPDRAFTPLUS_DIR.'/includes/azure-extensions.php');
		// use WindowsAzure\Common\ServicesBuilder;
		
		// set up connection string
		// DefaultEndpointsProtocol=[http|https];AccountName=[yourAccount];AccountKey=[yourKey]
		if (empty($opts)) $opts = $this->get_options();
		
		$protocol = isset($opts['nossl']) ? ($opts['nossl'] ? 'http' : 'https') : (UpdraftPlus_Options::get_updraft_option('updraft_ssl_nossl') ? 'http' : 'https');

		$account_name = $opts['account_name'];
		$account_key = $opts['key'];

		// Not implemented
// $ssl_disableverify = isset($opts['ssl_disableverify']) ? $opts['ssl_disableverify'] : UpdraftPlus_Options::get_updraft_option('updraft_ssl_disableverify');
		$ssl_useservercerts = isset($opts['ssl_useservercerts']) ? $opts['ssl_useservercerts'] : UpdraftPlus_Options::get_updraft_option('updraft_ssl_useservercerts');
		$ssl_ca_path = $ssl_useservercerts ? '' : UPDRAFTPLUS_DIR.'/includes/cacert.pem';

		$connection_string = "DefaultEndpointsProtocol=$protocol;AccountName=$account_name;AccountKey=$account_key";
		
		// Non-standard element that our extended builder uses
		if ('https' == $protocol) $connection_string .=';SSLCAPath='.$ssl_ca_path;

		if (!isset($this->storage)) {
			try {
				$blob_rest_proxy = WindowsAzure\Common\UpdraftPlus_ServicesBuilder::getInstance()->createBlobService($connection_string);
				$this->storage = $blob_rest_proxy;
				
				return $blob_rest_proxy;
			} catch (Exception $e) {
				return new WP_Error('blob_service_failed', 'Error when attempting to setup Azure access: '.$e->getMessage().' ('.$e->getCode().', '.get_class($e).') (line: '.$e->getLine().', file: '.$e->getFile().')');
			}
		} else {
			return $this->storage;
		}
	}
	
	/**
	 * Returns a list of container names. Currently unused method
	 *
	 * @return array
	 */
	protected function list_containers() {
		try {
			$containers = $this->storage->listContainers();
			$container_list = $containers->getContainers();
			return $container_list;
		} catch (Exception $e) {
			return new WP_Error('container_list_failed', 'Could not list containers: '.$e->getMessage().' ('.$e->getCode().', '.get_class($e).') (line: '.$e->getLine().', file: '.$e->getFile().')');
		}
	}
	
	/**
	 * Check if the container exists (using list_containers above) and if not creates the container. Returns the container properties.
	 *
	 * @param  string  $container_name The container name
	 * @param  boolean $create_on_404  Checks if need to create a 404
	 * @return array
	 */
	protected function create_container($container_name, $create_on_404 = true) {

		global $updraftplus;

		try {
			$container_properties = $this->storage->getContainerProperties($container_name);
			return $container_properties;
		} catch (WindowsAzure\Common\ServiceException $e) {
			if ($create_on_404 && 404 == $e->getCode()) {
				$not_found = true;
			} else {
				throw $e;
			}
		} catch (Exception $e) {
			return new WP_Error('container_create_failed', 'Could not create containers '.$e->getMessage().' ('.$e->getCode().', '.get_class($e).') (line: '.$e->getLine().', file: '.$e->getFile().')');
		}

		try {
			$create_container_options = new WindowsAzure\Blob\Models\CreateContainerOptions();
			$create_container_options->setPublicAccess(WindowsAzure\Blob\Models\PublicAccessType::NONE);
			// This does not return anything - it will throw an exception if there's a problem
			$this->storage->createContainer($container_name, $create_container_options);
			return $this->create_container($container_name, false);
		} catch (WindowsAzure\Common\ServiceException $e) {
			return new WP_Error('container_creation_failed', __('Could not create the container', 'updraftplus'));
		}

		// Should not be possible to reach this point
		return false;
	}

	protected function options_exist($opts) {
		if (is_array($opts) && !empty($opts['account_name']) && !empty($opts['key'])) return true;
		return false;
	}
	
	/**
	 * This outputs the html to the settings page for the Azure settings.
	 *
	 * @param  Array $opts - this is an array of Azure settings.
	 */
	public function do_config_print($opts) {
		// account name***
		// key
		// container
		// directory
		
		global $updraftplus_admin;

		$classes = $this->get_css_classes();
		
		// print("HERE");
		// $this->bootstrap();
		// print_r($this->storage);
		
		/*$folder = (empty($opts['folder'])) ? '' : untrailingslashit($opts['folder']);
		$clientid = (empty($opts['clientid'])) ? '' : $opts['clientid'];
		$secret = (empty($opts['secret'])) ? '' : $opts['secret'];*/
		
		$account_name = (empty($opts['account_name'])) ? '' : $opts['account_name'];
		$key = (empty($opts['key'])) ? '' : $opts['key'];
		$container = (empty($opts['container'])) ? '' : $opts['container'];
		$directory = (empty($opts['directory'])) ? '' : $opts['directory'];

		/*$site_host = parse_url(network_site_url(), PHP_URL_HOST);

		/*if ('127.0.0.1' == $site_host || '::1' == $site_host || 'localhost' == $site_host) {
			// Of course, there are other things that are effectively 127.0.0.1. This is just to help.
			$callback_text = '<p><strong>'.htmlspecialchars(sprintf(__('Microsoft Azure is not compatible with sites hosted on a localhost or 127.0.0.1 URL - their developer console forbids these (current URL is: %s).','updraftplus'), site_url())).'</strong></p>';
		} else {
			$callback_text = '<p>'.htmlspecialchars(__('You must add the following as the authorised redirect URI in your Azure console (under "API Settings") when asked','updraftplus')).': <kbd>'.UpdraftPlus_Options::admin_page_url().'</kbd></p>';
		}*/

		$updraftplus_admin->storagemethod_row_multi(
			$classes,
			'',
			'<img width="434" src="'.UPDRAFTPLUS_URL.'/images/azure.png"><p><a href="https://account.live.com/developers/applications/create">'.__('Create Azure credentials in your Azure developer console.', 'updraftplus').'</a></p><p><a href="https://updraftplus.com/faqs/microsoft-azure-setup-guide/">'.__('For longer help, including screenshots, follow this link.', 'updraftplus').'</a></p>'
		);
		?>
		<tr class="<?php echo $classes; ?>">
			<th><?php echo __('Azure', 'updraftplus').' '.__('Account Name', 'updraftplus'); ?>:</th>
			<td><input data-updraft_settings_test="account_name" type="text" autocomplete="off" style="width:442px" <?php $this->output_settings_field_name_and_id('account_name');?> value="<?php echo esc_attr($account_name); ?>" /><br><em><?php echo htmlspecialchars(__('This is not your Azure login - see the instructions if needing more guidance.', 'updraftplus'));?></em></td>
		</tr>
		<tr class="<?php echo $classes; ?>">
			<th><?php echo __('Azure', 'updraftplus').' '.__('Key', 'updraftplus'); ?>:</th>
			<td><input data-updraft_settings_test="key" type="<?php echo apply_filters('updraftplus_admin_secret_field_type', 'password'); ?>" autocomplete="off" style="width:442px" <?php $this->output_settings_field_name_and_id('key');?> value="<?php echo esc_attr($key); ?>" /></td>
		</tr>

		<?php
		$updraftplus_admin->storagemethod_row_multi(
			$classes,
			'Azure '.__('Container', 'updraftplus').':',
			'<input data-updraft_settings_test="container" title="'.esc_attr(sprintf(__('Enter the path of the %s you wish to use here.', 'updraftplus'), 'container').' '.sprintf(__('If the %s does not already exist, then it will be created.'), 'container')).'" type="text" style="width:442px" '.$this->output_settings_field_name_and_id('container', true) .' value="'.esc_attr(strtolower($container)).'"><br><a href="https://azure.microsoft.com/en-gb/documentation/articles/storage-php-how-to-use-blobs/"><em>'.__("See Microsoft's guidelines on container naming by following this link.", 'updraftplus').'</a></em>'
		);
		
		$updraftplus_admin->storagemethod_row_multi(
			$classes,
			'Azure '.__('Prefix', 'updraftplus').' <em>('.__('optional', 'updraftplus').')</em>:',
			'<input title="'.esc_attr(sprintf(__('You can enter the path of any %s virtual folder you wish to use here.', 'updraftplus'), 'Azure').' '.sprintf(__('If you leave it blank, then the backup will be placed in the root of your %s', 'updraftplus').'.', __('container', 'updraftplus'))).'" data-updraft_settings_test="directory" type="text" style="width:442px"  '.$this->output_settings_field_name_and_id('directory', true) .' value="'.esc_attr($directory).'">'
		);
	}
}

// Do *not* instantiate here; it is a storage module, so is instantiated on-demand
// $updraftplus_addons_azure = new UpdraftPlus_Addons_RemoteStorage_azure;
