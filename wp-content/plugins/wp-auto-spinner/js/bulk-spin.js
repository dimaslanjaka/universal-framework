jQuery(document).ready(function(){
	//ADD OPTION
	jQuery('select[name="action"]').append('<option value="wp_automatic_spin">Spin them</option>');
	jQuery('select[name="action"]').append('<option value="wp_automatic_unspin">Un-spin them</option>');
	 
	
	
	//CLICH PIN
	jQuery('#doaction,#doaction2').click(function(){
	    if(jQuery('select[name="action"]').val() == 'wp_automatic_spin' || jQuery('select[name="action"]').val() == 'wp_automatic_unspin'  ){
	        
	    	var itms='';
	    	var itms_count=0;

	    	jQuery('input[name="post[]"]:checked').each(
	    	    function(index,itm){
	    	        console.log(jQuery(itm).val());
	    	        itms=itms + ',' + jQuery(itm).val();
	    	        itms_count++;    
	    	    }
	    	    
	    	    
	    	);


	    	//add the spinner
	    	if(jQuery('.spinner-bulk-action').length == 0){
	    		jQuery(this).after('<span class="spinner spinner-bulk-action">');
	    	}
	    	
	    	//show the spinner
	    	jQuery('.spinner-bulk-action').show();
	    	
	    	if(jQuery('select[name="action"]').val() == 'wp_automatic_spin'){
	    	
		    	jQuery.ajax({
		            url: ajaxurl,
		            type: 'POST',
	
		            data: {
		                action: 'wp_auto_spinner_spin',
		                itms: itms
		            },
		    	
		    	    success : function(data){
		            	
		            	jQuery('.spinner-bulk-action').remove();
		            	alert(itms_count + ' items sent to the spin queue' );
		            	jQuery('input[name="post[]"]:checked').removeAttr('checked');
		            	
		    	    }
		           
		    		
		        });
	
		    		
		    
		    	

	    	}else{
	    		
	    		jQuery.ajax({
		            url: ajaxurl,
		            type: 'POST',
	
		            data: {
		                action: 'wp_auto_spinner_unspin',
		                itms: itms
		            }	        
		        });
	
		    		
		    	alert(itms_count + ' posts will be restored' );
		    	jQuery('input[name="post[]"]:checked').removeAttr('checked');
    		
	    		
	    		
	    	}
	    		
	    	
	    	 jQuery('select[name="action"]').val('-1');
	        return false;  
	    }
	});
 
});