jQuery(document).ready(function(){
	
	//Reload page update log
	jQuery('#update_log').click(function(){
		
		 location.reload();
		 return false;
		
	});
	
	//TRIGER CRON
	jQuery('#wp_pinterest_automatic_trigger_cron').click(function() {
		jQuery.ajax({
			url : jQuery(this).attr('href'),
			type : 'POST',

 
            beforeSend:function(){
            	 
            	jQuery('.spinner').show();
            },
            
            success:function(data){
  
            	jQuery('.spinner').hide();
            	alert(data);
            	
            	location.reload();
             	
            }
            
           
		});

		return false;

	});
	
	
	//CLEAR LOG 
	jQuery('#clear_log').click(function(){
		
		if(!confirm('Clear all log records?')){
			return false;
		}  
 		
		jQuery('.spinner').show();
		jQuery.ajax({
            url: ajaxurl,
            type: 'POST',

            data: {
                action: 'wp_auto_spinner_log_clear',
                
            },
            
            success:function(){
            	jQuery('.spinner').hide();
            	location.reload();
       		 	return false;
            	
        		
            }
            
            
        });
		
		return false;
		
		
	});

	
	//CLEAR Queue 
	jQuery('#clear_queue').click(function(){
		
		if(!confirm('Clear all queue records?')){
			return false;
		}  
 		
		jQuery('.spinner').show();
		jQuery.ajax({
            url: ajaxurl,
            type: 'POST',

            data: {
                action: 'wp_auto_spinner_queue_clear',
                
            },
            
            success:function(){
            	jQuery('.spinner').hide();
            	location.reload();
       		 	return false;
            	
        		
            }
            
            
        });
		
		return false;
		
		
	});
	
});