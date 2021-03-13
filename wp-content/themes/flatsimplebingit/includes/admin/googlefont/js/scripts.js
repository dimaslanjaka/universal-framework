;(function($) {		

	jQuery(document).ready(function($){	
		
		/*-----------------------------------------------------------------------------------*/
		/*	0. =// OptionTree Google Font Preview
		/*-----------------------------------------------------------------------------------*/		
										
		jQuery.fn.OptionTreeGoogleFont = function(){				

			return this.each(function(){
		
				if(typeof OT_UI != 'undefined' && OT_UI){ // just double checking if OT_UI is existing			
		
					// we have to load the google fonts from the webfonts api 
					// and store them in a custom object for further usage
					var json_families = {};				
					
					// get the google font families from the database
					$.ajax({
						dataType: 'json',
						url: 'admin-ajax.php',
						async: false,
						data: {
							action: 'ot_ajax_get_google_font'
						},
						success: function(data, textStatus, XMLHttpRequest){
							json_families = data;
						}
					})
											
					var // some general settings						
						settings = {
							families : json_families, // The Google Font families from our Ajax Call
							inner: '.format-setting-inner', // Container to prepend the preview - Container has to be in the .type-typography div
							text : 'The quick brown fox jumps over the lazy dog', // text to be shown in the preview field
							placeholder: 'Enter your text',
							font_weight_default: ['font-weight','Normal','Bold','Bolder','Lighter'],
							font_weight_numeric: ['100','200','300','400','500','600','700','800','900'],
							font_style: ['font-style','Normal','Italic','Oblique','Inherit']
						},
												
						methods = {							
							
							// some action on init
							init : function(_this){
															
								// store some settings								
								_this.options = {									
									preview_wrapper   : _this.find('.font-preview'),
									textarea		  : _this.find('textarea'),
									input_fields	  : _this.find(':input'),
									optionset 		  : {}, // this is our optionset object to store the values from the inputs
									font_weight_array : {} // this is the font weight array for the select dropdown, if font weights ar set from google font
								}
								
								// create the preview wrapper if not already existing
								if(!_this.options.preview_wrapper.length){
									_this.find(settings.inner).prepend('<div id="preview-' + Math.floor(Math.random()*101) + '" class="font-preview transition"><div class="style"></div><textarea name="text-preview" placeholder="'+settings.placeholder+'">' + settings.text + '</textarea></div>');
									_this.options.preview_wrapper = _this.find('.font-preview');
									_this.options.textarea = _this.options.preview_wrapper.find('textarea');
									this.update(_this);
								}
																
								_this.options.preview_id = _this.options.preview_wrapper.attr('id');																
									
								// init the change action
								this.change(_this);

									
							},
							
							// method to update the fields - here is where the magic happens
							update : function(_this, input_elem){															

								var style = '';
								
								if(!input_elem){
									input_elem = _this.options.input_fields.filter('[name*="font-family"]');	
								}
								
								// clear previous set timeout
								if(typeof loadingTimeout != 'undefined' && loadingTimeout){
									clearTimeout(loadingTimeout);	
								}
								
								// add the loading animation
								_this.options.textarea.addClass('loading');								
												
								
								// if there are some input fields do the action
								if(_this.options.input_fields){
									
									// loop through the fields and get the current values
									for(i=0; i < _this.options.input_fields.length; i++){ // loop through the input fields, get the values and store them in the optionset				
										
										var input = jQuery(_this.options.input_fields[i]),
											name  = input.attr('name'),
											value = input.val();
																												
										// if a value is selected, add the value to the optionset
										// We have to get the input name and cut of some strings from the option tree 
										// option[field_id][attribute] to get the attribute name
											
										// get the font-attribute from the inputs name
										var index = name.split('[')[2].slice(0, -1);								
										
										if(value){											
											_this.options.optionset[index] = value; // we have to replace the - with _ to make it work in php objects
										}else{
											delete _this.options.optionset[index];
										}

									};
										
									// build the google font url
									if(_this.options.optionset){										
																	
										// clean up previous set styles
										var style_container = jQuery('.style', _this.options.preview_wrapper);
														
										// get the font weight array from default settings
										_this.options.font_weight_array = settings.font_weight_numeric;
																										
										if(_this.options.optionset['font-family'] && _this.options.optionset['font-family'] in settings.families){
											
											var apiUrl = [];
											
											apiUrl.push('//fonts.googleapis.com/css?family=');
											apiUrl.push(settings.families[_this.options.optionset['font-family']].family.replace(/ /g, '+'));
																							
											// we have some variants, push it to the URL array						
											var obj_variant= settings.families[_this.options.optionset['font-family']].variants,
												url_variant = "",
												option_variant = [];
																						
											if (obj_variant.length >= 1) {
																								
												apiUrl.push(':');
												
												for(i=0; i < obj_variant.length; i++){
													url_variant += (url_variant.length > 0 ? ',' : '') + obj_variant[i];
													if(!isNaN(obj_variant[i])){ // only get font weights in numbers
														option_variant.push(obj_variant[i]);
													}
												};
												
												apiUrl.push(url_variant);
												
												// store the variants in the options array and overwrite default values
												_this.options.font_weight_array = option_variant;
																							
											}
																						
											// we have some subsets, push it to the URL array						
											var obj_subsets = settings.families[_this.options.optionset['font-family']].subsets,
												url_subsets = "";											
											
											// we have some subsets, push it to the URL array
											if (obj_subsets.length) {
												apiUrl.push('&subset=');																																	
												for(i=0; i < obj_subsets.length; i++){
													url_subsets += (url_subsets.length > 0 ? ',' : '') + obj_subsets[i];
												}
												apiUrl.push(url_subsets);	
											}
											
											// url: '//fonts.googleapis.com/css?family=Anonymous+Pro:bold&subset=greek'
											var google_url = apiUrl.join('');
											style += '<link rel="stylesheet" id="functions-css" href="'+google_url+'" type="text/css" media="all" />';											
											
										}
										
										// we are checking the current changed input for font-family
										if(typeof input_elem != 'undefined' && input_elem.attr('name').indexOf('font-family') != -1 ){
										
											// get the current font-weight select and rebuild it with the available options
											if( _this.options.input_fields.filter('[name*="font-weight"]').size() ){
																							
												var inp_font_weight = _this.options.input_fields.filter('[name*="font-weight"]');
																					
												// get the selected
												var selected = jQuery('option:selected', inp_font_weight);
												
												// clear the old font-weight optionset
												jQuery('option', inp_font_weight).remove();
												
												// add the options values
												var append_options = [];
												var loop_options = settings.font_weight_default.concat(_this.options.font_weight_array);
												
												// loop through the options and push to the array
												jQuery.each(loop_options, function(key, value) {		
													var attr = value != 'font-weight' ? value.toLowerCase() : "";		
													append_options.push(jQuery("<option></option>").attr("value", attr).text(value));													
												});											
																								
												// add missing inherit
												append_options.push(jQuery("<option></option>").attr("value", 'inherit').text('Inherit'));
												
												// finally append the font-weight select			
												inp_font_weight.append(
													jQuery.map(append_options, function(val,i){																																												
														return val.get(0);
													})												
												);												
												
												// there is no bold style in font-variants, only regular => remove *bold and lighter											
												if(typeof obj_variant != 'undefined' && obj_variant.length <= 2){
													inp_font_weight.find('option[value*="bold"], option[value*="lighter"]').remove()
												}
												
												// restore the selected element if the value exists in the new optionset
												if(selected.val() != ""){
													inp_font_weight.find('option[value="'+selected.val()+'"]').attr('selected','selected');
												}												
																					
											}
										
										}
										
										// set all other styles
										style += '<style>#' + _this.options.preview_wrapper.attr('id') + '.font-preview textarea {';
												
											// loop through availalbe styles and create the needed code								
											jQuery.each(_this.options.optionset, function(attribute,value){
												if(attribute == 'preview_id'){
													return true;
												}else if(attribute == 'font-family' && _this.options.optionset['font-family'] in settings.families){ // add the font family string
													style += attribute +':' + settings.families[value].family + ';';
												}else if(attribute == 'font-color'){ // add the font family string
													style += 'color:' + value + ';';													
												}else{ // add all other styles
													style += attribute +':'+value+';';
												}
											})
											
										style += '}</style>';
										
										// add a setTimeout to simulate a smooth loading animation,
										// which improves the visual presentation of the style changes.
										// otherwise adding new html code will end up in a ugly flickering
										var loadingTimeout = setTimeout(function(){											
											
											// remove loading
											_this.options.textarea.removeClass('loading');											
											
											// remove old styles and append the new one
											style_container.html('').append(style);
											
										}, 500);
										
									}
													
								} 
																
							}, // end of update
							
							// method to bind the change event to all the input fields
							change: function(_this){
								_this.on('change input blur', ':input', function(e){
										methods.update(_this, jQuery(this));
								})
							}
							 
						} // end of methods
						
						// start the init
						jQuery(this).find('.type-typography').each(function(){						
							methods.init(jQuery(this));
						})
																							
				}else{ // end of typeof OT_UI	
					if(console){
						console.log('OT: Sorry, but we cannot find any OptionTree installation');
					}
				}
				
			}) // end of each()			
		} // end of OptionTreeGoogleFont
				
		// launch function on load to get default values
		jQuery('#option-tree-settings-api').OptionTreeGoogleFont();

	})

})(jQuery);