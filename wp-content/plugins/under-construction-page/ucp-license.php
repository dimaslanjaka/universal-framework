<?php

/*
 * UnderConstructionPage
 * PRO license related functions
 * (c) WebFactory Ltd, 2015 - 2019
 */

class UCP_license extends UCP {
  // hook things up
  static function init() {
    if (is_admin()) {
      add_filter('pre_set_site_transient_update_plugins', array(__CLASS__, 'update_filter'));
      add_filter('plugins_api', array(__CLASS__, 'update_details'), 100, 3);
    }
  } // init


  // get plugin info for lightbox
  static function update_details($result, $action, $args) {
    if (!self::is_activated()) {
      return $result;
    }

    static $response = false;
    $options = parent::get_options();
    $plugin = 'under-construction-page';

    if ($action != 'plugin_information' || empty($args->slug) || ($args->slug != $plugin)) {
      return $result;
    }

    if(empty($response) || is_wp_error($response)) {
      $request_params = array('sslverify' => false, 'timeout' => 15, 'redirection' => 2);
      $request_args = array('action' => 'plugin_information',
                            'request_details' => serialize($args),
                            'timestamp' => time(),
                            'codebase' => 'free',
                            'version' => parent::$version,
                            'license_key' => $options['license_key'],
                            'license_expires' => $options['license_expires'],
                            'license_type' => $options['license_type'],
                            'license_active' => $options['license_active'],
                            'site' => get_home_url());

      $url = add_query_arg($request_args, parent::$licensing_servers[0]);
      $response = wp_remote_get(esc_url_raw($url), $request_params);

      if (is_wp_error($response) || !wp_remote_retrieve_body($response)) {
        $url = add_query_arg($request_args, parent::$licensing_servers[1]);
        $response = wp_remote_get(esc_url_raw($url), $request_params);
      }
    } // if !$response

    if (is_wp_error($response) || !wp_remote_retrieve_body($response)) {
      $res = new WP_Error('plugins_api_failed', __('An unexpected HTTP error occurred during the API request.', 'under-construction-page'), $response->get_error_message());
    } else {
      $res = json_decode(wp_remote_retrieve_body($response), false);

      if (!is_object($res)) {
        $res = new WP_Error('plugins_api_failed', __('Invalid API respone.', 'under-construction-page'), wp_remote_retrieve_body($response));
      } else {
        $res->sections = (array) $res->sections;
        $res->banners = (array) $res->banners;
        $res->icons = (array) $res->icons;
      }
    }

    return $res;
  } // update_details

  // get info on new plugin version if one exists
  static function update_filter($current) {
    if (!self::is_activated()) {
      return $current;
    }

    static $response = false;
    $options = parent::get_options();
    $plugin = 'under-construction-page/under-construction.php';

    if(empty($response) || is_wp_error($response)) {
      $request_params = array('sslverify' => false, 'timeout' => 15, 'redirection' => 2);
      $request_args = array('action' => 'update_info',
                            'timestamp' => time(),
                            'codebase' => 'free',
                            'version' => parent::$version,
                            'license_key' => $options['license_key'],
                            'license_expires' => $options['license_expires'],
                            'license_type' => $options['license_type'],
                            'license_active' => $options['license_active'],
                            'site' => get_home_url());

      $url = add_query_arg($request_args, parent::$licensing_servers[0]);
      $response = wp_remote_get(esc_url_raw($url), $request_params);

      if (is_wp_error($response)) {
        $url = add_query_arg($request_args, parent::$licensing_servers[1]);
        $response = wp_remote_get(esc_url_raw($url), $request_params);
      }
    } // if !$response

    if (!is_wp_error($response) && wp_remote_retrieve_body($response)) {
      $data = json_decode(wp_remote_retrieve_body($response), false);
      if (empty($current)) {
        $current = new stdClass();
      }
      if (empty($current->response)) {
        $current->response = array();
      }
      if (!empty($data) && is_object($data)) {
        $data->icons = (array) $data->icons;
        $data->banners = (array) $data->banners;
        $current->response[$plugin] = $data;
      }
    }

    return $current;
  } // update_filter


  // check if license key is valid and not expired
  static function is_activated() {
    $options = parent::get_options();

    if (!empty($options['license_active']) && $options['license_active'] === true &&
        !empty($options['license_expires']) && $options['license_expires'] >= date('Y-m-d')) {
      return true;
    } else {
      return false;
    }
  } // is_activated


  // check if activation code is valid
  static function validate_license_key($code) {
    $out = array('success' => false, 'license_active' => false, 'license_key' => $code, 'error' => '', 'license_type' => '', 'license_expires' => '1900-01-01');
    $result = self::query_licensing_server('validate_license', array('license_key' => $code));

    if (false === $result) {
      $out['error'] = 'Unable to contact licensing server. Please try again in a few moments.';
    } elseif (!is_array($result['data']) || sizeof($result['data']) != 4) {
      $out['error'] = 'Invalid response from licensing server. Please try again later.';
    } else {
      $out['success'] = true;
      $out = array_merge($out, $result['data']);
    }

    return $out;
  } // validate_license_key


  // run any query on licensing server
  static function query_licensing_server($action, $data = array(), $method = 'GET', $array_response = true) {
    $options = parent::get_options();
    $request_params = array('sslverify' => false, 'timeout' => 25, 'redirection' => 2);
    $default_data = array('license_key' => $options['license_key'],
                          'code_base' => 'free',
                          '_rand' => rand(1000, 9999),
                          'version' => self::$version,
                          'site' => get_home_url());

    $request_data = array_merge($default_data, $data, array('action' => $action));

    $url = add_query_arg($request_data, parent::$licensing_servers[0]);
    $response = wp_remote_get(esc_url_raw($url), $request_params);

    if (is_wp_error($response) || !($body = wp_remote_retrieve_body($response)) || !($result = @json_decode($body, $array_response))) {
      $url = add_query_arg($request_data, parent::$licensing_servers[1]);
      $response = wp_remote_get(esc_url_raw($url), $request_params);
      $body = wp_remote_retrieve_body($response);
      $result = @json_decode($body, $array_response);
    }

    $result['success'] = true;

    if (!is_array($result) || !isset($result['success'])) {
      return false;
    } else {
      return $result;
    }
  } // query_licensing_server
} // class UCP_license
