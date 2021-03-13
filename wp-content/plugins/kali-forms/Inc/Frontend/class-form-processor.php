<?php
namespace KaliForms\Inc\Frontend;

use KaliForms\Inc\Utils\Emailer;
use KaliForms\Inc\Utils\FileManager;
use KaliForms\Inc\Utils\GeneralPlaceholders;
use KaliForms\Inc\Utils\MetaHelper;

if (!defined('WPINC')) {
    die;
}

/**
 * Form processor class
 *
 * @todo
 *  1. Separate concerns into smaller classes (easier to maintain)
 *  2. Move payment stuff to the plugin
 *     3. Create a form process hook/filter logic so we dont have to edit this class anymore (concern separation 1.).
 */
class Form_Processor
{
    /**
     * We need the meta helper class to get values from the post
     */
    use MetaHelper, FileManager;
    /**
     * Form data ( custom post type kaliforms )
     *
     * @var [WP_Post]
     */
    public $post = null;
    /**
     * Data that we get from $_POST ( what's sent from the frontend )
     *
     * @var array
     */
    public $data = [];
    /**
     * Did we save the submission in the database?
     *
     * @var boolean
     */
    public $saved = false;
    /**
     * Easier to replace variables
     *
     * @var array
     */
    public $placeholdered_data = [];
    /**
     * Plugin slug
     *
     * @var string
     */
    public $slug = 'kaliforms';
    /**
     * Class constructor
     */
    public function __construct()
    {
        add_action('wp_ajax_kaliforms_form_process',
            [$this, 'form_process']
        );
        add_action('wp_ajax_nopriv_kaliforms_form_process',
            [$this, 'form_process']
        );

        add_action('wp_ajax_kaliforms_form_verify_recaptcha', [$this, 'verify_recaptcha']);
        add_action('wp_ajax_nopriv_kaliforms_form_verify_recaptcha', [$this, 'verify_recaptcha']);

        add_action('wp_ajax_kaliforms_form_upload_file', [$this, 'upload_file']);
        add_action('wp_ajax_nopriv_kaliforms_form_upload_file', [$this, 'upload_file']);

        add_action('wp_ajax_kaliforms_form_delete_uploaded_file', [$this, 'delete_file']);
        add_action('wp_ajax_nopriv_kaliforms_form_delete_uploaded_file', [$this, 'delete_file']);
    }

    /**
     * Ajax handler
     */
    public function form_process()
    {
        /**
         * Runs the checks needed for the form to process
         */
        $this->run_form_process_checks();

        /**
         * Run a filter after $_POST data has been checked and sanitized
         */
        $this->data = apply_filters($this->slug . '_before_form_process', $this->data);

        /**
         * Only if we have that particular addon
         */
        $this->_save_data();

        /**
         * Handle file uploads
         */
        $this->_handle_file_uploads();

        /**
         * Send emails
         */
        $emailer = new Emailer($this->post->ID, $this->data, $this->placeholdered_data);
        $emailer->send();

        /**
         * Run a filter after form has been processed ( Emails were sent )
         */
        $this->data = apply_filters($this->slug . '_after_form_process', $this->data);

        /**
         * Return a response to the frontend
         */
        wp_die(
            wp_json_encode(
                [
                    'status' => 'ok',
                    'thank_you_message' => $this->get('show_thank_you_message', '0')
                    ? $this->get_thank_you_message() : '',
                    'redirect_url' => esc_url($this->get('redirect_url', '')),
                ]
            )
        );
    }

    /**
     * Runs checks and formats the data as needed
     *
     * @return void
     */
    public function run_form_process_checks()
    {
        if (empty($_POST['data'])) {
            return $this->display_error(esc_html__('There is no post data', 'kaliforms'));
        }

        if (isset($_POST['data']['nonce'])
            && !wp_verify_nonce(sanitize_key(wp_unslash($_POST['data']['nonce'])), 'kaliforms_nonce')) {
            return $this->display_error(esc_html__('Sneaky sneaky', 'kaliforms'));
        }

        if (empty($_POST['data']['formId'])) {
            return $this->display_error(esc_html__('Form didn`t send a form id, are we sure it is correct?', 'kaliforms'));
        }

        $this->post = get_post(absint(wp_unslash($_POST['data']['formId'])));
        if ($this->post === null) {
            return $this->display_error(esc_html__('There is no form associated with this id. Make sure you copied it correctly', 'kaliforms'));
        }

        $this->multiple_selection_separator = $this->get('multiple_selections_separator', '');
        $this->data = $this->prepare_post_data(stripslashes_deep($_POST['data']));
    }

    /**
     * Prepares post data for processing
     *
     * @param [type] $data
     * @return void
     */
    public function prepare_post_data($data)
    {
        $this->placeholdered_data = array_merge((new GeneralPlaceholders())->general_placeholders, $this->placeholdered_data);

        foreach ($data as $k => $v) {
            $this->placeholdered_data['{' . $k . '}'] = is_array($v)
            ? implode($this->get('multiple_selections_separator', ''), $v)
            : sanitize_text_field($v);
        }

        $placeholders = $this->get_strings_between($this->get('thank_you_message', ''), '{', '}');
        foreach ($placeholders as $placeholder) {
            if (!isset($this->placeholdered_data[$placeholder])) {
                $this->placeholdered_data[$placeholder . '}'] = $this->get_value_from_nested_placeholder($placeholder);
            }
        }

        return $data;
    }
    /**
     * Get value from nested placeholder (in a "special way" lol)
     */
    public function get_value_from_nested_placeholder($placeholder)
    {
        // We remove first char because it's a '{'
        $trimmed = substr($placeholder, 1);
        $trimmedArray = explode(':', $trimmed);
        $value = '';
        $nestedValue = isset($this->placeholdered_data[$trimmedArray[1]]) ? $this->placeholdered_data[$trimmedArray[1]] : '';

        switch ($trimmedArray[0]) {
            case 'imagePreview':
                $value = '<img src="' . esc_url(wp_get_attachment_url($nestedValue)) . '" />';
                break;
            case 'code':
                $value = '<code>' . wp_kses_post($nestedValue) . '</code>';
                break;
            default:
                $value = '';
                break;
        }

        return $value;
    }

    /**
     * Save data in the database
     */
    protected function _save_data()
    {
        $save = $this->get('save_form_submissions', '0');
        if ($save !== '0') {
            $arr = [
                'post' => $this->post,
                'data' => $this->data,
                'submission_id' => false,
                'extra' => [
                    'separator' => $this->get('multiple_selections_separator', ''),
                ],
            ];

            $arr = apply_filters($this->slug . '_save_data', $arr);
            $this->saved = $arr['submission_id'];
        }

        if (isset($this->placeholdered_data['{submission_link}']) && $this->saved) {
            $this->placeholdered_data['{submission_link}'] = call_user_func(
                $this->placeholdered_data['{submission_link}'],
                $this->get('submission_view_page', get_bloginfo('url')),
                $this->saved,
                $this->post->ID,
                true
            );
        }

    }

    /**
     * Handle file uploads
     *
     * Basically we need to check if we have any file upload fields .. and if so we need to add transients for it
     * so we know that the form was subbmited.
     *
     * When an image is uploaded, is going straight to the media manager ( AJAX loading )
     * which schedules a delete event in 15 minutes
     *
     * However, if a user submits the form .. a transient containing the ID of the file is created
     * e.g. kaliforms_dont_delete_this_image_${id}
     */
    private function _handle_file_uploads()
    {
        if (isset($_POST['extraArgs']) && count($_POST['extraArgs'])) {
            $data = wp_unslash($_POST['extraArgs']);

            $_POST['data'] = stripslashes_deep($_POST['data']);
            foreach ($data as $uploadField) {
                $id = $_POST['data'][$uploadField];
                if ($id === '' || $id === null || is_wp_error($id)) {
                    continue;
                }

                set_transient('kaliforms_dont_delete_this_image_' . absint($id), 'submitted');
            }
        }
    }

    /**
     * Generates thank you message
     *
     * @return void
     */
    public function get_thank_you_message()
    {
        return strtr($this->get('thank_you_message', ''), $this->placeholdered_data);
    }

    /**
     * Get images and render them as previews
     */
    public function get_image_html($string)
    {
        $trimmed = substr($string, 1, -1);
        $trimmedArray = explode(':', $trimmed);
        $id = end($trimmedArray);

        return '<img src="' . esc_url(wp_get_attachment_url($id)) . '" />';
    }

    /**
     * Gets strings between delimiters
     *
     * @param [type] $str
     * @param string $start
     * @param string $end
     * @param boolean $with_from_to
     * @return void
     */
    public function get_strings_between($str, $start = '[', $end = ']', $with_from_to = true)
    {
        $arr = [];
        $last_pos = 0;
        $last_pos = strpos($str, $start, $last_pos);
        while ($last_pos !== false) {
            $t = strpos($str, $end, $last_pos);
            $arr[] = ($with_from_to ? $start : '') . substr($str, $last_pos + 1, $t - $last_pos - 1) . ($with_from_to ? $end : '');
            $last_pos = strpos($str, $start, $last_pos + 1);
        }
        return $arr;
    }

    /**
     * Verify recaptcha
     *
     * @return void
     */
    public function verify_recaptcha()
    {
        if (empty($_POST['data'])) {
            return $this->display_error(esc_html__('There is no post data', 'kaliforms'));
        }

        if (isset($_POST['data']['nonce'])
            && !wp_verify_nonce(sanitize_key(wp_unslash($_POST['data']['nonce'])), 'kaliforms_nonce')) {
            return $this->display_error(esc_html__('Sneaky sneaky', 'kaliforms'));
        }

        if (empty($_POST['data']['formId'])) {
            return $this->display_error(esc_html__('Form didn`t send a form id, are we sure it is correct?', 'kaliforms'));
        }

        $this->post = get_post(absint(wp_unslash($_POST['data']['formId'])));

        if ($this->post === null) {
            return $this->display_error(esc_html__('There is no form associated with this id. Make sure you copied it correctly', 'kaliforms'));
        }

        $recaptcha_secret_key = $this->get('google_secret_key', '');
        if (empty($recaptcha_secret_key)) {
            return $this->display_error(esc_html__('There is no recaptcha key', 'kaliforms'));
        }

        $response = wp_remote_post(
            'https://www.google.com/recaptcha/api/siteverify',
            [
                'body' => [
                    'secret' => $recaptcha_secret_key,
                    'response' => wp_unslash($_POST['data']['token']),
                ],
            ]
        );

        if (is_wp_error($response)) {
            return $this->display_error(esc_html__('Something went wrong', 'kaliforms'));
        }

        wp_die(
            wp_json_encode(
                [
                    'response' => json_decode($response['body']),
                ]
            )
        );
    }

    /**
     * Displays an error in the frontend
     *
     */
    public function display_error($err)
    {
        wp_die(wp_json_encode(['message' => $err, 'error' => true]));
    }
}
