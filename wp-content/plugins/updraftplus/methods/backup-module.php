<?php

if (!defined('UPDRAFTPLUS_DIR')) die('No direct access allowed.');

abstract class UpdraftPlus_BackupModule {

	private $_options;

	private $_instance_id;
	
	/**
	 * Store options (within this class) for this remote storage module. There is also a parameter for saving to the permanent storage (i.e. database).
	 *
	 * @param  array       $options     array of options to store
	 * @param  boolean     $save        whether or not to also save the options to the database
	 * @param  null|String $instance_id optionally set the instance ID for this instance at the same time. This is required if you have not already set an instance ID with set_instance_id()
	 * @return void|Boolean If saving to DB, then the result of the DB save operation is returned.
	 */
	public function set_options($options, $save = false, $instance_id = null) {
	
		$this->_options = $options;
		
		if (null !== $instance_id) $this->set_instance_id($instance_id);
		
		if ($save) return $this->save_options();

	}
	
	/**
	 * Saves the current options to the database. This is a private function; external callers should use set_options().
	 *
	 * @throws Exception if trying to save options without indicating an instance_id, or if the remote storage module does not have the multi-option capability
	 */
	private function save_options() {
	
		if (!$this->supports_feature('multi_options')) {
			throw new Exception('set_options() can only be called on a storage method which supports multi_options (this module, '.$this->get_id().', does not)');
		}
	
		if (!$this->_instance_id) {
			throw new Exception('set_options() requires an instance ID, but was called without setting one (either directly or via set_instance_id())');
		}
		
		global $updraftplus;
		
		$current_db_options = $updraftplus->update_remote_storage_options_format($this->get_id());

		if (is_wp_error($current_db_options)) {
			throw new Exception('set_options(): options fetch/update failed ('.$current_db_options->get_error_code().': '.$current_db_options->get_error_message().')');
		}

		$current_db_options['settings'][$this->_instance_id] = $this->_options;

		return UpdraftPlus_Options::update_updraft_option('updraft_'.$this->get_id(), $current_db_options);
	
	}
	
	/**
	 * Retrieve default options for this remote storage module.
	 * This method would normally be over-ridden by the child.
	 *
	 * @return Array - an array of options
	 */
	public function get_default_options() {
		return array();
	}

	/**
	 * Retrieve a list of supported features for this storage method
	 * This method should be over-ridden by methods supporting new
	 * features.
	 *
	 * Keys are strings, and values are booleans.
	 *
	 * Currently known features:
	 *
	 * - multi_options : indicates that the remote storage module
	 * can handle its options being in the Feb-2017 multi-options
	 * format. N.B. This only indicates options handling, not any
	 * other multi-destination options.
	 *
	 * - multi_servers : not implemented yet: indicates that the
	 * remote storage module can handle multiple servers at backup
	 * time. This should not be specified without multi_options.
	 * multi_options without multi_servers is fine - it will just
	 * cause only the first entry in the options array to be used.
	 *
	 * - config_templates : not implemented yet: indicates that
	 * the remote storage module can output its configuration in
	 * Handlebars format via the get_configuration_template() method.
	 *
	 * @return Array - an array of supported features (any features not
	 * mentioned are assumed to not be supported)
	 */
	public function get_supported_features() {
		return array();
	}

	/**
	 * This method should only be called if the feature 'config templates' is supported. In that case, it returns a template with appropriate placeholders for specific settings. The code below is a placeholder, and methods supporting the feature should always over-ride it.
	 *
	 * @return String - HTML template
	 */
	public function get_configuration_template() {
		return $this->get_id().": called, but not implemented in the child class (coding error)";
	}
	
	/**
	 * Outputs id and name fields, as if currently within an input tag
	 *
	 * This assumes standardised options handling (i.e. that the options array is updraft_(method-id))
	 *
	 * @param Array|String $field                  - the field identifiers
	 * @param Boolean      $return_instead_of_echo - tells the method if it should return the output or echo it to page
	 */
	public function output_settings_field_name_and_id($field, $return_instead_of_echo = false) {
	
		$method_id = $this->get_id();
		$instance_id = $this->_instance_id;
		$id = '';
		$name = '';

		if (is_array($field)) {
			foreach ($field as $key => $value) {
				$id .= '_'.$value;
				$name .= '['.$value.']';
			}
		} else {
			$id = '_'.$field;
			$name = '['.$field.']';
		}
		
		$output = "id=\"updraft_${method_id}${id}_${instance_id}\" name=\"updraft_${method_id}[settings][${instance_id}]${name}\" ";

		if ($return_instead_of_echo) {
			return $output;
		} else {
			echo $output;
		}
	}
	
	/**
	 * Prints out the configuration section.
	 * This deals with any boiler-plate, prior to calling config_print()
	 *
	 * @uses self::config_print()
	 * @uses self::get_configuration_template()
	 * @uses self::get_options()
	 */
	public function print_configuration() {
		// Allow methods to not use this hidden field, if they do not output any settings (to prevent their saved settings being over-written by just this hidden field)
		if ($this->print_shared_settings_fields()) {
			?><input type="hidden" name="updraft_<?php echo $this->get_id();?>[version]" value="1"><?php
		}
		
		if ($this->supports_feature('config_templates')) {

			$template = $this->get_configuration_template();
			
			$opts = $this->get_options();
			
			// Because of the need to support PHP 5.2+, we have to use the PHP 5.2 branch + API

			if (!class_exists('Handlebars_Engine')) {
				include_once UPDRAFTPLUS_DIR.'/vendor/xamin/handlebars.php/src/Handlebars/Autoloader.php';
				Handlebars_Autoloader::register();
			}
			
			if ($this->supports_feature('multi_options')) {
				$opts['instance_id'] = $this->_instance_id;
			}
			
			try {
				$engine = new Handlebars_Engine;
				echo $engine->render($template, $opts);
				//@codingStandardsIgnoreLine
			} catch (Error $e) {
				echo "Error whilst rendering handlebars template (".$this->get_id().", ".get_class($e)."): ".$e->getMessage().' (Code: '.$e->getCode().', line '.$e->getLine().' in '.$e->getFile().')';
			} catch (Exception $e) {
				echo "Exception whilst rendering handlebars template (".$this->get_id().", ".get_class($e)."): ".$e->getMessage().' (Code: '.$e->getCode().', line '.$e->getLine().' in '.$e->getFile().')';
			}
			
		} else {

			// N.B. These are mutually exclusive: config_print() is not used if config_templates is supported. So, even during transition, the UpdraftPlus_BackupModule instance only needs to support one of the two, not both.
			$this->config_print();
		}
	}

	/**
	 * Over-ride this to allow methods to not use the hidden version field, if they do not output any settings (to prevent their saved settings being over-written by just this hidden field
	 *
	 * @return [boolean] - return true to output the version field or false to not output the field
	 */
	public function print_shared_settings_fields() {
		return true;
	}

	/**
	 * Prints out the configuration section for a particular module. This is now (Sep 2017) considered deprecated; things are being ported over to get_configuration_template(), indicated via the feature 'config_templates'.
	 */
	public function config_print() {
		echo $this->get_id().": module neither declares config_templates support, nor has a config_print() method (coding bug)";
	}

	/**
	 * Supplies the list of keys for options to be saved in the backup job.
	 */
	public function get_credentials() {
		$keys = array('updraft_ssl_disableverify', 'updraft_ssl_nossl', 'updraft_ssl_useservercerts');
		if (!$this->supports_feature('multi_servers')) $keys[] = 'updraft_'.$this->get_id();
		return $keys;
	}
	
	/**
	 * Returns a space-separated list of CSS classes suitable for rows in the configuration section
	 *
	 * @returns String - the list of CSS classes
	 */
	public function get_css_classes() {
		$classes = 'updraftplusmethod '.$this->get_id();
		if ('' != $this->_instance_id) {
			if ($this->supports_feature('config_templates')) {
				$classes .= ' '.$this->get_id().'-{{instance_id}}';
			} else {
				$classes .= ' '.$this->get_id().'-'.$this->_instance_id;
			}
		}
		return $classes;
	}
	
	/**
	 *
	 * Returns HTML for a row for a test button
	 *
	 * @param String $title - The text to be used in the button
	 *
	 * @returns String - The HTML to be inserted into the settings page
	 */
	protected function get_test_button_html($title) {
		ob_start();
		?>
		<tr class="<?php echo $this->get_css_classes(); ?>">
			<th></th>
			<td><p><button id="updraft-<?php echo $this->get_id();?>-test-<?php echo $this->_instance_id;?>" type="button" class="button-primary updraft-test-button updraft-<?php echo $this->get_id();?>-test" data-instance_id="<?php echo $this->_instance_id;?>" data-method="<?php echo $this->get_id();?>" data-method_label="<?php echo esc_attr($title);?>"><?php printf(__('Test %s Settings', 'updraftplus'), $title);?></button></p></td>
		</tr>
		<?php
		return ob_get_clean();
	}
	
	/**
	 * Get the backup method identifier for this class
	 *
	 * @return String - the identifier
	 */
	private function get_id() {
		$class = get_class($this);
		// UpdraftPlus_BackupModule_
		return substr($class, 25);
	}
	
	/**
	 * Sets the instance ID - for supporting multi_options
	 *
	 * @param String $instance_id - the instance ID
	 */
	public function set_instance_id($instance_id) {
		$this->_instance_id = $instance_id;
	}
	
	/**
	 * Sets the instance ID - for supporting multi_options
	 *
	 * @returns String the instance ID
	 */
	public function get_instance_id() {
		return $this->_instance_id;
	}
	
	/**
	 * Check whether this storage module supports a mentioned feature
	 *
	 * @param String $feature - the feature concerned
	 *
	 * @returns Boolean
	 */
	public function supports_feature($feature) {
		return in_array($feature, $this->get_supported_features());
	}
	
	/**
	 * Retrieve options for this remote storage module.
	 * N.B. The option name instance_id is reserved and should not be used.
	 *
	 * @uses get_default_options
	 *
	 * @return Array - array of options. This will include default values for any options not set.
	 */
	public function get_options() {
	
		global $updraftplus;
	
		$supports_multi_options = $this->supports_feature('multi_options');

		if (is_array($this->_options)) {
		
			// First, prioritise any options that were explicitly set. This is the eventual goal for all storage modules.
			$options = $this->_options;
			
		} elseif (is_callable(array($this, 'get_opts'))) {
		
			// Next, get any options available via a legacy / over-ride method.
		
			if ($supports_multi_options) {
				// This is forbidden, because get_opts() is legacy and is for methods that do not support multi-options. Supporting multi-options leads to the array format being updated, which will then break get_opts().
				die('Fatal error: method '.$this->get_id().' both supports multi_options and provides a get_opts method');
			}
			
			$options = $this->get_opts();
			
		} else {
		
			// Next, look for job options (which in turn, falls back to saved settings if no job options were set)
	
			$options = $updraftplus->get_job_option('updraft_'.$this->get_id());
			if (!is_array($options)) $options = array();

			if ($supports_multi_options) {

				if (!isset($options['version'])) {
					$options_full = $updraftplus->update_remote_storage_options_format($this->get_id());
					
					if (is_wp_error($options_full)) {
						$updraftplus->log("Options retrieval failure: ".$options_full->get_error_code().": ".$options_full->get_error_message()." (".json_encode($options_full->get_error_data()).")");
						return array();
					}
					
				} else {
					$options_full = $options;
				}
				
				// UpdraftPlus_BackupModule::get_options() is for getting the current instance's options. So, this branch (going via the job option) is a legacy route, and hence we just give back the first one. The non-legacy route is to call the set_options() method externally.
				$options = reset($options_full['settings']);

				if (false === $options) {
					$updraftplus->log("Options retrieval failure (no options set)");
					return array();
				}
				$instance_id = key($options_full['settings']);
				$this->set_options($options, false, $instance_id);
				
			}
			
		}

		$options = apply_filters(
			'updraftplus_backupmodule_get_options',
			wp_parse_args($options, $this->get_default_options()),
			$this
		);
		
		return $options;
		
	}
	
	/**
	 * Set job data that is local to this storage instance
	 * (i.e. the key does not need to be unique across instances)
	 *
	 * @uses UpdraftPlus::jobdata_set()
	 *
	 * @param String $key	- the key for the job data
	 * @param Mixed  $value - the data to be stored
	 */
	public function jobdata_set($key, $value) {
	
		$instance_key = $this->get_id().'-'.($this->_instance_id ? $this->_instance_id : 'no_instance');
		
		global $updraftplus;
		
		$instance_data = $updraftplus->jobdata_get($instance_key);
		
		if (!is_array($instance_data)) $instance_data = array();
		
		$instance_data[$key] = $value;
		
		$updraftplus->jobdata_set($instance_key, $instance_data);
		
	}

	/**
	 * Get job data that is local to this storage instance
	 * (i.e. the key does not need to be unique across instances)
	 *
	 * @uses UpdraftPlus::jobdata_get()
	 *
	 * @param String	  $key		  - the key for the job data
	 * @param Mixed		  $default	  - the default to return if nothing was set
	 * @param String|Null $legacy_key - the previous name of the key, prior to instance-specific job data (so that upgrades across versions whilst a backup is in progress can still find its data). In future, support for this can be removed.
	 */
	public function jobdata_get($key, $default = null, $legacy_key = null) {
	
		$instance_key = $this->get_id().'-'.($this->_instance_id ? $this->_instance_id : 'no_instance');
		
		global $updraftplus;
		
		$instance_data = $updraftplus->jobdata_get($instance_key);
		
		if (is_array($instance_data) && isset($instance_data[$key])) return $instance_data[$key];
		
		return is_string($legacy_key) ? $updraftplus->jobdata_get($legacy_key, $default) : $default;
		
	}
	
	/**
	 * Delete job data that is local to this storage instance
	 * (i.e. the key does not need to be unique across instances)
	 *
	 * @uses UpdraftPlus::jobdata_set()
	 *
	 * @param String	  $key		  - the key for the job data
	 * @param String|Null $legacy_key - the previous name of the key, prior to instance-specific job data (so that upgrades across versions whilst a backup is in progress can still find its data)
	 */
	public function jobdata_delete($key, $legacy_key = null) {
	
		$instance_key = $this->get_id().'-'.($this->_instance_id ? $this->_instance_id : 'no_instance');
		
		global $updraftplus;
		
		$instance_data = $updraftplus->jobdata_get($instance_key);
		
		if (is_array($instance_data) && isset($instance_data[$key])) {
			unset($instance_data[$key]);
			$updraftplus->jobdata_set($instance_key, $instance_data);
		}
		
		if (is_string($legacy_key)) $updraftplus->jobdata_delete($legacy_key);
		
	}
}
