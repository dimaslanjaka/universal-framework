<?php
    include "pagefrog-globals.php";

    function add_styling_settings_fields() {
        $styling = new PageFrog_Styling_Storage();

        register_setting(
            'pagefrog_settings', // corresponding to the value in the settings_fields call
            PageFrog_Styling_Storage::OPTIONS_KEY, // the name of the option to sanitize and save
            'PageFrog_Styling_Storage::validate' // a function to sanitize the returned value
        );

        add_settings_section(
            'pagefrog_main', // the 'id' of the tags
            '', // the title of the section
            'render_pagefrog_main_description', // function that fills the desired section,
             $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'] // the slug of the page for which this should appear
        );

        add_settings_field(
            'pagefrog_logo_img', // the 'id' if the tag
            '', // the title of the field
            'render_logo_img', // fills the field with the desired input as part of the form
            $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'], // the slug that this field uses
            'pagefrog_main', // the id of the settings section that this goes in,
            array('styling' => $styling)
        );

        add_settings_field(
            'pagefrog_id_bar_type',
            '',
            'render_id_bar_type',
            $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'],
            'pagefrog_main',
            array('styling' => $styling)
        );

        add_settings_field(
            'pagefrog_id_bar_color',
            '',
            'render_id_bar_color',
            $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'],
            'pagefrog_main',
            array('styling' => $styling)
        );

        add_settings_field(
            'pagefrog_title_font_family',
            '',
            'render_title_font_family',
            $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'],
            'pagefrog_main',
            array('styling' => $styling)
        );

        add_settings_field(
            'pagefrog_title_font_color',
            '',
            'render_title_font_color',
            $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'],
            'pagefrog_main',
            array('styling' => $styling)
        );

        add_settings_field(
            'pagefrog_headings_font_family',
            '',
            'render_headings_font_family',
            $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'],
            'pagefrog_main',
            array('styling' => $styling)
        );

        add_settings_field(
            'pagefrog_headings_font_color',
            '',
            'render_headings_font_color',
            $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'],
            'pagefrog_main',
            array('styling' => $styling)
        );

        add_settings_field(
            'pagefrog_body_text_font_family',
            '',
            'render_body_text_font_family',
            $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'],
            'pagefrog_main',
            array('styling' => $styling)
        );

        add_settings_field(
            'pagefrog_body_text_font_color',
            '',
            'render_body_text_font_color',
            $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'],
            'pagefrog_main',
            array('styling' => $styling)
        );

        add_settings_field(
            'pagefrog_link_decoration',
            '',
            'render_link_decoration',
            $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'],
            'pagefrog_main',
            array('styling' => $styling)
        );

        add_settings_field(
            'pagefrog_link_color',
            '',
            'render_link_color',
            $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'],
            'pagefrog_main',
            array('styling' => $styling)
        );

        add_settings_field(
            'pagefrog_quotes_font_family',
            '',
            'render_quotes_font_family',
            $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'],
            'pagefrog_main',
            array('styling' => $styling)
        );

        add_settings_field(
            'pagefrog_quotes_font_color',
            '',
            'render_quotes_font_color',
            $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'],
            'pagefrog_main',
            array('styling' => $styling)
        );

        add_settings_field(
            'pagefrog_footer_text_font_family',
            '',
            'render_footer_text_font_family',
            $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'],
            'pagefrog_main',
            array('styling' => $styling)
        );

        add_settings_field(
            'pagefrog_footer_text_font_color',
            '',
            'render_footer_text_font_color',
            $GLOBALS['PAGEFROG_STYLING_PAGE_SLUG'],
            'pagefrog_main',
            array('styling' => $styling)
        );
    }
    
    function render_pagefrog_main_description () {}

    function render_font_selector ($value, $option_name, $id) {
        ?>
            <select name="pagefrog_settings[<?php echo $option_name ?>]" id="<?php echo $id ?>" class="pagefrog-font-selector">
                <?php foreach (PageFrog_Styling_Storage::$VALID_FONTS as $font) { ?>
                    <option value="<?php echo $font ?>" <?php if ($value == $font) echo "selected='selected'" ?>><?php echo ucwords($font); ?></option>
                <?php } ?>
            </select>
        <?php
    }

    function render_color_picker ($value, $option_name, $id) {
        ?>
            <div class="colorpicker-container">
                <input type="hidden" id="<?php echo $id ?>" class="colorpicker" name="pagefrog_settings[<?php echo $option_name ?>]" value="<?php echo $value; ?>" />
            </div>
        <?php
    }

    function render_logo_img ( $args ) {
        ?>
        </tr></tbody></table>
        <div class="row">
            <div class="col-sm-10">
                <h3><img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/google_logo.png'; ?>" alt="" style="width:16px;margin-bottom:-2px;">&nbsp;AMP HTML STYLING</h3>
                <hr>
                <p>AMP HTML Style settings will only affect your content when displayed in Google's AMP HTML format.</p>
                <p><b>Important:</b> The preview window will only update after you have saved your changes.</p>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-10">
                <h3>ARTICLE HEAD</h3>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-3 margin-top-bottom">
                BRANDING
            </div>
            <div class="col-sm-6 margin-top-bottom">
                <input id='pagefrog-logo-img' name='pagefrog_settings[logo_img]' type='hidden' value='<?php echo $args['styling']->get_logo_img_id(); ?>' />
                <a class='button' id='pagefrog-logo-button'>Choose Logo&nbsp;<span class="smaller-text">(Transparent PNG, 300 x 300 pixel minimum)</a>
            </div>
        </div>
        <?php
    }

    function render_id_bar_type ( $args ) {
        $line_status = '';
        $solid_status = '';
        if ($args['styling']->get_id_bar_type() == 'line') {
            $line_status = 'checked';
        } else if ($args['styling']->get_id_bar_type() == 'solid') {
            $solid_status = 'checked';
        }
        ?>
        
        <div class="row">
            <div class="col-sm-3 margin-top-bottom"></div>
            <div class="col-sm-6 margin-top-bottom">
                <label for="pagefrog-solid-bar-type" style="padding-right: 15px">
                    <input id="pagefrog-solid-bar-type" type="radio" name="pagefrog_settings[id_bar_type]" value='solid' <?php echo $solid_status ?>>&nbsp;Solid Bar
                </label>
                <label for="pagefrog-line-bar-type">
                    <input type="radio" id="pagefrog-line-bar-type" name="pagefrog_settings[id_bar_type]" value="line" <?php echo $line_status ?>>&nbsp;Line Divider
                </label>

        <?php
    }

    function render_id_bar_color ( $args )  {
        render_color_picker($args['styling']->get_id_bar_color(), 'id_bar_color', 'pagefrog-id-bar-color');
        ?>
            </div>
        </div>
        <?php
    }

    function render_title_font_family ( $args ) {
        ?>

        <div class="row">
            <div class="col-sm-3 margin-top-bottom">TITLE</div>
            <div class="col-sm-6 margin-top-bottom">
                <?php render_font_selector($args['styling']->get_title_font_family(), 'title_font_family', 'pagefrog-title-font-family');
    }

    function render_title_font_color ( $args ) {
        render_color_picker($args['styling']->get_title_font_color(), 'title_font_color', 'pagefrog-title-font-color');
        ?>
            </div>
        </div>
        <?php
    }

    function render_headings_font_family ( $args ) {
        ?>

        <div class="row">
            <div class="col-sm-10">
                <h3>ARTICLE BODY</h3>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-3 margin-top-bottom">
                HEADINGS
            </div>
            <div class="col-sm-6 margin-top-bottom">
                <?php render_font_selector($args['styling']->get_headings_font_family(), 'headings_font_family', 'pagefrog-headings-font-family');
    }

    function render_headings_font_color ( $args ) {
        render_color_picker($args['styling']->get_headings_font_color(), 'headings_font_color', 'pagefrog-headings-font-color');
        ?>
            </div>
        </div>
        <?php
    }

    function render_body_text_font_family ( $args ) {
        ?>

        <div class="row">
            <div class="col-sm-3 margin-top-bottom">
                BODY TEXT
            </div>
            <div class="col-sm-6 margin-top-bottom">
                <?php render_font_selector($args['styling']->get_body_text_font_family(), 'body_text_font_family', 'pagefrog-body-text-font-family');
    }

    function render_body_text_font_color ( $args ) {
        render_color_picker($args['styling']->get_body_text_font_color(), 'body_text_font_color', 'pagefrog-body-text-font-color');
        ?>
            </div>
        </div>
        <?php
    }

    function render_link_decoration ( $args ) {
        $underlined_status = '';
        $none_status = '';
        if ($args['styling']->get_link_decoration() == 'underline') {
            $underlined_status = 'checked';
        } else if ($args['styling']->get_link_decoration() == 'none') {
            $none_status = 'checked';
        }
        ?>

        <div class="row">
            <div class="col-sm-3 margin-top-bottom">
                LINKS
            </div>
            <div class="col-sm-6 margin-top-bottom">
                <label for="pagefrog-underlined-link-decoration" style="padding-right:15px">
                    <input type="radio" id="pagefrog-underlined-link-decoration" name="pagefrog_settings[link_decoration]" value="underline" <?php echo $underlined_status ?>>&nbsp;Underlined
                </label>
                <label for="pagefrog-none-link-decoration">
                    <input type="radio" id="pagefrog-none-link-decoration" name="pagefrog_settings[link_decoration]" value="none" <?php echo $none_status ?>>&nbsp;No Decoration
                </label>

        <?php
    }

    function render_link_color ( $args ) {
        render_color_picker($args['styling']->get_link_color(), 'link_color', 'pagefrog-link-color');
        ?>
            </div>
        </div>
        <?php
    }

    function render_quotes_font_family ( $args ) {
        ?>

        <div class="row">
            <div class="col-sm-3 margin-top-bottom">
                QUOTES
            </div>
            <div class="col-sm-6 margin-top-bottom">
                <?php render_font_selector($args['styling']->get_quotes_font_family(), 'quotes_font_family', 'pagefrog-quotes-font-family');
    }

    function render_quotes_font_color ( $args ) {
        render_color_picker($args['styling']->get_quotes_font_color(), 'quotes_font_color', 'pagefrog-quotes-color');
        ?>
            </div>
        </div>
        <?php
    }

    function render_footer_text_font_family ( $args ) {
        ?>
        <div class="row">
            <div class="col-sm-10">
                <h3>ARTICLE FOOTER</h3>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-3 margin-top-bottom">
                FOOTER TEXT
            </div>
            <div class="col-sm-6 margin-top-bottom">
                <?php render_font_selector($args['styling']->get_footer_text_font_family(), 'footer_text_font_family', 'pagefrog-footer-text-font-family');
    }

    function render_footer_text_font_color ( $args ) {
        render_color_picker($args['styling']->get_footer_text_font_color(), 'footer_text_font_color', 'pagefrog-footer-text-font-color');
        ?>
            </div>
        </div>
        <?php
    }

    function render_styling_page () {
        $post_types = PageFrog_NewPostSettings_Storage::get_post_types();
        $valid_post_types = array();
        foreach ( $post_types as $label => $post_type ) {
            $valid_post_types[] = $label;
        }
        $recent_posts = wp_get_recent_posts(array(
            'post_type' => $valid_post_types
        ), OBJECT_K);


        ?>
            <div>
                <img src="<?php echo plugin_dir_url(__FILE__) . 'images/logo_color.png'; ?>" alt="" id="pagefrog-big-logo">
                <p>PageFrog allows content publishers to instantly optimize their content for Facebook Instant Articles, Google <br> AMP, and Apple News.</p>
            </div>

            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#amp-settings" data-toggle="tab">AMP HTML</a></li>
                <li role="presentation"><a href="#fbia-settings" data-toggle="tab">Instant Articles</a></li>
            </ul>
            <div id="pagefrog-settings-container" class="tab-content">
                <div role="tabpanel" class="tab-pane active pagefrog-fade in" id="amp-settings">
                    <div class="row">
                        <div id="pagefrog-settings-box" class="col-sm-12 white-settings-box" style="border-top-left-radius:0px">
                            <div class="row">
                                <div class="col-sm-8">
                                    <form method="post" action="options.php">
                                        <?php 
                                            settings_fields( 'pagefrog_settings' );
                                            do_settings_sections($GLOBALS['PAGEFROG_STYLING_PAGE_SLUG']);
                                        ?>
                                        <br/><br/>
                                        <div class="row">
                                            <div class="col-sm-12 margin-top-bottom">
                                                    <input type="submit" name="Save" value="<?php esc_attr_e('Save Settings'); ?>" class="button green">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-sm-4">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h3>PREVIEW</h3>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-4">
                                                    <p>ARTICLE</p>
                                                </div>
                                                <div class="col-sm-8 margin-top-bottom">
                                                    <form>
                                                        <select id="pagefrog-article-selector" class="wide-selector">
                                                            <?php foreach ($recent_posts as $post) { ?>
                                                                <option value="<?php echo $post->ID; ?>"><?php echo $post->post_title; ?></option>
                                                            <?php } ?>
                                                        </select>
                                                    </form>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <?php render_preview($recent_posts[0]); ?>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane pagefrog-fade in" id="fbia-settings">
                    <div class="row">
                        <div class="col-sm-12 white-settings-box" style="border-top-left-radius:0px">
                            <div class="row">
                                <div class="col-sm-8">
                                    <h3><img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/facebook_logo.png'; ?>" alt="" style="width:14px;">&nbsp;FACEBOOK INSTANT ARTICLE STYLING</h3>
                                    <hr>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 margin-top-bottom">
                                    <ul class="cbp_tmtimeline">
                                        <li>
                                            <div class="cbp_tmicon">1</div>
                                            <div class="cbp_tmlabel">
                                                <h2>Navigate to your Facebook Page and access Publishing Tools</h2>
                                                <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/fbia-walkthrough-step-1.jpg'; ?>" width="460px">
                                            </div>
                                        </li>
                                        <li>
                                            <div class="cbp_tmicon">2</div>
                                            <div class="cbp_tmlabel">
                                                <h2>Navigate to Settings on the top right</h2>
                                                <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/fbia-styling-walkthrough-step-2.jpg'; ?>" width="460px">
                                            </div>
                                        </li>
                                        <li>
                                            <div class="cbp_tmicon">3</div>
                                            <div class="cbp_tmlabel">
                                                <h2>Choose Instant Articles from the left navigation menu</h2>
                                                <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/fbia-styling-walkthrough-step-3.jpg'; ?>" width="460px">
                                            </div>
                                        </li>
                                        <li>
                                            <div class="cbp_tmicon">4</div>
                                            <div class="cbp_tmlabel">
                                                <h2>Click on 'Default' to edit the style to reflect your branding</h2>
                                                <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/fbia-styling-walkthrough-step-4.png'; ?>" width="460px">
                                            </div>
                                        </li>
                                        <li>
                                            <div class="cbp_tmicon">5</div>
                                            <div class="cbp_tmlabel">
                                                <h2>Edit the elements you want and click Save when you are done</h2>
                                                <img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/fbia-styling-walkthrough-step-5.png'; ?>" width="460px">
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php
    }
?>