<?php function wp_auto_spinner_synonyms(){?>

<?php 
 
		//INI
		$wp_auto_spinner_lang=get_option('wp_auto_spinner_lang','en');
	
		$file=file(dirname(__FILE__)  .'/inc/treasures_'.$wp_auto_spinner_lang.'.dat');
		
		$deleted=get_option('wp_auto_spinner_deleted_'.$wp_auto_spinner_lang,array());
		$modified=get_option('wp_auto_spinner_modified_'.$wp_auto_spinner_lang,array());
		
?>


<div class="wrap">
    
    <div style="margin-left:8px" class="icon32 icon32-posts-page" id="icon-edit-pages">
        <br>
    </div>
    
    <h2>WordPress Auto Spinner Synonyms</h2>


    <div id="synonyms_choice">
	    <label for="field-treasures">
	    	Thesaurus :
	    </label>
	    <select  disabled="disabled" name="treasures" id="treasures">
	    		<option  value="en"  <?php opt_selected('en',$wp_auto_spinner_lang) ?> >English</option> 
				<option  value="du"  <?php opt_selected('du',$wp_auto_spinner_lang) ?> >Dutch</option>
				<option  value="ge"  <?php opt_selected('ge',$wp_auto_spinner_lang) ?> >German</option>
				<option  value="fr"  <?php opt_selected('fr',$wp_auto_spinner_lang) ?> >French</option>
				<option  value="it"  <?php opt_selected('it',$wp_auto_spinner_lang) ?> >Italian</option>
				<option  value="sp"  <?php opt_selected('sp',$wp_auto_spinner_lang) ?> >Spanish</option>
				<option  value="po"  <?php opt_selected('po',$wp_auto_spinner_lang) ?> >Portuguese</option>
				<option  value="ro"  <?php opt_selected('ro',$wp_auto_spinner_lang) ?> >Romanian</option> 
				<option  value="tr"  <?php opt_selected('tr',$wp_auto_spinner_lang) ?> >Turkish</option>
	    </select>
    </div>
    

    <div id="dashboard-widgets-wrap">

    <div class="metabox-holder columns-2" id="dashboard-widgets">
        <div class="postbox-container" id="postbox-container-1">
            <div class="meta-box-sortables ui-sortable" id="normal-sortables">
                <div class="postbox">
                    <h2 class="hndle"><span>Thesaurus synonyms</span></h2>
                    <div class="inside">
                        <!--  insider start -->
 
                        <div id="synonyms_wraper">
                            <div id="synonyms">
                                <p>All words</p>
                                <select name="sometext" size="30" id="word_select">
                               
                                </select>

                            </div>

                            <div id="synonyms_words">
                                <p>Current word</p>
                                <input  disabled="disabled"  type="text" id="synonym_word" />
                                <p>Word synonyms</p>
                                <textarea style="width:100%" disabled="disabled" rows="10" cols="20" name="name" id="word_synonyms"></textarea>
                                <p>
                                    
                                    <input name="wp_spinner_rewrite_source" id="wp_spinner_rewrite_source" type="hidden" value="<?php echo site_url('/?wp_auto_spinner=ajax'); ?>">
                                    
                                    <button  id="edit_synonyms" title="Edit Synonym">
                                        <img src="<?php echo plugins_url('images/edit.png',__FILE__) ?> " /><br>Edit
                                    </button>
                                    
                                    <button  id="save_synonyms"  disabled="disabled"  title="Save Synonym">
                                        <img src="<?php echo plugins_url('images/save.png',__FILE__) ?> " /><br>Save
                                    </button>
                                    
                                    <button  id="cancel_synonyms"  disabled="disabled"  title="Cancel">
                                        <img src="<?php echo plugins_url('images/delete.png',__FILE__) ?> " /><br>Cancel
                                    </button>
                                    
                                    <button  id="delete_synonyms"   title="Delete Synonym">
                                        <img src="<?php echo plugins_url('images/trash.png',__FILE__) ?> " /><br>Trash
                                    </button>
                                    
                                    
                                </p>
                            </div>
                            <!-- synonyms words -->

                            <div class="clear"></div>

                        </div>
                        <!--synonyms wraper-->

                        <!-- /insider 3 -->
                    </div>
                </div>

            </div>
        </div>


    </div>


</div>
</div>
<!-- wrap -->

<script type="text/javascript">
	var synonyms_arr = <?php echo json_encode($file)?>;
	var synonyms_deleted= <?php echo json_encode($deleted)?>;
	var synonyms_modified=<?php echo json_encode($modified)?>;

		jQuery.each(synonyms_modified, function( index, value ) {

		  synonyms_arr[index]=value;

	    });
	
	   jQuery.each(synonyms_arr, function( index, value ) {

		   if(jQuery.inArray( index.toString()   ,synonyms_deleted ) == -1){
			   jQuery('#word_select').append( '<option value="'+ index +'" >'+ value.split('|')[0] +'</option>') ;
			}
 
	    });

	   jQuery('#word_synonyms').focus();
		
	
</script>

<?php }//end function ?>