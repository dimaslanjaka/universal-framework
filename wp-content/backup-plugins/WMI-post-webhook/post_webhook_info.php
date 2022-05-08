<?php

function WMI_webHook_info()
{
  $webhook = is_WMI_post_inserter();
?>
  <div class="wrap">


    <div class="w3-container">
      <div class="w3-card-4">
        <header class="w3-container w3-blue">
          <h1>Webhook Information</h1>
        </header>
        <p>
          <table class="w3-table w3-stripped">
            <tr>
              <th>Webhook URL</th>
              <td><?= get_home_url() .  $webhook ?></td>
            </tr>
            <tr>
              <th>Webhook Password</th>
              <td><?= WMI_crypto_e(get_option('wp-webhook-pass')) ?></td>
            </tr>
          </table>
          <div class="w3-container">
            <blockquote class="w3-panel w3-green">
              <p>
                Webhook passwords will always change, but can still be read by the system. Just copy the password and insert into AGC webhook requester.
              </p>
            </blockquote>
          </div>
        </p>
      </div>
    </div>
  </div>
<?php
}
