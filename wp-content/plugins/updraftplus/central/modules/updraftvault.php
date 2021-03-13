<?php

if (!defined('UPDRAFTPLUS_DIR')) die('No access.');
require_once(UPDRAFTPLUS_DIR.'/methods/updraftvault.php');

/**
 * Handles UpdraftVault Commands to pull Amazon S3 Bucket credentials
 * from user's UpdraftVault and some default filters for per page display
 *
 * @method array get_credentials()
 */
class UpdraftCentral_UpdraftVault_Commands extends UpdraftCentral_Commands {
	
   /**
	* Gets the Amazon S3 Credentials
	*
	* Extract the needed credentials to connect to the user's Amazon S3 Bucket
	* by pulling this info from the UpdraftVault server.
	*
	* @return array $result - An array containing the Amazon S3 settings/config if successful,
	*						  otherwise, it will contain the error details/info of the generated error.
	*/
	public function get_credentials() {
		
		$vault = new UpdraftPlus_BackupModule_updraftvault();
		$result = $vault->get_config();
		
		if (isset($result['error']) && !empty($result['error'])) {
			$result = array('error' => true, 'message' => $result['error']['message'], 'values' => $result['error']['values']);
		}
		
		return $this->_response($result);
	}
	
   /**
	* Builds a list of options out from an array of preset items
	* that will serve as a "results per page" option for selection
	* on the frontend.
	*
	* @return array
	*/
}
