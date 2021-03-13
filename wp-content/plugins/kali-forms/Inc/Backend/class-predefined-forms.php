<?php

namespace KaliForms\Inc\Backend;

use KaliForms\Inc\Backend\PredefinedForms;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Predefined_Forms is used to translate stuff
 *
 * @package App\Libraries
 */
class Predefined_Forms
{
    /**
     * Plugin slug
     *
     * @var string
     */
    public $slug = 'kaliforms';
    /**
     * Forms array
     *
     * @var array
     */
    public $forms = [];
    /**
     * Class constructor
     */
    public function __construct()
    {
        add_action('wp_ajax_kaliforms_get_form_data',
            [$this, 'get_form_data']
        );
    }
    /**
     * Gets form data
     *
     * @return void
     */
    public function get_form_data()
    {
        if (isset($_POST['args'], $_POST['args']['nonce'])
            && !wp_verify_nonce(sanitize_key(wp_unslash($_POST['args']['nonce'])), 'kaliforms_nonce')) {
            wp_die('denied');
        }

        $this->set_forms(true);

		$_POST['args'] = stripslashes_deep( $_POST['args'] );

        if (!isset($this->forms[$_POST['args']['id']])) {
            wp_die('wrong id');
        }

        $form = $this->forms[$_POST['args']['id']]['instance'];

        if ($form === null) {
            wp_die('something went wrong');
        }

        wp_die(wp_json_encode(
            [
                'name' => $form->name,
                'emails' => $form->emails,
                'thank_you_message' => $form->thank_you_message,
                'grid' => $form->grid,
                'field_components' => $form->field_components,
            ]
        ));

    }

    /**
     * Sets the default forms
     *
     * @return void
     */
    public function set_forms($full = false)
    {
        $contactForm = new PredefinedForms\Contact_Form();
        $this->forms['contact'] = [
            'name' => $contactForm->name,
            'description' => $contactForm->description,
            'class' => 'PredefinedForms\Contact_Form',
            'pro' => false,
            'instance' => $full ? $contactForm : null,
        ];

        $employeeInformation = new PredefinedForms\Employee_Information_Form();
        $this->forms['employeeInformation'] = [
            'name' => $employeeInformation->name,
            'description' => $employeeInformation->description,
            'pro' => false,
            'class' => 'PredefinedForms\Employee_Information_Form',
            'instance' => $full ? $employeeInformation : null,
        ];

		$this->forms['gdpr-contact'] = [
            'name' => esc_html__('GDPR-Friendly contact form', 'kaliforms'),
            'description' => esc_html__('A simple gdpr-friendly form meant to help you comunicate with your site users.', 'kaliforms'),
            'class' => 'PredefinedForms\GDPR_Friendly_Contact_Form',
            'pro' => true,
            'instance' => $full && class_exists('KaliForms\Inc\Backend\PredefinedForms\GDPR_Friendly_Contact_Form') ? new PredefinedForms\GDPR_Friendly_Contact_Form() : null,
        ];

        $this->forms['appointment'] = [
            'name' => esc_html__('Appointment form', 'kaliforms'),
            'description' => esc_html__('Use this as a starting point in building an appointment service on your site.', 'kaliforms'),
            'class' => 'PredefinedForms\Appointment_Form',
            'pro' => true,
            'instance' => $full && class_exists('KaliForms\Inc\Backend\PredefinedForms\Appointment_Form') ? new PredefinedForms\Appointment_Form() : null,
        ];

        $this->forms['customerSatisfaction'] = [
            'name' => esc_html__('Customer feedback form', 'kaliforms'),
            'description' => esc_html__('Collect feedback from customers and improve your services.', 'kaliforms'),
            'pro' => true,
            'class' => 'PredefinedForms\Customer_Satisfaction_Form',
            'instance' => $full && class_exists('KaliForms\Inc\Backend\PredefinedForms\Customer_Satisfaction_Form') ? new PredefinedForms\Customer_Satisfaction_Form() : null,
        ];

        $this->forms['artContest'] = [
            'name' => esc_html__('Art contest', 'kaliforms'),
            'description' => esc_html__('This form will help you accept registrations for an art contest event.', 'kaliforms'),
            'pro' => true,
            'class' => 'PredefinedForms\Art_Contest_Form',
            'instance' => $full && class_exists('KaliForms\Inc\Backend\PredefinedForms\Art_Contest_Form') ? new PredefinedForms\Art_Contest_Form() : null,
        ];

        $this->forms['jobApplication'] = [
            'name' => esc_html__('Job application', 'kaliforms'),
            'description' => esc_html__('Use this form in order to collect resumes for the positions available in your company', 'kaliforms'),
            'pro' => true,
            'class' => 'PredefinedForms\Job_Application_Form',
            'instance' => $full && class_exists('KaliForms\Inc\Backend\PredefinedForms\Job_Application_Form') ? new PredefinedForms\Job_Application_Form() : null,
        ];

        $this->forms['gamingTournamentRegistration'] = [
            'name' => esc_html__('Gaming tournament registration', 'kaliforms'),
            'description' => esc_html__('Allow ESL teams to join your tournament through this form.'),
            'pro' => true,
            'class' => 'PredefinedForms\Gaming_Tournament_Registration_Form',
            'instance' => $full && class_exists('KaliForms\Inc\Backend\PredefinedForms\Gaming_Tournament_Registration_Form') ? new PredefinedForms\Gaming_Tournament_Registration_Form() : null,
        ];

        $this->forms = apply_filters($this->slug . '_predefined_forms', $this->forms);
    }
}
