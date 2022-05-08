<?php
  function render_preview($post) {
    $post_status = new PageFrog_PostStatus( $post->ID );
    $fbia_status_string = $post_status->get_fbia_status() ? 'checked' : '';
    $amp_status_string = $post_status->get_amp_status() ? 'checked' : '';
    $amp_enabled = wp_amp_plugin_is_installed() && wp_amp_plugin_is_active();
    $amp_enabled_string = $amp_enabled ? '' : 'disabled';

    if ( ! $amp_enabled ) {
        ?>
        <div id="pagefrog-amp-warning" class="alert yellow">
            <div class="row">
                <div class="col-sm-12">
                    <p>Please setup AMP on the settings page<a href="<?php menu_page_url($GLOBALS['PAGEFROG_SETUP_PAGE_SLUG']); ?>" class="button yellow pull-right">Go to settings</a></p>
                </div>
            </div>
        </div>
        <?php
    }
    ?>
        <div id="pagefrog-preview-format">
            <div class="row">
                <div class="col-sm-12">
                    <p><strong>Enable this post for:</strong></p>
                    <div class="row">
                        <div class="col-xs-6 col-sm-7">
                            <label for="pagefrog-fbia-status" style="font-size:12px">
                                <input type="checkbox" id="pagefrog-fbia-status" class="pagefrog-status-toggle" <?php echo $fbia_status_string; ?> name="fbia_status" >&nbsp;Instant Articles <span class="dashicons dashicons-editor-help" pagefrog-title="When enabled, this post will be served in Instant Articles format for mobile visitors from the Facebook app. Access to Facebook Instant Articles is required." style="line-height:0.5;font-size:15px"></span>
                            </label>
                        </div>
                        <div class="col-sm-5">
                            <label for="pagefrog-amp-status"  style="font-size:12px" class="<?php echo $amp_enabled_string ?>">
                                <input type="checkbox" id="pagefrog-amp-status" class="pagefrog-status-toggle" <?php echo $amp_status_string . ' ' . $amp_enabled_string; ?> name="amp_status" >&nbsp;AMP HTML <span class="dashicons dashicons-editor-help" pagefrog-title="When enabled, this post will be served in AMP HTML format for mobile visitors from Google, Twitter, LinkedIn, and Pinterest apps upon the official release of AMP." style="line-height:0.5;font-size:15px"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div class="row">
                <!--<div class="col-sm-4">
                    <p>PREVIEW</p>
                </div>-->
                <div class="col-sm-12 margin-top-bottom">
                    <select name="pagefrog-preview-format-select" class="pagefrog-preview-format-select wide-selector">
                        <option value="fbia">Preview: Instant Articles</option>
                        <option value="amp" <?php echo $amp_enabled_string ?>>Preview: AMP HTML</option>
                    </select>
                    <input type="hidden" name="post_id" class="pagefrog-preview-post-id" value="<?php echo $post->ID ?>">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 margin-top-bottom text-center">
                <div class="pagefrog-preview-phone-frame-wrapper">
                    <div class="pagefrog-preview-phone-frame">
                        <div class="pagefrog-preview-container">
                            <iframe src=""></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 margin-top-bottom">
                <p class="text-center">
                Mobile Preview Link <br/><input type="text" id="mobile_preview_link">
                <br/><span class="smaller-text">Visit this link on a mobile device</span>
                </p>
            </div>
        </div>
    <?php
  }
?>