<?php

// Globals
global $post;
global $wpdb;
global $camp_general;
global $post_id;
global $camp_options;
global $post_types;

global $camp_post_title;
global  $camp_post_content;

?>

<div class="TTWForm-container" dir="ltr">
	<div class="TTWForm">
		<div class="panes">
		
		
		  <div id="field6-container" class="field f_100">
               <label for="field6">
                    Post title template
               </label>
               <input value="<?php   echo htmlentities($camp_post_title)  ?>" name="camp_post_title" id="field6" required="required" type="text">
            </div>

          <div id="field11-container" class="field f_100">
               <label for="field11">
                    Post text template <i>(spintax enabaled, like {awesome|amazing|Great})</i>
               </label>
               <textarea  required="required" rows="5" cols="20" name="camp_post_content" id="field11"><?php   echo $camp_post_content ?></textarea>
               <div class="supportedTags"></div>
          </div>
		
	 
		
		<div class="clear"></div>
	</div>
</div>
</div>
