<?php 
include_once "class-pagefrog-new-post-settings-storage.php";
include_once "class-pagefrog-ads-storage.php";

function add_settings_fields() {
    add_new_post_settings_fields();
}
function add_new_post_settings_fields() {
    $new_post = new PageFrog_NewPostSettings_Storage();

    $post_types = PageFrog_NewPostSettings_Storage::get_post_types();

    register_setting(
        PageFrog_NewPostSettings_Storage::OPTIONS_KEY,
        PageFrog_NewPostSettings_Storage::OPTIONS_KEY,
        'PageFrog_NewPostSettings_Storage::validate'
    );
    add_settings_section(
        PageFrog_NewPostSettings_Storage::OPTIONS_KEY, 
        '',
        'render_new_post_main_description',
        $GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG']
    );

    add_settings_field(
        'amp_disable_other_plugins',
        '',
        'render_amp_disable_other_plugins',
        $GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG'],
        PageFrog_NewPostSettings_Storage::OPTIONS_KEY,
        array( 'new_post' => $new_post )
    );

    add_settings_field(
        'fbia_disable_other_plugins',
        '',
        'render_fbia_disable_other_plugins',
        $GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG'],
        PageFrog_NewPostSettings_Storage::OPTIONS_KEY,
        array( 'new_post' => $new_post )
    );

    add_settings_field(
        'amp_show_header_images',
        '',
        'render_amp_show_header_images',
        $GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG'],
        PageFrog_NewPostSettings_Storage::OPTIONS_KEY,
        array( 'new_post' => $new_post )
    );

    add_settings_field(
        'fbia_show_header_images',
        '',
        'render_fbia_show_header_images',
        $GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG'],
        PageFrog_NewPostSettings_Storage::OPTIONS_KEY,
        array( 'new_post' => $new_post )
    );

    foreach ( $post_types as $label => $post_type ) {
        add_settings_field(
            'amp_enable_new_' . $label,
            '',
            'render_amp_enable_new_generic_post',
            $GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG'],
            PageFrog_NewPostSettings_Storage::OPTIONS_KEY,
            array(
                'new_post' => $new_post,
                'post_type' => $post_type,
                'label' => $label
            )
        );
        add_settings_field(
            'fbia_enable_new_' . $label,
            '',
            'render_fbia_enable_new_generic_post',
            $GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG'],
            PageFrog_NewPostSettings_Storage::OPTIONS_KEY,
            array(
                'new_post' => $new_post,
                'post_type' => $post_type,
                'label' => $label
            )
        );
    }
}
function render_new_post_main_description() {}
function render_amp_enable_new_generic_post( $args ) {
    ?><input type="hidden" name="<?php echo PageFrog_NewPostSettings_Storage::OPTIONS_KEY; ?>[amp_enable_new_<?php echo $args['label'] ?>]" value="<?php echo $args['new_post']->get_amp_enable_new_posts_string_for( $args['label'] ); ?>"><?php
}
function render_fbia_enable_new_generic_post( $args ) {
    ?><input type="hidden" name="<?php echo PageFrog_NewPostSettings_Storage::OPTIONS_KEY; ?>[fbia_enable_new_<?php echo $args['label'] ?>]" value="<?php echo $args['new_post']->get_fbia_enable_new_posts_string_for( $args['label'] ); ?>"><?php
}
function render_amp_disable_other_plugins( $args ) {
    ?><input type="hidden" name="<?php echo PageFrog_NewPostSettings_Storage::OPTIONS_KEY; ?>[amp_disable_other_plugins]" value="<?php echo $args['new_post']->get_amp_disable_other_plugins_string(); ?>"><?php
}
function render_fbia_disable_other_plugins( $args ) {
    ?><input type="hidden" name="<?php echo PageFrog_NewPostSettings_Storage::OPTIONS_KEY; ?>[fbia_disable_other_plugins]" value="<?php echo $args['new_post']->get_fbia_disable_other_plugins_string(); ?>"><?php
}
function render_amp_show_header_images( $args ) {
    ?><input type="hidden" name="<?php echo PageFrog_NewPostSettings_Storage::OPTIONS_KEY; ?>[amp_show_header_images]" value="<?php echo $args['new_post']->get_amp_show_header_images_string(); ?>"><?php
}
function render_fbia_show_header_images( $args ) {
    ?><input type="hidden" name="<?php echo PageFrog_NewPostSettings_Storage::OPTIONS_KEY; ?>[fbia_show_header_images]" value="<?php echo $args['new_post']->get_fbia_show_header_images_string(); ?>"><?php
}




function render_settings_page() {
    $new_post = new PageFrog_NewPostSettings_Storage();


    $post_types = PageFrog_NewPostSettings_Storage::get_post_types();
    ?>

    <div>
        <img src="<?php echo plugin_dir_url(__FILE__) . 'images/logo_color.png'; ?>" alt="" id="pagefrog-big-logo">
        <p>PageFrog allows content publishers to instantly optimize their content for Facebook Instant Articles, Google <br> AMP, and Apple News.</p>
    </div>

    <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#settings" data-toggle="tab">Settings</a></li>
    </ul>
    <div id="pagefrog-settings-container" class="tab-content">
        <div role="tabpanel" class="tab-pane active pagefrog-fade in" id="settings">
            <div class="row">
                <div class="col-sm-12 white-settings-box" style="border-top-left-radius:0px">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-12">
                                    <h3><img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/facebook_logo.png'; ?>" alt="" style="width:14px;">&nbsp;FACEBOOK INSTANT ARTICLES</h3>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <p><strong>Setting for published posts:</strong></p>
                                            <p class="required">To enable Instant Articles on published posts on your site, select the post types that you'd like to be converted then click "Enable FBIA".</p>
                                        </div>
                                        <div class="col-sm-9 col-lg-7">
                                            <div class="row">
                                                <div class="col-sm-12 big-margin-bottom">
                                                    <div class="well">
                                                        <div class="row">
                                                            <div class="col-sm-12 margin-top-bottom">
                                                                <label for="fbia-select-all">
                                                                    <input type="checkbox" id="fbia-select-all" class="select-all" data-platform="fbia">&nbsp;Select All
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <hr>
                                                        <?php foreach ( $post_types as $label => $post_type ) : ?>
                                                        <div class="row">
                                                            <div class="col-sm-6 margin-top-bottom">
                                                                <label for="fbia-post-type-<?php echo $label; ?>">
                                                                    <input type="checkbox" id="fbia-post-type-<?php echo $label; ?>" class="published-posts-checkbox" data-platform="fbia" data-post-type="<?php echo $label; ?>"><strong>&nbsp;<?php echo $post_type->label; ?></strong>
                                                                </label>
                                                            </div>
                                                            <div class="col-sm-6 margin-top-bottom">
                                                                <p class="green-text no-margin"><span class="fbia-enabled-<?php echo $label; ?>"><?php echo PageFrog_PostStatus::get_fbia_enabled_post_count( $label ); ?></span> of <span class="fbia-total-<?php echo $label; ?>"><?php echo PageFrog_PostStatus::get_post_count( $label ); ?></span> enabled</p>
                                                            </div>
                                                        </div>
                                                        <?php endforeach; ?>
                                                        <div class="row">
                                                            <div class="col-sm-6"><a href="#" class="button block bulk-enable-button" data-enable="1" data-platform="fbia" data-loading-icon="<?php echo plugin_dir_url( __FILE__ ) . 'images/loading.svg'; ?>">Enable FBIA</a></div>
                                                            <div class="col-sm-6"><a href="#" class="button block bulk-enable-button" data-enable="0" data-platform="fbia" data-loading-icon="<?php echo plugin_dir_url( __FILE__ ) . 'images/loading.svg'; ?>">Disable FBIA</a></div>
                                                        </div>  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 margin-bottom">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <p><strong>Default setting for new posts:</strong></p>
                                            <p class="required">To enable Instant Articles for new posts, select which post types should be enabled, then click "Save All Settings" at the bottom of this page.</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div class="well">
                                                        <?php foreach( $post_types as $label => $post_type ) : ?>
                                                        <div class="row">
                                                            <div class="col-sm-6 margin-top-bottom">
                                                                <p class="no-margin"><strong><?php echo $post_type->label; ?></strong></p>
                                                            </div>
                                                            <div class="col-sm-6 margin-top-bottom">
                                                                <div class="row">
                                                                    <div class="col-sm-6">
                                                                        <label for="fbia-enable-new-<?php echo $label; ?>">
                                                                            <input type="radio" id="fbia-enable-new-<?php echo $label; ?>" name="<?php echo PageFrog_NewPostSettings_Storage::OPTIONS_KEY; ?>[fbia_enable_new_<?php echo $label; ?>]" class="sync-form" value="true" <?php if( $new_post->get_fbia_enable_new_posts_bool_for( $label ) ) echo 'checked="checked"'; ?>>&nbsp;Enabled
                                                                        </label>
                                                                    </div>
                                                                    <div class="col-sm-6">
                                                                        <label for="fbia-disable-new-<?php echo $label; ?>">
                                                                            <input type="radio" id="fbia-disable-new-<?php echo $label; ?>" name="<?php echo PageFrog_NewPostSettings_Storage::OPTIONS_KEY; ?>[fbia_enable_new_<?php echo $label; ?>]" class="sync-form" value="false" <?php if ( ! $new_post->get_fbia_enable_new_posts_bool_for( $label ) ) echo 'checked="checked"'; ?>>&nbsp;Disabled
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <?php endforeach; ?>
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
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-12">
                                    <h3><img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/google_logo.png'; ?>" alt="" style="width:16px;margin-bottom:-2px;">&nbsp;GOOGLE AMP HTML</h3>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <p><strong>Setting for published posts:</strong></p>
                                            <p class="required">To enable AMP Pages on published posts on your site, select the post types that you'd like to be converted then click "Enable AMP".</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="row">
                                                <div class="col-sm-12 big-margin-bottom">
                                                    <div class="well">
                                                        <div class="row">
                                                            <div class="col-sm-12 margin-top-bottom">
                                                                <label for="amp-select-all">
                                                                    <input type="checkbox" id="amp-select-all" class="select-all" data-platform="amp">&nbsp;Select All
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <hr>
                                                        <?php foreach ( $post_types as $label => $post_type ) : ?>
                                                        <div class="row">
                                                            <div class="col-sm-6 margin-top-bottom">
                                                                <label for="amp-post-type-<?php echo $label; ?>">
                                                                    <input type="checkbox" id="amp-post-type-<?php echo $label; ?>" class="published-posts-checkbox" data-platform="amp" data-post-type="<?php echo $label; ?>"><strong>&nbsp;<?php echo $post_type->label; ?></strong>
                                                                </label>
                                                            </div>
                                                            <div class="col-sm-6 margin-top-bottom">
                                                                <p class="green-text no-margin"><span class="amp-enabled-<?php echo $label; ?>"><?php echo PageFrog_PostStatus::get_amp_enabled_post_count( $label ); ?></span> of <span class="amp-total-<?php echo $label; ?>"><?php echo PageFrog_PostStatus::get_post_count( $label ); ?></span> enabled</p>
                                                            </div>
                                                        </div>
                                                        <?php endforeach; ?>
                                                        <div class="row">
                                                        <div class="col-sm-6"><a href="#" class="button block bulk-enable-button" data-enable="1" data-platform="amp" data-loading-icon="<?php echo plugin_dir_url( __FILE__ ) . 'images/loading.svg'; ?>">Enable AMP</a></div>
                                                        <div class="col-sm-6"><a href="#" class="button block bulk-enable-button" data-enable="0" data-platform="amp" data-loading-icon="<?php echo plugin_dir_url( __FILE__ ) . 'images/loading.svg'; ?>">Disable AMP</a></div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 margin-bottom">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <p><strong>Default setting for new posts:</strong></p>
                                            <p class="required">To enable AMP Pages for new posts, select which post types should be enabled, then click "Save All Settings" at the bottom of this page.</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div class="well">
                                                        <?php foreach ( $post_types as $label => $post_type ) : ?>
                                                        <div class="row">
                                                            <div class="col-sm-6 margin-top-bottom">
                                                                <p class="no-margin"><strong><?php echo $post_type->label; ?></strong></p>
                                                            </div>
                                                            <div class="col-sm-6 margin-top-bottom">
                                                                <div class="row">
                                                                    <div class="col-sm-6">
                                                                        <label for="amp-enable-new-<?php echo $label; ?>">
                                                                            <input type="radio" id="amp-enable-new-<?php echo $label; ?>" name="<?php echo PageFrog_NewPostSettings_Storage::OPTIONS_KEY; ?>[amp_enable_new_<?php echo $label; ?>]" class="sync-form" value="true" <?php if ( $new_post->get_amp_enable_new_posts_bool_for( $label ) ) echo 'checked="checked"'; ?>>&nbsp;Enabled
                                                                        </label>
                                                                    </div>
                                                                    <div class="col-sm-6">
                                                                        <label for="amp-disable-new-<?php echo $label; ?>">
                                                                            <input type="radio" id="amp-disable-new-<?php echo $label; ?>" name="<?php echo PageFrog_NewPostSettings_Storage::OPTIONS_KEY; ?>[amp_enable_new_<?php echo $label; ?>]" class="sync-form" value="false" <?php if ( ! $new_post->get_amp_enable_new_posts_bool_for( $label ) )  echo 'checked="checked"'; ?>>&nbsp;Disabled
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <?php endforeach; ?>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 margin-bottom">
                                    <div class="row">
                                    <div class="col-sm-3">
                                        <p><strong>Other Settings</strong></p>
                                    </div>
                                    <div class="col-sm-9">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="well">
                                                    <div class="row">
                                                        <div class="col-sm-12 margin-top-bottom">
                                                            <label for="amp-disable-other-plugins">
                                                                <input id="amp-disable-other-plugins" type="checkbox" class="sync-form" name="<?php echo PageFrog_NewPostSettings_Storage::OPTIONS_KEY; ?>[amp_disable_other_plugins]" <?php if ( $new_post->get_amp_disable_other_plugins_bool() ) echo 'checked="checked"'; ?>>&nbsp;Force AMP compliance by removing other plugins/functions from AMP pages.
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-12 margin-top-bottom">
                                                            <label for="amp-show-header-images">
                                                                <input id="amp-show-header-images" type="checkbox" class="sync-form" name="<?php echo PageFrog_NewPostSettings_Storage::OPTIONS_KEY; ?>[amp_show_header_images]" <?php if ( $new_post->get_amp_show_header_images_bool() ) echo 'checked="checked"' ?>>&nbsp;Display Featured Image
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 margin-top-bottom" style="margin-top: 50px">
                                    <input type="submit" class="button green pull-right submit-new-posts-form" value="Save All Settings">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <form action="options.php" method="post" class="hidden" id="pagefrog-new-posts-settings-form">
        <?php 
            settings_fields( PageFrog_NewPostSettings_Storage::OPTIONS_KEY );
            do_settings_sections( $GLOBALS['PAGEFROG_SETTINGS_PAGE_SLUG'] );
        ?>
    </form>
    <?php
}

?>