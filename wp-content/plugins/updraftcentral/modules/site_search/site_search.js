jQuery(function() {
	UpdraftCentral_Site_Search = UpdraftCentral_Site_Search();
});

/**
 * * An object for managing site search by site name or url
 * * @constructor
 **/
var UpdraftCentral_Site_Search = function () {
	var self = this;
	var $ = jQuery;

	$('#updraftcentral_dashboard_existingsites').on('updraftcentral_dashboard_mode_set', function(event, data) {
		var filter_text = $('#udc_search_tag').val();
		if (filter_text != '') {
			self.searching_sites(filter_text);
		} else {
			self.clear_filters();
		}
	});
	
	// Adding the behavior to the key up event to the searching input
	$('.udc_search_tag').on('keyup',function(e) {
		var filter_text = $(this).val();
		if (filter_text != '') {
			self.searching_sites(filter_text);
		} else {
			self.clear_filters();
		}
	});
	
	/**
	 * Clearing the sites filters by showing all the sites
	 *
	 * @return {void}
	 */
	this.clear_filters = function () {
		var mode = UpdraftCentral.get_dashboard_mode();
		var sites_row = ('sites' !== mode) ? $('.updraftcentral_site_row:not(.suspended)') : $('.updraftcentral_site_row');
		var sites_border = $('.updraftcentral_row_divider');
		$('#updraftcentral-search-info').html('');
		sites_row.show();
		sites_border.show();
	}
	
	/**
	 * Find a match within the source content for the given keyword
	 *
	 * @param {string}  filter_text The text to search for
	 * @param {array}   sites_row   A jquery list of site rows
	 * @param {string}  source      A jquery class selector that will serve as content source for the matching process
	 * @param {boolean} exist       Default found state
	 *
	 * @return {void}
	 */
	this.find_keyword_match = function(filter_text, sites_row, source, exist) {
		filter_text = filter_text.trim();
		if ('' !== filter_text && 'undefined' !== typeof sites_row && '' !== source) {
			var filter_text_upper_case = (-1 !== filter_text.indexOf(',')) ? filter_text.toUpperCase().split(',') : filter_text.toUpperCase();
	
			if ('undefined' === typeof exist) exist = false;
			sites_row.find(source).filter(function() {
				var content = $(this).text().trim().toUpperCase();
				if (Array.isArray(filter_text_upper_case)) {
					var found = [];
					$.map(filter_text_upper_case, function(value) {
						value = value.trim();
					  	if (value && -1 !== content.indexOf(value)) found.push(value);
					  	return value;
					});
					return found.length ? true : false;
				}
				return (-1 !== content.indexOf(filter_text_upper_case));
			}).closest('.updraftcentral_site_row').each(function() {
				$(this).show().next('.updraftcentral_row_divider').show();
				exist = true;
			});
	
			$('#updraftcentral-search-info').html(!exist ? udclion.site_search.no_sites_found : '');
			if (!exist && !$('#updraftcentral-search-area').is(':visible') && 'sites' !== UpdraftCentral.get_dashboard_mode()) {
				self.clear_filters();
			}
		}
	}
	
	/**
	 * Filtering the sites by description or title
	 *
	 * @param  {string} filter_text - the text to search in the site data
	 *
	 * @return {void}
	 */
	this.searching_sites = function(filter_text) {
		var mode = UpdraftCentral.get_dashboard_mode();
		var sites_row = ('sites' !== mode && 'undefined' !== typeof udclion.tags) ? $('.updraftcentral_site_row:not(.suspended)') : $('.updraftcentral_site_row');
		var sites_border = $('.updraftcentral_row_divider');
		var exist = false;
		
		// Initially we'll hide everything and let the search process do
		// the displaying of site rows if we found a match.
		sites_row.hide();
		sites_border.hide();

		// Let's try searching the site labels by default (title, description and url). If we don't find
		// one then we're going to proceed searching the tags. Tags search follows this one (which is registered
		// with the "keyup" event as well) and only available in the premium version. If premium isn't available
		// then the whole search process stops here.
		self.find_keyword_match(filter_text, sites_row, '.updraftcentral_row_sitelabel', exist);
	}
	
	return this;
};
