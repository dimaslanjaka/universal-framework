<?php 
/**
 * The file that provides access to the pagefrog ads settings.
 *
 * A class definition that can provide access to the saved preferences of the ads settings,
 * supplementing default values for where there are none saved.
 *
 * @link        http://pagefrog.com
 * @since       1.0.4
 *
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 */

/**
 * The class that provides access to the PageFrog ads settings.
 *
 * This is used to make sure that user-specified preferences are used where possible.
 *
 * @since       1.0.4
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 * @author      PageFrog Team <team@pagefrog.com>
 */
class PageFrog_AdSettings_Storage {
    /**
     * The array that stores all of the settings.
     *
     * The pagefrog ads settings variable looks like this:
     *  array(
     *      'fbia_enable_auto_ads' => 0 or 1,
     *      'fbia_placement_id' => 'string',
     *      'google_adsense_access_token' => 'string',
     *      'google_adsense_refresh_token' => 'string',
     *  )
     *
     * @since   1.0.4
     * @access  private
     * @var     array       A list of the saved ads settings values.
     */
    private $ads;

    private static $adsense_size_re = "/SIZE_(\d{2,3})_(\d{2,3})/";
    private static $adsense_adunit_id_re = "/([a-zA-Z]+-[a-zA-Z]+-\d+):(\d+)/";

    /**
     * A variable that holds the defaults for all of the settings.
     *
     * @since   1.0.4
     * @access  public
     * @var     array       DEFAULTS
     */
    public static $DEFAULTS;

    /**
     * A variable to hold the string that is used to fetch and save the pagefrog ad settings.
     *
     * @since   1.0.4
     * @access  public
     * @var     string      The key used to access the values.
     */
    const OPTIONS_KEY = 'pagefrog_ad_settings';

    /**
     * Set up the settings array right away.
     *
     * @since   1.0.4
     */
    public function __construct() {
        $this->ads = self::$DEFAULTS; // does not use references, so no worries that DEFAULTS will be poisoned.
        $saved_options = get_option( self::OPTIONS_KEY );
        foreach( $this->ads as $key => $val ) {
            if ( isset( $saved_options[$key] ) ) {
                $this->ads[$key] = $saved_options[$key];
            }
        }
    }

    /**
     * A bunch of simple getters.
     *
     * @since   1.0.4
     */
    public function get_fbia_enable_auto_ads_bool() {
        return $this->ads['fbia_enable_auto_ads'] ? true : false;
    }

    public function get_fbia_enable_auto_ads_string() {
        return $this->get_fbia_enable_auto_ads_bool() ? 'true' : 'false';
    }

    public function get_fbia_placement_id() {
        return $this->ads['fbia_placement_id'];
    }

    public function get_google_adsense_refresh_token() {
        return $this->ads['google_adsense_refresh_token'];
    }

    public function get_google_adsense_access_token() {
        return $this->ads['google_adsense_access_token'];
    }

    public function get_google_adsense_account_id() {
        return $this->ads['google_adsense_account_id'];
    }

    public function google_adsense_account_chosen() {
        return $this->get_google_adsense_account_id() !== '';
    }

    public function get_google_adsense_account_name() {
        return $this->ads['google_adsense_account_name'];
    }

    public function google_adsense_adunit_chosen() {
        return $this->get_google_adsense_adunit_id() !== '';
    }

    public function get_google_adsense_adunit_name() {
        return $this->ads['google_adsense_adunit_name'];
    }

    public function get_google_adsense_adunit_dimensions() {
        // returns something that looks like: SIZE_320_100
        return $this->ads['google_adsense_adunit_dimensions'];
    }

    public function get_google_adsense_adunit_width() {
        $dimensions_string = $this->get_google_adsense_adunit_dimensions();
        return self::parse_adsense_width_from( $dimensions_string );
    }

    public function get_google_adsense_adunit_height() {
        $dimensions_string = $this->get_google_adsense_adunit_dimensions();
        return self::parse_adsense_height_from( $dimensions_string );
    }

    public function get_google_adsense_adunit_id() {
        // returns something that looks like ca-pub-6112425685352351:2027818623
        return $this->ads['google_adsense_adunit_id'];
    }

    public function get_google_adsense_ad_client() {
        $adunit_id = $this->get_google_adsense_adunit_id();
        return self::parse_adsense_ad_client_from( $adunit_id );
    }

    public function get_google_adsense_ad_slot() {
        $adunit_id = $this->get_google_adsense_adunit_id();
        return self::parse_adsense_ad_slot_from($adunit_id);
    }

    public function get_amp_words_per_ad() {
        return $this->ads['amp_words_per_ad'];
    }

    public function get_amp_enable_google_adsense_bool() {
        return $this->ads['amp_enable_google_adsense'] ? true : false;
    }

    public function get_amp_enable_google_adsense_string() {
        return $this->get_amp_enable_google_adsense_bool() ? 'true' : 'false';
    }

    public static function parse_adsense_width_from( $dimensions_string ) {
        if ( PageFrog_Utils::starts_with( $dimensions_string, 'SIZE' ) ) {
            preg_match( PageFrog_AdSettings_Storage::$adsense_size_re, $dimensions_string, $matches );
            return $matches[1];
        } elseif ( PageFrog_Utils::starts_with( $dimensions_string, 'RESPONSIVE' ) ) {
            return 336; // for responsive sizes, default to 336 X 280
        } else {
            return 0;
        }
    }

    public static function parse_adsense_height_from( $dimensions_string ) {
        if ( PageFrog_Utils::starts_with( $dimensions_string, 'SIZE' ) ) {
            preg_match( PageFrog_AdSettings_Storage::$adsense_size_re, $dimensions_string, $matches );
            return $matches[2];
        } elseif ( PageFrog_Utils::starts_with( $dimensions_string, 'RESPONSIVE' ) ) {
            return 280; // for responsive sizes, default to 336 X 280
        } else {
            return 0;
        }
    }

    public static function parse_adsense_ad_client_from( $adunit_id ) {
        preg_match( PageFrog_AdSettings_Storage::$adsense_adunit_id_re, $adunit_id, $matches );
        if ( count( $matches ) === 3 ) {
            return $matches[1];
        } else {
            return '';
        }
    }

    public static function parse_adsense_ad_slot_from( $adunit_id ) {
        preg_match( PageFrog_AdSettings_Storage::$adsense_adunit_id_re, $adunit_id, $matches );
        if ( count( $matches ) === 3 ) {
            return $matches[2];
        } else {
            return '';
        }
    }

    /**
     * A convenience method to generate reliable data from the user-inputted values and provide error reporting,
     * if necessary.
     *
     * @since   1.0.4
     */
    public static function validate( $data ) {
        $clean_data = array();

        if ( isset( $data['fbia_placement_id'] ) ) {
            $clean_data['fbia_placement_id'] = $data['fbia_placement_id'];

            if ( isset( $data['fbia_enable_auto_ads'] ) ) {
                if ( $data['fbia_enable_auto_ads'] === 'true' || $data['fbia_enable_auto_ads'] === true ) {
                    $clean_data['fbia_enable_auto_ads'] = 1;
                } else {
                    $clean_data['fbia_enable_auto_ads'] = 0;
                }
            }
        }

        $google_adsense_error_found = false;
        if ( isset( $data['google_adsense_access_token'] ) && PageFrog_Utils::string_isnt_empty( $data['google_adsense_access_token'] ) ) {
            // the access_token is pretty transient and we really don't use the stored value (anytime we make an API call,
            // we use the refresh_token to fetch a new access token anyways, so just trust that it's a usable value).
            $clean_data['google_adsense_access_token'] = $data['google_adsense_access_token'];
        }
        if ( isset( $data['google_adsense_refresh_token'] ) && PageFrog_Utils::string_isnt_empty( $data['google_adsense_refresh_token'] ) ) {
            $google_adsense = new PageFrog_GoogleAdSense();
            $new_access_token = $google_adsense->generate_access_token_using( $data['google_adsense_refresh_token'] );
            if ( ! $new_access_token ) {
                add_settings_error( 'google_adsense_refresh_token', PageFrog_AdSettings_Storage::OPTIONS_KEY, "Your account was not successfully authenticated. Please authenticate it." );
                $google_adsense_error_found = true;
            }
            // always keep the refresh token, even if it just failed to get an access_token so that we don't unnecessarily dump tokens that might still work
            // but didn't because the passthrough auth isn't turned on or something.
            $clean_data['google_adsense_refresh_token'] = $data['google_adsense_refresh_token'];
        }

        $google_adsense_account_error_found = false;
        if ( isset( $data['google_adsense_account_id'] ) && PageFrog_Utils::string_isnt_empty( $data['google_adsense_account_id'] ) ) {
            if ( ! PageFrog_Utils::starts_with( $data['google_adsense_account_id'], 'pub-') ) {
                $google_adsense_account_error_found = true;
                add_settings_error( 'google_adsense_account_id', PageFrog_AdSettings_Storage::OPTIONS_KEY, "You must choose a valid AdSense account to use." );
            } elseif ( ! isset( $data['google_adsense_account_name']) || ! PageFrog_Utils::string_isnt_empty( $data['google_adsense_account_name'] ) ) {
                $google_adsense_account_error_found = true;
                add_settings_error( 'google_adsense_account_id', PageFrog_AdSettings_Storage::OPTIONS_KEY, "You must include the AdSense account name with the account ID. Please try again." );
            } else {
                $clean_data['google_adsense_account_id'] = $data['google_adsense_account_id'];
                $clean_data['google_adsense_account_name'] = $data['google_adsense_account_name'];
            }
        }

        $google_adsense_adunit_error_found = false;
        if ( isset( $data['google_adsense_adunit_id'] ) && PageFrog_Utils::string_isnt_empty( $data['google_adsense_adunit_id'] ) ) {
            if ( isset( $data['google_adsense_adunit_dimensions'] ) && PageFrog_Utils::string_isnt_empty( $data['google_adsense_adunit_dimensions'] ) ) {
                if ( PageFrog_Utils::starts_with( $data['google_adsense_adunit_dimensions'], 'SIZE_' ) || $data['google_adsense_adunit_dimensions'] === 'RESPONSIVE' ) {
                    $clean_data['google_adsense_adunit_dimensions'] = $data['google_adsense_adunit_dimensions'];
                    $clean_data['google_adsense_adunit_id'] = $data['google_adsense_adunit_id'];
                    if ( isset( $data['google_adsense_adunit_name'] ) && PageFrog_Utils::string_isnt_empty( $data['google_adsense_adunit_name'] ) ) {
                        $clean_data['google_adsense_adunit_name'] = $data['google_adsense_adunit_name'];
                    }
                } else {
                    add_settings_error( 'google_adsense_adunit_id', PageFrog_AdSettings_Storage::OPTIONS_KEY, "You must choose an Ad Unit with a valid set of dimensions." );
                    $google_adsense_adunit_error_found = true;
                }
            } else {
                add_settings_error( 'google_adsense_adunit_id', PageFrog_AdSettings_Storage::OPTIONS_KEY, "You must provide the Ad Unit dimensions as well as the Ad Unit ID." );
            }
        }

        $amp_words_per_ad_error_found = false;
        if ( isset( $data['amp_words_per_ad'] ) && PageFrog_Utils::string_isnt_empty( $data['amp_words_per_ad'] ) ) {
            if ( is_numeric( $data['amp_words_per_ad'] ) ) {
                $clean_data['amp_words_per_ad'] = $data['amp_words_per_ad'];
            } else {
                add_settings_error( 'amp_words_per_ad', PageFrog_AdSettings_Storage::OPTIONS_KEY, "You must specify a number." );
                $amp_words_per_ad_error_found = true;
            }
        }

        if ( isset( $data['amp_enable_google_adsense' ] ) && PageFrog_Utils::string_isnt_empty( $data['amp_enable_google_adsense'] ) ) {
            if ( $data['amp_enable_google_adsense'] === 'true' || $data['amp_enable_google_adsense'] === true ) {
                if ( isset( $clean_data['google_adsense_adunit_dimensions'] ) && isset( $clean_data['google_adsense_adunit_id'] ) && isset( $clean_data['amp_words_per_ad'] ) ) {
                    $clean_data['amp_enable_google_adsense'] = 1;
                } else {
                    $clean_data['amp_enable_google_adsense'] = 0;
                }
            } else {
                $clean_data['amp_enable_google_adsense'] = 0;
            }
        }

        return $clean_data;
    }
}
PageFrog_AdSettings_Storage::$DEFAULTS = array(
    'fbia_enable_auto_ads' => 0,
    'fbia_placement_id' => '',
    'google_adsense_refresh_token' => '',
    'google_adsense_access_token' => '',
    'google_adsense_account_id' => '',
    'google_adsense_account_name' => '',
    'google_adsense_adunit_name' => '',
    'google_adsense_adunit_dimensions' => '',
    'google_adsense_adunit_id' => '',
    'amp_enable_google_adsense' => 0,
    'amp_words_per_ad' => 250,
);
?>