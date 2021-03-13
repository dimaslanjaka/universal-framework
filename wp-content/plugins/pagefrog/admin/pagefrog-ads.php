<?php 
include_once "integrations/google-adsense.php"; // contains PageFrog_GoogleAdSense
function add_ads_settings_fields() {
    $ads = new PageFrog_AdSettings_Storage();

    register_setting(
        PageFrog_AdSettings_Storage::OPTIONS_KEY,
        PageFrog_AdSettings_Storage::OPTIONS_KEY,
        'PageFrog_AdSettings_Storage::validate'
    );

    add_settings_section(
        PageFrog_AdSettings_Storage::OPTIONS_KEY,
        '',
        'render_ads_main_description',
        $GLOBALS['PAGEFROG_ADS_PAGE_SLUG']
    );

    add_settings_field(
        'fbia_enable_auto_ads',
        '',
        'render_fbia_enable_auto_ads',
        $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'],
        PageFrog_AdSettings_Storage::OPTIONS_KEY,
        array( 'ads' => $ads )
    );

    add_settings_field(
        'fbia_placement_id',
        '',
        'render_fbia_placement_id',
        $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'],
        PageFrog_AdSettings_Storage::OPTIONS_KEY,
        array( 'ads' => $ads )
    );

    add_settings_field(
        'google_adsense_access_token',
        '',
        'render_google_adsense_access_token',
        $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'],
        PageFrog_AdSettings_Storage::OPTIONS_KEY,
        array( 'ads' => $ads )
    );

    add_settings_field(
        'google_adsense_refresh_token',
        '',
        'render_google_adsense_refresh_token',
        $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'],
        PageFrog_AdSettings_Storage::OPTIONS_KEY,
        array( 'ads' => $ads )
    );

    add_settings_field(
        'google_adsense_account_id',
        '',
        'render_google_adsense_account_id',
        $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'],
        PageFrog_AdSettings_Storage::OPTIONS_KEY,
        array( 'ads' => $ads )
    );

    add_settings_field(
        'google_adsense_account_name',
        '',
        'render_google_adsense_account_name',
        $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'],
        PageFrog_AdSettings_Storage::OPTIONS_KEY,
        array( 'ads' => $ads )
    );

    add_settings_field(
        'google_adsense_adunit_name',
        '',
        'render_google_adsense_adunit_name',
        $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'],
        PageFrog_AdSettings_Storage::OPTIONS_KEY,
        array( 'ads' => $ads )
    );

    add_settings_field(
        'google_adsense_adunit_dimensions',
        '',
        'render_google_adsense_adunit_dimensions',
        $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'],
        PageFrog_AdSettings_Storage::OPTIONS_KEY,
        array( 'ads' => $ads )
    );

    add_settings_field(
        'google_adsense_adunit_id',
        '',
        'render_google_adsense_adunit_id',
        $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'],
        PageFrog_AdSettings_Storage::OPTIONS_KEY,
        array( 'ads' => $ads )
    );

    add_settings_field(
        'amp_enable_google_adsense',
        '',
        'render_amp_enable_google_adsense',
        $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'],
        PageFrog_AdSettings_Storage::OPTIONS_KEY,
        array( 'ads' => $ads )
    );

    add_settings_field(
        'amp_words_per_ad',
        '',
        'render_amp_words_per_ad',
        $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'],
        PageFrog_AdSettings_Storage::OPTIONS_KEY,
        array( 'ads' => $ads )
    );
}
function render_ads_main_description() {}
function render_fbia_enable_auto_ads( $args ) {
    ?><input type="hidden" name="<?php echo PageFrog_AdSettings_Storage::OPTIONS_KEY; ?>[fbia_enable_auto_ads]" value="<?php echo $args['ads']->get_fbia_enable_auto_ads_string(); ?>"><?php
}
function render_fbia_placement_id( $args ) {
    ?><input type="hidden" name="<?php echo PageFrog_AdSettings_Storage::OPTIONS_KEY; ?>[fbia_placement_id]" value="<?php echo $args['ads']->get_fbia_placement_id(); ?>"><?php
}
function render_google_adsense_access_token( $args ) {
    ?><input id="pagefrog-google-adsense-access-token" type="hidden" name="<?php echo PageFrog_AdSettings_Storage::OPTIONS_KEY; ?>[google_adsense_access_token]" value="<?php echo $args['ads']->get_google_adsense_access_token(); ?>"><?php
}
function render_google_adsense_refresh_token( $args ) {
    ?><input id="pagefrog-google-adsense-refresh-token" type="hidden" name="<?php echo PageFrog_AdSettings_Storage::OPTIONS_KEY; ?>[google_adsense_refresh_token]" value="<?php echo $args['ads']->get_google_adsense_refresh_token(); ?>"><?php
}
function render_google_adsense_account_id( $args ) {
    ?><input id="pagefrog-google-adsense-account-id" type="hidden" name="<?php echo PageFrog_AdSettings_Storage::OPTIONS_KEY; ?>[google_adsense_account_id]" value="<?php echo $args['ads']->get_google_adsense_account_id(); ?>"><?php
}
function render_google_adsense_account_name( $args ) {
    ?><input id="pagefrog-google-adsense-account-name" type="hidden" name="<?php echo PageFrog_AdSettings_Storage::OPTIONS_KEY; ?>[google_adsense_account_name]" value="<?php echo $args['ads']->get_google_adsense_account_name(); ?>"><?php
}
function render_google_adsense_adunit_name( $args ) {
    ?><input id="pagefrog-google-adsense-adunit-name" type="hidden" name="<?php echo PageFrog_AdSettings_Storage::OPTIONS_KEY; ?>[google_adsense_adunit_name]" value="<?php echo $args['ads']->get_google_adsense_adunit_name(); ?>"><?php
}
function render_google_adsense_adunit_dimensions( $args ) {
    ?><input id="pagefrog-google-adsense-adunit-dimensions" type="hidden" name="<?php echo PageFrog_AdSettings_Storage::OPTIONS_KEY; ?>[google_adsense_adunit_dimensions]" value="<?php echo $args['ads']->get_google_adsense_adunit_dimensions(); ?>"><?php
}
function render_google_adsense_adunit_id( $args ) {
    ?><input id="pagefrog-google-adsense-adunit-id" type="hidden" name="<?php echo PageFrog_AdSettings_Storage::OPTIONS_KEY; ?>[google_adsense_adunit_id]" value="<?php echo $args['ads']->get_google_adsense_adunit_id(); ?>"><?php
}
function render_amp_enable_google_adsense( $args ) {
    ?><input id="pagefrog-google-adsense-enable" type="text" name="<?php echo PageFrog_AdSettings_Storage::OPTIONS_KEY; ?>[amp_enable_google_adsense]" value="<?php echo $args['ads']->get_amp_enable_google_adsense_string(); ?>"><?php
}
function render_amp_words_per_ad( $args ) {
    ?><input id="pagefrog-amp-words-per-ad" type="hidden" name="<?php echo PageFrog_AdSettings_Storage::OPTIONS_KEY; ?>[amp_words_per_ad]" value="<?php echo $args['ads']->get_amp_words_per_ad(); ?>"><?php
}

function render_ads_page() {
    $ads = new PageFrog_AdSettings_Storage();
    $google_adsense = new PageFrog_GoogleAdSense( $ads );
    $errors_retrieved = get_settings_errors();
    $errors = array();
    foreach( $errors_retrieved as $error ) {
        $errors[$error['setting']] = $error['message'];
    }
 ?>
<div>
    <img src="<?php echo plugin_dir_url(__FILE__) . 'images/logo_color.png'; ?>" alt="" id="pagefrog-big-logo">
    <p>PageFrog allows content publishers to instantly optimize their content for Facebook Instant Articles, Google <br> AMP, and Apple News.</p>
</div>

<div id="pagefrog-settings-container" class="tab-content">
    <div class="row">
        <div class="col-sm-12 white-settings-box">
            <div class="row">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-12 margin-top-bottom big-margin-bottom">
                            <div class="row">
                                <div class="col-sm-12">
                                    <h3><img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/facebook_logo.png'; ?>" alt="" style="width:14px;">&nbsp;Facebook Instant Articles</h3>
                                    <hr>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <p><strong>Automatic Ad Placement by Facebook</strong></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 margin-top-bottom">
                                    <label for="fbia-placement-id">Enter your Audience Network Placement ID to enable ads for Instant Articles:</label>
                                    <input type="text" id="fbia-placement-id" name="<?php echo PageFrog_AdSettings_Storage::OPTIONS_KEY; ?>[fbia_placement_id]" class="sync-form form-control" value="<?php echo $ads->get_fbia_placement_id(); ?>">
                                    <p class="required">You can find more info on how ads work for Instant Articles <a href="https://developers.facebook.com/docs/instant-articles/ads-analytics" target="_blank">here</a></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <label for="fbia-place-ads">
                                        <input id="fbia-place-ads" type="checkbox" name="<?php echo PageFrog_AdSettings_Storage::OPTIONS_KEY; ?>[fbia_enable_auto_ads]" class="sync-form" value="true" <?php if ( $ads->get_fbia_enable_auto_ads_bool() ) echo 'checked="checked"'; ?>>&nbsp;Enable Facebook Ads
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-12">
                                    <h3><img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/google_logo.png'; ?>" alt="" style="width:16px;margin-bottom:-2px;">&nbsp;Google AMP HTML</h3>
                                    <hr>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <?php if ( ! $google_adsense->is_authorized() || ! $ads->google_adsense_account_chosen() ) : ?>
                                        <p>Connect your Google AdSense account to enable ads for AMP</p>
                                        <a href="#" class="auth-google-adsense" data-href="<?php echo PageFrog_GoogleAdSense::get_auth_url(); ?>">
                                            <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/google-btn.png'; ?>" alt="" style="width:200px;">
                                        </a>
                                        <p class="required">Connecting your Google account will only give PageFrog read-access to your AdSense data—nothing else! Ad units in the account that work well with AMP will be found and added to your AMP pages.</p>
                                        <div class="error-box alert red ads-popup-not-working hidden" style="top:0px;">
                                            <p class="required">Not working? If you have an ad-blocker, try pausing it then refreshing the page to set up your ads configuration.</p>
                                        </div>
                                    <?php elseif ( ! $ads->google_adsense_adunit_chosen() ) : ?>
                                        <h3>AdSense Account</h3>
                                        <p>Choose your AdSense Ad Unit to display on your AMP HTML pages by clicking <a href="#" class="show-google-adsense-adunits-modal">here</a>.</p>
                                        <p>Or disconnect your Google Account by clicking <a href="#" class="disconnect-google-adsense-account">here</a>.</p>
                                    <?php else : ?>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h3>AdSense Account</h3>
                                            <p><?php echo $ads->get_google_adsense_account_name(); ?> (ID: <?php echo $ads->get_google_adsense_account_id(); ?>)&nbsp;<a href="#" class="disconnect-google-adsense-account">Disconnect</a></p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 margin-top-bottom">
                                            <h3>Ad Unit (<a href="#" class="disconnect-google-adsense-account">Manage</a>)</h3>
                                            <div class="ad-unit-preview" style="display:table;overflow:hidden;background-color:#f1f1f1;border-radius:5px;width:<?php echo $ads->get_google_adsense_adunit_width(); ?>px;height:<?php echo $ads->get_google_adsense_adunit_height(); ?>px;">
                                                <div style="display:table-cell;vertical-align:middle;">
                                                    <p class="text-center"><strong><?php echo $ads->get_google_adsense_adunit_name(); ?></strong></p>
                                                    <p class="required text-center"><?php echo $ads->get_google_adsense_adunit_width(); ?>&nbsp;&times;&nbsp;<?php echo $ads->get_google_adsense_adunit_height(); ?></p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12 margin-top-bottom">
                                                    <label for="pagefrog-amp-enable-google-adsense">
                                                        <input id="pagefrog-amp-enable-google-adsense" type="checkbox" name="<?php echo PageFrog_AdSettings_Storage::OPTIONS_KEY; ?>[amp_enable_google_adsense]" class="sync-form" value="true" <?php if ( $ads->get_amp_enable_google_adsense_bool() ) echo 'checked="checked"'; ?>>&nbsp;Enable Google AdSense for AMP HTML Pages
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h3>Ad Placement</h3>
                                            <p>Show an ad every&nbsp;<input type="number" class="form-control text-center sync-form" name="<?php echo PageFrog_AdSettings_Storage::OPTIONS_KEY; ?>[amp_words_per_ad]" value="<?php echo $ads->get_amp_words_per_ad(); ?>" style="width:75px;display:inline-block;">&nbsp;words
                                            </p>
                                            <p class="required">Set the frequency of ad appearances. The recommended frequency is one ad per 250 words.</p>
                                        </div>
                                    </div>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    </div>         
                    <div class="row">
                        <div class="col-sm-12 margin-top-bottom">
                            <input type="submit" class="button green pull-right submit-ads-form" value="Save All Settings">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="hidden ads-modal" id="google-adsense-adunits-modal" data-title="AdSense Setup">
    <?php if ( $google_adsense->is_authorized() && $ads->google_adsense_account_chosen() && ! $ads->google_adsense_adunit_chosen() ) : ?>
        <div class="hidden show-modal"></div>

        <div class="row">
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-sm-12">
                        <h2 class="text-center">Choose AdSense Ad Unit</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="row">
                            <?php if ( $google_adsense->is_authorized() ) {
                                $response = $google_adsense->get_adunits_list();
                                if ( $response['status'] === 'ok' ) {
                                    $adunits = $response['data'];
                                    foreach ( $adunits as $adunit ) {
                                        ?>
                                            <div class="col-sm-6">
                                                <div class="well margin-top-bottom">
                                                    <div class="row">
                                                        <div class="col-sm-12">
                                                            <div class="row">
                                                                <div class="col-sm-8">
                                                                    <h3 class="no-margin"><?php echo $adunit['name']; ?></h3>
                                                                </div>
                                                                <div class="col-sm-4">
                                                                    <a href="#" class="button green pull-right select-google-adsense-adunit" data-adunit-dimensions="<?php echo $adunit['contentAdsSettings']['size']; ?>" data-adunit-id="<?php echo $adunit['id']; ?>" data-adunit-name="<?php echo $adunit['name']; ?>">Choose</a>
                                                                </div>
                                                            </div>
                                                            <p class="required no-margin">Ad Slot: <?php echo PageFrog_AdSettings_Storage::parse_adsense_ad_slot_from( $adunit['id'] ); ?></p>
                                                            <p class="required no-margin">Size: <?php echo PageFrog_AdSettings_Storage::parse_adsense_width_from( $adunit['contentAdsSettings']['size'] ); ?>&nbsp;&times;&nbsp;<?php echo PageFrog_AdSettings_Storage::parse_adsense_height_from( $adunit['contentAdsSettings']['size'] ); ?></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        <?php
                                    }
                                } else {
                                    ?>
                                        <div class="col-sm-12">
                                            <div class="error-box alert red" style="top:0px;">
                                                <p class="required"><?php echo $response['message']; ?></p>
                                                <p>
                                                    <a href="#" class="auth-google-adsense" data-href="<?php echo PageFrog_GoogleAdSense::get_auth_url(); ?>">
                                                        <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/google-btn.png'; ?>" alt="" style="width:200px;">
                                                    </a>
                                                </p>
                                                </div>
                                            </div>
                                        </div>
                                    <?php
                                }
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?php endif; ?>
</div>


<div class="hidden ads-modal" id="google-adsense-accounts-modal" data-title="AdSense Setup">

    <?php if ( $google_adsense->is_authorized() && ! $ads->google_adsense_account_chosen() ) : ?>
        <div class="hidden show-modal"></div>

        <div class="row">
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-sm-12">
                        <h2 class="text-center">Choose AdSense Account</h2>
                    </div>
                </div>
                <?php if ( isset( $errors['google_adsense_account_id'] ) ) : ?>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="error-box alert red" style="top:0px;">
                                <p class="required"><?php echo $response['message']; ?></p>
                                <p class="required">Please choose your account.</p>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="row">
                            <?php if ( $google_adsense->is_authorized() ) {
                                $response = $google_adsense->get_accounts_list();
                                if ( $response['status'] === 'ok' ) {
                                    $accounts = $response['data'];
                                    foreach ( $accounts as $account ) {
                                        ?>
                                            <div class="col-sm-6">
                                                <div class="well margin-top-bottom">
                                                    <div class="row">
                                                        <div class="col-sm-12">
                                                            <div class="row">
                                                                <div class="col-sm-8">
                                                                    <h3 class="no-margin"><?php echo $account['name']; ?></h3>
                                                                </div>
                                                                <div class="col-sm-4">
                                                                    <a href="#" class="button green pull-right select-google-adsense-account" data-account-id="<?php echo $account['id']; ?>" data-account-name="<?php echo $account['name']; ?>">Choose</a>
                                                                </div>
                                                            </div>
                                                            <p class="required no-margin">ID: <?php echo $account['id']; ?></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        <?php
                                    }
                                } else {
                                    ?>
                                        <div class="col-sm-12">
                                            <div class="error-box alert red" style="top:0px;">
                                                <p class="required"><?php echo $response['message']; ?></p>
                                                <p class="required">Please try to add your account again.</p>
                                                <a href="#" class="auth-google-adsense" data-href="<?php echo PageFrog_GoogleAdSense::get_auth_url(); ?>">
                                                    <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/google-btn.png'; ?>" alt="" style="width:200px;">
                                                </a>
                                                <p class="required">Connecting your Google account will only give PageFrog read-access to your AdSense data—nothing else! Ad units in the account that work well with AMP will be found and added to your AMP pages.</p>
                                            </div>
                                        </div>
                                    <?php
                                }
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?php endif; ?>
</div>

<form action="options.php" method="post" class="hidden" id="pagefrog-ads-settings-form">
    <?php 
        settings_fields( PageFrog_AdSettings_Storage::OPTIONS_KEY );
        do_settings_sections( $GLOBALS['PAGEFROG_ADS_PAGE_SLUG'] );
    ?>
</form>
<?php
}
