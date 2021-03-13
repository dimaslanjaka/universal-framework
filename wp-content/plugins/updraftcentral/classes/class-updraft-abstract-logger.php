<?php

if (!defined('ABSPATH')) die('No direct access allowed');

if (class_exists('Updraft_Abstract_Logger')) return;

/**
 * Class Updraft_Abstract_Logger
 */
abstract class Updraft_Abstract_Logger implements Updraft_Logger_Interface {

	protected $enabled = true;

	protected $options = array();

	/**
	 * Updraft_Abstract_Logger constructor
	 */
	public function __construct() {
	}

	/**
	 * Returns true if logger is active
	 *
	 * @return boolean
	 */
	public function is_enabled() {
		return $this->enabled;
	}

	/**
	 * Enable logger
	 */
	public function enable() {
		$this->enabled = true;
	}

	/**
	 * Disable logger
	 */
	public function disable() {
		$this->enabled = false;
	}

	/**
	 * Return option $name value
	 *
	 * @param  string $name    Name of the option.
	 * @param  string $default Add default value.
	 * @return array  An array of options.
	 */
	public function get_option($name, $default = '') {
		if (!array_key_exists($name, $this->options)) return $default;
		return $this->options[$name];
	}

	/**
	 * Set option $name value.
	 *
	 * @param string $name  The name of the option.
	 * @param string $value The value of the option.
	 */
	public function set_option($name, $value = '') {
		if (is_array($name)) {
			$this->options = array_merge($this->options, $name);
		} else {
			$this->options[$name] = $value;
		}
	}

	/**
	 * Returns logger description
	 *
	 * @return mixed
	 */
	// @codingStandardsIgnoreLine
	abstract function get_description();

	/**
	 * For the Logger: https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return string
	 */
	protected function interpolate($message, array $context = array()) {
		$replace = array();
		foreach ($context as $key => $val) {
			// Check that the value can be casted to string.
			if (!is_array($val) && (!is_object($val) || method_exists($val, '__toString'))) {
				$replace['{' . $key . '}'] = $val;
			}
		}
		return strtr($message, $replace);
	}
}
