var javascript_version = "2.7.14"
var ignore_key = true;
var start = 1;
var end = 16;
var active_tab = 1;
var active_tab_0 = 0;
var tabs_to_configure   = new Array();
var debug = false;
var debug_title = false;
var save_enabled = true;

var current_tab = 0;
var next_tab = 0;

var syntax_highlighting = false;
var settings_page = "";

var dateFormat = "yy-mm-dd";
var timeFormat = "H:i:s";

var list_search_reload = false;
var website_list_search_reload = false;
//var ai_ctrl_pressed = false;
//var ai_editor_disabled = false;

var AI_DISABLED             = 0;
var AI_BEFORE_POST          = 1;
var AI_AFTER_POST           = 2;
var AI_BEFORE_CONTENT       = 3;
var AI_AFTER_CONTENT        = 4;
var AI_BEFORE_PARAGRAPH     = 5;
var AI_AFTER_PARAGRAPH      = 6;
var AI_BEFORE_EXCERPT       = 7;
var AI_AFTER_EXCERPT        = 8;
var AI_BETWEEN_POSTS        = 9;
var AI_BEFORE_COMMENTS      = 10;
var AI_BETWEEN_COMMENTS     = 11;
var AI_AFTER_COMMENTS       = 12;
var AI_FOOTER               = 13;
var AI_ABOVE_HEADER         = 14;
var AI_BEFORE_HTML_ELEMENT  = 15;
var AI_AFTER_HTML_ELEMENT   = 16;
var AI_INSIDE_HTML_ELEMENT  = 17;
var AI_BEFORE_IMAGE         = 18;
var AI_AFTER_IMAGE          = 19;


var AI_ALIGNMENT_DEFAULT        = 0;
var AI_ALIGNMENT_LEFT           = 1;
var AI_ALIGNMENT_RIGHT          = 2;
var AI_ALIGNMENT_CENTER         = 3;
var AI_ALIGNMENT_FLOAT_LEFT     = 4;
var AI_ALIGNMENT_FLOAT_RIGHT    = 5;
var AI_ALIGNMENT_NO_WRAPPING    = 6;
var AI_ALIGNMENT_CUSTOM_CSS     = 7;
var AI_ALIGNMENT_STICKY_LEFT    = 8;
var AI_ALIGNMENT_STICKY_RIGHT   = 9;
var AI_ALIGNMENT_STICKY_TOP     = 10;
var AI_ALIGNMENT_STICKY_BOTTOM  = 11;
var AI_ALIGNMENT_STICKY         = 12;

var AI_ADB_ACTION_NONE              = 0;
var AI_ADB_ACTION_MESSAGE           = 1;
var AI_ADB_ACTION_REDIRECTION       = 2;

var AI_ADB_BLOCK_ACTION_DO_NOTHING  = 0;
var AI_ADB_BLOCK_ACTION_REPLACE     = 1;
var AI_ADB_BLOCK_ACTION_SHOW        = 2;
var AI_ADB_BLOCK_ACTION_HIDE        = 3;

var AI_CODE_UNKNOWN  = 100;
var AI_CODE_BANNER   = 0;
var AI_CODE_ADSENSE  = 1;
var AI_CODE_AMAZON   = 2;

var AI_ADSENSE_STANDARD         = 0;
var AI_ADSENSE_LINK             = 1;
var AI_ADSENSE_IN_ARTICLE       = 2;
var AI_ADSENSE_IN_FEED          = 3;
var AI_ADSENSE_MATCHED_CONTENT  = 4;

var AI_ADSENSE_SIZE_FIXED             = 0;
var AI_ADSENSE_SIZE_RESPONSIVE        = 1;
var AI_ADSENSE_SIZE_FIXED_BY_VIEWPORT = 2;

var AI_HTML_INSERTION_CLIENT_SIDE           = 0;
//var AI_HTML_INSERTION_CLIENT_SIDE_DOM_READY = 1;
var AI_HTML_INSERTION_SEREVR_SIDE           = 2;

var AI_STICK_TO_THE_LEFT          = 0;
var AI_STICK_TO_THE_CONTENT_LEFT  = 1;
var AI_STICK_HORIZONTAL_CENTER    = 2;
var AI_STICK_TO_THE_CONTENT_RIGHT = 3;
var AI_STICK_TO_THE_RIGHT         = 4;

var AI_STICK_TO_THE_TOP         = 0;
var AI_STICK_VERTICAL_CENTER    = 1;
var AI_SCROLL_WITH_THE_CONTENT  = 2;
var AI_STICK_TO_THE_BOTTOM      = 3;

var AI_ANIMATION_NONE           = 0;

var AI_BACKGROUND_REPEAT_DEFAULT        = 0;
var AI_BACKGROUND_REPEAT_NO             = 1;
var AI_BACKGROUND_REPEAT_YES            = 2;
var AI_BACKGROUND_REPEAT_HORIZONTALY    = 3;
var AI_BACKGROUND_REPEAT_VERTICALLY     = 4;
var AI_BACKGROUND_REPEAT_SPACE          = 5;
var AI_BACKGROUND_REPEAT_ROUND          = 6;

var AI_BACKGROUND_SIZE_DEFAULT          = 0;
var AI_BACKGROUND_SIZE_COVER            = 1;
var AI_BACKGROUND_SIZE_CONTAIN          = 2;
var AI_BACKGROUND_SIZE_FILL             = 3;

var before_update_selection_from_list = null;

/*
 * jQuery Tooltip plugin 1.3
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-tooltip/
 * http://docs.jquery.com/Plugins/Tooltip
 *
 * Copyright (c) 2006 - 2008 Jörn Zaefferer
 *
 * $Id: jquery.tooltip.js 5741 2008-06-21 15:22:16Z joern.zaefferer $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($) {
  // the tooltip element
  var helper = {},
    // the current tooltipped element
    current,
    // the title of the current element, used for restoring
    title,
    // timeout id for delayed tooltips
    tID,
    // IE 5.5 or 6
    //    IE = $.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent),
    IE = false,
    // flag for mouse tracking
    track = false;
  $.tooltip = {
    blocked: false,
    defaults: {
      delay: 200,
      fade: false,
      showURL: true,
      extraClass: "",
      top: 15,
      left: 15,
      id: "ai-tooltip"
    },
    block: function() {
      $.tooltip.blocked = !$.tooltip.blocked;
    }
  };
  $.fn.extend({
    tooltip: function(settings) {
      settings = $.extend({}, $.tooltip.defaults, settings);
      createHelper(settings);
      return this.each(function() {
          $.data(this, "tooltip", settings);
          this.tOpacity = helper.parent.css("opacity");
          // copy tooltip into its own expando and remove the title
          this.tooltipText = this.title;
          $(this).removeAttr("title");
          // also remove alt attribute to prevent default tooltip in IE
          this.alt = "";
        })
        .mouseover(save)
        .mouseout(hide)
        .click(hide);
    },
    fixPNG: IE ? function() {
      return this.each(function() {
        var image = $(this).css('backgroundImage');
        if (image.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
          image = RegExp.$1;
          $(this).css({
            'backgroundImage': 'none',
            'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"
          }).each(function() {
            var position = $(this).css('position');
            if (position != 'absolute' && position != 'relative')
              $(this).css('position', 'relative');
          });
        }
      });
    } : function() {
      return this;
    },
    unfixPNG: IE ? function() {
      return this.each(function() {
        $(this).css({
          'filter': '',
          backgroundImage: ''
        });
      });
    } : function() {
      return this;
    },
    hideWhenEmpty: function() {
      return this.each(function() {
        $(this)[$(this).html() ? "show" : "hide"]();
      });
    },
    url: function() {
      return this.attr('href') || this.attr('src');
    }
  });
  function createHelper(settings) {
    // there can be only one tooltip helper
    if (helper.parent)
      return;
    // create the helper, h3 for title, div for url
    helper.parent = $('<div id="' + settings.id + '"><h3></h3><div class="body"></div><div class="url"></div></div>')
      // add to document
      .appendTo(document.body)
      // hide it at first
      .hide();
    // apply bgiframe if available
    if ($.fn.bgiframe)
      helper.parent.bgiframe();
    // save references to title and url elements
    helper.title = $('h3', helper.parent);
    helper.body = $('div.body', helper.parent);
    helper.url = $('div.url', helper.parent);
  }
  function settings(element) {
    return $.data(element, "tooltip");
  }
  // main event handler to start showing tooltips
  function handle(event) {
    // show helper, either with timeout or on instant
    if (settings(this).delay)
      tID = setTimeout(show, settings(this).delay);
    else
      show();
    // if selected, update the helper position when the mouse moves
    track = !!settings(this).track;
    $(document.body).bind('mousemove', update);
    // update at least once
    update(event);
  }
  // save elements title before the tooltip is displayed
  function save() {
    // if this is the current source, or it has no title (occurs with click event), stop
    if ($.tooltip.blocked || this == current || (!this.tooltipText && !settings(this).bodyHandler))
      return;
    // save current
    current = this;
    title = this.tooltipText;

    title = title.replace (/\[\[(.+?)\]\]/g, '<span class="tooltip-code">$1</span>');
    title = title.replace (/\[BR\]/g, '<br />');
    title = title.replace (/\[HR\]/g, '<hr />');
    title = title.replace (/(\[ADINSERTER.+\])/g, '<span class="tooltip-code">$1</span>');
    title = title.replace (/(\%N)/g, '<span class="tooltip-code">$1</span>');
    title = title.replace (/(\[\*\])/g, '<span class="tooltip-icon"><span class="dashicons dashicons-admin-generic" style="width: 11px; height: 11px; font-size: 12px; line-height: unset;"></span></span>');
    title = title.replace (/(http[^ ]+)/g, '<span class="tooltip-code">$1</span>');
    title = title.replace (/(pub-[0-9]+)/g, '<span class="tooltip-code">$1</span>');

    if (settings(this).bodyHandler) {
      helper.title.hide();
      var bodyContent = settings(this).bodyHandler.call(this);
      if (bodyContent.nodeType || bodyContent.jquery) {
        helper.body.empty().append(bodyContent)
      } else {
        helper.body.html(bodyContent);
      }
      helper.body.show();
    } else if (settings(this).showBody) {
      var parts = title.split(settings(this).showBody);
      if (parts.length == 2) {
        helper.title.html(parts.shift()).show();
      } else {
          helper.title.hide();
        }
      helper.body.empty();
      for (var i = 0, part;
        (part = parts[i]); i++) {
        if (i > 0)
          helper.body.append("<br/>");
        helper.body.append(part);
      }
      helper.body.hideWhenEmpty();
    } else {
      helper.title.html(title).show();
      helper.body.hide();
    }
    // if element has href or src, add and show it, otherwise hide it
    if (settings(this).showURL && $(this).url())
      helper.url.html($(this).url().replace('http://', '')).show();
    else
      helper.url.hide();
    // add an optional class for this tip
    helper.parent.addClass(settings(this).extraClass);
    // fix PNG background for IE
    if (settings(this).fixPNG)
      helper.parent.fixPNG();
    handle.apply(this, arguments);
  }
  // delete timeout and show helper
  function show() {
    tID = null;
    if ((!IE || !$.fn.bgiframe) && settings(current).fade) {
      if (helper.parent.is(":animated"))
        helper.parent.stop().show().fadeTo(settings(current).fade, current.tOpacity);
      else
        helper.parent.is(':visible') ? helper.parent.fadeTo(settings(current).fade, current.tOpacity) : helper.parent.fadeIn(settings(current).fade);
    } else {
      helper.parent.show();
    }
    update();
  }
  /**
   * callback for mousemove
   * updates the helper position
   * removes itself when no current element
   */
  function update(event) {
    if ($.tooltip.blocked)
      return;
    if (event && event.target.tagName == "OPTION") {
      return;
    }
    // stop updating when tracking is disabled and the tooltip is visible
    if (!track && helper.parent.is(":visible")) {
      $(document.body).unbind('mousemove', update)
    }
    // if no current element is available, remove this listener
    if (current == null) {
      $(document.body).unbind('mousemove', update);
      return;
    }
    // remove position helper classes
    helper.parent.removeClass("viewport-right").removeClass("viewport-bottom");
    var left = helper.parent[0].offsetLeft;
    var top = helper.parent[0].offsetTop;
    if (event) {
      // position the helper 15 pixel to bottom right, starting from mouse position
      left = event.pageX + settings(current).left;
      top = event.pageY + settings(current).top;
      var right = 'auto';
      if (settings(current).positionLeft) {
        right = $(window).width() - left;
        left = 'auto';
      }
      helper.parent.css({
        left: left,
        right: right,
        top: top
      });
    }
    var v = viewport(),
      h = helper.parent[0];
    // check horizontal position
    if (v.x + v.cx < h.offsetLeft + h.offsetWidth) {
      left -= h.offsetWidth + 20 + settings(current).left;
      helper.parent.css({
        left: left + 'px'
      }).addClass("viewport-right");
    }
    // check vertical position
    if (v.y + v.cy < h.offsetTop + h.offsetHeight) {
      top -= h.offsetHeight + 20 + settings(current).top;
      helper.parent.css({
        top: top + 'px'
      }).addClass("viewport-bottom");
    }
  }
  function viewport() {
    return {
      x: $(window).scrollLeft(),
      y: $(window).scrollTop(),
      cx: $(window).width(),
      cy: $(window).height()
    };
  }
  // hide helper and restore added classes and the title
  function hide(event) {
    if ($.tooltip.blocked)
      return;
    // clear timeout if possible
    if (tID)
      clearTimeout(tID);
    // no more current element
    current = null;
    var tsettings = settings(this);
    function complete() {
      helper.parent.removeClass(tsettings.extraClass).hide().css("opacity", "");
    }
    if ((!IE || !$.fn.bgiframe) && tsettings.fade) {
      if (helper.parent.is(':animated'))
        helper.parent.stop().fadeTo(tsettings.fade, 0, complete);
      else
        helper.parent.stop().fadeOut(tsettings.fade, complete);
    } else
      complete();
    if (settings(this).fixPNG)
      helper.parent.unfixPNG();
  }
})(jQuery);

function b64e (str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa (encodeURIComponent (str).replace (/%([0-9A-F]{2})/g,
    function toSolidBytes (match, p1) {
      return String.fromCharCode ('0x' + p1);
  }));
}

function b64d (str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent (atob (str).split ('').map (function(c) {
    return '%' + ('00' + c.charCodeAt (0).toString (16)).slice (-2);
  }).join (''));
}

// http://www.myersdaily.org/joseph/javascript/md5.js

  function md5cycle (x, k) {
    var a = x[0],
      b = x[1],
      c = x[2],
      d = x[3];
    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);
    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);
    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);
    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);
    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
  }
  function cmn(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }
  function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }
  function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }
  function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | (~d)), a, b, x, s, t);
  }
  function md51(s) {
    txt = '';
    var n = s.length,
      state = [1732584193, -271733879, -1732584194, 271733878],
      i;
    for (i = 64; i <= s.length; i += 64) {
      md5cycle(state, md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < s.length; i++)
      tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0; i < 16; i++) tail[i] = 0;
    }
    tail[14] = n * 8;
    md5cycle(state, tail);
    return state;
  }
  /* there needs to be support for Unicode here,
   * unless we pretend that we can redefine the MD-5
   * algorithm for multi-byte characters (perhaps
   * by adding every four 16-bit characters and
   * shortening the sum to 32 bits). Otherwise
   * I suggest performing MD-5 as if every character
   * was two bytes--e.g., 0040 0025 = @%--but then
   * how will an ordinary MD-5 sum be matched?
   * There is no way to standardize text to something
   * like UTF-8 before transformation; speed cost is
   * utterly prohibitive. The JavaScript standard
   * itself needs to look at this: it should start
   * providing access to strings as preformed UTF-8
   * 8-bit unsigned value arrays.
   */
  function md5blk(s) { /* I figured global was faster.   */
    var md5blks = [],
      i; /* Andy King said do it this way. */
    for (i = 0; i < 64; i += 4) {
      md5blks[i >> 2] = s.charCodeAt(i) +
        (s.charCodeAt(i + 1) << 8) +
        (s.charCodeAt(i + 2) << 16) +
        (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }
  var hex_chr = '0123456789abcdef'.split('');
  function rhex(n) {
    var s = '',
      j = 0;
    for (; j < 4; j++)
      s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] +
      hex_chr[(n >> (j * 8)) & 0x0F];
    return s;
  }
  function hex(x) {
    for (var i = 0; i < x.length; i++)
      x[i] = rhex(x[i]);
    return x.join('');
  }
  function md5(s) {
    return hex(md51(s));
  }
  /* this function is much faster,
  so if possible we use it. Some IEs
  are the only ones I know of that
  need the idiotic second function,
  generated by an if clause.  */
  function add32(a, b) {
    return (a + b) & 0xFFFFFFFF;
  }
  if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
    function add32(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF),
        msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }
  }


String.prototype.tabIndex = function () {
  return this.replace (/^\D+/g, '')
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

var ai_nonce = b64d (jQuery ("#ai-form").attr ('ai-value'));
var ai_settings = b64d (jQuery ("#ai-form").attr ('ai-settings'));
var ai_read_only = jQuery ("#ai-form").hasClass ('ai-read-only');

var shSettings = {
  "tab_size":"4",
  "use_soft_tabs":"1",
  "word_wrap":"1",
  "highlight_curr_line":"0",
  "key_bindings":"default",
  "full_line_selection":"1",
  "show_line_numbers":"0"};


function encode_code (block) {
  // copy code back to textarea and encode block code

  if (!save_enabled) return false;

  var textarea = jQuery ('#block-' + block);
  var textarea_name = textarea.attr ('name');

  if (typeof textarea_name !== typeof undefined && textarea_name !== false) {
    var editor_element = jQuery ("#editor-" + block);

    // Copy code from editor only if it exists (tab has been configured)
    if (editor_element.length != 0 && typeof editor_element !== typeof undefined && editor_element !== false) {
      var editor = ace.edit ("editor-" + block);
      var session = editor.getSession();

      var editor_disabled = true;
      if (typeof ace != 'undefined') {
        editor_disabled = jQuery("#simple-editor-" + block).is(":checked");
      }
      if (!editor_disabled) {
        textarea.val (session.getValue());
      }

    }

    var default_value = textarea.attr ("default");
    var current_value = textarea.val ();
    var name          = textarea.attr ("name");

    if (typeof name != 'undefined') {
      if (typeof default_value != 'undefined') {
  //        console.log (textarea.attr ("name"), ": default_value: ", default_value, ", current_value: ", current_value);

        if (current_value == default_value) {
          textarea.removeAttr ("name");
  //          console.log ("REMOVED: ", name);
        }
      }
  //      else console.log ("NO DEFAULT VALUE: ", textarea.attr ("name"));
    }

    var copy_id = textarea.attr ('id') + '-copy';
    jQuery ('#' + copy_id).remove ();

    var org_name = textarea.attr ('org-name');
    if (typeof org_name !== typeof undefined && org_name !== false) {
      textarea.attr ("name", org_name);
    } else textarea.attr ("org-name", textarea_name);

    var textarea_copy = textarea.clone ().attr ('id', copy_id).hide ();
    textarea.removeAttr ("name");
    textarea_copy.val (':AI:' + b64e (textarea.val ()));
    textarea.after (textarea_copy);

//    console.log (':AI:', block);
  }

  jQuery("#ai-active-tab").attr ("value", '[' + active_tab + ',' + active_tab_0 + ']');

  var named_parameters = jQuery("#tab-" + block + ' [name]');
  var block_parameters = new Array();
  named_parameters.each (function() {
    block_parameters.push (jQuery (this).attr ('name'));
  });
  jQuery("#block-parameters-" + block).attr ('name', 'block-parameters-' + block).attr ('value', b64e (JSON.stringify (block_parameters)));
};

function SyntaxHighlight (id, block, settings) {
  var textarea, editor, form, session, editDiv;

  settings ['tab_size'] = 2;

  this.textarea = textarea = jQuery(id);
  this.settings = settings || {};

  if (textarea.length === 0 ) { // Element does not exist
    this.valid = false;
    return;
  }

  this.valid = true;
  editDiv = jQuery('<div>', {
    position: 'absolute',
    'class': textarea.attr('class'),
    'id':  'editor-' + block
  }).insertBefore (textarea);

  textarea.css('display', 'none');
  this.editor = editor = ace.edit(editDiv[0]);
  this.form = form = textarea.closest('form');
  this.session = session = editor.getSession();

  editor.$blockScrolling = Infinity;

  session.setValue(textarea.val());

  session.setMode ("ace/mode/ai-html");

  this.applySettings();
}

SyntaxHighlight.prototype.applySettings = function () {
  var editor = this.editor,
    session = this.session,
    settings = this.settings;

  editor.renderer.setShowGutter(settings['show_line_numbers'] == 1);
  editor.setHighlightActiveLine(settings['highlight_curr_line'] == 1);
  editor.setSelectionStyle(settings['full_line_selection'] == 1 ? "line" : "text");
  editor.setTheme("ace/theme/" + settings['theme']);
  session.setUseWrapMode(settings['word_wrap'] == 1);
  session.setTabSize(settings['tab_size']);
  session.setUseSoftTabs(settings['use_soft_tabs'] == 1);
};

function is_sticky (custom_css) {
  custom_css = custom_css.replace (/\s+/g, '');

  if (custom_css.indexOf ("position:fixed") != - 1 && custom_css.indexOf ("z-index:") != - 1) return true;

  return false;
}

function is_background (custom_css) {
  custom_css = custom_css.replace (/\s+/g, '');

  if (custom_css.indexOf ("top:0px;left:0px;width:100%;height:100%;") != - 1) return true;

  return false;
}

function change_block_alignment (block) {
  jQuery ("select#block-alignment-" + block).change ();
  jQuery ("select#horizontal-position-" + block).change ();
  jQuery ("select#vertical-position-" + block).change ();
  jQuery ("input#background-" + block).change ();
//  jQuery ("input#bkg-color-" + block).colorpicker ('setValue', jQuery ("input#bkg-color-" + block).attr ('value'));
  jQuery ("input#bkg-color-" + block).colorpicker ('setValue', jQuery ("input#bkg-color-" + block).val ());
  jQuery ("select#bkg-repeat-" + block).change ();
  jQuery ("select#bkg-size-" + block).change ();
}

function change_banner_image (block) {
  jQuery ("input#banner-image-url-" + block).trigger ("input");
}

function ai_css_value_px (css, property) {
  var found = false;

  styles = css.split (';');
  styles.forEach (function (style, index) {
    style = style.trim ();
    if (style.indexOf (property) == 0) {
      style_parts = style.split (':');
      if (style_parts.length == 2) {
        style_property = style_parts [0].trim ();
        style_value = style_parts [1].trim ();
        if (style_property == property && style_value.endsWith ('px')) found = true;
      }
    }
  });

  return found;
}

function ai_change_css (css, property, value) {
  var replaced = false;
  styles = css.split (';');
  styles.forEach (function (style, index) {
    org_style = style;
    style = style.trim ();
    if (style.indexOf (property) == 0) {
      style_parts = style.split (':');
      if (style_parts.length == 2) {
        style_property = style_parts [0].trim ();
        style_value = style_parts [1].trim ();
        if (style_property == property && style_value.endsWith ('px')) {
          var org_style_parts = org_style.split (':');
          styles [index] = org_style_parts [0] + ': ' + value + 'px';
          replaced = true;
        }
      }
    }
  });

  var new_style = styles.join (';');

  if (!replaced) {
    new_style = new_style.trim ();
    if (new_style.length != 0 && new_style.slice (-1) == ';') new_style = new_style.substring (0, new_style.length - 1);
    return new_style + '; ' + property + ': ' + value + ';';
  }

  return new_style;
}

function update_sticky_margins (style, horizontal_margin, vertical_margin) {
  if (vertical_margin !== '') {
    if (ai_css_value_px (style, 'top')) style = ai_change_css (style, 'top', vertical_margin); else
    if (ai_css_value_px (style, 'bottom')) style = ai_change_css (style, 'bottom', vertical_margin);
  }

  if (horizontal_margin !== '') {
    if (ai_css_value_px (style, 'left')) style = ai_change_css (style, 'left', horizontal_margin); else
    if (ai_css_value_px (style, 'right')) style = ai_change_css (style, 'right', horizontal_margin); else
    if (ai_css_value_px (style, 'margin-left')) style = ai_change_css (style, 'margin-left', horizontal_margin); else
    if (ai_css_value_px (style, 'margin-right')) style = ai_change_css (style, 'margin-right', horizontal_margin);
  }

  return style;
}

(function ($) {
  $.widget("toggle.checkboxButton", {
    _create : function() {
      this._on(this.element, {
        "change" : function(event) {
          this.element.next ("label").find ('.checkbox-icon').toggleClass("on");
        }
      });
    }
  });
}(jQuery));


serialize_object = function (obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty (p)) {
      str.push(encodeURIComponent (p) + "=" + encodeURIComponent (obj[p]));
    }
  return str.join ("&");
}

Number.isInteger = Number.isInteger || function (value) {
  return typeof value === "number" &&
         isFinite (value) &&
         Math.floor (value) === value;
};

function get_editor_text (block) {
  var editor_disabled = true;
  var editor_element = jQuery ("#editor-" + block);

  if (typeof ace != 'undefined' && editor_element.length != 0 && typeof editor_element !== typeof undefined && editor_element !== false) {
    var editor = ace.edit ("editor-" + block);
    editor_disabled = jQuery("#simple-editor-" + block).is(":checked");
  }
  if (!editor_disabled) return editor.getSession ().getValue();
  return jQuery ("#block-" + block).val ();
}

function set_editor_text (block, text) {
  var editor_disabled = true;
  var editor_element = jQuery ("#editor-" + block);

  if (typeof ace != 'undefined' && editor_element.length != 0 && typeof editor_element !== typeof undefined && editor_element !== false) {
    var editor = ace.edit ("editor-" + block);
    editor_disabled = jQuery("#simple-editor-" + block).is(":checked");
  }
  if (!editor_disabled)
    editor.getSession ().setValue(text); else
      jQuery ("#block-" + block).val (text);

}

function open_popup_window_post (url, windowoption, name, params) {
   var form = document.createElement("form");
   form.setAttribute("method", "post");
   form.setAttribute("action", url);
   form.setAttribute("target", name);
   for (var i in params) {
     if (params.hasOwnProperty(i)) {
       var input = document.createElement('input');
       input.type = 'hidden';
       input.name = i;
       input.value = encodeURI (params[i]);
       form.appendChild(input);
     }
   }
   document.body.appendChild(form);
   //note I am using a post.htm page since I did not want to make double request to the page
   //it might have some Page_Load call which might screw things up.
//   window.open ("post.htm", name, windowoption);
   window.open ("admin-ajax.php", name, windowoption);
   form.submit();
   document.body.removeChild(form);
}


function open_window_post (url, name, params) {
   var form = document.createElement("form");
   form.setAttribute("method", "post");
   form.setAttribute("action", url);
   form.setAttribute("target", name);
   for (var i in params) {
     if (params.hasOwnProperty(i)) {
       var input = document.createElement('input');
       input.type = 'hidden';
       input.name = i;
       input.value = encodeURI (params[i]);
       form.appendChild(input);
     }
   }
   document.body.appendChild(form);
   form.submit();
   document.body.removeChild(form);
}

function check_managing_slave () {
  if (jQuery(".ai-managing.ai-managing-slave").length) {

    jQuery.get (ajaxurl + '?action=ai_ajax_backend&managed=&ai_check=' + ai_nonce, function (data) {
      if (data != '') {
        setTimeout (function () {
          check_managing_slave ();
        }, 30 * 1000);
      } else jQuery(".ai-managing.ai-managing-slave").hide ();
    });
  }
}


jQuery(document).ready (function($) {

  var header = $('#export-container'+'-0').length != 0;

  if (header) {
    $.elycharts.templates['ai'] = {
      type : "line",
      margins : [10, 38, 20, 38],
      defaultSeries : {
        fill: true,
        fillProps: {
          opacity: .15
        },
        plotProps : {
          "stroke-width" : 1,
        },
      },
      series : {
        serie1 : {
          color : "#66f",
          rounded : 0.8,
        },
        serie2 : {
          color : "#888",
          axis : "r",
          fillProps: {
            opacity: .1
          },
        }
      },
      defaultAxis : {
        labels : true,
        min: 0,
      },
      features : {
        grid : {
          draw : true,
          forceBorder : true,
          ny: 5,
          ticks : {
            active : [true, true, true],
            size : [4, 0],
            props : {
              stroke: '#ccc',
            }
          }
        },
      },
      interactive: false
    }

    $.elycharts.templates['ai-clicks'] = {
      template: 'ai',
      series : {
        serie1 : {
          color : "#0a0",
          fillProps: {
            opacity: .2
          },
        },
        serie2 : {
          color : "#888",
        }
      },
    }

    $.elycharts.templates['ai-impressions'] = {
      template: 'ai',
      series : {
        serie1 : {
          color : "#66f",
        },
        serie2 : {
          color : "#888",
        }
      },
    }

    $.elycharts.templates['ai-ctr'] = {
      template: 'ai',
      series : {
        serie1 : {
          color : "#e22",
        },
        serie2 : {
          color : "#888",
        }
      },
    }

    $.elycharts.templates['ai-versions'] = {
      type : "line",
      margins : [10, 38, 20, 38],
      defaultSeries: {
        color: "#0a0",
        fillProps: {
          opacity: .2
        },
        plotProps : {
          "stroke-width" : 2,
        },
        tooltip : {
          frameProps : {
           opacity : 0.8
          }
        },
        rounded : 0.8,
      },
      series: {
        serie1: {
          color : "#aaa",
          axis : "l",
        },
        serie2 : {
          color : "#0a0",
          axis : "r",
        },
        serie3 : {
          color: "#33f",
        },
        serie4 : {
          color : "#e22",
        },
        serie5 : {
          color : "#e2f",
        },
        serie6 : {
          color : "#ec6400",
        },
        serie7 : {
          color : "#00a3b5",
        },
        serie8 : {
          color : "#7000ff",
        },
        serie9 : {
          color : "#000",
        },
        serie10 : {
          color : "#000",   // Used also for BLOCKED
        },
      },
      defaultAxis : {
        labels : true,
        min: 0,
      },
      features : {
        grid: {
          draw: true,
          forceBorder : true,
          ny: 5,
          ticks : {
            active : [true, true, true],
            size : [4, 0],
            props : {
              stroke: '#ccc',
            }
          }
        },
      },
      interactive: true,
    }

    $.elycharts.templates['ai-versions-legend'] = {
      template: 'ai-versions',
      margins : [10, 38, 10, 38],
      defaultSeries : {
        fill: true,
        fillProps: {
          opacity: 0
        },
        plotProps : {
          "stroke-width" : 0,
        },
      },
      defaultAxis : {
        labels : false,
      },
      features: {
        grid: {
          draw: false,
          props: {
            stroke: "transparent",
          },
          ticks : {
            active : false,
          }
        },
        legend: {
          horizontal : true,
          x : 20, // X | auto, (auto solo per horizontal = true)
          y : 0,
          width : 540, // X | auto, (auto solo per horizontal = true)
          height : 20,
          itemWidth : "auto", // fixed | auto, solo per horizontal = true
          borderProps: { fill : "white", stroke: "black", "stroke-width": 0},
        },
      },
    }

    $.elycharts.templates['ai-pie'] = {
      template: 'ai-versions',
      type: "pie",
      rPerc: 100,
      startAngle: 270,
      clockwise: true,
      margins : [0, 0, 0, 0],
      defaultSeries : {
        tooltip: {
          height: 55,
          width: 120,
          padding: [5, 5],
          offset: [-15, -10],
          frameProps: {
              opacity: 0.95,
              /* fill: "white", */
              stroke: "#000"

          }
        },
        plotProps : {
         stroke : "white",
         "stroke-width" : 0,
         opacity : 1
        },
        values : [{
         plotProps : {
          fill : "#aaa"
         }
        }, {
         plotProps : {
          fill : "#0a0"
         }
        }, {
         plotProps : {
          fill : "#33f"
         }
        }, {
         plotProps : {
          fill : "#e22"
         }
        }, {
         plotProps : {
          fill : "#e2f"
         }
        }, {
         plotProps : {
          fill : "#ec6400"
         }
        }, {
         plotProps : {
          fill : "#00a3b5"
         }
        }, {
         plotProps : {
          fill : "#7000ff"
         }
        }, {
         plotProps : {
          fill : "#000"
         }
        }, {
         plotProps : {
          fill : "#000"   // Used also for BLOCKED
         }
        }]
      }
    }

    $.elycharts.templates['ai-bar'] = {
      template: 'ai-pie',
      type: "line",
      margins : [5, 0, 5, 45],
      barMargins : 1,
      defaultSeries : {
        type: "bar",
        axis: "l",
        tooltip: {
          height: 38,
        }
      },
      features: {
        grid: {
          draw: [false, false],
          props : {stroke: '#e0e0e0', "stroke-width": 0},
          ticks : {
            props : {stroke: '#e0e0e0', "stroke-width": 0},
          }
        },
      },
    }

  }

  shSettings ['theme'] = $('#ai-data').attr ('theme');

  var geo_groups = 0;
  var geo_groups_text = $('#ai-data-2').attr ('geo_groups');
  if (typeof geo_groups_text != 'undefined') {
    geo_groups = parseInt (geo_groups_text);
  }

  debug = parseInt ($('#ai-data').attr ('js_debugging'));
  ai_tab_setup_delay = parseInt ($('#ai-data').attr ('tab-setup-delay'));

  api_string = $('#ai-data-2').attr ('api_string');
  if (typeof api_string != 'undefined') {
    api_debug = parseInt ($('#ai-data-2').attr ('api_debugging'));
    var api_check = $('#ai-data-2').attr ('api_check');

    var api_string_len = 0;
    try {
      var api_text = b64d (api_string);
      api_string_len = api_text.length;
    } catch (error) {
      api_string_len = api_string.length + 4;
    }

    if (typeof api_check != 'undefined' && api_string_len != 0 && api_string_len != 4 && (api_string_len < 0x23 || api_string_len > 0x25)) {
      setTimeout (function () {
        var script = document.createElement ('script');
        var date = new Date();
        script.async = true;
        script.src = b64d (api_check);

        var head = document.getElementsByTagName ('head')[0],
            done = false;

        script.onerror = function () {
          script.onerror = null;
          head.removeChild (script);
        }

        script.onload = script.onreadystatechange = function () {
          if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
            done = true;

            script.onload = script.onreadystatechange = null;
            head.removeChild (script);
          };
        };

        head.appendChild (script);
      }, 10);
    }

    if (api_debug < 0x22 && api_debug > 0x1e) api_debug = 0;
  } else api_debug = 0;

  if (debug) {
    var start_time = new Date().getTime();
    var last_time = start_time;
    debug_title = true;
  }

//  if (api_debug) {
//    console.log ('api_debug ON:', api_debug);
//  }

  syntax_highlighting = typeof shSettings ['theme'] != 'undefined' && shSettings ['theme'] != 'disabled';

  var header_id = 'name';
//  var preview_top = (screen.height / 2) - (820 / 2);

  function remove_default_values (block) {

    if ($('.'+'system'+'-'+'status').length) {

      $("#tab-" + block + " input:checkbox").each (function() {
        if (typeof $(this).attr ("style") != 'undefined' && $(this).attr ("style").includes ("animation-name")) {
          $(this).removeAttr ("name");
//            console.log ("REMOVED: ", $(this).removeAttr ("name"));
        }
      });

      $("#tab-" + block + " input:text").each (function() {
        if (typeof $(this).attr ("style") != 'undefined' && $(this).attr ("style").includes ("animation-name")) {
          $(this).removeAttr ("name");
//            console.log ("REMOVED: ", $(this).removeAttr ("name"));
        }
      });
    }

    var t1 = $('.'+'system'+'-'+'stats .ai' + '-stat-' + '1').length;

    if (!api_debug || t1) {
//    console.log ('remove_default_values', block);

    $("#tab-" + block + " input:checkbox").each (function() {
      var default_value = $(this).attr ("default");
      var current_value = $(this).is (':checked');
      var name          = $(this).attr ("name");

      if (typeof name != 'undefined') {
        if (typeof default_value != 'undefined') {
          default_value = Boolean (parseInt (default_value));
//          console.log ($(this).attr ("name"), ": default_value: ", $(this).attr ("default"), " = ", default_value, ", current_value: ", current_value);

          if (current_value == default_value) {
            $(this).removeAttr ("name");
            $("#tab-" + block + " [name='" + name + "']").removeAttr ("name");
//            console.log ("REMOVED: ", name);
          }
        }
//        else console.log ("NO DEFAULT VALUE:", $(this).attr ("name"));

      }
    });

    $("#tab-" + block + " input:text").each (function() {
      var default_value = $(this).attr ("default");
      var current_value = $(this).val ();
      var name          = $(this).attr ("name");

      if (typeof name != 'undefined') {
        if (typeof default_value != 'undefined') {
  //        console.log ($(this).attr ("name"), ": default_value: ", default_value, ", current_value: ", current_value);

          if (current_value == default_value) {
            $(this).removeAttr ("name");
  //          console.log ("REMOVED: ", name);
          }
        }
//        else console.log ("NO DEFAULT VALUE: ", $(this).attr ("name"));
      }
    });

    $("#tab-" + block + " select").each (function() {
      var default_value = $(this).attr ("default");
      var current_value = $(this).val();
      var name          = $(this).attr ("name");

      if (typeof name != 'undefined') {
//        console.log ($(this).attr ("id"), name, default_value, current_value);

        // to do: children of OPTGROUP
        var childern = $(this).children ();
        if (childern.prop ("tagName") == "OPTGROUP") {
          var current_value = "";
          childern.each (function() {
            var selected = $(this).val();
            if (selected.length != 0) {
              current_value = selected;
              return false;
            }
          });
        }

  //      if ($(this).attr ("selected-value") == 1) current_value = current_value.attr("value");

        if (typeof default_value != 'undefined') {
//          console.log ($(this).attr ("name"), ": default_value: ", default_value, " current_value: ", current_value);

          if (current_value == default_value) {
            $(this).removeAttr ("name");
//            console.log ("REMOVED: ", name);
          }
        }
//        else console.log ("NO DEFAULT VALUE: ", $(this).attr ("name"));
      }
    });

    $("#tab-" + block + " input:radio:checked").each (function() {
      var default_value = $(this).attr ("default");
      var current_value = $(this).is (':checked');
      var name          = $(this).attr ("name");

      if (typeof name != 'undefined') {
        if (typeof default_value != 'undefined') {
          default_value = Boolean (parseInt (default_value));
  //        console.log ($(this).attr ("name"), ": default_value: ", $(this).attr ("default"), " = ", default_value, ", current_value: ", current_value);

          if (current_value == default_value) {
            $("#tab-" + block + " [name='" + name + "']").removeAttr ("name");
  //          console.log ("REMOVED: ", name);
          }
        }
//        else console.log ("NO DEFAULT VALUE: ", $(this).attr ("name"));
      }
    });

//      else console.log ("NO DEFAULT API VALUE:", api_string);
    }

    if (block == 0) {
      var name = 'lic'+'ense'+'_'+'key';
      var val = $("#tab-" + block + ' [name='+name+']');
      if (typeof val != 'undefined' && val.length != 0) {
        if (val.val ().length != 0 && (val.val ().length < 31 || val.val ().length > 33)) {
          $('#tab-0 [name='+name+']').removeAttr ("name");
        }
      }
    }

  }

  function configure_editor_language (block) {

    var editor = ace.edit ("editor-" + block);

    if ($("input#process-php-"+block).is(":checked")) {
      editor.getSession ().setMode ("ace/mode/ai-php");
    } else editor.getSession ().setMode ("ace/mode/ai-html");
  }

  function disable_auto_refresh_statistics () {
    $('span.icon-auto-refresh').each (function() {
      $(this).removeClass ('on');
    });
  }

  function reload_statistics (block) {
    if ($("input#auto-refresh-"+block).next ().find ('.checkbox-icon').hasClass ('on')) {
      $("input#load-custom-range-"+block).click ();
      setTimeout (function() {reload_statistics (block);}, 60 * 1000);
    }
  }

  function ai_get_time (time_string) {
    if (time_string.includes (':')) {
      var time_parts = time_string.split (':');
      return ((parseInt (time_parts [0]) * 3600 + parseInt (time_parts [1]) * 60 + parseInt (time_parts [2])) * 1000);
    }

    return null;
  }

  function ai_get_date (date_element) {
    var date;
    try {
      date = $.datepicker.parseDate (dateFormat, date_element.val ());
    } catch (error) {
      date = null;
    }

    return date;
  }

  function ai_get_date_time (date_element, time_element) {
    var date;
    try {
      date = Date.parse (date_element.val () + ' ' + time_element.val ());
      if (isNaN (date)) date = null;
    } catch (error) {
      date = null;
    }

    return date;
  }

  function process_scheduling_dates (block) {
    var gmt = parseInt ($('#ai-form').attr ('gmt'));
    var start_date_picker = $("#scheduling-date-on-"+block);
    var end_date_picker   = $("#scheduling-date-off-"+block);
    var start_time_picker = $("#scheduling-time-on-"+block);
    var end_time_picker   = $("#scheduling-time-off-"+block);
    var scheduling = $("select#scheduling-"+block).val();

    var start_date_string = start_date_picker.val ().trim ();
    var end_date_string   = end_date_picker.val ().trim ();
    var time_only = false;

    if (start_date_string == '' && end_date_string == '') {
      var start_time = ai_get_time (start_time_picker.val ().trim ());
      var end_time   = ai_get_time (end_time_picker.val ().trim ());
      time_only = true;
    } else {
        var start_time = ai_get_date_time (start_date_picker, start_time_picker) + gmt;
        var end_time   = ai_get_date_time (end_date_picker, end_time_picker) + gmt;
      }

    end_date_picker.attr ('title', '');
    end_date_picker.css ("border-color", "#ddd");
    end_time_picker.attr ('title', '');
    end_time_picker.css ("border-color", "#ddd");

    if (start_time == null && end_time != null) {
      end_date_picker.attr ('title', '');
      end_time_picker.attr ('title', '');
    } else
    if (end_time == null && start_time != null) {
      end_date_picker.attr ('title', '');
      end_time_picker.attr ('title', '');
    } else
    if (end_time > start_time) {
      if (scheduling == "2") {
        var current_time = new Date ().getTime () + gmt;

        if (time_only) {
          var date = new Date (current_time);
          var current_time_date_only = new Date (date.getFullYear (), date.getMonth (), date.getDate ()).getTime () + gmt;

          current_time -= current_time_date_only;

          if (current_time < 0) {
            current_time += 24 * 3600 * 1000;
          }
        }

        if (end_time <= current_time) {
          var expiration = Math.floor ((current_time - end_time) / 1000 / 3600 / 24);
          end_date_picker.attr ('title', ai_admin.insertion_expired);
          end_date_picker.css ("border-color", "#d00");
          end_time_picker.attr ('title', ai_admin.insertion_expired);
          end_time_picker.css ("border-color", "#d00");
        } else {
            if (time_only) {
              var duration = (end_time - start_time) / 1000;

              var hours   = Math.floor (duration / 3600);
              var duration = duration - hours * 3600;

              var minutes = Math.floor (duration / 60);
              var duration = duration - minutes * 60;

              var seconds = duration;

              var title = ' ' + ai_admin.duration + ': ' + ('0'  + hours).slice (-2)+':'+('0'  + minutes).slice (-2)+':'+('0' + seconds).slice (-2);
            } else {
                var duration = Math.floor ((end_time - start_time) / 1000 / 3600 / 24);
                var title = ' ' + ai_admin.duration + ': ' + duration + ' ';
                switch (duration) {
                  case 0:
                    title = title + ai_admin.days_0;
                    break;
                  case 1:
                    title = title + ai_admin.days_1;
                    break;
                  case 2:
                    title = title + ai_admin.days_2;
                    break;
                  case 3:
                    title = title + ai_admin.days_3;
                    break;
                  case 4:
                    title = title + ai_admin.days_4;
                    break;
                  default:
                    title = title + ai_admin.days_5;
                    break;
                }
              }

            end_date_picker.attr ('title', title);
            end_time_picker.attr ('title', title);
          }
      }
    } else {
        end_date_picker.attr ('title', ai_admin.invalid_end_date);
        end_date_picker.css ("border-color", "#d00");
        end_time_picker.attr ('title', ai_admin.invalid_end_date);
        end_time_picker.css ("border-color", "#d00");
      }

    end_date_picker
      .tooltip({
        track: true,
        delay: 700,
        showURL: false,
        showBody: " | ",
        fade: 250
      });
    end_time_picker
      .tooltip({
        track: true,
        delay: 700,
        showURL: false,
        showBody: " | ",
        fade: 250
      });
  }

  function process_chart_dates (block) {
    var start_date_picker = $("input#chart-start-date-"+block);
    var end_date_picker   = $("input#chart-end-date-"+block);
    var start_date = ai_get_date (start_date_picker);
    var end_date   = ai_get_date (end_date_picker);

    start_date_picker.attr ('title', '');
    start_date_picker.css ("border-color", "rgb(221, 221, 221)");
    end_date_picker.attr ('title', '');
    end_date_picker.css ("border-color", "rgb(221, 221, 221)");

    if (start_date == null) {
      end_date_picker.attr ('title', '');
    } else
    if (end_date == null) {
      end_date_picker.attr ('title', '');
    } else
    if (end_date >= start_date) {
      var now = new Date();
      var today_date = new Date (now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
      if (today_date - start_date > 366 * 24 * 3600 * 1000) {
        start_date_picker.attr ('title', ai_admin.invalid_start_date);
        start_date_picker.css ("border-color", "#d00");
      }
      if (end_date - start_date > 366 * 24 * 3600 * 1000) {
        end_date_picker.attr ('title', ai_admin.invalid_date_range);
        end_date_picker.css ("border-color", "#d00");
      }
    } else {
        end_date_picker.attr ('title', ai_admin.invalid_end_date);
        end_date_picker.css ("border-color", "#d00");
      }
  }

  function process_display_elements (block) {

    $("#paragraph-settings-"+block).hide();
    $("#paragraph-buttons-"+block).hide();
    $("#image-settings-"+block).hide();

    var filter_attr = $("#filter-settings-"+block).attr ('data-filter');
    var filter_settings_active = typeof filter_attr !== typeof undefined && filter_attr !== false;
    $("#filter-settings-"+block).removeAttr ('data-filter').hide();
    $("#filter-buttons-"+block).hide();

    $("#html-element-settings-"+block).hide();

    $("#inside-element-"+block).hide();

    var automatic_insertion = $("select#insertion-type-"+block+" option:selected").attr('value');

    if (automatic_insertion == AI_BEFORE_PARAGRAPH || automatic_insertion == AI_AFTER_PARAGRAPH) {
//      $("#paragraph-text-"+block).text (ai_admin.paragraphs).show();
      $("#paragraph-buttons-"+block).show();
      $("#paragraph-settings-"+block+ ' input').attr('title', $("#paragraph-settings-"+block+ ' input').attr('data-title-paragraphs'))
        .tooltip({
          track: true,
          delay: 700,
          showURL: false,
          showBody: " | ",
          fade: 250
        });
      $("#paragraph-settings-"+block).show();
    }
    else if (automatic_insertion == AI_BEFORE_IMAGE || automatic_insertion == AI_AFTER_IMAGE) {
//      $("#paragraph-text-"+block).text (ai_admin.images).show();
      $("#paragraph-buttons-"+block).hide();
      $("#paragraph-settings-"+block + ' input').attr('title', $("#paragraph-settings-"+block+ ' input').attr('data-title-images'))
        .tooltip({
          track: true,
          delay: 700,
          showURL: false,
          showBody: " | ",
          fade: 250
        });
      $("#paragraph-settings-"+block).show();
      $("#paragraph-counting-"+block).hide();
      $("#paragraph-clearance-"+block).hide();
    }
    else if (automatic_insertion == AI_BEFORE_EXCERPT || automatic_insertion == AI_AFTER_EXCERPT || automatic_insertion == AI_BETWEEN_POSTS || automatic_insertion == AI_BETWEEN_COMMENTS) {
      $("#filter-buttons-"+block).show();
      var filter_title = '';
      if (automatic_insertion == AI_BEFORE_EXCERPT || automatic_insertion == AI_AFTER_EXCERPT) {
//        $("#filter-text-"+block).text (ai_admin.excerpts).show();
        filter_title = $("#filter-settings-"+block+ ' input').attr('data-title-excerpts');
      }
      else if (automatic_insertion == AI_BETWEEN_POSTS) {
//        $("#filter-text-"+block).text (ai_admin.posts).show();
        filter_title = $("#filter-settings-"+block+ ' input').attr('data-title-posts');
      }
      else if (automatic_insertion == AI_BETWEEN_COMMENTS) {
//        $("#filter-text-"+block).text (ai_admin.comments).show();
        filter_title = $("#filter-settings-"+block+ ' input').attr('data-title-comments');
      }
      $("#filter-settings-"+block + ' input').attr('title', filter_title)
        .tooltip({
          track: true,
          delay: 700,
          showURL: false,
          showBody: " | ",
          fade: 250
        });
      $("#filter-settings-"+block).attr ('data-filter', '1').show();
      $("#paragraph-counting-"+block).hide();
      $("#paragraph-clearance-"+block).hide();
    }
    else {
      $("#paragraph-counting-"+block).hide();
      $("#paragraph-clearance-"+block).hide();
    }

    var new_filter_attr = $("#filter-settings-"+block).attr ('data-filter');
    var new_filter_settings_active = typeof new_filter_attr !== typeof undefined && new_filter_attr !== false;

    if (filter_settings_active && !new_filter_settings_active) {
      $("#filter-settings-"+block + ' input').val ('');

      $("input#filter-numbers-"+block).val ('');
      $("select#filter-type-"+block).val (0);
      $("input#invert-filter-"+block).removeAttr ('checked');
    }

    if (automatic_insertion == AI_BEFORE_HTML_ELEMENT || automatic_insertion == AI_AFTER_HTML_ELEMENT || automatic_insertion == AI_INSIDE_HTML_ELEMENT) {
      $("#html-element-settings-"+block).show();

      if (automatic_insertion == AI_INSIDE_HTML_ELEMENT) {
        $("#inside-element-"+block).css ('display', 'table-cell');
      }
    }

    var content_settings = automatic_insertion == AI_BEFORE_PARAGRAPH || automatic_insertion == AI_AFTER_PARAGRAPH || automatic_insertion == AI_BEFORE_CONTENT || automatic_insertion == AI_AFTER_CONTENT;

    $("#css-label-"+block).css('display', 'table-cell');
    $("#edit-css-button-"+block).css('display', 'table-cell');

    $("#css-none-"+block).hide();
    $("#custom-css-"+block).hide();
    $("#css-left-"+block).hide();
    $("#css-right-"+block).hide();
    $("#css-center-"+block).hide();
    $("#css-float-left-"+block).hide();
    $("#css-float-right-"+block).hide();
    $("#css-sticky-left-"+block).hide();
    $("#css-sticky-right-"+block).hide();
    $("#css-sticky-top-"+block).hide();
    $("#css-sticky-bottom-"+block).hide();
    $("#css-sticky-"+block).hide();
    $("#css-no-wrapping-"+block).hide();

    $("#no-wrapping-warning-"+block).hide();

    $("#sticky-position-"+block).hide();
    $("#sticky-animation-"+block).hide();
    $("#sticky-background-"+block).hide();
    $("#sticky-background-"+block).find ('.bkg-parameters').hide();

    $('#tracking-wrapping-warning-' + block).hide ();

    var alignment = $("select#block-alignment-"+block+" option:selected").attr('value');

    if (alignment == AI_ALIGNMENT_NO_WRAPPING) {
      $("#css-no-wrapping-"+block).css('display', 'table-cell');
      $("#css-label-"+block).hide();
      $("#edit-css-button-"+block).hide();
      if ($("#client-side-detection-"+block).is(":checked")) {
        $("#no-wrapping-warning-"+block).show();
      }

      if ($('#tracking-' + block).next ().find ('.checkbox-icon').hasClass ('on')) {
        $('#tracking-wrapping-warning-' + block).show ();
      }
    } else
    if (alignment == AI_ALIGNMENT_DEFAULT) {
      $("#css-none-"+block).css('display', 'table-cell');
    } else
    if (alignment == AI_ALIGNMENT_CUSTOM_CSS) {
      $("#icons-css-code-" + block).show();
      $("#custom-css-"+block).show();
      configure_selection_icons (block);
      if (is_sticky ($("#custom-css-"+block).val ())) {
        $("#sticky-position-"+block).show();
        $("#sticky-animation-"+block).show();
        $("#sticky-background-"+block).show();
        $("select#animation-"+block).change ();

        if (is_background ($("#custom-css-"+block).val ()) && $("input#background-"+block).is(":checked")) {
          $("#sticky-background-"+block).find ('.bkg-parameters').show();
        }
      }
    } else
    if (alignment == AI_ALIGNMENT_LEFT) {
      $("#css-left-"+block).css('display', 'table-cell');
    } else
    if (alignment == AI_ALIGNMENT_RIGHT) {
      $("#css-right-"+block).css('display', 'table-cell');
    } else
    if (alignment == AI_ALIGNMENT_CENTER) {
      $("#css-center-"+block).css('display', 'table-cell');
    } else
    if (alignment == AI_ALIGNMENT_FLOAT_LEFT) {
      $("#css-float-left-"+block).css('display', 'table-cell');
    } else
    if (alignment == AI_ALIGNMENT_FLOAT_RIGHT) {
      $("#css-float-right-"+block).css('display', 'table-cell');
    } else
    if (alignment == AI_ALIGNMENT_STICKY_LEFT) {
      $("#css-sticky-left-"+block).css('display', 'table-cell');
    } else
    if (alignment == AI_ALIGNMENT_STICKY_RIGHT) {
      $("#css-sticky-right-"+block).css('display', 'table-cell');
    }
    if (alignment == AI_ALIGNMENT_STICKY_TOP) {
      $("#css-sticky-top-"+block).css('display', 'table-cell');
    } else
    if (alignment == AI_ALIGNMENT_STICKY_BOTTOM) {
      $("#css-sticky-bottom-"+block).css('display', 'table-cell');
    } else
    if (alignment == AI_ALIGNMENT_STICKY) {
      $("#icons-css-code-" + block).show();
      $("#sticky-position-"+block).show();
      $("#sticky-animation-"+block).show();
      $("#sticky-background-"+block).show();
      $("select#animation-"+block).change ();

      if ($("select#horizontal-position-"+block+" option:selected").attr('value') == AI_STICK_HORIZONTAL_CENTER && $("input#background-"+block).is(":checked")) {
        $("#sticky-background-"+block).find ('.bkg-parameters').show();
      }

      $("#css-sticky-"+block).css('display', 'table-cell');
      configure_selection_icons (block);
    }


    if ($('#icons-css-code-'+block).css ('display') != 'none') {
//        $("#show-css-button-"+block+" span").text (ai_admin.hide);
//      $("#show-css-button-"+block).addClass ('light-blue');
    } else {
//        $("#show-css-button-"+block+" span").text (ai_admin.show);
//        $("#show-css-button-"+block).removeClass ('light-blue');
      }

    var avoid_action = $("select#avoid-action-"+block+" option:selected").text();

    if (avoid_action == "do not insert")
      $("#check-up-to-"+block).hide (); else
        $("#check-up-to-"+block).show ();


    $("#scheduling-delay-"+block).hide();
    $("#scheduling-between-dates-1-"+block).hide();
    $("#scheduling-between-dates-2-"+block).hide();
    $("#scheduling-delay-warning-"+block).hide();
    var scheduling = $("select#scheduling-"+block).val();
    if (scheduling == "1" || scheduling == "3") {
        $("#scheduling-delay-"+block).show();
    } else
    if (scheduling == "2" || scheduling == "4" || scheduling == "5" || scheduling == "6") {
      $("#scheduling-between-dates-1-"+block).show();
      $("#scheduling-between-dates-2-"+block).show();
      process_scheduling_dates (block);
    }

    $("#adb-block-replacement-"+block).hide();
    var adb_block_action = $("select#adb-block-action-"+block).val();
    if (adb_block_action == AI_ADB_BLOCK_ACTION_REPLACE) {
      $("#adb-block-replacement-"+block).show();
    }

    if ($("#exceptions-enabled-" + block).is(":checked")) {
      $("#default-insertion-"+block).show();
    } else {
        $("#default-insertion-"+block).hide();
      }

    if (syntax_highlighting) configure_editor_language (block);

    check_insertion (block);
  }

  function process_adsense_elements (block) {
    var adsense_type  = parseInt ($("select#adsense-type-" + block +" option:selected").attr ('value'));
    var adsense_size  = parseInt ($("select#adsense-size-" + block +" option:selected").attr ('value'));

    if ((adsense_type == AI_ADSENSE_STANDARD || adsense_type == AI_ADSENSE_LINK) && adsense_size == AI_ADSENSE_SIZE_FIXED_BY_VIEWPORT) {
      $('#adsense-layout-' + block).hide ();
      $('#adsense-viewports-' + block).show ();
    } else {
        $('#adsense-layout-' + block).show ();
        $('#adsense-viewports-' + block).hide ();
      }

    $('#tab-adsense-' + block + ' .adsense-layout').css ('visibility', 'hidden');
    $('#tab-adsense-' + block + ' .adsense-fixed-size').show ();
    $('#tab-adsense-' + block + ' .adsense-fixed-size').css ('visibility', 'hidden');
    $('#tab-adsense-' + block + ' .adsense-size').css ('visibility', 'hidden');
    $('#tab-adsense-' + block + ' .adsense-full-width-responsive').hide ();

    switch (adsense_type) {
      case AI_ADSENSE_STANDARD:
        $('#tab-adsense-' + block + ' .adsense-size').css ('visibility', 'visible');
        if (adsense_size == AI_ADSENSE_SIZE_FIXED) $('#tab-adsense-' + block + ' .adsense-fixed-size').css ('visibility', 'visible');
        if (adsense_size == AI_ADSENSE_SIZE_RESPONSIVE) {
          $('#tab-adsense-' + block + ' .adsense-fixed-size').hide ();
          $('#tab-adsense-' + block + ' .adsense-full-width-responsive').show ();
        }
        break;
      case AI_ADSENSE_LINK:
        $('#tab-adsense-' + block + ' .adsense-size').css ('visibility', 'visible');
        if (adsense_size == AI_ADSENSE_SIZE_FIXED) $('#tab-adsense-' + block + ' .adsense-fixed-size').css ('visibility', 'visible');
        if (adsense_size == AI_ADSENSE_SIZE_RESPONSIVE) {
          $('#tab-adsense-' + block + ' .adsense-fixed-size').hide ();
          $('#tab-adsense-' + block + ' .adsense-full-width-responsive').show ();
        }
        break;
      case AI_ADSENSE_IN_ARTICLE:
        break;
      case AI_ADSENSE_IN_FEED:
        $('#tab-adsense-' + block + ' .adsense-layout').css ('visibility', 'visible');
        break;
      case AI_ADSENSE_MATCHED_CONTENT:
        break;
    }
  }

  function process_amazon_elements (block) {
    $('#tab-amazon-' + block + ' .amazon-amp-data').hide ();
    var amzon_amp = parseInt ($("select#amazon-amp-" + block +" option:selected").attr ('value'));

    if (amzon_amp == 1) {
      $('#tab-amazon-' + block + ' .amazon-amp-data').show ();
    }
  }

  function switch_editor (block, editor_disabled) {
    var editor = ace.edit ("editor-" + block);
    var textarea = $("#block-" + block);
    var ace_editor = $("#editor-" + block);

    if (editor_disabled) {
      textarea.val (editor.session.getValue());
      textarea.css ('display', 'block');
      ace_editor.css ('display', 'none');
    } else {
        editor.session.setValue (textarea.val ())
        editor.renderer.updateFull();
        ace_editor.css ('display', 'block');
        textarea.css ('display', 'none');
      }
  }

  function configure_editor (block) {

    if (debug) console.log ("configure_editor:", block);

    if (syntax_highlighting) {
      var syntax_highlighter = new SyntaxHighlight ('#block-' + block, block, shSettings);
//      syntax_highlighter.editor.setPrintMarginColumn (1000);
      setTimeout (function() {syntax_highlighter.editor.setPrintMarginColumn (1000);}, 50);

      $('input#simple-editor-' + block).change (function () {
        var block = $(this).attr ("id").replace ("simple-editor-","");
        var editor_disabled = $(this).is(":checked");
        switch_editor (block, editor_disabled);
      });
    }
  }

  function configure_adb () {
    $("#adb-message").hide();
    $("#adb-page-redirection").hide();

    var adb_action = $("select#adb-action option:selected").attr('value');

    if (adb_action == AI_ADB_ACTION_MESSAGE) {
      $("#adb-message").show();
    } else
    if (adb_action == AI_ADB_ACTION_REDIRECTION) {
      $("#adb-page-redirection").show();
    }
  }

  function export_statistics_pdf (block) {
    var code = $('<section>' + $("div#statistics-elements-" + block).html () + '</section>');

    $('div[style*="display: none"], div[style*="display:none"]', code).remove ();
    $('.ai-toolbar-button', code).remove ();
    $('.ai-chart-container', code).css ('font-size', '10px');
    $('.ai-chart-container.versions', code).css ('text-align', 'center');
    $('.ai-statistics-legend', code).after ($('.ai-chart-container.legend', code).html());

    var param = {'action': 'ai_ajax_backend', 'pdf': 'block', 'ai_check': ai_nonce, 'code': b64e ($(code).html ())};
    $('#ai-loading').show ();
    setTimeout (function() {open_window_post (ajaxurl, '_blank', param);}, 5);
    setTimeout (function() {$('#ai-loading').hide ();}, 1000);
  }

  function export_statistics_csv (block) {
    $('#ai-loading').show ();
    $("span#export-csv-button-"+block).addClass ('on');
    setTimeout (function() {$("input#load-custom-range-"+block).click ();}, 5);
    setTimeout (function() {$('#ai-loading').hide ();}, 1000);
  }

  function configure_statistics_toolbar (tab) {
    $("input#load-custom-range-"+tab).click (function () {
      var block = $(this).attr ("id");
      block = block.replace ("load-custom-range-","");

      var label = $(this).next ().find ('.checkbox-icon');
      label.addClass ('on');

      var start_date = $("input#chart-start-date-" + block).val ();
      var end_date = $("input#chart-end-date-" + block).val ();
      var container = $("div#statistics-elements-" + block);

      var version_charts_container = $("div#ai-version-charts-" + block);
      var version_charts_container_visible = version_charts_container.is (':visible');

      var delete_range = '';
      if ($("input#clear-range-"+block).hasClass ('delete')) {
        delete_range = '&delete=1';
      }

      var adb = '';
      if ($("input#adb-statistics-button-"+block).next ().find ('.icon-adb').hasClass ('on')) {
        adb = '&adb=1';
      }

      var version = '';
      var version_index = 0;
      if ($('input#load-custom-range-' + block).hasClass ('ai-version')) {
        version_index = $('input#load-custom-range-' + block).attr ('data-version');
        version = '&version=' + version_index;
      }

      if ($("span#export-csv-button-"+block).hasClass ('on')) {
        $("span#export-csv-button-"+block).removeClass ('on');

        var params = {'action': 'ai_ajax_backend', 'statistics': block,
          'start-date': start_date,
          'end-date': end_date,
          'delete_range': delete_range == '' ? '' : 1,
          'adb': adb == '' ? '' : 1,
          'version': version == '' ? '' : version_index,
          'csv' : 1, 'ai_check': ai_nonce};

        var form = document.createElement("form");
        form.setAttribute("method", "get");
        form.setAttribute("action", ajaxurl);
        for (var i in params) {
          if (params.hasOwnProperty(i)) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = i;
            input.value = encodeURI (params[i]);
            form.appendChild(input);
          }
        }
        document.body.appendChild (form);
        form.submit();
        document.body.removeChild (form);

        label.removeClass ('on');
        return;
      }

      container.load (ajaxurl+"?action=ai_ajax_backend&statistics=" + block + "&start-date=" + start_date + "&end-date=" + end_date + delete_range + adb + version + "&ai_check=" + ai_nonce, function (response, status, xhr) {
        label.removeClass ('on');
        if ( status == "error" ) {
          var message = "Error downloading data: " + xhr.status + " " + xhr.statusText ;
          $("div#load-error-" + block).html (message);
          if (debug) console.log (message);
        } else {
            $("span#export-pdf-button-" + block).show ();
            $("span#export-csv-button-" + block).show ();
            var public_report_button = $("#ai-main-toolbar-" + block + ' .public-report-button');
            public_report_button.show ();

            var urls = container.find ('span.ai-statistics-export-data.ai-public-report');
            public_report_button.attr ('report-data', JSON.stringify (urls.data ('report')));

            urls.remove ();

            $( "div#load-error-" + block).html ('');
            if (debug) console.log ("Custom statistics loaded: " + block);
            configure_charts (container);

            container.find ("label.ai-version-charts-button.not-configured").click (function () {
              var no_delay_version_charts = $(this).hasClass ('no-version-charts-delay');

              $(this).removeClass ('not-configured');
              var version_charts_container = $(this).closest (".ai-charts").find ('div.ai-version-charts');
              version_charts_container.toggle ();

              var not_configured_charts = version_charts_container.find ('.ai-chart.not-configured.hidden');
              if (not_configured_charts.length) {
                not_configured_charts.each (function() {
                  $(this).removeClass ('hidden');
                });
                if (no_delay_version_charts) {
                  configure_charts (version_charts_container);
                } else setTimeout (function() {configure_charts (version_charts_container);}, 10);
              }
            });

            if (version_charts_container_visible) {
              container.find ("label.ai-version-charts-button.not-configured").addClass ('no-version-charts-delay').click ();
            }

            $("input#chart-start-date-"+block).css ('color', '#32373c');
            $("input#chart-end-date-"+block).css ('color', '#32373c');
          }
      });
    });

    $("input#auto-refresh-"+tab).click (function () {
      var block = $(this).attr ("id");
      block = block.replace ("auto-refresh-","");
      var label = $(this).next ().find ('.checkbox-icon');
      label.toggleClass ('on');
      if (label.hasClass ('on')) {
        reload_statistics (block);
      }
    });

    $("input#clear-range-"+tab).click (function () {
      var block = $(this).attr ("id");
      block = block.replace ("clear-range-","");

      var delete_button = this;
//      var start_date = $("input#chart-start-date-" + block).attr('value');
      var start_date = $("input#chart-start-date-" + block).val ();
//      var end_date = $("input#chart-end-date-" + block).attr('value');
      var end_date = $("input#chart-end-date-" + block).val ();

      var message = '';
      if (start_date == '' && end_date == '')
        var message = ai_admin.delete_all_statistics; else
          if (start_date != '' && end_date != '') var message = ai_admin.delete_statistics_between.replace ('{start_date}', start_date).replace ('{end_date}', end_date);

      if (message != '')
        $('<div />').html(message).attr ('title', ai_admin.warning).dialog({
          bgiframe: true,
          draggable: false,
          resizable: false,
          modal: true,
          height: "auto",
          width: 400,
          position: {my: 'center', at: 'center', of: '#ai-settings'},
          buttons: [{
            text: ai_admin.delete,
            click: function() {
              $(this).dialog ("close");

              $(delete_button).addClass ('delete');
              $("input#load-custom-range-"+block).click ();
              $(delete_button).removeClass ('delete');
            }
            },{
            text: ai_admin.cancel,
            click: function() {
              $(this).dialog ("close");
            }
            }
          ],
          open: function() {$(this).parent ().find ('button:nth-child(2)').focus();}
        });
    });

    $("input#chart-start-date-"+tab).datepicker ({dateFormat: dateFormat, autoSize: true});
    $("input#chart-end-date-"+tab).datepicker ({dateFormat: dateFormat, autoSize: true});

    $("input#chart-start-date-"+tab).change (function() {
      $(this).closest (".custom-range-controls").find ('.data-range').removeClass ('selected');
      var custom_range_controls = $(this).closest (".custom-range-controls");
      custom_range_controls.attr ('range-name', '----');

      disable_auto_refresh_statistics ();
      var block = $(this).attr('id').replace ("chart-start-date-", "");
      $(this).css ('color', 'red');
      process_chart_dates (block);
    });

    $("input#chart-end-date-"+tab).change (function() {
      $(this).closest (".custom-range-controls").find ('.data-range').removeClass ('selected');
      var custom_range_controls = $(this).closest (".custom-range-controls");
      custom_range_controls.attr ('range-name', '----');

      disable_auto_refresh_statistics ();
      var block = $(this).attr('id').replace ("chart-end-date-", "");
      $(this).css ('color', 'red');
      process_chart_dates (block);
    });

    $("div#custom-range-controls-"+tab+" span.data-range").click (function () {
      var custom_range_controls = $(this).closest (".custom-range-controls");
      custom_range_controls.find ('.data-range').removeClass ('selected');
      $(this).addClass ('selected');
      custom_range_controls.attr ('range-name', $(this).data ("range-name"));

      disable_auto_refresh_statistics ();
      var id = $(this).closest (".custom-range-controls").attr ("id");
      block = id.replace ("custom-range-controls-","");
//      $("input#chart-start-date-"+block).attr ("value", $(this).data ("start-date"));
      $("input#chart-start-date-"+block).attr ("value", $(this).data ("start-date")).val ($(this).data ("start-date"));
//      $("input#chart-end-date-"+block).attr ("value", $(this).data ("end-date"));
      $("input#chart-end-date-"+block).attr ("value", $(this).data ("end-date")).val ($(this).data ("end-date"));
      process_chart_dates (block);
      $("input#load-custom-range-"+block).click ();
    });
  }

  function configure_tab_0 () {

    if (debug) console.log ("Configure tab: 0");

    $('#tab-0').addClass ('configured');

    $('#tab-0 input[type=submit], #tab-0 button.ai-button').button().show ();

    configure_editor ('h');
    configure_editor ('f');
    if ($("#block-a").length)
    configure_editor ('a');

    $('#ai-plugin-settings-tab-container').tabs();
    $('#ai-plugin-settings-tabs').show();

    $("#export-switch-0").checkboxButton ().click (function () {
//      $("#export-container-0").toggle ();
      $(".export-0").toggle ();

      if (!$("#export-container-0").is (':visible')) {
        // Restore textarea with laoded settings
        $("#export_settings_0").val ($("#export_settings_0").text ());

      }

      if ($("#export-container-0").is(':visible') && !$(this).hasClass ("loaded")) {
        $("#export_settings_0").load (ajaxurl+"?action=ai_ajax_backend&export=0&ai_check=" + ai_nonce, function (response, status, xhr) {
          if (status == "error" ) {
            $('#ai-error-container').text (ai_admin.error + ' ' + xhr.status + ': ' + xhr.statusText).show ();
          } else {
              $("#export_settings_0").attr ("name", "export_settings_0");

              $("#export-switch-0").addClass ("loaded");
            }

        });
      }

    });

    $("#load-settings-0").change (function (e) {
      // getting a hold of the file reference
      var file = e.target.files [0];

      // setting up the reader
      var reader = new FileReader ();
      reader.readAsText (file,'UTF-8');

      // here we tell the reader what to do when it's done reading...
      reader.onload = function (readerEvent) {
        var content = readerEvent.target.result;
        $("#export_settings_0").val (content);

        jQuery ('#load-settings-0').val ('');
      }
    });

    $("#save-settings-0").click (function () {

      var params = {'action': 'ai_ajax_backend', 'export': 0, 'file': 1, 'ai_check': ai_nonce};

      var form = document.createElement("form");
      form.setAttribute("method", "get");
      form.setAttribute("action", ajaxurl);
      for (var i in params) {
        if (params.hasOwnProperty(i)) {
          var input = document.createElement('input');
          input.type = 'hidden';
          input.name = i;
          input.value = encodeURI (params[i]);
          form.appendChild (input);
        }
      }
      document.body.appendChild (form);
      form.submit ();
      document.body.removeChild (form);
    });

    $("input#process-php-h").change (function() {
      if (syntax_highlighting) configure_editor_language ('h');
    });

    $("input#process-php-f").change (function() {
      if (syntax_highlighting) configure_editor_language ('f')
    });

    $("input#process-php-a").change (function() {
      if (syntax_highlighting) configure_editor_language ('a')
    });

    if (syntax_highlighting) configure_editor_language ('h');
    if (syntax_highlighting) configure_editor_language ('f');
    if ($("#block-a").length)
    if (syntax_highlighting) configure_editor_language ('a');

    for (var index = 1; index <= geo_groups; index ++) {
      create_list_selector ('group-country', index);
    }

    $('#enable-header').checkboxButton ();
    $('#enable-header-404').checkboxButton ();

    $('#simple-editor-h').checkboxButton ().click (function () {
        var tab_id = $("#ai-plugin-settings-tab-container .ui-tabs-panel:visible").attr("id");
        if (active_tab == 0 && tab_id == 'tab-header' && !$(this).hasClass ('clicked')) {
          $(this).addClass ('clicked')
          $('#ai-tab-container .simple-editor-button').click();
          $(this).removeClass ('clicked')
        }
    });
    // Switch to simple editor if the button was pressed before the tab was configured
    if ($('#simple-editor-h').is(":checked")) {
      switch_editor ('h', true);
      $('#simple-editor-h').next ("label").find ('.checkbox-icon').addClass("on");
    }

    $('#process-php-h').checkboxButton ();

    $('#enable-footer').checkboxButton ();
    $('#enable-footer-404').checkboxButton ();

    $('#simple-editor-f').checkboxButton ().click (function () {
        var tab_id = $("#ai-plugin-settings-tab-container .ui-tabs-panel:visible").attr("id");
        if (active_tab == 0 && tab_id == 'tab-footer' && !$(this).hasClass ('clicked')) {
          $(this).addClass ('clicked')
          $('#ai-tab-container .simple-editor-button').click();
          $(this).removeClass ('clicked')
        }
    });
    // Switch to simple editor if the button was pressed before the tab was configured
    if ($('#simple-editor-f').is(":checked")) {
      switch_editor ('f', true);
      $('#simple-editor-f').next ("label").find ('.checkbox-icon').addClass("on");
    }

    $('#process-php-f').checkboxButton ();

    $('#tracking').checkboxButton ();

    configure_statistics_toolbar (0);

    $("input#statistics-button-0").checkboxButton ().click (function () {
      $("div#statistics-container-0").toggle ();
      $("span#export-pdf-button-0").toggle ();
      $("span#export-csv-button-0").toggle ();
      $("div#tab-tracking-settings").toggle ();
      var container = $("div#statistics-container-0");
      if (container.is(':visible')) {
        if (!$(this).hasClass ('loaded')) {
          $("input#load-custom-range-0").click ();
          $(this).addClass ('loaded');
        }
      }
    });

    $("#export-pdf-button-0").click (function () {
      export_statistics_pdf (0);
    });

    $("#export-csv-button-0").click (function () {
      export_statistics_csv (0);
    });

    $('#enable-adb-detection').checkboxButton ();

    $('#simple-editor-a').checkboxButton ().click (function () {
        var tab_id = $("#ai-plugin-settings-tab-container .ui-tabs-panel:visible").attr("id");
        if (active_tab == 0 && tab_id == 'tab-adblocking' && !$(this).hasClass ('clicked')) {
          $(this).addClass ('clicked')
          $('#ai-tab-container .simple-editor-button').click();
          $(this).removeClass ('clicked')
        }
    });
    // Switch to simple editor if the button was pressed before the tab was configured
    if ($('#simple-editor-a').is(":checked")) {
      switch_editor ('a', true);
      $('#simple-editor-a').next ("label").find ('.checkbox-icon').addClass("on");
    }

    $('#process-php-a').checkboxButton ();


    configure_adb ();
    $("select#adb-action").change (function() {
      configure_adb ();
    });

    $("#preview-button-adb").button ({
    }).show ().click (function () {

      $(this).blur ();

      var code = b64e (get_editor_text ('a'));
      var php =  $("input#process-php-a").is(":checked") ? 1 : 0;

      var window_width = 820;
      var window_height = 870;
      var window_left  = 100;
      var window_top   = (screen.height / 2) - (870 / 2);
//      var nonce = $(this).attr ('nonce');
      var param = {'action': 'ai_ajax_backend', 'preview': 'adb', 'ai_check': ai_nonce, 'code': code, 'php': php};
      open_popup_window_post (ajaxurl, 'width='+window_width+',height='+window_height+',top='+window_top+',left='+window_left+',resizable=yes,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no', 'preview', param);
    });

    $("#main-content-element-button").click (function () {
      var selector      = $("input#main-content-element").val ();
      var home_url      = $("#ai-settings").data ('home-relative-url');
      var window_top    = screen.availTop;
      var window_left   = screen.availLeft;
      var window_width  = screen.availWidth - 15;
      var window_height = screen.availHeight - 65;

      var param = {
        'html_element_selection': 'main',
        'selector':               selector,
        'input':                  "input#main-content-element"
      };
      open_popup_window_post (home_url, 'width='+window_width+',height='+window_height+',top='+window_top+',left='+window_left+',resizable=yes,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no', 'ai-selector', param);
    });

    $("#custom-selectors-button").click (function () {
      var selector      = $("input#custom-selectors").val ();
      var home_url      = $("#ai-settings").data ('home-relative-url');
      var window_top    = screen.availTop;
      var window_left   = screen.availLeft;
      var window_width  = screen.availWidth - 15;
      var window_height = screen.availHeight - 65;

      var param = {
        'html_element_selection': 'adb',
        'selector':               selector,
        'input':                  "input#custom-selectors"
      };
      open_popup_window_post (home_url, 'width='+window_width+',height='+window_height+',top='+window_top+',left='+window_left+',resizable=yes,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no', 'ai-selector', param);
    });

    $('#disable-header-code').checkboxButton ();
    $('#disable-footer-code').checkboxButton ();
    $('#disable-js-code').checkboxButton ();
    $('#disable-css-code').checkboxButton ();
    $('#disable-html-code').checkboxButton ();
    $('#disable-php-processing').checkboxButton ();
    $('#disable-blocks').checkboxButton ();

    $("input#disable-header-code").change (function() {
      $('#ai-page-header').toggleClass ('ai-page-code-disabled');
    });

    $("input#disable-footer-code").change (function() {
      $('#ai-page-footer').toggleClass ('ai-page-code-disabled');
    });

    $("input#disable-js-code").change (function() {
      $('#ai-page-js').toggleClass ('ai-page-code-disabled');
    });

    $("input#disable-css-code").change (function() {
      $('#ai-page-css').toggleClass ('ai-page-code-disabled');
    });

    $("input#disable-html-code").change (function() {
      $('#ai-page-html').toggleClass ('ai-page-code-disabled');
    });

    $("input#disable-php-processing").change (function() {
      $('#ai-page-php').toggleClass ('ai-page-code-disabled');
    });

    $("input#disable-blocks").change (function() {
      $('#ai-page-block').toggleClass ('ai-page-code-disabled');
    });

    $("#report-header-image-button").click (function (event) {
      $(this).blur ();

      var frame;

      event.preventDefault();

      if (frame) {
        frame.open();
        return;
      }

      frame = wp.media ({
        title: ai_admin.select_header_image,
        button: {
          text: ai_admin.use_this_image
        },
        multiple: false  // Set to true to allow multiple files to be selected
      });

      frame.on ('select', function() {
        var attachment = frame.state().get('selection').first().toJSON();
//        console.log ('attachment', attachment);
        $('#report-header-image').val (attachment.url);
      });

      frame.open();
    });

    $("#tab-0 .adsense-list").click (function () {
      $(this).blur ();

      toggle_adsense_list ();
    });

    $("#ai-blocked-ip-addresses").click (function () {
      ip_address = $("#ai-blocked-ip-addresses").attr ('delete');
      $("#ai-blocked-ip-addresses").removeAttr ('delete');

      if (ip_address == null) ip_address = '';

      $('#ai-blocked-ip-addresses-list').load (ajaxurl + '?action=ai_ajax_backend&cfp-ip-address-list='+ip_address+'&ai_check=' + ai_nonce, function (response, status, xhr) {
        if (status == "error") {
          var message = "Error loading CFP IP addresses: " + xhr.status + " " + xhr.statusText ;
          console.log (message);
        } else {
            var text = $('#ai-blocked-ip-addresses-list table').data ('count-text');
            if (text == null) text = '';

            $("#ai-blocked-ip-addresses").text (text);

            $(".cfp-ip-address").click (function () {
              var ip_address = $(this).closest ('tr').data ('ip-address');

              setTimeout (function() {
                $("#ai-blocked-ip-addresses").attr ('delete', ip_address).click ();
              }, 10);
            });
          }
      });
    });

  }

  function configure_tab (tab) {

    if (debug) console.log ("Configure tab:", tab);

    $('#tab-' + tab).addClass ('configured');

    $('#tab-' + tab + ' input[type=submit], #tab-' + tab + ' button.ai-button').button().show ();

    configure_editor (tab);

    $("select#insertion-type-"+tab).change (function() {
      var block = $(this).attr('id').tabIndex ();
      process_display_elements (block);
      set_page_statuses (block);
    });

    $("select#block-alignment-"+tab).change (function() {
      var block = $(this).attr('id').replace ("block-alignment-", "");
      var alignment = $("select#block-alignment-"+block+" option:selected").attr('value');
      var automatic_insertion = $("select#insertion-type-"+block+" option:selected").attr('value');

      if (automatic_insertion != AI_ABOVE_HEADER &&
          (alignment == AI_ALIGNMENT_STICKY_LEFT ||
           alignment == AI_ALIGNMENT_STICKY_RIGHT ||
           alignment == AI_ALIGNMENT_STICKY_TOP || alignment ==
           AI_ALIGNMENT_STICKY_BOTTOM || alignment == AI_ALIGNMENT_STICKY)
         ) {
        $("select#insertion-type-"+block).val (AI_FOOTER).change ();
      }
      process_display_elements (block);
    });

    $("select#vertical-position-"+tab).change (function() {
      var block = $(this).attr('id').replace ("vertical-position-", "");
      configure_sticky_css (block);
    });

    $("select#horizontal-position-"+tab).change (function() {
      var block = $(this).attr('id').replace ("horizontal-position-", "");
      configure_sticky_css (block);
      process_display_elements (block);
    });

    $("input#horizontal-margin-"+tab).change (function() {
      var block = $(this).attr('id').replace ("horizontal-margin-", "");
      configure_sticky_css (block);
    });

    $("input#vertical-margin-"+tab).change (function() {
      var block = $(this).attr('id').replace ("vertical-margin-", "");
      configure_sticky_css (block);
    });

    $("select#animation-"+tab).change (function() {
      var block = $(this).attr('id').replace ("animation-", "");
      configure_sticky_css (block);
    });

    $("input#background-"+tab).change (function() {
      var block = $(this).attr('id').replace ("background-", "");
      check_insertion (block);
      configure_sticky_css (block);
      process_display_elements (block);
    });

    $("select#animation-"+tab).change (function() {
      var block = $(this).attr('id').replace ("animation-", "");
      configure_sticky_css (block);
    });

    $("input#bkg-image-url-"+tab).change (function() {
      var block = $(this).attr('id').replace ("bkg-image-url-", "");
      configure_sticky_css (block);
    });

    $("input#bkg-color-"+tab).change (function() {
      var block = $(this).attr('id').replace ("bkg-color-", "");
      configure_sticky_css (block);
    });

    if ($("input#bkg-color-"+tab).length != 0) {
      $("input#bkg-color-"+tab).colorpicker ({useAlpha: false, useHashPrefix: true, format: 'hex', fallbackColor: '#fffffe'}).on('colorpickerChange colorpickerCreate colorpickerUpdate', function (e) {
        var block = $(this).attr('id').replace ("bkg-color-", "");
        configure_sticky_css (block);
        $("#sticky-background-" + block).find ('.banner-preview').css ('background', $(this).val ());
      }).on ('input', function() {
        var block = $(this).attr('id').replace ("bkg-color-", "");
        configure_sticky_css (block);
        $("#sticky-background-" + block).find ('.banner-preview').css ('background', $(this).val ());
      })
      $("input#bkg-color-"+tab).colorpicker ('setValue', $("input#bkg-color-" + tab).attr ('value'));
    }

    $("select#bkg-repeat-"+tab).change (function() {
      var block = $(this).attr('id').replace ("bkg-repeat-", "");
      configure_sticky_css (block);
      process_display_elements (block);
    });

    $("select#bkg-size-"+tab).change (function() {
      var block = $(this).attr('id').replace ("bkg-size-", "");
      configure_sticky_css (block);
      process_display_elements (block);
    });


    if ($("input#block-bkg-color-"+tab).length != 0) {
//      $("input#block-bkg-color-"+tab).colorpicker ({useAlpha: false, useHashPrefix: true, format: 'hex', fallbackColor: '#fffffe'}).on('colorpickerChange colorpickerCreate colorpickerUpdate', function (e) {
      $("input#block-bkg-color-"+tab).colorpicker ({useAlpha: true, useHashPrefix: true, fallbackColor: '#fffffe'}).on('colorpickerChange colorpickerCreate colorpickerUpdate', function (e) {
        $("#block-color-" + tab).css ('background-color', $(this).val ());
      }).on ('input', function() {
        $("#block-color-" + tab).css ('background-color', $(this).val ());
      });
      $("input#block-bkg-color-"+tab).colorpicker ('setValue', $("input#block-bkg-color-" + tab).attr ('value'));
    }

    $("#block-color-" + tab).click (function() {
      $("input#block-bkg-color-"+tab).focus ();
    });

    $("input#exceptions-enabled-"+tab).change (function() {
      var block = $(this).attr('id').replace ("exceptions-enabled-", "");
      process_display_elements (block);
    });

    $("input#process-php-"+tab).change (function() {
      var block = $(this).attr('id').replace ("process-php-", "");
      process_display_elements (block);
    });
    $("input#show-label-"+tab).change (function() {
      var block = $(this).attr('id').replace ("show-label-", "");
//      process_display_elements (block);
    });
    $("#enable-shortcode-"+tab).change (function() {
      var block = $(this).attr('id').replace ("enable-shortcode-", "");
      process_display_elements (block);
    });
    $("#enable-php-call-"+tab).change (function() {
      var block = $(this).attr('id').replace ("enable-php-call-", "");
      process_display_elements (block);
    });
    $("select#display-for-devices-"+tab).change (function() {
      var block = $(this).attr('id').replace ("display-for-devices-", "");
      process_display_elements (block);
    });
    $("select#scheduling-"+tab).change (function() {
      var block = $(this).attr('id').replace ("scheduling-", "");
      process_display_elements (block);
    });
    $("select#adb-block-action-"+tab).change (function() {
      var block = $(this).attr('id').replace ("adb-block-action-", "");
      process_display_elements (block);
    });


    $("#display-homepage-"+tab).change (function() {
      var block = $(this).attr('id').replace ("display-homepage-", "");
      process_display_elements (block);
    });
    $("#display-category-"+tab).change (function() {
      var block = $(this).attr('id').replace ("display-category-", "");
      process_display_elements (block);
    });
    $("#display-search-"+tab).change (function() {
      var block = $(this).attr('id').replace ("display-search-", "");
      process_display_elements (block);
    });
    $("#display-archive-"+tab).change (function() {
      var block = $(this).attr('id').replace ("display-archive-", "");
      process_display_elements (block);
    });

    $("#client-side-detection-"+tab).change (function() {
      var block = $(this).attr('id').replace ("client-side-detection-", "");
      process_display_elements (block);
    });

    $("#scheduling-date-on-"+tab).change (function() {
      var block = $(this).attr('id').replace ("scheduling-date-on-", "");
      process_scheduling_dates (block);
    });

    $("#scheduling-date-off-"+tab).change (function() {
      var block = $(this).attr('id').replace ("scheduling-date-off-", "");
      process_scheduling_dates (block);
    });

    $("#scheduling-time-on-"+tab).change (function() {
      var block = $(this).attr('id').replace ("scheduling-time-on-", "");
      process_scheduling_dates (block);
    });

    $("#scheduling-time-off-"+tab).change (function() {
      var block = $(this).attr('id').replace ("scheduling-time-off-", "");
      process_scheduling_dates (block);
    });

    $("#scheduling-weekdays-"+tab).click (function() {
      var block = $(this).attr('id').replace ("scheduling-weekdays-", "");
      var day_indexes = $(this).selectedIndexes ();

      days = [];
      $.each ($(this).selectedIndexes (), function (key, value) {
        days [key] = parseInt (value);
      });

      $("#scheduling-weekdays-value-"+tab).attr ('value', days.join (','));
    });

    $("select#avoid-action-"+tab).change (function() {
      var block = $(this).attr('id').replace ("avoid-action-", "");
      process_display_elements (block);
    });

    $("#tab-" + tab + " .page-checker-button").click (function () {
      $("#page-checker-button").click ();
    });

    process_display_elements (tab);

    $("#exceptions-button-"+tab).click (function () {
      var block = $(this).attr ("id").replace ("exceptions-button-","");
      $("#block-exceptions-" + block).toggle ();
    });

    $("#show-css-button-"+tab).click (function () {
      var block = $(this).attr ("id").replace ("show-css-button-","");
      $("#icons-css-code-" + block).toggle ();

      if ($('#icons-css-code-'+block).is(':visible')) {
          configure_selection_icons (block);
          process_display_elements (block);
      } else {
          $("#sticky-animation-"+block).hide ();
          $("#sticky-background-"+block).hide();
        }
    });

    $("#counting-button-"+tab).click (function () {
      var block = $(this).attr ("id").replace ("counting-button-","");
      $("#paragraph-counting-" + block).toggle ();
    });

    $("#clearance-button-"+tab).click (function () {
      var block = $(this).attr ("id").replace ("clearance-button-","");
      $("#paragraph-clearance-" + block).toggle ();
    });

    $("#filter-button-"+tab).click (function () {
      var block = $(this).attr ("id").tabIndex ();
      $("#misc-settings-" + block).toggle ();
      if ($("#misc-settings-" + block).is (':visible')) {
        $("#ai-misc-container-" + block).tabs ({active: 1});
        $("#ai-misc-filter-" + block).click ();
      }
    });

    $("#scheduling-date-on-"+tab).datepicker  ({dateFormat: dateFormat, autoSize: true});
    $("#scheduling-date-off-"+tab).datepicker ({dateFormat: dateFormat, autoSize: true});

    if ($("#scheduling-weekdays-value-"+tab).length != 0) {
      $("#scheduling-time-on-"+tab).timepicker  ({'timeFormat': timeFormat, 'minTime': '00:00:00', 'maxTime': '23:00:00', 'step': 60});
      $("#scheduling-time-off-"+tab).timepicker ({'timeFormat': timeFormat, 'minTime': '00:00:00', 'maxTime': '23:00:00', 'step': 60});

      days = [];
      $.each ($("#scheduling-weekdays-value-"+tab).val ().split (','), function (key, value) {
        days [key] = parseInt (value);
      });
      $("#scheduling-weekdays-"+tab).weekdays ({
        days: [ai_admin.day_mo, ai_admin.day_tu, ai_admin.day_we, ai_admin.day_th, ai_admin.day_fr, ai_admin.day_sa, ai_admin.day_su],
        selectedIndexes: days
      });
    }

    $(".css-code-"+tab).click (function () {
      var block = $(this).attr('class').replace ("css-code-", "");
      if (!$('#custom-css-'+block).is(':visible')) {
        $("#edit-css-button-"+block).click ();
      }
    });

    $("#edit-css-button-"+tab).button ({
    }).click (function () {
      var block = $(this).attr('id').replace ("edit-css-button-", "");

      $("#css-left-"+block).hide();
      $("#css-right-"+block).hide();
      $("#css-center-"+block).hide();
      $("#css-float-left-"+block).hide();
      $("#css-float-right-"+block).hide();
      $("#css-sticky-left-"+block).hide();
      $("#css-sticky-right-"+block).hide();
      $("#css-sticky-top-"+block).hide();
      $("#css-sticky-bottom-"+block).hide();
      $("#css-sticky-"+block).hide();

      var alignment = $("select#block-alignment-"+block+" option:selected").attr('value');

      if (alignment == AI_ALIGNMENT_DEFAULT) {
        $("#css-none-"+block).hide();
        $("#custom-css-"+block).show().val ($("#css-none-"+block).text ());
        $("select#block-alignment-"+block).val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_LEFT) {
        $("#css-left-"+block).hide();
        $("#custom-css-"+block).show().val ($("#css-left-"+block).text ());
        $("select#block-alignment-"+block).val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_RIGHT) {
        $("#css-right-"+block).hide();
        $("#custom-css-"+block).show().val ($("#css-right-"+block).text ());
        $("select#block-alignment-"+block).val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_CENTER) {
        $("#css-center-"+block).hide();
        $("#custom-css-"+block).show().val ($("#css-center-"+block).text ());
        $("select#block-alignment-"+block).val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_FLOAT_LEFT) {
        $("#css-float-left-"+block).hide();
        $("#custom-css-"+block).show().val ($("#css-float-left-"+block).text ());
        $("select#block-alignment-"+block).val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_FLOAT_RIGHT) {
        $("#css-float-right-"+block).hide();
        $("#custom-css-"+block).show().val ($("#css-float-right-"+block).text ());
        $("select#block-alignment-"+block).val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_STICKY_LEFT) {
        $("#css-sticky-left-"+block).hide();
        $("#custom-css-"+block).show().val ($("#css-sticky-left-"+block).text ());
        $("select#block-alignment-"+block).val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_STICKY_RIGHT) {
        $("#css-sticky-right-"+block).hide();
        $("#custom-css-"+block).show().val ($("#css-sticky-right-"+block).text ());
        $("select#block-alignment-"+block).val (AI_ALIGNMENT_CUSTOM_CSS).change();
      }
      if (alignment == AI_ALIGNMENT_STICKY_TOP) {
        $("#css-sticky-top-"+block).hide();
        $("#custom-css-"+block).show().val ($("#css-sticky-top-"+block).text ());
        $("select#block-alignment-"+block).val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_STICKY_BOTTOM) {
        $("#css-sticky-bottom-"+block).hide();
        $("#custom-css-"+block).show().val ($("#css-sticky-bottom-"+block).text ());
        $("select#block-alignment-"+block).val (AI_ALIGNMENT_CUSTOM_CSS).change();
      } else
      if (alignment == AI_ALIGNMENT_STICKY) {
        $("#css-sticky-"+block).hide();
        $("#custom-css-"+block).show().val ($("#css-sticky-"+block).text ());
        $("select#block-alignment-"+block).val (AI_ALIGNMENT_CUSTOM_CSS).change();
      }
    });


    $("#name-label-"+tab).click (function () {
      var block = $(this).attr('id').replace ("name-label-", "");

      if ($("div#settings-" + block).is (':visible'))

      if (!$('#name-edit-'+block).is(':visible')) {
        $("#name-edit-"+block).css('display', 'table-cell').val ($("#name-label-"+block).text ()).focus ();
        $("#name-label-"+block).hide();
      }
    });

    $("#name-label-container-"+tab).click (function () {
      var block = $(this).attr('id').replace ("name-label-container-", "");

      if ($("div#settings-" + block).is (':visible'))

      if (!$('#name-edit-'+block).is(':visible')) {
        $("#name-edit-"+block).css('display', 'table-cell').val ($("#name-label-"+block).text ()).focus ();
        $("#name-label-"+block).hide();
      }
    });

    $("#name-edit-"+tab).on('keyup keypress', function (e) {
      var keyCode = e.keyCode || e.which;
      ignore_key = true;
      if (keyCode == 27) {
        var block = $(this).attr('id').replace ("name-edit-", "");
        $("#name-label-"+block).show();
        $("#name-edit-"+block).hide();
        ignore_key = false;
      } else if (keyCode == 13) {
          var block = $(this).attr('id').replace ("name-edit-", "");
          $("#name-label-"+block).show().text ($("#name-edit-"+block).val ());
          $("#name-edit-"+block).hide();
          ignore_key = false;
          e.preventDefault();
          return false;
      }
    }).focusout (function() {
      if (ignore_key) {
        var block = $(this).attr('id').replace ("name-edit-", "");
        $("#name-label-"+block).show().text ($("#name-edit-"+block).val ());
        $("#name-edit-"+block).hide();
      }
      ignore_key = true;
    });

    $("#export-switch-"+tab).checkboxButton ().click (function () {
      var block = $(this).attr ("id");
      block = block.replace ("export-switch-","");
      $("#export-container-" + block).toggle ();

      if ($("#export-container-" + block).is(':visible') && !$(this).hasClass ("loaded")) {
//        var nonce = $(this).attr ('nonce');
        $("#export_settings_" + block).load (ajaxurl+"?action=ai_ajax_backend&export=" + block + "&ai_check=" + ai_nonce, function (response, status, xhr) {
          if (status == "error" ) {
            $('#ai-error-container').text (ai_admin.error + ' ' + xhr.status + ': ' + xhr.statusText).show ();
          } else {
              $("#export_settings_" + block).attr ("name", "export_settings_" + block);
              $("#export-switch-"+block).addClass ("loaded");
            }
        });
      }
    });

    $("input#statistics-button-"+tab).checkboxButton ().click (function () {
      disable_auto_refresh_statistics ();
      var block = $(this).attr ("id");
      block = block.replace ("statistics-button-","");
      $("div#statistics-container-" + block).toggle ();
      $("div#settings-" + block).toggle ();

      $("#tab-" + block + ' .ai-toolbars .ai-settings').toggle ();
      $("#ai-main-toolbar-" + block + ' .ai-statistics').toggle ();

      var container = $("div#statistics-container-" + block);
      if (container.is(':visible')) {
        $("#name-label-container-"+block).css ('cursor', 'default');
        if (!$(this).hasClass ('loaded')) {
          $("input#load-custom-range-"+block).click ();
          $(this).addClass ('loaded');
        }
      } else {
          $("#name-label-container-"+block).css ('cursor', 'pointer');
        }
    });

    $("#export-pdf-button-"+tab).click (function () {
      var block = $(this).attr ("id").tabIndex ();
      export_statistics_pdf (block);
    });

    $("#export-csv-button-"+tab).click (function () {
      var block = $(this).attr ("id").tabIndex ();
      export_statistics_csv (block);
    });

    $("input#adb-statistics-button-"+tab).checkboxButton ().click (function () {
      var block = $(this).attr ("id");
      block = block.replace ("adb-statistics-button-","");
      setTimeout (function() {$("input#load-custom-range-"+block).click ();}, 2);
    });

    configure_statistics_toolbar (tab);

    $("#device-detection-button-"+tab).button ({
    }).show ().click (function () {
      var block = $(this).attr ("id");
      block = block.replace ("device-detection-button-","");
      $("#device-detection-settings-" + block).toggle ();
    });

    $("#lists-button-"+tab).button ({
    }).show ().click (function () {
      var block = $(this).attr ("id");
      block = block.replace ("lists-button-","");

      if ($("#list-settings-" + block).is(':visible')) {
        if ($("#list-settings-" + block).hasClass ('ai-expaned')) {
          $("#list-settings-" + block).hide ();
          $("#list-settings-" + block).removeClass ('ai-expaned');
        } else {
            var lists      = $("#list-settings-" + block + ' tr');
            var list_items = $("#list-settings-" + block + ' tr.list-items');

            if (list_items.length != lists.length) {
              $("#list-settings-" + block + ' tr').show ();
              $("#list-settings-" + block).addClass ('ai-expaned');
            } else {
                $("#list-settings-" + block).hide ();
                $("#list-settings-" + block).removeClass ('ai-expaned');
              }
          }
      } else {
          $("#list-settings-" + block).show ();
          $("#list-settings-" + block).removeClass ('ai-expaned');
          $("#list-settings-" + block + ' tr').hide ();

          var list_items = $("#list-settings-" + block + ' tr.list-items');
          if (list_items.length) {
            list_items.show ();
          } else {
              $("#list-settings-" + block + ' tr').show ();
              $("#list-settings-" + block).addClass ('ai-expaned');
            }
        }
    });

    $("#list-settings-"+tab+' span.checkbox-list-button').click (function () {
      var on = $(this).hasClass ('dashicons-yes');
      if (on) {
        $(this).removeClass ('dashicons-yes').addClass ('dashicons-no');
        $(this).prev ().removeAttr ('checked');
      } else {
          $(this).removeClass ('dashicons-no').addClass ('dashicons-yes');
          $(this).prev ().attr ('checked', '1');
        }
    });

    $("#manual-button-"+tab).button ({
    }).show ().click (function () {
      var block = $(this).attr ("id");
      block = block.replace ("manual-button-","");
      $("#manual-settings-" + block).toggle ();
    });

    $("#misc-button-"+tab).button ({
    }).show ().click (function () {
      var block = $(this).attr ("id");
      block = block.replace ("misc-button-","");
      $("#misc-settings-" + block).toggle ();
    });

    $("#preview-button-"+tab).button ({
    }).show ().click (function () {
      var block = $(this).attr ("id");
      block = block.replace ("preview-button-","");

      $(this).blur ();

      var sticky = false;
      var iframe = $(this).attr ('iframe') == '1' ? 1 : 0;
      $(this).attr ('iframe', '');

      var alignment         = $("select#block-alignment-"+block+" option:selected").attr('value');
      var horizontal        = $("select#horizontal-position-"+block+" option:selected").attr('value');
      var vertical          = $("select#vertical-position-"+block+" option:selected").attr('value');
      var horizontal_margin = $("#horizontal-margin-"+block).val ();
      var vertical_margin   = $("#vertical-margin-"+block).val ();
      var animation         = $("select#animation-"+block+" option:selected").attr('value');

      var custom_css = $("#custom-css-"+block).val ();

      var alignment_css = "";
      if (alignment == AI_ALIGNMENT_DEFAULT) {
        alignment_css = $("#css-none-"+block).text ();
      } else
      if (alignment == AI_ALIGNMENT_CUSTOM_CSS) {
        alignment_css = custom_css;
        sticky = is_sticky (custom_css);
      } else
      if (alignment == AI_ALIGNMENT_LEFT) {
        alignment_css = $("#css-left-"+block).text ();
      } else
      if (alignment == AI_ALIGNMENT_RIGHT) {
        alignment_css = $("#css-right-"+block).text ();
      } else
      if (alignment == AI_ALIGNMENT_CENTER) {
        alignment_css = $("#css-center-"+block).text ();
      } else
      if (alignment == AI_ALIGNMENT_FLOAT_LEFT) {
        alignment_css = $("#css-float-left-"+block).text ();
      } else
      if (alignment == AI_ALIGNMENT_FLOAT_RIGHT) {
        alignment_css = $("#css-float-right-"+block).text ();
      } else
      if (alignment == AI_ALIGNMENT_STICKY_LEFT) {
        alignment_css = $("#css-sticky-left-"+block).text ();
      } else
      if (alignment == AI_ALIGNMENT_STICKY_RIGHT) {
        alignment_css = $("#css-sticky-right-"+block).text ();
      }
      if (alignment == AI_ALIGNMENT_STICKY_TOP) {
        alignment_css = $("#css-sticky-top-"+block).text ();
      } else
      if (alignment == AI_ALIGNMENT_STICKY_BOTTOM) {
        alignment_css = $("#css-sticky-bottom-"+block).text ();
      } else
      if (alignment == AI_ALIGNMENT_STICKY) {
        alignment_css = update_sticky_margins ($("#css-sticky-"+block).text (), horizontal_margin, vertical_margin);
        sticky = true;
      }

      var name = $("#name-label-"+block).text ();
      var code  = get_editor_text (block);
      var php   = $("input#process-php-"+block).is(":checked") ? 1 : 0;
      var label = $("input#show-label-"+block).is(":checked") ? 1 : 0;

      var close_button =  $("#close-button-"+block+" option:selected").attr('value');

      var background = $("input#background-"+block).is(":checked") ? 1 : 0;
      var body_background = $("input#body-background-"+block).is(":checked") ? 1 : 0;
      var background_image = $("#bkg-image-url-"+block).val ();
      var background_color = $("input#bkg-color-"+block).val ();
      var background_size  = $("select#bkg-size-"+block+" option:selected").attr('value');
      var background_repeat = $("select#bkg-repeat-"+block+" option:selected").attr('value');

      if (!sticky) {
        var window_top    = (screen.height / 2) - (820 / 2);
        var window_left   = 100;
        var window_width  = 820;
        var window_height = 820;
      } else {
          var window_top    = screen.availTop;
          var window_left   = screen.availLeft;
          var window_width  = screen.availWidth;
          var window_height = screen.availHeight;
        }

      var param = {
        'action':             'ai_ajax_backend',
        'preview':            block,
        'ai_check':           ai_nonce,
        'name':               b64e (name),
        'code':               b64e (code),
        'alignment':          btoa (alignment),
        'horizontal':         btoa (horizontal),
        'vertical':           btoa (vertical),
        'horizontal_margin':  btoa (horizontal_margin),
        'vertical_margin':    btoa (vertical_margin),
        'animation':          btoa (animation),
        'alignment_css':      btoa (alignment_css),
        'custom_css':         btoa (custom_css),
        'php':                php,
        'label':              label,
        'close':              close_button,
        'background':         background,
        'body_background':    body_background,
        'background_image':   btoa (background_image),
        'background_color':   btoa (background_color),
        'background_size':    btoa (background_size),
        'background_repeat':  btoa (background_repeat),
        'iframe':             iframe
      };
      open_popup_window_post (ajaxurl, 'width='+window_width+',height='+window_height+',top='+window_top+',left='+window_left+',resizable=yes,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no', 'preview', param);
    });

    $("select#animation-"+tab).change (function() {
      var block = $(this).attr('id').tabIndex ();
      var animation = $(this).find ("option:selected").attr('value');
      var animation_parameters = $(this).closest ('.sticky-animation').find ('.animation-parameters')

      if (animation == AI_ANIMATION_NONE || $("input#background-"+block).is(":checked")) {
        animation_parameters.hide ();
      } else {
          animation_parameters.show ();
        }
    });

    $("#iframe-preview-button-"+tab).button ({
    }).show ().click (function () {
      var block = $(this).attr ("id");
      block = block.replace ("iframe-preview-button-","");
      $("#preview-button-"+block).attr ('iframe', '1').click ();
    });

    create_list_selector ('category',     tab);
    create_list_selector ('tag',          tab);
    create_list_selector ('taxonomy',     tab);
    create_list_selector ('id',           tab);
    create_list_editor   ('url',          tab);
    create_list_editor   ('url-parameter',tab);
    create_list_editor   ('cookie',       tab);
    create_list_editor   ('referer',      tab);
    create_list_selector ('client',       tab);
    create_list_editor   ('ip-address',   tab);
    create_list_selector ('country',      tab);
    create_list_selector ('city',         tab);

    var toggle_country_list = function (index) {
      $('#ms-country-select-' + index).toggle();
      before_update_selection_from_list = null;
    }

    var toggle_city_list = function (index) {
      $('#ms-city-select-' + index).toggle();
      before_update_selection_from_list = null;
    }

    $('#country-city-' + tab).click (function () {
      var block = $(this).attr('id').tabIndex ();

      $(this).find ('span').toggle ();
      $(this).next ().find ('span').toggle ();

      var button_country = $('#country-button-'+block);
      var button_city = $('#city-button-'+block);

      var country_selection_container = $('#ms-country-select-'+block);
      country_selection_container_visible = country_selection_container.length && country_selection_container.is (':visible');

      var city_selection_container = $('#ms-city-select-'+block);
      city_selection_container_visible = city_selection_container.length && city_selection_container.is (':visible');

      if (country_selection_container_visible) {
        before_update_selection_from_list = toggle_country_list;
        button_city.click ();
      }

      if (city_selection_container_visible) {
        before_update_selection_from_list = toggle_city_list;
        button_country.click ();
      }
    });

    $('#tracking-' + tab).checkboxButton ().click (function () {
      var block = $(this).attr('id').replace ("tracking-", "");
      var alignment = $("select#block-alignment-"+block+" option:selected").attr('value');
      var tracking  = !$('#tracking-' + block).next ().find ('.checkbox-icon').hasClass ('on');
      if (tracking && alignment == AI_ALIGNMENT_NO_WRAPPING) $('#tracking-wrapping-warning-' + block).show (); else $('#tracking-wrapping-warning-' + block).hide ();
    });

    $('#simple-editor-' + tab).checkboxButton ().click (function () {
      var block = $(this).attr('id').replace ("simple-editor-", "");

      if (block == active_tab && !$(this).hasClass ('clicked')) {
        $(this).addClass ('clicked')
        $('#ai-tab-container .simple-editor-button').click();
        $(this).removeClass ('clicked')
      }
    });
    // Switch to simple editor if the button was pressed before the tab was configured
    if ($('#simple-editor-' + tab).is(":checked")) {
      switch_editor (tab, true);
      $('#simple-editor-' + tab).next ("label").find ('.checkbox-icon').addClass("on");
    }

    $('#process-php-' + tab).checkboxButton ();
    $('#disable-insertion-' + tab).checkboxButton ();

    $('#ai-misc-container-' + tab).tabs();
    $('#ai-misc-tabs-' + tab).show();

    $('#ai-devices-container-' + tab).tabs();
    $('#ai-devices-tabs-' + tab).show();

    $("#tools-button-"+tab).click (function () {
      if (!$(this).find ('.checkbox-icon').hasClass("on")) {
        $('label.rotation-button').each (function () {
          if ($(this).find ('.checkbox-icon').hasClass("on")) {
            $(this).prev ().click ();
          }
        });

        $('label.code-generator-button').each (function () {
          if ($(this).find ('.checkbox-icon').hasClass("on")) {
            $(this).prev ().click ();
          }
        });

        $('code-generator').hide ();
      }

      $('.ai-tools-toolbar').toggle();
      $('label.tools-button').find ('.checkbox-icon').toggleClass("on");
    });

    $('#ai-code-generator-container-' + tab).tabs();

    $("select#adsense-type-"+tab).change (function() {
      var block = $(this).attr('id').replace ("adsense-type-", "");
      process_adsense_elements (block);
    });

    $("select#adsense-size-"+tab).change (function() {
      var block = $(this).attr('id').replace ("adsense-size-", "");
      process_adsense_elements (block);
    });

    $("select#amazon-amp-"+tab).change (function() {
      var block = $(this).attr('id').replace ("amazon-amp-", "");
      console.log ('block', block);
      process_amazon_elements (block);
    });

    process_adsense_elements (tab);
    process_amazon_elements (tab);

    $("#code-generator-"+tab).click (function () {
      var block = $(this).attr('id').replace ("code-generator-", "");
      $('#ai-code-generator-container-' + block).toggle();
      $(this).next ("label").find ('.checkbox-icon').toggleClass("on");
    });

    $("#visual-editor-"+tab).click (function () {
      var block = $(this).attr('id').replace ("visual-editor-", "");

      var code = b64e (get_editor_text (block));
      var php =  $("input#process-php-" + block).is(":checked") ? 1 : 0;

      var window_width = 820;
      var window_height = 870;
      var window_left  = 100;
      var window_top   = (screen.height / 2) - (window_height / 2);
      var param = {'action': 'ai_ajax_backend', 'edit': block, 'ai_check': ai_nonce, 'code': code, 'php': php};
      open_popup_window_post (ajaxurl, 'width='+window_width+',height='+window_height+',top='+window_top+',left='+window_left+',resizable=yes,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no', 'edit', param);
    });

    $("#select-image-button-"+tab).click (function (event) {
      $(this).blur ();

      var block = $(this).attr('id').replace ("select-image-button-", "");
      var frame;

      event.preventDefault();

      if (frame) {
        frame.open();
        return;
      }

      frame = wp.media ({
        title: ai_admin.select_banner_image,
        button: {
          text: ai_admin.use_this_image
        },
        multiple: false  // Set to true to allow multiple files to be selected
      });

//      frame.on ('open', function(){
//        var selected = $('#banner-image-' + block).attr ('src');
//        if (selected) {
//          var selection = frame.state().get ('selection');
//          var id = $('#banner-image-' + block).attr ('data-id');
//          selection.add (wp.media.attachment (id));
//        }
//      });

      frame.on ('select', function() {
        var attachment = frame.state().get('selection').first().toJSON();
//        console.log ('attachment', attachment);
        $('#banner-image-' + block).attr ('src', attachment.url);
        $('#banner-image-url-' + block).val (attachment.url).trigger ("input");
      });

      frame.open();
    });

    $("#select-placeholder-button-"+tab).click (function (event) {
      $(this).blur ();

      var block = $(this).attr('id').replace ("select-placeholder-button-", "");
      var image_url = $('#banner-image-' + block).attr ('src');

      var window_width = 820;
      var window_height = 870;
      var window_left  = 100;
      var window_top   = (screen.height / 2) - (870 / 2);
      var param = {'action': 'ai_ajax_backend', 'placeholder': image_url, 'block': block, 'ai_check': ai_nonce};
      open_popup_window_post (ajaxurl, 'width='+window_width+',height='+window_height+',top='+window_top+',left='+window_left+',resizable=yes,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no', 'preview', param);
    });

    $("#banner-image-url-" + tab).on ('input', function() {

      var block = $(this).attr('id').replace ("banner-image-url-", "");
      var image = $('#banner-image-' + block);

      var new_image_src = $(this).val ();
      if (new_image_src == '') {
//        new_image_src = '//:0';
        image.hide ();
        $('div#tab-banner-' + block + ' table.ai-settings-table').css ('position', 'relative');
      }

      // Removed in jQuery 3
//      image.attr ('src', new_image_src).load (function () {
      image.attr ('src', new_image_src).on ("load", function () {
        image.show ();
        $('div#tab-banner-' + block + ' table.ai-settings-table').css ('position', 'inherit');
        $(this).closest ('.ai-banner').removeClass ('ai-banner-top');
        var width   = this.naturalWidth;
        var height  = this.naturalHeight;

        if (width / height > 2 && width > 300) {
          $(this).closest ('.ai-banner').addClass ('ai-banner-top');
        }
      })
        // Removed in jQuery 3
//      .error (function() {
      .on ("error", function() {
        if (image.is(':visible')) {
//          image.hide ().attr ('src', '//:0');
          image.hide ().attr ('src', '');
          $('div#tab-banner-' + block + ' table.ai-settings-table').css ('position', 'relative');
        }
      });

    });

    $("#banner-url-" + tab).on ('input', function() {
      var block = $(this).attr('id').replace ("banner-url-", "");
      var url = $(this).val ().trim();
      if (url == '') $('#banner-link-' + block).removeAttr ('href'); else
        $('#banner-link-' + block).attr ('href', $(this).val ());
    });

    $("#import-code-"+tab).click (function () {
      $(this).next ("label").find ('.checkbox-icon').addClass("on");

      var block = $(this).attr('id').replace ("import-code-", "");

      $.post (ajaxurl, {'action': 'ai_ajax_backend', 'ai_check': ai_nonce, 'import-code': b64e (get_editor_text (block))}
      ).done (function (data) {
        if (data != '') {
          $('#ai-error-container').hide ();

          try {
            var code_data = JSON.parse (data);
          } catch (error) {
            console.log ("AI IMPORT CODE ERROR:", data);
            $('#ai-error-container').text (data).show ();
          }

          if (typeof code_data !== "undefined" && typeof code_data ['type'] !== "undefined") {

            if (debug) console.log ("AI IMPORT CODE:", code_data);

            var code_type = code_data ['type'];

            $("#ai-code-generator-container-" + block).tabs ({active: code_type == AI_CODE_UNKNOWN ? AI_CODE_BANNER : code_type});

            switch (code_type) {
              case AI_CODE_BANNER:
                $("#banner-image-url-" + block).val (code_data ['image']).trigger ('input');
                $("#image-alt-text-" + block).val (code_data ['alt']);
                $("#lazy-load-image-" + block).prop ('checked', code_data ['loading'] == 'lazy');

                $("#banner-url-" + block).val (code_data ['link']).trigger ('input');
                $("#open-new-tab-" + block).prop ('checked', code_data ['target'] == '_blank');
                break;
              case AI_CODE_ADSENSE:
                $("#adsense-comment-" + block).val (code_data ['adsense-comment']);
                $("#adsense-publisher-id-" + block).val (code_data ['adsense-publisher-id']);
                $("#adsense-ad-slot-id-" + block).val (code_data ['adsense-ad-slot-id']);

                $("#adsense-type-" + block).val (code_data ['adsense-type']);
                $("#adsense-size-" + block).val (code_data ['adsense-size']);

                var ad_size = '';
                if (code_data ['adsense-width'] != '' && code_data ['adsense-height'] != '') {
                  ad_size = code_data ['adsense-width'] + 'x' + code_data ['adsense-height'];
                }
                $('#tab-adsense-' + block + ' .adsense-ad-size.fixed').parent ().find ('.scombobox-display').val (ad_size);

                $("#adsense-amp-" + block).val (code_data ['adsense-amp']);

                $("#adsense-amp-block-on-consent-" + block).prop ('checked', code_data ['adsense-amp-block-on-consent'] != '#');

                $("#adsense-layout-" + block).val (code_data ['adsense-layout']);
                $("#adsense-layout-key-" + block).val (decodeURIComponent (code_data ['adsense-layout-key']));

                if (decodeURIComponent (code_data ['adsense-full-width-responsive']) == 'false') {
                  $("#adsense-layout-" + block + ' select.adsense-full-width').val ('disabled');
                } else {
                    $("#adsense-layout-" + block + ' select.adsense-full-width').val ('enabled');
                  }

                if ($("#adsense-size-" + block).val () == AI_ADSENSE_SIZE_FIXED_BY_VIEWPORT) {
                  $('#tab-adsense-' + block + ' tr.adsense-viewport').each (function (index) {
                    var width  = code_data ['adsense-sizes'][index][0];
                    var height = code_data ['adsense-sizes'][index][1];

                    var ad_size = '';
                    if (width != '' && height != '') {
                      ad_size = width + 'x' + height;
                    }

                    $(this).find ('.adsense-ad-size').parent ().find ('.scombobox-display').val (ad_size);
                  });
                }
                process_adsense_elements (block);
                break;
              case AI_CODE_AMAZON:
                $("#amazon-data-" + block).val (code_data ['amazon-data']);

                $("#amazon-amp-" + block).val (code_data ['amazon-amp']);

                $("#amazon-width-" + block).val (code_data ['amazon-width']);
                $("#amazon-height-" + block).val (code_data ['amazon-height']);

                $("#amazon-amp-block-on-consent-" + block).prop ('checked', code_data ['amazon-amp-block-on-consent'] != '#');

                process_amazon_elements (block);
                break;
              case AI_CODE_UNKNOWN:
                break;
            }
          }
        }
      }).fail (function (xhr, status, error) {
        console.log ("AI IMPORT CODE ERROR:", xhr.status, xhr.statusText);
        $('#ai-error-container').text (ai_admin.error + ' ' + xhr.status + ': ' + xhr.statusText).show ();
      }).always (function() {
        $("#import-code-"+block).next ("label").find ('.checkbox-icon').removeClass("on");
      });
    });

    $("#generate-code-"+tab).click (function () {
      $('#ai-error-container').hide ();
      $(this).next ("label").find ('.checkbox-icon').addClass("on");

      var block = $(this).attr('id').replace ("generate-code-", "");
      var code_type = $("#ai-code-generator-container-" + block).tabs('option', 'active');
      var code_data = {'action': 'ai_ajax_backend', 'ai_check': ai_nonce, 'generate-code': code_type};

      switch (code_type) {
        case AI_CODE_BANNER:
          code_data ['image'] = $("#banner-image-url-" + block).val ();
          code_data ['alt'] = $("#image-alt-text-" + block).val ();
          if ($("#lazy-load-image-" + block).is(":checked"))
            code_data ['loading'] = 'lazy';

          code_data ['link']  = $("#banner-url-" + block).val ();
          if ($("#open-new-tab-" + block).is(":checked"))
            code_data ['target'] = '_blank';
          break;
        case AI_CODE_ADSENSE:
          code_data ['block']                 = block;
          code_data ['adsense-comment']       = $("#adsense-comment-" + block).val ();
          code_data ['adsense-publisher-id']  = $("#adsense-publisher-id-" + block).val ();
          code_data ['adsense-ad-slot-id']    = $("#adsense-ad-slot-id-"   + block).val ();
          code_data ['adsense-type']          = parseInt ($("select#adsense-type-" + block +" option:selected").attr ('value'));
          code_data ['adsense-size']          = parseInt ($("select#adsense-size-" + block +" option:selected").attr ('value'));

          var ad_size = $('#tab-adsense-' + block + ' .adsense-ad-size.fixed').parent ().find ('.scombobox-display').val ().trim ().toLowerCase ().split ('x');
          code_data ['adsense-width']         = '';
          code_data ['adsense-height']        = '';
          if (ad_size.length == 2) {
            code_data ['adsense-width']         = parseInt (ad_size [0]);
            code_data ['adsense-height']        = parseInt (ad_size [1]);
          }

          code_data ['adsense-amp']           = parseInt ($("select#adsense-amp-" + block +" option:selected").attr ('value'));
          code_data ['adsense-amp-block-on-consent'] = $("#adsense-amp-block-on-consent-" + block).is(":checked") ? '' : '#';
          code_data ['adsense-layout']        = $("#adsense-layout-"       + block).val ();
          code_data ['adsense-layout-key']    = $("#adsense-layout-key-"   + block).val ();

          code_data ['adsense-full-width-responsive'] = 'true';
          if ($("#adsense-layout-" + block + ' select.adsense-full-width').val () == 'disabled') {
            code_data ['adsense-full-width-responsive'] = 'false';
          }

          if (code_data ['adsense-size'] == AI_ADSENSE_SIZE_FIXED_BY_VIEWPORT) {
            var viewport_sizes = new Array();
            $('#tab-adsense-' + block + ' tr.adsense-viewport').each (function (index) {
              var ad_size = $(this).find ('.adsense-ad-size').parent ().find ('.scombobox-display').val ().trim ().toLowerCase ().split ('x');
              var adsense_size = {'width': '', 'height': ''};
              if (ad_size.length == 2) {
                adsense_size = {'width': parseInt (ad_size [0]), 'height': parseInt (ad_size [1])};
              }
              viewport_sizes.push (adsense_size);
            });
            code_data ['adsense-viewports'] = viewport_sizes;
          }
          break;

        case AI_CODE_AMAZON:
          code_data ['amazon-data'] = $("#amazon-data-" + block).val ();
          code_data ['amazon-amp'] = $("select#amazon-amp-" + block +" option:selected").attr ('value');
          code_data ['amazon-width'] = $("#amazon-width-" + block).val ();
          code_data ['amazon-height'] = $("#amazon-height-" + block).val ();
          code_data ['amazon-amp-block-on-consent'] = $("#amazon-amp-block-on-consent-" + block).is(":checked") ? '' : '#';
          break;
        case AI_CODE_UNKNOWN:
//          if (debug) console.log ("AI GENERATE CODE:", code_type);
          break;
      }

      if (debug) {
        console.log ("AI GENERATE CODE:", code_type);
        console.log (code_data);
      }

      $.post (ajaxurl, code_data
      ).done (function (code_data) {
        if (code_data != '') {
          var code = JSON.parse (code_data);
          if (typeof code !== "undefined")
            set_editor_text (block, code);
        }
      }).fail (function (xhr, status, error) {
        console.log ("AI GENERATE CODE ERROR:", xhr.status, xhr.statusText);
        $('#ai-error-container').text (ai_admin.error + ' ' + xhr.status + ': ' + xhr.statusText).show ();
      }).always (function() {
        $("#generate-code-"+block).next ("label").find ('.checkbox-icon').removeClass("on");
      });
    });

    $("#clear-block-"+tab).click (function () {
      paste_from_clipboard (true, true, true, true);
    });

    $("#copy-block-"+tab).click (function () {
      copy_to_clipboard ();
    });

    $("#paste-name-"+tab).click (function () {
      paste_from_clipboard (true, false, false, false);
    });

    $("#paste-code-"+tab).click (function () {
      paste_from_clipboard (false, true, false, false);
    });

    $("#paste-settings-"+tab).click (function () {
      paste_from_clipboard (false, false, true, false);
    });

    $("#paste-block-"+tab).click (function () {
      paste_from_clipboard (true, true, true, false);
    });

    $("#rotation-"+tab).click (function () {
      var block = $(this).attr('id').replace ("rotation-", "");
      var rotation_container = $('#ai-rotation-container-' + block);
      $(this).next ("label").find ('.checkbox-icon').toggleClass("on");

      rotation_container.toggle();

      var option_tabs = rotation_container.tabs ();

      var ul = option_tabs.find ("ul");

      if (rotation_container.is(':visible')) {
        rotation_container.data ('code', b64e (get_editor_text (block)));
        rotation_container.data ('option', 1);

        add_rotate_options (block, 1);
        option_tabs.tabs ("option", "active", 0);

        $('input[name=ai_save]').css ('color', '#f00');
//        $('.ai-rotation-warning').show ();

        setTimeout (function() {import_rotation_code (block);}, 5);
      } else {
//          set_editor_text (block, b64d (rotation_container.data ('code')));
          generate_rotatation_code (block);

          ul.find ("li").remove ();
          var div = option_tabs.find ("div.rounded").remove ();
        }
    });

    $("#add-option-"+tab).click (function () {
      var block = $(this).attr('id').replace ("add-option-", "");
      add_rotate_options (block, 1);

      $('#ai-rotation-container-' + block).find ("ul").find ("li").slice (- 1).click ();
    });

    $("#remove-option-"+tab).click (function () {
      var block = $(this).attr('id').replace ("remove-option-", "");
      remove_rotate_option (block, $('#ai-rotation-container-' + block).tabs ("option", "active"));
    });

    $("#rotation-groups-"+tab).click (function () {
      var block = $(this).attr('id').tabIndex ();
      var label = $(this).next ().find ('span');
      label.toggleClass ('on');
      var rotation_container = $('#ai-rotation-container-' + block);
      if (label.hasClass ('on')) {
        rotation_container.find ('span.group-name-label').show ();
        rotation_container.find ('span.option-name-label').hide ();
        rotation_container.find ('td.option-parameters').hide ();
      } else {
          rotation_container.find ('span.group-name-label').hide ();
          rotation_container.find ('span.option-name-label').show ();
          rotation_container.find ('td.option-parameters').show ();
        }
    });

    $("#tab-" + tab + " .adsense-list").click (function () {
      $(this).blur ();

      toggle_adsense_list ();
    });

    $("select#html-element-insertion-"+tab).change (function() {
      var html_element_insertion = $("select#html-element-insertion-"+tab+" option:selected").attr('value');

      if (html_element_insertion == AI_HTML_INSERTION_SEREVR_SIDE)
        $("#server-side-insertion-"+tab).hide (); else
          $("#server-side-insertion-"+tab).show ();
    });

    $("#tab-" + tab + " .adsense-ad-size").scombobox({
      showDropDown: false,
      invalidAsValue: true,
      animation: {
        duration: 50,
      }
    });

    $("select#close-button-" + tab).change (function () {
      var block = $(this).attr('id').replace ("close-button-", "");
      $("select#close-button-sticky-"+block+"").val ($("select#close-button-"+block+" option:selected").attr('value'));
    });

    $("select#close-button-sticky-" + tab).change (function () {
      var block = $(this).attr('id').replace ("close-button-sticky-", "");
      $("select#close-button-"+block+"").val ($("select#close-button-sticky-"+block+" option:selected").attr('value'));
    });

//    $("input#paragraph-numbers-" + tab).change (function () {
//      var block = $(this).attr('id').tabIndex ();
//      $("input#image-numbers-"+block).val ($(this).attr ('value'));
//    });

//    $("input#image-numbers-" + tab).change (function () {
//      var block = $(this).attr('id').tabIndex ();
//      $("input#paragraph-numbers-"+block).val ($(this).attr ('value'));
//    });

    $("input#filter-numbers-insertions-" + tab).on ('keyup', function () {
      var block = $(this).attr('id').tabIndex ();
//      $("input#filter-numbers-"+block).val ($(this).attr ('value'));
      $("input#filter-numbers-"+block).val ($(this).val ());
      $("select#filter-type-"+block).val (0);
      $("input#invert-filter-"+block).removeAttr ('checked');
    });

    $("input#filter-numbers-" + tab).on ('keyup', function () {
      var block = $(this).attr('id').tabIndex ();
//      $("input#filter-numbers-insertions-"+block).val ($(this).attr ('value'));
      $("input#filter-numbers-insertions-"+block).val ($(this).val ());
    });

    $("#html-elements-button-"+tab).click (function () {
      var block = $(this).attr('id').replace ("html-elements-button-", "");

      var selector      = $("input#html-elements-" + block).val ();
      var home_url      = $("#ai-settings").data ('home-relative-url');
      var window_top    = screen.availTop;
      var window_left   = screen.availLeft;
      var window_width  = screen.availWidth - 15;
      var window_height = screen.availHeight - 65;

      var param = {
        'html_element_selection': block,
        'selector':               selector,
        'input':                  "input#html-elements-" + block
      };
      open_popup_window_post (home_url, 'width='+window_width+',height='+window_height+',top='+window_top+',left='+window_left+',resizable=yes,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no', 'ai-selector', param);
    });

    $("#wait-for-button-"+tab).click (function () {
      var block = $(this).attr('id').replace ("wait-for-button-", "");

      var selector      = $("input#wait-for-" + block).val ();
      var home_url      = $("#ai-settings").data ('home-relative-url');
      var window_top    = screen.availTop;
      var window_left   = screen.availLeft;
      var window_width  = screen.availWidth - 15;
      var window_height = screen.availHeight - 65;

      var param = {
        'html_element_selection': block,
        'selector':               selector,
        'input':                  "input#wait-for-" + block
      };
      open_popup_window_post (home_url, 'width='+window_width+',height='+window_height+',top='+window_top+',left='+window_left+',resizable=yes,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no', 'ai-selector', param);
    });

    $("#select-bkg-image-button-"+tab).click (function (event) {
      $(this).blur ();

      var block = $(this).attr('id').replace ("select-bkg-image-button-", "");
      var frame;

      event.preventDefault();

      if (frame) {
        frame.open();
        return;
      }

      frame = wp.media ({
        title: ai_admin.select_background_image,
        button: {
          text: ai_admin.use_this_image
        },
        multiple: false  // Set to true to allow multiple files to be selected
      });

//      frame.on ('open', function(){
//        var selected = $('#banner-image-' + block).attr ('src');
//        if (selected) {
//          var selection = frame.state().get ('selection');
//          var id = $('#banner-image-' + block).attr ('data-id');
//          selection.add (wp.media.attachment (id));
//        }
//      });

      frame.on ('select', function() {
        var attachment = frame.state().get('selection').first().toJSON();
//        console.log ('attachment', attachment);
        $('#bkg-image-' + block).attr ('src', attachment.url);
        $('#bkg-image-url-' + block).val (attachment.url).trigger ("input");
      });

      frame.open();
    });

    $("#bkg-image-url-" + tab).on ('input', function() {

      var block = $(this).attr('id').replace ("bkg-image-url-", "");
      var image = $('#bkg-image-' + block);

      var new_image_src = $(this).val ();
      if (new_image_src == '') {
//        new_image_src = '//:0';
        image.hide ();
        $('div#sticky-background-' + block + ' table.ai-settings-table').css ('position', 'relative');
      }

      configure_sticky_css (block);

//      image.attr ('src', new_image_src).load (function () {
      image.attr ('src', new_image_src).on ('load', function () {
        image.show ();
        $('div#sticky-background-' + block + ' table.ai-settings-table').css ('position', 'inherit');
        $(this).closest ('.ai-banner').removeClass ('ai-banner-top');
        var width   = this.naturalWidth;
        var height  = this.naturalHeight;

        if (width / height > 2 && width > 300) {
          $(this).closest ('.ai-banner').addClass ('ai-banner-top');
        }
      })
//      .error (function() {
      .on ('error', function() {
        if (image.is(':visible')) {
//          image.hide ().attr ('src', '//:0');
          image.hide ().attr ('src', '');
          $('div#sticky-background-' + block + ' table.ai-settings-table').css ('position', 'relative');
        }
      });
    });


    $('#tab-'  + tab + ' .parallax-button').click (function (event) {

      var button = $(this);
      button.blur ();

      var frame;

      event.preventDefault();

      if (frame) {
        frame.open();
        return;
      }

      frame = wp.media ({
        title: ai_admin.select_background_image,
        button: {
          text: ai_admin.use_this_image
        },
        multiple: false  // Set to true to allow multiple files to be selected
      });

      frame.on ('select', function() {
        var attachment = frame.state().get('selection').first().toJSON();
        button.closest ('tr').find ('.parallax-image').val (attachment.url);
      });

      frame.open();
    });
  }

  function configure_sticky_css (block) {
    var horizontal_position = parseInt ($("select#horizontal-position-"+block+" option:selected").attr('value'));
    var vertical_position   = parseInt ($("select#vertical-position-"+block+" option:selected").attr('value'));
    var horizontal_margin   = $("#horizontal-margin-"+block).val ().trim ();
    var vertical_margin     = $("#vertical-margin-"+block).val ().trim ();
    var animation           = parseInt ($("select#animation-"+block + " option:selected").attr('value'));
    var background          = $("input#background-"+block).is(":checked") ? '1' : '0';
    var set_body_background = $("input#body-background-"+block).is(":checked") ? '1' : '0';
    var background_color    = b64e ($("input#bkg-color-"+block).val ().trim ());
    var background_image    = b64e ($("input#bkg-image-url-"+block).val ().trim ());
    var background_size     = parseInt ($("select#bkg-size-"+block+" option:selected").attr('value'));
    var background_repeat   = parseInt ($("select#bkg-repeat-"+block+" option:selected").attr('value'));

    var parameters =
      '&h_pos=' + horizontal_position +
      '&v_pos=' + vertical_position +
      '&h_mar=' + horizontal_margin +
      '&v_mar=' + vertical_margin +
      '&anim='  + animation +
      '&bkg=' + background +
      '&body_bkg=' + set_body_background +
      '&bkg_col=' + background_color +
      '&bkg_img=' + background_image +
      '&bkg_size=' + background_size +
      '&bkg_rpt=' + background_repeat;

    jQuery.get (ajaxurl + '?action=ai_ajax_backend&sticky_css='+block+parameters+'&ai_check=' + ai_nonce, function (data) {
      if (data != '') {
        $('#css-sticky-' + block + ' .ai-sticky-css').text (data);
      }
    });

    if (parseInt (background)) {
      $("#sticky-position-"+block).addClass ('ai-background');
    } else $("#sticky-position-"+block).removeClass ('ai-background');

    check_insertion (block);
  }

  function configure_sticky_css_2 (block) {
    var horizontal_position = $("select#horizontal-position-"+block+" option:selected").attr('value');
    var selected_horizontal_position = $("select#horizontal-position-"+block+" option:selected");

    var vertical_position   = $("select#vertical-position-"+block+" option:selected").attr('value');
    var selected_vertical_position   = $("select#vertical-position-"+block+" option:selected");

    var background = $("input#background-"+block).is(":checked");
    var body_background = horizontal_position == AI_STICK_HORIZONTAL_CENTER && $("input#body-background-"+block).is(":checked");

    if (background) {
      $("#sticky-position-"+block).addClass ('ai-background');
    } else $("#sticky-position-"+block).removeClass ('ai-background');

    var custom_vertical_position_css = selected_vertical_position.data ('css-bkg');

    if (background && typeof custom_vertical_position_css != 'undefined') {
      if (body_background) {
        var vertical_position_css = $("select#vertical-position-"+block).data ('css-body-bkg');
      } else var vertical_position_css = custom_vertical_position_css;
    } else {
        var custom_vertical_position_css = selected_vertical_position.data ('css-' + horizontal_position);

        if (typeof custom_vertical_position_css != 'undefined') var vertical_position_css = custom_vertical_position_css; else
          var vertical_position_css = selected_vertical_position.data ('css');
      }

    var custom_horizontal_position_css = selected_horizontal_position.data ('css-bkg');

    if (background && typeof custom_horizontal_position_css != 'undefined') {
      var horizontal_position_css = custom_horizontal_position_css;
    } else {
        var custom_horizontal_position_css = selected_horizontal_position.data ('css-' + vertical_position);

        if (typeof custom_horizontal_position_css != 'undefined') var horizontal_position_css = custom_horizontal_position_css; else
          var horizontal_position_css = selected_horizontal_position.data ('css');
      }

    var background_css = '';
    if (horizontal_position == AI_STICK_HORIZONTAL_CENTER && background) {
//      var background_color = $("input#bkg-color-"+block).attr('value').trim ();
      var background_color = $("input#bkg-color-"+block).val ().trim ();
      if (background_color != '') {
        background_css = background_css + ' background-color: ' + background_color + ';';
      }

//      var background_image = $("input#bkg-image-url-"+block).attr('value').trim ();
      var background_image = $("input#bkg-image-url-"+block).val ().trim ();
      if (background_image != '') {
        background_css = background_css + ' background-image: url(' + background_image + ');';
      }

      var background_size = parseInt ($("select#bkg-size-"+block+" option:selected").attr('value'));
      if (background_size != AI_BACKGROUND_SIZE_DEFAULT) {
        switch (background_size) {
          case AI_BACKGROUND_SIZE_COVER:
            background_css = background_css + ' background-size: cover;';
            break;
          case AI_BACKGROUND_SIZE_CONTAIN:
            background_css = background_css + ' background-size: contain;';
            break;
          case AI_BACKGROUND_SIZE_FILL:
            background_css = background_css + ' background-size: 100% 100%;';
            break;
        }
      }

      var background_repeat = parseInt ($("select#bkg-repeat-"+block+" option:selected").attr('value'));
      if (background_repeat != AI_BACKGROUND_REPEAT_DEFAULT) {
        switch (background_repeat) {
          case AI_BACKGROUND_REPEAT_NO:
            background_css = background_css + ' background-repeat: no-repeat;';
            break;
          case AI_BACKGROUND_REPEAT_YES:
            background_css = background_css + ' background-repeat: repeat;';
            break;
          case AI_BACKGROUND_REPEAT_HORIZONTALY:
            background_css = background_css + ' background-repeat: repeat-x;';
            break;
          case AI_BACKGROUND_REPEAT_VERTICALLY:
            background_css = background_css + ' background-repeat: repeat-y;';
            break;
          case AI_BACKGROUND_REPEAT_SPACE:
            background_css = background_css + ' background-repeat: space;';
            break;
          case AI_BACKGROUND_REPEAT_ROUND:
            background_css = background_css + ' background-repeat: round;';
            break;
        }
      }
    }

//    $('#css-sticky-' + block + ' .ai-sticky-css').text (vertical_position_css + horizontal_position_css + background_css);

    check_insertion (block);
  }

  function check_insertion (block) {
    $('#sticky-scroll-warning-' + block).hide ();
    var automatic_insertion = $("select#insertion-type-"+block+" option:selected").attr('value');
    var alignment_style     = $("select#block-alignment-"+block+" option:selected").attr('value');
    var vertical_position   = $("select#vertical-position-"+block+" option:selected").attr('value');
    var background          = $("input#background-"+block).is(":checked") ? 1 : 0;
    var body_background     = $("input#body-background-"+block).is(":checked") ? 1 : 0;

    if (alignment_style == AI_ALIGNMENT_STICKY && vertical_position == AI_SCROLL_WITH_THE_CONTENT && automatic_insertion != AI_ABOVE_HEADER && automatic_insertion != AI_DISABLED && !(background && body_background)) {
      $('#sticky-scroll-warning-' + block).show ();
    }
  }

  function configure_selection_icons (block) {
    var css_code_container = $('#icons-css-code-'+block);
    if (!css_code_container.hasClass ('configured')) {
      var titles = new Array();
      $("select#insertion-type-"+block).imagepicker({hide_select: false}).find ('option').each (function (index) {
        titles.push ($(this).data ('title'));
      });
      $("select#insertion-type-"+block+" + ul").appendTo("#automatic-insertion-"+block).css ('padding-top', '10px').find ('li').each (function (index) {
        $(this).attr ('title', titles [index])
          .tooltip({
            track: true,
            delay: 700,
            showURL: false,
            showBody: " | ",
            fade: 250
          });
      });

      var titles = new Array();
      $("select#block-alignment-"+block).imagepicker({hide_select: false}).find ('option').each (function (index) {
        titles.push ($(this).data ('title'));
      });
      $("select#block-alignment-"+block+" + ul").appendTo("#alignment-style-"+block).css ('padding-top', '10px').find ('li').each (function (index) {
        $(this).attr ('title', titles [index])
          .tooltip({
            track: true,
            delay: 700,
            showURL: false,
            showBody: " | ",
            fade: 250
          });
      });

      var titles = new Array();
      $("select#horizontal-position-"+block).imagepicker({hide_select: false}).find ('option').each (function (index) {
        titles.push ($(this).data ('title'));
      });
      $("select#horizontal-position-"+block+" + ul").appendTo("#horizontal-positions-"+block).css ('padding-top', '10px').find ('li').each (function (index) {
        $(this).attr ('title', titles [index])
          .tooltip({
            track: true,
            delay: 700,
            showURL: false,
            showBody: " | ",
            fade: 250
          });
      });

      var titles = new Array();
      $("select#vertical-position-"+block).imagepicker({hide_select: false}).find ('option').each (function (index) {
        titles.push ($(this).data ('title'));
      });
      $("select#vertical-position-"+block+" + ul").appendTo("#vertical-positions-"+block).css ('padding-top', '10px').find ('li').each (function (index) {
        $(this).attr ('title', titles [index])
          .tooltip({
            track: true,
            delay: 700,
            showURL: false,
            showBody: " | ",
            fade: 250
          });
      });

//      var titles = new Array();
//      $("select#close-button-"+block).imagepicker({hide_select: false}).find ('option').each (function (index) {
//        titles.push ($(this).data ('title'));
//      });
//      $("select#close-button-sticky-"+block+" + ul").appendTo("#close-buttons-"+block).css ('padding-top', '10px').find ('li').each (function (index) {
//        $(this).attr ('title', titles [index])
//          .tooltip({
//            track: true,
//            delay: 700,
//            showURL: false,
//            showBody: " | ",
//            fade: 250
//          });
//      });

      css_code_container.addClass ('configured');
    }
  }

  function import_rotation_code (block) {
    $("#rotation-"+block).next ("label").find ('.checkbox-icon').addClass("active");

    $.post (ajaxurl, {'action': 'ai_ajax_backend', 'ai_check': ai_nonce, 'import-rotation-code': b64e (get_editor_text (block))}
    ).done (function (data) {
      if (data != '') {
        var code_data = JSON.parse (data);
        if (typeof code_data !== "undefined" && typeof code_data ['options'] !== "undefined") {
          $('#ai-error-container').hide ();

          var options = code_data ['options'].length;

          if (debug) {
            console.log ("AI IMPORT ROTATION CODE:", options);
            console.log ("  OPTIONS:", code_data ['options']);
          }

          var rotation_container = $('#ai-rotation-container-' + block);
          rotation_container.find ("ul").find ("li").remove ();
          rotation_container.find ("div.rounded").remove ();

          var tabs = options;
          if (tabs < 1) tabs = 1;
          if (tabs > 17) tabs = 17;

          add_rotate_options (block, tabs);

          rotation_container.find ('ul li').each (function (index) {
            if (index < options) $(this).data ('code', b64e (code_data ['options'][index]['code'])); else
              $(this).data ('code', b64e (''));
          });

          rotation_container.tabs ("option", "active", 0);

          set_editor_text (block, code_data ['options'][0]['code']);

          rotation_container.find ('input.option-name').each (function (index) {
            if (index < options) $(this).val (code_data ['options'][index]['name']);
          });
          rotation_container.find ('input.option-share').each (function (index) {
            if (index < options) $(this).val (code_data ['options'][index]['share']);
          });
          rotation_container.find ('input.option-time').each (function (index) {
            if (index < options) $(this).val (code_data ['options'][index]['time']);
          });
          rotation_container.find ('input.option-scheduling').each (function (index) {
            if (index < options) $(this).val (code_data ['options'][index]['scheduling']);
          });

          var group_label = $("#rotation-groups-" + block).next ().find ('span');
          if (code_data ['options'][0]['groups']) {
            group_label.removeClass ('on');
          } else {
              group_label.addClass ('on');
            }
          $("#rotation-groups-" + block).click ();
        }
      }
    }).fail (function (xhr, status, error) {
      console.log ("AI IMPORT ROTATION CODE ERROR:", xhr.status, xhr.statusText);
      $('#ai-error-container').text (ai_admin.error + ' ' + xhr.status + ': ' + xhr.statusText).show ();

      var rotation_container = $('#ai-rotation-container-' + block);
      set_editor_text (block, b64d (rotation_container.data ('code')));
      rotation_container.hide();
      $("#rotation-" + block).next ("label").find ('.checkbox-icon').removeClass("on");

      rotation_container.find ("ul").find ("li").remove ();
      rotation_container.find ("div.rounded").remove ();
    }).always (function() {
      $("#rotation-"+block).next ("label").find ('.checkbox-icon').removeClass("active");
    });
  }

  function generate_rotatation_code (block) {
    $("#rotation-"+block).next ("label").find ('.checkbox-icon').addClass("active");

    var rotation_container = $('#ai-rotation-container-' + block);
    var option = rotation_container.tabs ("option", "active") + 1;

    $(('#option-' + block + '-' + option)).data ('code', b64e (get_editor_text (block)));

    var rotation_data = [];
    rotation_container.find ("div.rounded").each (function (index) {
      var code_data = $('#option-' + block + '-' + (index + 1)).data ('code');
      var code = typeof code_data == 'undefined' ? '' : b64d (code_data);
      var group_rotation = $("#rotation-groups-" + block).next ().find ('span').hasClass ('on');
      var option_data = {
        'name': $(this).find ('input.option-name').val (),
        'share': $(this).find ('input.option-share').val (),
        'scheduling': $(this).find ('input.option-scheduling').val (),
        'time': $(this).find ('input.option-time').val (),
        'code': code, 'groups': group_rotation
      };

      rotation_data.push (option_data);
    });

    if (debug) console.log ('ROTATION DATA:', rotation_data);

    $.post (ajaxurl, {'action': 'ai_ajax_backend', 'ai_check': ai_nonce, 'generate-rotation-code': b64e (JSON.stringify (rotation_data))}
    ).done (function (data) {
      $('#ai-error-container').hide ();

      if (data != '') {
        var rotation_code = JSON.parse (data);
        if (typeof rotation_code !== "undefined") {
          if (debug) console.log ('ROTATION CODE:', rotation_code);
          set_editor_text (block, rotation_code);
        }
      }

    }).fail (function (xhr, status, error) {
      console.log ("AI GENERATE ROTATION CODE ERROR:", xhr.status, xhr.statusText);
      $('#ai-error-container').text (ai_admin.error + ' ' + xhr.status + ': ' + xhr.statusText).show ();

      var rotation_container = $('#ai-rotation-container-' + block);
      set_editor_text (block, b64d (rotation_container.data ('code')));
      rotation_container.hide();
      $("#rotation-" + block).next ("label").find ('.checkbox-icon').removeClass("on");

      rotation_container.find ("ul").find ("li").remove ();
      rotation_container.find ("div.rounded").remove ();
    }).always (function() {
      $("#rotation-"+block).next ("label").find ('.checkbox-icon').removeClass("active");

      $('input[name=ai_save]').css ('color', '#555');
//      $('.ai-rotation-warning').hide ();
    });
  }

  function add_rotate_options (block, new_options) {
    var rotation_container = $('#ai-rotation-container-' + block);
    var ul = rotation_container.find ("ul");
    var options = rotation_container.find ('ul >li').length;

    var rotation_tabs = $('#rotation-tabs');
    var li  = rotation_tabs.find ("li");
    var div = rotation_tabs.find ("div.rounded");

    var insertion = 0;

    for (option = options + 1; option <= options + new_options; option ++) {
      if (option > 17) break;

      var new_li = li.clone ().show ();
      new_li.find ("a").attr ('href', '#tab-option-' + block + '-' + option).text (String.fromCharCode (64 + option));
      new_li.attr ('id', 'option-' + block + '-' + option).appendTo (ul).data ('code', b64e (''));

      new_li.click (function () {
        var rotation_container = $(this).closest ('.ai-rotate');
        var block = rotation_container.attr('id').replace ("ai-rotation-container-", "");
        var old_option = rotation_container.data ('option');
        var new_option = $(this).attr('id').replace ("option-" + block + "-", "");
        rotation_container.data ('option', new_option);

        if (debug) console.log ('OPTION CHANGE:', old_option, '=>', new_option);

        $(('#option-' + block + '-' + old_option)).data ('code', b64e (get_editor_text (block)));
        set_editor_text (block, b64d ($(this).data ('code')));
      });

      div.clone ().show ().attr ('id', 'tab-option-' + block + '-' + option).appendTo (rotation_container);

      rotation_container.tabs ("refresh");
    }

    rotation_container.find ('[data-title]').each (function () {
      $(this).attr ('title', $(this).data ('title'));
    });

    rotation_container.find ("[title]").tooltip ({
        track: true,
        delay: 700,
        showURL: false,
        showBody: " | ",
        fade: 250
      });

    rotation_container.tabs ("option", "active", option - 2);
  }

  function remove_rotate_option (block, option) {
    var rotation_container = $('#ai-rotation-container-' + block);
    var options = rotation_container.find ('ul >li').length;

    if (options == 1) return;

    var ul = rotation_container.find ("ul");

    ul.find ("li").slice (option, option + 1).remove ();
    var div = rotation_container.find ("div.rounded").slice (option, option + 1).remove ();

    rotation_container.find ('ul li').each (function (index) {
      var option = index + 1;
      $(this).attr ('id', 'option-' + block + '-' + option).find ("a").attr ('href', '#tab-option-' + block + '-' + option).text (String.fromCharCode (64 + option));
    });

    rotation_container.find ("div.rounded").each (function (index) {
      var option = index + 1;
      $(this).attr ('id', 'tab-option-' + block + '-' + option);
    });

    rotation_container.tabs ("refresh");

    var new_option = option == 0 ? 0 : option - 1;
    active_li = $('#option-' + block + '-' + (new_option + 1));
    set_editor_text (block, b64d (active_li.data ('code')));
    ul.closest ('.ai-rotate').data ('option', new_option + 1);
  }

  function create_list_selector (element_name_prefix, index) {
    var select = $('#'+element_name_prefix+'-select-' + index);
    if (select.length !== 0) {
      var button = $('#'+element_name_prefix+'-button-'+index);

      var list_prefix = button.data ('list');
      if (list_prefix == null) list_prefix = element_name_prefix;

      function update_list (list, element_name_prefix) {
        if (typeof before_update_selection_from_list == 'function') {
          before_update_selection_from_list (index);
        }

        button.find ('span.ui-button-text').addClass ('ai-button-updating');

        setTimeout (function() {
          update_selection_from_list (list, element_name_prefix);
        }, 5);
      }

      button.click (function () {
        if (!select.hasClass ('multi-select')) {
          var options = select.find ('option');
          if (options.length == 0) {
            var filter_element = $('#ms-'+element_name_prefix+'-select-' + index).find ('.filter-input');
            var filter = filter_element.length ? filter_element.val () : '';

            var parameters_data = select.data ('parameters');
            var parameters = typeof parameters_data == 'undefined' ? '' : parameters_data;

            $('#ai-loading').show ();
            button.find ('span.ui-button-text').addClass ('ai-button-active').show ();

            $.get (ajaxurl + '?action=ai_ajax_backend&list-options=' + element_name_prefix + '&parameters=' + parameters + '&filter=' + filter + '&ai_check=' + ai_nonce, function (data) {
              if (data != '') {
                var message = '';
                var options = $('option', '<div>'+data+'</div>');
                if (options.length != 0) {
                  if ($(options [0]).attr ('value').length == 0) {
                    message = $(options [0]).text ();
                    options = options.splice (1);
                  }
                }
                select.attr ('data-message', message);

                select.html (options);
                create_multi_select (select, element_name_prefix, list_prefix, index);

                $('#ms-'+element_name_prefix+'-select-' + index).find ('.filter-message').text (message);

                update_list ($('#'+list_prefix+'-list-'+index), element_name_prefix);
              }

            }).fail (function (xhr, status, error) {
              $('input.filter-input', selection_container).remove ();
              var message = "Error loading " + element_name_prefix + " options: " + xhr.status + " " + xhr.statusText ;
              console.log (message);
            })
            .always (function () {
              $('#ai-loading').hide ();
              button.find ('span.ui-button-text').removeClass ('ai-button-active');
            });

          } else create_multi_select (select, element_name_prefix, list_prefix, index);

        } else {
          update_list ($('#'+list_prefix+'-list-'+index), element_name_prefix);
          $('#ms-'+element_name_prefix+'-select-'+index).toggle();
          }
      });

      $('#'+list_prefix+'-list-'+index).focusout (function () {
        var selection_container = $('#ms-'+element_name_prefix+'-select-'+index);
        if (selection_container.length && selection_container.is (':visible')) {
          update_list ($(this), element_name_prefix);
        }
      });
    }
  }

  function update_list_from_selection (select_element, element_name_prefix, list_prefix) {

    var ms = select_element.$element;
    var ms_val = ms.val();
    if (ms_val != null) {
      if (ms_val [0] == '') {
        ms_val = ms_val.splice (1)
      }
      ms_val = ms_val.join (', ').trim (',');
    }
    var index = ms.attr ('id').replace (element_name_prefix+'-select-','');
    var list = $('#'+list_prefix+'-list-'+index);

    var custom_data = list.attr ('data-custom');

    if (typeof custom_data != 'undefined' && custom_data != '') {
      if (ms_val != null) {
        if (ms_val != '') ms_val = ms_val + ', ';
        ms_val = ms_val + custom_data;
      } else ms_val = custom_data;
    }

    list.attr ('value', ms_val);
    select_element.qs1.cache();
//    select_element.qs2.cache();
  }

  function update_selection_from_list (list_element, element_name_prefix) {

    Array.prototype.diff = function (a) {
        return this.filter(function (i) {
            return a.indexOf(i) === -1;
        });
    };

    var index = list_element.attr ('id').replace (/^\D+/g, '');
    var select = $('#'+element_name_prefix+'-select-'+index);
    var selection_container = $('#ms-'+element_name_prefix+'-select-'+index);

    if (selection_container.is(':visible')) {
//      var list_items = list_element.attr ('value').split (',').map (Function.prototype.call, String.prototype.trim);
      var list_items = list_element.val ().split (',').map (Function.prototype.call, String.prototype.trim);

      if (list_items [0] == '') {
        list_items = list_items.splice (1)
      }

      if (list_element.hasClass ('ai-list-filter'))
        for (var i = 0; i < list_items.length; i++) {
          list_items [i] = list_items [i].replace (/ /g , '-').replace (/[\!\@\#\$%\^&\*\(\)\=\+\{\}\|\[\]\\\;\'\:\"\.\/\?]/g , '');
        }

      if (list_element.hasClass ('ai-list-filter-cat'))
        for (var i = 0; i < list_items.length; i++) {
          list_items [i] = list_items [i].replace (/ /g , '-').replace (/[\!\@\#\$%\^&\(\)\=\{\}\|\[\]\\\;\'\:\"\.\/\?]/g , '');
        }

      if (list_element.hasClass ('ai-list-uppercase')) list_items = list_items.map (Function.prototype.call, String.prototype.toUpperCase); else
        if (list_element.hasClass ('ai-list-lowercase')) list_items = list_items.map (Function.prototype.call, String.prototype.toLowerCase); else
          if (list_element.hasClass ('ai-list-country-case')) {
            var list_items = list_items.map (function callback (currentValue) {
              var data = currentValue.split (':');
              if (data [0] != null) data [0] = data [0].toUpperCase ();
              if (data [1] != null) data [1] = data [1].toUpperCase ();
              if (data [2] != null) data [2] = data [2].toLowerCase ();
              return data.join (':');
            });
          }

      $('#'+element_name_prefix+'-select-'+index).multiSelect('refresh').multiSelect ('deselect_all').multiSelect ('select', list_items);

      if (list_element.hasClass ('ai-list-custom')) {
        var custom_values = list_items;
        var selected_values = $('#'+element_name_prefix+'-select-'+index).val ();

        if (selected_values != null) custom_values = list_items.diff (selected_values);
        if (custom_values != null) custom_values = custom_values.join (', ');

        list_element.attr ('data-custom', custom_values);

        select.multiSelect ('deselect_all').multiSelect ('select', list_items);
      }

      if (select.hasClass ('ai-list-filter')) {
        var filter_div = $('#ms-'+element_name_prefix+'-select-'+index).find ('.ai-list-filter-container');
        var filter_input = filter_div.find ('.filter-input');
        var filter_button = filter_div.find ('.filter-button');

        if (!filter_div.hasClass ('configured')) {
          filter_div.addClass ('configured');

          filter_input.on ('keyup keypress', function(e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
              e.preventDefault();
              filter_button.click ();
              return false;
            }
          });

          filter_button.on ('click', function(e) {
            e.preventDefault();

            var filter = filter_input.val ();
            select.attr ('data-filter', filter);

            select.empty ();
            select.removeClass ('multi-select');
            $('#'+element_name_prefix+'-button-'+index).click ();

            return false;
          });
        }

        filter_div.show ();
        $('#ms-'+element_name_prefix+'-select-'+index).find ('.search-input').hide ();
        filter_button.button().show ();
        filter_input.val (select.attr ('data-filter'));
        $('#ms-'+element_name_prefix+'-select-' + index).find ('.filter-message').text (select.attr ('data-message'));
      }
    }

    var button = $('#'+element_name_prefix+'-button-'+index);
    button.find ('span.ui-button-text').removeClass ('ai-button-updating');
  }

  function create_multi_select (select, element_name_prefix, list_prefix, index) {
    select.addClass ('multi-select');

    select.multiSelect ({
      selectableHeader:
            '<div class="ai-list-filter-container">' +
              '<input type="text" class="filter-input" autocomplete="off" placeholder="' + ai_admin.filter + '" title="' + ai_admin.filter_title + '">' +
              '<button class="filter-button" style="margin-top: -2px; display: none;">' + ai_admin.button_filter + '</button>' +
              '<span class="filter-message"></span>' +
            '</div>' +
            '<input type="text" class="search-input" autocomplete="off" placeholder="' + ai_admin.search + '">',
      selectionHeader:   '',
      afterInit: function(ms){
        var that = this,
            $selectableSearch = that.$selectableUl.prev(),
            $selectionSearch = that.$selectionUl.prev(),
            selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
            selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';

        that.qs1 = $selectableSearch.quicksearch (selectableSearchString)
        .on('keydown', function(e){
          if (e.which === 40){
            that.$selectableUl.focus();
            return false;
          }
        });

//        that.qs2 = $selectionSearch.quicksearch (selectionSearchString)
//        .on('keydown', function(e){
//          if (e.which == 40){
//            that.$selectionUl.focus();
//            return false;
//          }
//        });
      },
      afterSelect: function(values){
        update_list_from_selection (this, element_name_prefix, list_prefix);
      },
      afterDeselect: function(values){
        update_list_from_selection (this, element_name_prefix, list_prefix);
      }
    });

//    $('#ms-'+element_name_prefix+'-select-' + index).hide();
  }

  function create_list_editor (element_name_prefix, index) {
    var editor  = $('#'+element_name_prefix+'-editor-'+index);
    var list    = $('#'+element_name_prefix+'-list-'+index);
    if (editor.length !== 0) {
      $('#'+element_name_prefix+'-button-'+index).click (function () {
        update_editor_from_list (list, element_name_prefix, true);
      });

      editor.focusout (function () {
        update_list_from_editor (editor, element_name_prefix)
      });

      list.focusout (function () {
        if (editor.is(':visible'))
          update_editor_from_list ($(this), element_name_prefix, false);
      });
    }
  }

  function clean_url_list (list_element, list_items) {

    var clean_protocol = list_element.hasClass ('ai-clean-protocol');
    var clean_domain   = list_element.hasClass ('ai-clean-domain');
    var only_domain    = list_element.hasClass ('ai-only-domain');
    var sort_list      = list_element.hasClass ('ai-list-sort');

    function onlyUnique (value, index, self) {
        return self.indexOf (value) === index;
    }

    list_items = list_items.filter (onlyUnique);

    var clean_list_items = [];

    for (var i = 0; i < list_items.length; i++) {
      var list_item = list_items [i];

      if (clean_protocol && list_item.indexOf ('http') == 0) {
        list_item = list_item.replace ('http://', '');
        list_item = list_item.replace ('https://', '');

        var slash = list_item.indexOf ("/");

        if (clean_domain) {
          if (slash > 0) {
            list_item = list_item.substring (slash);
          } else list_item = '';
        } else
        if (only_domain) {
          if (slash > 0) {
            list_item = list_item.substring (0, slash);
          }
        }
      }

      if (list_item != '') clean_list_items.push (list_item);
    }

    if (sort_list) {
      clean_list_items.sort();
    }

    return clean_list_items;
  }

  function update_editor_from_list (list_element, element_name_prefix, toggle) {
    var index = list_element.attr ('id').replace (element_name_prefix+'-list-','');
    var editor = $('#'+element_name_prefix+'-editor-'+index);
    if (toggle) editor.toggle();
    if (editor.is(':visible')) {

      var list = list_element.attr ('value');
      var list_separator = ',';

      if (list_element.hasClass ('ai-list-space')) {
        if (list.indexOf (' ') > - 1 && list.indexOf (',') == - 1) list_separator = ' ';
      }

      var list_items = list.split (list_separator).map (Function.prototype.call, String.prototype.trim);

      clean_list_items = clean_url_list (list_element, list_items);

      editor.val (clean_list_items.join ("\n"));
    } else update_list_from_editor (editor, element_name_prefix)
  }

  function update_list_from_editor (editor, element_name_prefix) {
    var list_items = editor.val ().split ("\n").map (Function.prototype.call, String.prototype.trim);

    var index = editor.attr ('id').replace (element_name_prefix+'-editor-','');
    var list_element = $('#'+element_name_prefix+'-list-'+index);

    clean_list_items = clean_url_list (list_element, list_items);

    list_element.attr ('value', clean_list_items.join (', '));
  }

  function configure_hidden_tab () {
    var current_tab;
    var tab;

    if (debug) console.log ("");
    if (debug) {
      var current_time_start = new Date().getTime();
      console.log ("since last time: " + ((current_time_start - last_time) / 1000).toFixed (3));
    }
    if (debug) console.log ("configure_hidden_tab");
    if (debug) console.log ("tabs_to_configure: " + tabs_to_configure);

    do {
      if (tabs_to_configure.length == 0) {
        save_enabled = true;
        if (debug_title) $("#plugin_name").css ("color", "#000");
        if (debug) console.log ("configure_hidden_tab: DONE");
        return;
      }
      current_tab = tabs_to_configure.pop();
      tab = $("#tab-" + current_tab);
    } while (tab.hasClass ('configured'));

    if (debug) console.log ("Configuring tab: " + current_tab);

    if (current_tab != 0) configure_tab (current_tab); else configure_tab_0 ();

    if (debug) {
      var current_time = new Date().getTime();
      console.log ("time: " + ((current_time - current_time_start) / 1000).toFixed (3));
      console.log ("TIME: " + ((current_time - start_time) / 1000).toFixed (3));
      last_time = current_time;
    }

//    if (tabs_to_configure.length != 0) setTimeout (configure_hidden_tab, 10);
    if (tabs_to_configure.length != 0) {
      if (ai_tab_setup_delay != 0) {
        setTimeout (configure_hidden_tab, ai_tab_setup_delay);
      }
    } else {
        save_enabled = true;
        if (debug_title && ai_tab_setup_delay != 0) $("#plugin_name").css ("color", "#000");
        if (debug) console.log ("configure_hidden_tab: DONE");
      }
  }

  function configure_chart (container) {
    var ai_adb_flag_blocked = 0x80;

    if (!$(container).hasClass ('not-configured')) return;
    var template = $(container).data ('template');

    if (typeof template != 'undefined') {
      var new_colors = [];
      var color_indexes = $(container).data ('colors');
      if (typeof color_indexes != 'undefined') {
        var colors = $.elycharts.templates['ai-pie'].defaultSeries.values;
        color_indexes.forEach (function (element) {
          if (element == ai_adb_flag_blocked )
            new_colors.push (colors [9]); else
              new_colors.push (colors [element]);
        });
      }

      var values = $(container).data ('values-1');
      if (values == null) values = $(container).data ('values-2');
      if (values == null) values = $(container).data ('values-3');
      if (values == null) values = $(container).data ('values-4');
      if (values == null) values = $(container).data ('values-5');
      if (values == null) values = $(container).data ('values-6');
      if (values == null) values = $(container).data ('values-7');
      if (values == null) values = $(container).data ('values-8');
      if (values == null) values = $(container).data ('values-9');

      var legend = $(container).data ('legend');
      if (typeof legend != 'undefined' && typeof legend ['serie' + (ai_adb_flag_blocked + 1)] != 'undefined') {
        var new_legend = {};
        for (var legend_item in legend) {
          if (legend_item == 'serie' + (ai_adb_flag_blocked + 1))
            new_legend ['serie10'] = legend [legend_item]; else
              new_legend [legend_item] = legend [legend_item];
        }
        legend = new_legend;
      }

      $(container).chart({
        template: template,
        labels:   $(container).data ('labels'),
        values: {
          serie1: values,
          serie2: $(container).data ('values-2'),
          serie3: $(container).data ('values-3'),
          serie4: $(container).data ('values-4'),
          serie5: $(container).data ('values-5'),
          serie6: $(container).data ('values-6'),
          serie7: $(container).data ('values-7'),
          serie8: $(container).data ('values-8'),
          serie9: $(container).data ('values-9'),
          serie10: $(container).data ('values-' + (ai_adb_flag_blocked + 1)),  // BLOCKED
        },
        legend: legend,
        tooltips: {serie1: $(container).data ('tooltips')},
        defaultSeries: {values: new_colors, tooltip: {height: $(container).data ('tooltip-height')}},
        defaultAxis : {
          max: $(container).data ('max'),
        },
        features: {
          grid: {
            draw: values == null ? true : values.length < 50,
          }
        }
      });

      $(container).removeClass ('not-configured');
      $(container).parent().find ('div.ai-chart-label').show ();
      $(container).parent().find ('div.ai-chart-version-label').show ();

      $(container).parent().find ('div.ai-chart-version-label').click (function () {
        // Clear single version display
        var block = $(this).closest ('.ai-charts').attr ("id").replace ("statistics-elements-","");
        if ($('input#load-custom-range-' + block).hasClass ('ai-version')) {
          $('input#load-custom-range-' + block).removeClass ('ai-version');
          $('input#load-custom-range-' + block).removeAttr ('data-version');
          $("input#load-custom-range-" + block).click ();
          return;
        }
      });

      var legend = $(container).parent ().find ('.ai-chart-legend');
      if (legend.length != 0) {
        legend.find ('div').css ('visibility', 'hidden');
        var version_indexes = legend.data ('versions');
        var text_index = 0;
        legend.find ('text').each (function () {
          $(this).addClass ('ai-label-index');
          $(this).attr ('data-label-index', version_indexes [text_index]);
          text_index ++;
        });
        legend.removeClass ('ai-chart-legend');
      }
    }
  }

  function update_rating (parameter) {
    var rating_bar = $('#ai-rating-bar');
//    var nonce = rating_bar.attr ('nonce');
    $("#rating-value span").load (ajaxurl+"?action=ai_ajax_backend&rating=" + parameter + "&ai_check=" + ai_nonce, function() {
      var rating = $("#rating-value span").text ();
      var rating_value = 0;
      if (rating != '') var rating_value = parseFloat (rating);
      $("#rating-value").css ('width', rating_value * 20 + '%');

      if ($("#rating-value span").text () == '') {
        $("#ai-rating-bar").hide ();
        $('#ai-stars').show ();
      }
    });
  }

  function configure_charts (container) {
    $(container).find ('.ai-chart.not-configured').each (function() {
      if (!$(this).hasClass ('hidden')) {
        $(this).attr ('style', '');
        configure_chart (this);
        $(container).find ('.ai-label-index').click (function () {
          var block = $(this).closest ('.ai-chart').data ('block');
          var version_index = $(this).data ('label-index');
          $('input#load-custom-range-' + block).addClass ('ai-version').attr ('data-version', version_index);
          $("input#load-custom-range-" + block).click ();
        });
      }
    });
  }

  function replace_block_number (element, attribute, old_block, new_block) {
    var attr_value = element.attr (attribute);
    var attr_number = attr_value.substr (- old_block.toString().length);
    if (attr_number == old_block) {
      element.attr (attribute, attr_value.substr (0, attr_value.length - old_block.toString().length) + new_block);

//      console.log (attribute, element.attr (attribute));
    }
  }

  function copy_to_clipboard () {
    if (debug) console.log ("AI COPY FROM BLOCK", active_tab);

    var clipboard = $('#ai-clipboard');
    clipboard.html ($('#ai-clipboard-template').html ());

    $('div#tab-' + active_tab + ' input[name]:checkbox').each (function (index){
      var attr = $(this).attr('checked');
      var checked = typeof attr !== typeof undefined && attr !== false;

      if (checked)
        clipboard.find ('input[name]:checkbox').eq (index).attr ('checked', 'checked').next ("label").find ('.checkbox-icon').addClass("on"); else
          clipboard.find ('input[name]:checkbox').eq (index).removeAttr ('checked').next ("label").find ('.checkbox-icon').removeClass("on");
    });

    $('div#tab-' + active_tab + ' input[name]:radio').each (function (index){
      var attr = $(this).attr('checked');
      var checked = typeof attr !== typeof undefined && attr !== false;

      if (checked)
        clipboard.find ('input[name]:radio').eq (index).attr ('checked', 'checked'); else
          clipboard.find ('input[name]:radio').eq (index).removeAttr ('checked');
    });

    $('div#tab-' + active_tab + ' select[name]').each (function (index){
      var value = $(this).find ("option:selected").val ();
      clipboard.find ('select[name]').eq (index).find ("option").removeAttr ('selected');
      clipboard.find ('select[name]').eq (index).find ("option[value = '" + value + "']").attr ("selected", true);
    });

    $('div#tab-' + active_tab + ' input[name]:text').each (function (index){
      clipboard.find ('input[name]:text').eq (index).attr ('value', $(this).val ());
    });


    // Lists
    if ($('#list-settings-' + active_tab).is(':visible')) {
      clipboard.find ('#list-settings-999').show ();
    } else {
        clipboard.find ('#list-settings-999').hide ();
      }

    if ($('#list-settings-' + active_tab).hasClass('ai-expanded')) {
      clipboard.find ('#list-settings-999').addClass ('ai-expanded');
    } else {
        clipboard.find ('#list-settings-999').removeClass ('ai-expanded');
      }

    $('div#tab-' + active_tab + ' table.ai-lists tr').each (function (index){
      if ($(this).is(':visible')) {
        clipboard.find ('table.ai-lists tr').eq (index).show ();
      } else {
          clipboard.find ('table.ai-lists tr').eq (index).hide ();
        }

      if ($(this).find ('span.checkbox-list-button').hasClass ('dashicons-no')) {
        clipboard.find ('table.ai-lists tr').eq (index).find ('span.checkbox-list-button').addClass ('dashicons-no').removeClass ('dashicons-yes');
      } else {
          clipboard.find ('table.ai-lists tr').eq (index).find ('span.checkbox-list-button').removeClass ('dashicons-no').addClass ('dashicons-yes');
        }

      if ($(this).hasClass ('list-items')) {
        clipboard.find ('table.ai-lists tr').eq (index).addClass ('list-items');
      } else {
          clipboard.find ('table.ai-lists tr').eq (index).removeClass ('list-items');
        }
    });


    clipboard.find ('textarea.simple-editor').text (get_editor_text (active_tab));

    $("#ai-container .ai-copy").each (function () {
      $(this).next ("label").find ('.checkbox-icon').addClass("on");
    });
  }

  function load_saved_settings_to_clipboard (block, paste) {
    if (debug) console.log ("AI LOAD BLOCK", block, "FROM DB");

    var tools_button = $("#tools-button-" + active_tab);
    if (!tools_button.next ('label').find ('.checkbox-icon').hasClass ("on")) {
      tools_button.click ();
    }

    $('#ai-loading').show ();

    $.get (ajaxurl + '?action=ai_ajax_backend&settings=' + block + '&single=1&ai_check=' + ai_nonce, function (settings) {
      if (debug) console.log ("AI BLOCK LOADED");

      var clipboard = $('#ai-clipboard');

      clipboard.html ($('div#tab-' + block, settings).html ());

      clipboard.find ('[id]').each (function () {
        replace_block_number ($(this), 'id', block, 999);
      });

      clipboard.find ('[for]').each (function () {
        replace_block_number ($(this), 'for', block, 999);
      });

      clipboard.find ('[href]').each (function () {
        replace_block_number ($(this), 'href', block, 999);
      });

      clipboard.find ('[name]').each (function () {
        replace_block_number ($(this), 'name', block, 999);
      });

      clipboard.find ('[class]').each (function () {
        replace_block_number ($(this), 'class', block, 999);
      });

      clipboard.find ('pre.ai-block-number').each (function () {
        var text = $(this).text ().replace (block, 999);
        $(this).text (text);
      });

      $("#ai-container .ai-copy").each (function () {
        $(this).next ("label").find ('.checkbox-icon').addClass("on");
      });

//      if (paste) {
//        var tools_visible = $('#ai-tools-toolbar-' + active_tab).is(':visible');

//        paste_from_clipboard (true, true, true, false);

//        if (tools_visible) {
//          $('#ai-tools-toolbar-' + active_tab).show ();
//          $("#tools-button-"+active_tab).next ('label').find ('.checkbox-icon').addClass("on");
//        }
//      }
    }).fail (function (xhr, status, error) {
      console.log ("AI LOADING ERROR:", xhr.status, xhr.statusText);
      $('#ai-error-container').text (ai_admin.error + ' ' + xhr.status + ': ' + xhr.statusText).show ();
    })
    .always (function () {
      $('#ai-loading').hide ();
    });
  }

  function paste_from_clipboard (paste_name, paste_code, paste_settings, clear) {

    if (clear) {
      var clipboard_template = $('#ai-clipboard-template');
      clipboard_template.find ('input#name-edit-999').attr ('value', 'Block ' + active_tab).attr ('default', 'Block ' + active_tab);
      var clipboard = clipboard_template.html ();
    } else {
        var clipboard = $('#ai-clipboard').html ();
      }

    if (clipboard != '' && active_tab != 0) {
      if (debug) console.log ("AI PASTE TO BLOCK", active_tab);

      var destination_tab = $('div#tab-' + active_tab);

      var name = destination_tab.find ('input#name-edit-' + active_tab).val ();
      var code = get_editor_text (active_tab);

      if (paste_settings) {
        var simple_editor = $('#simple-editor-' + active_tab).is(":checked");
        var tools_visible = $('#ai-tools-toolbar-' + active_tab).is(':visible');
        var copy_active   = destination_tab.find ('.ai-copy').next ("label").find ('.checkbox-icon').hasClass("on");

        if (simple_editor) {
          $('#simple-editor-' + active_tab).click ();
        }

        var save_button_text = destination_tab.find ('input[name=ai_save]').attr('value');
        var exceptions_button = destination_tab.find ('#exceptions-button-container-' + active_tab).html ();
        var exceptions_container = destination_tab.find ('#block-exceptions-' + active_tab).html ();

        destination_tab.html (clipboard).find ('input[name=ai_save]').attr('value', save_button_text);

        if (!paste_name) {
          destination_tab.find ('input#name-edit-999').val (name);
        }

        if (!paste_code) {
          destination_tab.find ('textarea#block-999').val (code);
        }

        destination_tab.find ('span#name-label-999').text (destination_tab.find ('input#name-edit-999').val ());

        var block_name = destination_tab.find ('input#name-edit-999').val ();
        destination_tab.find ('pre.ai-block-name').text ('[adinserter name="' + block_name + '"]');

        destination_tab.find ('[id]').each (function () {
          replace_block_number ($(this), 'id', 999, active_tab);
        });

        destination_tab.find ('[for]').each (function () {
          replace_block_number ($(this), 'for', 999, active_tab);
        });

        destination_tab.find ('[href]').each (function () {
          replace_block_number ($(this), 'href', 999, active_tab);
        });

        destination_tab.find ('[name]').each (function () {
          replace_block_number ($(this), 'name', 999, active_tab);
        });

        destination_tab.find ('[class]').each (function () {
          replace_block_number ($(this), 'class', 999, active_tab);
        });

        destination_tab.find ('pre.ai-sidebars').text ('');

        destination_tab.find ('pre.ai-block-number').each (function () {
          var text = $(this).text ().replace (999, active_tab);
          $(this).text (text);
        });

        destination_tab.find ('#exceptions-button-container-' + active_tab).html (exceptions_button);
        destination_tab.find ('#block-exceptions-' + active_tab).html (exceptions_container);

        configure_tab (active_tab);

        if (simple_editor) {
          $('#simple-editor-' + active_tab).click ();
        }

        if (tools_visible) {
          $('#ai-tools-toolbar-' + active_tab).show ();
          $("#tools-button-" + active_tab).next ('label').find ('.checkbox-icon').addClass ("on");
        }

        if (copy_active) {
          destination_tab.find ('.ai-copy').next ("label").find ('.checkbox-icon').addClass("on");
        }
      } else {
          if (paste_name) {
            var clipboard_name = $(clipboard).find ('input#name-edit-999').val ();
            destination_tab.find ('input#name-edit-' + active_tab).val (clipboard_name);
            destination_tab.find ('span#name-label-' + active_tab).text (clipboard_name);
            destination_tab.find ('pre.ai-block-name').text ('[adinserter name="' + clipboard_name + '"]');
          }

          if (paste_code) {
            set_editor_text (active_tab, $(clipboard).find ('textarea#block-999').val ());
          }
        }

      if (debug) console.log ("AI PASTE END");
    } else if (debug) console.log ("AI PASTE FAILED");
  }

  function highlight_active_block () {
    $('#ai-list-table tr.ai-block-list').removeClass ('ai-block-active');
    $('#ai-list-table tr.ai-block-' + active_tab).addClass ('ai-block-active');
  }

  function check_and_configure_active_tab () {
    highlight_active_block ();

    if (!$("#tab-" + active_tab).hasClass ('configured')) {
      if (debug) console.log ("");
      if (debug) console.log ("Empty tab: " + active_tab);
      tabs_to_configure.push (active_tab);
      setTimeout (configure_hidden_tab, 10);
      if (debug) console.log ("tabs_to_configure: " + tabs_to_configure);
    } else if (active_tab != 0) {
        if (syntax_highlighting) {
          var editor = ace.edit ("editor-" + active_tab);
          editor.getSession ().highlightLines (10000000);
        }
      }
  }

  function configure_website_list () {
    $("td.ai-website-desc").click (function () {
      var row = $(this).closest ('tr.ai-website-list');
      var website = row.data ("website");

      var connected = row.find ('.checkbox-icon').hasClass ('on');

      if (!connected) {
        $("#ai-website-list-table td.ai-website-labels").show ();
        $("#ai-website-list-table td.ai-website-editor").hide ();

        $("#ai-cancel-websites").show ();
        $("#ai-save-websites").show ();
        $("#ai-rearrange-websites").removeClass ('blue');

        row.find (".ai-website-editor .ai-website-key").val (row.find (".ai-website-editor .ai-website-key").attr ('data-key'));
        row.find (".ai-website-editor .ai-website-desc").val (row.find (".ai-website-labels.ai-website-desc").text ());
        row.find (".ai-website-editor .ai-website-url").val (row.find (".ai-website-labels.ai-website-url").text ());

        row.find (".ai-website-labels").hide ();
        row.find (".ai-website-editor").show ();

        row.find (".ai-website-editor .ai-website-desc").focus ();
      }
    });

    $("span.ai-website-key").dblclick (function () {
      var row = $(this).closest ('tr.ai-website-list');
      row.toggleClass ('read-only');
    });

    $("input.ai-website-key, input.ai-website-desc, input.ai-website-url").on('keyup keypress', function (e) {
      var keyCode = e.keyCode || e.which;
      ignore_key = true;

      var row = $(this).closest('tr.ai-website-list');
      var website = row.data ("website");

      if (keyCode == 27) {
        row.find (".ai-website-labels").show ();
        row.find (".ai-website-editor").hide ();

        ignore_key = false;
      }
      else if (keyCode == 13) {
        $("#ai-save-websites").click ();

        ignore_key = false;
        e.preventDefault();
        return false;
      }
    }).focusout (function() {
      if (ignore_key) {
        var row = $(this).closest ('tr.ai-website-list');
        var website = row.data ("website");

        row.find (".ai-website-editor .ai-website-key").attr ('data-key', row.find (".ai-website-editor .ai-website-key").val ());
        row.find (".ai-website-labels.ai-website-desc").text (row.find (".ai-website-editor .ai-website-desc").val ());
        row.find (".ai-website-labels.ai-website-url").text (row.find (".ai-website-editor .ai-website-url").val ());
      }
      ignore_key = true;
    });

    $("#ai-website-list-table .ai-delete-website").click (function () {

      var row = $(this).closest ('tr.ai-website-list');
      var website = row.data ("website");
      var url = row.find (".ai-website-labels.ai-website-url").text ();
      var desc = row.find (".ai-website-labels.ai-website-desc").text ();
      var message = website;
      var message = ai_admin.delete_website + '<br />' + desc + '<br />' + url;

      $('<div />').html (message).attr ('title', ai_admin.warning).dialog ({
        bgiframe: true,
        draggable: false,
        resizable: false,
        modal: true,
        height: "auto",
        width: 400,
        position: {my: 'center', at: 'center', of: '#ai-manage-websites-container'},
        buttons: [{
          text: ai_admin.cancel,
          click: function() {
            $(this).dialog ("close");
          }
          },
          {
          text: ai_admin.delete_all,
          click: function() {
            $(this).dialog ("close");

            $("#ai-cancel-websites").hide ();
            $("#ai-save-websites").hide ();
            $("#ai-rearrange-websites").removeClass ('blue');

            reload_websites ('&delete=all');
          }
          },
          {
          text: ai_admin.delete,
          click: function() {
            $(this).dialog ("close");

            $("#ai-cancel-websites").hide ();
            $("#ai-save-websites").hide ();
            $("#ai-rearrange-websites").removeClass ('blue');

            reload_websites ('&delete=' + website);
          }
          }
        ],
      });
    });

    $("#ai-website-list-table .ai-connect-website").click (function () {
      var row = $(this).closest ('tr.ai-website-list');
      var website = row.data ("website");

      var read_only_parameter = row.hasClass ('read-only') ? '&read-only=1' : '';

      var connected = row.find ('.ai-connect-website .checkbox-icon').hasClass ('on');
//      if (connected) website = '';

      ai_reload_websites_function = function () {
        if ($('#ai-website-data .ai-ajax-error').length == 0) {
          window.location.href = ai_settings;
        }
      }

      if ($("#ai-save-websites").is(':visible')) {
        $("#ai-save-websites").attr ('data-connect', website).click ();
      } else {
          reload_websites ('&connect=' + website + read_only_parameter);
        }
    });

    $("#ai-website-data .ai-ajax-error").dblclick (function () {
      $('#ai-remote-dbg-error-msg').toggle ();
    });


    $("#ai-website-list-table label[title]").tooltip ({
        track: true,
        delay: 700,
        showURL: false,
        showBody: " | ",
        fade: 250
      });
  }

  function configure_list () {
    var data_container = $("#ai-list-data");

    $(".ai-tab-link").click (function () {
      var tab = $(this).data ('tab') - start;
      $("#ai-tab-container").tabs ({active: tab});

      active_tab = parseInt ($(this).data ('tab'));

      if (debug) console.log ("$('.ai-tab-link').click", active_tab);

      check_and_configure_active_tab ();

    });

    $("label.ai-copy-block").click (function () {
      var block = $(this).closest ('tr').data ('block');

      load_saved_settings_to_clipboard (block, true);
    });

    $("label.ai-pause-block").click (function () {
      if (ai_read_only) return;

      var block = $(this).closest ('tr').data ('block');

      reload_list ('cmd=pause&cmd-block=' + block);
      ai_reload_list_function = function () {
        var block_button = $('#disable-insertion-' + block);
        var block_button_paused = block_button.parent ().find ('.icon-pause').hasClass ('on');
        var new_paused = $('#ai-list-table tr.ai-block-' + block).find ('label.ai-pause-block').hasClass ('ai-paused');

        if (new_paused != block_button_paused) {
          block_button.click ();
        }
      }
    });

    $("label.ai-preview-block").click (function () {
      var block = $(this).closest ('tr').data ('block');

      var window_width = 820;
      var window_height = 820;
      var window_left  = 100;
      var window_top   = (screen.height / 2) - (820 / 2);

      var param = {'action': 'ai_ajax_backend', 'preview': block, 'ai_check': ai_nonce, 'read_only': 1};
      open_popup_window_post (ajaxurl, 'width='+window_width+',height='+window_height+',top='+window_top+',left='+window_left+',resizable=yes,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no', 'preview', param);
    });

    highlight_active_block ();

    data_container.disableSelection();

    $("#ai-list-data td[title]").tooltip ({
        track: true,
        delay: 700,
        showURL: false,
        showBody: " | ",
        fade: 250
      });
  }

  function reload_websites (parameters) {
    website_list_search_reload = false;
    var list = encodeURIComponent ($("#ai-website-list-search").val());

    var data_container = $("#ai-website-data");

    $('#ai-loading').show ();

    if (typeof parameters == 'undefined') parameters = '';

    data_container.load (ajaxurl+"?action=ai_ajax_backend&websites=" + list + parameters + "&ai_check=" + ai_nonce, function (response, status, xhr) {
      $('#ai-loading').hide ();
      if (status == "error") {
        var message = "Error downloading website data: " + xhr.status + " " + xhr.statusText;
        data_container.html (message);
        if (debug) console.log (message);
      } else {
          configure_website_list ();

          if (typeof ai_reload_websites_function == 'function') {
            ai_reload_websites_function ();
            ai_reload_websites_function = null;
          }
        }
    });
  }

  function reload_list (settings) {
    list_search_reload = false;
    var list = encodeURIComponent ($("#ai-list-search").val());
    var all = + !$("#ai-load-all").hasClass ('light-blue');

    var rearrange_controls = $('#list-rearrange-controls');
    var rearrange = rearrange_controls.hasClass ('rearrange')

    rearrange_controls.removeClass ('rearrange').hide ();
    $("#ai-rearrange").removeClass ('blue');

    var rearrange_data = '';
    if (rearrange) {
      var table = $('table#ai-list-table');
      var original_blocks = table.data ('blocks');
      if (typeof original_blocks == 'undefined') original_blocks = new Array();

      var new_blocks = new Array();
      table.find ('tbody tr').each (function (index) {
        new_blocks.push ($(this).data ('block'));
      });

      rearrange_data = "&blocks-org=" + JSON.stringify (original_blocks) + "&blocks-new=" + JSON.stringify (new_blocks);
    }

    var data_container = $("#ai-list-data");
    var safe_mode = Boolean (parseInt ($('#ai-data').attr ('safe-mode')));
    var safe_mode_url = safe_mode ? '&safe-mode' : '';
    var settings_data = typeof settings == 'undefined' ? '' : '&' + settings;

    $('#ai-loading').show ();

    data_container.load (ajaxurl+"?action=ai_ajax_backend&list=" + list + "&all=" + all + "&start=" + start + "&end=" + end + "&active=" + active_tab + rearrange_data + safe_mode_url + settings_data + "&ai_check=" + ai_nonce, function (response, status, xhr) {
      $('#ai-loading').hide ();
      if (status == "error") {
        var message = "Error downloading list data: " + xhr.status + " " + xhr.statusText;
        data_container.html (message);
        if (debug) console.log (message);
      } else {
          configure_list ();

          if (typeof ai_reload_list_function == 'function') {
            ai_reload_list_function ();
            ai_reload_list_function = null;
          }
          if (rearrange) reload_settings ();
        }
    });
  }

  function reload_adsense_list (update_ad_units) {
    adsense_search_reload = false;
    var list = encodeURIComponent ($("#adsense-list-search").val());
    var all = + !$("#adsense-load-all").parent ().find ('.checkbox-icon').hasClass ('on');

    var data_container = $("#adsense-list-data");

    data_container.load (ajaxurl+"?action=ai_ajax_backend&adsense-list=" + list + "&all=" + all + "&update_ad_units=" + (update_ad_units ? 1 : 0) + "&ai_check=" + ai_nonce, function (response, status, xhr) {
      $("#adsense-reload").parent ().find ('.checkbox-icon').removeClass ('on');

      if (status == "error") {
        var message = "Error downloading AdSense data: " + xhr.status + " " + xhr.statusText;
        data_container.html (message);
        if (debug) console.log (message);


      } else {
          if ($('#adsense-client-id', data_container).length) {
            $('#adsense-list-controls').hide ();
            $('button.ai-top-button', data_container).button().show ();

            $("#save-client-ids").click (function () {

              var client_id = $("input#adsense-client-id").val ();
              var client_secret = $("input#adsense-client-secret").val ();

              data_container.text (ai_admin.loading);

              $('#ai-loading').show ();
              $.get (ajaxurl + '?action=ai_ajax_backend&adsense-client-id=' + btoa (client_id) + '&adsense-client-secret=' + btoa (client_secret) + '&ai_check=' + ai_nonce, function (data) {
                reload_adsense_list (false);
              }).fail (function (xhr, status, error) {
                var message = "Error saving AdSense client IDs: " + xhr.status + " " + xhr.statusText ;
                console.log (message);
              })
              .always (function () {
                $('#ai-loading').hide ();
              });
            });

            $(".authorize-adsense", data_container).click (function () {

              $('#adsense-list-controls').show ();
              data_container.text (ai_admin.loading);

              authorization_code = '';
              update_adsense_authorization (authorization_code);
            });

            return;
          } else

          if ($('#adsense-authorization-code', data_container).length) {
            $('#adsense-list-controls').hide ();
            $('button.ai-top-button', data_container).button().show ();

            $(".authorize-adsense", data_container).click (function () {

              var authorization_code = $("input#adsense-authorization-code").val ();

              $('#adsense-list-controls').show ();
              data_container.text (ai_admin.loading);

              if ($(this).hasClass ('clear-adsense')) authorization_code = '';
              if ($(this).hasClass ('own-ids')) authorization_code = 'own-ids';


              update_adsense_authorization (authorization_code);
            });

            return;
          }

          $('#adsense-list-controls').show ();

          var publisher_id = $('#adsense-data', data_container).data ('publisher-id');
          if (typeof publisher_id == 'undefined') publisher_id = '';

          $('label#google-adsense-button').attr ('title', ai_admin.google_adsense_homepage + ' ' + publisher_id)
            .tooltip({
              track: true,
              delay: 700,
              showURL: false,
              showBody: " | ",
              fade: 250
            });

          $("label.adsense-copy-code").click (function () {
            var ad_slot_id = $(this).closest ('tr').data ('id');
            var ad_name = atob ($(this).closest ('tr').data ('name'));

            if (debug) console.log ('ADSENSE CODE: ', ad_slot_id);

            $('#ai-loading').show ();
            $.get (ajaxurl + '?action=ai_ajax_backend&adsense-code=' + ad_slot_id + '&ai_check=' + ai_nonce, function (data) {

              var code_data = JSON.parse (data);
              var error = code_data ['error-message'];

              if (error == '') {
                var adsense_code = code_data ['code'];

                if (debug) console.log (adsense_code);

                var clipboard_template  = $('#ai-clipboard-template');
                var clipboard           = $('#ai-clipboard');
                clipboard.html (clipboard_template.html ());
                clipboard.find ('input#name-edit-999').attr ('value', ad_name).attr ('default', ad_name);

                clipboard.find ('textarea.simple-editor').text (adsense_code);

                $("#ai-container .ai-copy").each (function () {
                  $(this).next ("label").find ('.checkbox-icon').addClass("on");
                });

                var tools_button = $("#tools-button-" + active_tab);
                if (!tools_button.next ('label').find ('.checkbox-icon').hasClass ("on")) {
                  tools_button.click ();
                }
              } else {
                  console.log ('AdSense API error:', error);
                }
            }).fail (function (xhr, status, error) {
              var message = "Error downloading AdSense code: " + xhr.status + " " + xhr.statusText ;
              console.log (message);
            })
            .always (function () {
              $('#ai-loading').hide ();
            });

          });

          $("label.adsense-preview-code").click (function () {
            var ad_slot_id = $(this).closest ('tr').data ('id');
            var ad_name = $(this).closest ('tr').data ('name');

            var window_width = 820;
            var window_height = 820;
            var window_left  = 100;
            var window_top   = (screen.height / 2) - (820 / 2);

            var param = {'action': 'ai_ajax_backend', 'preview': 'adsense', 'ai_check': ai_nonce, 'read_only': 1, 'slot_id': btoa (ad_slot_id), 'name': ad_name};
            open_popup_window_post (ajaxurl, 'width='+window_width+',height='+window_height+',top='+window_top+',left='+window_left+',resizable=yes,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no', 'preview', param);
          });

          $("label.adsense-get-code").click (function () {
            var ad_slot_id = $(this).closest ('tr').data ('id');
            var ad_name = atob ($(this).closest ('tr').data ('name'));

            if (debug) console.log ('ADSENSE CODE: ', ad_slot_id);

            $('#ai-loading').show ();
            $.get (ajaxurl + '?action=ai_ajax_backend&adsense-code=' + ad_slot_id + '&ai_check=' + ai_nonce, function (data) {

              var code_data = JSON.parse (data);
              var error = code_data ['error-message'];

              if (error == '') {
                var adsense_code = code_data ['code'];

                if (debug) console.log (adsense_code);

                set_editor_text (active_tab, adsense_code);
                setTimeout (function() {$("#import-code-"+active_tab).click ();}, 10);
              } else {
                  console.log ('AdSense API error:', error);
                }
            }).fail (function (xhr, status, error) {
              var message = "Error downloading AdSense code: " + xhr.status + " " + xhr.statusText ;
              console.log (message);
            })
            .always (function () {
              $('#ai-loading').hide ();
            });
          });

          data_container.disableSelection();
        }
    });
  }

  function load_ads_txt () {
    ads_txt_reload = false;
    var editor_button = $("#ads-txt-editor");
    var reload_button = $("#ads-txt-reload");
    var virtual_button = $("#ads-txt-virtual");
    var virtual = virtual_button.hasClass ('violet') ? '1' : '0';
    var view = editor_button.hasClass ('editor') ? 'text' : 'table';
    var search = encodeURIComponent ($("#ads-txt-search").val());
    var data_container = $("#ads-txt-data");

    reload_button.addClass ('red');

    data_container.load (ajaxurl+"?action=ai_ajax_backend&ads-txt=" + view + "&virtual=" + virtual + "&search=" + search + "&ai_check=" + ai_nonce, function (response, status, xhr) {
      reload_button.removeClass ('red');

      if (status == "error") {
        var message = "Error loading ads.txt file: " + xhr.status + " " + xhr.statusText;
        data_container.html (message);
        if (debug) console.log (message);
      } else {
          if ($('#ads-txt-missing').length != 0) {
            view = 'text';
            editor_button.addClass ('editor');
            $('#ads-txt-search').hide ();
          }

          switch (view) {
            case 'text':
              $('#ads-txt-search').hide ();

              editor_button.removeClass ('dashicons-edit');
              editor_button.addClass ('dashicons-yes-alt');
              editor_button.addClass ('green');
              editor_button.attr ('title', editor_button.attr ('title-editor'))
              .tooltip({
                track: true,
                delay: 700,
                showURL: false,
                showBody: " | ",
                fade: 250
              });

              reload_button.removeClass ('dashicons-download');
              reload_button.addClass ('dashicons-no');

              if ($('#ads-txt-missing').length != 0) {
                reload_button.removeClass ('red');
                reload_button.attr ('title', reload_button.attr ('title-table'))
                .tooltip({
                  track: true,
                  delay: 700,
                  showURL: false,
                  showBody: " | ",
                  fade: 250
                });
              } else {
                  reload_button.addClass ('red');
                  reload_button.attr ('title', reload_button.attr ('title-editor'))
                  .tooltip({
                    track: true,
                    delay: 700,
                    showURL: false,
                    showBody: " | ",
                    fade: 250
                  });
                }
              break;
            case 'table':
              editor_button.removeClass ('dashicons-yes-alt');
              editor_button.removeClass ('green');
              editor_button.addClass ('dashicons-edit');
              editor_button.attr ('title', editor_button.attr ('title-table'))
              .tooltip({
                track: true,
                delay: 700,
                showURL: false,
                showBody: " | ",
                fade: 250
              });

              reload_button.removeClass ('dashicons-no');
              reload_button.removeClass ('red');
              reload_button.addClass ('dashicons-download');
              reload_button.attr ('title', reload_button.attr ('title-table'))
              .tooltip({
                track: true,
                delay: 700,
                showURL: false,
                showBody: " | ",
                fade: 250
              });
              break;
          }

          $('#ads-txt-controls').show ();
        }
    });
  }

  function save_ads_txt (reload) {
    var data_container = $("#ads-txt-data");
    var editor_button = $("#ads-txt-editor");
    var reload_button = $("#ads-txt-reload");
    var virtual_button = $("#ads-txt-virtual");
    var virtual = virtual_button.hasClass ('violet') ? '1' : '0';
    var ads_txt_data = {'text': b64e (data_container.find ('textarea#ads-txt-text').val ())};

    $('#ads-txt-error').text ('');

    editor_button.removeClass ('green');
    editor_button.addClass ('red');

    $.post (ajaxurl+"?action=ai_ajax_backend&ads-txt=save" + "&virtual=" + virtual + "&ai_check=" + ai_nonce, ads_txt_data
    ).done (function (code_data) {
    }).fail (function (xhr, status, error) {
      editor_button.removeClass ('red');
      editor_button.addClass ('green');

      var message = "Error saving ads.txt file: " + xhr.status + " " + xhr.statusText;
      $('#ads-txt-error').text (message);
      if (debug) console.log (message);
    }).always (function() {
      editor_button.removeClass ('editor');

      editor_button.removeClass ('green');
      editor_button.removeClass ('red');
      editor_button.removeClass ('dashicons-yes-alt');
      editor_button.addClass ('dashicons-edit');
      editor_button.attr ('title', editor_button.attr ('title-editor'))
      .tooltip({
        track: true,
        delay: 700,
        showURL: false,
        showBody: " | ",
        fade: 250
      });

      reload_button.addClass ('dashicons-download');
      reload_button.removeClass ('dashicons-no');
      reload_button.removeClass ('red');
      reload_button.attr ('title', reload_button.attr ('title-editor'))
      .tooltip({
        track: true,
        delay: 700,
        showURL: false,
        showBody: " | ",
        fade: 250
      });

      $('#ads-txt-search').show ();

      if (reload) {
        setTimeout (function() {load_ads_txt ();}, 100);
      }
    });
  }

  function set_page_statuses (block) {
    var automatic_insertion = parseInt ($("select#insertion-type-"+block+" option:selected").attr('value'));
    var table = $('#page-types-' + block);

    switch (automatic_insertion) {
      case AI_BEFORE_HTML_ELEMENT:
      case AI_AFTER_HTML_ELEMENT:
      case AI_INSIDE_HTML_ELEMENT:
        table.find ('td.ai-page-type').removeClass ('ai-unavailable');
        return;
    }

    var pages = ['po', 'pa', 'hp', 'cp', 'ap', 'sp'];

    pages.forEach (function (page, index) {
      var positions = $('table.check-pages').attr ('data-positions-' + page);

      if (positions != null) {
        var available_insertions = JSON.parse (positions);

        if (available_insertions.indexOf (automatic_insertion) != - 1) {
          table.find ('td.ai-page-type.ai-' + page).removeClass ('ai-unavailable').find ('input, label').removeAttr ('title')
          .tooltip({
            track: true,
            delay: 700,
            showURL: false,
            showBody: " | ",
            fade: 250
          });
        } else {
            table.find ('td.ai-page-type.ai-' + page).addClass ('ai-unavailable').find ('input, label').attr ('title', ai_admin.position_might_not_available)
            .tooltip({
              track: true,
              delay: 700,
              showURL: false,
              showBody: " | ",
              fade: 250
            });
          }
      }
    });
  }

  function check_page (page, button, last_check) {
    var container = button.closest ('.ai-check-pages');
    var error_message = container.find ('.ai-error-message');

    $.get (ajaxurl + '?action=ai_ajax_backend&check-page=' + page + '&ai_check=' + ai_nonce, function (data) {
      if (data != '') {

        if (debug) console.log ("AI CHECK PAGES:", data);

        try {
          var pages_data = JSON.parse (data);
          var positions = pages_data ['positions'];
          var urls      = pages_data ['urls'];

          if (debug) console.log ("AI CHECK PAGES positions:", positions);
          if (debug) console.log ("AI CHECK PAGES urls:", urls);

          $('table.check-pages').attr ('data-positions-' + page, JSON.stringify (positions));
          $('table.check-pages').attr ('data-urls-' + page, JSON.stringify (urls));

          $('table.check-pages td.ai-position.ai-' + page).each (function () {
            $(this).removeClass ('ai-not-checked');
            var insertion = $(this).data ('insertion');

            if (positions.indexOf (insertion) == - 1) {
              $(this).addClass ('ai-no').attr ('title', ai_admin.position_not_available);
            } else {
                $(this).addClass ('ai-yes').attr ('title', ai_admin.position_available);
              }
            $(this).tooltip({
              track: true,
              delay: 700,
              showURL: false,
              showBody: " | ",
              fade: 250
            });
          });

          if (urls != null && urls.length != 0) {
            $('table.check-pages a.ai-' + page).each (function (index, value) {
              if (typeof urls [index] != 'undefined') {
                $(this).attr ('href', urls [index]).show ();
              }
            });
          }
        } catch (error) {
//          error_message.find ('.ai-error-message-text').text ('JSON error');
          error_message.find ('.ai-error-message-text').text (data);
          error_message.show ();
          console.log ("AI CHECK PAGES: JSON error decoding available positions: " + data);
        }
      }
    }).fail (function (xhr, status, error) {
      error_message.find ('.ai-error-message-text').text (xhr.status + " " + xhr.statusText);
      error_message.show ();
      console.log ('AI CHECK PAGES: Error loading positions for', page + ':', xhr.status, xhr.statusText);
    })
    .always (function () {
      if (last_check) {
        $('#ai-loading').hide ();
        $('#ai-loading-2').hide ();
        button.find ('span.ui-button-text').removeClass ('on');

        for (var block = start; block <= end; block ++) {
          set_page_statuses (block);
        }
      }
    });
  }

  function configure_tabs () {

    var tabs_array = new Array ();

    if (ai_tab_setup_delay != 0) {
      if (active_tab != 0) tabs_array.push (0);
      for (var tab = end; tab >= start; tab --) {
        if (tab != active_tab) tabs_array.push (tab);
      }
    }

    // Concatenate existing tabs_to_configure (if tab was clicked before page was loaded)
    tabs_to_configure = tabs_array.concat (tabs_to_configure);

//    setTimeout (configure_hidden_tab, 700);
    if (ai_tab_setup_delay != 0) {
      setTimeout (configure_hidden_tab, 3 * ai_tab_setup_delay);
    }

    var index = 16;
    if (active_tab != 0) index = active_tab - start;
    var block_tabs = $("#ai-tab-container").tabs ({active: index});
    $("#ai-plugin-settings-tab-container").tabs ({active: active_tab_0});

//    $('#ai-settings').tooltip({
//      show: {effect: "blind",
//             delay: 400,
//             duration: 100}
//    });

    if (debug_title) $("#plugin_name").css ("color", "#00f");

    if (active_tab == 0) configure_tab_0 (); else configure_tab (active_tab);

    $('#dummy-tabs').hide();
    $('#ai-tabs').show();

//    $('.ai-tab').click (function () {
//      var tab_block = $(this).attr ("id");
//      tab_block = parseInt (tab_block.replace ("ai-tab",""));
//      active_tab = tab_block;

//      highlight_active_block ();

//      if (debug) console.log ("$('.ai-tab').click", active_tab);

//      if (!$("#tab-" + tab_block).hasClass ('configured')) {
//        if (debug) console.log ("");
//        if (debug) console.log ("Empty tab: " + tab_block);
//        tabs_to_configure.push (tab_block);
//        setTimeout (configure_hidden_tab, 10);
//        if (debug) console.log ("tabs_to_configure: " + tabs_to_configure);
//      } else if (tab_block != 0) {
//          if (syntax_highlighting) {
//            var editor = ace.edit ("editor-" + tab_block);
//            editor.getSession ().highlightLines (10000000);
//          }
//        }
//    });

    $('#ai-tab-container').on ('tabsbeforeactivate', function (event, ui) {
      var tab_block = ui.newTab.attr ("id");

      if (!tab_block.includes ('ai-tab')) return;

      tab_block = parseInt (tab_block.replace ("ai-tab",""));
      active_tab = tab_block;

      if (debug) console.log ("on tabsbeforeactivate", active_tab);

      check_and_configure_active_tab ();

//      highlight_active_block ();

//      if (!$("#tab-" + tab_block).hasClass ('configured')) {
//        if (debug) console.log ("");
//        if (debug) console.log ("Empty tab: " + tab_block);
//        tabs_to_configure.push (tab_block);
//        setTimeout (configure_hidden_tab, 10);
//        if (debug) console.log ("tabs_to_configure: " + tabs_to_configure);
//      } else if (tab_block != 0) {
//          if (syntax_highlighting) {
//            var editor = ace.edit ("editor-" + tab_block);
//            editor.getSession ().highlightLines (10000000);
//          }
//        }
    });

    $('.ai-plugin-tab').click (function () {
      active_tab_0 = $("#ai-plugin-settings-tab-container").tabs ('option', 'active');
      if (debug) console.log ("active_tab_0: " + active_tab_0);

      if (syntax_highlighting) {
        var tab_block = $(this).attr ("id");
        tab_block = tab_block.replace ("ai-","");

        if (tab_block == 'h') {
            var editor = ace.edit ("editor-h");
            editor.getSession ().highlightLines (10000000);
        } else
        if (tab_block == 'f') {
            editor = ace.edit ("editor-f");
            editor.getSession ().highlightLines (10000000);
        } else
        if (tab_block == 'a') {
            editor = ace.edit ("editor-a");
            editor.getSession ().highlightLines (10000000);
        }
      }
    });

    $("#check-pages-button").button ({
    }).show ().click (function () {
      var button = $(this);
      var container = $(this).closest ('.ai-check-pages');
      var error_message = container.find ('.ai-error-message');

      $('#ai-loading').show ();
      $('#ai-loading-2').show ();
      error_message.hide ();
      button.find ('span.ui-button-text').addClass ('on');

      $('table.check-pages a').removeAttr ('href').hide ();

      var pages = ['po', 'pa', 'hp', 'cp', 'ap', 'sp'];

      pages.forEach (function (page, index) {
        $('table.check-pages td.ai-position').each (function () {
          $(this).removeClass ('ai-yes').removeClass ('ai-no').addClass ('ai-not-checked').attr ('title', ai_admin.position_not_checked);
          $(this).tooltip({
            track: true,
            delay: 700,
            showURL: false,
            showBody: " | ",
            fade: 250
          });
        });

        $('table.ai-page-types td.ai-page-type').each (function () {
          $(this).removeClass ('ai-unavailable');
        });

        setTimeout (function() {check_page (page, button, index == pages.length - 1);},  index * 300 + 10);
      });
    });
  }


  function reload_settings () {
    if (debug) console.log ('RELOAD SETTINGS');

    var settings_container = $("#ai-container");

    $('#ai-error-container').hide ();
    if (debug_title) $("#plugin_name").css ("color", "#f00");

    $('#ai-loading').show ();

    var tools         = $('#ai-tools-toolbar-' + active_tab).is (':visible');
    var simple_editor = $('#simple-editor-' + active_tab).is(":checked");
    var copy          = $("#copy-block-" + active_tab).next ("label").find ('.checkbox-icon').hasClass("on");

    settings_container.load (ajaxurl+"?action=ai_ajax_backend&settings=" + active_tab + "&ai_check=" + ai_nonce, function (response, status, xhr) {
      if (status == "error") {
        $('#ai-loading').hide ();
        var message = ai_admin.error_reloading_settings + ": " + xhr.status + " " + xhr.statusText;
        $('#ai-error-container').text (message).show ();
        if (debug) console.log (message);
      } else {
          if (debug) console.log ('  Configuring...');

          if (debug) {
            start_time = new Date().getTime();
            last_time = start_time;
          }

          configure_tabs ();

          if (simple_editor) $('#simple-editor-' + active_tab).click ();

          if (tools) $('#tools-button-' + active_tab).click ();

          if (copy) {
            $("#ai-container .ai-copy").each (function () {
              $(this).next ("label").find ('.checkbox-icon').addClass("on");
            });
          }

          if (debug) console.log ('  Configured');
          $('#ai-loading').hide ();
        }
    });
  }

  function update_adsense_authorization (authorization_code) {

    $('#ai-loading').show ();
    $.get (ajaxurl + '?action=ai_ajax_backend&adsense-authorization-code=' + btoa (authorization_code) + '&ai_check=' + ai_nonce, function (data) {
      reload_adsense_list (false);
    }).fail (function (xhr, status, error) {
      var message = "Error saving AdSense authorization: " + xhr.status + " " + xhr.statusText ;
      console.log (message);
    })
    .always (function () {
      $('#ai-loading').hide ();
    });
  }

  function toggle_adsense_list () {
    var container = $("#adsense-list-container");
    container.toggle ();

    if (container.is(':visible')) {
      $(".checkbox-icon.icon-adsense").addClass ('on');
      reload_adsense_list (false);
    } else {
        $(".checkbox-icon.icon-adsense").removeClass ('on');
      }
  }

  function update_block_code_demo () {

    var block_class_name    = encodeURIComponent ($('#block-class-name').val ());
    var block_class         = $('#block-class').is(":checked") ? 1 : 0;
    var block_number_class  = $('#block-number-class').is(":checked") ? 1 : 0;
    var block_name_class    = $('#block-name-class').is(":checked") ? 1 : 0;
    var inline_styles       = $('#inline-styles').is(":checked") ? 1 : 0;

    $.get (ajaxurl + '?action=ai_ajax_backend&update=block-code-demo&block_class_name=' + block_class_name + '&block_class=' + block_class + '&block_number_class=' + block_number_class + '&block_name_class=' + block_name_class + '&inline_styles=' + inline_styles + '&ai_check=' + ai_nonce, function (data) {
      $('span#ai-block-code-demo').html (data);
    }).fail (function (xhr, status, error) {
      var message = "Error updating block code demo: " + xhr.status + " " + xhr.statusText ;
      console.log (message);
    });
  }

  if (debug) console.log ("READY");
  if (debug_title) $("#plugin_name").css ("color", "#f00");
  if (debug) {
    var current_time_ready = new Date().getTime();
    console.log ("TIME: " + ((current_time_ready - start_time) / 1000).toFixed (3));
  }

  $("#blocked-warning").removeClass ('warning-enabled');
  $("#blocked-warning").hide ();

  start         = parseInt ($('#ai-form').attr('start'));
  end           = parseInt ($('#ai-form').attr('end'));

  active_tab    = start;
  active_tab_0  = 0;
  try {
    var active_tabs = JSON.parse ($("#ai-active-tab").attr ("value"));
    if (typeof active_tabs !== "undefined" && active_tabs.constructor === Array && Number.isInteger (active_tabs [0]) && Number.isInteger (active_tabs [1])) {
      active_tab    = parseInt (active_tabs [0]);
      if (active_tab != 0)
        if (active_tab < start || active_tab > end) active_tab = start;
      active_tab_0  = parseInt (active_tabs [1]);
    }
  } catch (e) {}

  if (debug) console.log ("active_tabs:", active_tab, active_tab_0);

  var plugin_version = $('#ai-data').attr ('version').split ('-') [0];
  if (javascript_version != plugin_version) {
    console.log ('AD INSERTER: plugin version: ' + plugin_version + ', loaded JavaScript version: ' + javascript_version);

    // Check page HTML
    var javascript_version_parameter = $("script[src*='ad-inserter.js']").attr('src');
    if (typeof javascript_version_parameter == 'undefined') $("#javascript-version-parameter-missing").show (); else {
      javascript_version_parameter_string = javascript_version_parameter.split('=')[1];
      if (typeof javascript_version_parameter_string == 'undefined') {
        $("#javascript-version-parameter-missing").show ();
      }
      else if (javascript_version_parameter_string != plugin_version) {
        console.log ('AD INSERTER: plugin version: ' + plugin_version + ', JavaScript file version: ' + javascript_version_parameter_string);
        $("#javascript-version-parameter").show ();
      }
    }

    $("#javascript-version").html ("Javascript<br />" + javascript_version);
    $("#javascript-warning").show ();
  }

  var css_version = $('#ai-data').css ('font-family').replace(/[\"\']/g, '');
  if (css_version.indexOf ('.') == - 1) $("#blocked-warning").show (); else
    if (css_version != plugin_version) {
      console.log ('AD INSERTER: plugin version:', plugin_version + ', loaded CSS version:', css_version);

      // Check page HTML
      var css_version_parameter = $("link[href*='ai-settings.css']").attr('href');
      if (typeof css_version_parameter == 'undefined') $("#css-version-parameter-missing").show (); else {
        css_version_parameter_string = css_version_parameter.split('=')[1];
        if (typeof css_version_parameter_string == 'undefined') {
          $("#css-version-parameter-missing").show ();
        }
        else if (css_version_parameter_string != plugin_version) {
          console.log ('AD INSERTER: plugin version:', plugin_version + ', CSS file version:', css_version_parameter_string);
          $("#css-version-parameter").show ();
        }
      }

      $("#css-version").html ("CSS<br />" + css_version);
      $("#css-warning").show ();
    }

  $('.header button').button().show ();

  $("#ai-form").submit (function (event) {
    for (var tab = start; tab <= end; tab ++) {
      var rotation_button = $('#rotation-' + tab);
      if (rotation_button.parent ().find ('.icon-rotation').hasClass ('on')) {
        event.preventDefault();

        $("#ai-tab-container").tabs ({active: tab - 1});

        var message = '<div class="checkbox-icon icon-rotation on" style="margin: 3px 10px 24px 0px;"></div><div>' + ai_admin.rotation_active + '</div>';
        $('<div />').html(message).attr ('title', ai_admin.warning).dialog({
          bgiframe: true,
          draggable: false,
          resizable: false,
          modal: true,
          height: "auto",
          width: 300,
          position: {my: 'center', at: 'center', of: '#ai-settings'},
          buttons: [{
            text: ai_admin.ok,
            click: function() {
              $(this).dialog ("close");
            }
            }
          ],
        });

        return;
      }
    }

    for (var tab = start; tab <= end; tab ++) {
      remove_default_values (tab);
      encode_code (tab);
    }

    remove_default_values (0);
    encode_code ('h');
    encode_code ('f');
    encode_code ('a');
  });

  $("div#tab-999").attr ('id', 'ai-clipboard-template').insertBefore ("#ai-clipboard");

  configure_tabs ();

  $('#plugin_name').dblclick (function () {
    $(".system-debugging").toggle();
  });

  $('#ai-stars').click (function () {
    if ($("#rating-value span").text () != '') {
      $("#ai-rating-bar").css ('display', 'inline-block');
      $('#ai-stars').hide ();
    }
    update_rating ('update', '');
  });

  $("#ai-rating-bar").click (function () {
    $("#ai-rating-bar").hide ();
    $('#ai-stars').show ();
  });

  $("#adsense-list").click (function () {
//    $(this).blur ();

    toggle_adsense_list ();
  });

  $("#ai-ads-txt").click (function () {
    $(this).blur ();

    var container = $("#ads-txt-container");

    container.toggle ();

    if (container.is(':visible')) {
      $("#ai-ads-txt .checkbox-icon.icon-ads-txt").addClass ('on');
      load_ads_txt ();
    } else {
        $("#ai-ads-txt .checkbox-icon.icon-ads-txt").removeClass ('on');
      }
  });

  $("#page-checker-button").click (function () {
    $("#page-checker-container").toggle ();

    if ($("#page-checker-container").is(':visible')) {
      $(".page-checker-button").addClass ('blue');
      $("#page-checker-button").addClass ('blue');
    } else {
        $(".page-checker-button").removeClass ('blue');
        $("#page-checker-button").removeClass ('blue');
      }
  });

  $("#ai-manage-websites").click (function () {
    $("#ai-manage-websites-container").toggle ();
    $("#ai-manage-websites").toggleClass ('blue');

    $("#ai-cancel-websites").hide ();
    $("#ai-save-websites").hide ();
    $("#ai-rearrange-websites").removeClass ('blue');

    if ($("#ai-manage-websites-container").is(':visible')) {
      reload_websites ();
    }
  });

  $("#ai-website-list-search").keyup (function (event) {
    if (!website_list_search_reload) {
      website_list_search_reload = true;
      setTimeout (reload_websites, 200);
    }
  });

  $("#ai-list").click (function () {

    $("#ai-list").toggleClass ('blue');

    var container = $("#ai-list-container");
    var list_sticky = $("#ai-pin-list").hasClass ('on');

    if (!list_sticky && ($("#ai-list").hasClass ('blue') != container.is(':visible'))) {
      container.toggle ();
    }

    if (container.is(':visible')) {
      reload_list ();
    }

    if ($("#ai-list").hasClass ('blue')) {
      $("#plugin_name").hide ();
      $("#block-ranges").show ();
    } else {
        $("#plugin_name").show ();
        $("#block-ranges").hide ();
      }
  });

  $("#ai-list-search").keyup (function (event) {
    if (!list_search_reload) {
      list_search_reload = true;
      setTimeout (reload_list, 200);
    }
  });

  $("#ai-load-all").click (function () {
    $(this).toggleClass ('light-blue');
    reload_list ();
  });

  $("#ai-rearrange").click (function () {
    $(this).toggleClass ('blue');

    var data_container = $("#ai-list-data");
    var rearrange_controls = $('#list-rearrange-controls');
    if ($(this).hasClass ('blue')) {
      $("#ai-rearrange").attr ('title', ai_admin.cancel_rearrangement)
        .tooltip({
          track: true,
          delay: 700,
          showURL: false,
          showBody: " | ",
          fade: 250
        });

      rearrange_controls.show ();
      data_container.find ('tbody').sortable ({
        start: function (event, ui) {$('#list-save').show ();},
        placeholder: "ui-state-highlight"
      }).css ('cursor', 'move');
    } else {
        data_container.find ('tbody').sortable ("disable");
        $("#ai-rearrange").attr ('title', ai_admin.rearrange_block_order)
          .tooltip({
            track: true,
            delay: 700,
            showURL: false,
            showBody: " | ",
            fade: 250
          });

        $('#list-save').hide ();
        rearrange_controls.hide ();
        reload_list ();
      }
  });

  $("#ai-save-changes").click (function () {
    $('#list-rearrange-controls').addClass ('rearrange')
    reload_list ();
  });

  $("#ai-pin-list").click (function () {
    $(this).toggleClass ('on');

    var sticky = $(this).hasClass ('on') ? '1' : '0';

    if (!$("#ai-list").hasClass ('blue')) {
      $("#ai-list-container").toggle ();
    }

    $.get (ajaxurl+"?action=ai_ajax_backend&blocks-sticky=" + sticky + "&start=" + start + "&end=" + end + '&ai_check=' + ai_nonce, function (response, status, xhr) {
      if (status == "error") {
        var message = "Error updating sticky: " + xhr.status + " " + xhr.statusText;
        var data_container = $("#ai-list-data");
        data_container.html (message);
        if (debug) console.log (message);
      } else {
          if (debug) console.log ('AI blocks sticky:', response);
        }
    });
  });

  if ($("#maxmind-db-status").hasClass ('maxmind-db-missing')) {
    var page = ajaxurl+"?action=ai_ajax_backend&update=maxmind&ai_check=" + ai_nonce;

    $("span.maxmind-db-missing").text (ai_admin.downloading);
    $.get (page, function (update_status) {

      if (update_status == '') {
        $("span.maxmind-db-missing").closest ('.notice.notice-error').hide ();
        $("#maxmind-db-status").text ('');
      } else {
          if (debug) console.log (update_status);
          var status = JSON.parse (update_status);
          if (debug) console.log (status);
          if (typeof status !== "undefined") {
            $(".notice span.maxmind-db-missing").text (status [0]);
            $("#maxmind-db-status").text (status [1]);
          } else $("span.maxmind-db-missing").text (ai_admin.update_error);
        }
    }).fail (function(jqXHR, status, err) {
      $("span.maxmind-db-missing").text (ai_admin.download_error);
    });
  }

  $("#adsense-load-all").click (function () {
    $(this).parent ().find ('.checkbox-icon').toggleClass ('on');
    reload_adsense_list (false);
  });

  $("#adsense-list-search").keyup (function (event) {
    if (!adsense_search_reload) {
      adsense_search_reload = true;
      setTimeout (function() {reload_adsense_list (false);}, 200);
    }
  });

  $("#adsense-reload").click (function () {
    $(this).parent ().find ('.checkbox-icon').addClass ('on');
    setTimeout (function() {reload_adsense_list (true);}, 200);
  });

  $("#clear-adsense-authorization").click (function () {
    $("#adsense-list-data").text (ai_admin.updating);
    update_adsense_authorization ('');
  });

  $('.ai-block-code-demo').change (function () {
    update_block_code_demo ();
  }).on('input',function(e){
    update_block_code_demo ();
  });

  setTimeout (function() {update_rating ('');}, 1000);

  $("#license-key").dblclick (function () {
    $("#hide-key").toggle ();
  });

  $('input[title], button[title],  label[title], h2[title], li[title], td[title], select[title], div[title], span[title]').tooltip({
    track: true,
    delay: 700,
    showURL: false,
    showBody: " | ",
    fade: 250
  });

  if (debug) console.log ("");
  if (debug) console.log ("READY END");
  if (debug) {
    var current_time = new Date().getTime();
    console.log ("main time: " + ((current_time - current_time_ready) / 1000).toFixed (3));
  }

  $("#ads-txt-virtual").click (function () {

    function switch_to_physical () {
      var virtual_button = $("#ads-txt-virtual");
      virtual_button.removeClass ('violet');
      virtual_button.attr ('title', virtual_button.attr ('title-physical'))
      .tooltip({
        track: true,
        delay: 700,
        showURL: false,
        showBody: " | ",
        fade: 250
      });
      setTimeout (function() {load_ads_txt ();}, 50);

    }
    var editor_button = $("#ads-txt-editor");
    var view = editor_button.hasClass ('editor') ? 'text' : 'table';
    var virtual_button = $("#ads-txt-virtual");

    if (virtual_button.hasClass ('violet')) {
      var message = ai_admin.switch_to_physical_ads_txt;
      var ads_txt_data = $("#ads-txt-data").find ('textarea#ads-txt-text').val ();
      var ads_txt_missing = $('#ads-txt-missing').length != 0;

      if (!ads_txt_missing && (view == 'table' || ads_txt_data != '')) {
        $('<div />').html(message).attr ('title', ai_admin.warning).dialog({
          bgiframe: true,
          draggable: false,
          resizable: false,
          modal: true,
          height: "auto",
          width: 400,
          position: {my: 'center', at: 'center', of: '#ads-txt-container'},
          buttons: [{
            text: ai_admin.switch,
            click: function() {
              $(this).dialog ("close");

              switch_to_physical ();
            }
            },{
            text: ai_admin.cancel,
            click: function() {
              $(this).dialog ("close");
            }
            }
          ],
        });
      } else switch_to_physical ();
    } else {
        virtual_button.addClass ('violet');
        virtual_button.attr ('title', virtual_button.attr ('title-virtual'))
        .tooltip({
          track: true,
          delay: 700,
          showURL: false,
          showBody: " | ",
          fade: 250
        });
        setTimeout (function() {load_ads_txt ();}, 50);
      }

  });

  $("#ads-txt-reload").click (function () {
    var editor_button = $("#ads-txt-editor");
    if (editor_button.hasClass ('editor')) {
      editor_button.removeClass ('editor');
    }
    setTimeout (function() {load_ads_txt ();}, 50);
  });

  $("#ads-txt-editor").click (function () {
    if ($(this).hasClass ('editor')) {
      setTimeout (function() {save_ads_txt (true);}, 50);
    } else {
        $(this).addClass ('editor');

        setTimeout (function() {load_ads_txt ();}, 50);

        $(this).attr ('title', $(this).attr ('title-table'))
        .tooltip({
          track: true,
          delay: 700,
          showURL: false,
          showBody: " | ",
          fade: 250
        });
      }
  });

  $("#ads-txt-search").keyup (function (event) {
    if (!ads_txt_reload) {
      ads_txt_reload = true;
      setTimeout (function() {load_ads_txt ();}, 200);
    }
  });

//  $(document).keydown (function (event) {
//    if (event.which == "17") {
//      ai_ctrl_pressed = true;

//      var public_report_button = $('.public-report-button');
//      public_report_button.addClass ('light-red');
//      public_report_button.attr ('title', $('.public-report-button').first ().attr ('title-rw'))
//        .tooltip({
//          track: true,
//          delay: 700,
//          showURL: false,
//          showBody: " | ",
//          fade: 250
//        });
//    }
//  });

//  $(document).keyup (function() {
//      if (ai_ctrl_pressed) {
//        ai_ctrl_pressed = false;

//        var public_report_button = $('.public-report-button');
//        public_report_button.removeClass ('light-red');
//        public_report_button.attr ('title', $('.public-report-button').first ().attr ('title-ro'))
//          .tooltip({
//            track: true,
//            delay: 700,
//            showURL: false,
//            showBody: " | ",
//            fade: 250
//          });
//      }
//  });

  $(".ai-public-controls").dblclick (function () {
    $(this).toggleClass ('on');
  });

  $(".public-report-button").click (function () {
    var report_data_elements = JSON.parse ($(this).attr ('report-data'));
    var report_url_prefix = report_data_elements [0]
    var report_dates_block = report_data_elements [1];
    var report_controls = $(this).parent ().parent ().parent ().parent ().find ('.ai-public-controls').hasClass ('on') ? '1' : '0';
    var report_range_name = $(this).parent ().parent ().parent ().parent ().find ('.custom-range-controls').attr ('range-name');
    var report_adb = report_data_elements [2];
    var report_version = report_data_elements [3];
    if (report_version == '') report_version = '---';
//    var report_range = report_data_elements [2];
    var report = report_dates_block + report_controls + report_adb + report_range_name + report_version;
    var report_id = b64e (report).replaceAll ('+', '.').replaceAll ('/', '_').replaceAll ('=', '-');
    var url = report_url_prefix + md5 (report).substring (0, 2) + report_id;

    window.open (url, 'ai-report');
  });

  if ($("#ai-list-data").hasClass ('ai-sticky')) {
    configure_list ();
  }

  $("#ai-cancel-websites").click (function () {
    $("#ai-cancel-websites").hide ();
    $("#ai-save-websites").hide ();
    $("#ai-rearrange-websites").removeClass ('blue');

    reload_websites ();
  });

  $("#ai-add-website").click (function () {
    $("#ai-cancel-websites").hide ();
    $("#ai-save-websites").hide ();
    $("#ai-rearrange-websites").removeClass ('blue');

    ai_reload_websites_function = function () {
      $('#ai-website-list-table tr.ai-website-list').last ().find (".ai-website-labels.ai-website-desc").click ();
    }

    reload_websites ('&add=');
  });

  $("#ai-save-websites").click (function () {

    var connect = $(this).attr ('data-connect');

    if (typeof connect !== typeof undefined && connect !== false) {
      $(this).removeAttr ('data-connect');
      connect = '&connect=' + connect;
    } else connect = '';

    $('#ai-website-list-table tr.ai-website-list').each (function () {
      var row = $(this);

      if (row.find (".ai-website-editor .ai-website-key").is (':visible')) {
        row.find (".ai-website-editor .ai-website-key").attr ('data-key', row.find (".ai-website-editor .ai-website-key").val ());
        row.find (".ai-website-labels.ai-website-desc").text (row.find (".ai-website-editor .ai-website-desc").val ());
        row.find (".ai-website-labels.ai-website-url").text (row.find (".ai-website-editor .ai-website-url").val ());

        row.find (".ai-website-labels").show ();
        row.find (".ai-website-editor").hide ();
      }
    });

    var websites = Array ();

    $('#ai-website-list-table tr.ai-website-list').each (function () {
      var row = $(this);

      var url = row.find (".ai-website-labels.ai-website-url").text ().trim ();
      var desc = row.find (".ai-website-labels.ai-website-desc").text ().trim ();
      var key = row.find (".ai-website-editor .ai-website-key").attr ('data-key').trim ();

      if (url != '') {
        websites.push ({'url': url, 'name': desc, 'key': b64e (key)});
      }
    });

    $("#ai-cancel-websites").hide ();
    $("#ai-save-websites").hide ();
    $("#ai-rearrange-websites").removeClass ('blue');

    reload_websites ('&save=' + b64e (JSON.stringify (websites)) + connect);
  });

  $("#ai-rearrange-websites").click (function () {
    $(this).toggleClass ('blue');

    var data_container = $("#ai-website-data");

    if ($(this).hasClass ('blue')) {
      $('#ai-website-list-table .ai-delete-website').each (function () {
        var row = $(this).closest ('tr.ai-website-list');
        var connected = row.find ('.ai-connect-website .checkbox-icon').hasClass ('on');

        if (!connected) {
          $(this).show ();
        }
      });

      data_container.find ('tbody').sortable ({
        start: function (event, ui) {
          $("#ai-cancel-websites").show ();
          $("#ai-save-websites").show ();
        },
        placeholder: "ui-state-highlight"
      }).css ('cursor', 'move');
    } else {
        data_container.find ('tbody').sortable ("disable");
        reload_websites ();
      }
  });

  if ($(".ai-managing").length) {
    setTimeout (function () {window.location.href = ai_settings;}, 30 * 60 * 1000);

    check_managing_slave ();

    $("#ai-connected").click (function () {
      $(this).css ('color', '#ababab');
      $('#ai-loading').show ();
      ai_reload_websites_function = function () {
        if ($('#ai-website-data .ai-ajax-error').length == 0) {
          window.location.href = ai_settings;
        }
      }

      reload_websites ('&connect=');
    });
  }
});


