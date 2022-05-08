<?php
/**
 * A basic interface to get some data from Google Analytics.
 *
 * @link        http://pagefrog.com
 * @since       1.0.4
 *
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 */

/**
 * The data for Google Analytics Config
 *
 * @since       1.0.4
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 * @author      PageFrog Team <team@pagefrog.com>
 */
class PageFrog_GoogleAnalyticsCredentials {
    /**
     * The settings for Google Analytics API access.
     *
     * @var     array   settings
     */
    public static $settings;
}
PageFrog_GoogleAnalyticsCredentials::$settings = array (
    'scopes' => array( 'https://www.googleapis.com/auth/analytics.readonly' )
);

/**
 * The class designed to make API calls.
 *
 * @since       1.0.4
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 * @author      PageFrog Team <team@pagefrog.com>
 */
class PageFrog_GoogleAnalytics {

    private $refresh_token;
    private $access_token;

    /**
     * Initialize a new insance of PageFrog_GoogleAnalytics.
     *
     * Accepts a PageFrog_Analytics_Storage object as an argument, if you would like to make calls
     * using the stored refresh_token. That parameter is optional.
     *
     * @since       1.0.4
     */
    public function __construct( $analytics=null ) {
        if ( $analytics ) {
            $this->refresh_token = $analytics->get_google_analytics_refresh_token();
        } else {
            $this->refresh_token = null;
        }
        $this->access_token = null;
    }

    /**
     * A static method to build the URL from where we can get credentials (the user is redirected to this URL).
     *
     * @since       1.0.4
     */
    public static function get_auth_url() {
        $query = http_build_query( array(
            'scope' => implode( ' ', PageFrog_GoogleAnalyticsCredentials::$settings['scopes'] ),
            'service' => 'google'
        ) );

        $site_url = get_site_url();
        $base_url = 'http://pagefrog.com/passthrough-auth/';
        if ( PageFrog_Utils::contains( $site_url, 'localhost' ) ) {
            $base_url = 'http://localhost:8000/passthrough-auth/';
        }
        
        return $base_url . '?' . $query;
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
                'body' => array( 'refresh_token' => $this->refresh_token )
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

    /**
     * A method to generate an access token to verify the account using an incoming refresh_token.
     *
     * @since       1.0.4
     */
    public function generate_access_token_using( $refresh_token ) {
        $this->refresh_token = $refresh_token;
        $this->access_token = null;
        $this->generate_access_token();
        return $this->access_token;
    }

    /**
     * A method to make the API call to generate the liist of sites that a user has in their account.
     *
     * This returns data in the form array(
     *      'status' => 'ok' OR 'error',
     *      'message' => error message string, if status == 'error'
     *      'data' => array data returned by the API, if status == 'ok'
     * )
     *
     * @since       1.0.4
     */
    public function get_sites_list() {
        // grab an access token if we don't already have one
        $this->generate_access_token();

        // check to be sure that the access token was generated without any issues
        if ( ! $this->access_token ) {
            if ( $this->refresh_token ) {
                return array(
                    'status' => 'error',
                    'message' => 'Could not authenticate, please re-add your account'
                );
            } else {
                return array(
                    'status' => 'error',
                    'message' => 'No Google account has been authorized, please add one.'
                );
            }
        }

        // now do the query
        $url = 'https://www.googleapis.com/analytics/v3/management/accountSummaries';
        $args = array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $this->access_token
            )
        );
        $response = wp_remote_get( $url, $args );
        $body = wp_remote_retrieve_body( $response );
        $data = json_decode( $body, true );

        // parse our the response and provide it in a nice format to handling code
        if ( isset( $data['error'] ) ) {
            if ( isset( $data['error']['message'] ) ) {
                return array(
                    'status' => 'error',
                    'message' => $data['error']['message']
                );
            } else {
                return array(
                    'status' => 'error',
                    'message' => 'Something went wrong, please re-authorize your Google account'
                );
            }
        }
        return array(
            'status' => 'ok',
            'data' => $data['items']
        );
    }

}
?>