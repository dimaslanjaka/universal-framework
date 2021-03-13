<div class="uk-panel uk-panel-box" id="amp_menu">
    <div class="uk-form">
        <fieldset>
            <legend><i class="fa fa-search"></i> SEO</legend>
            <!--div class="uk-form-row switch-row">
                <input type="hidden" value="0" name="amps[disable_menu_display]"/>
                <label><input id="disable_menu_display" value="1" name="amps[disable_menu_display]" <?php if (isset($amps['disable_menu_display'])) checked($amps['disable_menu_display']); ?> type="checkbox"> Hide Navigation Menu on AMP Page <i title="By checking this, AMP will stop displaying menu on your AMP Page." class="fa fa-info-circle"></i></label>
            </div-->
            <div class="uk-form uk-form-stacked">
                <fieldset>

                    <div class="uk-form-row uk-grid"> 
                        <div class="uk-width-4-4">
                            <input type="hidden" value="0" name="amps[use_seo_meta]"/>
                            <label class="switch">
                                <input value="1" name="amps[use_seo_meta]" <?php checked($amps['use_seo_meta']); ?> type="checkbox">
                                <div class="slider round"></div>
                            </label>
                            <label class="switch_button">Render SEO Meta Data</label>
                            <p>By turning this on, SEO meta data coming from plugins such as <a href="http://www.projectsupremacy.com" target="_blank">Project Supremacy</a>, Yoast, All In One SEO, Platinum SEO will be rendered inside of AMP activated locations.</p>
                        </div>
                    </div>
                    <div class="uk-form-row">
                        <label class="switch_button" ><i class="fa fa-google"></i> Google Site Verification:</label>
                        <div id="site_verification_help" style="display:none;">
                            <img src="<?php echo AMP_URL; ?>assets/img/google-verify.png" width="165" height="100"/>
                            <img src="<?php echo AMP_URL; ?>assets/img/google-verify-text.png"/>
                            <p><i>Insert ONLY key from content attribute - example: <b>EZp6wgQhNQ9wsFeCsOpkjjvRIyEnWma8Dlv-VGN2xEY</b></i></p>
                            <h4>Follow the following process to obtain your Code:</h4>
                            <ol>
                                <li>Go to <a href="https://www.google.com/webmasters/tools/home" target="_blank">Google Webmaster Tools</a> and add <b><?php echo get_site_url(); ?></b> as New Property.
                                    <img src="<?php echo AMP_URL; ?>assets/img/google-site-verify/screenshot_1.png" class="goole-verify-img">
                                </li>
                                <li>Choose 'HTML Tag' as a Verification Method and copy/note the Google Verification Code
                                    <img src="<?php echo AMP_URL; ?>assets/img/google-site-verify/screenshot_2.png" class="goole-verify-img">
                                </li>
                                <li>Input the code you noted/copied into 'Google Site Verification' field and click 'Save Changes'</li>
                                <li>Now, click 'Verify' button at bottom of the page you see in #2 as a final step</li>
                            </ol>
                        </div>

                        <a href="#TB_inline?width=783&height=400&inlineId=site_verification_help" class="thickbox"><i class="fa fa-info-circle"></i> Help</a>


                        <textarea rows="3" class="uk-width-1-1" style="margin-top:15px;" id="site_verification" name="amps[site_verification]" placeholder='eg. EZp6wgQhNQ9wsFeCsOpkjjvRIyEnWma8Dlv-VGN2xEY'><?php echo $amps['site_verification']; ?></textarea>
                    </div>
        </fieldset>
    </div>
</div>