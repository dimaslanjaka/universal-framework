<?php

namespace KaliForms\Inc\Backend;

if (!defined('ABSPATH')) {
    exit;
}
use KaliForms\Inc\Backend\Plugin_Collision;

class Plugin_Health_Checks
{
    /**
     * Plugin slug
     *
     * @var string
     */
    public $slug = 'kaliforms';
    /**
     * Tests array
     *
     * @var array
     */
    public $tests = [];
    /**
     * Class constructor
     */
    public function __construct()
    {
        $this->set_tests();

        add_filter('site_status_tests', [$this, 'add_tests_to_page']);

        add_action('wp_ajax_kaliforms_test_email',
            [$this, 'test_email']
        );
        add_action('wp_ajax_nopriv_kaliforms_test_email',
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
     * Adds the tests in the site health page
     *
     * @param [array] $tests
     * @return array
     */
    public function add_tests_to_page($tests)
    {
        foreach ($this->tests as $k => $test) {
            $tests['direct'][$this->slug . '_' . $k] = $test;
        }

        return $tests;
    }
    /**
     * Set tests
     *
     * @return void
     */
    public function set_tests()
    {
        $tests = [
            'smtp_test' => [
                'label' => esc_html__('Kali Forms - SMTP Test', 'kaliforms'),
                'test' => [$this, 'test_smtp'],
            ],
            'plugin_collision' => [
                'label' => esc_html__('Kali Forms - Plugin Collision Test', 'kaliforms'),
                'test' => [$this, 'plugin_collision'],
            ],
        ];

        $this->tests = apply_filters($this->slug . '_plugin_health_checks', $tests);
    }
    /**
     * Plugin collision test
     *
     * @return void
     */
    public function plugin_collision()
    {
        $collision = new Plugin_Collision();
        $status = 'good';
        $label = esc_html__('Kali Forms - No plugin collision detected', 'kaliforms');
        $description = esc_html__('We check your WordPress installation for plugins that might interfere Kali Forms so you get the best experience', 'kaliforms');
        $actions = '';

        if (count($collision->activated_plugins) > 0) {
            $status = 'recommended';
            $label = esc_html__('Kali Forms - Plugin collision detected', 'kaliforms');
            $description = '<p>';
            $description .= vsprintf( // Translators: 1 is list of plugins, 2 is opening Anchor, 3 is closing.
                esc_html__('We noticed that the following plugins are active: %1$s. We recommend that you de-activate them so they don\'t interfere with Kali Forms. You can do it manually in the plugins page, or click the button below and we\'ll do it for you!', 'kaliforms'),
                [
                    implode(', ', $collision->activated_plugins_name),
                ]);
            $description .= '</p>';
            $actions = sprintf(
                '<p><a class="button button-primary" href="%s">%s</a></p>',
                esc_url($collision->create_url(true)),
                esc_html__('Deactivate Plugins', 'kaliforms')
            );
        }
        return $this->create_result(
            'plugin-collision',
            $label,
            $status,
            $description,
            [
                'label' => esc_html__('Performance', 'kaliforms'),
                'color' => 'blue',
            ],
            $actions
        );
    }
    /**
     * Test SMTP and show the result
     *
     * @return void
     */
    public function test_smtp()
    {
        $status = 'good';
        $label = esc_html__('Kali Forms - Email uses SMTP', 'kaliforms');
        $description = sprintf(
            '<p>%s</p>',
            esc_html__('This improves deliverability of emails.', 'kaliforms')
        );
        $actions = sprintf(
            '<p><a href="#" class="button button-primary" target="_blank" id="kaliforms-system-check-email-send">%s</a></p>',
            esc_html__('Test email sending', 'kaliforms')
        );
        $smtp = $this->is_smtp();
        if (!$smtp['status']) {
            $status = 'recommended';
            $label = esc_html__('Kali Forms - Emails don\'t use SMTP', 'kaliforms');

            switch ($smtp['reason']) {
                case 'no-host':
                    $description = sprintf(
                        '<p>%s</p>',
                        esc_html__('Use a dedicated SMTP server to improve deliverability of emails. Please check the Host field on our dedicated Email Settings page.', 'kaliforms')
                    );
                    break;
                case 'credentials':
                    $description = sprintf(
                        '<p>%s</p>',
                        esc_html__('Use a dedicated SMTP server to improve deliverability of emails. Please check the credentials added on our dedicated Email Settings page.', 'kaliforms')
                    );
                    break;
                default:
                    $description = sprintf(
                        '<p>%s</p>',
                        esc_html__('Use a dedicated SMTP server to improve deliverability of emails. It might be a misconfiguration on our dedicated Email Settings page.', 'kaliforms')
                    );
                    break;
            }

            $actions = sprintf(
                '<p><a href="%s" target="_blank">%s</a></p>',
                esc_url(admin_url('edit.php?post_type=kaliforms_forms&page=kaliforms-email-settings')),
                esc_html__('Use SMTP', 'kaliforms')
            );
        }

        return $this->create_result(
            'smtp',
            $label,
            $status,
            $description,
            [
                'label' => esc_html__('Improvement', 'kaliforms'),
                'color' => 'orange',
            ],
            $actions
        );
    }
    /**
     * Is SMTP check
     *
     * @return boolean
     */
    public function is_smtp()
    {
        $auth = get_option('kaliforms_smtp_auth', 0);
        $host = get_option('kaliforms_smtp_host', '');
        $port = get_option('kaliforms_smtp_port', '');
        $ssl = get_option('kaliforms_smtp_secure', 'None');
        $username = get_option('kaliforms_smtp_username', '');
        $password = get_option('kaliforms_smtp_password', '');

        if (empty($host)) {
            return ['status' => false, 'reason' => 'no-host'];
        }
        if ($auth !== 0 && (empty($username) || empty($password))) {
            return ['status' => false, 'reason' => 'credentials'];
        }

        return ['status' => true];
    }
    /**
     * Test email functionality
     *
     * @return void
     */
    public function test_email()
    {
        if (isset($_POST['args'], $_POST['args']['nonce'])
            && !wp_verify_nonce(sanitize_key(wp_unslash($_POST['args']['nonce'])), 'kaliforms_nonce')) {
            wp_die('Denied');
        }

        $_POST['args'] = stripslashes_deep($_POST['args']);
        $smtp = $this->is_smtp();

        add_filter('wp_mail_from_name', function () use ($props) {
            return get_bloginfo('name');
        });
        add_filter('wp_mail_from', function () use ($props) {
            return get_bloginfo('admin_email');
        });
        add_filter('wp_mail_content_type', function () use ($props) {
            return 'text/html';
        });

        if ($smtp['status']) {
            add_action('phpmailer_init', function ($phpmailer) use ($props) {
                $auth = get_option('kaliforms_smtp_auth', 0);
                $host = get_option('kaliforms_smtp_host', '');
                $port = get_option('kaliforms_smtp_port', '');
                $ssl = get_option('kaliforms_smtp_secure', 'None');
                $username = get_option('kaliforms_smtp_username', '');
                $password = get_option('kaliforms_smtp_password', '');

                $phpmailer->isSMTP();
                $phpmailer->Host = $host;
                $phpmailer->SMTPAuth = $auth === '1';
                $phpmailer->Port = absint($port);
                $phpmailer->SMTPSecure = strtolower($ssl);
                $phpmailer->Username = $username;
                $phpmailer->Password = $password;
                $phpmailer->From = $username;
                $phpmailer->FromName = get_bloginfo('name');
            });
        }

        $user = get_userdata($_POST['args']['userId']);
        $toEmail = $user->user_email;
        $subject = esc_html__('Kali Forms - Email sending test', 'kaliforms');
        $body = esc_html__('This is a test. Feel free to delete the message.', 'kaliforms');

        $sent = wp_mail($toEmail, $subject, $body);

        wp_die(wp_json_encode([
            'success' => true,
            'sent' => $sent,
        ]));
    }
    /**
     * Create a result array
     *
     * @param string $id
     * @param string $label
     * @param string $status
     * @param string $description
     * @param array $badge
     * @param string $actions
     * @return Array
     */
    private function create_result($id = '', $label = '', $status = 'good', $description = '', $badge = [], $actions = '')
    {
        return [
            'label' => $label,
            'status' => $status,
            'badge' => $badge,
            'description' => $description,
            'actions' => $actions,
            'test' => $this->slug . $id . '_test',
        ];
    }
}
