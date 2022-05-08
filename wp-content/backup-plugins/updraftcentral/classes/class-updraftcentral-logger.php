<?php

if (!defined('ABSPATH')) die('No direct access allowed');

require_once('class-updraftcentral-logger-interface.php');
require_once('class-updraftcentral-log-levels.php');
require_once('class-updraftcentral-abstract-logger.php');
require_once('class-updraftcentral-logger.php');

if (class_exists('UpdraftCentral_Logger')) return;

/**
 * Class UpdraftCentral_Logger
 */
class UpdraftCentral_Logger implements UpdraftCentral_Logger_Interface {
	
	protected $_loggers = array();

	/**
	 * Constructor method
	 *
	 * @param UpdraftCentral_Logger_Interface $logger
	 */
	public function __construct(UpdraftCentral_Logger_Interface $logger = null) {
		if (!empty($logger)) $this->_loggers = array($logger);
	}

	/**
	 * Add logger to loggers list
	 *
	 * @param UpdraftCentral_Logger_Interface $logger
	 */
	public function add_logger(UpdraftCentral_Logger_Interface $logger) {
		$this->_loggers[] = $logger;
	}

	/**
	 * Return list of loggers
	 *
	 * @return array
	 */
	public function get_loggers() {
		return $this->_loggers;
	}

	/**
	 * System is unusable.
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null
	 */
	public function emergency($message, array $context = array()) {

		if (empty($this->_loggers)) return false;

		foreach ($this->_loggers as $logger) {
			$logger->emergency($message, $context);
		}

	}

	/**
	 * Action must be taken immediately.
	 *
	 * Example: Entire website down, database unavailable, etc. This should
	 * trigger the SMS alerts and wake you up.
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null
	 */
	public function alert($message, array $context = array()) {

		if (empty($this->_loggers)) return false;

		foreach ($this->_loggers as $logger) {
			$logger->alert($message, $context);
		}

	}

	/**
	 * Critical conditions.
	 *
	 * Example: Application component unavailable, unexpected exception.
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null
	 */
	public function critical($message, array $context = array()) {

		if (empty($this->_loggers)) return false;

		foreach ($this->_loggers as $logger) {
			$logger->critical($message, $context);
		}

	}

	/**
	 * Runtime errors that do not require immediate action but should typically
	 * be logged and monitored.
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null
	 */
	public function error($message, array $context = array()) {

		if (empty($this->_loggers)) return false;

		foreach ($this->_loggers as $logger) {
			$logger->error($message, $context);
		}

	}

	/**
	 * Exceptional occurrences that are not errors.
	 *
	 * Example: Use of deprecated APIs, poor use of an API, undesirable things
	 * that are not necessarily wrong.
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null
	 */
	public function warning($message, array $context = array()) {

		if (empty($this->_loggers)) return false;

		foreach ($this->_loggers as $logger) {
			$logger->warning($message, $context);
		}

	}

	/**
	 * Normal but significant events.
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null
	 */
	public function notice($message, array $context = array()) {

		if (empty($this->_loggers)) return false;

		foreach ($this->_loggers as $logger) {
			$logger->notice($message, $context);
		}

	}

	/**
	 * Interesting events.
	 *
	 * Example: User logs in, SQL logs.
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null
	 */
	public function info($message, array $context = array()) {

		if (empty($this->_loggers)) return false;

		foreach ($this->_loggers as $logger) {
			$logger->info($message, $context);
		}

	}

	/**
	 * Detailed debug information.
	 *
	 * @param  string $message
	 * @param  array  $context
	 * @return null
	 */
	public function debug($message, array $context = array()) {

		if (empty($this->_loggers)) return false;

		foreach ($this->_loggers as &$logger) {
			$logger->debug($message, $context);
		}

	}

	/**
	 * Logs with an arbitrary level.
	 *
	 * @param  string $message
	 * @param  mixed  $level
	 * @param  array  $context
	 * @return null
	 */
	public function log($message, $level, array $context = array()) {

		if (empty($this->_loggers)) return false;

		foreach ($this->_loggers as $logger) {
			$logger->log($message, $level, $context);
		}

	}
}
