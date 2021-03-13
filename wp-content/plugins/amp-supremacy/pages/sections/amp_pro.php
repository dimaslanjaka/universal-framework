<div class="uk-panel uk-panel-box" id="useonsettings">
    <div class="uk-grid uk-grid-small">
        <?php
        if (defined('AMP_SUPREMACY_PRO_ACTIVE')) {
            do_action('amp_supremacy_socials_settings_widget', $amps);
            do_action('amp_supremacy_add_ad_settings_action');
        } else {
            do_action('amp_supremacy_load_amp_pro_dummy_controls');
            ?>
            <img src="<?php echo AMP_URL; ?>assets/img/overlay.png" class="overlay-image" style="margin-left:-10px;width: 100%;height:100%"/>
            <a class="uk-button uk-button-big uk-button-primary overlay-image-btn" href="http://ampsupremacy.com/pro" target="_blank">GET AMP Supremacy PRO</a>
            <?php
        }
        ?>
    </div>
</div>