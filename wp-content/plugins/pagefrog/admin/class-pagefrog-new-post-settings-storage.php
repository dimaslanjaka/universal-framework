<?php 
/**
 * The file that provides access to the pagefrog settings.
 *
 * A class definition that can provide access to the saved preferences of the settings,
 * supplementing default values for where there are none saved.
 *
 * @link        http://pagefrog.com
 * @since       1.0.4
 *
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 */

/**
 * The class that provides access to the PageFrog settings.
 *
 * This is used to make sure that user-specified preferences are used where possible.
 *
 * @since       1.0.4
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 * @author      PageFrog Team <team@pagefrog.com>
 */
class PageFrog_NewPostSettings_Storage {
    /**
     * The array that stores all of the settings
     *
     * The pagefrog settings variable looks like this:
     *  array(
     *      'amp_enable_new_posts' => 0 or 1,
     *      'fbia_enable_new_posts' => 0 or 1
     *  )
     *
     * @since   1.0.4
     * @access  private
     * @var     array       A list of the saved settings values.
     */
    private $settings;

    /**
     * A variable that holds the defaults for all of the settings. Note that the DEFAULTS array
     * may not have a value for all post types (especially for custom post types), so you must be
     * careful to make sure it is available when requesting a specific post type.
     *
     * @since   1.0.4
     * @access  public
     * @var     array   DEFAULTS    A list of the variables available and their default value.
     */
    public static $DEFAULTS;

    /**
     * A variable to hold the string that is used to fetch and save the pagefrog settings.
     *
     * @since   1.0.4
     * @access  public
     * @var     string      The key used to access the values.
     */
    const OPTIONS_KEY = 'pagefrog_new_post_settings';

    /**
     * Set up the settings array right away.
     *
     * @since   1.0.4
     */
    public function __construct() {
        $this->settings = self::$DEFAULTS; // does not use references, so no worries that DEFAULTS will be poisoned
        $saved_options = get_option( self::OPTIONS_KEY );

        if ( ! $saved_options ) {
            $saved_options = array();
        }

        foreach( $saved_options as $key => $val ) {
            $this->settings[$key] = $val;
        }
    }

    /**
     * A bunch of simple getters.
     *
     * @since   1.0.4
     */
    public function get_amp_enable_new_posts_bool_for( $post_type_label ) {
        if ( isset( $this->settings['amp_enable_new_' . $post_type_label] ) ) {
            return $this->settings['amp_enable_new_' . $post_type_label] ? true : false;
        } else {
            return $this->settings['amp_enable_new_generic_post'] ? true : false;
        }
    }

    public function get_amp_enable_new_posts_string_for( $post_type_label ) {
        return $this->get_amp_enable_new_posts_bool_for( $post_type_label ) ? 'true' : 'false';
    }

    public function get_fbia_enable_new_posts_bool_for( $post_type_label ) {
        if ( isset( $this->settings['fbia_enable_new_' . $post_type_label] ) ) {
            return $this->settings['fbia_enable_new_' . $post_type_label] ? true : false;
        } else {
            return $this->settings['fbia_enable_new_generic_post'] ? true : false;
        }
    }

    public function get_fbia_enable_new_posts_string_for( $post_type_label ) {
        return $this->get_fbia_enable_new_posts_bool_for( $post_type_label ) ? 'true' : 'false';
    }

    public function get_amp_disable_other_plugins_bool() {
        return $this->settings['amp_disable_other_plugins'] ? true : false;
    }

    public function get_amp_disable_other_plugins_string() {
        return $this->get_amp_disable_other_plugins_bool() ? 'true' : 'false';
    }

    public function get_fbia_disable_other_plugins_bool() {
        return $this->settings['fbia_disable_other_plugins'] ? true : false;
    }

    public function get_fbia_disable_other_plugins_string() {
        return $this->get_fbia_disable_other_plugins_bool() ? 'true' : 'false';
    }

    public function get_amp_show_header_images_bool() {
        return $this->settings['amp_show_header_images'] ? true : false;
    }

    public function get_amp_show_header_images_string() {
        return $this->get_amp_show_header_images_bool() ? 'true' : 'false';
    }

    public function get_fbia_show_header_images_bool() {
        return $this->settings['fbia_show_header_images'] ? true : false;
    }

    public function get_fbia_show_header_images_string() {
        return $this->get_fbia_show_header_images_bool() ? 'true' : 'false';
    }

    /** This function is for TESTING ONLY. Do not call it **/
    public function __set_amp_disable_other_plugins( $val ) {
        if ( $val === true ) {
            $this->settings['amp_disable_other_plugins'] = 1;
        } else {
            $this->settings['amp_disable_other_plugins'] = 0;
        }
    }

    /** This function is for TESTING ONLY. Do not call it **/
    public function __get_settings() {
        return $this->settings;
    }

    /**
     * A convenience method to generate reliable data from the user-inputted values and provide
     * error reporting, if necessary.
     *
     * @since   1.0.4
     */
    public static function validate( $data ) {
        $clean_data = array();

        foreach ( $data as $key => $val ) {
            if ( PageFrog_Utils::starts_with( $key, 'amp_enable_new_' ) || PageFrog_Utils::starts_with( $key, 'fbia_enable_new_' ) ) {
                if ( $val === 'true' || $val === true ) {
                    $clean_data[$key] = 1;
                } else {
                    $clean_data[$key] = 0;
                }
            }
        }

        if ( isset( $data['amp_disable_other_plugins'] ) && PageFrog_Utils::string_isnt_empty( $data['amp_disable_other_plugins'] ) ) {
            if ( $data['amp_disable_other_plugins'] === 'true' || $data['amp_disable_other_plugins'] === true ) {
                $clean_data['amp_disable_other_plugins'] = 1;
            } else {
                $clean_data['amp_disable_other_plugins'] = 0;
            }
        }

        if ( isset( $data['fbia_disable_other_plugins'] ) && PageFrog_Utils::string_isnt_empty( $data['fbia_disable_other_plugins'] ) ) {
            if ( $data['fbia_disable_other_plugins'] === 'true' || $data['fbia_disable_other_plugins'] === true ) {
                $clean_data['fbia_disable_other_plugins'] = 1;
            } else {
                $clean_data['fbia_disable_other_plugins'] = 0;
            }
        }

        if ( isset( $data['amp_show_header_images'] ) && PageFrog_Utils::string_isnt_empty( $data['amp_show_header_images'] ) ) {
            if ( $data['amp_show_header_images'] === 'true' || $data['amp_show_header_images'] === true ) {
                $clean_data['amp_show_header_images'] = 1;
            } else {
                $clean_data['amp_show_header_images'] = 0;
            }
        }

        if ( isset( $data['fbia_show_header_images'] ) && PageFrog_Utils::string_isnt_empty( $data['fbia_show_header_images'] ) ) {
            if ( $data['fbia_show_header_images'] === 'true' || $data['fbia_show_header_images'] === true ) {
                $clean_data['fbia_show_header_images'] = 1;
            } else {
                $clean_data['fbia_show_header_images'] = 0;
            }
        }

        return $clean_data;
    }

    /**
     * A method to get all of the post_type objects that we will present to the user as an option
     * for us to operate on.
     *
     * @since 1.0.7
     */
    public static function get_post_types() {
        $post_types = get_post_types( array(
            'public' => true,
        ), 'objects' );
        unset( $post_types['attachment'] );
        return $post_types;
    }

}
PageFrog_NewPostSettings_Storage::$DEFAULTS = array(
    'amp_enable_new_generic_post' => 0,
    'fbia_enable_new_generic_post' => 0,
    'amp_enable_new_post' => 1,
    'fbia_enable_new_post' => 1,
    'amp_disable_other_plugins' => 0,
    'fbia_disable_other_plugins' => 0,
    'amp_show_header_images' => 1,
    'fbia_show_header_images' => 1
);
?>