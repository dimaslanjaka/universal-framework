<?php

namespace KaliForms\Inc\Frontend\FormFields;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Product
 *
 * @package Inc\Frontend\FormFields;
 */
class Product extends Form_Field
{
    /**
     * Class constructor
     */
    public function __construct()
    {
        $this->id = 'product';
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
        $div .= '<p>' . esc_html($item['caption']) . ' - <strong>' . absint($item['price']) . ' ' . esc_html($form_info['currency']) . '</strong></p>';
        $div .= '<p>' . esc_html($item['description']) . '</p>';
        $div .= '</div>';

        return $div;
    }
}
