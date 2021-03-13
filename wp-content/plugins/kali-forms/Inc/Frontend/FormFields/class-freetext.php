<?php
namespace KaliForms\Inc\Frontend\FormFields;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class FreeText
 *
 * @package Inc\Frontend\FormFields;
 */
class FreeText extends Form_Field
{
    /**
     * Class constructor
     */
    public function __construct()
    {
        $this->id = 'freeText';
    }

    /**
     * Render function
     *
     * @return void
     */
    public function render($item, $form_info)
    {
        $attributes = $this->generate_attribute_string($item);

        $offset = isset($item['offset']) && $item['offset'] > 0 ? 'offset-md-' . absint($item['offset']) : '';
        $div = '<div class="col-12 col-md-' . absint($item['col']) . ' ' . $offset . '">';
        $div .= '<span ' . $attributes . '>' . wp_kses_post($item['content']) . '</span>';
        $div .= '</div>';

        return $div;

    }
}
