jQuery (function ($) {

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

  var ai_rotation_triggers = new Array ();

  ai_process_rotation = function (rotation_block) {
    var ai_debug = typeof ai_debugging !== 'undefined'; // 1
//    var ai_debug = false;

//    if (ai_debug) console.log ('#', $(rotation_block).hasClass ('ai-unprocessed'));

    if (!$(rotation_block).hasClass ('ai-unprocessed') && !$(rotation_block).hasClass ('ai-timer')) return;
    $(rotation_block).removeClass ('ai-unprocessed').removeClass ('ai-timer');

    if (ai_debug) console.log ('');

    if (ai_rotation_triggers.includes (rotation_block.selector)) {
      ai_rotation_triggers.splice (ai_rotation_triggers.indexOf (rotation_block.selector), 1 );

      if (ai_debug) console.log ('AI TIMED ROTATE TRIGGERS', ai_rotation_triggers);
    }

    if (typeof rotation_block.length == 'number') {
      if (ai_debug) console.log ('AI ROTATE process rotation:', rotation_block.length, 'rotation blocks');
      for (var index = 0; index < rotation_block.length; index ++) {
        if (ai_debug) console.log ('AI ROTATE process rotation block index:', index);

        if (index == 0) ai_process_single_rotation (rotation_block [index], true); else ai_process_single_rotation (rotation_block [index], false);
      }
    } else {
        if (ai_debug) console.log ('AI ROTATE process rotation: 1 rotation block');

        ai_process_single_rotation (rotation_block, true);
      }
  }

  ai_process_single_rotation = function (rotation_block, trigger_rotation) {
    var ai_debug = typeof ai_debugging !== 'undefined'; // 2
//    var ai_debug = false;

    var rotate_options = $(rotation_block).children (".ai-rotate-option");

    if (rotate_options.length == 0) return;

    if (ai_debug) {
      console.log ('AI ROTATE process single rotation', );
      console.log ('AI ROTATE', 'block', $(rotation_block).attr ('class') + ',', rotate_options.length, 'options');
    }

    rotate_options.hide ();

//    rotate_options.css ({"visibility": "hidden"});

//    rotate_options.animate ({
//        opacity: 0,
//      }, 500, function() {
//    });

    if (typeof $(rotation_block).data ('next') == 'undefined') {
      if (typeof $(rotate_options [0]).data ('group') != 'undefined') {
        var random_index = - 1;
        var all_ai_groups = $('span[data-ai-groups]');
        var ai_groups = [];

        all_ai_groups.each (function (index) {
          var visible = !!($(this)[0].offsetWidth || $(this)[0].offsetHeight || $(this)[0].getClientRects().length);
          if (visible) {
            ai_groups.push (this);
          }
        });

        if (ai_debug) console.log ('AI ROTATE GROUPS:', ai_groups.length, 'group markers found');

        if (ai_groups.length >= 1) {
          var groups = JSON.parse (b64d ($(ai_groups).first ().data ('ai-groups')));

          if (ai_debug) console.log ('AI ROTATE GROUPS:', groups);

          groups.forEach (function (group, index) {
            if (random_index == - 1)
              rotate_options.each (function (index) {
                var option_group = b64d ($(this).data ('group'));
                if (option_group == group) {
                  random_index = index;
                  return false;
                }
              });
          });
        }
      } else {
          var thresholds_data = $(rotation_block).data ('shares');
          if (typeof thresholds_data === 'string') {
            var thresholds = JSON.parse (atob (thresholds_data));
            var random_threshold = Math.round (Math.random () * 100);
            for (var index = 0; index < thresholds.length; index ++) {
              var random_index = index;
              if (thresholds [index] < 0) continue;
              if (random_threshold <= thresholds [index]) break;
            }
          } else {
              var random_index = Math.floor (Math.random () * rotate_options.length);
              var d = new Date();
              var n = d.getMilliseconds();
              if (n % 2) random_index = rotate_options.length - random_index - 1;
            }
        }
    } else {
        var random_index = parseInt ($(rotation_block).attr ('data-next'));

        if (ai_debug) console.log ('AI TIMED ROTATE next index:', random_index);

        var option = $(rotate_options [random_index]);

        if (typeof option.data ('code') != 'undefined') {
          option = $(b64d (option.data ('code')));
        }

        var group_markers = option.find ('span[data-ai-groups]').addBack ('span[data-ai-groups]');
        if (group_markers.length != 0) {
          if (ai_debug) {
            var next_groups = JSON.parse (b64d (group_markers.first ().data ('ai-groups')));
            console.log ('AI TIMED ROTATE next option sets groups', next_groups);
          }

          var group_rotations = $('.ai-rotation-groups');
          if (group_rotations.length != 0) {
            setTimeout (function() {ai_process_group_rotations ();}, 5);
          }
        }
      }

    if (random_index < 0 || random_index >= rotate_options.length) {
      if (ai_debug) console.log ('AI ROTATE no option selected');
      return;
    }

    var option = $(rotate_options [random_index]);
    var option_time_text = '';

    if (typeof option.data ('time') != 'undefined') {
      var rotation_time = atob (option.data ('time'));

      if (ai_debug) {
        var option_name = b64d (option.data ('name'));
        console.log ('AI TIMED ROTATE index:', random_index + ',', 'name:', '"'+option_name+'",', 'time:', rotation_time);
      }

      if (rotation_time == 0 && rotate_options.length > 1) {
        var next_random_index = random_index;
        do {
          next_random_index++;
          if (next_random_index >= rotate_options.length) next_random_index = 0;

          var next_option = $(rotate_options [next_random_index]);
          if (typeof next_option.data ('time') == 'undefined') {
            random_index = next_random_index;
            option = $(rotate_options [random_index]);
            rotation_time = 0;

            if (ai_debug) console.log ('AI TIMED ROTATE next option has no time: ', next_random_index);

            break;
          }
          var next_rotation_time = atob (next_option.data ('time'));

          if (ai_debug) console.log ('AI TIMED ROTATE check:', next_random_index, 'time:', next_rotation_time);
        } while (next_rotation_time == 0 && next_random_index != random_index);

        if (rotation_time != 0) {
          random_index = next_random_index;
          option = $(rotate_options [random_index]);
          rotation_time = atob (option.data ('time'));
        }

        if (ai_debug) console.log ('AI TIMED ROTATE index:', random_index, 'time:', rotation_time);
      }

      if (rotation_time > 0) {
        var next_random_index = random_index + 1;
        if (next_random_index >= rotate_options.length) next_random_index = 0;

        if (typeof $(rotation_block).data ('info') != 'undefined') {
          var block_info = JSON.parse (atob ($(rotation_block).data ('info')));
          var rotation_id = block_info [0];

          $(rotation_block).attr ('data-next', next_random_index);

          var rotaion_selector = "div.ai-rotate.ai-" + rotation_id;

          if (ai_rotation_triggers.includes (rotaion_selector)) {
            var trigger_rotation = false;
          }

          if (trigger_rotation) {
            ai_rotation_triggers.push (rotaion_selector);

            if (ai_debug) console.log ('AI TIMED ROTATE TRIGGERS', ai_rotation_triggers);

            setTimeout (function() {$(rotaion_selector).addClass ('ai-timer'); ai_process_rotation ($(rotaion_selector));}, rotation_time * 1000);
//            setTimeout (function() {ai_process_rotation ($(rotation_block));}, rotation_time * 1000);
          }
          option_time_text = ' (' + rotation_time + ' s)';
        }
      }
    }
    else if (typeof option.data ('group') != 'undefined') {
      if (ai_debug) {
        var option_name = b64d (option.data ('name'));
        console.log ('AI ROTATE GROUP', '"' + option_name + '",', 'index:', random_index);
      }
    }
    else {
      // Remove unused options
      if (!ai_debug) {
        rotate_options.each (function (index) {
          if (index != random_index) $(this).remove ();
        });
      }

      if (ai_debug) console.log ('AI ROTATE no time');
      if (ai_debug) console.log ('AI ROTATE index:', random_index);
    }


    option.css ({"display": "", "visibility": "", "position": "", "width": "", "height": "", "top": "", "left": ""}).removeClass ('ai-rotate-hidden').removeClass ('ai-rotate-hidden-2');
//    option.css ({"visibility": "", "position": "", "width": "", "height": "", "top": "", "left": ""}).removeClass ('ai-rotate-hidden').removeClass ('ai-rotate-hidden-2');
//    $(rotation_block).css ({"position": ""}).removeClass ('ai-rotate');
    $(rotation_block).css ({"position": ""});

//    option.css ({"visibility": "visible"});

//    option.stop ().animate ({
//        opacity: 1,
//      }, 500, function() {
//    });

    if (typeof option.data ('code') != 'undefined') {
      rotate_options.empty();

//      var option_code = atob (option.data ('code'));
      var option_code = b64d (option.data ('code'));

      if (ai_debug) console.log ('AI ROTATE CODE');
      if (ai_debug) console.log ('');

      option.append (option_code);

      ai_process_elements ();
    }

    var option_name = '';
    var debug_block_frame = $(rotation_block).closest ('.ai-debug-block');
//    if (typeof debug_block_frame != "undefined") {
    if (debug_block_frame.length != 0) {
//      var option_name = atob (option.data ('name'));
      var option_name = b64d (option.data ('name'));
      var name_tag = debug_block_frame.find ('kbd.ai-option-name');
      // Do not set option name in nested debug blocks
      var nested_debug_block = debug_block_frame.find ('.ai-debug-block');
      if (typeof nested_debug_block != 'undefined') {
        var name_tag2 = nested_debug_block.find ('kbd.ai-option-name');
        name_tag = name_tag.slice (0, name_tag.length - name_tag2.length);
      }
      if (typeof name_tag != 'undefined') {
        var separator = name_tag.first ().data ('separator');
        if (typeof separator == 'undefined') separator = '';
        name_tag.html (separator + option_name + option_time_text);
      }
    }

    var tracking_updated = false;
    var adb_show_wrapping_div = $(rotation_block).closest ('.ai-adb-show');
//    if (typeof adb_show_wrapping_div != "undefined") {
    if (adb_show_wrapping_div.length != 0) {
//      if (typeof adb_show_wrapping_div.data ("ai-tracking") != "undefined") {

      if (adb_show_wrapping_div.attr ("data-ai-tracking")) {
        var data = JSON.parse (b64d (adb_show_wrapping_div.attr ("data-ai-tracking")));
        if (typeof data !== "undefined" && data.constructor === Array) {
          data [1] = random_index + 1;
          data [3] = option_name ;

          if (ai_debug) console.log ('AI ROTATE TRACKING DATA ', b64d (adb_show_wrapping_div.attr ("data-ai-tracking")), ' <= ', JSON.stringify (data));

          adb_show_wrapping_div.attr ("data-ai-tracking", b64e (JSON.stringify (data)))
          tracking_updated = true;
        }
      }
    }

    if (!tracking_updated) {
      var wrapping_div = $(rotation_block).closest ('div[data-ai]');
      if (typeof wrapping_div.attr ("data-ai") != "undefined") {
        var data = JSON.parse (b64d (wrapping_div.attr ("data-ai")));
        if (typeof data !== "undefined" && data.constructor === Array) {
          data [1] = random_index + 1;
          data [3] = option_name;
          wrapping_div.attr ("data-ai", b64e (JSON.stringify (data)))
        }
      }
    }
  }

  ai_process_rotations = function () {
    $("div.ai-rotate").each (function (index, element) {
      ai_process_rotation (this);
    });
  }

  function ai_process_group_rotations () {
    $("div.ai-rotate.ai-rotation-groups").each (function (index, element) {
      $(this).addClass ('ai-timer');
      ai_process_rotation (this);
    });
  }

  ai_process_rotations_in_element = function (el) {
    $("div.ai-rotate", el).each (function (index, element) {
      ai_process_rotation (this);
    });
  }

  $(document).ready (function($) {
    setTimeout (function() {ai_process_rotations ();}, 10);
  });

});

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

