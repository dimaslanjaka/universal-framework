<?php

namespace KaliForms\Inc\Frontend\FormFields;

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Class TextBox
 *
 * @package Inc\Frontend\FormFields;
 */
class TextBox extends Form_Field
{
	/**
	 * Class constructor
	 */
	public function __construct()
	{
		$this->id = 'textbox';
	}

	/**
	 * Render function
	 *
	 * @return string
	 */
	public function render($item, $form_info)
	{
		if ($item['type'] === 'textbox') {
			$item['type'] = 'text';
		}

		if (isset($item['properties.type']) && $item['properties.type'] === 'number') {
			$item['type'] = 'number';
		}

		if (isset($item['properties.type']) && $item['properties.type'] !== 'number') {
			unset($item['min']);
			unset($item['max']);
		}

		$attributes = $this->generate_attribute_string($item);
		$offset = isset($item['offset']) && $item['offset'] > 0 ? 'offset-md-' . absint($item['offset']) : '';
		$div = '<div class="col-12 col-md-' . absint($item['col']) . ' ' . $offset . '">';
		$div .= $this->generate_label($item, $form_info);
		$div .= '<input ' . $attributes . '>';
		$div .= !empty($item['description']) ? '<small>' . esc_html($item['description']) . '</small>' : '';

		$div .= '</div>';

		return $div;
	}
}
