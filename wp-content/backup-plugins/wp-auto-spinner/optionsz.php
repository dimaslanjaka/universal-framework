<?php function wp_auto_spinner_settings(){ ?>

<?php 

// update options on post
if(isset($_POST['submit'])){

	if(!isset($_POST['wp_auto_spin'])){
		update_option('wp_auto_spin',array());
	}else{
		update_option('wp_autof_spin',$_POST['wp_auto_spin']);
	}
	
	if(!isset($_POST['post_category'])){
		update_option('wp_auto_spin_execl',array());
	}else{
		update_option('wp_auto_spin_execl',$_POST['post_category']);
	}
	
	update_option('wp_auto_spinner_lang',$_POST['wp_auto_spinner_lang']);
	update_option('wp_auto_spinner_execlude',$_POST['wp_auto_spinner_execlude']);
	
	
	echo '<div class="updated" style="width:252px;margin:20px 0 10px 0px ; " id="message"><p>Options updated successfully </p></div>';
	
}

//data
$wp_auto_spinner_lang=get_option('wp_auto_spinner_lang','en');
$wp_auto_spinner_execlude = get_option('wp_auto_spinner_execlude','');

?>

<div class="error">
    					<p><?php echo '<strong>Important Notice :</strong> Automatically spinned posts get spinned when <strong>viewed from the front end </strong>. i.e the spinned post first visitor (including bots) is the one who trigger the spinning action .'; ?></p>
</div> 


<div class="wrap">
    <div style="margin-left:8px" class="icon32" id="icon-options-general">
        <br>
    </div>
    <h2>Wordpress Auto Spinner Settings</h2>
    <!--before  container-->
    <div class="metabox-holder" id="dashboard-widgets">
        <div style="width:49%;" class="postbox-container">
            <div style="min-height:1px;" class="meta-box-sortables ui-sortable" id="normal-sortables">
                <div class="postbox" id="dashboard_right_now">
                    <h3 class="hndle">
                        <span>Basic settings</span>
                    </h3>
                    <div class="inside" style="padding-bottom:20px">
                        <!--/ before container-->
                        
                        	<div class="TTWForm-container-auto-spin">
                        	      <form method="POST" class="TTWForm-auto-spin">
                        	      	
                        	      	<div id="field-wp_auto_spin_active-container" class="field f_100" >
                        	      	     <div style="margin-bottom:10px" class="option clearfix">
                        	      	         <input     name="wp_auto_spin[]" id="field-wp_auto_spin_active-1" value="OPT_AUTO_SPIN_ACTIVE" type="checkbox">     
                        	      	          <span class="option-title">
                        	      	 			 Activate automatic spin for posts
                        	      	          </span>
                        	      	     </div>
                        	      	     
                        	      	      <div  style="margin-bottom:10px" class="option clearfix">
                        	      	         <input     name="wp_auto_spin[]" id="field-wp_auto_spin_active-1" value="OPT_AUTO_SPIN_ACTIVE_TTL" type="checkbox">     
                        	      	          <span class="option-title">
                        	      	 			 When automatically spinning an article spin post title also .
                        	      	          </span>
                        	      	     </div>

                        	      	     <div style="margin-bottom:10px" class="option clearfix">
                        	      	         <input     name="wp_auto_spin[]" id="field-wp_auto_spin_active-1" value="OPT_AUTO_SPIN_SLUG" type="checkbox">     
                        	      	          <span class="option-title">
                        	      	 			 Spin the post slug ? (permalink)
                        	      	          </span>
                        	      	     </div>                         	      	     

 
                        	      	     
                        	      	     <div class="option clearfix">
                        	      	         <input     name="wp_auto_spin[]" id="field-wp_auto_spin_active-1" value="OPT_AUTO_SPIN_ACTIVE_MANUAL" type="checkbox">     
                        	      	          <span class="option-title">
                        	      	 			 Also automatically spin articles I manually write <p>
                        	      	 			 <i>(this will spin posts you are writing manually so when you write and preview post it will get spinned instantly)(not recommended)</i>   .</p>
                        	      	          </span>
                        	      	     </div>
                        	      	     

                        	      	     
                        	      	</div>
                        	      	
                        	      	
                        	      	<div id="field-wp_auto_spinner_lang-container" class="field f_100" >
										<label for="field-wp_auto_spinner_lang">
											Treasures Language :
										</label>
										<select name="wp_auto_spinner_lang" id="field1zz">
											<option  value="en"  <?php opt_selected('en',$wp_auto_spinner_lang) ?> >English</option> 
											<option  value="du"  <?php opt_selected('du',$wp_auto_spinner_lang) ?> >Dutch</option>
											<option  value="ge"  <?php opt_selected('ge',$wp_auto_spinner_lang) ?> >German</option>
											<option  value="fr"  <?php opt_selected('fr',$wp_auto_spinner_lang) ?> >French</option>
											<option  value="sp"  <?php opt_selected('sp',$wp_auto_spinner_lang) ?> >Spanish</option>
											<option  value="po"  <?php opt_selected('po',$wp_auto_spinner_lang) ?> >Portuguese</option>
											<option  value="ro"  <?php opt_selected('ro',$wp_auto_spinner_lang) ?> >Romanian</option>
				 					
										
										</select>
									</div>
                        	      	
 
                        	      	<div id="form-submit" class="field f_100   submit">
                        	      	    <input name="submit" value="Save Options" type="submit">
                        	      	</div>
                        	      	
                        	      	
                        	      	 
                        	      </div><!--/TTWForm-->
                        	</div><!--/TTWForm-contain-->
                        
                        <!--after container-->
                        <div style="clear:both"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- / start container-->
 
 <div class="clear"></div>
     <!--before  container-->
    <div class="metabox-holder" id="dashboard-widgets">
        <div style="width:49%;" class="postbox-container">
            <div style="min-height:1px;" class="meta-box-sortables ui-sortable" id="normal-sortables">
                 	
                        	      	<div id="categorydiv" class="postbox " style="margin-top:20px">
										<div class="handlediv" title="Click to toggle"><br></div><h3 class="hndle"><span>Exclude these categories from auto spinning</span></h3>
										<div class="inside">
											<div id="taxonomy-category" class="categorydiv">	 
												<div id="category-all" class="tabs-panel">
													<input type="hidden" name="post_category[]" value="0">			<ul id="categorychecklist" data-wp-lists="list:category" class="categorychecklist form-no-clear">								
														<?php wp_category_checklist(); ?>
													</ul>
												</div>
														
											</div>
											
											
											
										</div>
									 </div>
									 
									 
									 
                </div>
            </div>
        </div>
   
    <!-- / start container-->
  <div class="clear"></div>

     <!--before  container-->
    <div class="metabox-holder" id="dashboard-widgets">
        <div style="width:49%;" class="postbox-container">
            <div style="min-height:1px;" class="meta-box-sortables ui-sortable" id="normal-sortables">
                 	
                        	      	<div id="categorydiv" class="postbox " style="margin-top:20px">
									<div class="handlediv" title="Click to toggle"><br></div><h3 class="hndle"><span>Reserved words </span></h3>
									<div class="inside">
										<div id="taxonomy-category" class="categorydiv">
											
									
											<div id="field-wp_auto_spinner_execlude-container" class="field f_100" >
			                        	    	<label for="field-wp_auto_spinner_execlude">
			                        	    		Exclude these words from being spinned (one per line)
			                        	    	</label>
			                        	    	<br><textarea  rows="5" cols="20" name="wp_auto_spinner_execlude" id="field-wp_auto_spinner_execlude"><?php echo $wp_auto_spinner_execlude ?></textarea>
			                        	    </div> 
									 
										</div>
									</div>
									</div>
                </div>
            </div>
        </div>
   
    <!-- / start container-->
  <div class="clear"></div>  
                         	    
  



<?php } ?>