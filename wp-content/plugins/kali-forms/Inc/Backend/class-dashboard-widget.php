<?php

namespace KaliForms\Inc\Backend;

if (!defined('ABSPATH')) {
    exit;
}

class Dashboard_Widget
{
    /**
     * Plugin slug
     *
     * @var string
     */
    public $slug = 'kaliforms';
    /**
     * Basic constructor
     */
    public function __construct()
    {
        add_action('wp_dashboard_setup', [$this, 'add_widgets']);
    }

    /**
     * Add widget
     *
     * @return void
     */
    public function add_widgets()
    {
        wp_add_dashboard_widget(
            $this->slug . '_dashboard_widget',
            esc_html__('WordPress Forms Made Easy - Kali Forms', 'kaliforms'),
            [$this, 'render_widget']
        );

        global $wp_meta_boxes;
        $default_dashboard = $wp_meta_boxes['dashboard']['normal']['core'];

        $widget_bkup = array($this->slug . '_dashboard_widget' => $default_dashboard[$this->slug . '_dashboard_widget']);
        unset($default_dashboard[$this->slug . '_dashboard_widget']);
        $sorted_dashboard = array_merge($widget_bkup, $default_dashboard);

        $wp_meta_boxes['dashboard']['normal']['core'] = $sorted_dashboard;
    }
	/**
	 * Renderer
	 *
	 * @return void
	 */
    public function render_widget()
    {
        $str = '';
        $str .= '<img src="' . KALIFORMS_URL . 'assets/img/logo--dark.svg" />';
        $str .= '<p>' . esc_html__('Meet Kali Forms. The powerful & user-friendly WordPress form plugin. Easily create powerful contact forms, payment forms, feedback forms and more for your website without the hassle.', 'kaliforms') . '</p>';
        $str .= '<p class="action-buttons"><a href="' . admin_url() . 'post-new.php?post_type=kaliforms_forms
" class="button button-primary" style="margin-right:10px">' . esc_html__('Create forms!', 'kaliforms') . '</a><a href="https://kaliforms.com/docs?utm_source=dashboardWidget&utm_campaign=userInterests&utm_medium=button
" class="button" target="_blank" style="margin-right:10px">' . esc_html__('Read the docs', 'kaliforms') . '</a><a href="https://kaliforms.com/pricing?utm_source=dashboardWidget&utm_campaign=userInterests&utm_medium=button" target="_blank" class="button button-primary">' . esc_html__('Upgrade to PRO', 'kaliforms') . '</a></p>';
        echo $str;
    }
}
