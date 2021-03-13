<?php

namespace KaliForms\Inc\Backend\BuilderFormFields;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class GRecaptcha
 *
 * @package Inc\Backend\BuilderFormFields
 */
class GRecaptcha extends Form_Field
{
    /**
     * @var string
     */
    public $id = 'grecaptcha';
    /**
     * @var string
     */
    public $type = 'grecaptcha';

    /**
     * GRecaptcha constructor.
     *
     * @param $args
     */
    public function __construct($args)
    {
        parent::__construct($args);
		$this->remove_props(['default', 'description', 'caption']);

        $this->label = esc_html__('Google Recaptcha', 'kaliforms');
    }
}
