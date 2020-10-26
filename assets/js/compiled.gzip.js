!function(d, l) {
  "use strict";
  var e = !1
    , o = !1;
  if (l.querySelector)
      if (d.addEventListener)
          e = !0;
  if (d.wp = d.wp || {},
  !d.wp.receiveEmbedMessage)
      if (d.wp.receiveEmbedMessage = function(e) {
          var t = e.data;
          if (t)
              if (t.secret || t.message || t.value)
                  if (!/[^a-zA-Z0-9]/.test(t.secret)) {
                      var r, a, i, s, n, o = l.querySelectorAll('iframe[data-secret="' + t.secret + '"]'), c = l.querySelectorAll('blockquote[data-secret="' + t.secret + '"]');
                      for (r = 0; r < c.length; r++)
                          c[r].style.display = "none";
                      for (r = 0; r < o.length; r++)
                          if (a = o[r],
                          e.source === a.contentWindow) {
                              if (a.removeAttribute("style"),
                              "height" === t.message) {
                                  if (1e3 < (i = parseInt(t.value, 10)))
                                      i = 1e3;
                                  else if (~~i < 200)
                                      i = 200;
                                  a.height = i
                              }
                              if ("link" === t.message)
                                  if (s = l.createElement("a"),
                                  n = l.createElement("a"),
                                  s.href = a.getAttribute("src"),
                                  n.href = t.value,
                                  n.host === s.host)
                                      if (l.activeElement === a)
                                          d.top.location.href = t.value
                          }
                  }
      }
      ,
      e)
          d.addEventListener("message", d.wp.receiveEmbedMessage, !1),
          l.addEventListener("DOMContentLoaded", t, !1),
          d.addEventListener("load", t, !1);
  function t() {
      if (!o) {
          o = !0;
          var e, t, r, a, i = -1 !== navigator.appVersion.indexOf("MSIE 10"), s = !!navigator.userAgent.match(/Trident.*rv:11\./), n = l.querySelectorAll("iframe.wp-embedded-content");
          for (t = 0; t < n.length; t++) {
              if (!(r = n[t]).getAttribute("data-secret"))
                  a = Math.random().toString(36).substr(2, 10),
                  r.src += "#?secret=" + a,
                  r.setAttribute("data-secret", a);
              if (i || s)
                  (e = r.cloneNode(!0)).removeAttribute("security"),
                  r.parentNode.replaceChild(e, r)
          }
      }
  }
}(window, document);
/*!
* jQuery UI Core 1.11.4
* http://jqueryui.com
*
* Copyright jQuery Foundation and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
* http://api.jqueryui.com/category/ui-core/
*/
!function(e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(a) {
  var e, t, n, i;
  function r(e, t) {
      var n, i, r, o = e.nodeName.toLowerCase();
      return "area" === o ? (i = (n = e.parentNode).name,
      !(!e.href || !i || "map" !== n.nodeName.toLowerCase()) && (!!(r = a("img[usemap='#" + i + "']")[0]) && s(r))) : (/^(input|select|textarea|button|object)$/.test(o) ? !e.disabled : "a" === o && e.href || t) && s(e)
  }
  function s(e) {
      return a.expr.filters.visible(e) && !a(e).parents().addBack().filter(function() {
          return "hidden" === a.css(this, "visibility")
      }).length
  }
  a.ui = a.ui || {},
  a.extend(a.ui, {
      version: "1.11.4",
      keyCode: {
          BACKSPACE: 8,
          COMMA: 188,
          DELETE: 46,
          DOWN: 40,
          END: 35,
          ENTER: 13,
          ESCAPE: 27,
          HOME: 36,
          LEFT: 37,
          PAGE_DOWN: 34,
          PAGE_UP: 33,
          PERIOD: 190,
          RIGHT: 39,
          SPACE: 32,
          TAB: 9,
          UP: 38
      }
  }),
  a.fn.extend({
      scrollParent: function(e) {
          var t = this.css("position")
            , n = "absolute" === t
            , i = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/
            , r = this.parents().filter(function() {
              var e = a(this);
              return (!n || "static" !== e.css("position")) && i.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
          }).eq(0);
          return "fixed" !== t && r.length ? r : a(this[0].ownerDocument || document)
      },
      uniqueId: (e = 0,
      function() {
          return this.each(function() {
              this.id || (this.id = "ui-id-" + ++e)
          })
      }
      ),
      removeUniqueId: function() {
          return this.each(function() {
              /^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id")
          })
      }
  }),
  a.extend(a.expr[":"], {
      data: a.expr.createPseudo ? a.expr.createPseudo(function(t) {
          return function(e) {
              return !!a.data(e, t)
          }
      }) : function(e, t, n) {
          return !!a.data(e, n[3])
      }
      ,
      focusable: function(e) {
          return r(e, !isNaN(a.attr(e, "tabindex")))
      },
      tabbable: function(e) {
          var t = a.attr(e, "tabindex")
            , n = isNaN(t);
          return (n || 0 <= t) && r(e, !n)
      }
  }),
  a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function(e, n) {
      var r = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"]
        , i = n.toLowerCase()
        , o = {
          innerWidth: a.fn.innerWidth,
          innerHeight: a.fn.innerHeight,
          outerWidth: a.fn.outerWidth,
          outerHeight: a.fn.outerHeight
      };
      function s(e, t, n, i) {
          return a.each(r, function() {
              t -= parseFloat(a.css(e, "padding" + this)) || 0,
              n && (t -= parseFloat(a.css(e, "border" + this + "Width")) || 0),
              i && (t -= parseFloat(a.css(e, "margin" + this)) || 0)
          }),
          t
      }
      a.fn["inner" + n] = function(e) {
          return void 0 === e ? o["inner" + n].call(this) : this.each(function() {
              a(this).css(i, s(this, e) + "px")
          })
      }
      ,
      a.fn["outer" + n] = function(e, t) {
          return "number" != typeof e ? o["outer" + n].call(this, e) : this.each(function() {
              a(this).css(i, s(this, e, !0, t) + "px")
          })
      }
  }),
  a.fn.addBack || (a.fn.addBack = function(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
  }
  ),
  a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = (t = a.fn.removeData,
  function(e) {
      return arguments.length ? t.call(this, a.camelCase(e)) : t.call(this)
  }
  )),
  a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
  a.fn.extend({
      focus: (i = a.fn.focus,
      function(t, n) {
          return "number" == typeof t ? this.each(function() {
              var e = this;
              setTimeout(function() {
                  a(e).focus(),
                  n && n.call(e)
              }, t)
          }) : i.apply(this, arguments)
      }
      ),
      disableSelection: (n = "onselectstart"in document.createElement("div") ? "selectstart" : "mousedown",
      function() {
          return this.bind(n + ".ui-disableSelection", function(e) {
              e.preventDefault()
          })
      }
      ),
      enableSelection: function() {
          return this.unbind(".ui-disableSelection")
      },
      zIndex: function(e) {
          if (void 0 !== e)
              return this.css("zIndex", e);
          if (this.length)
              for (var t, n, i = a(this[0]); i.length && i[0] !== document; ) {
                  if (("absolute" === (t = i.css("position")) || "relative" === t || "fixed" === t) && (n = parseInt(i.css("zIndex"), 10),
                  !isNaN(n) && 0 !== n))
                      return n;
                  i = i.parent()
              }
          return 0
      }
  }),
  a.ui.plugin = {
      add: function(e, t, n) {
          var i, r = a.ui[e].prototype;
          for (i in n)
              r.plugins[i] = r.plugins[i] || [],
              r.plugins[i].push([t, n[i]])
      },
      call: function(e, t, n, i) {
          var r, o = e.plugins[t];
          if (o && (i || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))
              for (r = 0; r < o.length; r++)
                  e.options[o[r][0]] && o[r][1].apply(e.element, n)
      }
  }
});
/*!
* jQuery UI Widget 1.11.4
* http://jqueryui.com
*
* Copyright jQuery Foundation and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
* http://api.jqueryui.com/jQuery.widget/
*/
!function(t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(h) {
  var s, i = 0, a = Array.prototype.slice;
  return h.cleanData = (s = h.cleanData,
  function(t) {
      var e, i, n;
      for (n = 0; null != (i = t[n]); n++)
          try {
              (e = h._data(i, "events")) && e.remove && h(i).triggerHandler("remove")
          } catch (t) {}
      s(t)
  }
  ),
  h.widget = function(t, i, e) {
      var n, s, o, r, a = {}, u = t.split(".")[0];
      return t = t.split(".")[1],
      n = u + "-" + t,
      e || (e = i,
      i = h.Widget),
      h.expr[":"][n.toLowerCase()] = function(t) {
          return !!h.data(t, n)
      }
      ,
      h[u] = h[u] || {},
      s = h[u][t],
      o = h[u][t] = function(t, e) {
          if (!this._createWidget)
              return new o(t,e);
          arguments.length && this._createWidget(t, e)
      }
      ,
      h.extend(o, s, {
          version: e.version,
          _proto: h.extend({}, e),
          _childConstructors: []
      }),
      (r = new i).options = h.widget.extend({}, r.options),
      h.each(e, function(e, n) {
          function s() {
              return i.prototype[e].apply(this, arguments)
          }
          function o(t) {
              return i.prototype[e].apply(this, t)
          }
          h.isFunction(n) ? a[e] = function() {
              var t, e = this._super, i = this._superApply;
              return this._super = s,
              this._superApply = o,
              t = n.apply(this, arguments),
              this._super = e,
              this._superApply = i,
              t
          }
          : a[e] = n
      }),
      o.prototype = h.widget.extend(r, {
          widgetEventPrefix: s && r.widgetEventPrefix || t
      }, a, {
          constructor: o,
          namespace: u,
          widgetName: t,
          widgetFullName: n
      }),
      s ? (h.each(s._childConstructors, function(t, e) {
          var i = e.prototype;
          h.widget(i.namespace + "." + i.widgetName, o, e._proto)
      }),
      delete s._childConstructors) : i._childConstructors.push(o),
      h.widget.bridge(t, o),
      o
  }
  ,
  h.widget.extend = function(t) {
      for (var e, i, n = a.call(arguments, 1), s = 0, o = n.length; s < o; s++)
          for (e in n[s])
              i = n[s][e],
              n[s].hasOwnProperty(e) && void 0 !== i && (h.isPlainObject(i) ? t[e] = h.isPlainObject(t[e]) ? h.widget.extend({}, t[e], i) : h.widget.extend({}, i) : t[e] = i);
      return t
  }
  ,
  h.widget.bridge = function(o, e) {
      var r = e.prototype.widgetFullName || o;
      h.fn[o] = function(i) {
          var t = "string" == typeof i
            , n = a.call(arguments, 1)
            , s = this;
          return t ? this.each(function() {
              var t, e = h.data(this, r);
              return "instance" === i ? (s = e,
              !1) : e ? h.isFunction(e[i]) && "_" !== i.charAt(0) ? (t = e[i].apply(e, n)) !== e && void 0 !== t ? (s = t && t.jquery ? s.pushStack(t.get()) : t,
              !1) : void 0 : h.error("no such method '" + i + "' for " + o + " widget instance") : h.error("cannot call methods on " + o + " prior to initialization; attempted to call method '" + i + "'")
          }) : (n.length && (i = h.widget.extend.apply(null, [i].concat(n))),
          this.each(function() {
              var t = h.data(this, r);
              t ? (t.option(i || {}),
              t._init && t._init()) : h.data(this, r, new e(i,this))
          })),
          s
      }
  }
  ,
  h.Widget = function() {}
  ,
  h.Widget._childConstructors = [],
  h.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: {
          disabled: !1,
          create: null
      },
      _createWidget: function(t, e) {
          e = h(e || this.defaultElement || this)[0],
          this.element = h(e),
          this.uuid = i++,
          this.eventNamespace = "." + this.widgetName + this.uuid,
          this.bindings = h(),
          this.hoverable = h(),
          this.focusable = h(),
          e !== this && (h.data(e, this.widgetFullName, this),
          this._on(!0, this.element, {
              remove: function(t) {
                  t.target === e && this.destroy()
              }
          }),
          this.document = h(e.style ? e.ownerDocument : e.document || e),
          this.window = h(this.document[0].defaultView || this.document[0].parentWindow)),
          this.options = h.widget.extend({}, this.options, this._getCreateOptions(), t),
          this._create(),
          this._trigger("create", null, this._getCreateEventData()),
          this._init()
      },
      _getCreateOptions: h.noop,
      _getCreateEventData: h.noop,
      _create: h.noop,
      _init: h.noop,
      destroy: function() {
          this._destroy(),
          this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(h.camelCase(this.widgetFullName)),
          this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
          this.bindings.unbind(this.eventNamespace),
          this.hoverable.removeClass("ui-state-hover"),
          this.focusable.removeClass("ui-state-focus")
      },
      _destroy: h.noop,
      widget: function() {
          return this.element
      },
      option: function(t, e) {
          var i, n, s, o = t;
          if (0 === arguments.length)
              return h.widget.extend({}, this.options);
          if ("string" == typeof t)
              if (o = {},
              t = (i = t.split(".")).shift(),
              i.length) {
                  for (n = o[t] = h.widget.extend({}, this.options[t]),
                  s = 0; s < i.length - 1; s++)
                      n[i[s]] = n[i[s]] || {},
                      n = n[i[s]];
                  if (t = i.pop(),
                  1 === arguments.length)
                      return void 0 === n[t] ? null : n[t];
                  n[t] = e
              } else {
                  if (1 === arguments.length)
                      return void 0 === this.options[t] ? null : this.options[t];
                  o[t] = e
              }
          return this._setOptions(o),
          this
      },
      _setOptions: function(t) {
          var e;
          for (e in t)
              this._setOption(e, t[e]);
          return this
      },
      _setOption: function(t, e) {
          return this.options[t] = e,
          "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e),
          e && (this.hoverable.removeClass("ui-state-hover"),
          this.focusable.removeClass("ui-state-focus"))),
          this
      },
      enable: function() {
          return this._setOptions({
              disabled: !1
          })
      },
      disable: function() {
          return this._setOptions({
              disabled: !0
          })
      },
      _on: function(r, a, t) {
          var u, d = this;
          "boolean" != typeof r && (t = a,
          a = r,
          r = !1),
          t ? (a = u = h(a),
          this.bindings = this.bindings.add(a)) : (t = a,
          a = this.element,
          u = this.widget()),
          h.each(t, function(t, e) {
              function i() {
                  if (r || !0 !== d.options.disabled && !h(this).hasClass("ui-state-disabled"))
                      return ("string" == typeof e ? d[e] : e).apply(d, arguments)
              }
              "string" != typeof e && (i.guid = e.guid = e.guid || i.guid || h.guid++);
              var n = t.match(/^([\w:-]*)\s*(.*)$/)
                , s = n[1] + d.eventNamespace
                , o = n[2];
              o ? u.delegate(o, s, i) : a.bind(s, i)
          })
      },
      _off: function(t, e) {
          e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
          t.unbind(e).undelegate(e),
          this.bindings = h(this.bindings.not(t).get()),
          this.focusable = h(this.focusable.not(t).get()),
          this.hoverable = h(this.hoverable.not(t).get())
      },
      _delay: function(t, e) {
          var i = this;
          return setTimeout(function() {
              return ("string" == typeof t ? i[t] : t).apply(i, arguments)
          }, e || 0)
      },
      _hoverable: function(t) {
          this.hoverable = this.hoverable.add(t),
          this._on(t, {
              mouseenter: function(t) {
                  h(t.currentTarget).addClass("ui-state-hover")
              },
              mouseleave: function(t) {
                  h(t.currentTarget).removeClass("ui-state-hover")
              }
          })
      },
      _focusable: function(t) {
          this.focusable = this.focusable.add(t),
          this._on(t, {
              focusin: function(t) {
                  h(t.currentTarget).addClass("ui-state-focus")
              },
              focusout: function(t) {
                  h(t.currentTarget).removeClass("ui-state-focus")
              }
          })
      },
      _trigger: function(t, e, i) {
          var n, s, o = this.options[t];
          if (i = i || {},
          (e = h.Event(e)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(),
          e.target = this.element[0],
          s = e.originalEvent)
              for (n in s)
                  n in e || (e[n] = s[n]);
          return this.element.trigger(e, i),
          !(h.isFunction(o) && !1 === o.apply(this.element[0], [e].concat(i)) || e.isDefaultPrevented())
      }
  },
  h.each({
      show: "fadeIn",
      hide: "fadeOut"
  }, function(o, r) {
      h.Widget.prototype["_" + o] = function(e, t, i) {
          "string" == typeof t && (t = {
              effect: t
          });
          var n, s = t ? !0 === t || "number" == typeof t ? r : t.effect || r : o;
          "number" == typeof (t = t || {}) && (t = {
              duration: t
          }),
          n = !h.isEmptyObject(t),
          t.complete = i,
          t.delay && e.delay(t.delay),
          n && h.effects && h.effects.effect[s] ? e[o](t) : s !== o && e[s] ? e[s](t.duration, t.easing, i) : e.queue(function(t) {
              h(this)[o](),
              i && i.call(e[0]),
              t()
          })
      }
  }),
  h.widget
});
/*!
* jQuery UI Mouse 1.11.4
* http://jqueryui.com
*
* Copyright jQuery Foundation and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
* http://api.jqueryui.com/mouse/
*/
!function(e) {
  "function" == typeof define && define.amd ? define(["jquery", "./widget"], e) : e(jQuery)
}(function(o) {
  var u = !1;
  return o(document).mouseup(function() {
      u = !1
  }),
  o.widget("ui.mouse", {
      version: "1.11.4",
      options: {
          cancel: "input,textarea,button,select,option",
          distance: 1,
          delay: 0
      },
      _mouseInit: function() {
          var t = this;
          this.element.bind("mousedown." + this.widgetName, function(e) {
              return t._mouseDown(e)
          }).bind("click." + this.widgetName, function(e) {
              if (!0 === o.data(e.target, t.widgetName + ".preventClickEvent"))
                  return o.removeData(e.target, t.widgetName + ".preventClickEvent"),
                  e.stopImmediatePropagation(),
                  !1
          }),
          this.started = !1
      },
      _mouseDestroy: function() {
          this.element.unbind("." + this.widgetName),
          this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
      },
      _mouseDown: function(e) {
          if (!u) {
              this._mouseMoved = !1,
              this._mouseStarted && this._mouseUp(e),
              this._mouseDownEvent = e;
              var t = this
                , s = 1 === e.which
                , i = !("string" != typeof this.options.cancel || !e.target.nodeName) && o(e.target).closest(this.options.cancel).length;
              return !(s && !i && this._mouseCapture(e)) || (this.mouseDelayMet = !this.options.delay,
              this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                  t.mouseDelayMet = !0
              }, this.options.delay)),
              this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(e),
              !this._mouseStarted) ? (e.preventDefault(),
              !0) : (!0 === o.data(e.target, this.widgetName + ".preventClickEvent") && o.removeData(e.target, this.widgetName + ".preventClickEvent"),
              this._mouseMoveDelegate = function(e) {
                  return t._mouseMove(e)
              }
              ,
              this._mouseUpDelegate = function(e) {
                  return t._mouseUp(e)
              }
              ,
              this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate),
              e.preventDefault(),
              u = !0))
          }
      },
      _mouseMove: function(e) {
          if (this._mouseMoved) {
              if (o.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button)
                  return this._mouseUp(e);
              if (!e.which)
                  return this._mouseUp(e)
          }
          return (e.which || e.button) && (this._mouseMoved = !0),
          this._mouseStarted ? (this._mouseDrag(e),
          e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, e),
          this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
          !this._mouseStarted)
      },
      _mouseUp: function(e) {
          return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted && (this._mouseStarted = !1,
          e.target === this._mouseDownEvent.target && o.data(e.target, this.widgetName + ".preventClickEvent", !0),
          this._mouseStop(e)),
          u = !1
      },
      _mouseDistanceMet: function(e) {
          return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
      },
      _mouseDelayMet: function() {
          return this.mouseDelayMet
      },
      _mouseStart: function() {},
      _mouseDrag: function() {},
      _mouseStop: function() {},
      _mouseCapture: function() {
          return !0
      }
  })
});
/*!
* jQuery UI Slider 1.11.4
* http://jqueryui.com
*
* Copyright jQuery Foundation and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
* http://api.jqueryui.com/slider/
*/
!function(e) {
  "function" == typeof define && define.amd ? define(["jquery", "./core", "./mouse", "./widget"], e) : e(jQuery)
}(function(r) {
  return r.widget("ui.slider", r.ui.mouse, {
      version: "1.11.4",
      widgetEventPrefix: "slide",
      options: {
          animate: !1,
          distance: 0,
          max: 100,
          min: 0,
          orientation: "horizontal",
          range: !1,
          step: 1,
          value: 0,
          values: null,
          change: null,
          slide: null,
          start: null,
          stop: null
      },
      numPages: 5,
      _create: function() {
          this._keySliding = !1,
          this._mouseSliding = !1,
          this._animateOff = !0,
          this._handleIndex = null,
          this._detectOrientation(),
          this._mouseInit(),
          this._calculateNewMax(),
          this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"),
          this._refresh(),
          this._setOption("disabled", this.options.disabled),
          this._animateOff = !1
      },
      _refresh: function() {
          this._createRange(),
          this._createHandles(),
          this._setupEvents(),
          this._refreshValue()
      },
      _createHandles: function() {
          var e, t, i = this.options, s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), a = [];
          for (t = i.values && i.values.length || 1,
          s.length > t && (s.slice(t).remove(),
          s = s.slice(0, t)),
          e = s.length; e < t; e++)
              a.push("<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>");
          this.handles = s.add(r(a.join("")).appendTo(this.element)),
          this.handle = this.handles.eq(0),
          this.handles.each(function(e) {
              r(this).data("ui-slider-handle-index", e)
          })
      },
      _createRange: function() {
          var e = this.options
            , t = "";
          e.range ? (!0 === e.range && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : r.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]),
          this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
              left: "",
              bottom: ""
          }) : (this.range = r("<div></div>").appendTo(this.element),
          t = "ui-slider-range ui-widget-header ui-corner-all"),
          this.range.addClass(t + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : (this.range && this.range.remove(),
          this.range = null)
      },
      _setupEvents: function() {
          this._off(this.handles),
          this._on(this.handles, this._handleEvents),
          this._hoverable(this.handles),
          this._focusable(this.handles)
      },
      _destroy: function() {
          this.handles.remove(),
          this.range && this.range.remove(),
          this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),
          this._mouseDestroy()
      },
      _mouseCapture: function(e) {
          var t, i, s, a, n, h, l, o = this, u = this.options;
          return !u.disabled && (this.elementSize = {
              width: this.element.outerWidth(),
              height: this.element.outerHeight()
          },
          this.elementOffset = this.element.offset(),
          t = {
              x: e.pageX,
              y: e.pageY
          },
          i = this._normValueFromMouse(t),
          s = this._valueMax() - this._valueMin() + 1,
          this.handles.each(function(e) {
              var t = Math.abs(i - o.values(e));
              (t < s || s === t && (e === o._lastChangedValue || o.values(e) === u.min)) && (s = t,
              a = r(this),
              n = e)
          }),
          !1 !== this._start(e, n) && (this._mouseSliding = !0,
          this._handleIndex = n,
          a.addClass("ui-state-active").focus(),
          h = a.offset(),
          l = !r(e.target).parents().addBack().is(".ui-slider-handle"),
          this._clickOffset = l ? {
              left: 0,
              top: 0
          } : {
              left: e.pageX - h.left - a.width() / 2,
              top: e.pageY - h.top - a.height() / 2 - (parseInt(a.css("borderTopWidth"), 10) || 0) - (parseInt(a.css("borderBottomWidth"), 10) || 0) + (parseInt(a.css("marginTop"), 10) || 0)
          },
          this.handles.hasClass("ui-state-hover") || this._slide(e, n, i),
          this._animateOff = !0))
      },
      _mouseStart: function() {
          return !0
      },
      _mouseDrag: function(e) {
          var t = {
              x: e.pageX,
              y: e.pageY
          }
            , i = this._normValueFromMouse(t);
          return this._slide(e, this._handleIndex, i),
          !1
      },
      _mouseStop: function(e) {
          return this.handles.removeClass("ui-state-active"),
          this._mouseSliding = !1,
          this._stop(e, this._handleIndex),
          this._change(e, this._handleIndex),
          this._handleIndex = null,
          this._clickOffset = null,
          this._animateOff = !1
      },
      _detectOrientation: function() {
          this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
      },
      _normValueFromMouse: function(e) {
          var t, i, s, a;
          return 1 < (i = ("horizontal" === this.orientation ? (t = this.elementSize.width,
          e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height,
          e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0))) / t) && (i = 1),
          i < 0 && (i = 0),
          "vertical" === this.orientation && (i = 1 - i),
          s = this._valueMax() - this._valueMin(),
          a = this._valueMin() + i * s,
          this._trimAlignValue(a)
      },
      _start: function(e, t) {
          var i = {
              handle: this.handles[t],
              value: this.value()
          };
          return this.options.values && this.options.values.length && (i.value = this.values(t),
          i.values = this.values()),
          this._trigger("start", e, i)
      },
      _slide: function(e, t, i) {
          var s, a, n;
          this.options.values && this.options.values.length ? (s = this.values(t ? 0 : 1),
          2 === this.options.values.length && !0 === this.options.range && (0 === t && s < i || 1 === t && i < s) && (i = s),
          i !== this.values(t) && ((a = this.values())[t] = i,
          n = this._trigger("slide", e, {
              handle: this.handles[t],
              value: i,
              values: a
          }),
          s = this.values(t ? 0 : 1),
          !1 !== n && this.values(t, i))) : i !== this.value() && !1 !== (n = this._trigger("slide", e, {
              handle: this.handles[t],
              value: i
          })) && this.value(i)
      },
      _stop: function(e, t) {
          var i = {
              handle: this.handles[t],
              value: this.value()
          };
          this.options.values && this.options.values.length && (i.value = this.values(t),
          i.values = this.values()),
          this._trigger("stop", e, i)
      },
      _change: function(e, t) {
          if (!this._keySliding && !this._mouseSliding) {
              var i = {
                  handle: this.handles[t],
                  value: this.value()
              };
              this.options.values && this.options.values.length && (i.value = this.values(t),
              i.values = this.values()),
              this._lastChangedValue = t,
              this._trigger("change", e, i)
          }
      },
      value: function(e) {
          return arguments.length ? (this.options.value = this._trimAlignValue(e),
          this._refreshValue(),
          void this._change(null, 0)) : this._value()
      },
      values: function(e, t) {
          var i, s, a;
          if (1 < arguments.length)
              return this.options.values[e] = this._trimAlignValue(t),
              this._refreshValue(),
              void this._change(null, e);
          if (!arguments.length)
              return this._values();
          if (!r.isArray(e))
              return this.options.values && this.options.values.length ? this._values(e) : this.value();
          for (i = this.options.values,
          s = e,
          a = 0; a < i.length; a += 1)
              i[a] = this._trimAlignValue(s[a]),
              this._change(null, a);
          this._refreshValue()
      },
      _setOption: function(e, t) {
          var i, s = 0;
          switch ("range" === e && !0 === this.options.range && ("min" === t ? (this.options.value = this._values(0),
          this.options.values = null) : "max" === t && (this.options.value = this._values(this.options.values.length - 1),
          this.options.values = null)),
          r.isArray(this.options.values) && (s = this.options.values.length),
          "disabled" === e && this.element.toggleClass("ui-state-disabled", !!t),
          this._super(e, t),
          e) {
          case "orientation":
              this._detectOrientation(),
              this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation),
              this._refreshValue(),
              this.handles.css("horizontal" === t ? "bottom" : "left", "");
              break;
          case "value":
              this._animateOff = !0,
              this._refreshValue(),
              this._change(null, 0),
              this._animateOff = !1;
              break;
          case "values":
              for (this._animateOff = !0,
              this._refreshValue(),
              i = 0; i < s; i += 1)
                  this._change(null, i);
              this._animateOff = !1;
              break;
          case "step":
          case "min":
          case "max":
              this._animateOff = !0,
              this._calculateNewMax(),
              this._refreshValue(),
              this._animateOff = !1;
              break;
          case "range":
              this._animateOff = !0,
              this._refresh(),
              this._animateOff = !1
          }
      },
      _value: function() {
          var e = this.options.value;
          return e = this._trimAlignValue(e)
      },
      _values: function(e) {
          var t, i, s;
          if (arguments.length)
              return t = this.options.values[e],
              t = this._trimAlignValue(t);
          if (this.options.values && this.options.values.length) {
              for (i = this.options.values.slice(),
              s = 0; s < i.length; s += 1)
                  i[s] = this._trimAlignValue(i[s]);
              return i
          }
          return []
      },
      _trimAlignValue: function(e) {
          if (e <= this._valueMin())
              return this._valueMin();
          if (e >= this._valueMax())
              return this._valueMax();
          var t = 0 < this.options.step ? this.options.step : 1
            , i = (e - this._valueMin()) % t
            , s = e - i;
          return 2 * Math.abs(i) >= t && (s += 0 < i ? t : -t),
          parseFloat(s.toFixed(5))
      },
      _calculateNewMax: function() {
          var e = this.options.max
            , t = this._valueMin()
            , i = this.options.step;
          e = Math.floor(+(e - t).toFixed(this._precision()) / i) * i + t,
          this.max = parseFloat(e.toFixed(this._precision()))
      },
      _precision: function() {
          var e = this._precisionOf(this.options.step);
          return null !== this.options.min && (e = Math.max(e, this._precisionOf(this.options.min))),
          e
      },
      _precisionOf: function(e) {
          var t = e.toString()
            , i = t.indexOf(".");
          return -1 === i ? 0 : t.length - i - 1
      },
      _valueMin: function() {
          return this.options.min
      },
      _valueMax: function() {
          return this.max
      },
      _refreshValue: function() {
          var t, i, e, s, a, n = this.options.range, h = this.options, l = this, o = !this._animateOff && h.animate, u = {};
          this.options.values && this.options.values.length ? this.handles.each(function(e) {
              i = (l.values(e) - l._valueMin()) / (l._valueMax() - l._valueMin()) * 100,
              u["horizontal" === l.orientation ? "left" : "bottom"] = i + "%",
              r(this).stop(1, 1)[o ? "animate" : "css"](u, h.animate),
              !0 === l.options.range && ("horizontal" === l.orientation ? (0 === e && l.range.stop(1, 1)[o ? "animate" : "css"]({
                  left: i + "%"
              }, h.animate),
              1 === e && l.range[o ? "animate" : "css"]({
                  width: i - t + "%"
              }, {
                  queue: !1,
                  duration: h.animate
              })) : (0 === e && l.range.stop(1, 1)[o ? "animate" : "css"]({
                  bottom: i + "%"
              }, h.animate),
              1 === e && l.range[o ? "animate" : "css"]({
                  height: i - t + "%"
              }, {
                  queue: !1,
                  duration: h.animate
              }))),
              t = i
          }) : (e = this.value(),
          s = this._valueMin(),
          a = this._valueMax(),
          i = a !== s ? (e - s) / (a - s) * 100 : 0,
          u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%",
          this.handle.stop(1, 1)[o ? "animate" : "css"](u, h.animate),
          "min" === n && "horizontal" === this.orientation && this.range.stop(1, 1)[o ? "animate" : "css"]({
              width: i + "%"
          }, h.animate),
          "max" === n && "horizontal" === this.orientation && this.range[o ? "animate" : "css"]({
              width: 100 - i + "%"
          }, {
              queue: !1,
              duration: h.animate
          }),
          "min" === n && "vertical" === this.orientation && this.range.stop(1, 1)[o ? "animate" : "css"]({
              height: i + "%"
          }, h.animate),
          "max" === n && "vertical" === this.orientation && this.range[o ? "animate" : "css"]({
              height: 100 - i + "%"
          }, {
              queue: !1,
              duration: h.animate
          }))
      },
      _handleEvents: {
          keydown: function(e) {
              var t, i, s, a = r(e.target).data("ui-slider-handle-index");
              switch (e.keyCode) {
              case r.ui.keyCode.HOME:
              case r.ui.keyCode.END:
              case r.ui.keyCode.PAGE_UP:
              case r.ui.keyCode.PAGE_DOWN:
              case r.ui.keyCode.UP:
              case r.ui.keyCode.RIGHT:
              case r.ui.keyCode.DOWN:
              case r.ui.keyCode.LEFT:
                  if (e.preventDefault(),
                  !this._keySliding && (this._keySliding = !0,
                  r(e.target).addClass("ui-state-active"),
                  !1 === this._start(e, a)))
                      return
              }
              switch (s = this.options.step,
              t = i = this.options.values && this.options.values.length ? this.values(a) : this.value(),
              e.keyCode) {
              case r.ui.keyCode.HOME:
                  i = this._valueMin();
                  break;
              case r.ui.keyCode.END:
                  i = this._valueMax();
                  break;
              case r.ui.keyCode.PAGE_UP:
                  i = this._trimAlignValue(t + (this._valueMax() - this._valueMin()) / this.numPages);
                  break;
              case r.ui.keyCode.PAGE_DOWN:
                  i = this._trimAlignValue(t - (this._valueMax() - this._valueMin()) / this.numPages);
                  break;
              case r.ui.keyCode.UP:
              case r.ui.keyCode.RIGHT:
                  if (t === this._valueMax())
                      return;
                  i = this._trimAlignValue(t + s);
                  break;
              case r.ui.keyCode.DOWN:
              case r.ui.keyCode.LEFT:
                  if (t === this._valueMin())
                      return;
                  i = this._trimAlignValue(t - s)
              }
              this._slide(e, a, i)
          },
          keyup: function(e) {
              var t = r(e.target).data("ui-slider-handle-index");
              this._keySliding && (this._keySliding = !1,
              this._stop(e, t),
              this._change(e, t),
              r(e.target).removeClass("ui-state-active"))
          }
      }
  })
});
