<?php

//ini_set ('display_errors', 1);
//error_reporting (E_ALL);

//    GPT
//  define ('AI_ADSENSE_CLIENT_ID',     '607114800573.apps.googleusercontent.com');
//  define ('AI_ADSENSE_CLIENT_SECRET', '2muX2P9FHRNtm6BURa49t1z6');
//  define ('AI_ADSENSE_DEVELOPER_KEY', 'AIzaSyCDZtqhLeAp1XM-xS52nzQ7NwnrOH0UE2U');

if (defined ('AI_CI_STRING') && get_option (AI_ADSENSE_OWN_IDS) === false) {
  define ('AI_ADSENSE_CLIENT_ID',     base64_decode (AI_CI_STRING));
  define ('AI_ADSENSE_CLIENT_SECRET', base64_decode (AI_CS_STRING));
}
elseif (($adsense_client_ids = get_option (AI_ADSENSE_CLIENT_IDS)) !== false) {
  define ('AI_ADSENSE_CLIENT_ID',     $adsense_client_ids ['ID']);
  define ('AI_ADSENSE_CLIENT_SECRET', $adsense_client_ids ['SECRET']);
}

if (($adsense_auth_code = get_option (AI_ADSENSE_AUTH_CODE)) !== false) {
  define ('AI_ADSENSE_AUTHORIZATION_CODE', $adsense_auth_code);
}

require_once AD_INSERTER_PLUGIN_DIR.'includes/google-api/autoload.php';


/**
 * Handles authentication and Oauth token storing.
 *
 */

class adsense_api {
  protected $apiClient;
  protected $adSenseService;
  protected $publisherID;
  protected $error;

  public function __construct() {
    $this->apiClient = new Google_Client();

    $this->apiClient->setClientId (AI_ADSENSE_CLIENT_ID);
    $this->apiClient->setClientSecret (AI_ADSENSE_CLIENT_SECRET);
    $this->apiClient->setRedirectUri ('urn:ietf:wg:oauth:2.0:oob');

    $this->adSenseService = new Google_Service_AdSense ($this->apiClient);
  }

  public function getAuthUrl () {
    $this->apiClient = new Google_Client();

    $this->apiClient->setClientId (AI_ADSENSE_CLIENT_ID);
    $this->apiClient->setClientSecret (AI_ADSENSE_CLIENT_SECRET);
    $this->apiClient->setRedirectUri ('urn:ietf:wg:oauth:2.0:oob');
    $this->apiClient->setScopes (array ('https://www.googleapis.com/auth/adsense'));
    $this->apiClient->setAccessType ('offline');

    return ($this->apiClient->createAuthUrl ());
  }


  /**
   * Check if a token for the user is already in the db, otherwise perform
   * authentication.
   */
  public function authenticate() {
    $token = $this->getToken();
    if (isset ($token)) {
      // We already have the token.
      $this->apiClient->setAccessToken ($token);
    } else {
      // Override the scope to use the readonly one
      $this->apiClient->setScopes (array("https://www.googleapis.com/auth/adsense.readonly"));
      // Go get the token
      $this->apiClient->authenticate (AI_ADSENSE_AUTHORIZATION_CODE);
      $this->saveToken ($this->apiClient->getAccessToken());
    }
  }

  /**
   * Return the AdsenseService instance (to be used to retrieve data).
   * @return apiAdsenseService the authenticated apiAdsenseService instance
   */
  public function getAdSenseService () {
    return $this->adSenseService;
  }

  public function getAdSensePublisherID () {
    return $this->publisherID;
  }

  public function getError () {
    return $this->error;
  }

  public function isTokenValid () {
    $token = $this->getToken();
    return isset ($token);
  }

  /**
   * During the request, the access code might have been changed for another.
   * This function updates the saved token.
   */
  public function refreshToken() {
    if ($this->apiClient->getAccessToken () != null) {
      $this->saveToken ($this->apiClient->getAccessToken());
    }
  }

  public function getAdUnits() {
    $adsense_table_data = array ();
    $this->error = '';

    try {
      $this->authenticate();

      if ($this->isTokenValid ()) {
        $adsense_service = $this->getAdSenseService();

        $adsense_adsense_accounts   = $adsense_service->accounts;
        $adsense_adsense_adclients  = $adsense_service->adclients;
        $adsense_adsense_adunits    = $adsense_service->adunits;

        try {
          $adsense_list_accounts = $adsense_adsense_accounts->listAccounts()->getItems();
          $this->publisherID = $adsense_list_accounts[0]['id'];

          try {
            $adsense_list_adclients = $adsense_adsense_adclients->listAdclients()->getItems();
            $adsense_ad_client = NULL;
            foreach ($adsense_list_adclients as $adsense_list_adclient) {
              if ($adsense_list_adclient ['productCode'] == 'AFC') {
                $adsense_ad_client = $adsense_list_adclient ['id'];
              }
            }

            if ($adsense_ad_client) {
              try {
                $adsense_adunits = $adsense_adsense_adunits->listAdunits ($adsense_ad_client)->getItems();
                foreach ($adsense_adunits as $adsense_adunit) {
                  $adsense_table_data [] = array (
                    'id'      => $adsense_adunit->getId(),
                    'name'    => $adsense_adunit->getName(),
                    'code'    => $adsense_adunit->getCode(),
                    'type'    => $adsense_adunit->getContentAdsSettings()->getType(),
                    'size'    => preg_replace( '/SIZE_([\d]+)_([\d]+)/', '$1x$2', $adsense_adunit->getContentAdsSettings()->getSize()),
                    'active'  => $adsense_adunit->getStatus() == 'ACTIVE',
                  );
                }
              } catch ( Google_Service_Exception $e ) {
                $adsense_err = $e->getErrors();
                $this->error = 'AdUnits Error: ' .  $adsense_err [0]['message'];
              }
            }
          } catch ( Google_Service_Exception $e ) {
            $adsense_err = $e->getErrors();
            $this->error = 'AdClient Error: ' .  $adsense_err [0]['message'];
          }
        } catch ( Google_Service_Exception $e ) {
          $adsense_err = $e->getErrors();
          $this->error = 'Account Error: ' .  $adsense_err [0]['message'];
        } catch ( Exception $e ) {
          $this->error = 'Error: ' . strip_tags ($e->getMessage());
        }
      } else {
        }

    } catch (Exception $e) {
        $this->error = 'AdSense Authentication failed: ' . strip_tags ($e->getMessage());
    }

    if ($this->error != '') return array ();

    return $adsense_table_data;
  }

  public function getAdCode ($adUnitId) {
    $code = '';
    $this->error = '';

    try {
      $this->authenticate();

      if ($this->isTokenValid ()) {

        $adsense_service = $this->getAdSenseService();

        $adsense_adsense_accounts   = $adsense_service->accounts;

        try {
          $adsense_list_accounts = $adsense_adsense_accounts->listAccounts()->getItems();
          $this->publisherID = $adsense_list_accounts[0]['id'];

          try {
            $ad_code = $adsense_service->accounts_adunits->getAdCode ($this->publisherID, 'ca-'.$this->publisherID, $adUnitId);
          } catch ( Google_Service_Exception $e ) {
            $adsense_err = $e->getErrors();
            $this->error = 'getAdCode Error: ' .  $adsense_err [0]['message'];
          }

        } catch ( Google_Service_Exception $e ) {
          $adsense_err = $e->getErrors();
          $this->error = 'Account Error: ' .  $adsense_err [0]['message'];
        } catch ( Exception $e ) {
          $this->error = 'Error: ' . strip_tags ($e->getMessage());
        }

        if (isset ($ad_code->adCode)) {
          $code = $ad_code->adCode;
        }

      } else {
        }

    } catch (Exception $e) {
        $this->error = 'AdSense Authentication failed: ' . strip_tags ($e->getMessage());
    }

    if ($this->error != '') return '';

    return $code;
  }

  private function saveToken ($token) {
    if ($token != null) set_transient (AI_TRANSIENT_ADSENSE_TOKEN, $token);
  }

  private function getToken () {
    $token = get_transient (AI_TRANSIENT_ADSENSE_TOKEN);
    if ($token === false) return null; else return $token;
  }
}

