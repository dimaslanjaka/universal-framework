<div class="uk-panel uk-panel-box" id="amps_lite_tab_content">
    <div class="uk-grid uk-grid-small">
        <div class="uk-width-1-1">
            <fieldset>
                <div class="uk-form">
                    <div class="uk-form-row uk-grid">
                        <p><a href="#TB_inline?width=783&inlineId=all_about_sitemap" class="thickbox sitemap-help"><i class="fa fa-info-circle"></i> How does AMP Sitemap Work?</a></p>
                        <p><a href="#TB_inline?width=783&inlineId=all_about_ga" class="thickbox sitemap-help"><i class="fa fa-info-circle"></i> How does AMP Google Analytics Work?</a></p>
                    </div>
                </div>
                <br/>
                <?php if (!$registration_status) { ?>
                    <div class="uk-panel uk-panel-box" style="border-top-color: #ccc !important;">
                        <div class="uk-form register_aamp_container">
                            <fieldset>
                                <?php if (!$AMPLiteLicenseRequested && empty($AMPLiteLicenseRequestEmail)) { ?>
                                    <legend><i class="fa fa-user-plus"></i>&nbsp; Request a License </legend>
                                    <form method="post" class="af-form-wrapper" accept-charset="UTF-8" id="amps_lite_request_license_form">
                                        <div class="uk-alert uk-alert-danger amps_lite_request_license-notice" style="display:none;"></div>
                                        <div class="uk-form-row">
                                            <label for="amps_lite_user_name" style="margin-top: 5px">Name:&nbsp;</label>
                                            <input id="amps_lite_user_name" name="amps_lite_user_name" style="margin-top: 5px" type="text" placeholder="Enter Full Name"/>
                                            &nbsp;
                                            <label for="amps_lite_user_email" style="margin-top: 5px">Email:&nbsp;</label>
                                            <input id="amps_lite_user_email" name="amps_lite_user_email" style="margin-top: 5px" type="text" placeholder="Enter valid Email"/>
                                            &nbsp;
                                            <button class="uk-button uk-button-small uk-button-success amps_lite_request_license_submit_btn" type="button" name="submit">Submit</button>
                                        </div>
                                    </form>
                                <?php } else { ?>
                                    <div class="uk-alert uk-alert-warning" style="margin-bottom: 0">Your license key is shared with you at: <?php echo $AMPLiteLicenseRequestEmail; ?></div>
                                <?php } ?>
                            </fieldset>
                        </div>
                    </div>
                    <br/>
                <?php } ?>
                    
                <?php if (empty($registration_status) && $AMPLiteLicenseRequested) { ?>
                    <div class="uk-alert" style="margin-top:0">
                        <p><b>Did not recieve the mail containing your Licence?</b><br/><br/>
                            We've created an account for you as well to download the plugin in case anything goes wrong.  You'll need to register your account by clicking <a href="<?php echo AMPS_LICENSING_URL.'/members/register/clearcookie' ?>" target="_blank">here</a>, with following credentials:<br><br>
							<b>Email: </b> <?php echo $AMPLiteLicenseRequestEmail ?><br>
							<b>Password: </b>(Your Choice)</p>
                    </div>
                <?php } ?>
                    
                <?php if (empty($registration_status)) { ?>
                    <div class="uk-panel uk-panel-box" style="border-top-color: #ccc !important;">
                        <div class="uk-form register_aamp_container">
                            <fieldset>
                                <legend><i class="fa fa-user-plus"></i>&nbsp; Register your License </legend>
                                <form method="post" class="af-form-wrapper" accept-charset="UTF-8" id="amps_lite_license_form">
                                    <div class="uk-alert uk-alert-danger amps_lite_license-notice" style="display:none;"></div>
                                    <div class="uk-form-row"><label for="amps_lite_license" style="margin-top: 5px">License Key:</label>
                                        <input id="amps_lite_license" name="amps_lite_license" style="margin-top: 5px" type="text" placeholder="XXXX-XXXX-XXXX-XXXX"/>
                                        <button class="uk-button uk-button-small uk-button-success amps_lite_license_submit_btn" type="button" name="submit">Get AMP Lite Registered</button>
                                    </div>
                                </form>
                            </fieldset>
                        </div>
                    </div>
                    <br/>
                <?php } ?>
                <div style="position: relative">
                    <?php
                    $amps_analytics_action_ext = ($registration_status && $is_amp_lite_active) ? '' : '_amps';
                    do_action('amp_supremacy_load_analytics_widget' . $amps_analytics_action_ext, $amps, $is_amp_lite_active);
                    if (empty($registration_status) || empty($is_amp_lite_active)):
                        ?>
                        <img src="<?php echo AMP_URL; ?>assets/img/overlay.png" class="overlay-image"/>
                        <a class="uk-button uk-button-big uk-button-primary overlay-image-btn" href="<?php echo admin_url('plugins.php') ?>" target="_blank">Activate AMP Supremacy Lite</a>
                    <?php endif; ?>
                </div>
            </fieldset>
        </div>
    </div>
</div>

<div id="add_sitemap_to_google" style="display:none;">
    <h2>Why should I submit my sitemap to Google?</h2>
    <p>Submission of your sitemap to Google will add to your website's SEO and Google will be able to know what are the links to your AMP Pages so that it can index those pages in Google Search Results.</p>
    <h4>Follow the following process to submit your sitemap:</h4>
    <ol>
        <li>Go to <a href="https://www.google.com/webmasters/tools/home" target="_blank">Google Webmaster Tools</a> and add <b><?php echo get_site_url(); ?></b> as New Property.
            <img src="<?php echo AMP_URL; ?>assets/img/google-site-verify/screenshot_1.png" class="goole-verify-img" height='300'>
        </li>
        <li>Click your property (website) link and you will be redirected to your property field.
            <img src="<?php echo AMP_URL; ?>assets/img/google-site-verify/click-your-property.png" class="goole-verify-img">
        </li>
        <li>Search and click the link saying <code>Sitemap</code>, then click <code>ADD/TEST SITEMAP</code> and you will see a pop-up box asking for your website's sitemap. Put it in and click submit and its done
            <img src="<?php echo AMP_URL; ?>assets/img/google-site-verify/click-sitemap-link.png" class="goole-verify-img">
        </li>
    </ol>
    <?php if ($amp_sitemap_xml_exists) { ?>
        <p><b>Note: </b> We have already created your AMP Supremacy Lite at <code><?php echo get_site_url() . '/amp-sitemap.xml' ?></code></p>
    <?php } ?>
</div>

<div id="all_about_sitemap" style="display:none;">
    <h2>What is AMP Sitemap?</h2>
    <p>Sitemap carries the list of AMP Pages operating on your website. They must follow the Google Sitemap validation schema</p>
    <h4>Follow the following process to obtain your Sitemap:</h4>
    <ol>
        <li>Once you have successfully installed this AMP Supremacy Lite, following the instructions you will be able to display the sitemap for AMP Pages on your site.</li>
        <li>Add a shortcode <code>[amp-supremacy-sitemap]</code> in your posts' or pages' content.</li>
        <li>When this post / page containing shortcode for AMP Sitemap is accessed through browser, this will contain a list of AMP Links at your site</li>
    </ol>
    <p><b>Note: </b> You can create a seperate page to contain AMP Links </p>
    <ul style="list-style: disc">
        <li>Add a following PHP code line in your preferred template file which can be found in your active theme folder:</li>
        <li style="margin-left:50px; list-style: none;"><legend><code>&lt;&quest;php echo do_shortcode('[amp-supremacy-sitemap]'); &quest;&gt; </code></legend></li>
        <li>This plugin do not create any seperate file (XML or plain text) to contain the list of AMP Links. </li>
    </ul>
</div>

<div id="all_about_ga" style="display:none;">
    <h2>What are Google Analytics?</h2>
    <p>Google Analytics is a web service provided by Google to keep track of the traffic visiting your website.</p>
    <p><b>Note: The analytics configuration made from AMP Supremacy Settings will only be applicable for AMP Page(s).</b></p>
    <h4>Follow the following process to configure Google Analytics on your AMP Pages:</h4>
    <ol>
        <li>Once you have successfully installed this AMP Supremacy Lite, following the instructions you will be able to find AMP\'s Google Analytics report in Google Analytics.</li>
        <li>Add your website in Google Analytics at <a href='http://analytics.google.com/analytics/web/' target='_blank'>Google Anaytics</a>
            <img src="<?php echo AMP_URL; ?>assets/img/ga/ga-init.png" class="goole-verify-img" height='300'>
        </li>
        <li>Copy your tracking ID from 'Admin' through navigation bar<img src="<?php echo AMP_URL; ?>assets/img/ga/copy-tracking-id.png" class="goole-verify-img" height='300'></li>
        <li>Paste your tracking ID in following input field and click 'Save Changes'<img src="<?php echo AMP_URL; ?>assets/img/ga/amp-ga-input.png" class="goole-verify-img" height='300'></li>
        <li>Now, you will be able to see your analytics in GA Dashboard<img src="<?php echo AMP_URL; ?>assets/img/ga/show-analytics.png" class="goole-verify-img" height='300'></li>
    </ol>
</div>