<?php

/**
 * The file that provides access to the styling settings.
 *
 * A class definition that can provide access to saved preferences, supplementing
 * default values for where there are none saved.
 *
 * @link        http://pagefrog.com
 * @since       1.0.0
 *
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 */

/**
 * The class that provides access to the styling settings.
 *
 * This is used to make sure that user-specified values are used. If no
 * user-specified styling values are available, defaults are supplemented.
 *
 * @since       1.0.0
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 * @author      PageFrog Team <team@pagefrog.com>
 */

class PageFrog_Styling_Storage {

    /**
     * The array that stores the styles.
     *
     * The pagefrog styles variable looks like this:
     *  array(
     *      logo_img => a url to the logo
     *      id_bar_type => either 'solid' or 'line'
     *      id_bar_color => a valid color for the id bar
     *      title_font_family => a valid font family
     *      title_font_color => a valid color for the title font
     *      headings_font_family => a valid font family
     *      headings_font_color => a valid color for headings
     *      body_text_font_family => a valid font family
     *      body_text_font_color => a valid color for the body text
     *      link_decoration => 'underline' or 'none'
     *      link_color => a valid color for links
     *      quotes_font_family => a valid font family
     *      quotes_font_color => a valid color for quotes (pull and block)
     *      footer_text_font_family => a valid font family
     *      footer_text_font_color => a valid color for the footer text
     *  )
     *
     *
     * @since   1.0.0
     * @access  private
     * @var     array       $styles     A list of the styles available.
     */
    private $styles;

    /**
     * The attachment information for the logo image.
     *
     * @since   1.0.0
     * @access  private
     * @var     array      $logo_metadata   The metadata object provided by Wordpress. If no logo has been selected, it will be False.
     */
    private $logo_metadata;


    /**
     * a variable that holds the defaults for all the styles.
     *
     * @since    1.0.0
     * @access   public
     * @var      array       DEFAULTS    A list of the styles available and their defaults.
     */
    public static $DEFAULTS;

    /**
     * A variable to hold the string that is used to fetch and save the pagefrog style settings.
     *
     * @since   1.0.0
     * @access  public
     * @var     string      OPTIONS_KEY     The key to access the settings
     */
    const OPTIONS_KEY =  'pagefrog_settings';

    /**
     * A variable to hold a list of all the valid fonts that could be chosen.
     *
     * @since   1.0.0
     * @access  public
     * @var     array       $VALID_FONTS     An array of all the valid font options
     */
    public static $VALID_FONTS;

    /**
     * Set up the styles array right away.
     *
     * @since   1.0.0
     */
    public function __construct() {
        $this->styles = self::$DEFAULTS; // does not use references, so no worries that DEFAULTS will be poisoned
        $saved_options = get_option(self::OPTIONS_KEY);
        foreach ($this->styles as $key => $val) {
            if (isset($saved_options[$key])) {
                $this->styles[$key] = $saved_options[$key];
            }
        }
        if ($this->styles['logo_img'] == -1) {
            $logo_metadata = False;
        } else {
            $this->logo_metadata = wp_get_attachment_metadata($this->styles['logo_img']);
        }
    }

    /**
     * A bunch of simple getters.
     *
     * @since 1.0.0
     */
    public function get_logo_img_id() {
        return $this->styles['logo_img'];
    }

    public function get_logo_img_url() {
        $url = wp_get_attachment_url( $this->styles['logo_img'] );
        if ($url !== false) {
            return $url;
        } else {
            return plugin_dir_url(__FILE__) . 'images/small_logo.png';
        }
    }

    public function get_logo_img_height() {
        if ($this->logo_metadata) {
            return $this->logo_metadata['height'];
        } else {
            list($width, $height) = getimagesize(plugin_dir_path(__FILE__) . 'images/small_logo.png');
            return $height;
        }
    }

    public function get_logo_img_width() {
        if ($this->logo_metadata) {
            return $this->logo_metadata['width'];
        } else {
            list($width, $height) = getimagesize(plugin_dir_path(__FILE__) . 'images/small_logo.png');
            return $width;
        }
    }

    public function get_id_bar_type() {
        return $this->styles['id_bar_type'];
    }

    public function get_id_bar_color() {
        return $this->styles['id_bar_color'];
    }

    public function get_id_bar_font_color() {
        $id_bar_color = $this->styles['id_bar_color'];
        $id_bar_type = $this->styles['id_bar_type'];
        if ( $id_bar_type == 'line' ) {
            return '#000';
        } else {
            if ( PageFrog_Utils::starts_with( $id_bar_color, '#' ) ) {
                $id_bar_color = str_replace( "#", "", $id_bar_color );
                if ( strlen( $id_bar_color ) === 3 ) {
                    $r = hexdec( substr( $id_bar_color, 0, 1 ) . substr( $id_bar_color, 0, 1 ) );
                    $g = hexdec( substr( $id_bar_color, 1, 1 ) . substr( $id_bar_color, 1, 1 ) );
                    $b = hexdec( substr( $id_bar_color, 2, 1 ) . substr( $id_bar_color, 2, 1 ) );
                    return $this->opposite_white_or_black( $r, $g, $b );
                } else if ( strlen( $id_bar_color ) === 6 ) {
                    $r = hexdec( substr( $id_bar_color, 0, 2 ) );
                    $g = hexdec( substr( $id_bar_color, 2, 2 ) );
                    $b = hexdec( substr( $id_bar_color, 4, 2 ) );
                    return $this->opposite_white_or_black( $r, $g, $b );
                } else {
                    return '#000';
                }
            } else {
                return '#000';
            }
        }
    }

    public function get_title_font_family() {
        return $this->styles['title_font_family'];
    }

    public function get_title_font_color() {
        return $this->styles['title_font_color'];
    }

    public function get_headings_font_family() {
        return $this->styles['headings_font_family'];
    }

    public function get_headings_font_color() {
        return $this->styles['headings_font_color'];
    }

    public function get_body_text_font_family() {
        return $this->styles['body_text_font_family'];
    }

    public function get_body_text_font_color() {
        return $this->styles['body_text_font_color'];
    }

    public function get_link_decoration() {
        return $this->styles['link_decoration'];
    }

    public function get_link_color() {
        return $this->styles['link_color'];
    }

    public function get_quotes_font_family() {
        return $this->styles['quotes_font_family'];
    }

    public function get_quotes_font_color() {
        return $this->styles['quotes_font_color'];
    }

    public function get_footer_text_font_family() {
        return $this->styles['footer_text_font_family'];
    }

    public function get_footer_text_font_color() {
        return $this->styles['footer_text_font_color'];
    }

    private static function opposite_white_or_black( $r, $g, $b ) {
        $sum = $r + $g + $b;
        if ( $sum < 382.5 ) { // this is half of the total possible (aka 255 * 3 / 2)
            return '#fff';
        } else {
            return '#000';
        }
    }

    /**
     * A convenience method to add an opacity to a color (will output an rgba value).
     *
     * @since 1.0.0
     */
    public static function hex_color_with_opacity($color, $opacity) {
        // make sure it is hex first. If not, just return it.
        if ( ! PageFrog_Utils::starts_with( $color, '#' ) && ( strlen( $color ) !== 4 || strlen( $color ) !== 7 ) ) {
            return $color;
        }

        $hex = str_replace( "#", "", $color );
        $hex = str_replace( " ", "", $hex );
        if ( strlen( $hex ) == 3 ) {
            $r = hexdec( substr( $hex, 0, 1 ) . substr( $hex, 0, 1 ) );
            $g = hexdec( substr( $hex, 1, 1 ) . substr( $hex, 1, 1 ) );
            $b = hexdec( substr( $hex, 2, 1 ) . substr( $hex, 2, 1 ) );
        } else {
            $r = hexdec( substr( $hex, 0, 2 ) );
            $g = hexdec( substr( $hex, 2, 2 ) );
            $b = hexdec( substr( $hex, 4, 2 ) );
        }
        $rgba = array( $r, $g, $b, 1 - $opacity );
        return "rgba(" . implode( ", ", $rgba ) . ")";
    }

    /**
     * A convenience method to generate reliable data from a combination
     * of defaults and the data passed in that can be saved to the db.
     *
     * @since 1.0.0
     */
    public static function validate( $data ) {
        // start with the defaults and then change the values if they are valid on the way in
        $clean_options = self::$DEFAULTS;

        // logo
        if (isset($data['logo_img']) && $data['logo_img'] !== "-1" && $data['logo_img'] !== -1 && wp_get_attachment_image((int)$data['logo_img']) !== '') {
            $clean_options['logo_img'] = (int)$data['logo_img'];
        }

        // id_bar_type
        if (isset($data['id_bar_type']) && $data['id_bar_type'] == 'line' || $data['id_bar_type'] == 'solid') {
            $clean_options['id_bar_type'] = $data['id_bar_type'];
        }

        // id_bar_color
        if (isset($data['id_bar_color']) && self::is_valid_color($data['id_bar_color'])) {
            $clean_options['id_bar_color'] = $data['id_bar_color'];
        }

        // title font family
        if(isset($data['title_font_family']) && self::is_valid_font_family($data['title_font_family'])) {
            $clean_options['title_font_family'] = $data['title_font_family'];
        }

        // title font color
        if(isset($data['title_font_color']) && self::is_valid_color($data['title_font_color'])) {
            $clean_options['title_font_color'] = $data['title_font_color'];
        }

        // headings font family
        if (isset($data['headings_font_family']) && self::is_valid_font_family($data['headings_font_family'])) {
            $clean_options['headings_font_family'] = $data['headings_font_family'];
        }

        // headings font color
        if (isset($data['headings_font_color']) && self::is_valid_color($data['headings_font_color'])) {
            $clean_options['headings_font_color'] = $data['headings_font_color'];
        }

        // body text font family
        if (isset($data['body_text_font_family']) && self::is_valid_font_family($data['body_text_font_family'])) {
            $clean_options['body_text_font_family'] = $data['body_text_font_family'];
        }

        // body text font color
        if (isset($data['body_text_font_color']) && self::is_valid_color($data['body_text_font_color'])) {
            $clean_options['body_text_font_color'] = $data['body_text_font_color'];
        }

        // link decoration
        if (isset($data['link_decoration']) && $data['link_decoration'] == 'underline' || $data['link_decoration'] == 'none') {
            $clean_options['link_decoration'] = $data['link_decoration'];
        }

        // link color
        if (isset($data['link_color']) && self::is_valid_color($data['link_color'])) {
            $clean_options['link_color'] = $data['link_color'];
        }

        // quotes font family
        if (isset($data['quotes_font_family']) && self::is_valid_font_family($data['quotes_font_family'])) {
            $clean_options['quotes_font_family'] = $data['quotes_font_family'];
        }

        // quotes font color
        if (isset($data['quotes_font_color']) && self::is_valid_color($data['quotes_font_color'])) {
            $clean_options['quotes_font_color'] = $data['quotes_font_color'];
        }

        // footer text font family
        if (isset($data['footer_text_font_family']) && self::is_valid_font_family($data['footer_text_font_family'])) {
            $clean_options['footer_text_font_family'] = $data['footer_text_font_family'];
        }

        // footer text font color
        if (isset($data['footer_text_font_color']) && self::is_valid_color($data['footer_text_font_color'])) {
            $clean_options['footer_text_font_color'] = $data['footer_text_font_color'];
        }

        return $clean_options;
    }

    private static function is_valid_font_family ( $family ) {
        foreach (self::$VALID_FONTS as $font) {
            if ($font == $family) {
                return true;
            }
        }
        return false;
    }

    private static function is_valid_color ($color) {
        $color = strtolower($color);
        if (PageFrog_Utils::starts_with($color, '#')) { // the color must be something like #123 or #123abc
            if (strlen($color) == 4 || strlen($color) == 7) {
                for ($i = 1; $i < strlen($color); $i++) {
                    $char = substr($color, $i, 1);
                    if (strpos('0123456789abcdefABCDEF', $char) === false) {
                        return false;
                    }
                }
                return true;
            }
        } else if (PageFrog_Utils::starts_with($color, 'rgb')) { // the color must be something like rgb(0,0,0) or rgba(0,0,0,0.0)
            $re = "/^rgba?\\s*?\\(\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*\\d+\\s*(,\\s*\\d+\\.?\\s*\\d*\\s*)?\\)\\s*$/";
            if (preg_match($re, $color)) {
                return true;
            }
        } else if (PageFrog_Utils::starts_with($color, 'hsl')) { // the color must be something like hsl(0, 0%, 0%) or hsla(0, 0%, 0%, 0.0)
            $re = "/^hsla?\\s*?\\(\\s*\\d+\\s*,\\s*\\d+%\\s*,\\s*\\d+%\\s*(,\\s*\\d+\\.?\\s*\\d*\\s*)?\\)$/";
            if (preg_match($re, $color)) {
                return true;
            }
        }
        return false;
    }
}
// initialize the defaults right away!
PageFrog_Styling_Storage::$DEFAULTS = array (
    'logo_img' => -1,
    'id_bar_type' => 'line',
    'id_bar_color' => '#444444',
    'title_font_family' => 'sans-serif',
    'title_font_color' => '#333',
    'headings_font_family' => 'sans-serif',
    'headings_font_color' => '#333',
    'body_text_font_family' => 'sans-serif',
    'body_text_font_color' => '#333',
    'link_decoration' => 'underline',
    'link_color' => '#0073aa',
    'quotes_font_family' => 'sans-serif',
    'quotes_font_color' => '#333',
    'footer_text_font_family' => 'sans-serif',
    'footer_text_font_color' => '#333'
);

PageFrog_Styling_Storage::$VALID_FONTS = array (
    'sans-serif',
    'serif'
);
?>