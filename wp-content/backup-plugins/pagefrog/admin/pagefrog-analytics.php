<?php
    include "class-pagefrog-analytics-storage.php"; // holds PageFrog_Analaytics_Storage
    include "integrations/google-analytics.php"; // holds PageFrog_GoogleAnalytics

    function add_analytics_settings_fields() {
        $analytics = new PageFrog_Analytics_Storage();

        register_setting(
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            'PageFrog_Analytics_Storage::validate'
        );

        add_settings_section(
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            '',
            'render_analytics_main_description',
            $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG']
        );

        add_settings_field(
            'chartbeat_api_key',
            '',
            'render_chartbeat_api_key',
            $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'],
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            array('analytics' => $analytics)
        );

        add_settings_field(
            'chartbeat_uid',
            '',
            'render_chartbeat_uid',
            $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'],
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            array('analytics' => $analytics)
        );

        add_settings_field(
            'chartbeat_enabled',
            '',
            'render_chartbeat_enabled',
            $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'],
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            array('analytics' => $analytics)
        );

        add_settings_field(
            'parsely_api_key',
            '',
            'render_parsely_api_key',
            $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'],
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            array('analytics' => $analytics)
        );

        add_settings_field(
            'parsely_api_secret',
            '',
            'render_parsely_api_secret',
            $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'],
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            array('analytics' => $analytics)
        );

        add_settings_field(
            'parsely_enabled',
            '',
            'render_parsely_enabled',
            $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'],
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            array('analytics' => $analytics)
        );

        add_settings_field(
            'other_amp_analytics_code',
            '',
            'render_other_amp_analytics_code',
            $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'],
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            array('analytics' => $analytics)
        );

        add_settings_field(
            'other_fbia_analytics_code',
            '',
            'render_other_fbia_analytics_code',
            $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'],
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            array('analytics' => $analytics)
        );

        add_settings_field(
            'other_analytics_enabled',
            '',
            'render_other_analytics_enabled',
            $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'],
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            array('analytics' => $analytics)
        );

        add_settings_field(
            'google_analytics_enabled',
            '',
            'render_google_analytics_enabled',
            $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'],
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            array('analytics' => $analytics)
        );

        add_settings_field(
            'google_analytics_access_token',
            '',
            'render_google_analytics_access_token',
            $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'],
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            array('analytics' => $analytics)
        );

        add_settings_field(
            'google_analytics_refresh_token',
            '',
            'render_google_analytics_refresh_token',
            $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'],
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            array('analytics' => $analytics)
        );

        add_settings_field(
            'google_analytics_site_id',
            '',
            'render_google_analytics_site_id',
            $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'],
            PageFrog_Analytics_Storage::OPTIONS_KEY,
            array('analytics' => $analytics)
        );
    }

    function render_analytics_main_description() {}

    function render_chartbeat_api_key( $args ) {
        ?><input type="hidden" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[chartbeat_api_key]" value="<?php echo $args['analytics']->get_chartbeat_api_key(); ?>" ><?php
    }

    function render_chartbeat_uid( $args ) {
        ?><input type="hidden" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[chartbeat_uid]" value="<?php echo $args['analytics']->get_chartbeat_uid(); ?>" ><?php
    }

    function render_chartbeat_enabled( $args ) {
        ?><input type="hidden" id="pagefrog-chartbeat-enabled" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[chartbeat_enabled]" value="<?php echo $args['analytics']->get_chartbeat_enabled_string(); ?>" ><?php
    }

    function render_parsely_api_key( $args ) {
        ?><input type="hidden" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[parsely_api_key]" value="<?php echo $args['analytics']->get_parsely_api_key(); ?>" ><?php
    }

    function render_parsely_api_secret( $args ) {
        ?><input type="hidden" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[parsely_api_secret]" value="<?php echo $args['analytics']->get_parsely_api_secret(); ?>" ><?php
    }

    function render_parsely_enabled( $args ) {
        ?><input type="hidden" id="pagefrog-parsely-enabled" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[parsely_enabled]" value="<?php echo $args['analytics']->get_parsely_enabled_string(); ?>" ><?php
    }

    function render_other_amp_analytics_code( $args ) {
        ?><input type="hidden" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[other_amp_analytics_code]" value="<?php echo $args['analytics']->get_other_amp_analytics_code(); ?>"><?php
    }

    function render_other_fbia_analytics_code( $args ) {
        ?><input type="hidden" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[other_fbia_analytics_code]" value="<?php echo $args['analytics']->get_other_fbia_analytics_code(); ?>"><?php
    }

    function render_other_analytics_enabled( $args ) {
        ?><input type="hidden" id="pagefrog-other-analytics-enabled" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[other_analytics_enabled]" value="<?php echo $args['analytics']->get_other_analytics_enabled_string(); ?>" ><?php
    }

    function render_google_analytics_enabled( $args ) {
        ?><input type="hidden" id="pagefrog-google-analytics-enabled" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[google_analytics_enabled]" value="<?php echo $args['analytics']->get_google_analytics_enabled_string(); ?>" ><?php
    }

    function render_google_analytics_access_token( $args ) {
        ?><input type="hidden" id="pagefrog-google-analytics-access-token" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[google_analytics_access_token]" value="<?php echo $args['analytics']->get_google_analytics_access_token(); ?>" ><?php
    }

    function render_google_analytics_refresh_token( $args ) {
        ?><input type="hidden" id="pagefrog-google-analytics-refresh-token" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[google_analytics_refresh_token]" value="<?php echo $args['analytics']->get_google_analytics_refresh_token(); ?>" ><?php
    }

    function render_google_analytics_site_id( $args ) {
        ?><input type="hidden" id="pagefrog-google-analytics-site-id" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[google_analytics_site_id]" value="<?php echo $args['analytics']->get_google_analytics_site_id(); ?>" ><?php
    }

    function render_analytics_page( $analytics ) {
        $google_analytics = new PageFrog_GoogleAnalytics( $analytics );
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
<div id="pagefrog-settings-container">
    <div class="row">
        <div class="col-sm-12" id="pagefrog-settings-box">
            <div class="row">
                <div class="col-sm-12 margin-top-bottom">&nbsp;</div>
            </div>
            <div class="row">
                <div class="col-sm-12 margin-top-bottom">
                    <div class="row margin-top-bottom">
                        <div class="col-sm-6">
                            <div class="well hover-cursor thickbox-trigger" data-thickbox-target="google-analytics-modal" data-thickbox-title="GOOGLE ANALYTICS">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <img class="fullwidth" src="<?php echo plugin_dir_url( __FILE__  ) . 'images/google-analytics-icon.png'; ?>" alt="">
                                        <br/><br/>
                                        <p class="no-margin <?php if ( ! $analytics->get_google_analytics_enabled_bool() ) echo 'hidden'; ?>">
                                            <span class="pagefrog-status-circle small"><span class="pagefrog-status-circle-inner green"></span></span>&nbsp;Enabled
                                        </p>
                                        <p class="no-margin <?php if ( $analytics->get_google_analytics_enabled_bool() ) echo 'hidden'; ?>">
                                            <span class="pagefrog-status-circle small"><span class="pagefrog-status-circle-inner grey"></span></span>&nbsp;Disabled
                                        </p>
                                    </div>
                                    <div class="col-sm-9">
                                        <h3>GOOGLE ANALYTICS</h3>
                                        <p>Google Analytics is the most popular analytics tool for the web. It’s free and provides a wide range of features. It’s especially good at measuring traffic sources and ad campaigns.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="well hover-cursor thickbox-trigger" data-thickbox-target="chartbeat-modal" data-thickbox-title="CHARTBEAT">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <img class="fullwidth" src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chartbeat-icon.svg'; ?>" alt="">
                                        <br/><br/>
                                        <p class="no-margin <?php if ( ! $analytics->get_chartbeat_enabled_bool() ) echo 'hidden'; ?>">
                                            <span class="pagefrog-status-circle small"><span class="pagefrog-status-circle-inner green"></span></span>&nbsp;Enabled
                                        </p>
                                        <p class="no-margin <?php if ( $analytics->get_chartbeat_enabled_bool() ) echo 'hidden'; ?>">
                                            <span class="pagefrog-status-circle small"><span class="pagefrog-status-circle-inner grey"></span></span>&nbsp;Disabled
                                        </p>
                                    </div>
                                    <div class="col-sm-9">
                                        <h3>CHARTBEAT</h3>
                                        <p>Chartbeat helps you understand, measure, and monetize the time that audiences actively spend with your site’s online content.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row margin-top-bottom">
                        <div class="col-sm-6">
                            <div class="well hover-cursor thickbox-trigger" data-thickbox-target="parsely-modal" data-thickbox-title="PARSELY">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <img class="fullwidth" src="<?php echo plugin_dir_url( __FILE__ ) . 'images/parsely-icon.svg'; ?>" alt="">
                                        <br/><br/>
                                        <p class="no-margin <?php if ( ! $analytics->get_parsely_enabled_bool() ) echo 'hidden'; ?>">
                                            <span class="pagefrog-status-circle small"><span class="pagefrog-status-circle-inner green"></span></span>&nbsp;Enabled
                                        </p>
                                        <p class="no-margin <?php if ( $analytics->get_parsely_enabled_bool() ) echo 'hidden'; ?>">
                                            <span class="pagefrog-status-circle small"><span class="pagefrog-status-circle-inner grey"></span></span>&nbsp;Disabled
                                        </p>
                                    </div>
                                    <div class="col-sm-9">
                                        <h3>PARSELY</h3>
                                        <p>Parse.ly partners with digital publishers to provide clear audience insights through an intuitive analytics platform.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="well hover-cursor thickbox-trigger" data-thickbox-target="other-analytics-modal" data-thickbox-title="OTHER ANALYTICS">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <img class="fullwidth" src="<?php echo plugin_dir_url( __FILE__ ) . 'images/others-icon.svg';?>" alt="">
                                        <br/><br/>
                                        <p class="no-margin <?php if ( ! $analytics->get_other_analytics_enabled_bool() ) echo 'hidden'; ?>">
                                            <span class="pagefrog-status-circle small"><span class="pagefrog-status-circle-inner green"></span></span>&nbsp;Enabled
                                        </p>
                                        <p class="no-margin <?php if ( $analytics->get_other_analytics_enabled_bool() ) echo 'hidden'; ?>">
                                            <span class="pagefrog-status-circle small"><span class="pagefrog-status-circle-inner grey"></span></span>&nbsp;Disabled
                                        </p>
                                    </div>
                                    <div class="col-sm-9">
                                        <h3>OTHER ANALYTICS</h3>
                                        <p>You can add any arbitrary analytics provider's tracking code to track pageviews across mobile formats.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 margin-top-bottom">&nbsp;</div>
            </div>
        </div>
    </div>
</div>

<div class="hidden analytics-modal" id="google-analytics-modal">
    <div class="grey-background padding-box grey-bottom-border">
        <div class="row">
            <div class="col-sm-4 margin-top-bottom">
                <img class="fullwidth" src="<?php echo plugin_dir_url( __FILE__ ) . 'images/google-analytics-logo.png'; ?>" alt="">
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8">
                <p>Google Analytics is the most popular analytics tool for the web. It’s free and provides a wide range of features. It’s especially good at measuring traffic sources and ad campaigns.</p>
            </div>
            <div class="col-sm-4" style="margin-top:60px">
                <a href="#" class="button green pull-right enable-integration <?php if ( $analytics->get_google_analytics_enabled_bool() ) echo 'hidden'; ?>" data-integration-id="#pagefrog-google-analytics-enabled">Enable Integration</a>
                <a href="#" class="button yellow pull-right disable-integration <?php if ( ! $analytics->get_google_analytics_enabled_bool() ) echo 'hidden'; ?>" data-integration-id="#pagefrog-google-analytics-enabled">Disable Integration</a>
            </div>
        </div>
    </div>
    <div class="padding-box">
        <div class="row">
            <div class="col-sm-8">
                <?php 
                if ( $google_analytics->is_authorized() ) {
                    $response = $google_analytics->get_sites_list();
                    if ( $response['status'] === 'ok' ) {
                        $sites = $response['data'];
                        foreach( $sites as $site ) {
                            $web_properties = $site['webProperties'];
                            foreach ( $web_properties as $web_property ) {
                                $active_site = $web_property['id'] === $analytics->get_google_analytics_site_id();
                            ?>
                                <div class="row">
                                    <div class="well div col-sm-12 margin-top-bottom">
                                        <h3>
                                            <a href="<?php echo $web_property['websiteUrl']; ?>" target="_blank"><?php echo $web_property['name'];?></a>
                                            <?php if ( $active_site ) : ?>
                                                <a href="#" data-google-analytics-tracking-code="<?php echo $web_property['id']; ?>" class="button yellow disabled pull-right">Site Chosen</a>
                                            <?php else : ?>
                                                <a href="#" data-google-analytics-tracking-code="<?php echo $web_property['id']; ?>" class="button green google-analytics-choose-site pull-right">Choose Site</a>
                                            <?php endif; ?>
                                        </h3>
                                        <p>Tracking Code: <?php echo $web_property['id']; ?></p>
                                    </div>
                                </div>
                            <?php
                            }
                        }
                    } else {
                        // only show this error if there aren't other ones we are already showing.
                        if ( ! isset( $errors['google_analytics_access_token'] ) && ! isset( $errors['google_analytics_refresh_token'] ) ) {
                            ?>
                                <div class="error-box alert red" style="top:0;">
                                    <p class="required"><?php echo $response['message']; ?></p>
                                </div>
                            <?php
                        }
                    }
                }
                ?>
            </div>
            <div class="col-sm-4">
                <?php if ( isset( $errors['google_analytics_site_id'] ) ) : ?>
                <div class="error-box alert red">
                    <p class="required"><?php echo $errors['google_analytics_site_id']; ?></p>
                </div>
                <?php endif; ?>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8">
                <?php 
                if ( $google_analytics->is_authorized() ) {
                    ?>
                       <p><strong>Change Google Analytics Accounts: </strong></p>
                       <p><a href="#" data-href="<?php echo PageFrog_GoogleAnalytics::get_auth_url(); ?>" class="auth-google-analytics" style="display:inline-block;"><img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/google-btn.png'; ?>" alt="" style="width:200px;"></a></p>
                   <?php
                } else {
                    ?>
                        <p><a href="#" data-href="<?php echo PageFrog_GoogleAnalytics::get_auth_url(); ?>" class="auth-google-analytics" style="display:inline-block;"><img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/google-btn.png'; ?>" alt="" style="width:200px;"></a></p>
                    <?php
                }
                ?>
                <p class="required">Connecting your Google account will only give PageFrog access to your Analytics data—nothing else! Your data will be used to compare the performance of Facebook Instant Articles, Google AMP HTML, and the mobile web.</p>
            </div>
            <div class="col-sm-4">
                <?php if ( isset( $errors['google_analytics_refresh_token'] ) ) : ?>
                <div class="error-box alert red">
                    <p class="required"><?php echo $errors['google_analytics_refresh_token'] ?></p>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 margin-top-bottom">&nbsp;</div>
    </div>
</div>

<div class="hidden analytics-modal" id="parsely-modal">
    <div class="grey-background padding-box grey-bottom-border">
        <div class="row">
            <div class="col-sm-4 margin-top-bottom">
                <img class="fullwidth" src="<?php echo plugin_dir_url( __FILE__ ) . 'images/parsely-logo.svg'; ?>" alt="">
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8">
                <p>Parse.ly partners with digital publishers to provide clear audience insights through an intuitive analytics platform.</p>
            </div>
            <div class="col-sm-4" style="margin-top:25px">
                <a href="#" class="button green pull-right enable-integration <?php if ( $analytics->get_parsely_enabled_bool() ) echo 'hidden'; ?>" data-integration-id="#pagefrog-parsely-enabled">Enable Integration</a>
                <a href="#" class="button yellow pull-right disable-integration <?php if ( ! $analytics->get_parsely_enabled_bool() ) echo 'hidden'; ?>" data-integration-id="#pagefrog-parsely-enabled">Disable Integration</a>
            </div>
        </div>
    </div>
    <div class="padding-box">
        <div class="row">
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-sm-8 margin-top-bottom">
                        <div class="form-group">
                            <label for="pagefrog-parsely-api-key"><strong>API KEY</strong></label>
                            <input type="text" id="pagefrog-parsely-api-key" class="form-control sync-form" placeholder="" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[parsely_api_key]" value="<?php echo $analytics->get_parsely_api_key(); ?>" >
                            <p class="required">This is the API Key specified in your Parsely Javascript tracker.</p>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <?php if ( isset( $errors['parsely_api_key'] ) ) : ?>
                        <div class="error-box alert red">
                            <p class="required"><?php echo $errors['parsely_api_key']; ?></p>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-8 margin-top-bottom">
                        <div class="form-group">
                            <label for="pagefrog-parsely-api-secret"><strong>API SECRET</strong></label>
                            <input type="text" id="pagefrog-parsely-api-secret" class="form-control sync-form" placeholder="" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[parsely_api_secret]" value="<?php echo $analytics->get_parsely_api_secret(); ?>" >
                            <p class="required">You can find your API Secret <a href="http://dash.parsely.com/to/settings/api" target="_blank">here</a>.</p>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <?php if ( isset( $errors['parsely_api_secret'] ) ) : ?>
                        <div class="error-box alert red">
                            <p class="required"><?php echo $errors['parsely_api_secret']; ?></p>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 margin-top-bottom">
                        <div class="form-group">
                            <input type="submit" class="button green submit-analytics" value="Save Changes">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 margin-top-bottom">&nbsp;</div>
    </div>
</div>

<div class="hidden analytics-modal" id="other-analytics-modal">
    <div class="grey-background padding-box grey-bottom-border">
        <div class="row">
            <div class="col-sm-8">
                <p>You can add any arbitrary analytics provider's tracking code to track pageviews across mobile formats.</p>
            </div>
            <div class="col-sm-4" style="margin-top:25px">
                <a href="#" class="button green pull-right enable-integration <?php if ( $analytics->get_other_analytics_enabled_bool() ) echo 'hidden'; ?>" data-integration-id="#pagefrog-other-analytics-enabled">Enable Integration</a>
                <a href="#" class="button yellow pull-right disable-integration <?php if ( ! $analytics->get_other_analytics_enabled_bool() ) echo 'hidden'; ?>" data-integration-id="#pagefrog-other-analytics-enabled">Disable Integration</a>
            </div>
        </div>
    </div>
    <div class="padding-box">
        <div class="row">
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-sm-8 margin-top-bottom">
                        <div class="form-group">
                            <label for="pagefrog-other-amp-analytics-javascript"><strong>Amp-Analytics Tag</strong></label>
                            <textarea id="pagefrog-other-amp-analytics-javascript" rows="6" class="form-control sync-form" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[other_amp_analytics_code]"><?php echo $analytics->get_other_amp_analytics_code(); ?></textarea>
                            <p class="required">This code will be added to your AMP HTML pages. Note that this must include a complete &lt;amp-analytics&gt; tag. You can find information about how to write this tag <a href="https://www.ampproject.org/docs/reference/extended/amp-analytics.html" target="_blank">here</a>.</p>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <?php if ( isset( $errors['other_amp_analytics_code'] ) ) : ?>
                        <div class="error-box alert red">
                            <p class="required"><?php echo $errors['other_amp_analytics_code']; ?></p>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-8 margin-top-bottom">
                        <div class="form-group">
                            <label for="pagefrog-other-fbia-analytics-javascript"><strong>Instant Articles Analytics Javascript</strong></label>
                            <textarea id="pagefrog-other-fbia-analytics-javascript" rows="6" class="form-control sync-form" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[other_fbia_analytics_code]"><?php echo $analytics->get_other_fbia_analytics_code(); ?></textarea>
                            <p class="required">This code will be added inside of an invisible iframe inside of your Instant Articles. The above should be valid HTML (a script tag is necessary to include javascript). Information on analytics for Instant Articles can be found <a href="https://developers.facebook.com/docs/instant-articles/ads-analytics#analytics" target="_blank">here</a>.</p>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <?php if ( isset( $errors['other_fbia_analytics_code'] ) ) : ?>
                        <div class="error-box alert red">
                            <p class="required"><?php echo $errors['other_fbia_analytics_code']; ?></p>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-8 margin-top-bottom">
                        <div class="form-group">
                            <input type="submit" class="button green submit-analytics" value="Save Changes">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 margin-top-bottom">&nbsp;</div>
    </div>
</div>

<div class="hidden analytics-modal" id="chartbeat-modal">
    <div class="grey-background padding-box grey-bottom-border">
        <div class="row">
            <div class="col-sm-4 margin-top-bottom">
                <img class="fullwidth" src="<?php echo plugin_dir_url( __FILE__ ) . 'images/chartbeat-logo.svg'; ?>" alt="">
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8">
                <p>Chartbeat helps you understand, measure, and monetize the time that audiences actively spend with your site’s online content.</p>
            </div>
            <div class="col-sm-4" style="margin-top:45px">
                <a href="#" class="button green pull-right enable-integration <?php if ( $analytics->get_chartbeat_enabled_bool() ) echo 'hidden'; ?>" data-integration-id="#pagefrog-chartbeat-enabled">Enable Integration</a>
                <a href="#" class="button yellow pull-right disable-integration <?php if ( ! $analytics->get_chartbeat_enabled_bool() ) echo 'hidden'; ?>" data-integration-id="#pagefrog-chartbeat-enabled">Disable Integration</a>
            </div>
        </div>
    </div>
    <div class="padding-box">
        <div class="row">
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-sm-8 margin-top-bottom">
                        <div class="form-group">
                            <label for="pagefrog-chartbeat-api-key"><strong>API KEY</strong></label>
                            <input type="text" id="pagefrog-chartbeat-api-key" class="form-control sync-form" placeholder="" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[chartbeat_api_key]" value="<?php echo $analytics->get_chartbeat_api_key(); ?>" >
                            <p class="required">You can find your API Key <a href="https://chartbeat.com/apikeys/" target="_blank">here</a>. Make sure to select an API key that has access to all calls for your domain.</p>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <?php if ( isset( $errors['chartbeat_api_key'] ) ) : ?>
                        <div class="error-box alert red">
                            <p class="required"><?php echo $errors['chartbeat_api_key']; ?></p>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-8 margin-top-bottom">
                        <div class="form-group">
                            <label for="pagefrog-chartbeat-uid"><strong>UID</strong></label>
                            <input type="text" id="pagefrog-chartbeat-uid" class="form-control sync-form" placeholder="" name="<?php echo PageFrog_Analytics_Storage::OPTIONS_KEY; ?>[chartbeat_uid]" value="<?php echo $analytics->get_chartbeat_uid(); ?>" >
                            <p class="required">The UID is the numeric tracking key that you use in your JavaScript tracking code. This can be found by looking in your existing tracking code, or you can <a href="mailto:support@chartbeat.com?subject=Please%20Send%20Me%20My%20UID">ask</a> the Chartbeat team.</p>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <?php if ( isset( $errors['chartbeat_uid'] ) ) : ?>
                        <div class="error-box alert red">
                            <p class="required"><?php echo $errors['chartbeat_uid']; ?></p>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-8 margin-top-bottom">
                        <div class="form-group">
                            <input type="submit" class="button green submit-analytics" value="Save Changes">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 margin-top-bottom">&nbsp;</div>
    </div>
</div>


<form action="options.php" method="post" class="hidden" id="pagefrog-analytics-settings-form">
<?php
    settings_fields( PageFrog_Analytics_Storage::OPTIONS_KEY );
    do_settings_sections( $GLOBALS['PAGEFROG_ANALYTICS_PAGE_SLUG'] );
?>
</form>
<?php
}
?>