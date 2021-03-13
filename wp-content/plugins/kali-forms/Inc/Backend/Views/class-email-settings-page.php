<?php

namespace KaliForms\Inc\Backend\Views;

if (!defined('WPINC')) {
    die;
}

/**
 * Class Email_Settings_Page
 *
 * @package Inc\Backend\Views
 */
class Email_Settings_Page
{
    /**
     * Plugin slug
     *
     * @var string
     */
    protected $slug = 'kaliforms';
    /**
     * Extensions_Page constructor.
     */
    public function __construct()
    {
        add_action('admin_init', [$this, 'register_settings']);
        /**
         * Admin enqueue script
         */
        add_action(
            'admin_enqueue_scripts',
            [$this, 'admin_enqueue'],
            99
        );
    }
    /**
     * Enqueue files in the admin
     */
    public function admin_enqueue()
    {
        $screen = get_current_screen();
        if ('kaliforms_forms' === $screen->post_type && 'kaliforms_forms_page_kaliforms-email-settings' === $screen->base) {
            wp_enqueue_script(
                'kaliforms-email-settings-scripts',
                KALIFORMS_URL . 'assets/email-settings/js/emailSettings.js',
                [],
                KALIFORMS_VERSION,
                true
            );
            wp_localize_script(
                'kaliforms-email-settings-scripts',
                'KaliFormsEmailSettingsObject',
                [
                    'ajaxurl' => esc_url(admin_url('admin-ajax.php')),
                    'ajax_nonce' => wp_create_nonce($this->slug . '_nonce'),
                    'translations' => [
                        'logInfo' => esc_html__('Log will appear after page refresh if this is checked', 'kaliforms'),
                    ],
                ]
            );
            wp_enqueue_style(
                'kaliforms-email-settings',
                KALIFORMS_URL . 'assets/email-settings/css/emailSettings.css',
                false,
                KALIFORMS_VERSION
            );
        }

    }

    /**
     * Registers smtp settings
     *
     * @return void
     */
    public function register_settings()
    {
        register_setting($this->slug . '_email_settings', $this->slug . '_smtp_provider', 'sanitize_text_field');
        register_setting($this->slug . '_email_settings', $this->slug . '_smtp_host', 'sanitize_text_field');
        register_setting($this->slug . '_email_settings', $this->slug . '_smtp_auth', 'KaliForms\Inc\Backend\Sanitizers::sanitize_regular_checkbox');
        register_setting($this->slug . '_email_settings', $this->slug . '_smtp_advanced', 'KaliForms\Inc\Backend\Sanitizers::sanitize_regular_checkbox');
        register_setting($this->slug . '_email_settings', $this->slug . '_smtp_port', 'absint');
        register_setting($this->slug . '_email_settings', $this->slug . '_smtp_secure', 'KaliForms\Inc\Backend\Sanitizers::sanitize_secure_options');
        register_setting($this->slug . '_email_settings', $this->slug . '_smtp_username', 'sanitize_text_field');
        register_setting($this->slug . '_email_settings', $this->slug . '_smtp_password', 'sanitize_text_field');
        register_setting($this->slug . '_email_settings', $this->slug . '_email_fail_log', 'KaliForms\Inc\Backend\Sanitizers::sanitize_regular_checkbox');
    }

    /**
     * Renders app
     */
    public function render_app()
    {
        echo '<div class="wrap">';
        echo '<div id="kaliforms-email-settings-page">';
        $this->generate_html();
        echo '</div>';
        echo '</div>';
    }

    /**
     * Invoking the class will render the app
     */
    public function __invoke()
    {
        /**
         * Initiate an action before rendering the app div
         */
        do_action($this->slug . '_before_email_settings_page_rendering');

        /**
         * Echo the container
         */
        $this->render_app();

        /**
         * Initiate an action after rendering the app div
         */
        do_action($this->slug . '_after_email_settings_page_rendering');
    }

    /**
     * Generates the page html
     *
     * @return void
     */
    public function generate_html()
    {
        echo '<h2>' . esc_html__('Email Settings', 'kaliforms') . '</h2>';
        settings_errors();
        echo '<form method="post" action="options.php">';
        settings_fields($this->slug . '_email_settings');
        $this->predefined_options();
        echo '<table class="form-table">';
        echo '<tbody>';
        $this->advanced_options();
        $this->host_field();
        $this->port_field();
        $this->secure_field();
        $this->auth_field();
        $this->username_field();
        $this->password_field();
        $this->fail_log();
        $this->submit_button();
        echo '</tbody>';
        echo '</table>';
        wp_nonce_field($this->slug . '_email_settings_nonce', $this->slug . '_email_settings_nonce');
        echo '</form>';
    }

    /**
     * Returns predefined options
     *
     * @return string
     */
    public function predefined_options()
    {
        $predefined = get_option($this->slug . '_smtp_provider', 'phpmailer');

        $options = [
            'phpmailer' => KALIFORMS_URL . 'assets/img/phpmailer.png',
            'gmail' => KALIFORMS_URL . 'assets/img/gmail.png',
            'mandrill' => KALIFORMS_URL . 'assets/img/mandrill.png',
            'mailgun' => KALIFORMS_URL . 'assets/img/mailgun.png',
            'sendgrid' => KALIFORMS_URL . 'assets/img/sendgrid.png',
        ];
        $str = '<div class="email-settings-importer">';
        foreach ($options as $option => $logo) {
            $selected = $option === $predefined ? 'active' : '';
            $str .= '<a href="#" id="' . $option . '-email-settings" class="email-settings-import ' . $selected . '" data-predefined-option="' . $option . '"><img src="' . $logo . '" /></a> ';
        }
        $str .= '<input type="hidden" id="' . $this->slug . '_smtp_provider" name="' . $this->slug . '_smtp_provider" value="' . esc_attr($predefined) . '" />';
        $str .= '</div>';
        echo $str;
    }
    /**
     * Host field
     */
    public function advanced_options()
    {
        $advanced = get_option($this->slug . '_smtp_advanced', 1);
        $this->advanced = $advanced;
        echo '<tr valign="top">';
        echo '<th scope="row" valign="top">';
        echo esc_html__('Custom settings', 'kaliforms');
        echo '</th>';
        echo '<td>';
        echo '<input type="checkbox" ' . checked($advanced, '1', false) . ' id="' . $this->slug . '_smtp_advanced" name="' . $this->slug . '_smtp_advanced" />';
        echo '</td>';
        echo '</tr>';
    }
    /**
     * Host field
     */
    public function host_field()
    {
        $host = get_option($this->slug . '_smtp_host', '');
        $style = $this->advanced ? '' : 'hidden';
        echo '<tr valign="top" class="advanced ' . $style . '">';
        echo '<th scope="row" valign="top">';
        echo esc_html__('Host', 'kaliforms');
        echo '</th>';
        echo '<td>';
        echo '<input type="text" id="' . $this->slug . '_smtp_host" name="' . $this->slug . '_smtp_host" class="regular-text" value="' . esc_attr($host) . '"/>';
        // echo '<label class="description" for="'.$this->slug.'_smtp_host">' . esc_html__('Add your smtp host here', 'kaliforms') . '</label>';
        echo '</td>';
        echo '</tr>';
    }

    public function auth_field()
    {
        $auth = get_option($this->slug . '_smtp_auth', 0);
        echo '<tr valign="top">';
        echo '<th scope="row" valign="top">';
        echo esc_html__('Authentication', 'kaliforms');
        echo '</th>';
        echo '<td>';
        echo '<input type="checkbox" ' . checked($auth, '1', false) . ' id="' . $this->slug . '_smtp_auth" name="' . $this->slug . '_smtp_auth" />';
        // echo '<label class="description" for="'.$this->slug.'_smtp_auth">' . esc_html__('Add your smtp auth here', 'kaliforms') . '</label>';
        echo '</td>';
        echo '</tr>';
    }
    public function fail_log()
    {
        $fail_log = get_option($this->slug . '_email_fail_log', 0);
        $style = $this->advanced ? '' : 'hidden';
        echo '<tr valign="top" class="advanced ' . $style . '">';

        echo '<th scope="row" valign="top">';
        echo esc_html__('Enable debug log', 'kaliforms');
        echo '</th>';
        echo '<td>';
        echo '<input type="checkbox" ' . checked($fail_log, '1', false) . ' id="' . $this->slug . '_email_fail_log" name="' . $this->slug . '_email_fail_log" />';
        echo '</td>';
        echo '</tr>';

        $file = get_temp_dir() . $this->slug . '-mail.log';
        if (checked($fail_log, '1', false) && file_exists($file)) {
            $log_content = file_get_contents($file);
            echo '<tr valign="top" id="' . $this->slug . '_fail_log" class="advanced ' . $style . '">';
            echo '<th scope="row" valign="top">';
            echo esc_html__('Log ', 'kaliforms') . '<em>' . get_temp_dir() . $this->slug . '-mail.log' . '</em>';
            echo '</th>';
            echo '<td>';
            echo '<textarea rows="8" readonly class="regular-text">' . $log_content . '</textarea>';
            echo '</td>';
            echo '</tr>';
        }
    }
    public function port_field()
    {
        $port = get_option($this->slug . '_smtp_port', '');
        $style = $this->advanced ? '' : 'hidden';
        echo '<tr valign="top" class="advanced ' . $style . '">';
        echo '<th scope="row" valign="top">';
        echo esc_html__('Port', 'kaliforms');
        echo '</th>';
        echo '<td>';
        echo '<input type="number" id="' . $this->slug . '_smtp_port" name="' . $this->slug . '_smtp_port" class="regular-text" value="' . absint($port) . '"/>';
        // echo '<label class="description" for="'.$this->slug.'_smtp_port">' . esc_html__('Add your smtp port here', 'kaliforms') . '</label>';
        echo '</td>';
        echo '</tr>';

    }
    public function secure_field()
    {
        $ssl = get_option($this->slug . '_smtp_secure', 'None');
        $options = ['None', 'SSL', 'TLS', 'STARTTLS'];
        $style = $this->advanced ? '' : 'hidden';
        echo '<tr valign="top" class="advanced ' . $style . '">';
        echo '<th scope="row" valign="top">';
        echo esc_html__('Secure connection', 'kaliforms');

        echo '</th>';
        echo '<td>';
        echo '<select class="regular-text" id="' . $this->slug . '_smtp_secure" name="' . $this->slug . '_smtp_secure" value="' . esc_attr($ssl) . '">';
        foreach ($options as $option) {
            echo '<option value="' . esc_attr($option) . '" ' . selected($ssl, $option, false) . '>' . esc_html($option) . '</option>';
        }
        echo '</select>';
        // echo '<label class="description" for="'.$this->slug.'_smtp_secure">' . esc_html__('Add your smtp port here', 'kaliforms') . '</label>';
        echo '</td>';
        echo '</tr>';

    }
    public function username_field()
    {
        $username = get_option($this->slug . '_smtp_username', '');
        echo '<tr valign="top">';
        echo '<th scope="row" valign="top">';
        echo esc_html__('Username', 'kaliforms');
        echo '</th>';
        echo '<td>';
        echo '<input type="text" value="' . esc_attr($username) . '" id="' . $this->slug . '_smtp_username" name="' . $this->slug . '_smtp_username" class="regular-text"/>';
        // echo '<label class="description" for="'.$this->slug.'_smtp_username">' . esc_html__('Add your smtp username here', 'kaliforms') . '</label>';
        echo '</td>';
        echo '</tr>';

    }
    public function password_field()
    {
        $password = get_option($this->slug . '_smtp_password', '');
        echo '<tr valign="top" >';
        echo '<th scope="row" valign="top">';
        echo esc_html__('Password', 'kaliforms');
        echo '</th>';
        echo '<td>';
        echo '<input type="password" value="' . esc_attr($password) . '" id="' . $this->slug . '_smtp_password" name="' . $this->slug . '_smtp_password" class="regular-text"/>';
        // echo '<label class="description" for="'.$this->slug.'_smtp_password">' . esc_html__('Add your smtp password here', 'kaliforms') . '</label>';
        echo '</td>';
        echo '</tr>';
    }
    public function submit_button()
    {
        echo '<tr valign="top">';
        echo '<th scope="row" valign="top">';
        echo esc_html__('Save options', 'kaliforms');
        echo '</th>';
        echo '<td>';
        echo '<input type="submit" class="button-secondary" id="' . $this->slug . '_smtp_submit" name="' . $this->slug . '_smtp_submit" value="' . esc_html__('Save', 'kaliforms') . '"/>';
        echo '</td>';
        echo '</tr>';
    }
}
