<?php
/**
 * This file is html of every modal box
 */
?>
<div id="updraftcentral_modal_dialog" class="modal" tabindex="-1" role="dialog">
	<!-- The purpose of this extra div is to allow us to set up and remove event listeners at will, without needing to bother about accidentally removing ones from Bootstrap or jQuery on the modal itself. Listen to events on this next ID, not on the previous. -->
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">UpdraftCentral</h4>
			</div>
			<div class="modal-body" id="updraftcentral_modal">
				<!-- Content will be inserted here -->
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal"><?php _e('Close', 'updraftcentral');?></button>
				<button type="button" class="btn btn-primary updraft_modal_button_goahead">Go</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
