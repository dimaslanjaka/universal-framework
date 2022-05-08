jQuery(document).ready(function()
{
	
	// Check chosen saved checkboxes
	 if( typeof ($vals) != 'undefined' ){
		// Check active checkboxes
		$val_arr=$vals.split('|');
	    jQuery('input:checkbox').removeAttr('checked');
	
	    jQuery.each($val_arr, function(index, value) { 
	        
			if(value != '') {
				jQuery('input:checkbox[value="'+value+'"]').prop('checked', true);
				jQuery('input:radio[value="'+value+'"]').prop('checked', true);
			}
		});
	 }

	// Selcet all button
	jQuery('.select_all').click(function() {
		jQuery("input:checkbox").prop('checked',true);
		jQuery.uniform.update();	
			return false;
	});
	
	// Deselect all button
	jQuery('.deselect_all').click(function() {
		jQuery("input:checkbox").prop('checked', false);
		jQuery('input:checkbox').removeAttr('checked');
		jQuery.uniform.update();
			return false;
	});
	
	
	// Close link
	function activate_close(){
		jQuery('.close').click(function(){
			jQuery(this).parent().fadeOut('slow');
		});
	}
	
	
    // Style selects, checkboxes, etc removed 
	jQuery(".TTWForm select:not('.translate_t,.no-unify'), .TTWForm input:radio, .TTWForm input:file ,.TTWForm input:checkbox").not(".no-unify").uniform();

    // Date and Range Inputs
	jQuery("#field1, #field2 , #field255, #field256, #field1s,  #fieldz1,#field5zzzg, #fieldlimit, #fieldlimit2,#random_tags_count_field,#cg_minimum_width_f,#cg_min_length,#cg_max_length").rangeinput();

    /**
	 * Get the jQuery Tools Validator to validate checkbox and radio groups
	 * rather than each individual input
	 */
	jQuery('[type=checkbox]').bind('change', function(){
        clearCheckboxError(jQuery(this));
    });
    
    // Campaign type selector to show options related to chosen campaign
    function showHide(){
    		 
	    	jQuery('.typepart').slideUp();
	    	jQuery('.'+ jQuery('#camp_type').val() ).slideDown();
    }
    
    // Campaign post template updater according to campaign type + subfilter
    function updateTemplate(){
	    	
	    	var campType = jQuery('#camp_type').val() ;
	    	var campTempSelecotr = '.temp' + jQuery('#camp_type').val() ;
	    	
	    	// Check if subSelector
	    	var subFilter = jQuery('#camp_type option[value="'+ campType +'"]').attr('data-sub-filter');
	    	
	    	if( typeof subFilter !== typeof undefined && subFilter !== false ){
	    		// subFilter exists append it to the temp class name
	    		campTempSelecotr = campTempSelecotr + jQuery(subFilter).val();
	    	}
	    	
	    	console.log(campTempSelecotr);
	    	
	    	var htm = jQuery(campTempSelecotr).html();
	    	
	    htm.replace('amp;','');
	    htm = 	htm.replace('data-src','src');
	    	
	    	console.log(htm);
	    	
	    	jQuery('textarea[name="camp_post_content"]').html(htm);
    	
    }
    
    // Trigger filter UI by campaign type
     showHide();
    
    // Campaign type change then update UI + Template
    jQuery('#camp_type').change(function(){
        
        showHide();
        updateTemplate();
        
    });
    
    // templateChanger sub filters
    jQuery('.templateChanger').change(function(){
        
        updateTemplate();
        
    });
    
    // Slider function: show specific div when active, hide it if not active
    function slider(id,slide) { 
		  
		if(jQuery(id).prop("checked") == true )
        {
			jQuery(slide).slideDown();
        }
        else
        {
        		jQuery(slide).slideUp();
        }
	 		
	}
    
    // Deslider function: if check active, hide div. If disabled show div
    function Deslider(id,slide , show  ) {
 	  
		if(jQuery(id).prop("checked") == true)
        {
			// if visible slideup
			jQuery(slide ).slideUp();
			jQuery('#field111').val('*');
        }
        else
        {
 	        	// option disabled, view the div if hidden
	        	if(jQuery(slide).length == 0){
	        			
			}
	        	
	        	jQuery(slide + ':hidden').slideDown();
	        	
	        	if(show == false){
	        		
	        	}else{
	        		showHide();
	        	}
         }
	}
    
    // generic sliders
    jQuery('input[data-controls]').each(function(){
       
    		slider(this,'#'+jQuery(this).attr('data-controls'));
    	
        jQuery(this).change(function(){
        		slider(this,'#'+ jQuery(this).attr('data-controls') ) ;
        		 
        });
        
    });
    
    
    // Select box controls a div
	function showHideDiv(divClass){
		
		if(typeof divClass == "undefined"){
			divClass = 'select_control_div_div';
		}
		
	    	jQuery('.' + divClass ).slideUp();

	    	jQuery('.select_control_div').each(function(){
	    		jQuery('.'+  jQuery(this).attr('name') + '_' + jQuery(this).val() ).slideDown();
	    	});
	    	
	}

	showHideDiv();
	
	jQuery('.select_control_div').change(function(){
		showHideDiv(jQuery(this).attr('name'));
	});
    
	
	// duplicator button duplicate it's parent parent
	jQuery(document).on('click','.duplicator',function() {
		(jQuery(this).parent().parent().after( jQuery(this).parent().parent().clone() ));
	    return false;
	});
	
	// cleaner button cleans it's parent parent
	jQuery(document).on('click','.cleaner',function() {
		
		if(jQuery(this).parent().parent().parent().find('.cleaner').length > 1){
			jQuery(this).parent().parent().fadeOut().fadeOut("fast", function(){
				
				 (jQuery(this)).remove()  ;
				
			}) ;
		}else{
			
			jQuery(this).animate({
	            color: 'white',
	        });
			
			jQuery(this).animate({
	            color: 'black',
	        });
			
		}
	   
		 return false;
	});
    
    // flicker user fl_user
    slider('#fl_user','#fl_user_c');
    
    jQuery("#fl_user").change(function(){ 

    	slider('#fl_user','#fl_user_c');
    	
    	if(jQuery('#fl_user').prop("checked") == true)
        {
          
			 
        }
        else
        {
	        // uncheck keyword without filtering
	        	jQuery('#fl_full').removeAttr('checked');
	        	jQuery('#fl_full').trigger('change');
        }
			
	});
    
    jQuery("#eb_user").change(function(){ 

    	 
    	
    	if(jQuery('#eb_user').prop("checked") == true)
        {
          
			 
        }
        else
        {
             // uncheck keyword without filtering
        	jQuery('#eb_full').removeAttr('checked');
        	jQuery('#eb_full').trigger('change');
        }
			
	});
      
    
    // custom fields folding cusom_fields_option
    slider('#cusom_fields_option','#custom_fields_c');
	    jQuery("#cusom_fields_option").change(function(){ 
	    	slider('#cusom_fields_option','#custom_fields_c');
	});

    // translate
    slider('#translate_option','#translate_c');
	    jQuery("#translate_option").change(function(){ 
	    	slider('#translate_option','#translate_c');
	});
    
    // generic DeSliders
    jQuery('input[data-controls-r]').each(function(){

    		var field_name = jQuery(this).attr('data-controls-r');
    		
    		if(field_name.trim() == '' ){
    			field_name = 'field111-container' ;
    		}
    		
    		jQuery(this).change(function(){
        		Deslider(this,'#' + field_name  ,false  );
        });
        
    });

    
    
    // yt user
    slider('#yt_user','#yt_user_c');

  
    jQuery("#yt_user").change(function(){ 

	    	slider('#yt_user','#yt_user_c');
	    	
	    	if(jQuery('#yt_user').prop("checked") == true)
	        {
	          
				 
	        }
	        else
	        {
	             // uncheck keyword without filtering
		        	jQuery('#yt_full').removeAttr('checked');
		        	jQuery('#yt_full').trigger('change');
	        }
    	
			
	});
    
    
    // Youtube uncheck cache when published
	jQuery('#camp_youtube_order').change(function(){

	  if(jQuery(this).val() == 'published' ){
	    jQuery('#OPT_YT_CACHE').prop('checked',false);
	    jQuery.uniform.update();	
	  }
	  
	});
    
    
    jQuery('input[data-controls-r]').change(function(){
    	
    	if(! jQuery(this).prop("checked") == true)
        {
          
    		if(jQuery('#field111').val() == '*' ){
    			 
    			jQuery('#field111').val('');
    		}
    		
			 
        }     	
    });

    
    // replace link
    slider('#replace_link','#replace_link_c');

  
    jQuery("#replace_link").change(function(){ 

		slider('#replace_link','#replace_link_c');
			
	});

    // exact match
    slider('#exact_option','#exact_match_c');

    
    jQuery("#exact_option").change(function(){ 

    		slider('#exact_option','#exact_match_c');
			
	});
    
    // execlude_option match
    slider('#execlude_option','#exact_execlude_c');

    
    jQuery("#execlude_option").change(function(){ 

    		slider('#execlude_option','#exact_execlude_c');
			
	});
    
    // validate checkbox and radio groups
    function validateCheckRadio(){
        var err = {};

        jQuery('.radio-group, .checkbox-group').each(function(){
             if(jQuery(this).hasClass('required'))
                if (!jQuery(this).find('input:checked').length)
                    err[jQuery(this).find('input:first').attr('name')] = 'Please complete this mandatory field.';
        });

        if (!jQuery.isEmptyObject(err)){
            validator.invalidate(err);
            return false ;
        }
        else return true;

    }


    // Generic option filter : option controls items in other options
    jQuery('select[data-filters]').each(function(){
    	
	    	// Changer that checks current value at the master select then view
	    	optionFilter(this ,  jQuery(this).attr('data-filters') );
	
	    	// Changer trigger when value changes
	    	jQuery(this).change(function(){
	    		
	    		optionFilter(this ,  jQuery(this).attr('data-filters') );
	    		
	    		// Select first value
	    		jQuery( jQuery(this).attr('data-filters') ).val( jQuery(jQuery(this).attr('data-filters') + ' option').val() );
	    		
	    	});
    	 
    });
    
    // optionFilter: check the master value, hide all items in zoombie and show
	// only matchs
    function optionFilter( masterInput, zoombieInputSelector ){
    	
	    	// Hide & disable all items in the zoombieSelec
	    	jQuery(zoombieInputSelector + ' option').hide();
	    	jQuery(zoombieInputSelector + ' option').attr('disabled','disabled');
	    	
	    	// Show options with class = masterInput Input value
	    	masterInputValue = jQuery(masterInput).val();
	    	jQuery(zoombieInputSelector + ' option[data-filter-val="'+ masterInputValue +'"]').show();
	    	jQuery(zoombieInputSelector + ' option[data-filter-val="'+ masterInputValue +'"]').removeAttr('disabled');
	    	
    }// end Generic option Filter part

    
    // Generic

    // clear any checkbox errors
    function clearCheckboxError(input){
        var parentDiv = input.parents('.field');

        if (parentDiv.hasClass('required'))
            if (parentDiv.find('input:checked').length > 0){
                validator.reset(parentDiv.find('input:first'));
                parentDiv.find('.error').remove();
            }
    }


    // Position the error messages next to input labels
    jQuery.tools.validator.addEffect("labelMate", function(errors, event){
        jQuery.each(errors, function(index, error){
            error.input.first().parents('.field').find('.error').remove().end().find('label').after('<span class="error">' + error.messages[0] + '</span>');
        });

    }, function(inputs){
        inputs.each(function(){
            jQuery(this).parents('.field').find('.error').remove();
        });

    });


    /**
	 * Handle the form submission, display success message if no errors are
	 * returned by the server. Call validator.invalidate otherwise.
	 */

  // jQuery("#post").validator({effect:'labelMate'});
   
   jQuery("#publish").click(function(event){
  
	   // validating

	   if( jQuery('#camp_type').val() == 'Feeds' ){
		   
		   jQuery('textarea[name="feeds"]').attr('required','required');
		   jQuery('textarea[name="camp_keys"]').removeAttr('required');
		   var inputs = jQuery('textarea[name="feeds"]').validator({effect:'labelMate'});
		   
	   }else if(jQuery('#camp_type').val() == 'Spintax'){
		    
		   jQuery('textarea[name="camp_keys"]').removeAttr('required');
		   var inputs = jQuery('textarea[name="camp_post_content"]').validator({effect:'labelMate'});
		
	   }else if( jQuery('#camp_type').val() == 'Facebook' ){ 	   
		   
		   jQuery('input[name="cg_fb_page"]').attr('required','required');
		   var inputs = jQuery('input[name="cg_fb_page"]').validator({effect:'labelMate'});
		
	   }else if( jQuery('#camp_type').val() == 'Single' ){ 	   
		   
		   jQuery('input[name="cg_sn_source"]').attr('required','required');
		   var inputs = jQuery('input[name="cg_sn_source"]').validator({effect:'labelMate'});   
	
	   }else if( jQuery('#camp_type').val() == 'Multi' ){ 	   
		   
		   // jQuery('input[name="cg_ml_source"]').attr('required','required');
		   // var inputs =
			// jQuery('input[name="cg_ml_source"]').validator({effect:'labelMate'});
		
		   
	   }else if ( jQuery('#camp_type').val() == 'Craigslist' ){
		   jQuery('input[name="cg_cl_page"]').attr('required','required');
		   jQuery('textarea[name="camp_keys"]').removeAttr('required');
		   var inputs = jQuery('input[name="cg_cl_page"]').validator({effect:'labelMate'});
	   
	   }else if ( jQuery('#camp_type').val() == 'Reddit' ){
		   jQuery('input[name="cg_rd_page"]').attr('required','required');
		   jQuery('textarea[name="camp_keys"]').removeAttr('required');
		   var inputs = jQuery('input[name="cg_rd_page"]').validator({effect:'labelMate'});
	       
		   
	   }else{
		   jQuery('textarea[name="feeds"]').removeAttr('required');
		   jQuery('textarea[name="camp_keys"]').attr('required','required');
		   var inputs = jQuery(".TTWForm-container :input").validator({effect:'labelMate'});
       }
	   
	      
	   // check if not valid stop loading ajax icons
	   if( ! inputs.data("validator").checkValidity()){
		   
		   event.stopImmediatePropagation();
		   
	   }else{
		   
		   if( jQuery('#camp_type').val() == 'Youtube' ){
			   
			   
			   
		   }
		   
	   }
	   
	   
	   
   });

 // SUPPORTED TAGS
   function supportedUpdate(){
	   
	   if(typeof supportedTags != 'undefined')  {
	   
	   var supportedText = '';
	   var campType = jQuery('#camp_type').val() ;
       var campTempSelecotr = campType;
		   
			// Check if subSelector
	    	var subFilter = jQuery('#camp_type option[value="'+ campType +'"]').attr('data-sub-filter');
	    	
	    	if( typeof subFilter !== typeof undefined && subFilter !== false ){
	    		// subFilter exists append it to the temp class name
	    		campTempSelecotr = campTempSelecotr + jQuery(subFilter).val();
	    	}
		   
		   jQuery(supportedTags[ campTempSelecotr ]).each(function(index,value ){
		       
		       if(index != 0 ) { supportedText = supportedText + ' , ' ;}
		       
		       supportedText = supportedText   + '<abbr title="' +  value[1] + '" >' + value[0] + '</abbr>' ; 
		   });
		   
		   
		   
		   // additional custom fields tags
		   supportedText2 = supportedText + ' , <abbr title="Random number between two values. e.g, [rand_1_3] will be replaced by either 1,2 or 3" >[rand_num1_num2]</abbr> , <abbr title="src url of the chosen image at the source to be a featured image" >[featured_img_source]</abbr> , <abbr title="src url of the featured image after setting it" >[featured_img_local_source]</abbr>, <abbr title="ID the featured image after setting it" >[featured_img_id]</abbr>' ;
		   
		   // fixed tags for all campaigns content only
		   supportedText = supportedText + ', <abbr title="Retruns the title words as hashtags. e.g: if the title is hello world, it will return #hello #world" >[title_words_as_hashtags]</abbr>';
		   
		   jQuery('.supportedTags').html('supported Tags: ' + supportedText );
		   jQuery('.supportedTags2').html('supported Tags: ' + supportedText2 );

	   }
   }
   supportedUpdate();
    
   jQuery('#camp_type').change(function(){
	   supportedUpdate();
	});
   
   // templateChanger sub filters
   jQuery('.templateChanger').change(function(){
	   supportedUpdate();
   });
   
   // CUSTOM FIELDS
   jQuery('#custom_new').click(function(){
	   jQuery('#custom_fields_c_f').append(jQuery('.custom_field_wrap').html());    
	   return false;
   });
     
    // run campaign
    jQuery('#campaign_run').click(function(){

    	
    	jQuery.ajax({
    	    url: jQuery(this).attr('href'),
    	    type: 'GET',
    	    cache: false,

    	    success: function (data) {
    	    
    	    	jQuery('#campaign_run').addClass('run').removeClass('run_load');

    	    	jQuery('#wp-automatic-welcome-panel').remove();
    	    	jQuery('#status-meta-boxes .inside').append('<div style="display:none;margin-top:0" dir="ltr" class="wp-automatic-welcome-panel" id="wp-automatic-welcome-panel"> '+ data +' <a dir="rtl" style="right:10px !important" href="#" class="wp-automatic-welcome-panel-close">Dismiss</a></div>');
    	    	jQuery('#wp-automatic-welcome-panel').slideDown('slow',function(){
    	    		
    	    		// handle close button
    	    		jQuery('.wp-automatic-welcome-panel-close').click(function(){
    	    			jQuery('#wp-automatic-welcome-panel').remove();
    	    			return false;
    	    		});
    	    		
    	    		
    	    		// update records if new post
    	    		if(jQuery('.new_post_link').length >0){
     	    		   
       	    		 jQuery('#last_run_date').css('background','yellow').fadeOut('slow',function(){
       	    			 	jQuery('#last_run_date').html( jQuery('.new_post_link').attr('time'));}).fadeIn('slow',function(){jQuery(this).css('background','transparent'); 
       	    			    jQuery('#last_post').css('background','yellow').fadeOut('slow',function(){jQuery('#last_post').html( '<a href="'+ jQuery('.new_post_link').attr('href') +'">'+jQuery('.new_post_link').html()+'</a>' ) ; }).fadeIn('slow',function(){jQuery(this).css('background','transparent'); });
       	    		 });
       	    		 	
       	    		   jQuery('#posted-meta-box .inside p').after('<div class="posted_itm"><a href="'+jQuery('.new_post_link').attr('href')+'">'+jQuery('.new_post_link').html()+'</a><br>on <small>'+jQuery('.new_post_link').attr('time')+'</small><br></div>') ;
       	    		   jQuery('#posted-meta-box .inside p strong').html('(' + jQuery('.posted_itm').length +')') ;
    	    		}
    	    		
    	    	});
    	    
    	    

    	    },

    	    beforeSend: function () {
	    	    	
	    	    	jQuery('#campaign_run').addClass('run_load').removeClass('run');
	    	    	jQuery('#welcome-panel').slideUp('slow');
    	    }
    	    
    	    ,error: function(one, two , three){
    	    	
    	    		var four = ' If this error persists, please visit the plugin settings page and enable the option named "Disable register_shutdown_function". This could be a solution' ;
    	    	
    	     	jQuery('#campaign_run').addClass('run').removeClass('run_load');

	    	    	jQuery('#welcome-panel').remove();
	    	    	jQuery('#status-meta-boxes .inside').append('<div style="display:none;margin-top:0;padding-top:10px;" dir="ltr" class="wp-automatic-welcome-panel" id="wp-automatic-welcome-panel"> '+  two + ' ' +  three + ' ' + four +  ' <a dir="rtl" style="right:10px !important" href="#" class="wp-automatic-welcome-panel-close">Dismiss</a></div>');
	    	    	jQuery('#wp-automatic-welcome-panel').slideDown('slow',function(){
	    	    		
	    	    		// handle close button
	    	    		jQuery('.wp-automatic-welcome-panel-close').click(function(){
	    	    			jQuery('#wp-automatic-welcome-panel').remove();
	    	    			return false;
	    	    		});
	    	    		
	    	    		 
	    	    		
	    	    	});
    	    	
	    	 
    	    }
    	    
    	    


    	});
    	return false;
    	});
    
    	/**
		 * Show valid cat and hide non valid ones
		 */
    	function updateUICategory(){
	        console.log(jQuery('select[name="camp_post_type"]').val());
	        jQuery('.post_category').hide();
	        jQuery('.post_' + jQuery('select[name="camp_post_type"]').val() ).show();
	    }
    	
    	/**
		 * Take the visible category taxonomy and set it to the field
		 */
    	function updateTax(){
            jQuery('#cg_camp_tax').val( jQuery('select[name="camp_post_category[]"] option[value="' + jQuery('select[name="camp_post_category[]"]').val()[0] + '"]:visible').attr('data-tax')   );  

    	}
    	
    	updateUICategory();
    	jQuery('select[name="camp_post_type"]').change(function(){
	    	
	    	// hide non used and show used cate
	    	updateUICategory();
	    	
	    	// select first visible item
	    	jQuery('select[name="camp_post_category"]').val(jQuery('select[name="camp_post_category"] option:visible').eq(0).val());
	    	
	    	// update taxononmy
	    	updateTax();
	    
	    });
    	
    	// change tax when category change
    	jQuery('select[name="camp_post_category[]"]').change(function(){
    		updateTax();
    	});
    	
    	
    	// reactivate key ajax
    	jQuery(document).ready(function() {
			jQuery('#status-meta-boxes').on('click','.wp_automatic_key_reactivate',function() {
				
				var dataKey =jQuery(this).attr('data-key');
				jQuery('.spinner_' + dataKey ).show();
				
				jQuery.ajax({
					url : ajaxurl,
					type : 'POST',

					data : {
						action : 'wp_automatic_reactivate_key',
						id     : jQuery(this).attr('data-id') , 
						key    : dataKey  

					},
					
					success:function(data){
						jQuery('.spinner_' + dataKey ).hide();
						alert(data);
					}
				});

				return false;

			});
		});
    	
    	// Ajax request from campaign
    	jQuery(document).ready(function() {
			jQuery('#status-meta-boxes').on('click','.wp_automatic_ajax',function() {
				
				var dataKey =jQuery(this).attr('data-camp');
				var dataAction =jQuery(this).attr('data-action');
				var dataFunction =jQuery(this).attr('data-function');
				var dataData =jQuery(this).attr('data-data');
				
				jQuery('.spinner_' + dataKey ).show();
				
				jQuery.ajax({
					url : ajaxurl,
					type : 'POST',

					data : {
						action : dataAction,
						id     : dataKey ,
						function: dataFunction,
						data    : dataData  

					},
					
					success:function(data){
						jQuery('.spinner_' + dataKey ).hide();
						alert(data);
					}
				});

				return false;

			});
		});

    	// bulk Actions from the plugin
    	jQuery('.bulk_action').click(function(){
    		
    	    if(confirm("Are you sure ?")){
    	    	
    	    	
    	    	var dataCamp =jQuery(this).attr('data-camp');
    			var datakey =jQuery(this).attr('data-key');
     			
    			jQuery('.spinner_bulk' ).addClass('is-active');
    			
    			jQuery.ajax({
    				url : ajaxurl,
    				type : 'POST',

    				data : {
    					action : 'wp_automatic_bulk',
    					id     : dataCamp ,
    					key    : datakey  

    				},
    				
    				success:function(data){
    					jQuery('.spinner_bulk'  ).removeClass('is-active');
    					alert(data);
    				}
    			});

    	    	
    	    }

    		
			return false;

    		
    	}); 
    	
    	// fetch yt user playlists
    	jQuery('#yt_playlist_update').click(function(){
    		jQuery('.spinner-playlist').show();
    		jQuery.ajax({
				url : ajaxurl,
				type : 'POST',
				dataType: 'json',

				data : {
					action : 'wp_automatic_yt_playlists',
					user   : jQuery('#camp_yt_user').val(),
					pid    : jQuery('#wp_automatic_post_id').val()

				},
				
				success: function(data){
					jQuery('.spinner-playlist').hide();
					jQuery('#cg_yt_playlist option').remove();
					
					jQuery(data['data']).each(function(index,val){
						 
						 if(jQuery('#cg_yt_playlist option[value="'+ val['id'] +'"]').length == 0 ){
							 
							 // append it
							 jQuery('#cg_yt_playlist').append('<option value="'+ val['id']+'">'+ val['title'] +'</option>');
							 
							 
						 }
 
						
					});
				}
				
			});
    		
    		
    		
    		return false;
    		
    	});
    	
    	// Specify playlist trigger update
		jQuery('#wp_automatic_playlist_opt').click(function(){

			  if(jQuery(this).prop("checked") == true){
			    
			    jQuery('#yt_playlist_update').trigger('click');
			    
			    
			    if(!jQuery('#yt_full').prop('checked') == true ){
			    	jQuery('#yt_full').trigger('click');
			    } 
			    
			    jQuery.uniform.update();
			  
			  }
			  
		}); 
		
		
		// update chosen playlist id
		jQuery('#cg_yt_playlist').change(
				function(){

					jQuery('#cg_yt_playlist_txt').val(jQuery(this).val());

		});
		
		// fetch dm user playlists
    	jQuery('#dm_playlist_update').click(function(){
    		jQuery('.spinner-dmplaylist').show();
    		jQuery.ajax({
				url : ajaxurl,
				type : 'POST',
				dataType: 'json',

				data : {
					action : 'wp_automatic_dm_playlists',
					user   : jQuery('#camp_dm_user').val(),
					pid    : jQuery('#wp_automatic_post_id').val()

				},
				
				success: function(data){
					jQuery('.spinner-dmplaylist').hide();
					jQuery('#cg_dm_playlist option').remove();
					
					jQuery(data['data']).each(function(index,val){
						 
						 if(jQuery('#cg_dm_playlist option[value="'+ val['id'] +'"]').length == 0 ){
							 
							 // append it
							 jQuery('#cg_dm_playlist').append('<option value="'+ val['id']+'">'+ val['title'] +'</option>');
							 
						 }
					});
				}
			});
    		
    		
    		
    		return false;
    		
    	});
    	
    	// Specify playlist trigger update
		jQuery('#wp_automatic_dmplaylist_opt').click(function(){

			  if(jQuery(this).prop("checked") == true){
			    
				    jQuery('#dm_playlist_update').trigger('click');
				     
				    if(!jQuery('#dm_full').prop('checked') == true ){
				    		jQuery('#dm_full').trigger('click');
				    } 
				    
				    jQuery.uniform.update();
			  
			  }
			  
		}); 
		
		
		// update chosen playlist id
		jQuery('#cg_dm_playlist').click(
				function(){

					jQuery('#cg_dm_playlist_txt').val(jQuery(this).val());

		});
 
		// more_posted_posts load more posts button
		jQuery('#more_posted_posts').click(function(){
			
			// show spinner
			jQuery('.spinner-more_posted_posts').addClass('is-active');
			
			jQuery.ajax({
				url : ajaxurl,
				type : 'POST',

				data : {
					action : 'wp_automatic_more_posted_posts',
					camp     : jQuery(this).attr('data-camp') , 
					page    : jQuery(this).data('page')    

				},
				
				success:function(data){
					 
					jQuery('.latest-posts-container').append(data);
					
					jQuery('.spinner-more_posted_posts').removeClass('is-active');
				}
			});
			
			// update page
			jQuery(this).data('page',jQuery(this).data('page') + 10 )   ;

			return false;

			
		});
		
		
		// XPath selectors
		getElementXPath = function(element)
		{
		    if (element && element.id && !(element.id.match(/[0-9]+/)   ) )
		        return '//*[@id="' + element.id + '"]';
		    else
		        return getElementTreeXPath(element);
		};

		getElementTreeXPath = function(element)
		{
		    var paths = [];

		    // Use nodeName (instead of localName) so namespace prefix is
			// included (if any).
		    for (; element && element.nodeType == Node.ELEMENT_NODE; element = element.parentNode)
		    {
		        var index = 0;
		        var hasFollowingSiblings = false;
		        for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling)
		        {
		            // Ignore document type declaration.
		            if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
		                continue;

		            if (sibling.nodeName == element.nodeName)
		                ++index;
		        }

		        for (var sibling = element.nextSibling; sibling && !hasFollowingSiblings;
		            sibling = sibling.nextSibling)
		        {
		            if (sibling.nodeName == element.nodeName)
		                hasFollowingSiblings = true;
		        }

		        var tagName = (element.prefix ? element.prefix + ":" : "") + element.localName;
		        var pathIndex = (index || hasFollowingSiblings ? "[" + (index + 1) + "]" : "");
		        
		        console.log(tagName + pathIndex);
		        
		        if(element.id && !(element.id.match(/[0-9]+/)) ){
		        		tagName = "/*";
		        		pathIndex = '[@id="'+ element.id +'"]';
		        };
		        
		        paths.splice(0, 0, tagName + pathIndex);
		        
		        if(element.id && !(element.id.match(/[0-9]+/)) ){
		        		break;
		        }
		        
		    }

		    return paths.length ? "/" + paths.join("/") : null;
		};
		
		// pop up
		(function($){
			
			$.wmBox = function(){
				$('body').prepend('<div class="wmBox_overlay"><div class="wmBox_centerWrap"><div class="wmBox_centerer"><div class="wmBox_contentWrap" style="    background: url('+ pluginDir +'/images/loading.gif) no-repeat center"><div class="wmBox_scaleWrap" style="visibility: hidden;"><div class="wmBox_closeBtn"><p>x</p></div>');
			};
			
			$('.TTWForm').on('click','[data-popup-field-name]', function(e){
				
				e.preventDefault();
				
				 if( jQuery(this).attr('data-popup-field-name') != '' &&   jQuery('#camp_type').val() != 'Feeds' ){
					 // a specific field exists
					 var mySrc = jQuery('*[name="'+ jQuery(this).attr('data-popup-field-name') +'"]').val();
				 }else{
					 var mySrc = jQuery('*[data-visual-selector-'+ jQuery('#camp_type').val() +']').val();
				 }
				 
				// Single page and multi-page cookie
				var theCookie = jQuery('[name="cg_sn_cookie"]').val();
				 
				if(theCookie == ""){
					theCookie =  jQuery('[name="cg_ml_cookie"]').val();
				}
				
				var theTrigger =  this ;
				 
				
				if( mySrc.indexOf('http') == -1 ){
					// not valid URL
					alert('Please add a valid source URL');
					return;
				}
				
				var which = jQuery(theTrigger).parent().parent().find('input[type="text"]').attr('name');
				
				var iframeUrl = ajaxurl+'?action=wp_automatic_iframe&address='+encodeURIComponent(mySrc)+'&theCookie=' +  encodeURIComponent(theCookie)  ;
				
				// Encoding
				if(jQuery('input[value="OPT_FEED_ENCODING"]').prop('checked') == true ){
					iframeUrl = iframeUrl + '&clean_encoding=yes';
				}
				
				console.log(which);
				
				
				//JS support
				if( which == 'cg_ml_visual[]' || which == 'cg_feed_visual[]'){
					//single posts on feeds and multi-page scraper
				 
					if( jQuery('input[value="OPT_FEED_APIFY"]').prop('checked') == true){
						iframeUrl = iframeUrl + '&js_enabled=yes';
					}
					
				}else if( which == 'cg_ml_lnk_visual[]' ){ 	
					
					if( jQuery('input[value="OPT_FEED_APIFY2"]').prop('checked') == true){
						iframeUrl = iframeUrl + '&js_enabled=yes';
					}
					
				}else{
					
					//OPT_FEED_APIFY : single page scraper 
					
					if( jQuery('input[value="OPT_FEED_APIFY"]').prop('checked') == true ||  jQuery('input[value="OPT_FEED_APIFY2"]').prop('checked') == true ){
						iframeUrl = iframeUrl + '&js_enabled=yes';
					}
				}
				// SOURCE campaign type
				iframeUrl = iframeUrl + '&sourse=' + jQuery('#camp_type').val() ; 
				 
				// WHICH button
				iframeUrl = iframeUrl +  '&which=' + which;
				
				$('.wmBox_overlay .wmBox_scaleWrap').append('<iframe id="insepector_frame" src="'+ iframeUrl +'">');
				
				$('.wmBox_overlay').fadeIn(750);

				// insepector_frame ready
				 $("#insepector_frame").load(function(){
					 
					 $('.wmBox_scaleWrap').css('visibility','visible');
					 
					 // hover
					 var prev;
					  var doc= document.getElementById("insepector_frame").contentDocument;
					  doc.body.onmouseover = handler;
					  
					  function handler(event) {
					    
					    if (event.target === doc.body ||
					        (prev && prev === event.target)) {
					      return;
					    }
					    
					    if (prev) {
					    	
						    	 if( typeof prev.className.replace === "function" ){
						    		 prev.className = prev.className.replace(/\bhighlight\b/, '');
						    	 }
						    		 
						      prev = undefined;
					    }
					    if (event.target) {
					      prev = event.target;
					      prev.className += " highlight";
					    }
					  }
					  
					  // click
					  $("#insepector_frame").contents().find("body *").click(function() {
						  if(jQuery(this).hasClass('highlight')){
							  console.log(jQuery(theTrigger).parent().parent());
							  
							  jQuery(theTrigger).parent().parent().find('input[type="text"]').val(  getElementXPath($(this)[0])  );
							  
							  var foundElement = $(this)[0];
							  
							  // link URL for multi campaign type
							  if( jQuery('#insepector_frame').attr('src').indexOf('cg_ml_lnk_visual') != -1 ){
								  
								  var foundLink = null;
								  
								 
								  
								  if ( jQuery( foundElement).attr('href') != undefined ){

									   foundLink = jQuery( foundElement).prop('href');
									    
 								  
								  }else{
									  
									  // not directly a link may be the parent
										// is?
									  var currentParent = foundElement;
									  
									  var iterations = 0;
									  while ( currentParent != undefined && jQuery(currentParent).attr('href') == undefined &&  iterations < 10  ){
										  currentParent = jQuery(currentParent).parent();
										  iterations = iterations +1;
										  
									  }
									  
									  if (jQuery(currentParent).attr('href') != undefined){
										  
										  foundLink = jQuery( currentParent).prop('href');
										 
										
										
									  }
									  
								  }
								  
								   // a link was found?
								  if( foundLink != null){
									  
									  jQuery( 'input[name="cg_ml_example"]' ).val( foundLink );
									  jQuery( 'input[name="cg_ml_example_2"]' ).val( foundLink );
									  
								  }
								   
								  
							  }
							  
							  // console.log( getElementXPath($(this)[0]) );
							  
							  $('.wmBox_overlay').fadeOut(750, function(){
									$(this).find('iframe').remove();
									jQuery('.wmBox_scaleWrap').css('visibility','hidden');
								});
							  
							  return false;
							  
						  }  
						  
						    
						});
				 })
				
				$('.wmBox_overlay iframe').click(function(e){
					e.stopPropagation();
				});
				
				$('.wmBox_overlay').click(function(e){
					e.preventDefault();
					$('.wmBox_overlay').fadeOut(750, function(){
						$(this).find('iframe').remove();
						jQuery('.wmBox_scaleWrap').css('visibility','hidden');
					});
				});
			});
		}(jQuery));
		
		jQuery.wmBox();
		
		// Show options
		jQuery('#wp_automatic_main_box_loading').remove();
		jQuery('#wp_automatic_main_box').css('visibility','visible');
		
		// author locator set the selector type to xpath
		// cg_custom_selector_author
		jQuery('.author_locator').click(function(){
			jQuery('#cg_custom_selector_author').val('xpath');
			jQuery.uniform.update();
		});
		
		// tag_locator
		jQuery('.tag_locator').click(function(){
			jQuery('#cg_custom_selector_tag').val('xpath');
			jQuery.uniform.update();
		});
		
		jQuery('.cat_locator').click(function(){
			jQuery('#cg_custom_selector_cat').val('xpath');
			jQuery.uniform.update();
		});
		
		// First load hiding keywords box
	    jQuery('input[data-controls-r]:checked').each(function(){
		    	 
		    	var field_name = jQuery(this).attr('data-controls-r');
				
				if(field_name.trim() == '' ){
					field_name = 'field111-container' ;
				}
		     	
				Deslider(this,'#' + field_name  ,false  );
	    });

		
});