<?php

namespace KaliForms\Inc\Backend;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Sanitizers
 *
 * @package Inc\Libraries
 */
class Sanitizers
{
    /**
     * Sanitizes the input
     *
     * @param $input
     *
     * @return mixed
     */
    public static function sanitize_datetime($input)
    {
        return is_array($input) ? sanitize_text_field(implode('|', $input)) : sanitize_text_field($input);
    }

    /**
     * Sanitizes a boolean field
     *
     * @param $input
     *
     * @return mixed
     */
    public static function sanitize_boolean($input)
    {
        return filter_var($input, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
    }

    public static function sanitize_regular_checkbox($input)
    {
        return $input === 'on';
    }

    public static function sanitize_secure_options($input)
    {
        $val = sanitize_text_field($input);
        $allowed = ['None', 'SSL', 'TLS', 'STARTTLS'];

        return in_array($val, $allowed) ? $val : $allowed[0];
    }

    /**
     * @param $input
     *
     * @return false|string
     */
    public static function sanitize_grid_layout($input)
    {
        $input = json_decode(stripslashes($input));
        $sanitized = [];
        foreach ($input as $item) {
            $grid = self::sanitize_grid_item($item);

            $sanitized[] = $grid;
        }

        return wp_json_encode($sanitized);
    }

    /**
     * @param $item
     *
     * @return \stdClass
     */
    public static function sanitize_grid_item($item)
    {
        $grid_item = new \stdClass();
        $grid_item->h = absint($item->h);
        $grid_item->i = sanitize_key($item->i);
        $grid_item->maxH = absint($item->maxH);
        $grid_item->minW = absint($item->minW);
        $grid_item->moved = self::sanitize_boolean($item->moved);
        $grid_item->static = self::sanitize_boolean($item->static);
        $grid_item->w = absint($item->w);
        $grid_item->x = absint($item->x);
        $grid_item->y = absint($item->y);

        return $grid_item;
    }

    /**
     * @param $input
     *
     * @return false|string
     */
    public static function sanitize_field_components($input)
    {
        $input = json_decode(stripslashes($input));
        if (null === $input) {
            return wp_json_encode([]);
        }

        $sanitized = [];

        foreach ($input as $field) {
            $sanitized[] = self::sanitize_field_component($field);
        }

        return wp_slash(wp_json_encode($sanitized, JSON_HEX_QUOT));
    }

    /**
     * @param $item
     *
     * @return \stdClass
     */
    public static function sanitize_field_component($item)
    {
        $fieldItem = new \stdClass();
        $fieldItem->id = sanitize_text_field($item->id);
        $fieldItem->internalId = sanitize_key($item->internalId);
        $fieldItem->label = sanitize_text_field($item->label);
        $fieldItem->properties = self::sanitize_properties_object($item->properties, $item->id);
        $fieldItem->constraint = empty($item->constraint) ? 'none' : absint($item->constraint);
        return $fieldItem;
    }

    /**
     * @param $item
     *
     * @return \stdClass
     */
    public static function sanitize_properties_object($item, $id)
    {
        $props = new \stdClass();
        foreach ($item as $k => $v) {
            if ($k === 'content') {
                $props->{sanitize_text_field($k)} = wp_kses_post($v);
                continue;
            }
            if ($k === 'name' || $k === 'id') {
                if (empty($v)) {
                    $v = $id . substr(md5($id + mt_rand(15, 50)), 0, 3);
                }

                $props->{sanitize_text_field($k)} = sanitize_text_field($v);
                continue;
            }

            $props->{sanitize_text_field($k)} = is_string($v)
            ? sanitize_text_field($v)
            : self::sanitize_unknown($v);
        }

        return $props;
    }

    /**
     * When we're deep inside props, we dont really know what
     * we're sanitizing so lets make sure everything is going
     * according to plan
     *
     * @param [any] $value
     * @return {*}
     */
    public static function sanitize_unknown($value)
    {
        switch (gettype($value)) {
            case 'array':
                $value = self::sanitize_array_with_props($value);
                break;
            case 'boolean':
                $value = self::sanitize_boolean($value);
                break;
            default:
                $value = sanitize_text_field($value);
                break;
        }

        return $value;
    }

    /**
     * Sanitizes the array
     *
     * @param [Array] $value
     * @return array
     */
    public static function sanitize_array_with_props($value)
    {
        $sanitized = [];

        if (!is_array($value)) {
            return false;
        }

        foreach ($value as $item) {
            $obj = new \stdClass();

            foreach ($item as $k => $v) {
                $obj->{sanitize_text_field($k)} = sanitize_text_field($v);
            }

            $sanitized[] = $obj;
        }

        return $sanitized;
    }

    /**
     * Sanitizer for the email builder
     *
     * @param [Array] $value
     * @return void
     */
    public static function sanitize_email_builder($value)
    {
        $value = json_decode(stripslashes($value));
        $sanitized = [];
        if (!is_array($value)) {
            return false;
        }

        foreach ($value as $item) {
            $obj = new \stdClass();
            foreach ($item as $k => $v) {
                $obj->{sanitize_text_field($k)} = $k === 'emailBody'
                ? wp_kses_post(str_replace(["\n", "\r"], '', $v))
                : sanitize_text_field($v);
            }

            $cleaned = array_filter(get_object_vars($obj));
            if (!empty($cleaned) && count($cleaned) > 1) {
                $sanitized[] = $obj;
            }
        }

        return wp_slash(wp_json_encode($sanitized, JSON_HEX_QUOT));
    }
}
