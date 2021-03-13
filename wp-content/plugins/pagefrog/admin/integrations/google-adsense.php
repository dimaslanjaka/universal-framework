<?php 

/**
 * A basic interface to get some data from Google AdSense.
 *
 * @link        http://pagefrog.com
 * @since       1.0.6
 *
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 */

/**
 * The data for Google AdSense Config
 *
 * @since       1.0.6
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 * @author      PageFrog Team <team@pagefrog.com>
 */
class PageFrog_AdSenseCredentials {
    /**
     * The settings for Google AdSense API access.
     *
     * @var     array   $settings
     */
    public static $settings;
}
PageFrog_AdSenseCredentials::$settings = array (
    'scopes' => array( 'https://www.googleapis.com/auth/adsense.readonly' )
);

/**
 * The class designed to make API calls.
 *
 * @since       1.0.6
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 * @author      PageFrog Team <team@pagefrog.com>
 */
class PageFrog_GoogleAdSense {
    private $refresh_token;
    private $access_token;
    private $account_id;

    /**
     * Initialize a new instance of PageFrog_GoogleAdSense.
     *
     * Accepts a PageFrog_AdSettings_Storage object as an argument, if you would like to make calls
     * using the stored refresh_token. That parameter is options.
     *
     * @since       1.0.6
     */
    public function __construct( $ads=null ) {
        if ( $ads ) {
            $this->refresh_token = $ads->get_google_adsense_refresh_token();
            $this->account_id = $ads->get_google_adsense_account_id();
        } else {
            $this->refresh_token = null;
        }
        $this->access_token = null;
    }

    /**
     * A quick and not-so-precise way of checking if the account has been connected. 
     *
     * If this function returns true, there may still be a chance that the account is not authorized
     * if the user has revoked access or the refresh_token has expired (is that even possible?) since
     * the account was authorized.
     *
     * @since       1.0.4
     */
    public function is_authorized() {
        return strlen( $this->refresh_token ) > 0;
    }

    /**
     * A method to generate an access token to verify the account using an incoming refresh_token
     *
     * @since   1.0.6
     */
    public function generate_access_token_using( $refresh_token ) {
        $this->refresh_token = $refresh_token;
        $this->access_token = null;
        $this->generate_access_token();
        return $this->access_token;
    }

    /**
     * A method to make the API call to retrieve the list of AdSense accounts that are available.
     *
     * @since   1.0.6
     */
    public function get_accounts_list() {
        // grab an access token if we don't already have one
        $this->generate_access_token();

        // check to be sure that the access token was generated without any issues
        if ( ! $this->access_token ) {
            if ( $this->refresh_token ) {
                return array(
                    'status' => 'error',
                    'message' => 'Could not authenticate, please re-add your account.'
                );
            } else {
                return array(
                    'status' => 'error',
                    'message' => 'No Google account has been authorized, please add one.'
                );
            }
        }

        // now do the query
        $url = 'https://www.googleapis.com/adsense/v1.4/accounts';
        $args = array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $this->access_token
            )
        );
        $response = wp_remote_get( $url, $args );
        $body = wp_remote_retrieve_body( $response );
        $data = json_decode( $body, true );

        // parse out the response and provide it in a nice format to handling code
        if ( isset( $data['error'] ) ) {
            if ( isset( $data['error']['message'] ) ) {
                return array(
                    'status' => 'error',
                    'message' => $data['error']['message']
                );
            } else {
                return array(
                    'status' => 'error',
                    'message' => 'Something went wrong getting the list of AdSense accounts. Please try again.'
                );
            }
        }
        return array(
            'status' => 'ok',
            'data' => $data['items']
        );
    }

    /**
     * A method to make the API call to retrieve the list of AdSense ad clients that are available for the
     * passed in AdSense account.
     *
     * @since       1.0.6
     */
    public function get_adclients_list() {
        // grab an access toekn if we don't already have one
        $this->generate_access_token();

        // check to be sure that the access token was generated without any issues
        if ( ! $this->access_token ) {
            if ( $this->refresh_token ) {
                return array(
                    'status' => 'error',
                    'message' => 'Could not authenticate, please re-add your AdSense account.'
                );
            } else {
                return array(
                    'status' => 'error',
                    'message' => 'No Google account has been authorized for AdSense, please add one.'
                );
            }
        }

        // now make the API call
        $account_id = $this->account_id;
        $url = "https://www.googleapis.com/adsense/v1.4/accounts/$account_id/adclients";
        $args = array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $this->access_token
            )
        );
        $response = wp_remote_get( $url, $args );
        $body = wp_remote_retrieve_body( $response );
        $data = json_decode( $body, true );

        // parse out the response and provide it in a nice format to handling code
        if ( isset( $data['error'] ) ) {
            if ( isset( $data['error']['message'] ) ) {
                return array(
                    'status' => 'error',
                    'message' => $data['error']['message']
                );
            } else {
                return array(
                    'status' => 'error',
                    'message' => 'Something went wrong getting the list of AdSense Clients. Please try again.'
                );
            }
        }
        return array(
            'status' => 'ok',
            'data' => $data['items']
        );
    }

    /**
     * A method to make the API calls to retrieve the list of AdSense adunits that are available for the
     * passed in AdSense account.
     *
     * @since       1.0.6
     */
    public function get_adunits_list() {
        $response = $this->get_adclients_list();
        if ( $response['status'] !== 'ok' ) {
            return $response;
        }
        $valid_clients = array();
        foreach( $response['data'] as $adclient ) {
            if ( isset( $adclient['productCode'] ) && $adclient['productCode'] === 'AFC' ) {
                $valid_clients[] = $adclient;
            }
        }

        // get the adunits for each valid ad client
        $ad_units = array();
        foreach ( $valid_clients as $valid_client ) {
            $response = $this->get_adunit_for_client( $valid_client['id'] );
            if ( $response['status'] === 'ok' ) {
                foreach ( $response['data'] as $ad_unit ) {
                    $ad_units[] = $ad_unit;
                }
            }
        }

        // filter the ad units to find only the valid ones
        $valid_ad_units = array();
        foreach ( $ad_units as $ad_unit ) {
            if ( isset( $ad_unit['id'] ) && isset( $ad_unit['name'] ) && isset( $ad_unit['contentAdsSettings'] ) && isset( $ad_unit['contentAdsSettings']['size'] ) ) {
                $width = PageFrog_AdSettings_Storage::parse_adsense_width_from( $ad_unit['contentAdsSettings']['size'] );
                $height = PageFrog_AdSettings_Storage::parse_adsense_height_from( $ad_unit['contentAdsSettings']['size'] );
                $ratio = 0;
                if ( $width > 0.1 && $height > 0.1 ) {
                    $ratio = $width / $height;
                }
                if ( $ratio > 1.0 && $ratio < 4.0 && $width <= 500 ) { // allow ads that are square, or wide rectangles (up to 4X wider than high) and less than 501px wide
                    $valid_ad_units[] = $ad_unit;
                }
            }
        }

        if ( count( $valid_ad_units ) === 0 ) {
            return array(
                'status' => 'error',
                'message' => 'No valid ad units for AMP could be found in your account. Please create an Ad Unit that works well on mobile (less than 500px wide and less tall than wide, or Responsive). After creating your ad unit, please try again.'
            );
        }

        return array(
            'status' => 'ok',
            'data' => $valid_ad_units
        );
    }

    private function get_adunit_for_client( $ad_client_id ) {
        // grab an access token if we don't already have one
        $this->generate_access_token();

        // check to be sure that the access token was generated without any issues
        if ( ! $this->access_token ) {
            if ( $this->refresh_token ) {
                return array(
                    'status' => 'error',
                    'message' => 'Could not authenticate, please re-add your AdSense account.'
                );
            } else {
                return array(
                    'status' => 'error',
                    'message' => 'No Google account has been authorized for AdSense, please add one.'
                );
            }
        }

        // now make the API call
        $account_id = $this->account_id;
        $url = "https://www.googleapis.com/adsense/v1.4/accounts/$account_id/adclients/$ad_client_id/adunits";
        $args = array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $this->access_token
            )
        );
        $response = wp_remote_get( $url, $args );
        $body = wp_remote_retrieve_body( $response );
        $data = json_decode( $body, true );

        // parse out the response and provide it in a nice format to handling code
        if ( isset( $data['error'] ) ) {
            if ( isset( $data['error']['message'] ) ) {
                return array(
                    'status' => 'error',
                    'message' => $data['error']['message']
                );
            } else {
                return array(
                    'status' => 'error',
                    'message' => 'Something went wrong getting the list of AdSense Ad Units. Please try again.'
                );
            }
        }
        return array(
            'status' => 'ok',
            'data' => $data['items']
        );
    }

    private function generate_access_token() {
        if ( ! $this->access_token ) {
            // figure out where we should get the access token
            $site_url = get_site_url();
            $base_url = 'http://pagefrog.com/passthrough-auth/refresh/google/';
            if ( PageFrog_Utils::contains( $site_url, 'localhost' ) ) {
                $base_url = 'http://localhost:8000/passthrough-auth/refresh/google/';
            }

            // get the access token
            $args = array(
                'body' => array( 'refresh_token' => $this->refresh_token)
            );
            $response = wp_remote_post( $base_url, $args );
            $body = wp_remote_retrieve_body( $response );
            $data = json_decode( $body, true );

            // save the access token to use later
            if ( isset( $data['access_token'] ) ) {
                $this->access_token = $data['access_token'];
            }
        }
    }

    public static function get_auth_url() {
        $query = http_build_query( array(
            'scope' => implode( ' ' , PageFrog_AdSenseCredentials::$settings['scopes'] ),
            'service' => 'google'
        ) );

        $site_url = get_site_url();
        $base_url = 'http://pagefrog.com/passthrough-auth/';
        if ( PageFrog_Utils::contains( $site_url, 'localhost' ) ) {
            $base_url = 'http://localhost:8000/passthrough-auth/';
        }

        return $base_url . '?' . $query;
    }
}
?>