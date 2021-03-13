<?php

namespace KaliForms\Inc\Backend;

if (!defined('ABSPATH')) {
    exit;
}

use KaliForms\Inc\Backend\BuilderFormFields;

/**
 * Class Form_Fields is used to translate stuff
 *
 * @package App\Libraries
 */
class Form_Fields
{
    /**
     * Plugin slug
     *
     * @var string
     */
    public $slug = 'kaliforms';
    /**
     * FormFields array
     *
     * @var array
     */
    public $form_fields = [];

    /**
     * Basic constructor
     *
     * Form fields constructor
     */
    public function __construct()
    {
        $this->form_fields = $this->set_form_fields();
    }

    /**
     * Set form fields
     *
     * @return array
     */
    public function set_form_fields()
    {
        $fields = [
            [
                'id' => 'standard',
                'label' => esc_html__('Standard fields', 'kaliforms'),
                'fields' => [
                    $this->textbox(),
                    $this->textarea(),
                    $this->date(),
                    $this->dropdown(),
                    $this->checkbox(),
                    $this->radio(),
                    $this->divider(),
                    $this->free_text(),
                ],
            ],
            [
                'id' => 'advanced',
                'label' => esc_html__('Advanced', 'kaliforms'),
                'fields' => [
                    // $this->date_time_picker(),
                    $this->g_recaptcha(),
                    $this->file_upload(),
                    $this->hidden(),
                ],
            ],
            [
                'id' => 'payments',
                'label' => esc_html__('Payments', 'kaliforms'),
                'fields' => [
                    $this->product_field(),
                    $this->paypal_field(),
                ],
            ],
            [
                'id' => 'buttons',
                'label' => esc_html__('Buttons', 'kaliforms'),
                'fields' => [
                    // $this->button(),
                    $this->submit_button(),
                ],
            ],
        ];

        $fields = $this->set_upsell_fields($fields);

        /**
         * We can add / remove fields through this filter
         */
        return apply_filters($this->slug . '_default_form_fields', $fields);
    }
    /**
     * Product field ( product selection )
     *
     * @return void
     */
    public function product_field()
    {
        return new BuilderFormFields\Product([
            'price' => [
                'label' => esc_html__('Price', 'kaliforms'),
                'type' => 'textbox',
                'value' => '',
            ],
            // 'picture' => [
            //     'label' => 'Picture',
            //     'type' => 'upload',
            //     'value' => '',
            // ],
        ]);
    }
    /**
     * PayPal Field
     *
     * @return void
     */
    public function paypal_field()
    {
        return new BuilderFormFields\PayPal([
            'merchantEmail' => [
                'label' => esc_html__('Merchant email', 'kaliforms'),
                'type' => 'textbox',
                'value' => '',
            ],
        ]);
    }
    /**
     * Hidden field
     *
     * @return void
     */
    protected function hidden()
    {
        return new BuilderFormFields\Hidden([]);
    }

    /**
     * Freetext field
     *
     * @return void
     */
    protected function free_text()
    {
        return new BuilderFormFields\FreeText(
            [
                'content' => [
                    'label' => esc_html__('Content', 'kaliforms'),
                    'type' => 'textarea',
                    'value' => '',
                ],
            ]
        );
    }

    /**
     * Divider field
     *
     * @return BuilderFormFields\Divider
     */
    protected function divider()
    {
        return new BuilderFormFields\Divider(
            [
                'type' => [
                    'label' => esc_html__('Divider type', 'kaliforms'),
                    'type' => 'select',
                    'value' => 'line',
                    'choices' => ['line', 'space', 'both'],
                ],
            ]
        );
    }

    /**
     * Google recaptcha field
     *
     * @return BuilderFormFields\GRecaptcha
     */
    protected function g_recaptcha()
    {
        return new BuilderFormFields\GRecaptcha([]);
    }
    /**
     * Date field
     *
     * @return void
     */
    protected function date()
    {
        return new BuilderFormFields\Date([
            'required' => [
                'label' => esc_html__('Required', 'kaliforms'),
                'type' => 'toggle',
                'value' => false,
            ],
            'readonly' => [
                'label' => esc_html__('Readonly', 'kaliforms'),
                'type' => 'toggle',
                'value' => false,
            ],
        ]);
    }

    /**
     * @return BuilderFormFields\File_Upload
     */
    protected function file_upload()
    {
        return new BuilderFormFields\File_Upload(
            [
                'maxFileSize' => [
                    'label' => esc_html__('Max file size (e.g. 150kb or 3mb)', 'kaliforms'),
                    'type' => 'textbox',
                    'value' => '',
                ],
                'acceptedExtensions' => [
                    'label' => esc_html__('Accepted extensions, separated by comma', 'kaliforms'),
                    'type' => 'textbox',
                    'value' => '',
                ],
                'filePrefix' => [
                    'label' => esc_html__('File prefix', 'kaliforms'),
                    'type' => 'textbox',
                    'value' => '',
                ],
                'instantUpload' => [
                    'label' => esc_html__('Instant Upload', 'kaliforms'),
                    'type' => 'toggle',
                    'value' => true,
                ],
                'imagePreview' => [
                    'label' => esc_html__('Image preview', 'kaliforms'),
                    'type' => 'toggle',
                    'value' => false,
                ],
                'required' => [
                    'label' => esc_html__('Required', 'kaliforms'),
                    'type' => 'toggle',
                    'value' => false,
                ],
                'readonly' => [
                    'label' => esc_html__('Readonly', 'kaliforms'),
                    'type' => 'toggle',
                    'value' => false,
                ],
            ]
        );
    }

    /**
     * @return BuilderFormFields\Dropdown
     */
    protected function dropdown()
    {
        return new BuilderFormFields\Dropdown(
            [
                'choices' => [
                    'label' => esc_html__('Choices', 'kaliforms'),
                    'type' => 'addableList',
                    'value' => [],
                ],
                'required' => [
                    'label' => esc_html__('Required', 'kaliforms'),
                    'type' => 'toggle',
                    'value' => false,
                ],
                'readonly' => [
                    'label' => esc_html__('Readonly', 'kaliforms'),
                    'type' => 'toggle',
                    'value' => false,
                ],
            ]
        );
    }

    /**
     * @return BuilderFormFields\Checkbox
     */
    protected function checkbox()
    {
        return new BuilderFormFields\Checkbox(
            [
                'flow' => [
                    'label' => esc_html__('Flow', 'kaliforms'),
                    'type' => 'select',
                    'value' => 'vertical',
                    'choices' => [
                        'vertical',
                        'horizontal',
                    ],
                ],
                'choices' => [
                    'label' => esc_html__('Choices', 'kaliforms'),
                    'type' => 'addableList',
                    'value' => [],
                ],
                'required' => [
                    'label' => esc_html__('Required', 'kaliforms'),
                    'type' => 'toggle',
                    'value' => false,
                ],
                'readonly' => [
                    'label' => esc_html__('Readonly', 'kaliforms'),
                    'type' => 'toggle',
                    'value' => false,
                ],
            ]
        );
    }

    /**
     * @return BuilderFormFields\Radio
     */
    protected function radio()
    {
        return new BuilderFormFields\Radio(
            [
                'flow' => [
                    'label' => esc_html__('Flow', 'kaliforms'),
                    'type' => 'select',
                    'value' => 'vertical',
                    'choices' => [
                        'vertical',
                        'horizontal',
                    ],
                ],
                'choices' => [
                    'label' => esc_html__('Choices', 'kaliforms'),
                    'type' => 'addableList',
                    'value' => [],
                ],
                'required' => [
                    'label' => esc_html__('Required', 'kaliforms'),
                    'type' => 'toggle',
                    'value' => false,
                ],
                'readonly' => [
                    'label' => esc_html__('Readonly', 'kaliforms'),
                    'type' => 'toggle',
                    'value' => false,
                ],
            ]
        );
    }

    /**
     * @return BuilderFormFields\Submit_Button
     */
    protected function submit_button()
    {
        return new BuilderFormFields\Submit_Button([]);
    }

    /**
     * @return BuilderFormFields\Button
     */
    protected function button()
    {
        return new BuilderFormFields\Button([]);
    }

    /**
     * @return BuilderFormFields\TextArea
     */
    protected function textarea()
    {
        return new BuilderFormFields\TextArea(
            [
                'placeholder' => [
                    'label' => esc_html__('Field placeholder', 'kaliforms'),
                    'type' => 'textbox',
                    'value' => '',
                ],
                'required' => [
                    'label' => esc_html__('Required', 'kaliforms'),
                    'type' => 'toggle',
                    'value' => false,
                ],
                'readonly' => [
                    'label' => esc_html__('Readonly', 'kaliforms'),
                    'type' => 'toggle',
                    'value' => false,
                ],
            ]
        );
    }

    /**
     * @return BuilderFormFields\TextBox
     */
    protected function textbox()
    {
        return new BuilderFormFields\TextBox(
            [
                'type' => [
                    'label' => esc_html__('Field type', 'kaliforms'),
                    'type' => 'select',
                    'value' => 'text',
                    'choices' => ['text', 'number', 'email'],
                ],
                'placeholder' => [
                    'label' => esc_html__('Field placeholder', 'kaliforms'),
                    'type' => 'textbox',
                    'value' => '',
                ],
                'required' => [
                    'label' => esc_html__('Required', 'kaliforms'),
                    'type' => 'toggle',
                    'value' => false,
                ],
                'readonly' => [
                    'label' => esc_html__('Readonly', 'kaliforms'),
                    'type' => 'toggle',
                    'value' => false,
                ],
            ]
        );
    }

    /**
     * Adds the upsell fields
     *
     * @param [type] $fields
     * @return void
     */
    protected function set_upsell_fields($fields)
    {
        if (defined('KALIFORMS_PRO_BASE')) {
            return $fields;
		}
		
        $fields[1]['fields'][] = new BuilderFormFields\Upsell_Field([
            'label' => esc_html__('Smart Text Output', 'kaliforms'),
            'upsell_for' => 'smartTextOutput',
            'pro' => true,
        ]);
        $fields[1]['fields'][] = new BuilderFormFields\Upsell_Field([
            'label' => esc_html__('Range', 'kaliforms'),
            'upsell_for' => 'range',
            'pro' => true,
        ]);
        $fields[1]['fields'][] = new BuilderFormFields\Upsell_Field([
            'label' => esc_html__('Date Time Picker', 'kaliforms'),
            'upsell_for' => 'dateTimePicker',
            'pro' => true,
        ]);
        $fields[1]['fields'][] = new BuilderFormFields\Upsell_Field([
            'label' => esc_html__('Choices', 'kaliforms'),
            'upsell_for' => 'choices',
            'pro' => true,
        ]);
        $fields[1]['fields'][] = new BuilderFormFields\Upsell_Field([
            'label' => esc_html__('Page Break', 'kaliforms'),
            'upsell_for' => 'dateTimePicker',
            'pro' => true,
        ]);
        $fields[1]['fields'][] = new BuilderFormFields\Upsell_Field([
            'label' => esc_html__('Password', 'kaliforms'),
            'upsell_for' => 'password',
            'pro' => true,
        ]);

        return $fields;
    }
}
