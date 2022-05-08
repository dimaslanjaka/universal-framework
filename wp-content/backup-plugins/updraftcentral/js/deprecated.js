(function($) {

	// This is to safeguard from future jQuery releases that eventually removes these functions and properties, thus,
	// making the entire UpdraftCentral or most of its features inoperable. Also, since we don't have the liberty
	// to edit and publish third party libraries that we used in UpdraftCentral this code block/plugin will be of
	// great help to ensure that UpdraftCentral will continue to work if these deprecated functions and properties
	// are removed in future jQuery releases.

	// We can't extend this property dynamically, so we'll have to manually define it with the alternative value for it.
	Object.defineProperty($.expr, ":", {
		enumerable: true,
		value: $.expr.pseudos,
	});

	// Overriding jQuery's functions/properties with the latest suggested alternatives.
	// Properties: $.fn() or jQuery.fn()
	$.extend({
		unique: function prop() {
			return $.uniqueSort(arguments[0]);
		},
		isFunction: function prop() {
			return 'function' === typeof arguments[0];
		},
		isArray: function prop() {
			return Array.isArray(arguments[0]);
		},
		trim: function prop() {
			var value = arguments[0];
			if ('string' === typeof value) {
				return value.trim();
			}
			return ('undefined' !== typeof value) ? value : '';
		},
		isNumeric: function prop() {
			var value = arguments[0];
			if ('number' === typeof value) return true;
			if ('string' !== typeof value) return false;

			return !isNaN(value) && !isNaN(parseFloat(value));
		},
		type: function prop() {
			var value = arguments[0];
			var type = typeof(value);

			if ('object' === type) {
				if (value.hasOwnProperty('constructor')) {
					return value.constructor.name.toLowerCase();
				}
			}
			return type;
		},
	});
	
	// Functions: $('</>').fn() or jQuery('</>').fn();
	$.fn.extend({
		bind: function() {
			switch (arguments.length) {
				case 1:
					// events
					return this.on(arguments[0]);
				case 2:
					// eventType, eventData | eventType, handler
					return this.on(arguments[0], arguments[1]);
				case 3:
					// eventType, eventData, handler|preventBubble
					return this.on(arguments[0], arguments[1], arguments[2]);
				default:
					return this;
			}
		},
		unbind: function() {
			switch (arguments.length) {
				case 1:
					// event
					return this.off(arguments[0]);
				case 2:
					// eventType, handler
					if ('function' === typeof arguments[1]) {
						return this.off(arguments[0], arguments[1]);
					}
					// eventType, false - since off() does not take any boolean as second argument, thus,
					// we only need to pass the eventType to unbind any events associated with the object.
					return this.off(arguments[0]);
				case 0:
					// no arguments
					return this.off();
				default:
					return this;
			}
		},
		hover: function(fnOver, fnOut) {
			return this.on('mouseenter', fnOver).on('mouseleave', fnOut);
		},
		removeAttr: function(attrib) {
			if ('disabled' === attrib) {
				return this.prop('disabled', false);
			}

			if ($(this).hasOwnProperty('length') && 0 !== $(this).length) {
				$(this).get(0).removeAttribute(attrib);
			}
			return this;
		},
		resize: function() {
			return _callback.call(this, 'resize', arguments);
		},
		click: function() {
			return _callback.call(this, 'click', arguments);
		},
		dblclick: function() {
			return _callback.call(this, 'dblclick', arguments);
		},
		scroll: function() {
			return _callback.call(this, 'scroll', arguments);
		},
		keydown: function() {
			return _callback.call(this, 'keydown', arguments);
		},
		keyup: function() {
			return _callback.call(this, 'keyup', arguments);
		},
		keypress: function() {
			return _callback.call(this, 'keypress', arguments);
		},
		change: function() {
			return _callback.call(this, 'change', arguments);
		},
		focus: function() {
			return _callback.call(this, 'focus', arguments);
		},
	});

	/**
	 * A wrapper function that alter/update calls to the deprecated jQuery functions
	 *
	 * Functions passed through here basically has the same signature, thus, we wrapped everything here
	 * and let them call this handler instead of repeating them for each function to avoid redundancy.
	 *
	 * @param {string} name Name of the function
	 * @param {array}  args Arguments to the function
	 *
	 * @returns {mixed}
	 */
	function _callback(name, args) {
		switch (args.length) {
			case 1:
				// Arguments index 0=handler
				return this.on(name, args[0]);
			case 2:
				// Arguments index 0=data, 1=handler
				return this.on(name, args[0], args[1]);
			default:
				break;
		}

		// Since we don't have any arguments then that would mean the shorthand
		// for the event (e.g. "click", "focus", etc.) which is now deprecated has been called or triggered.
		return this.trigger(name);
	}

})(jQuery);
