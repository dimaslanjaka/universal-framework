<?php

namespace KaliForms\Inc\Backend;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Hooks
 *
 * @package Inc\Backend
 */
class Hooks
{
    /**
     * Plugin slug
     *
     * @var string
     */
    protected $slug = 'kaliforms';

    /**
     * Plugin basic hooks
     * Hooks constructor.
     */
    public function __construct()
    {
        /**
         * Admin enqueue script
         */
        add_action(
            'admin_enqueue_scripts',
            [$this, 'admin_enqueue'],
            99
        );

        add_action(
            'plugins_loaded',
            [$this, 'load_text_domain']
        );

        /**
         * Add settings link to plugins page
         */
        add_filter(
            'plugin_action_links_kaliforms/kaliforms.php',
            [$this, 'add_settings_link']
        );

        add_action('wp_ajax_kaliforms_reload_api_extensions',
            [$this, 'reload_api_extensions']
        );
        add_action('wp_ajax_nopriv_kaliforms_reload_api_extensions',
            [$this, 'denied']
        );
    }
    /**
     * If the user is not authorized, deny action
     */
    public function denied()
    {
        wp_die(esc_html__('Denied', 'kaliforms'));
    }

    /**
     * Loads the plugin text domain
     */
    public function load_text_domain()
    {
        load_plugin_textdomain('kaliforms');
    }

    /**
     * Add settings link to plugin list table
     *
     * @param  array $links Existing links
     *
     * @return array        Modified links
     */
    public function add_settings_link($links)
    {
        /** @noinspection HtmlUnknownTarget */
        array_push(
            $links,
            sprintf(
                '<a href="%sedit.php?post_type=%s_forms">%s</a>',
                esc_url(get_admin_url()),
                $this->slug,
                esc_html__('Create your first form', 'kaliforms')
            )
        );

        return $links;
    }
    /**
     * Reloads extensions
     *
     * @return void
     */
    public function reload_api_extensions()
    {
        check_admin_referer('kaliforms_nonce', 'nonce');
        delete_transient('kaliforms_extensions');
        wp_die(json_encode(['status' => 'ok']));
    }

    /**
     * Enqueue files in the admin
     */
    public function admin_enqueue()
    {
        wp_enqueue_script(
            'kaliforms-general-scripts',
            KALIFORMS_URL . 'assets/general/js/general.js',
            ['jquery'],
            KALIFORMS_VERSION,
            true
        );

        wp_localize_script(
            'kaliforms-general-scripts',
            'KaliFormsGeneralObject',
            ['ajaxurl' => esc_url(admin_url('admin-ajax.php')), 'ajax_nonce' => wp_create_nonce($this->slug . '_nonce')]
        );

        // wp_register_script(
        //     'kaliforms-backend-component-vendor',
        //     KALIFORMS_URL . 'assets/backend/js/component-vendor.js',
        //     false,
        //     KALIFORMS_VERSION,
        //     true
        // );

        // wp_register_script(
        //     'kaliforms-backend-components',
        //     KALIFORMS_URL . 'assets/backend/js/components.js',
        //     ['kaliforms-backend-component-vendor'],
        //     KALIFORMS_VERSION,
        //     false
        // );

        wp_enqueue_style(
            'kaliforms-general',
            KALIFORMS_URL . 'assets/general/css/general.css',
            false,
            KALIFORMS_VERSION
        );

        wp_register_style(
            'kaliforms-roboto-font',
            '//fonts.googleapis.com/css?family=Roboto:300,400,500',
            false,
            KALIFORMS_VERSION
        );
    }
}
