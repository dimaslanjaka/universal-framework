(function ($) {
    'use strict';
    
    jQuery.ucfirst = function(str) {

        var text = str;


        var parts = text.split(' '),
            len = parts.length,
            i, words = [];
        for (i = 0; i < len; i++) {
            var part = parts[i];
            var first = part[0].toUpperCase();
            var rest = part.substring(1, part.length);
            var word = first + rest;
            words.push(word);

        }

        return words.join(' ');
    };
    
    $(document).ready(function () {
        jQuery(document).on( 'click', '.amp-sitemap-notice .notice-dismiss', function() {
            createCookie('amp_sitemap_admin_notice_cookie', 0, 7);
        });
        
        
        jQuery('body').on('click', '.amp-settings-nav a', function(){
            jQuery('.amp-settings-nav > li').removeClass('uk-active');
            jQuery(this).parent().addClass('uk-active');
            
            var thisSection = jQuery(this).data('related-section');
            //console.log(thisSection);
            jQuery('.uk-width-4-5 > .uk-panel').addClass('uk-hidden');
            jQuery(thisSection).removeClass('uk-hidden');
            
        });

        jQuery(document).on('click', '#amps_use_custom_settings', function(){
            var $optionsControls = jQuery('#ampSupremacyCustomOptions');
            if(jQuery(this).is(':checked')){
                $optionsControls.slideDown();
            } else {
                $optionsControls.slideUp();
            }
        });
        
        jQuery(document).on('click', '.mobile_screen_entity', function(){
            var thisval = jQuery(this).val();
            jQuery('#mobile_screen_entity_set').attr('valueofentity', thisval);
            if(thisval != 'home'){
                jQuery('#mobile_screen_entity_selectbox').prop('disabled', true);
                var thisValLabel = jQuery.ucfirst(thisval);
                jQuery('.entity_name').text(thisValLabel);
                jQuery('.entity_name_select').text('Select '+thisValLabel);
                
                
                //$('option', this).not(':eq(0)').remove();
                var data = {action: 'amps_get_entity_options', entity: thisval};
                       
                jQuery.post(amp_data.wp_get, data, function (response) {
                    response = jQuery.parseJSON(response);
                    if(response.status === true){
                        var optionString = '<option class="entity_name_select">Select '+thisValLabel+'</option>';
                        jQuery.each(response.payload, function(entityKey, entityObj){
                            optionString += '<option data-entity="'+thisval+'" data-entityid="'+entityKey+'" data-entityurl="'+entityObj.permalink+'">'+entityObj.name+'</option>';
                        });
                        jQuery('#mobile_screen_entity_selectbox').html(optionString);
                    }
                    jQuery('#mobile_screen_entity_selectbox').prop('disabled', false);
                });
                
                
                jQuery('.mobile-screen-entity-select').show();
            } else {
                reloadAndSaveDataAMPS(jQuery(this));
                jQuery('.mobile-screen-entity-select').hide();
            }
        });
        
        jQuery(document).on('click', '.mobile_screen_entity_demo', function(){
            jQuery('#mobile_screen_entity_set').attr('valueofentity', 'demo');
            jQuery('.mobile-screen-entity-select').hide();
            reloadAndSaveDataAMPS(jQuery(this));
        });
        
        jQuery(document).on('click', '.amps_lite_request_license_submit_btn', function(){
            var ampsLiteLicenseName = jQuery.trim(jQuery('#amps_lite_user_name').val());
            var ampsLiteLicenseEmail = jQuery.trim(jQuery('#amps_lite_user_email').val());
            var $amps_notice_div = jQuery('.amps_lite_request_license-notice');
            
            
            if(ampsLiteLicenseName == ''){
                $amps_notice_div.text('Name is required').show();
                jQuery('#amps_lite_user_name').focus();
                return false;
            } else {
                $amps_notice_div.hide();
            }
            
            if(ampsLiteLicenseEmail == ''){
                $amps_notice_div.text('Email is required').show();
                jQuery('#amps_lite_user_email').focus();
                return false;
            } else {
                $amps_notice_div.hide();
            }
            
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            if(!re.test(ampsLiteLicenseEmail)){
                $amps_notice_div.text('Email is invalid').show();
                jQuery('#amps_lite_user_email').focus();
                return false;
            } else {
                $amps_notice_div.hide();
            }
            
            jQuery(this).html('<i class="fa fa-spinner fa-pulse fa-fw" aria-hidden="true"></i> Requesting').prop('disabled', true);
            var data = {action: 'amps_licensing_request', task: 'register', product: 'amplite', licenseName: ampsLiteLicenseName, licenseEmail: ampsLiteLicenseEmail};
                       
            jQuery.post(amp_data.wp_get, data, function (response) {
                var response = jQuery.parseJSON(response);
                if(response.status === 'true'){
                    $amps_notice_div.text(response.message).removeClass('uk-alert-danger').addClass('uk-alert-success').show();
                    setTimeout(function(){
                        window.location.reload(1);
                    }, 3000);
                } else {
                    $amps_notice_div.text(response.message).removeClass('uk-alert-success').addClass('uk-alert-danger').show();
                }
                jQuery(this).text('Submit').prop('disabled', false)
            });
        });
        
        jQuery(document).on('click', '.amps_lite_license_submit_btn', function(){
            var ampsLiteLicenseKey = jQuery.trim(jQuery('#amps_lite_license').val());
            
            var regLicense = new RegExp('^([A-Za-z0-9]{4}-){3}[A-Za-z0-9]{4}$');
            var $amps_notice_div = jQuery('.amps_lite_license-notice');
            
            if(ampsLiteLicenseKey == ''){
                $amps_notice_div.text('License Key is required').show();
                jQuery('#amps_lite_license').focus();
                return false;
            } else {
                $amps_notice_div.hide();
            }
            
            if(!regLicense.test(ampsLiteLicenseKey)){
                $amps_notice_div.text('License Key is invalid').show();
                jQuery('#amps_lite_license').focus();
                return false;
            } else {
                $amps_notice_div.hide();
            }
            
            jQuery('.amps_lite_license_submit_btn').text('Registering...').prop('disabled', true);
            var data = {action: 'amps_licensing', task: 'register', product: 'amplite', licenseKey: ampsLiteLicenseKey};
                       
            jQuery.post(amp_data.wp_get, data, function (response) {
                var response = jQuery.parseJSON(response);
                if(response.status === 'true'){
                    $amps_notice_div.text(response.message).removeClass('uk-alert-danger').addClass('uk-alert-success').show();
                    setTimeout(function(){
                        window.location.reload(1);
                    }, 3000);
                } else {
                    $amps_notice_div.text(response.message).removeClass('uk-alert-success').addClass('uk-alert-danger').show();
                }
                jQuery('.amps_lite_license_submit_btn').text('Get AMP Lite Registered').prop('disabled', false)
            });
        });
        
        jQuery(document).on('click', '.on_entity_setting', function(){
            var controlfor = jQuery(this).data('controlfor'); 
            var setEntity = jQuery('#mobile_screen_entity_set').attr('valueofentity');

            var notCheckedObjects = jQuery('input.on_entity_setting:checkbox:not(":checked")').length;
            if(!jQuery(this).is(':checked')){
                if((controlfor == setEntity)){
                    var confirmAction = confirm('Mobile Screen Page will be set from '+jQuery.ucfirst(controlfor)+' to Demo Page');
                    if(confirmAction){
                        jQuery('#mobile_screen_ctrls_for_'+controlfor).hide();
                        jQuery('#mobile_screen_entity_demo').click();
                        jQuery('#mobile_screen_entity').val('demo');
                        
                        if(notCheckedObjects == 5){
                            jQuery('.mobile-screen-entity .alert').show();
                        }
                        
                        reloadMobileAndSaveData();
                    } else {
                        return false;
                    }
                } else {
                    jQuery('#mobile_screen_ctrls_for_'+controlfor).hide();
                    if(notCheckedObjects == 5){
                        jQuery('.mobile-screen-entity .alert').show();
                    }
                    reloadMobileAndSaveData();
                }
            } else {
                if(notCheckedObjects < 5){
                    jQuery('.mobile-screen-entity .alert').hide();
                }
                jQuery('#mobile_screen_ctrls_for_'+controlfor).css('display', 'inline');
                reloadMobileAndSaveData();
            }

        });
        
        jQuery(document).on('change', '#mobile_screen_entity_selectbox', function(){
            var thisLink = jQuery('option:selected', this).data('entityurl');
            var thisId = jQuery('option:selected', this).data('entityid');
            jQuery('#mobile_screen_entity_id').val(thisId);
            reloadAndSaveDataAMPS(thisLink);
        });
        
        jQuery(document).on('click', '.amp-settings-form input:checkbox:not(".on_entity_setting")', function(){
            $.post(amp_data.wp_post, $('.amp-settings-form').serialize(), function (d) {
                reloadAMPSSettingsMobileScreen();
                UIkit.notify("<i class='uk-icon-check'></i> Your settings have been saved.", {pos: 'bottom-right', status: "success"});
            });
        });

    });
    
    function createCookie(name, value, days) {
        var date, expires;
        if (days) {
            date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";
    }
    
    jQuery('.amps_disable_checkbox').click(function(){
        var this_val = (jQuery(this).is(':checked')) ? 'YES' : 'NO';
        var this_post_id = jQuery(this).data('postid');
        
        var data = {action: 'disable_amps_for_this_post', disable_status: this_val, post_id: this_post_id};
                       
        jQuery.post(amp_data.wp_get, data, function (response) {
            console.log(response);
        });
    });
})(jQuery);