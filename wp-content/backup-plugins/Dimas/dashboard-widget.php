<?php

use Curl\Curl;
/*
 * 	Custom dashboard widget
 */

add_action('wp_dashboard_setup', 'DimasWidgets');

function DimasWidgets()
{
  global $wp_meta_boxes;

  wp_add_dashboard_widget('custom_help_widget', 'Last Login', 'DimasDashboardWidget');
}
/**
 * Display custom widget.
 *
 * @return void
 */
function DimasDashboardWidget()
{
  echo '<p>Last login: ' . wpb_lastlogin() . ' ago <br> Your IP: ' . getUIP() . '</p>';
  $all_login = json_decode(all_user_last_login());
  echo '<center><b>Log user Login</b></center>'; ?>
  <div class="history">
    <table class="table" id="table">
      <thead>
        <tr>
          <th>User</th>
          <th>Last login</th>
          <th>IP</th>
          <th>Location</th>
          <th>Full address</th>
        </tr>
      </thead>
      <tbody>
        <?php
        if (isset($all_login)) {
          foreach ($all_login as $a) {
            //var_dump($a);
            if ('::1' == $a->ip || !$a->ip || strlen($a->ip) < 5) {
              $user = wp_get_current_user();
              $update_ip = (filter_var(getUIP(), FILTER_VALIDATE_IP) ? getUIP() : false);
              if ($update_ip) {
                update_user_meta($user->ID, 'login_ip', $update_ip);
              }
            }
            if ($a->login < 300) {
              continue;
            }
            $agc = new gtrans();
            $curl = $agc->cURL(false);
            $curl->setReferer(get_home_url());
            $curl->setReferrer(get_home_url());
            //precom(get_home_url() . '/callback');
            $c = $agc->fetch_contents($curl, 'https://freegeoip.app/json/' . $a->ip, 'json', ['filehour' => (int) 360, 'fileExt' => 'json']);
            $JSONIP = $c->response;
        ?>
            <tr>
              <td><?= $a->nickname; ?>
              </td>
              <td><?= human_time_diff($a->login); ?> ago
              </td>
              <td><?= $a->ip; ?>
              </td>
              <td>
                <?php
                echo "{$JSONIP->city}, {$JSONIP->region_name}, {$JSONIP->country_name}";
                ?>
              </td>
              <td>
                <?php
                $gmaps = "https://maps.googleapis.com/maps/api/geocode/json?latlng={$JSONIP->latitude},{$JSONIP->longitude}&key=AIzaSyBQUeDjbwpS8YCApba7OFuvqwdKRFCsvmo";
                $addr = $agc->fetch_contents($curl, $gmaps, 'json', ['fileExt' => 'json', 'filehour' => 370]);
                try {
                  echo $addr->response->results[0]->formatted_address;
                } catch (\Throwable $th) {
                  //throw $th;
                }
                ?>
              </td>
            </tr>
        <?php
          }
        } ?>
      </tbody>
    </table>
  </div>
<?php

}

add_action('admin_head', function () {
  echo '<link rel="stylesheet" href="' . plugin_dir_url(__FILE__) . 'assets/style.css"/>';
});

/**
 * Display last login time.
 */
function wpb_lastlogin()
{
  $last_login = get_the_author_meta('last_login');
  if (!$last_login) {
    return 0;
  }
  $the_login_date = human_time_diff($last_login);

  return $the_login_date;
}
