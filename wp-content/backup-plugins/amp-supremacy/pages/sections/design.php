<div class="uk-panel uk-panel-box" id="customize_design">
    <div class="uk-alert">
        <p><span class="uk-badge">NOTE </span> Tweak the settings from above to change how the AMP rendered content will appear to the end user.<br />When your post contains AMP Standards violating content then you page will get invalidated</p>
    </div>
    <hr/>
    <div class="uk-grid uk-grid-small">
        <div class="uk-width-2-4 vertical-border">
            <div class="uk-form">
                <div class="uk-form-row">
                    <label for="logo_image"><i class="fa fa-file-image-o"></i> Logo Image:</label>
                    <input id="logo_image" value="<?php echo $amps['logo_image']; ?>" name="amps[logo_image]" type="text" placeholder="Upload/Select an Image"/>
                    <button class="uk-button uk-button-small uk-button-primary imageSelect" data-target="logo_image" type="button">Browse</button>
                </div>
                <div class="uk-form-row">
                    <i class="fa fa-arrows-h"></i>&nbsp;<label>Width:</label>
                    <input type="text" class="short-field" maxlength="3" name="amps[logo_image_width]" value="<?php echo!empty($amps['logo_image_width']) ? $amps['logo_image_width'] : ''; ?>"/>
                    <i class="fa fa-arrows-v"></i>&nbsp;<label>Height:</label>
                    <input type="text" class="short-field" maxlength="3" name="amps[logo_image_height]"  value="<?php echo!empty($amps['logo_image_height']) ? $amps['logo_image_height'] : ''; ?>"/>
                </div>
                <hr>

                <div class="uk-form-row">
                    <label for="favico"><i class="fa fa-file-code-o"></i> Fav Icon:</label>
                    <input id="favico" value="<?php echo $amps['favico']; ?>" name="amps[favico]" type="text" placeholder="Upload/Select an Image"/>
                    <button class="uk-button uk-button-small uk-button-primary imageSelect" data-target="favico" type="button">Browse</button>
                </div>

                <hr>

                <div class="uk-form-row">
                    <input class="spectrum" id="color_header" value="<?php echo $amps['color_header']; ?>" name="amps[color_header]" type="text"/>
                    <label for="color_header" class="spectrum-label"><i class="fa fa-header"></i> Header Background Color:</label>
                </div>

                <div class="uk-form-row">
                    <input class="spectrum" id="color_header_text" value="<?php echo $amps['color_header_text']; ?>" name="amps[color_header_text]" type="text"/>
                    <label for="color_header_text" class="spectrum-label"><i class="fa fa-header"></i> Header Text Color:</label>
                </div>

                <hr>

                <div class="uk-form-row">
                    <input class="spectrum" id="color_article_title" value="<?php echo $amps['color_article_title']; ?>" name="amps[color_article_title]" type="text"/>
                    <label for="color_article_title" class="spectrum-label"><i class="fa fa-newspaper-o"></i> Article Title Color:</label>
                </div>

                <div class="uk-form-row">
                    <input class="spectrum" id="color_article_text" value="<?php echo $amps['color_article_text']; ?>" name="amps[color_article_text]" type="text"/>
                    <label for="color_article_text" class="spectrum-label"><i class="fa fa-newspaper-o"></i> Article Text Color:</label>
                </div>

                <hr>

                <div class="uk-form-row">
                    <label for="footer-extra-content"><i class="fa fa-book"></i> Add Content to Footer of AMP Page:</label>
                    <?php
                    $footer_extra_content = isset($amps['footer-extra-content']) ? trim($amps['footer-extra-content']) : '';
                    $footer_extra_content = (!empty($footer_extra_content)) ? preg_replace('/\\\\/', '', $footer_extra_content) : '';
                    ?>
                    <textarea class="amp-settings-textarea" id="footer-extra-content" placeholder="Enter Footer Content" name="amps[footer-extra-content]"><?php echo $footer_extra_content; ?></textarea>
                </div>

                <div class="uk-form-row">
                    <label for="custom-css"><i class="fa fa-pencil"></i> Add Custom CSS:</label>
                    <?php
                    $custom_css = isset($amps['custom-css']) ? trim($amps['custom-css']) : '';
                    

                    $custom_css = (!empty($custom_css)) ? preg_replace('/\\\\/', '', $custom_css) : '';

                    ?>
                    <textarea class="amp-settings-textarea" id="custom_css" placeholder="Enter Your Custom CSS Here" name="amps[custom-css]"><?php echo $custom_css; ?></textarea>
                    <p>  Please validate your styles and layout with   <a href="https://www.ampproject.org/docs/guides/responsive/style_pages" target="_blank" >AMP Supported CSS link</a></p>
                     
            </div>

            <div class="uk-form-row">
                    <label for="custom-css"><i class="fa fa-tags"></i> Add Custom Meta:</label>
                    
                    <textarea class="amp-settings-textarea" id="custom-meta" placeholder="Enter Your Custom Meta tag Here" name="amps[custom-meta]"><?php echo $custom_meta; ?></textarea>
                    
                     
            </div>

            </div>
        </div>
        <div class="uk-width-2-4">
            <div class="uk-form uk-form-stacked">
                <fieldset>
                    
                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[sitename_hide]"/>
                            <label class="switch">
                                <input value="1" name="amps[sitename_hide]" <?php if (isset($amps['sitename_hide'])) checked($amps['sitename_hide']); ?> type="checkbox">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Hide Site Name in Header</label>
                        </div>
                    </div>

                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[featured_image_hide]"/>
                            <label class="switch">
                                <input value="1" name="amps[featured_image_hide]" <?php if (isset($amps['featured_image_hide'])) checked($amps['featured_image_hide']); ?> type="checkbox">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Hide Featured Image from AMP pages</label>
                        </div>
                    </div>
                    <hr />
                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[on_post_date]"/>
                            <label class="switch">
                                <input value="1" name="amps[on_post_date]" <?php if (isset($amps['on_post_date'])) checked($amps['on_post_date']); ?> type="checkbox">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Display Post Date</label>
                            <p>By turning this on, AMP will display date of post on AMP Pages.</p>
                        </div>
                    </div>

                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[on_author_name]"/>
                            <label class="switch">
                                <input value="1" name="amps[on_author_name]" <?php if (isset($amps['on_author_name'])) checked($amps['on_author_name']); ?> type="checkbox">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Display Author Name</label>
                            <p>By turning this on, AMP will display post's author name on AMP Pages.</p>
                        </div>
                    </div>

                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[on_category_description]"/>
                            <label class="switch">
                                <input value="1" name="amps[on_category_description]" <?php if (isset($amps['on_category_description'])) checked($amps['on_category_description']); ?> type="checkbox">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Display Category Description</label>
                            <p>By turning this on, AMP will display Category Description on AMP Category Pages.</p>
                        </div>
                    </div>

                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[on_tag_description]"/>
                            <label class="switch">
                                <input value="1" name="amps[on_tag_description]" <?php if (isset($amps['on_tag_description'])) checked($amps['on_tag_description']); ?> type="checkbox">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Display Tag Description</label>
                            <p>By turning this on, AMP will display Tag Description on AMP Tag Pages.</p>
                        </div>
                    </div>



                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[on_post_tags]"/>
                            <label class="switch">
                                <input value="1" name="amps[on_post_tags]" <?php if (isset($amps['on_post_tags'])) checked($amps['on_post_tags']); ?> type="checkbox">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Display Post Tags</label>
                            <p>By turning this on, AMP will display tags associated with post.</p>
                        </div>
                    </div>

                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[on_post_categories]"/>
                            <label class="switch">
                                <input value="1" name="amps[on_post_categories]" <?php if (isset($amps['on_post_categories'])) checked($amps['on_post_categories']); ?> type="checkbox">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Display Post Categories</label>
                            <p>By turning this on, AMP will display categories associated with post.</p>
                        </div>
                    </div>

                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[internal_links_non_amp]"/>
                            <label class="switch">
                                <input value="1" name="amps[internal_links_non_amp]" <?php if (isset($amps['internal_links_non_amp'])) checked($amps['internal_links_non_amp']); ?> type="checkbox">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Do not convert internal links to AMP</label>
                            <p>By turning this on, AMP will not convert the links (contained inside your post page content and points to same website) to AMP.</p>
                        </div>
                    </div>

                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[disable_lightbox_on_images]"/>
                            <label class="switch">
                                <input value="1" name="amps[disable_lightbox_on_images]" <?php if (isset($amps['disable_lightbox_on_images'])) checked($amps['disable_lightbox_on_images']); ?> type="checkbox">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Disable lightbox on Post images</label>
                            <p>By turning this on, the lightbox effect on post images at AMP page will be disabled.</p>
                        </div>
                    </div>

                    <div class="uk-form-row uk-grid">
                        <div class="uk-width-1-4">
                            <input type="hidden" value="0" name="amps[disable_recent_posts]"/>
                            <label class="switch">
                                <input value="1" name="amps[disable_recent_posts]" <?php if (isset($amps['disable_recent_posts'])) checked($amps['disable_recent_posts']); ?> type="checkbox" id="disable_recent_posts">
                                <div class="slider round"></div>
                            </label>
                        </div>
                        <div class="uk-width-3-4 label-instruction">
                            <label class="switch_button">Disable Related Posts on AMP Page</label>
                            <p>By turning this on, the recent posts will no longer be displayed.</p>
                            <?php $display_relevancy_section = (!isset($amps['disable_recent_posts']) || empty($amps['disable_recent_posts'])) ? 'block' : 'none' ?>
                            <div class="uk-form-row switch-row" id="relevancy_basis" style="display: <?php echo $display_relevancy_section; ?>">
                                <label>Related Post's relevancy</label><br/>
                                <?php
                                $relevant_to_tags = 'checked';
                                $relevant_to_category = '';
                                if (isset($amps['relevant_posts_to'])) {
                                    if ($amps['relevant_posts_to'] == 'category') {
                                        $relevant_to_tags = '';
                                        $relevant_to_category = 'checked';
                                    }
                                }
                                ?>
                                <input id="relevant_to_tags" name="amps[relevant_posts_to]" type="radio" value="tag" <?php echo $relevant_to_tags; ?>><label for="relevant_to_tags" class="radio-lbl">Tags</label> &nbsp;
                                <input id="relevant_to_category" name="amps[relevant_posts_to]" type="radio" value="category" <?php echo $relevant_to_category; ?>><label for="relevant_to_category" class="radio-lbl">Categories</label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    </div>
</div>