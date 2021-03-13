ai_insert = function (insertion, selector, insertion_code) {
  if (selector.indexOf (':eq') != - 1) {
    var elements = jQuery (selector);
  } else var elements = document.querySelectorAll (selector);

  Array.prototype.forEach.call (elements, function (element, index) {
    var ai_debug = typeof ai_debugging !== 'undefined'; // 1
//    var ai_debug = false;

    if (element.hasAttribute ('id')) {
      selector_string = '#' + element.getAttribute ('id');
    } else
    if (element.hasAttribute ('class')) {
      selector_string = '.' + element.getAttribute ('class').replace (new RegExp (' ', 'g'), '.');
    } else
    selector_string = '';

    if (ai_debug) console.log ('');
    if (ai_debug) console.log ('AI INSERT', insertion, selector, '(' + element.tagName.toLowerCase() + selector_string + ')');

    var template = document.createElement ('div');
    template.innerHTML = insertion_code;

    var ai_selector_counter = template.getElementsByClassName ("ai-selector-counter")[0];
    if (ai_selector_counter != null) {
      ai_selector_counter.innerText = index + 1;
    }

    var ai_debug_name_ai_main = template.getElementsByClassName ("ai-debug-name ai-main")[0];
    if (ai_debug_name_ai_main != null) {
      var insertion_name = '';
      if (insertion == 'before') {
        insertion_name = ai_front.insertion_before;
      } else
      if (insertion == 'after') {
        insertion_name = ai_front.insertion_after;
      } else
      if (insertion == 'prepend') {
        insertion_name = ai_front.insertion_prepend;
      } else
      if (insertion == 'append') {
        insertion_name = ai_front.insertion_append;
      } else
      if (insertion == 'replace-content') {
        insertion_name = ai_front.insertion_replace_content;
      } else
      if (insertion == 'replace-element') {
        insertion_name = ai_front.insertion_replace_element;
      }

      if (selector_string.indexOf ('.ai-viewports') == - 1) {
        ai_debug_name_ai_main.innerText = insertion_name + ' ' + selector + ' (' + element.tagName.toLowerCase() + selector_string + ')';
      }
    }

    var range = document.createRange ();
    var fragment = range.createContextualFragment (template.innerHTML);

    if (insertion == 'before') {
      element.parentNode.insertBefore (fragment, element);
    } else
    if (insertion == 'after') {
      element.parentNode.insertBefore (fragment, element.nextSibling);
    } else
    if (insertion == 'prepend') {
      element.insertBefore (fragment, element.firstChild);
    } else
    if (insertion == 'append') {
      element.insertBefore (fragment, null);
    } else
    if (insertion == 'replace-content') {
      element.innerHTML = template.innerHTML;
    } else
    if (insertion == 'replace-element') {
      element.parentNode.insertBefore (fragment, element);
      element.parentNode.removeChild (element);
    }
  });
}

ai_insert_code = function (element) {

  function hasClass (element, cls) {
    if (element == null) return false;

    if (element.classList) return element.classList.contains (cls); else
      return (' ' + element.className + ' ').indexOf (' ' + cls + ' ') > - 1;
  }

  function addClass (element, cls) {
    if (element == null) return;

    if (element.classList) element.classList.add (cls); else
      element.className += ' ' + cls;
  }

  function removeClass (element, cls) {
    if (element == null) return;

    if (element.classList) element.classList.remove (cls); else
      element.className = element.className.replace (new RegExp ('(^|\\b)' + cls.split (' ').join ('|') + '(\\b|$)', 'gi'), ' ');
  }

  if (typeof element == 'undefined') return;

  var insertion = false;

  var ai_debug = typeof ai_debugging !== 'undefined'; // 2
//  var ai_debug = false;

  if (ai_debug) console.log ('AI INSERT ELEMENT class:', element.getAttribute ('class'));

  if (hasClass (element, 'no-visibility-check')) {
    var visible = true;
  } else var visible = !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);

  var block   = element.getAttribute ('data-block');

  if (visible) {
    if (ai_debug) console.log ('AI ELEMENT VISIBLE: block', block, 'offsetWidth:', element.offsetWidth, 'offsetHeight:', element.offsetHeight, 'getClientRects().length:', element.getClientRects().length);

    var insertion_code = element.getAttribute ('data-code');
    var insertion_type = element.getAttribute ('data-insertion');
    var selector       = element.getAttribute ('data-selector');

    if (insertion_code != null) {
      if (insertion_type != null && selector != null) {

        var selector_exists = document.querySelectorAll (selector).length;

        if (ai_debug) console.log ('AI ELEMENT VISIBLE: block', block, insertion_type, selector, selector_exists ? '' : 'NOT FOUND');

        if (selector_exists) {
          ai_insert (insertion_type, selector, b64d (insertion_code));
          removeClass (element, 'ai-viewports');
        }
      } else {
          if (ai_debug) console.log ('AI ELEMENT VISIBLE: block', block);

          var range = document.createRange ();
          var fragment = range.createContextualFragment (b64d (insertion_code));
          element.parentNode.insertBefore (fragment, element.nextSibling);

          removeClass (element, 'ai-viewports');
        }
    }

    insertion = true;

    var ai_check_block_data = element.getElementsByClassName ('ai-check-block');
    if (typeof ai_check_block_data [0] != 'undefined') {
      // Remove span
      ai_check_block_data [0].parentNode.removeChild (ai_check_block_data [0]);
    }
  } else {
      if (ai_debug) console.log ('AI ELEMENT NOT VISIBLE: block', block, 'offsetWidth:', element.offsetWidth, 'offsetHeight:', element.offsetHeight, 'getClientRects().length:', element.getClientRects().length);

      var debug_bar = element.previousElementSibling;

      if (hasClass (debug_bar, 'ai-debug-bar') && hasClass (debug_bar, 'ai-debug-script')) {
        removeClass (debug_bar, 'ai-debug-script');
        addClass (debug_bar, 'ai-debug-viewport-invisible');
      }

      removeClass (element, 'ai-viewports');
    }
  return insertion;
}

ai_insert_list_code = function (id) {
  var ai_block_div = document.getElementsByClassName (id) [0];

  if (typeof ai_block_div != 'undefined') {
    var inserted = ai_insert_code (ai_block_div);
    var wrapping_div = ai_block_div.closest ('div.AI_FUNCT_GET_BLOCK_CLASS_NAME');
    if (wrapping_div) {
      if (!inserted) {
        wrapping_div.removeAttribute ('data-ai');
      }
      wrapping_div.classList.remove ('ai-list-block');
      wrapping_div.style.visibility = '';
      if (wrapping_div.classList.contains ('ai-remove-position')) {
        wrapping_div.style.position = '';
      }
    }

    ai_block_div.classList.remove (id);

    if (inserted) ai_process_elements ();
  }
}

ai_insert_viewport_code = function (id) {
  var ai_block_div = document.getElementsByClassName (id) [0];

  if (typeof ai_block_div != 'undefined') {
    ai_insert_code (ai_block_div);

    ai_block_div.classList.remove (id);

    ai_process_elements ();
  }
}

ai_insert_code_by_class = function (id) {
  var ai_block_div = document.getElementsByClassName (id) [0];

  if (typeof ai_block_div != 'undefined') {
    ai_insert_code (ai_block_div);

    ai_block_div.classList.remove (id);
  }
}

ai_process_elements_active = false;

function ai_process_elements () {
  if (!ai_process_elements_active)
    setTimeout (function() {
      ai_process_elements_active = false;

      if (typeof ai_process_rotations == 'function') {
        ai_process_rotations ();
      }

      if (typeof ai_process_lists == 'function') {
        ai_process_lists (jQuery ("div.ai-list-data"));
      }

      if (typeof ai_process_ip_addresses == 'function') {
        ai_process_ip_addresses (jQuery ("div.ai-ip-data"));
      }
    }, 5);
  ai_process_elements_active = true;
}

function b64e (str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(encodeURIComponent (str).replace (/%([0-9A-F]{2})/g,
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


