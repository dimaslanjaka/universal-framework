(function() {
	tinymce.create('tinymce.plugins.ktzShortcodes', {
		init : function(ed, url) {
			ed.addButton('ktz_shortcodes', {
				title : 'Insert Shortcode',
				image : url + '/img/add.png',
				onclick : function() {
						var width = jQuery(window).width(), H = jQuery(window).height(), W = ( 720 < width ) ? 720 : width;
						W = W - 80;
						H = H - 115;
					tb_show('Shortcodes List', url + '/tinymce.php?&width=' + W + '&height=' + H + '');
				}
			});
		},
		createControl : function(n, cm) {
			return null;
		},
		getInfo : function() {
			return {
				longname : "Kentooz shortcodes",
				author : 'Gian MR',
				authorurl : 'http://kentooz.com/',
				infourl : 'http://wiki.moxiecode.com/',
				version : "1.0"
			};
		}
	});
	tinymce.PluginManager.add('ktz_shortcodes', tinymce.plugins.ktzShortcodes);
})();