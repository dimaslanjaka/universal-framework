<?php
namespace KaliForms\Inc\Frontend;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Form class ( FRONTEND RENDERING )
 */
class Form
{
    public $slug = 'kaliforms';
    /**
     * Rows
     *
     * @var array
     */
    protected $rows = [];
    /**
     * Post object
     *
     * @var [WP_Post]
     */
    protected $post = null;
    /**
     * Form id
     *
     * @var [type]
     */
    protected $form_id = null;
    /**
     * Class constructor
     *
     * @param [number] $form_id
     * @param [array] $rows
     * @param [array] $form_info
     */
    public function __construct($form_id, $rows, $form_info)
    {
        $this->form_id = $form_id;
        $this->rows = $rows;
        $this->form_info = $form_info;
    }

    /**
     * Render fields
     *
     * @return void
     */
    public function render_fields()
    {
        $div = '<form ' . $this->generate_form_attributes() . '>';
        $beforeFormStart = apply_filters($this->slug . '_before_form_start', ['context' => $this, 'string' => '']);
        $div .= $beforeFormStart['string'];
        $div .= (empty($this->form_info['form_name']) || $this->form_info['hide_form_name'] === '1') ? '' : '<h3>' . esc_html($this->form_info['form_name']) . '</h3>';
        $div .= '<div id="kaliforms-global-error-message-' . esc_attr($this->form_id) . '" class="global-error-message">' . wp_kses_post($this->form_info['global_error_message']) . '</div>';

        foreach ($this->rows as $row) {
            $div .= $this->render_row($row);
        }
        $div .= $this->generate_ip_address_field();
        $beforeFormEnd = apply_filters($this->slug . '_before_form_end', ['context' => $this, 'string' => '']);
        $div .= $beforeFormEnd['string'];
        $div .= '</form>';

        return $div;
    }
    /**
     * Render row
     *
     * @param [item] $items
     * @return void
     */
    public function render_row($items)
    {
        $div = '<div class="row">';
        foreach ($items as $item) {
            $div .= $this->render_field($item);
        }
        $div .= '</div>';

        return $div;
    }
    /**
     * Renders a field based on a template
     *
     * @param [array] $item
     * @return string
     */
    public function render_field($item)
    {
        if (!$item) {
            return false;
        }
        return $item['frontend']->render($item, $this->form_info);
    }

    /**
     * Generates form attributes
     *
     * @return string
     */
    public function generate_form_attributes()
    {
        $arr = [
            'class' => 'kaliforms-form-container bootstrap-wrapper ' . $this->form_info['css_class'],
            'id' => $this->form_info['css_id'],
            'data-form-id' => $this->form_id,
        ];

        $arr = array_filter($arr);

        $string = '';
        foreach ($arr as $attribute => $value) {
            switch ($attribute) {
                case 'autocomplete':
                case 'enctype':
                case 'name':
                case 'class':
                case 'id':
                case 'data-form-id':
                    $string .= empty($value) ? '' : ' ' . esc_attr($attribute) . '="' . esc_attr($value) . '"';
                    break;
                case 'novalidate':
                    $string .= $value ? esc_attr($attribute) . ' ' : '';
                    break;
                default:
                    break;
            }
        }

        return $string;
    }
    /**
     * Returns a form field containing the ip address
     *
     * @return string
     */
    public function generate_ip_address_field()
    {
        return '<input type="hidden" name="ip_address" readonly value="' . $this->get_user_ip_addr() . '" />';
    }

	/**
	 * Get user ip address
	 *
	 * @return string
	 */
    public function get_user_ip_addr()
    {
        $ipaddress = '';
        if (getenv('HTTP_CLIENT_IP')) {
            $ipaddress = getenv('HTTP_CLIENT_IP');
        } else if (getenv('HTTP_X_FORWARDED_FOR')) {
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        } else if (getenv('HTTP_X_FORWARDED')) {
            $ipaddress = getenv('HTTP_X_FORWARDED');
        } else if (getenv('HTTP_FORWARDED_FOR')) {
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        } else if (getenv('HTTP_FORWARDED')) {
            $ipaddress = getenv('HTTP_FORWARDED');
        } else if (getenv('REMOTE_ADDR')) {
            $ipaddress = getenv('REMOTE_ADDR');
        } else {
            $ipaddress = 'UNKNOWN';
        }

        return $ipaddress;
    }

}
