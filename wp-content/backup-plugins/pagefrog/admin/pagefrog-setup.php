<?php
    global $user_email;
    get_currentuserinfo();
?>
<input type="hidden" id="pagefrog-submit-contact-details-hidden-email" value="<?php echo $user_email; ?>">
<input type="hidden" id="pagefrog-submit-contact-details-hidden-site" value="<?php echo get_site_url(); ?>">
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
                    <div class="well">
                        <div class="row">
                            <div class="col-sm-1">
                                <img src="<?php echo plugin_dir_url(__FILE__) . 'images/facebook_logo.png'; ?>" alt="Facebook Instant Articles" class="fullwidth logo-max-width" style="margin-top:20px;">
                            </div>
                            <div class="col-sm-8">
                                <h3>Facebook Instant Article</h3>
                                <p>Instant Articles is a new way for publishers to create fast, interactive articles on Facebook which load instantly, as much as 10 times faster than the standard mobile web.</p>
                            </div>
                            <div class="col-sm-3">
                                <div class="row">
                                    <div class="col-sm-12 margin-top-bottom"></div>
                                </div>
                                <h1 class="text-center">
                                    <a href="#" class="button green button-lg thickbox" id="facebook-walkthrough-button">Begin Setup</a>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 margin-top-bottom">
                    <div class="well">
                        <div class="row">
                            <div class="col-sm-1">
                                <img src="<?php echo plugin_dir_url(__FILE__) . 'images/google_logo.png'; ?>" alt="AMP" class="fullwidth small-margin-top logo-max-width" style="margin-top:20px;">
                            </div>
                            <div class="col-sm-8">
                                <h3>Google AMP HTML</h3>
                                <p>The Accelerated Mobile Pages (AMP) Project is an open source initiative that embodies the vision that publishers can create mobile optimized content once and have it load instantly everywhere.</p>
                            </div>
                            <div class="col-sm-3">
                                <div class="row">
                                    <div class="col-sm-12 margin-top-bottom"></div>
                                </div>
                                <?php if ( ! wp_amp_plugin_is_installed() ) { ?>
                                    <h1 class="text-center"><a href="#" id="amp-walkthrough-button" class="button green button-lg thickbox">Begin Setup</a></h1>
                                    <?php
                                } else if ( ! wp_amp_plugin_is_active() ) { ?>
                                    <h1 class="text-center"><a href="#" data-href="<?php echo get_activate_wp_amp_plugin_url() ?>" class="button green button-lg" id="activate-amp-button">Activate AMP Plugin</a></h1>
                                    <h1 class="text-center margin-top-bottom hidden" id="pagefrog-amp-ready" style="margin-top:20px;line-height:1;"><button class="button greenoutline button-lg" disabled><strong>&nbsp;&nbsp;&nbsp;Ready&nbsp;<span class="green">&#x2713;&nbsp;&nbsp;&nbsp;</span></strong></button></h1>
                                    <?php
                                } else { ?>
                                    <h1 class="text-center margin-top-bottom" id="pagefrog-amp-ready" style="margin-top:20px;line-height:1;"><button class="button greenoutline button-lg" disabled><strong>&nbsp;&nbsp;&nbsp;Ready&nbsp;<span class="green">&#x2713;&nbsp;&nbsp;&nbsp;</span></strong></button></h1>
                                    <?php
                                } ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 margin-top-bottom">
                    <div class="well">
                        <div class="row">
                            <div class="col-sm-1">
                                <img src="<?php echo plugin_dir_url(__FILE__) . 'images/apple_logo.png'; ?>" alt="Apple News" class="fullwidth small-margin-top logo-max-width" style="margin-top:20px;">
                            </div>
                            <div class="col-sm-8">
                                <h3>Apple News Format</h3>
                                <p>The Apple News Format allows publishers to craft beautiful editorial layouts optimized for all iOS devices, brought to millions of readers and look great no matter which device their on.</p>
                            </div>
                            <div class="col-sm-3">
                                <div class="row">
                                    <div class="col-sm-12 margin-top-bottom"></div>
                                </div>
                                <h2 class="text-center margin-top-bottom" style="margin-top:20px;line-height:1;"><button class="button blackoutline button-lg" disabled><strong>Coming Soon</strong></button></h2>
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
<div id="facebook-walkthrough-modal" class="hidden">
    <div class="row">
        <div class="col-sm-12">
            <ul class="cbp_tmtimeline">
                <li>
                    <div class="cbp_tmicon">1</div>
                    <div class="cbp_tmlabel">
                        <h2>Apply to become an Instant Articles publisher</h2>
                        <a class="button green button-lg" href="https://www.facebook.com/help/contact/1439673582999850?__mref=message" target="_blank" role="button">Request Access</a></button>
                        <h6>If you have already been approved by Facebook, proceed to Step 2.</h6>
                    </div>
                </li>
                <li>
                    <div class="cbp_tmicon">2</div>
                    <div class="cbp_tmlabel">
                        <h2>Navigate to your Facebook Page and access Publishing Tools</h2>
                        <img src="<?php echo plugin_dir_url(__FILE__) . 'images/fbia-walkthrough-step-1.jpg'; ?>">
                    </div>
                </li>
                <li>
                    <div class="cbp_tmicon">3</div>
                    <div class="cbp_tmlabel">
                        <h2>Navigate to Production under the Instant Articles section</h2>
                        <img src="<?php echo plugin_dir_url(__FILE__) . 'images/fbia-walkthrough-step-2.jpg'; ?>">
                    </div>
                </li>
                <li>
                    <div class="cbp_tmicon">4</div>
                    <div class="cbp_tmlabel">
                        <h2>Click on the Set Up button</h2>
                        <img src="<?php echo plugin_dir_url(__FILE__) . 'images/fbia-walkthrough-step-3.jpg'; ?>">
                    </div>
                </li>
                <li>
                    <div class="cbp_tmicon">5</div>
                    <div class="cbp_tmlabel">
                        <h2>Copy this unique RSS feed:</h2>
                        <div class="col-lg-12">
                            <div class="input-group">
                                <input class="form-control prevent-input-modification" value="<?php echo get_site_url() . '/?feed=' . $GLOBALS['PAGEFROG_FBIA_FEED_NAME']; ?>" disabled="disabled"/>
                                <p class="text-shadow hidden"><?php echo get_site_url() . '/?feed=' . $GLOBALS['PAGEFROG_FBIA_FEED_NAME']; ?></p>
                                <span class="input-group-button">
                                    <input class="button unselectable" type="button" id="copy-feed-button" data-clipboard-text="<?php echo get_site_url() . '/?feed=' . $GLOBALS['PAGEFROG_FBIA_FEED_NAME']; ?>" value="Copy" data-swf-location="<?php echo plugin_dir_url(__FILE__) . 'images/ZeroClipboard.swf'; ?>"/>
                                </span>
                            </div>
                        </div>
                        <br/><br/>
                        <h2>Paste it into the RSS Feed URL field, then click Submit for Review</h2>
                        <img src="<?php echo plugin_dir_url(__FILE__) . 'images/fbia-walkthrough-step-4.jpg'; ?>">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<div id="amp-walkthrough-modal" class="hidden">
    <div class="row">
        <div class="col-sm-12">
            <ul class="cbp_tmtimeline">
                <li>
                    <div class="cbp_tmicon">1</div>
                    <div class="cbp_tmlabel">
                        <h2>Download plugin for AMP support on your articles</h2>
                            <a class="button green button-lg" href="<?php echo get_site_url() . '/wp-admin/plugin-install.php?tab=plugin-information&plugin=amp'; ?>" target="_blank" role="button">Download Now</a>
                    </div>
                </li>
                <li>
                    <div class="cbp_tmicon">2</div>
                    <div class="cbp_tmlabel">
                        <h2>Click Install Now</h2>
                    </div>
                </li>
                <li>
                    <div class="cbp_tmicon">3</div>
                    <div class="cbp_tmlabel">
                        <h2>Click Activate Plugin</h2>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>