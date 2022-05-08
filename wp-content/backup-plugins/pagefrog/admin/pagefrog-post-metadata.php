<?php

/**
 * The storage for the post metadata.
 *
 * @link        http://pagefrog.com
 * @since       1.0.0
 *
 * @package     PageFrog
 * @subpackage  PageFrog/admin
 */

/**
 * The storage for the post metadata.
 *
 * Defines an interface to the database to get, create, edit and delete
 * the status metadata for an article
 *
 * @package     PageFrag
 * @subpackage  PageFrog/admin
 * @author      PageFrog Team <team@pagefrog.com>
 */
class PageFrog_PostStatus {

    /**
    * A string that is used to identify the metadata for FBIA in the database.
    *
    * Note: there are unfortunately no ways to make a private class constant, so a public
    * constant was opted for instead of a private member.
    *
    * @since    1.0.0
    * @access   public
    * @var      string      They key used in the db.
    */
    const FBIA_STATUS_KEY = '_pagefrog_fbia_status';

    /**
    * A string that is used to identify the metadata for AMP in the database.
    *
    * Note: there are unfortunately no ways to make a private class constant, so a public
    * constant was opted for instead of a private member.
    *
    * @since    1.0.0
    * @access   public
    * @var      string      The key used in the db.
    */
    const AMP_STATUS_KEY = '_pagefrog_amp_status';

    /**
     * A boolean describing whether or not Facebook Instant Articles is on for this article.
     *
     * @since   1.0.0
     * @access  private
     * @var     boolean     $fbia_status    Instant Articles is turned on.
     */
    private $fbia_status;

    /**
    * A boolean describing whether or not AMP is on for this article.
    * @since    1.0.0
    * @access   private
    * @var      boolean     $amp_status     AMP is turned on.
    */
    private $amp_status;

    /**
     * The ID of the post that we want to access or edit data for.
     *
     * @since   1.0.0
     * @access  private
     * @var     int         $post_id        The ID of the post being managed.
     */
    private $post_id;

    /**
     * A boolean that indicates whether we are operating on a valid post or a random made-up id.
     *
     * @since   1.0.4.1
     * @access  private
     * @var     boolean     $valid_post     Whether or not the post is valid.
     */
    private $valid_post;


    /**
     * Initialize the class and set any necessary properties.
     *
     * @since   1.0.0
     * @param   int         $post_id        The ID of the post that will be handled.
     */
    function __construct( $post_id ) {
        $this->post_id = $post_id;
        $this->valid_post = get_post_status( $post_id ) !== false;
    }

    /**
    * Get the Facebook Instant Articles status for this article.
    *
    * @since    1.0.0
    */
    public function get_fbia_status() {
        $stored_status = get_post_meta( $this->post_id, self::FBIA_STATUS_KEY, true);
        if ( $stored_status === null || $stored_status === '' ) {
            $stored_status = true;
        } else if ( $stored_status === '1' || $stored_status === 1 ) {
            $stored_status = true;
        } else if ( $stored_status === '0' || $stored_status === 0) {
            $stored_status = false;
        }
        return $stored_status;
    }

    /**
    * Get the AMP status for this article.
    *
    * @since    1.0.0
    */
    public function get_amp_status() {
        $stored_status = get_post_meta( $this->post_id, self::AMP_STATUS_KEY, true);
        if ( $stored_status === null || $stored_status === '' ) {
            $stored_status = true;
        } else if ( $stored_status === '1' || $stored_status === 1 ) {
            $stored_status = true;
        } else if ( $stored_status === '0' || $stored_status === 0 ) {
            $stored_status = false;
        }
        return $stored_status;
    }

    /**
     * Set the Facebook Instant Articles status for this article.
     *
     * @since    1.0.0
     * @param    boolean     $status     True if the article should be turned on for FBIA.
     */
    public function set_fbia_status( $status ) {
        if ( $status !== true && $status !== false ) {
            // only allow booleans to be saved
            return false;
        }
        if ( ! $this->valid_post ) {
            // only write to valid posts
            return false;
        }

        $to_write = $status ? 1 : 0;

        add_post_meta( $this->post_id, self::FBIA_STATUS_KEY, $to_write, true ) or 
            update_post_meta( $this->post_id, self::FBIA_STATUS_KEY, $to_write );
        return true;
    }

    /**
     * Set the AMP status for this article.
     *
     * @since   1.0.0
     * @param   boolean     $status     True if the article should be turned on for AMP.
     */
    public function set_amp_status( $status ) {
        if ($status !== true && $status !== false) {
            // only allow booleans to be saved
            return false;
        }
        if ( ! $this->valid_post ) {
            // only write to valid posts
            return false;
        }

        $to_write = $status && wp_amp_plugin_is_installed() && wp_amp_plugin_is_active() ? 1 : 0;

        add_post_meta( $this->post_id, self::AMP_STATUS_KEY, $to_write, true ) or
            update_post_meta( $this->post_id, self::AMP_STATUS_KEY, $to_write );
        return true;
    }

    /**
     * A method to communicate to the outside world if the post is valid or no such post exists for the passed
     * in ID.
     *
     * @since   1.0.4.1
     */
    public function is_valid_post() {
        return $this->valid_post;
    }

    /**
     * A static method to get the total number of posts that the blog has published.
     *
     * @since   1.0.4
     */
    public static function get_post_count( $post_type ) {
        $args = array(
            'post_status' => 'publish'
        );

        if ( $post_type ) {
            $args['post_type'] = $post_type;
        }

        $query = new WP_Query( $args );
        return (int)$query->found_posts;
    }

    /**
     * A static method to get the total number of AMP enabled posts that the blog has published.
     *
     * @since   1.0.4
     */
    public static function get_amp_enabled_post_count( $post_type ) {
        $meta_query = array(
            'relation' => 'OR',
            array(
                'key' => PageFrog_PostStatus::AMP_STATUS_KEY,
                'value' => 1,
            ),
            array(
                'key' => PageFrog_PostStatus::AMP_STATUS_KEY,
                'compare' => 'NOT EXISTS',
                'value' => '' // to fix a wp bug: https://core.trac.wordpress.org/ticket/23268
            ),
            array(
                'key' => PageFrog_PostStatus::AMP_STATUS_KEY,
                'value' => '',
            )
        );
        $args = array(
            'meta_query' => $meta_query,
            'post_status' => 'publish'
        );

        if ( $post_type ) {
            $args['post_type'] = $post_type;
        }
        $query = new WP_Query( $args );
        return (int)$query->found_posts;
    }

    /**
    * A static method to get the total number of Instant Articles enabled posts that the blog has published.
    *
    * @since    1.0.4
    */
    public static function get_fbia_enabled_post_count( $post_type ) {
        $meta_query = array(
            'relation' => 'OR',
            array(
                'key' => PageFrog_PostStatus::FBIA_STATUS_KEY,
                'value' => 1,
            ),
            array(
                'key' => PageFrog_PostStatus::FBIA_STATUS_KEY,
                'compare' => 'NOT EXISTS',
                'value' => '' // to fix a wp bug: https://core.trac.wordpress.org/ticket/23268
            ),
            array(
                'key' => PageFrog_PostStatus::FBIA_STATUS_KEY,
                'value' => '',
            )
        );
        $args = array(
            'meta_query' => $meta_query,
            'post_status' => 'publish'
        );

        if ( $post_type ) {
            $args['post_type'] = $post_type;
        }
        $query = new WP_Query( $args );
        return (int)$query->found_posts;
    }

    /**
     * A static method to enable or disable AMP for all published articles.
     *
     * @since   1.0.4
     */
    public static function amp_set_all_published_posts( $enabled, $post_type ) {
        $meta_query = array(
            'relation' => 'OR',
            array(
                'key' => PageFrog_PostStatus::AMP_STATUS_KEY,
                'value' => 1
            ),
            array(
                'key' => PageFrog_PostStatus::AMP_STATUS_KEY,
                'compare' => 'NOT EXISTS',
                'value' => '' // to fix a wp bug: https://core.trac.wordpress.org/ticket/23268
            ),
            array(
                'key' => PageFrog_PostStatus::AMP_STATUS_KEY,
                'value' => '',
            )
        );

        if ( $enabled ) {
            // we are actually enabling the posts, so we need to select all the disabled ones to change
            $meta_query = array(
                array(
                    'key' => PageFrog_PostStatus::AMP_STATUS_KEY,
                    'value' => 0,
                )
            );
        }

        $full_args = array(
            'post_status' => 'publish',
            'meta_query' => $meta_query,
        );

        if ( $post_type ) {
            $full_args['post_type'] = $post_type;
        }

        $query = new WP_Query( $full_args );
        $posts = $query->get_posts();
        foreach( $posts as $post ) {
            $status = new PageFrog_PostStatus( $post->ID );
            $status->set_amp_status( $enabled ? true : false );
        }
    }

    /**
     * A static method to enable or disable FBIA for all published articles.
     *
     * @since   1.0.4
     */
    public static function fbia_set_all_published_posts( $enabled, $post_type ) {
        $meta_query = array(
            'relation' => 'OR',
            array(
                'key' => PageFrog_PostStatus::FBIA_STATUS_KEY,
                'value' => 1
            ),
            array(
                'key' => PageFrog_PostStatus::FBIA_STATUS_KEY,
                'compare' => 'NOT EXISTS',
                'value' => '' // to fix a wp bug: https://core.trac.wordpress.org/ticket/23268
            ),
            array(
                'key' => PageFrog_PostStatus::FBIA_STATUS_KEY,
                'value' => '',
            )
        );
        if ( $enabled ) {
            // we are actually enabling the posts, so we need to select all the disabled ones to change
            $meta_query = array(
                'relation' => 'OR',
                array(
                    'key' => PageFrog_PostStatus::FBIA_STATUS_KEY,
                    'value' => 0
                )
            );
        }

        $full_args = array(
            'post_status' => 'publish',
            'meta_query' => $meta_query,
        );

        if ( $post_type ) {
            $full_args['post_type']  = $post_type;
        }

        $query = new WP_Query( $full_args );
        $posts = $query->get_posts();
        foreach( $posts as $post ) {
            $status = new PageFrog_PostStatus( $post->ID );
            $status->set_fbia_status( $enabled ? true : false );
        }
    }
}

?>