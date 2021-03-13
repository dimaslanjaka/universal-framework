<?php
function WMI_password_page()
{
  global $password_admin_hook;
  if (isset($_POST['submit-webhook-password'])) {
    update_option('wp-webhook-pass', trim(strip_slashes_recursive($_POST['wp_webhook_pass'])));
    update_option('CKEY', WMI_UnsafeCrypto::str2hex(trim(strip_slashes_recursive($_POST['crypto_key']))));
  }
  $encrypted = WMI_crypto_e(get_option('wp-webhook-pass'));
  $decrypted = WMI_crypto_d($encrypted);
?>
  <div class="wrap">
    <div class="w3-card-4">
      <header class="w3-container w3-blue">
        <h1>Password for <span class="w3-text-white">authenticate webhook</span></h1>
      </header>
      <div class="w3-container">
        <form name="form1" method="post" style="margin: auto;" action="<?= $password_admin_hook ?>&updated=true">
          <fieldset class="options">

            <label style="font-weight:bold" for="wp_webhook_pass">Password webhook:</label>
            <br />
            <input name="wp_webhook_pass" class="w3-input" id="wp_webhook_pass" value="<?= $decrypted; ?>" />

            <br>
            <label style="font-weight:bold" for="">Password webhook (<b>For AGC</b>):</label>
            <br>
            <small>Insert this into AGC Authentication</small>
            <br />
            <textarea disabled class="w3-input" onclick="this.select()"><?= $encrypted; ?></textarea>

            <br>
            <label style="font-weight:bold" for="crypto_key">Password SALT Key:</label>
            <br />
            <input name="crypto_key" id="crypto_key" class="w3-input" value="<?= WMI_SaferCrypto::hex2str(WMI_crypto_key()); ?>" />

            <br>
            <label style="font-weight:bold" for="" class="">Generated SALT Key:</label>
            <br />
            <input disabled class="w3-input" value="<?= WMI_crypto_key(); ?>" />

            <input type="hidden" name="submit-webhook-password">
          </fieldset>

          <div class="submit">
            <input type="submit" class="w3-btn w3-blue" value="<?php _e('Update Options') ?> &raquo;" />
          </div>

        </form>
      </div>
    </div>
  </div>
<?php
}
