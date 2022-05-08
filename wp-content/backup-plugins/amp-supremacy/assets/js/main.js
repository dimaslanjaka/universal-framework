(function ($) {
    'use strict';

    /**
     *  Global doc.ready function
     */
    $(document).ready(function () {
        $('.amp-settings-form').submit(function (e) {
            e.preventDefault();

            $.post(amp_data.wp_post, $(this).serialize(), function (d) {
                reloadAMPSSettingsMobileScreen();
                UIkit.notify("<i class='uk-icon-check'></i> Your settings have been saved.", {pos: 'bottom-right', status: "success"});
            });
        });

        // Set the selected option of selects
        $('select').each(function () {
            var attr = $(this).attr('data-value');
            if (typeof attr !== typeof undefined && attr !== false && attr !== '') {
                $(this).val(attr);
            }
        });

        $('#register_for_amp').submit(function () {
            var result = false;
            var email = $.trim($('#register_aamp_email').val());
            var name = $.trim($('#register_aamp_name').val());

            if (name == '') {
                $('.register_aamp_container .uk-alert.form-notices').removeClass('uk-alert-success').addClass('uk-alert-danger').text('Name is required!').slideDown();
                return false;
            }

            if (email == '') {
                $('.register_aamp_container .uk-alert.form-notices').removeClass('uk-alert-success').addClass('uk-alert-danger').text('Email Address Invalid').slideDown();
                return false;
            }

            var data = {action: 'register_advanced_amp', email: email};

            jQuery.post(amp_data.wp_get, data, function (response) {
                response = JSON.parse(response);
                if (response.status === true) {
                    return true;
                } else if (response.status === false) {
                    return false;
                }
            });
        });

        // Header Color Picker
        $('.spectrum').each(function () {
            var element = $(this);
            var value = element.val();
            element.spectrum({
                preferredFormat: "hex",
                showInput: true,
                showAlpha: true,
                color: value,
                change: function (color) {
                    $.post(amp_data.wp_post, $('.amp-settings-form').serialize(), function (d) {
                        reloadAMPSSettingsMobileScreen();
                        UIkit.notify("<i class='uk-icon-check'></i> Your settings have been saved.", {pos: 'bottom-right', status: "success"});
                    });
                }
            });
        });

        $('#settingfile').change(function (event) {
            
            //get selected file
            var file = event.target.files[0];

            //form data check the above bullet for what it is
            var data = new FormData();
            data.append('export_settings_file', file, file.name);
            // // data.append('action', 'my_action', file.name);

            //create a new XMLHttpRequest
            var xhr = new XMLHttpRequest();

            //post file data for upload
            xhr.open('POST', amp_data.wp_get+'?action=import_amps_settings', true);
            xhr.send(data);
            xhr.onload = function () {
                //get response and show the uploading status
                var response = JSON.parse(xhr.responseText);
                var notificationObject = jQuery('#importSettingsNotification');

                // console.log(typeof response.status);
                if(response.status === true){
                    notificationObject.removeClass('uk-alert-danger').addClass('uk-alert-success').text(response.message).slideDown();
                    setTimeout(function(){
                        location.reload();
                    }, 3000);
                } else {
                    notificationObject.removeClass('uk-alert-success').addClass('uk-alert-danger').text(response.message).slideDown();
                }
            };
        });

        // Select Images
        $('.imageSelect').click(function (e) {
            e.preventDefault();
            var target = $(this).data('target');
            var image = wp.media({
                title: 'Select Image',
                multiple: false
            }).open()
                    .on('select', function (e) {
                        // This will return the selected image from the Media Uploader, the result is an object
                        var uploaded_image = image.state().get('selection').first();
                        // We convert uploaded_image to a JSON object to make accessing it easier
                        // Output to the console uploaded_image
                        var image_url = uploaded_image.toJSON().url;
                        // Let's assign the url value to the input field
                        $('#' + target).val(image_url);
                    });
        });

        $('#non_secure_content_checkbox').click(function () {
            if ($(this).is(':checked')) {
                $('.yes-options').slideDown('slow');
                $('.options_to_deal_with_non_secure_content').prop('disabled', false);
            } else {
                $('.yes-options').slideUp('slow');
                $('.options_to_deal_with_non_secure_content').prop('disabled', true);
            }
        });

        $('#button_css').click(function () {

        var term = $('#custom_css').val();
         alert(term);
         console.log(term);
        // var type = typeof(term );
        // alert(type);
//         var res = term.split(",");

//         var create_css  = ["display: none ;"];

//         if(jQuery.inArray(term ,create_css) != -1) {
//             console.log("is in array");
//         } else {
//             console.log("is NOT in array");
//         }
// alert(res);
//          alert(create_css);
         
            
});


        jQuery('#on_facebook').click(function () {
            var thisChecked = jQuery(this).is(':checked');
            var inputElem = jQuery('#on_facebook_app_id');
            if (thisChecked) {
                inputElem.slideDown('slow');
            } else {
                inputElem.slideUp('slow');
            }
        });

        $('body').on('click', '#disable_menu_display', function () {
            if ($(this).is(':checked')) {
                $('#select_amp_menu_block').slideUp();
            } else {
                $('#select_amp_menu').val('default');
                $('#select_amp_menu_block').slideDown();
            }
        });

        $('body').on('click', '#disable_recent_posts', function () {
            if ($(this).is(':checked')) {
                $('#relevancy_basis').slideUp();
            } else {
                $('#relevancy_basis').slideDown();
            }
        });

        // Run Mobile Test
        $('.uk-button-run-test').click(function () {
            var button = $(this);
            button.attr('disabled', 'disabled');
            button.find('i').removeClass('fa-play').addClass('fa-spin').addClass('fa-refresh');

            var website = $('#mobile-test-url').val();
            if (website == "") {
                UIkit.notify("<i class='fa fa-warning'></i> URL cannot be empty!", {pos: 'bottom-right', status: "error"});
                button.removeAttr('disabled');
                button.find('i').addClass('fa-play').removeClass('fa-spin').removeClass('fa-refresh');
                return null;
            }

            var data = [{
                    name: 'action',
                    value: 'amp_mobile_test'
                }, {
                    name: 'website',
                    value: website
                }];

            $.post(amp_data.wp_post, data, function (d) {
                button.removeAttr('disabled');
                button.find('i').addClass('fa-play').removeClass('fa-spin').removeClass('fa-refresh');

                if (d.hasOwnProperty('status')) {
                    if (d.status == 'ERROR') {
                        UIkit.notify("<i class='fa fa-warning'></i> " + d.message, {
                            pos: 'bottom-right',
                            status: "error"
                        });
                    }
                } else {
                    d = JSON.parse(d);
                    if (d.hasOwnProperty('responseCode')) {
                        if (d.responseCode == 200) {
                            // Give the link to screenshot button
                            $('.mobile-screenshot-button').attr('href', website);

                            // Apply the logic here
                            var container = $('.mobile-results');

                            // Apply the Passed/Not Passed Status
                            container.find('.mobile-status').removeClass('uk-text-danger').removeClass('uk-text-success');
                            if (d.ruleGroups.USABILITY.pass == true) {
                                container.find('.mobile-status').addClass('uk-text-success').html('<i class="fa fa-check"></i> Your URL has passed the Mobile Friendly Test!');
                            } else {
                                container.find('.mobile-status').addClass('uk-text-danger').html('<i class="fa fa-warning"></i> Your URL did not pass the Mobile Friendly Test!');
                            }

                            // Apply the progress bar changes
                            container.find('.uk-progress-bar').css('width', d.ruleGroups.USABILITY.score + '%').html('Score: <b>' + d.ruleGroups.USABILITY.score + '</b> of <b>100</b>');

                            // Show the problems if any
                            var problems = $('.mobile-problems');
                            var problem_list = $('.mobile-problems-list');
                            if (d.ruleGroups.USABILITY.score < 100) {
                                problems.slideDown();

                                problem_list.empty();
                                problem_list.append('<dt class="uk-text-danger"><i class="fa fa-warning"></i> Failed Tests:</dt>');

                                for (var key in d.formattedResults.ruleResults) {
                                    var result = d.formattedResults.ruleResults[key];
                                    if (result.ruleImpact > 0) {
                                        problem_list.append('<dd><i class="fa fa-close"></i> ' + result.localizedRuleName + ' (-' + parseInt(result.ruleImpact) + ')</dd>');
                                    }
                                }

                            } else {
                                problems.slideUp();
                            }

                            // Show the things that are okay
                            var success_list = $('.mobile-success-list');
                            success_list.empty();
                            success_list.append('<dt class="uk-text-success"><i class="fa fa-check"></i> Verified Tests:</dt>');

                            for (var key in d.formattedResults.ruleResults) {
                                var result = d.formattedResults.ruleResults[key];
                                if (result.ruleImpact == 0) {
                                    success_list.append('<dd><i class="fa fa-check"></i> ' + result.localizedRuleName + '</dd>');
                                }
                            }

                            // Display the screenshot
                            var screenshot = $('.mobile-screenshot');
                            screenshot.attr('src', 'data:image/jpeg;charset=utf-8;base64,' + d.screenshot.data.replace(/\_/g, '/').replace(/\-/g, '+'));

                            container.slideDown();
                        } else {
                            UIkit.notify("<i class='fa fa-warning'></i> An unknown problem occurred. Please try again later.", {pos: 'bottom-right', status: "error"});
                        }
                    }
                }
            });
        });
    });


})(jQuery);

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function reloadAMPSSettingsMobileScreen(url) {
    if (typeof url == 'undefined') {
        jQuery('#mobile_screen_iframe').attr('src', function (i, val) {
            return val;
        });
    } else {
        url = jQuery.trim(url);
        jQuery('#mobile_screen_iframe').attr('src', url);
    }
}

function reloadAndSaveDataAMPS($ele){
    var dataurl = null;
    if(typeof $ele == 'string'){
        dataurl = $ele;
    } else if(typeof $ele == 'object'){
        dataurl = $ele.data('url');
    }
    jQuery('#mobile_screen_url').val(dataurl);
    jQuery.post(amp_data.wp_post, jQuery('.amp-settings-form').serialize(), function (d) {
            reloadAMPSSettingsMobileScreen(dataurl);
            UIkit.notify("<i class='uk-icon-check'></i> Your settings have been saved.", {pos: 'bottom-right', status: "success"});
    });
}

function reloadMobileAndSaveData(){
    jQuery.post(amp_data.wp_post, jQuery('.amp-settings-form').serialize(), function (d) {
        reloadAMPSSettingsMobileScreen();
        UIkit.notify("<i class='uk-icon-check'></i> Your settings have been saved.", {pos: 'bottom-right', status: "success"});
    });
}
