<?php

/**
 * reCaptcha warning
 *
 * @return void
 */
function recaptcha_warning()
{
  global $recaptcha_path;
  echo "<div id='recaptcha-warning' class='updated fade-ff0000'><p><strong>reCAPTCHA is <span style='color:red'>not active</span></strong> You must <a href='options-general.php?page=" . $recaptcha_path . "'>enter your reCAPTCHA API key</a> for it to work</p></div>";
}

/**
 * reCaptcha footer
 *
 * @return void
 */
function recaptcha_footer()
{
  echo '<p style="text-align: center; font-size: .85em;">&copy; Copyright 2007 - ' . date('Y') . ' <a href="https://www.google.com/recaptcha">reCAPTCHA</a> Recoded by <a href="//web-manajemen.blogspot.com" target="_blank" rel="noopener noreferrer">Dimas Lanjaka</a></p>
  ';
}

/**
 * reCaptcha Main Setup
 *
 * @return void
 */
function WMI_reCaptcha()
{
  global $recaptcha_public_hook;
  global $recaptcha_admin_hook;
  $optionarray_def = array(
    'pubkey'  => '',
    'privkey'   => '',
  );
  /** reCAPTCHA Options */
  add_option('plugin_recaptcha', $optionarray_def, '');

  /* Check form submission and update options if no error occurred */
  if (isset($_POST['submit-recaptcha'])) {
    $optionarray_update = array(
      'pubkey'  => $_POST['recaptcha_opt_pubkey'],
      'privkey'  => $_POST['recaptcha_opt_privkey'],
    );
    update_option('plugin_recaptcha', $optionarray_update);
  }

  /* Get options */
  $optionarray_def = get_option('plugin_recaptcha');

?>
  <div class="wrap">
    <div class="w3-card-4">
      <header class="w3-container w3-blue">
        <h1>reCAPTCHA Options</h1>
      </header>
      <div class="w3-container">
        <p>reCAPTCHA asks commenters to read two words from a book. One of these words proves
          that they are a human, not a computer. The other word is a word that a computer couldn't read.
          Because the user is known to be a human, the reading of that word is probably correct. So you don't
          get comment spam, and the world gets books digitized. Everybody wins! For details, visit
          the <a href="https://www.google.com/recaptcha" target="_blank">reCAPTCHA website</a>.
          <br>
          reCAPTCHA requires an API key, consisting of a "public" and a "private" key. You can <a href="https://www.google.com/recaptcha/admin" target="_blank" rel="noopener noreferrer">login</a> or <a href="<?php echo recaptcha_get_signup_url($_SERVER['HTTP_HOST'], 'wordpress'); ?>" target="_blank">sign up</a> for a free reCAPTCHA key.
        </p>

        <form name="form1" method="post" style="margin: auto;" action="<?= $recaptcha_admin_hook ?>&updated=true">
          <fieldset class="options">

            <label style="font-weight:bold" for="recaptcha_opt_pubkey">Public Key:</label>
            <br />
            <input name="recaptcha_opt_pubkey" id="recaptcha_opt_pubkey" size="40" value="<?php echo $optionarray_def['pubkey']; ?>" class="w3-input" />
            <br>
            <label style="font-weight:bold" for="recaptcha_opt_privkey"><?= _e('Private Key:') ?> </label>
            <br />
            <input name="recaptcha_opt_privkey" id="recaptcha_opt_privkey" size="40" value="<?php echo $optionarray_def['privkey']; ?>" class="w3-input" />
            <input type="hidden" name="submit-recaptcha">
          </fieldset>
          <div class="submit">
            <input type="submit" class="w3-btn w3-green" value="<?php _e('Update Options') ?> &raquo;" />
          </div>
        </form>
      </div>
    </div>
  </div>
<?php
  if (!empty($optionarray_def['pubkey'])) {
    echo '<script src="https://www.google.com/recaptcha/api.js?render=' . $optionarray_def['pubkey'] . '"></script>
<script>
  grecaptcha.ready(function() {
    grecaptcha.execute("' . $optionarray_def['pubkey'] . '").then(function(token) {

    });
  });
</script>';
  }
  add_action('admin_footer', 'recaptcha_footer');
}
