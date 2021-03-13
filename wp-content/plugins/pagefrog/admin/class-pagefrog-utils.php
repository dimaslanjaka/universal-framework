<?php

/**
 * A collection of utilities.
 *
 * @link        http://pagefrog.com
 * @since       1.0.0
 *
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 */

/**
 * A class that allows for access to a bunch of utilities
 *
 * @since       1.0.0
 * @package     pagefrog
 * @subpackage  pagefrog/includes
 * @author      PageFrog Team <team@pagefrog.com>
 */
class PageFrog_Utils {
    /**
     * Does a string start with a set of characters?
     *
     * @since 1.0.0
     */
    public static function starts_with ( $string, $character ) {
        return $character === "" || strrpos($string, $character, -strlen($string)) !== false;
    }

    /**
     * Does a string end with a set of characters?
     *
     * @since 1.0.0
     */
    public static function ends_with ( $string, $character ) {
        return $character === "" || (($temp = strlen($string) - strlen($character)) >= 0 && strpos($string, $character, $temp) !== FALSE);
    }

    /**
     * Does a string contain a set of characters?
     *
     * @since   1.0.4
     */
    public static function contains( $string, $character ) {
        return strpos( $string, $character ) !== false;
    }

    /**
     * Does the string actually contain some characters?
     *
     * @since   1.0.4
     */
    public static function string_isnt_empty( $string ) {
        return $string !== null && strlen( $string ) > 0;
    }
}
?>