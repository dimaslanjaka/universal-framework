<?php

if (!defined('ABSPATH')) die('No direct access allowed');

if (class_exists('UpdraftCentral_PHP_Logger')) return;

/**
 * Class UpdraftCentral_PHP_Logger
 */
class UpdraftCentral_PHP_Logger extends UpdraftCentral_Abstract_Logger {

	/**
	 * UpdraftCentral_PHP_Logger constructor
	 */
	public function __construct() {
	}

	/**
	 * Returns logger description
	 *
	 * @return string|void
	 */
	public function get_description() {
		return __('Log events into the PHP error log', 'updraftcentral');
	}

	/**
	 * Emergency message
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null|void
	 */
	public function emergency($message, array $context = array()) {
		$this->log($message, UpdraftCentral_Log_Levels::EMERGENCY, $context);
	}

	/**
	 * Alert message
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null|void
	 */
	public function alert($message, array $context = array()) {
		$this->log($message, UpdraftCentral_Log_Levels::ALERT, $context);
	}

	/**
	 * Critical message
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null|void
	 */
	public function critical($message, array $context = array()) {
		$this->log($message, UpdraftCentral_Log_Levels::CRITICAL, $context);
	}

	/**
	 * Error message
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null|void
	 */
	public function error($message, array $context = array()) {
		$this->log($message, UpdraftCentral_Log_Levels::ERROR, $context);
	}

	/**
	 * Warning message
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null|void
	 */
	public function warning($message, array $context = array()) {
		$this->log($message, UpdraftCentral_Log_Levels::WARNING, $context);
	}

	/**
	 * Notice message
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null|void
	 */
	public function notice($message, array $context = array()) {
		$this->log($message, UpdraftCentral_Log_Levels::NOTICE, $context);
	}

	/**
	 * Info message
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null|void
	 */
	public function info($message, array $context = array()) {
		if (defined('WP_DEBUG') && WP_DEBUG) $this->log($message, UpdraftCentral_Log_Levels::INFO, $context);
	}

	/**
	 * Debug message
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null|void
	 */
	public function debug($message, array $context = array()) {
		if (defined('WP_DEBUG') && WP_DEBUG) $this->log($message, UpdraftCentral_Log_Levels::DEBUG, $context);
	}

	/**
	 * Log message with any level
	 *
	 * @param  string $message
	 * @param  mixed  $level
	 * @param  array  $context
	 * @return null|void
	 */
	public function log($message, $level, array $context = array()) {

		if (!$this->is_enabled()) return false;

		$message = '['.UpdraftCentral_Log_Levels::to_text($level).'] : '.$this->interpolate($message, $context);

		// If WP_DEBUG is on, log everything; otherwise, ignore debug and info since they do not indicate any problems.
		if (defined('WP_DEBUG') && WP_DEBUG) {
			error_log($message);
		} else {
			if (!in_array($level, array('debug', 'info'))) {
				error_log($message);
			}
		}
	}
}
