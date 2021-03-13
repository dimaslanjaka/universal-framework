<?php 
/**
 * A basic interface to get some data from the Parsely API.
 *
 * @link        http://pagefrog.com
 * @since       1.0.4
 *
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 */

/**
 * That class designed to start making API calls.
 *
 * @since       1.0.4
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 * @author      PageFrog Team <team@pagefrog.com>
 */
class PageFrog_Parsely {
    private $api_key;
    private $api_secret;
    private $domain;

    /**
     * Initialize a new instance of PageFrog_Parsely.
     *
     * Accepts a PageFrog_Analytics_Storage object as an argument, if you would like to make calls
     * using the stored parsely_api_key and parsely_api_secret. That parameter is optional.
     *
     * @since       1.0.4
     */
    public function __construct( $analytics=null ) {
        if ( $analytics ) {
            $this->api_key = $analytics->get_parsely_api_key();
            $this->api_secret = $analytics->get_parsely_api_secret();
        } else {
            $this->api_key = null;
            $this->api_secret = null;
        }

        // we also need to set the domain
        $this->domain = preg_replace("/\:.*/", '', preg_replace( "/\/.*/", '', preg_replace( "/https?\:\/\/(www\.)?/", '', get_site_url() ) ) );
    }


    /**
     * Make an API call to get the analytics for a post.
     *
     * @since       1.0.4
     */
    public function get_post_analytics() {
        $base_url = 'https://api.parsely.com/v2/analytics/posts';
        $query_args = array();
        $query_args['apikey'] = $this->api_key;
        if ( $this->api_secret ) {
            // the api_secret is optional, so we can try to make a call without it if necessary.
            $query_args['secret'] = $this->api_secret;
        }
        $query = http_build_query( $query_args );

        $url = $base_url . "?" . $query;
        $response = wp_remote_get( $url );
        $body = wp_remote_retrieve_body( $response );
        $data = json_decode( $body, true );

        if ( isset( $data['success'] ) && $data['success'] === false ) {
            if ( isset( $data['message'] ) ) {
                return array(
                    'status' => 'error',
                    'message' => $data['message'] . '. Please make sure your API key and secret are correct.'
                );
            } else {
                return array(
                    'status' => 'error',
                    'message' => "Something went wrong with the API call, please make sure your API key and secret are correct."
                );
            }
        } else if ( isset( $data['data'] ) ) {
            return array(
                'status' => 'ok',
                'data' => $data['data']
            );
        } else {
            return array(
                'status' => 'error',
                'message' => "Something unexpected was returned by the API, please make sure your API key and secret are correct."
            );
        }
    }

    public function set_api_key( $key ) {
        $this->api_key = $key;
    }

    public function set_api_secret( $secret ) {
        $this->api_secret = $secret;
    }
}

?>