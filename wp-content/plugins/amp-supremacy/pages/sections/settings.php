<div class="uk-panel uk-panel-box" id="useonsettings">
    <div class="uk-alert">
        <p><span class="uk-badge">NOTE</span>
            Tweak the settings from above to set up how the AMP will be used on your website.</p>
    </div>
    <div class="uk-panel uk-panel-box" style="border-top-color: #ccc !important;">
        <div class="uk-form">
            <fieldset>
                <legend><i class="fa fa-mobile-phone"></i>&nbsp; Choose a Page for Mobile Screen</legend>
                <ul class="uk-form-row mobile-screen-entity">
                    <div class="alert alert-warning uk-alert uk-alert-warning" style="display:<?php echo (empty($amps) || !in_array(TRUE, $ampsAllObjectsSet)) ? 'block' : 'none' ?>">Please enable AMP for some object (Post, Pages, Home, Category or Tag) below to get more options</div>
                    <li id="mobile_screen_ctrls_for_home" style="display:<?php echo (empty($amps['on_home'])) ? 'none' : 'inline' ?>">
                        <input <?php if(isset($amps['mobile_screen_entity']) && $amps['mobile_screen_entity'] == 'home'){ echo 'checked'; } else { echo '';} ?> type="radio" class="mobile_screen_entity" name="amps[mobile_screen_entity]" value="home" id="mobile_screen_entity_home" data-url="<?php echo site_url().'/amp/'; ?>"/>
                        <label for="mobile_screen_entity_home">Home</label>
                    </li>

                    <li id="mobile_screen_ctrls_for_post" style="display:<?php echo (empty($amps['on_posts'])) ? 'none' : 'inline' ?>">
                        <input <?php if(isset($amps['mobile_screen_entity']) && $amps['mobile_screen_entity'] == 'post'){ echo 'checked'; } else { echo '';} ?> type="radio" class="mobile_screen_entity" name="amps[mobile_screen_entity]" value="post" id="mobile_screen_entity_post" />
                        <label for="mobile_screen_entity_post">Post</label>
                    </li>

                    <li id="mobile_screen_ctrls_for_page" style="display:<?php echo (empty($amps['on_pages'])) ? 'none' : 'inline' ?>">
                        <input <?php if(isset($amps['mobile_screen_entity']) && $amps['mobile_screen_entity'] == 'page'){ echo 'checked'; } else { echo '';}  ?> type="radio" class="mobile_screen_entity" name="amps[mobile_screen_entity]" value="page" id="mobile_screen_entity_page" />
                        <label for="mobile_screen_entity_page">Page</label>
                    </li>

                    <li id="mobile_screen_ctrls_for_category" style="display:<?php echo (empty($amps['on_categories'])) ? 'none' : 'inline' ?>">
                        <input <?php if(isset($amps['mobile_screen_entity']) && $amps['mobile_screen_entity'] == 'category'){ echo 'checked'; } else { echo '';} ?> type="radio" class="mobile_screen_entity" name="amps[mobile_screen_entity]" value="category" id="mobile_screen_entity_category" />
                        <label for="mobile_screen_entity_category">Category</label>
                    </li>

                    <li id="mobile_screen_ctrls_for_tag" style="display:<?php echo (empty($amps['on_tags'])) ? 'none' : 'inline' ?>">
                        <input <?php if(isset($amps['mobile_screen_entity']) && $amps['mobile_screen_entity'] == 'tag'){ echo 'checked'; } else { echo '';} ?> type="radio" class="mobile_screen_entity" name="amps[mobile_screen_entity]" value="tag" id="mobile_screen_entity_tag" />
                        <label for="mobile_screen_entity_tag">Tag</label>
                    </li>

                    <input <?php if((isset($amps['mobile_screen_entity']) && $amps['mobile_screen_entity'] == 'demo') or (empty($amps)) or (!isset($amps['mobile_screen_entity']))){ echo 'checked'; } else { echo '';} ?> type="radio" class="mobile_screen_entity_demo" name="amps[mobile_screen_entity]" value="demo" id="mobile_screen_entity_demo" data-url="<?php echo AMPS_SAMPLE_PAGE_URL; ?>"/>
                    <label for="mobile_screen_entity_demo">Demo Page</label>
                </ul>

                <?php $entities_in_pptc = (isset($amps['mobile_screen_entity']) && in_array($amps['mobile_screen_entity'], array('post', 'page', 'category', 'tag'))); ?>
                <div class="uk-form-row mobile-screen-entity-select" style="display: <?php echo $entities_in_pptc ? 'block' : 'none' ;  ?> ">
                    <label class="mobile-screen-entity-label"> Select <span class="entity_name"><?php echo $entities_in_pptc ? ucfirst($amps['mobile_screen_entity']) : ''; ?></span></label>
                    <select id="mobile_screen_entity_selectbox">
                        <option class="entity_name_select">Select
                            <?php echo $entities_in_pptc ? ucfirst($amps['mobile_screen_entity']) : ''; ?>
                        </option>
                        <?php
                            if(!empty($amps_get_entity['payload'])){
                                $amps_data_entity_option = $entities_in_pptc ? $amps['mobile_screen_entity'] : '';

                                foreach($amps_get_entity['payload'] as $amps_get_entity_id => $amps_get_entity_ob){
                                    $amps_data_entity_option_selected = (isset($amps['mobile_screen_entity_id']) && $amps['mobile_screen_entity_id'] == $amps_get_entity_id) ? 'selected' : '';
                                    echo '<option '.$amps_data_entity_option_selected.' data-entity="'.$amps_data_entity_option.'" data-entityid="'.$amps_get_entity_id.'" data-entityurl="'.$amps_get_entity_ob['permalink'].'">'.$amps_get_entity_ob['name'].'</option>';
                                }
                            }
                        ?>
                    </select>
                    <?php $amps_mobile_screen_url = (isset($amps['mobile_screen_url']) && !empty($amps['mobile_screen_url'])) ? $amps['mobile_screen_url'] : AMPS_SAMPLE_PAGE_URL ; ?>
                    <input type="hidden" name="amps[mobile_screen_url]" id="mobile_screen_url" value="<?php echo $amps_mobile_screen_url; ?>">
                    <input type="hidden" name="amps[mobile_screen_entity_id]" id="mobile_screen_entity_id" value="0">
                    <input type="hidden" name="amps[mobile_screen_entity_set]" id="mobile_screen_entity_set" valueofentity="<?php echo (isset($amps['mobile_screen_entity']) && !empty($amps['mobile_screen_entity'])) ? $amps['mobile_screen_entity'] : 'demo' ; ?>">
                </div>
            </fieldset>
        </div>
    </div>
    <hr/>
    <div class="uk-grid uk-grid-small">
        <div class="uk-width-2-4 vertical-border">
            <div class="uk-form">
                <fieldset>
                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[on_pages]"/>
                            <label class="switch">
                                <input value="1" name="amps[on_pages]" <?php checked($amps['on_pages']); ?> type="checkbox" class="on_entity_setting" data-controlfor="page">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Pages</label>
                            <p>By turning this on, AMP will be activated for all your pages.</p>
                        </div>
                    </div>

                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[on_posts]"/>
                            <label class="switch">
                                <input value="1" name="amps[on_posts]" <?php checked($amps['on_posts']); ?> type="checkbox"  class="on_entity_setting" data-controlfor="post">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Posts</label>
                            <p>By turning this on, AMP will be activated for all your post types.</p>
                        </div>
                    </div>

                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[on_categories]"/>
                            <label class="switch">
                                <input value="1" name="amps[on_categories]" <?php checked($amps['on_categories']); ?> type="checkbox"  class="on_entity_setting" data-controlfor="category">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Categories</label>
                            <p>By turning this on, AMP will be activated for all your categories.</p>
                        </div>
                    </div>


                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[on_tags]"/>
                            <label class="switch">
                                <input value="1" name="amps[on_tags]" <?php checked($amps['on_tags']); ?> type="checkbox"  class="on_entity_setting" data-controlfor="tag">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Tags</label>
                            <p>By turning this on, AMP will be activated for all your tags.</p>
                        </div>
                    </div>



                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[on_home]"/>
                            <label class="switch">
                                <input value="1" name="amps[on_home]" <?php checked($amps['on_home']); ?> type="checkbox"  class="on_entity_setting" data-controlfor="home">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Home</label>
                            <p>By turning this on, AMP will be activated for Home Page.</p>
                        </div>
                    </div>

                    <div class="uk-form-row uk-grid">
                        <?php
                        $rtl_1 = '';
                        $rtl_0 = 'checked';
                        if (isset($amps['rtl_switch'])) {
                            if ($amps['rtl_switch'] == 1) {
                                $rtl_1 = 'checked';
                                $rtl_0 = '';
                            }
                        }
                        ?>
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[rtl_switch]"/>
                            <label class="switch">
                                <input value="1" name="amps[rtl_switch]" <?php echo $rtl_1; ?> type="checkbox">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">RTL Support</label>
                            <p>By turning this on, AMP page will load in Right to Left content alignment.</p>
                        </div>

                    </div>
                </fieldset>
            </div>
        </div>
        <div class="uk-width-2-4">
            <div class="uk-form uk-form-stacked">
                <fieldset>

                    <div class="uk-form-row uk-grid">

                        <?php
                        $non_secure_option_yes = '';
                        $selected_option = 0;
                        $checked = 'checked = "checked"';
                        $non_secure_option_no = $checked;
                        $manage_content_options = 'disabled="disabled"';
                        $replace_content = '';
                        $remove_content = '';

                        if (isset($amps['non_secure_content'])) {
                            $selected_option = $amps['non_secure_content'];
                            if ($selected_option == 1) {
                                $non_secure_option_yes = $checked;
                                $non_secure_option_no = '';
                                $manage_content_options = '';

                                if ($amps['non_secure_content_should_be'] == 'placeholded') {
                                    $replace_content = $checked;
                                } else {
                                    $remove_content = $checked;
                                }
                            }
                        }
                        ?>

                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[non_secure_content]"/>
                            <label class="switch">
                                <input value="1" name="amps[non_secure_content]" <?php checked($amps['non_secure_content']); ?> type="checkbox" id="non_secure_content_checkbox">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Manage Non Secure Content</label>
                            <p>AMP violates the page in case your images, iframes etc points to non-secure servers or to HTTP instead of HTTPS. Please command how AMP Supremacy should deal with it.</p>
                            <div class="uk-form-row yes-options" style="display: <?php echo empty($selected_option) ? "none" : "block"; ?>; margin-top:10px;">
                                <div class="uk-grid uk-grid-small mobile-problems">
                                    <div class="uk-width-1-1">
                                        <input class="options_to_deal_with_non_secure_content" id="remove_non_secure_content" name="amps[non_secure_content_should_be]" type="radio" value="removed"  <?php echo empty($selected_option) ? $checked : $manage_content_options . " " . $remove_content; ?>>
                                        <label class="radio-lbl" for='remove_non_secure_content'>Remove such content from AMP Pages</label> &nbsp;
                                    </div>
                                    <div class="uk-width-1-1">
                                        <input class="options_to_deal_with_non_secure_content" id="placehold_non_secure_content" name="amps[non_secure_content_should_be]" type="radio" value="placeholded" <?php echo $manage_content_options . " " . $replace_content; ?>>
                                        <label class="radio-lbl" for='placehold_non_secure_content'>Replace such content with some placeholder content</label> &nbsp;
                                    </div>
                                </div>
                                <br>
                            </div>
                        </div>

                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[password_switch]"/>
                            <label class="switch">
                                <input value="1" name="amps[password_switch]" <?php checked($amps['password_switch']); ?> type="checkbox" id="password_switch">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-1-2 label-instruction">
                            <label class="switch_button">Remove Invalid Content</label>
                            <p>Removes invalid AMP elements such as input password field (if it appears in AMP Page)</p>
                        </div>
                    </div>

                     <hr>

                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-1">
                            <a class="uk-button uk-button-big uk-button-primary uk-width-1-1" href="<?php echo get_site_url(); ?>/?plugin_trigger=amps_import_setting"><i class="fa fa-save"></i> Export AMP Settings</a>
                        </div>
                    </div>

                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-1">
                            <div id="importSettingsNotification" class="uk-alert uk-alert-danger" style="display: none; padding: 3px 10px;"></div>
                            <label class="fileContainer">
                                <a class="uk-button uk-button-big uk-button-primary uk-width-1-1"><i class="fa fa-arrow-up"></i>Import AMP Settings</a>
                                <input type="file" id="settingfile" name="settingfile"/>
                            </label>
                            <p>Upload a valid settings file of JSON format which you observed while clicking on 'Export AMP Settings' button</p>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    </div>
</div>
