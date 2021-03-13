jQuery(document).ready(function($) {
	$('body').on('click','.erase-all', function() {
		warning = $(this).attr('data-warning');
		if (confirm(warning)) {
			$.ajax({
				url: ajaxurl,
				type: 'POST',
				data: {
					action: 'hreflang_delete_all_data'
				},
				dataType: "json",
				success: function(response) {
					console.log(response);
					alert(response.message);
				}
			});
		}
	});
	$('body').on('click','.add-new-hreflang-tag',function() {
		$('#validate-hreflang').hide();
		var $div = $('div[id^="hreflang-"]:last');
		var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) +1;
		var $klon = $div.clone(true).prop('id', 'hreflang-'+num ).appendTo('.href-container');
		$('#hreflang-'+(num-1)+' button').remove();
	});
	$('body').on('click','.remove-new-hreflang-tag',function() {
		$('#validate-hreflang').hide();
		var $div = $('div[id^="hreflang-"]:last');
		var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) -1;
		var $klon = $div.remove();
		$('<button class="add-new-hreflang-tag"><span class="dashicons dashicons-plus"></span></button> <button class="remove-new-hreflang-tag"><span class="dashicons dashicons-minus"></span></button>').clone(true).appendTo('#hreflang-'+num);
	});
	$('body').on('click','.add-new-cat-hreflang-tag',function() {
		var $div = $('div[id^="hreflang-cat-"]:last');
		var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) +1;
		var $klon = $div.clone(true).prop('id', 'hreflang-cat-'+num ).appendTo('.href-container-cat');
		$('#hreflang-'+(num-1)+' button').remove();
	});
	$('body').on('click','.remove-new-cat-hreflang-tag',function() {
		var $div = $('div[id^="hreflang-cat-"]:last');
		var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) -1;
		var $klon = $div.remove();
		$('<button class="add-new-cat-hreflang-tag"><span class="dashicons dashicons-plus"></span></button> <button class="remove-new-cat-hreflang-tag"><span class="dashicons dashicons-minus"></span></button>').clone(true).appendTo('#hreflang-cat-'+num);
	});
	$('body').on('click','.add-new-cat-edit-hreflang-tag',function() {
		var $div = $('div[id^="hreflang-cat-edit-"]:last');
		var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) +1;
		var $klon = $div.clone(true).prop('id', 'hreflang-cat-edit-'+num ).appendTo('.term-hreflang-data');
		$('#hreflang-cat-edit-'+(num-1)+' button').remove();
	});
	$('body').on('click','.remove-new-cat-edit-hreflang-tag',function() {
		var $div = $('div[id^="hreflang-cat-edit-"]:last');
		var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) -1;
		var $klon = $div.remove();
		$('<button class="add-new-cat-edit-hreflang-tag"><span class="dashicons dashicons-plus"></span></button> <button class="remove-new-cat-edit-hreflang-tag"><span class="dashicons dashicons-minus"></span></button>').clone(true).appendTo('#hreflang-cat-edit-'+num);
	});
})
