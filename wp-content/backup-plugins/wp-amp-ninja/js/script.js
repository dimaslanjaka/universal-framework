jQuery(document).ready(function($){
	var mediaUploader_logo;
	$('#upload-button').click(function(e) {
		e.preventDefault();
		// If the uploader object has already been created, reopen the dialog
		  if (mediaUploader_logo) {
		  mediaUploader_logo.open();
		  return;
		}
		// Extend the wp.media object
		mediaUploader_logo = wp.media.frames.file_frame = wp.media({
		  title: 'Choose Image',
		  button: {
		  text: 'Choose Image'
		}, multiple: false });
	
		// When a file is selected, grab the URL and set it as the text field's value
		mediaUploader_logo.on('select', function() {
		  attachment = mediaUploader_logo.state().get('selection').first().toJSON();
		  $('#amplogo').val(attachment.url);
		  $('#logoid').val(attachment.id);
		  $('.showlogo #mainsrc').attr('src', attachment.url);
		});
		// Open the uploader dialog
		mediaUploader_logo.open();
	});

	var mediaUploader_favicon;
	$('#upload-icon').click(function(e) {
		e.preventDefault();
		// If the uploader object has already been created, reopen the dialog
		  if (mediaUploader_favicon) {
		  mediaUploader_favicon.open();
		  return;
		}
		// Extend the wp.media object
		mediaUploader_favicon = wp.media.frames.file_frame = wp.media({
		  title: 'Choose Image',
		  button: {
		  text: 'Choose Image'
		}, multiple: false });
	
		// When a file is selected, grab the URL and set it as the text field's value
		mediaUploader_favicon.on('select', function() {
		  attachment = mediaUploader_favicon.state().get('selection').first().toJSON();
		  $('#ampfavicon').val(attachment.url);
		  $('#faviconid').val(attachment.id);
		  $('.showicon #mainsrc').attr('src', attachment.url);
		});
		mediaUploader_favicon.open();
	});
	
	$("#removeimage").click(function(){
		$('#amplogo').val('');
		$('#logoid').val('');
		$('.showlogo').html('');
	});
	
	$("#removeicon").click(function(){
		$('#ampfavicon').val('');
		$('#faviconid').val('');
		$('.showicon').html('');
	});
	
	$(".nav-tab-wrapper .nav-tab").click(function(){
		$( ".nav-tab-wrapper .nav-tab" ).each(function() {
			$(this).removeClass('nav-tab-active');
		});
		$(this).addClass('nav-tab-active');
		$( ".tab-content .tab" ).each(function() {
			$(this).removeClass('active');
		});
		$(".tab-content #"+$(this).attr('id')).addClass('active');
	});
	
	$("#hide_notification").click(function(){
		$("#wpamp_notification").addClass('overlay');
		var data = {
			'action': 'hide_wpamp_notification'
		};
		jQuery.post('admin-ajax.php', data, function(response) {
			$("#wpamp_notification").hide();
		});
	});
});
