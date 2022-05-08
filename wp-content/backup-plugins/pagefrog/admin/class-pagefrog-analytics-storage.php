<?php

include_once "integrations/chartbeat.php";
include_once "integrations/parsely.php";

/**
 * The file that provides access to the analytics settings.
 *
 * A class definition that can provide access to the saved preferences of the analytics
 * engine, supplementing default values for where there are none saved.
 *
 * @link        http://pagefrog.com
 * @since       1.0.4
 *
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 */

/**
 * The class that provides access to the analytics settings.
 *
 * This is used to make sure that user-specified analytics preferences are used where possible.
 *
 * @since       1.0.4
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 * @author      PageFrog Team <team@pagefrog.com>
 */

class PageFrog_Analytics_Storage {
    /**
     * The array that stores all of the analytics settings.
     *
     * The pagefrog analytics variable looks like this:
     *  array( 
     *      'chartbeat_api_key' => 'string',
     *       'chartbeat_uid' => 'string',
     *       'chartbeat_enabled' => 0 or 1,
     *      'parsely_api_key' => 'string,
     *      'parsely_api_secret' => 'string',
     *      'parsely_enabled' => 0 or 1,
     *      'other_amp_analytics_code' => 'string',
     *      'other_fbia_analytics_code' => 'string',
     *      'other_analytics_enabled' => 0 or 1,
     *      'google_analytics_enabled' => 0 or 1,
     *      'google_analytics_access_token' => 'string',
     *      'google_analytics_refresh_token' => 'string',
     *      'google_analytics_site_id' => 'string'
     *  )
     *
     * @since     1.0.4
     * @access    private
     * @var       array     $analytics    A list of the saved analytics values.
     */
    private $analytics;

    /**
     * A variable that holds the defaults for all of the analytics settings.
     *
     * @since       1.0.4
     * @access      public
     * @var         array   DEFAULTS    A list of the variables available and their default value.
     */
    public static $DEFAULTS;


    /**
     * A variable to hold the string that is used to fetch and save the pagefrog analytics settings.
     *
     * @since       1.0.4
     * @access      public
     * @var         string    OPTIONS_KEY   The key to access the values.
     */
    const OPTIONS_KEY = 'pagefrog_analytics_settings';

    /**
     * Set up the analytics array right away.
     *
     * @since 1.0.4
     */
    public function __construct() {
        $this->analytics = self::$DEFAULTS; // does not use references, so no worries that DEFAULTS will be poisoned
        $saved_options = get_option(self::OPTIONS_KEY);
        foreach( $this->analytics as $key => $val ) {
            if ( isset( $saved_options[$key] ) ) {
                $this->analytics[$key] = $saved_options[$key];
            }
        }
    }

    /**
     * A bunch of simple getters.
     *
     * @since 1.0.4
     */
    public function get_chartbeat_api_key () {
        return $this->analytics['chartbeat_api_key'];
    }

    public function get_chartbeat_uid () {
        return $this->analytics['chartbeat_uid'];
    }

    public function get_chartbeat_enabled_bool () {
        return $this->analytics['chartbeat_enabled'] ? true : false;
    }

    public function get_chartbeat_enabled_string () {
        return $this->get_chartbeat_enabled_bool() ? 'true' : 'false';
    }

    public function get_parsely_api_key () {
        return $this->analytics['parsely_api_key'];
    }

    public function get_parsely_api_secret() {
        return $this->analytics['parsely_api_secret'];
    }

    public function get_parsely_enabled_bool() {
        return $this->analytics['parsely_enabled'] ? true : false;
    }

    public function get_parsely_enabled_string() {
        return $this->get_parsely_enabled_bool() ? 'true' : 'false';
    }

    public function get_other_amp_analytics_code() {
        return $this->analytics['other_amp_analytics_code'];
    }

    public function get_other_fbia_analytics_code() {
        return $this->analytics['other_fbia_analytics_code'];
    }

    public function get_other_analytics_enabled_bool() {
        return $this->analytics['other_analytics_enabled'] ? true : false;
    }

    public function get_other_analytics_enabled_string() {
        return $this->get_other_analytics_enabled_bool() ? 'true' : 'false';
    }

    public function get_google_analytics_enabled_bool() {
        return $this->analytics['google_analytics_enabled'] ? true : false;
    }

    public function get_google_analytics_enabled_string() {
        return $this->get_google_analytics_enabled_bool() ? 'true' : 'false';
    }

    public function get_google_analytics_access_token() {
        return $this->analytics['google_analytics_access_token'];
    }

    public function get_google_analytics_refresh_token() {
        return $this->analytics['google_analytics_refresh_token'];
    }

    public function get_google_analytics_site_id() {
        return $this->analytics['google_analytics_site_id'];
    }

    public function an_analytics_system_is_enabled() {
        return $this->get_chartbeat_enabled_bool() ||
               $this->get_parsely_enabled_bool() ||
               $this->get_other_analytics_enabled_bool() ||
               $this->get_google_analytics_enabled_bool();
    }

    /**
     * A convenience method to generate reliable data from the user-inputted values and provide 
     * error reporting, if necessary.
     *
     * @since 1.0.4
     */
    public static function validate( $data ) {
        $clean_data = array();

        // validate the chartbeat box.
        $chartbeat_error_found = false;
        if ( isset( $data['chartbeat_api_key'] ) && PageFrog_Utils::string_isnt_empty( $data['chartbeat_api_key'] ) ) { 
            $chartbeat = new PageFrog_Chartbeat();
            $chartbeat->set_api_key( $data['chartbeat_api_key'] );
            $stats_response =  $chartbeat->get_historical_traffic_stats();
            if ( isset( $stats_response['status'] ) && $stats_response['status'] == 'ok' ) {
                $clean_data['chartbeat_api_key'] = $data['chartbeat_api_key'];
            } else {
                add_settings_error( 'chartbeat_api_key', PageFrog_Analytics_Storage::OPTIONS_KEY, "Please add a valid API key." );
                $chartbeat_error_found = true;
            }
        }
        if ( isset( $data['chartbeat_uid'] ) && PageFrog_Utils::string_isnt_empty( $data['chartbeat_uid'] ) ) {
            if ( ! is_numeric( $data['chartbeat_uid'] ) ) {
                add_settings_error( 'chartbeat_uid', PageFrog_Analytics_Storage::OPTIONS_KEY, "The UID must be numeric." );
                $chartbeat_error_found = true;
            } else {
                $clean_data['chartbeat_uid'] = $data['chartbeat_uid'];
            }
        }
        if ( isset( $data['chartbeat_enabled'] ) && ( $data['chartbeat_enabled'] === true || $data['chartbeat_enabled'] === 'true' ) ) {
            if ( $chartbeat_error_found ) {
                $clean_data['chartbeat_enabled'] = 0;
            } else {
                $clean_data['chartbeat_enabled'] = 1;
            }
        } else {
            $clean_data['chartbeat_enabled'] = 0;
        }

        // validate the parsely box
        $parsely_error_found = false;
        $both_key_and_secret_found = 0;
        if ( isset( $data['parsely_api_key'] ) && PageFrog_Utils::string_isnt_empty( $data['parsely_api_key'] ) ) { // TODO: validate the parsely API key and secret together by making a call
            $clean_data['parsely_api_key'] = $data['parsely_api_key'];
            $both_key_and_secret_found++;
        }
        if ( isset( $data['parsely_api_secret'] ) && PageFrog_Utils::string_isnt_empty( $data['parsely_api_secret'] ) ) { // TODO: validate the parsely API key and secret together by making a call
            $clean_data['parsely_api_secret'] = $data['parsely_api_secret'];
            $both_key_and_secret_found++;
        }
        if ( $both_key_and_secret_found === 2 ) {
            $parsely = new PageFrog_Parsely();
            $parsely->set_api_key( $clean_data['parsely_api_key'] );
            $parsely->set_api_secret( $clean_data['parsely_api_secret'] );
            $response = $parsely->get_post_analytics();
            if ( ! isset( $response['status'] ) || $response['status'] !== 'ok' ) {
                $parsely_error_found = true;
                if ( isset( $response['message'] ) ) {
                    add_settings_error( 'parsely_api_key', PageFrog_Analytics_Storage::OPTIONS_KEY, $response['message'] );
                } else {
                    add_settings_error( 'parsely_api_key', PageFrog_Analytics_Storage::OPTIONS_KEY, "Something went wrong with the API call, please check your API key and secret." );
                }
            }
        } else if ( $both_key_and_secret_found === 1 ) {
            // you can't just provide one of these, we need both!
            $parsely_error_found = true;
            if ( isset( $clean_data['parsely_api_key'] ) && PageFrog_Utils::string_isnt_empty( $clean_data['parsely_api_key'] ) ) {
                add_settings_error( 'parsely_api_secret', PageFrog_Analytics_Storage::OPTIONS_KEY, "Please include your API secret." );
            }
            if ( isset( $clean_data['parsely_api_secret'] ) && PageFrog_Utils::string_isnt_empty( $clean_data['parsely_api_secret'] ) ) {
                add_settings_error( 'parsely_api_key', PageFrog_Analytics_Storage::OPTIONS_KEY, "Please include your API key." );
            }
        }
        if ( isset( $data['parsely_enabled'] ) && ( $data['parsely_enabled'] === true || $data['parsely_enabled'] === 'true' ) ) { 
            if ( $parsely_error_found || ! isset( $clean_data['parsely_api_key'] ) ) {
                $clean_data['parsely_enabled'] = 0;
            } else {
                $clean_data['parsely_enabled'] = 1;
            }
        } else {
            $clean_data['parsely_enabled'] = 0;
        }

        // Validate the other analytics box.
        $other_analytics_error_found = false;
        if ( isset( $data['other_amp_analytics_code'] ) && PageFrog_Utils::string_isnt_empty( $data['other_amp_analytics_code'] ) ) {
            if ( 
                    PageFrog_Utils::starts_with( trim( $data['other_amp_analytics_code'] ), "<amp-analytics" ) &&
                    PageFrog_Utils::ends_with( trim( $data['other_amp_analytics_code'] ), "</amp-analytics>" )
                ) {
                $clean_data['other_amp_analytics_code'] = $data['other_amp_analytics_code'];
            } else {
                add_settings_error( 'other_amp_analytics_code', PageFrog_Analytics_Storage::OPTIONS_KEY, "The value you provided was not a valid amp-analytics tag." );
                $other_analytics_error_found = true;
            }
        }
        if ( isset( $data['other_fbia_analytics_code'] ) && PageFrog_Utils::string_isnt_empty( $data['other_fbia_analytics_code'] ) ) {
            if ( PageFrog_Utils::contains( $data['other_fbia_analytics_code'], '<script>' ) ) {
                $clean_data['other_fbia_analytics_code'] = $data['other_fbia_analytics_code'];
            } else {
                add_settings_error( 'other_fbia_analytics_code', PageFrog_Analytics_Storage::OPTIONS_KEY, "This must include a &lt;script&gt; tag.");
                $other_analytics_error_found = true;
            }
        }
        if ( isset( $data['other_analytics_enabled'] ) && ( $data['other_analytics_enabled'] === true || $data['other_analytics_enabled'] === 'true' ) ) {
            if ( $other_analytics_error_found ) {
                $clean_data['other_analytics_enabled'] = 0;
            } else {
                $clean_data['other_analytics_enabled'] = 1;
            }
        } else {
            $clean_data['other_analytics_enabled'] = 0;
        }

        // validate the google analytics box.
        $google_analytics_error_found = false;
        if ( isset( $data['google_analytics_access_token' ] ) && PageFrog_Utils::string_isnt_empty( $data['google_analytics_access_token'] ) ) {
            // the access_token is pretty transient and we really don't use the stored value (anytime we make an API call,
            // we use the refresh_token to fetch a new access token anyways, so just trust that it's a usable value).
            $clean_data['google_analytics_access_token'] = $data['google_analytics_access_token'];
        }
        if ( isset( $data['google_analytics_refresh_token'] ) && PageFrog_Utils::string_isnt_empty( $data['google_analytics_refresh_token'] ) ) {
            // the refresh_token is important. Make sure that we can generate an access_token using it.
            $google_analytics = new PageFrog_GoogleAnalytics();
            $new_access_token = $google_analytics->generate_access_token_using( $data['google_analytics_refresh_token'] );
            if ( ! $new_access_token ) {
                add_settings_error( 'google_analytics_refresh_token', PageFrog_Analytics_Storage::OPTIONS_KEY, "Your account was not successfully authenticated. Please authenticate it." );
                $google_analytics_error_found = true;
            }
            // always keep the refresh token, even if it just failed to get an access_token so that we don't unnecessarily dump tokens that might still work
            // but didn't because the passthrough auth isn't turned on or something.
            $clean_data['google_analytics_refresh_token'] = $data['google_analytics_refresh_token'];
        }
        if ( isset( $data['google_analytics_site_id'] ) && PageFrog_Utils::string_isnt_empty( $data['google_analytics_site_id'] ) ) {
            if ( ! PageFrog_Utils::starts_with($data['google_analytics_site_id'], 'UA' ) ) {
                add_settings_error( 'google_analytics_site_id', PageFrog_Analytics_Storage::OPTIONS_KEY, "Google Analytics site ID's must begin with UA, please select a valid site." );
                $google_analytics_error_found = true;
            } else {
                $clean_data['google_analytics_site_id'] = $data['google_analytics_site_id'];
            }
        } else if ( ! $google_analytics_error_found && isset( $data['google_analytics_refresh_token'] ) ) {
            // the user just authorized their account, but hasn't selected a site to use to track their analytics. We need that information still.
            add_settings_error( 'google_analytics_site_id', PageFrog_Analytics_Storage::OPTIONS_KEY, "Please select the site that you would like to use to track your analytics." );
            $google_analytics_error_found = true;
        }
        if ( isset( $data['google_analytics_enabled'] ) && ( $data['google_analytics_enabled'] === true || $data['google_analytics_enabled'] == 'true' ) ) {
            if ( $google_analytics_error_found ) {
                $clean_data['google_analytics_enabled'] = 0;
            } else {
                $clean_data['google_analytics_enabled'] = 1;
            }
        } else {
            $clean_data['google_analytics_enabled'] = 0;
        }

        return $clean_data;
    }
}

PageFrog_Analytics_Storage::$DEFAULTS = array (
    'chartbeat_api_key' => '',
    'chartbeat_uid' => '',
    'chartbeat_enabled' => 0,
    'parsely_api_key' => '',
    'parsely_api_secret' => '',
    'parsely_enabled' => 0,
    'other_amp_analytics_code' => '',
    'other_fbia_analytics_code' => '',
    'other_analytics_enabled' => 0,
    'google_analytics_enabled' => 0,
    'google_analytics_access_token' => '',
    'google_analytics_refresh_token' => '',
    'google_analytics_site_id' => ''
);
?>