<?php

// Globals
global $post;
global $wpdb;
global $camp_general;
global $post_id;
global $camp_options;
global $post_types;

global $camp_post_category;

?>

<div class="TTWForm-container" dir="ltr">
	<div class="TTWForm">
		<div class="panes">
		
		   <div id="field1zz-container" class="field f_100">
               <div class="option clearfix">
                    <input  name="camp_options[]" id="field2-1" value="OPT_STRIP" type="checkbox">
                    <span class="option-title">
							Strip original links from the post (hyperlinks) 
                    </span>
                    <br>
                    
                     
                    
               </div>
		 </div>
			
		<div class="field f_100">
               <div class="option clearfix">
                    <input name="camp_options[]"  value="OPT_LINK_SOURSE" type="checkbox">
                    <span class="option-title">
							Make permalinks link directly to the source (Posts will not load at your site)  
                    </span>
                    <br>
               </div>
		 </div>
		 
		 <div class="field f_100">
               <div class="option clearfix">
                    <input name="camp_options[]"  value="OPT_LINK_CANONICAL" type="checkbox">
                    <span class="option-title">
							Add <a href="http://moz.com/learn/seo/canonicalization">Canonical Tag</a> with the original post link to the post for SEO      
                    </span>
                    <br>
               </div>
		 </div>
		 

		 
		 <div class="field f_100">
               <div class="option clearfix">
                    <input name="camp_options[]"  value="OPT_LINK_ONCE" type="checkbox">
                    <span class="option-title">
							Never post the same link again <br>( by default if it was completely deleted it may get posted again)      
                    </span>
                    <br>
               </div>
		 </div>
		 
		 
		 <div class="field f_100">
               <div class="option clearfix">
                    <input name="camp_options[]"  value="OPT_NO_COMMENT_LINK" type="checkbox">
                    <span class="option-title">
							Don't add links for author at comments <br>(only applicable if the campaign supports comments and posting comments is active)      
                    </span>
                    <br>
               </div>
		 </div>
			
		
	 
		
		<div class="clear"></div>
	</div>
</div>
</div>
