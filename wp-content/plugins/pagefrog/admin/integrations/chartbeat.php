<?php 
/**
 * A basic interface to get some data from the Chartbeat API.
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
class PageFrog_Chartbeat {
    private $api_key;
    private $domain;

    /**
     * Inistialize a new instance of PageFrog_Chartbeat.
     *
     * Accepts a PageFrog_Analytics_Storage object as an argument, if you would like to make calls
     * using the stored chartbeat_api_key. That parameter is optional.
     *
     * @since       1.0.4
     */
    public function __construct( $analytics=null ) {
        if ( $analytics ) {
            $this->api_key = $analytics->get_chartbeat_api_key();
        } else {
            $this->api_key = null;
        }

        // we also need to set the domain
        $this->domain = preg_replace("/\:.*/", '', preg_replace( "/\/.*/", '', preg_replace( "/https?\:\/\/(www\.)?/", '', get_site_url() ) ) );
    }

    /**
     * A method to fetch the historical traffic stats through an API call.
     *
     * @since       1.0.4
     */
    public function get_historical_traffic_stats() {
        if ( $this->api_key ) {
            $base_url = 'http://api.chartbeat.com/historical/traffic/stats/';

            // for testing purposes, use the pagefrog blog.
            if ( $this->domain == 'localhost' ) {
                $this->domain = 'blog.pagefrog.com';
            }

            $query = http_build_query( array(
                'apikey' => $this->api_key,
                'host' => $this->domain
            ) );

            $url = $base_url . "?" . $query;
            $response = wp_remote_get( $url );
            $body = wp_remote_retrieve_body( $response );
            $data = json_decode( $body, true );

            if ( isset( $data['error'] ) ) {
                if ( isset( $data['error']['message'] ) ) {
                    return array(
                        'status' => 'error',
                        'message' => $data['error']['message']
                    );
                } else {
                    return array(
                        'status' => 'error',
                        'message' => 'Something went wrong with the Chartbeat API call, please check your API key.'
                    );
                }
            }
            if ( ! isset( $data['data'] ) ) {
                return array(
                    'status' => 'error',
                    'message' => 'It looks like the Chartbeat API returned something not valid. Please check your API key.'
                );
            } else {
                return array(
                    'status' => 'ok',
                    'data' => $data['data']
                );
            }
        } else {
            return array(
                'status' => 'error',
                'message' => "It looks like you haven't registered a Chartbeat API key just yet. Please do that and try again."
            );
        }
    }

    /**
     * A method to set the API key that should be used when making calls.
     *
     * @since       1.0.4
     */
    public function set_api_key( $key ) {
        $this->api_key = $key;
    }
}

?>