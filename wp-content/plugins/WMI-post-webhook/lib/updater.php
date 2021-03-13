<?php

define('WMI_JSON_URL', 'https://dimaslanjaka.github.io/assets/wp/info.json');

add_filter('plugins_api', 'WMI_plugin_info', 20, 3);
/*
 * $res contains information for plugins with custom update server
 * $action 'plugin_information'
 * $args stdClass Object ( [slug] => woocommerce [is_ssl] => [fields] => Array ( [banners] => 1 [reviews] => 1 [downloaded] => [active_installs] => 1 ) [per_page] => 24 [locale] => en_US )
 */
function WMI_plugin_info($res, $action, $args)
{

  // do nothing if this is not about getting plugin information
  if ($action !== 'plugin_information')
    return false;

  // do nothing if it is not our plugin
  if ('WMI_post_webhook' !== $args->slug)
    return $res;

  // trying to get from cache first, to disable cache comment 18,28,29,30,32
  if (false == $remote = get_transient('upgrade_' . WMI_slug)) {

    // info.json is the file with the actual plugin information on your server
    $remote = wp_remote_get(
      WMI_JSON_URL,
      array(
        'timeout' => 10,
        'headers' => array(
          'Accept' => 'application/json'
        )
      )
    );

    if (!is_wp_error($remote) && isset($remote['response']['code']) && $remote['response']['code'] == 200 && !empty($remote['body'])) {
      set_transient('upgrade_' . WMI_slug, $remote, 43200); // 12 hours cache
    } //https://dimaslanjaka.github.io/assets/wp/WMI_post_webhook.zip
  }

  if ($remote) {

    $remote = json_decode($remote['body']);
    $res = new stdClass();
    $res->name = $remote->name;
    $res->slug = WMI_slug;
    $res->version = $remote->version;
    $res->tested = $remote->tested;
    $res->requires = $remote->requires;
    $res->author = '<a href="https://web-manajemen.blogspot.com.com">Dimas Lanjaka</a>'; // I decided to write it directly in the plugin
    $res->author_profile = 'https://profiles.wordpress.org/dimaslanjaka'; // WordPress.org profile
    $res->download_link = $remote->download_url;
    $res->trunk = $remote->download_url;
    $res->last_updated = $remote->last_updated;
    $res->sections = array(
      'description' => $remote->sections->description, // description tab
      'installation' => $remote->sections->installation, // installation tab
      'changelog' => $remote->sections->changelog, // changelog tab
      // you can add your custom sections (tabs) here
    );
    $res->ratings = array(
      5 => 2104,
      4 => 116,
      3 => 64,
      2 => 57,
      1 => 175
    );
    $res->requires_php = 7.0;
    $res->active_installs = 2674;
    $res->num_ratings = $remote->num_ratings;
    $res->reviews = '<div class="review">
    <div class="review-head">
      <div class="reviewer-info">
        <div class="review-title-section">
          <h4 class="review-title">Good eCommerce for WP</h4>
          <div class="star-rating"><div class="wporg-ratings" aria-label="5 out of 5 stars" data-title-template="%s out of 5 stars" data-rating="5" style="color:#ffb900;"><span class="star dashicons dashicons-star-filled"></span><span class="star dashicons dashicons-star-filled"></span><span class="star dashicons dashicons-star-filled"></span><span class="star dashicons dashicons-star-filled"></span><span class="star dashicons dashicons-star-filled"></span></div></div>
        </div>
        <p class="reviewer">By <a href="https://profiles.wordpress.org/rudrastyh"><img alt="" src="GRAVATAR URL" class="avatar avatar-16 photo" height="16" width="16"></a><a href="https://profiles.wordpress.org/rudrastyh" class="reviewer-name">Misha Rudrastyh</a> on <span class="review-date">August 31, 2017</span></p>
      </div>
    </div>
    <div class="review-body">Aced it.</div>
  </div>';

    // in case you want the screenshots tab, use the following HTML format for its content:
    // <ol><li><a href="IMG_URL" target="_blank" rel="noopener noreferrer"><img src="IMG_URL" alt="CAPTION" /></a><p>CAPTION</p></li></ol>
    if (!empty($remote->sections->screenshots)) {
      $res->sections['screenshots'] = $remote->sections->screenshots;
    }

    $res->banners = array(
      'low' => 'https://res.cloudinary.com/dimaslanjaka/image/fetch/http://www.joedolson.com/wp-content/uploads/banner-772x250-1-768x249.png',
      'high' => 'https://res.cloudinary.com/dimaslanjaka/image/fetch/https://big-andy.co.uk/content/uploads/2015/08/banner-1544x500-1400x453.jpg'
    );
    return $res;
  }

  return false;
}


add_filter('site_transient_update_plugins', 'misha_push_update');

function misha_push_update($transient)
{

  if (empty($transient->checked)) {
    return $transient;
  }

  // trying to get from cache first, to disable cache comment 10,20,21,22,24
  if (false == $remote = get_transient('upgrade_' . WMI_slug)) {

    // info.json is the file with the actual plugin information on your server
    $remote = wp_remote_get(
      WMI_JSON_URL,
      array(
        'timeout' => 10,
        'headers' => array(
          'Accept' => 'application/json'
        )
      )
    );

    if (!is_wp_error($remote) && isset($remote['response']['code']) && $remote['response']['code'] == 200 && !empty($remote['body'])) {
      set_transient('upgrade_' . WMI_slug, $remote, 43200); // 12 hours cache
    }
  }

  if ($remote) {

    $remote = json_decode($remote['body']);

    // your installed plugin version should be on the line below! You can obtain it dynamically of course
    if ($remote && version_compare(WMI_version, $remote->version, '<') && version_compare($remote->requires, get_bloginfo('version'), '<')) {
      $res = new stdClass();
      $res->slug = WMI_slug;
      $res->plugin = 'WMI_post_webhook/post_webhook.php'; // it could be just WMI_post_webhook.php if your plugin doesn't have its own directory
      $res->new_version = $remote->version;
      $res->tested = $remote->tested;
      $res->package = $remote->download_url;
      $transient->response[$res->plugin] = $res;
      //$transient->checked[$res->plugin] = $remote->version;
    }
  }
  return $transient;
}


add_action('upgrader_process_complete', 'WMI_after_upgrade', 10, 2);

function WMI_after_upgrade($upgrader_object, $options)
{
  precom($options);
  if ($options['action'] == 'update' && $options['type'] === 'plugin' && isset($options['plugins'])) {
    foreach ($options['plugins'] as $plugin) {
      if ($plugin == WMI_slug) {
        //set_transient('upgrade_' . WMI_slug, 1);
        //delete_transient('upgrade_' . WMI_slug);
      }
    }
  }
}
