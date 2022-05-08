
jQuery(document).ready(function() {
 //ADD SYNONYMS
	jQuery('#add_synonyms').click(function(){
		
		var newVal=jQuery('#content').val();		
		if(jQuery.trim(newVal) == '') return;

		newVal_arr=newVal.split('\n');
		var newLine='';
		var firstVal='';
		jQuery.each(newVal_arr,function(index,value){
		    if(jQuery.trim(value) != ''){
		        if(newLine == ''){
		            newLine=  value ;
		            firstVal=value;
		        }else{
		            newLine=newLine + '|' + value;
		        }
		    }
		});
		
		
		
		lastKey=parseInt(lastKey) +1;
		 jQuery('#word_select').append( '<option value="'+ lastKey  +'" >'+ firstVal +'</option>') ;
		 synonyms_arr[lastKey]=newLine;
		 jQuery('#content').val('');
		 
		//update database with new values
			jQuery.ajax({
				
				url : ajaxurl,
				type : 'POST',
				data : {paction:'custom_add',action:'wp_auto_spinner_ajax',id:lastKey, thesaurs:jQuery('#treasures').val(),value:newLine},
		
				success : function(data) {
					 
					//posting message 
		
				},
		
				beforeSend : function() {
					
					
					
				}
			});
			

		 
		
		
	});
	
	
	//SELECT WORD
	jQuery('#word_select').change(function(){
		   var arr_index=jQuery('#word_select').val();    
		   var arr_line = synonyms_arr[arr_index];
		   var arr_line_arr=arr_line.split('|');
		   
		   jQuery('#word_synonyms').val('');
		   
		   jQuery('#synonym_word').val( arr_line_arr[0] );
		   
		   jQuery.each(arr_line_arr, function( index, value ) {
			   
			   if(index == 0 ){
				   
			   }else if(index == 1){
				   jQuery('#word_synonyms').val( value );
			   }else{
				   jQuery('#word_synonyms').val( jQuery('#word_synonyms').val() +'\n'+  value );
			   }
			   
			   
		    });
		 
		});
	
	//edit button
	jQuery('#edit_synonyms').click(function(){

	if(jQuery('#edit_synonyms').attr('disabled')!='disabled'){
		//not disabled 
		jQuery('#word_synonyms').removeAttr('disabled');
		jQuery('#save_synonyms').removeAttr('disabled');
		jQuery('#cancel_synonyms').removeAttr('disabled');    
		jQuery('#delete_synonyms').attr('disabled','disabled');
		jQuery('#edit_synonyms').attr('disabled','disabled');
		jQuery('#word_select').attr('disabled','disabled');
		jQuery('#word_synonyms').focus();

	}

	});
	
	//CANCEL BUTTON

	jQuery('#cancel_synonyms').click(function(){

		if(jQuery('#cancel_synonyms').attr('disabled')!='disabled'){
	
			//not disabled 
			jQuery('#delete_synonyms').removeAttr('disabled');
			jQuery('#edit_synonyms').removeAttr('disabled');
			jQuery('#word_select').removeAttr('disabled');  
			  
			jQuery('#word_synonyms').attr('disabled','disabled');
			jQuery('#save_synonyms').attr('disabled','disabled');
			jQuery('#cancel_synonyms').attr('disabled','disabled');
			  
			 
		
			jQuery('#word_select').focus();
	
		}

	});
	
	//DELETE BUTTON
	jQuery('#delete_synonyms').click(function(){
		 
				x="You pressed OK!";
				var selected= jQuery('#word_select').val();
				jQuery('option[value="'+ jQuery('#word_select').val() +'"]').css('background','red').fadeOut('slow',function(){jQuery(this).remove();});
				jQuery('#synonym_word').val('');
				jQuery('#word_synonyms').val('');

				jQuery.ajax({
					url : ajaxurl,
					type : 'POST',
					data : {paction:'custom_delete',action:'wp_auto_spinner_ajax',id:  selected , thesaurs:jQuery('#treasures').val()},
			
					success : function(data) {
						 
						
			
					},
			
					beforeSend : function() {
						
						
						
					}
				});
		  
		});
	
	//SAVE BUTTON
	jQuery('#save_synonyms').click(function(){
		
		//not disabled 
		jQuery('#delete_synonyms').removeAttr('disabled');
		jQuery('#edit_synonyms').removeAttr('disabled');
		jQuery('#word_select').removeAttr('disabled');  
		  
		jQuery('#word_synonyms').attr('disabled','disabled');
		jQuery('#save_synonyms').attr('disabled','disabled');
		jQuery('#cancel_synonyms').attr('disabled','disabled');
		
		//update array with new value 
		var newVal=jQuery('#word_synonyms').val();
		newVal_arr=newVal.split('\n');
		var newLine='';
		jQuery.each(newVal_arr,function(index,value){
		    if(jQuery.trim(value) != ''){
		        if(newLine == ''){
		            newLine=jQuery('#synonym_word').val() + '|' + value ;
		        }else{
		            newLine=newLine + '|' + value;
		        }
		    }
		});

		synonyms_arr[jQuery('#word_select').val()]=newLine;

		//update database with new values
		jQuery.ajax({
			url : ajaxurl,
			type : 'POST',
			data : { paction:'custom_edit',action:'wp_auto_spinner_ajax', id: jQuery('#word_select').val(), thesaurs:jQuery('#treasures').val(),value:newLine},
	
			success : function(data) {
				 
				//posting message 
	
			},
	
			beforeSend : function() {
				
				
				
			}
		});
		

		
		
	});
	
	
	
	
	
});