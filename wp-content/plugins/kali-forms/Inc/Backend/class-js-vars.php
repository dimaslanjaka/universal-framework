<?php

namespace KaliForms\Inc\Backend;

use KaliForms\Inc\Utils\MetaHelper;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class JSVars is the "locale" object used in the backend.
 *
 * You can pass any variables from the database here,
 * so they can be used in the JS App. Although this can be done through AJAX,
 * some things are best available when document is ready
 *
 * @package Inc\Backend
 */
class JS_Vars
{
    /**
     * Metahelper trait
     */
    use MetaHelper;
    /**
     * @var null
     */
    protected $post = null;
    /**
     * Plugin slug
     *
     * @var string
     */
    protected $slug = 'kaliforms';
    /**
     * This is the object needed in the frontend
     *
     * @var array
     */
    public $content = [];

    /**
     * Basic constructor
     *
     * JSVars constructor
     */
    public function __construct()
    {
        $this->content['ABSPATH'] = ABSPATH;
        /**
         * Constructor creates the ajax url
         */
        $this->content['ajaxurl'] = esc_url(admin_url('admin-ajax.php'));
        /**
         * Assets url
         */
        $this->content['assetsUrl'] = esc_url(KALIFORMS_URL . 'assets');
        $this->content['assetsUrlBackend'] = esc_url(KALIFORMS_URL . 'assets/backend');
        $this->content['assetsUrlFrontend'] = esc_url(KALIFORMS_URL . 'assets/frontend');
        /**
         * And the nonce
         */
        $this->content['ajax_nonce'] = wp_create_nonce($this->slug . '_nonce');
        /**
         * Exit url ( when button is pressed )
         */
        $this->content['exit_url'] = esc_url(admin_url('edit.php?post_type=kaliforms_forms'));
        /**
         * Build the translation array
         */
        $this->content['translations'] = (new Translations)->translations;
        /**
         * Build the form fields array
         */
        $this->content['formFields'] = (new Form_Fields())->form_fields;

        /**
         * Grid content
         */
        $this->content['grid'] = json_decode($this->get('grid', '[]'));
        /**
         * Field components saved in the database
         */
        $this->content['fieldComponents'] = json_decode($this->get('field_components', '[]'), false, 512, JSON_HEX_QUOT);
        /**
         * Form Info Fields
         */
        $this->content['requiredFieldMark'] = wp_kses_post($this->get('required_field_mark', ''));
        $this->content['globalErrorMessage'] = wp_kses_post($this->get('global_error_message', ''));
        $this->content['multipleSelectionsSeparator'] = wp_kses_post($this->get('multiple_selections_separator', ''));
        $this->content['removeCaptchaForLoggedUsers'] = esc_attr($this->get('remove_captcha_for_logged_users', '0'));
        $this->content['hideFormName'] = esc_attr($this->get('hide_form_name', '0'));
        $this->content['cssId'] = esc_attr($this->get('css_id', ''));
        $this->content['cssClass'] = esc_attr($this->get('css_class', ''));
        /**
         * This should be moved to a new array containing all the integration keys
         */
        $this->content['googleSiteKey'] = esc_attr($this->get('google_site_key', ''));
        $this->content['googleSecretKey'] = esc_attr($this->get('google_secret_key', ''));
        /**
         * Actual form name
         */
        $this->content['formName'] = esc_html(get_the_title($this->post));
        /**
         * Form Submission Fields
         */
        $this->content['showThankYouMessage'] = esc_attr($this->get('show_thank_you_message', '0'));
        $this->content['thankYouMessage'] = wp_kses_post($this->get('thank_you_message', ''));
        $this->content['redirectUrl'] = esc_url($this->get('redirect_url', ''));
        /**
         * Form Emails
         */
        $this->content['formEmails'] = json_decode($this->get('emails', '[]'));
        /**
         * Predefined forms
         */
        $forms = new Predefined_Forms();
        $forms->set_forms();
        $this->content['predefinedForms'] = $forms->forms;
        /**
         * Form id
         */
        $this->content['formId'] = absint($this->post->ID);
        /**
         * Payment fields
         */
        $this->content['payPalClientId'] = esc_html($this->get('paypal_client_id', ''));
        $this->content['payPalClientIdSandBox'] = esc_html($this->get('paypal_client_id_sandbox', ''));
        $this->content['paymentsLive'] = esc_attr($this->get('payments_live', '0'));
        $this->content['currency'] = esc_attr($this->get('currency', 'USD'));
        /**
         * Applies a filter, maybe someone wants to edit something
         */
        $this->content = apply_filters($this->slug . '_jsvars_object', $this->content);
    }
}
