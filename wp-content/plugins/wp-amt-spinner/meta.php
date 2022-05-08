<?php function wp_auto_spinner_metabox(){  ?>
  <?php $post_id=  get_the_ID(); ?> 
<div class="post_rewrite">
	<input name="wp_spinner_rewrite_source" id="wp_spinner_rewrite_source" type="hidden" value="<?php echo site_url('/?wp_auto_spinner=ajax&action=identifysyn'); ?>">
	<a id="wp-auto-spinner-post-rewrite" title="Rewrite the post " class="button  button-primary button-large" href="#"> Rewrite the post</a>
	<img id="wp-autospin-ajax-loading1" class="ajax-loading" src=" <?php echo site_url(); ?>/wp-admin/images/wpspin_light.gif">
</div>

<?php 
	if( trim( get_post_meta($post_id, 'spinned_cnt' , 1) ) !='' ){
		$display='';
	}else{
		$display='display:none';
	}
?>

<div class="categorydiv wp-auto-spinner-meta"  id="taxonomy-category-2"    style="<?php echo $display ?>">
	
	<ul class="category-tabs" id="category-tabs">
		<li id="wp-auto-spin-rewritten-head" class="tab_head tabs"> Rewritten Article </li>
		<li class="tab_head hide-if-no-js"> Synonyms </li>
		<li class="tab_head hide-if-no-js">Original Article</li>
	</ul>

	<div class="tabs-panel visible-overflow"   style="display: block;">
		
		<p><i>The rewritten instance of the original article</i></p>
		
		<div class="wp_signdev_form">
		
			<div id="field-wp-auto-spin-rewritten-title-container" class="field f_100">
				<label for="field-wp-auto-spin-rewritten-title">
				    Rewritten title :
				</label>
				<input value="<?php echo   get_post_meta($post_id, 'spintaxed_ttl' , 1)   ?>" name="wp-auto-spin-rewritten-title" id="field-wp-auto-spin-rewritten-title"  type="text">
			</div>
			
			<div id="field-wp-auto-spin-rewritten-post-container" class="field f_100" >
				<label for="field-wp-auto-spin-rewritten-post">
					Rewritten post content:
				</label>
				
				<?php 
					
				$args = array(
						
						'editor_height' => '400' ,
						'textarea_rows' => 15,
						'teeny' => true,
						'quicktags' => false,
						'media_buttons' => false,
						'tinymce'=>array('force_br_newlines' => false,
								'force_p_newlines' => false,
								'forced_root_block' => '',
								'extended_valid_elements' => "span[id|class|title|style|synonyms]", 
								'setup' =>"function (ed) {


ed.on('undo', function(e) {
            console.log('undo event', e);
			updateMenu();
        });

ed.on('redo', function(e) {
            console.log('undo event', e);
			updateMenu();
        });

														    ed.onLoadContent.add(function(ed, o) {
														          // Output the element name
																	jQuery(\"#spinner-editor_ifr\").parent().append('<ul style=\"display:none;position: absolute;\" id=\"spinner_dev\"><li>test</li><li>test</li></ul>');


var mouseX;
var mouseY;
jQuery(jQuery(\"#spinner-editor_ifr\").contents()[0], window).bind(\"mousemove\", function(e) {
	mouseX = e.pageX; 
	mouseY = e.pageY;
});

var currentSynonym ;
  
jQuery(\"#spinner-editor_ifr\").contents().find('.synonym').mouseover(function(){

currentSynonym=this;

//empty list
jQuery('#spinner_dev   li').remove();

 var synonyms= jQuery(this).attr('synonyms')    ;
  synonyms_arr=synonyms.split('|') ;
  jQuery.each(synonyms_arr, function (index, value) {
        if (value != '') {
		jQuery('#spinner_dev').append('<li>' + value + '</li>');            
        }
    });

jQuery('#spinner_dev').hide();

setTimeout(function(){
  jQuery('#spinner_dev').css({'top':mouseY - 13 +45 - jQuery(\"#spinner-editor_ifr\").contents().scrollTop(),'left':mouseX -5}).fadeIn('slow');
	  }, 500); 

 jQuery('#spinner_dev').focus();
  
  jQuery('#spinner_dev li').click(function(){
    
    jQuery(currentSynonym).html(jQuery(this).html());
    tinymce.triggerSave();
	jQuery('#spinner_dev').hide();
  });
 
});

jQuery('#spinner_dev').mouseleave(function(){
  jQuery('#spinner_dev').hide();
});


jQuery('#spinner_dev   li').click(function(event){
    console.log(jQuery(this).html());
     event.stopImmediatePropagation();
    return false;
});
								
														           
														      });
																						
														}"  
								)
				);
				
				wp_editor(  get_post_meta($post_id, 'spintaxed_cnt2' , 1)  , 'spinner-editor', $args );
				 
				
				?>
			</div>
			
			<input type="hidden" value="yes" name="wp_auto_spinner_manual_flag" />
			
			
			
			<div id="form-submit" class="field f_100   " style="padding:20px 0">
			    <a id="wp-auto-spinner-stoeditor" title="Send to editor " class="button  " href="#"> Send to the editor</a>
			    <a  id="wordpress-auto-spinner-regenerate-re"  title="regenerate " class="button"  href="<?php echo site_url('/?wp_auto_spinner=ajax&action=rewrite'); ?>"> Generate a new post</a>
			    <img id="wp-autospin-ajax-loading3" class="ajax-loading" src=" <?php echo site_url(); ?>/wp-admin/images/wpspin_light.gif">
			</div>
		
		</div>
		
		<div class="clear"></div>
		
	</div>
	
	<div class="tabs-panel  visible-overflow"   style="display: none;">
		<p><i>The content in spintax form</i></p>
		
		<div class="wp_signdev_form">
		
			<div id="field-wp-auto-spin-rewritten-title-container" class="field f_100">
				<label for="field-wp-auto-spin-rewritten-title">
				    Title :
				</label>
				<input value="<?php echo  get_post_meta($post_id, 'spinned_ttl' , 1)  ?>" name="wp-auto-spin-rewritten-titlesyn" id="field-wp-auto-spin-rewritten-titlesyn"  type="text">
			</div>
			
			<div id="field-wp-auto-spin-rewritten-post-container" class="field f_100" >
				<label for="field-wp-auto-spin-rewritten-post">
					post :
				</label>
				<textarea  rows="5" cols="20" name="wp-auto-spin-rewritten-postsyn" id="field-wp-auto-spin-rewritten-postsyn"><?php echo htmlentities( get_post_meta($post_id, 'spinned_cnt' , 1) ) ?></textarea>
			</div>
			
			<div id="form-submit" class="field f_100   " style="padding:20px 0"> 
			    <a  id="wordpress-auto-spinner-regenerate"   title="Rewrite the post " class="button  " href="<?php echo site_url('/?wp_auto_spinner=ajax&action=rewrite'); ?>"> Generate a new post from the above synonyms </a>
			    <img id="wp-autospin-ajax-loading2" class="ajax-loading" src=" <?php echo site_url(); ?>/wp-admin/images/wpspin_light.gif">
			</div>
		
		</div>
		<div class="clear"></div>
		
		
	</div>
	
	<div id="category-pop" class="tabs-panel  visible-overflow" style="display: none;">
		<p><i>Original article content before rewriting it</i></p>
		
		<div class="wp_signdev_form">
		
			<div id="field-wp-auto-spin-rewritten-title-container" class="field f_100">
				<label for="field-wp-auto-spin-rewritten-title">
				    Original Title :
				</label>
				<input value="<?php echo  get_post_meta($post_id, 'original_ttl' , 1)  ?>" name="wp-auto-spin-rewritten-titleori" id="field-wp-auto-spin-rewritten-titleori"  type="text">
			</div>
			
			<div id="field-wp-auto-spin-rewritten-post-container" class="field f_100" >
				<label for="field-wp-auto-spin-rewritten-post">
					Original content :
				</label>
				<textarea  rows="5" cols="20" name="wp-auto-spin-rewritten-postori" id="field-wp-auto-spin-rewritten-postori"><?php echo htmlentities(  get_post_meta($post_id, 'original_cnt' , 1) )  ?></textarea>
			</div>
			
			<div id="form-submit" class="field f_100   " style="padding:20px 0">
			    <a id="wp-auto-spin-restore" title="Rewrite the post " class="button  " href="#"> Restore the original post </a>
			
			    
			</div>
		
		</div>
		<div class="clear"></div>
		
	
	</div>

</div>

<?php 
	 	
	 	$autospin = get_option ( 'wp_auto_spin', array () );
	 	
	 	$spinTitle = 'false';
	 	if(in_array('OPT_AUTO_SPIN_ACTIVE_TTL', $autospin)){
	 		$spinTitle = 'true';
	 	}
	 
?>

<script type="text/javascript">
	var spinTitle = <?php echo $spinTitle ?> ;
</script>

<?php }?>