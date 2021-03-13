<?php require_once AMP_PATH . '/pages/sections/amp-db-settings.php'; ?>
<div class="wrap prs">
    <div class="uk-grid logo-title">
        <div class="uk-width-1-10 margin-logo"><img class="logo-image" src="<?php echo AMP_URL; ?>/assets/img/logo.png"></div>
        <div class="uk-width-6-10 margin-page-heading"><h2>AMP Supremacy <?php echo plugin_get_version(); ?></h2></div>
        <div class="uk-width-3-10" style="margin-top: 1%; margin-left: 85px">
            <a class="uk-button uk-button-big uk-button-primary" href="https://wordpress.org/support/plugin/amp-supremacy/reviews/" target="_blank">Leave a review</a>
            <a class="uk-button uk-button-big uk-button-primary" href="http://amp.freshdesk.com" target="_blank">Ask for AMP Support</a>
        </div>
    </div>
    <form class="amp-settings-form">
        <input type="hidden" name="action" value="amp_save_options" />
        <div class="uk-grid uk-grid-small">
            <div class="uk-width-3-4 amp-settings-panel-nav">
                <ul uk-tab data-uk-tab>
                    <li id="ampsSettingsTab"><a href="javascript:void(0)" class="amp-menu"><i class="fa fa-gears"></i>SETTINGS</a></li>
                    <li><a href="javascript:void(0)"><i class="fa fa-image"></i>DESIGN</a></li>
                    <li><a href="javascript:void(0)"><i class="fa fa-navicon"></i>MENU</a></li>
                    <li><a href="javascript:void(0)"><i class="fa fa-map"></i>ST-DATA</a></li>
                    <li><a href="javascript:void(0)"><i class="fa fa-search"></i>SEO</a></li>
                    <li><a href="javascript:void(0)"><i class="fa fa-bolt"></i>AMP TEST</a></li>
                    <li><a href="javascript:void(0)"><i class="fa fa-mobile"></i>MOBILE TEST</a></li>
                    <li><a href="javascript:void(0)" class="green-tab"><i class="fa fa-forward"></i>AMP LITE</a></li>
                    <li><a href="javascript:void(0)" class="green-tab"><i class="fa fa-lightbulb-o"></i>AMP PRO</a></li>
                </ul>
                <ul class="uk-switcher">
                    <li> <?php require_once AMP_PATH . '/pages/sections/settings.php'; ?> </li>
                    <li> <?php require_once AMP_PATH . '/pages/sections/design.php'; ?> </li>
                    <li> <?php require_once AMP_PATH . '/pages/sections/menu.php'; ?> </li>
                    <li> <?php require_once AMP_PATH . '/pages/sections/structured_data.php'; ?> </li>
                    <li> <?php require_once AMP_PATH . '/pages/sections/seo.php'; ?> </li>
                    <li>
                        <div class="uk-panel uk-panel-box" id="google_amp_ready">
                            <div class="uk-form">
                                <fieldset>
                                    <div class="uk-form-row switch-row">
                                        <iframe src="https://validator.ampproject.org/" width="100%" height="700"></iframe>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </li>
                    <li> <?php require_once AMP_PATH . '/pages/sections/mobile_test.php'; ?> </li>
                    </form>
                    <li><?php require_once AMP_PATH . '/pages/sections/amp_lite.php'; ?></li>
                    <li><?php require_once AMP_PATH . '/pages/sections/amp_pro.php'; ?></li>
                </ul>
            </div>
            <div class="uk-width-1-4 sidemobile" style="position: relative; ">
                <?php $amps_mobile_screen_url = (isset($amps['mobile_screen_url']) && !empty($amps['mobile_screen_url'])) ? $amps['mobile_screen_url'] : AMPS_SAMPLE_PAGE_URL ; ?>
                <img src="<?php echo AMP_URL; ?>assets/img/phone.png" class="mobile-screen-iphone">
                <iframe src="<?php echo $amps_mobile_screen_url; ?>" class="mobile-iframe" id="mobile_screen_iframe"></iframe>
                <input type="submit" name="" id="" class="uk-button uk-button-big uk-button-primary save-preview-btn" value="SAVE &amp; PREVIEW">
            </div>
        </div>

</div>