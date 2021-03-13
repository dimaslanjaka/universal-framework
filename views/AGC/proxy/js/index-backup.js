var rgx = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/gm,
  proxy_done = [],
  working_proxy = [],
  dead_proxy = [],
  get_proxy_button = $("#get-proxy"),
  blogger = $("#blogger"),
  wrapper = $("textarea#proxies");

function htmlFromDom(e) {
  document.getElementById("post-helper").innerHTML = "";
  var t = document.createElement("div");
  return t.appendChild(e), t.innerHTML
}
$(function() {
  $.ajax({
    url: "/AGC/proxy/index",
    method: "POST",
    data: {
      default: !0
    },
    headers: {
      "X-Proxy": !0
    },
    success: function(e) {
      wrapper.val(e)
    }
  })
}), $("#blogger").on("click", function(e) {
  e.preventDefault();
  var t = $("#proxies_result").find("i.w3-text-red");
  if (t.length)
    for (var r = 0; r < t.length; r++) {
      var o = t[r].closest("tr");
      o.setAttribute("id", "DeadProxy"), o.className = "w3-hide"
    }
  var n = document.createElement("form");
  n.id = "blogger-form", n.setAttribute("action", "/AGC/blogger/create"), n.setAttribute("method", "POST"), n.setAttribute("target", "_blank"), (d = document.createElement("hr")).className = "hr-text", d.setAttribute("data-content", "TITLE"), n.appendChild(d);
  var a = "Google passed proxies, updated at " + (new Date).toISOString().slice(0, 10),
    i = document.createElement("input");
  i.className = "form-control", i.setAttribute("name", "title"), i.value = a, n.appendChild(i);
  var s = document.getElementById("proxy_result_wrapper").cloneNode(!0);
  s.querySelector("#blogger").classList.toggle("w3-hide"), s.querySelector("#descr").innerHTML = a;
  var l = document.createElement("textarea");
  l.className = "form-control d-none", l.contentEditable = "true", l.setAttribute("name", "body"), l.innerHTML = htmlFromDom(s), n.appendChild(l), document.getElementById("post-helper").appendChild(s);
  var d, p = document.createElement("div");
  (d = document.createElement("hr")).className = "hr-text", d.setAttribute("data-content", "BODY PREVIEW"), p.appendChild(d), p.appendChild(s), n.appendChild(p), (d = document.createElement("hr")).className = "hr-text", d.setAttribute("data-content", "LABEL"), n.appendChild(d);
  var c = document.createElement("input");
  c.className = "form-control", c.value = "Proxy", c.setAttribute("name", "label"), n.appendChild(c);
  var u = document.createElement("p");
  return u.className = "text-left alert alert-warning", u.innerHTML = 'Before sending, we make sure you are logged in. If not, we recommend that you log in first. at <a href="/AGC/blogger" rel="bookmark" title="Login Here" target="_blank" class="w3-text-red">this page <i class="fas fa-external-link-square-alt"></i></a>', swal({
    title: "Ensure logged in",
    content: u,
    buttons: {
      cancel: !0,
      confirm: "Continue",
      roll: {
        text: "Login now",
        value: "login"
      }
    }
  }).then(function(e) {
    "login" == e ? window.open("/AGC/blogger", "blogger").focus() : !0 === e && check_blogger(function(e) {
      var t = document.createElement("hr");
      t.className = "hr-text", t.setAttribute("data-content", "Blog ID: " + e), n.appendChild(t), swal({
        title: "Create blogger post",
        content: n
      }).then(function(e) {
        if (e) {
          var t = $("#blogger-form");
          if (t.length) return t.submit()
        }
      })
    })
  }), !1
}), get_proxy_button.click(function(e) {
  e.preventDefault(), Loading("Fetching proxies"), $.ajax({
    url: "/AGC/proxy/index",
    method: "POST",
    headers: {
      "X-Proxy": !0
    },
    data: {
      get: !0
    },
    complete: function(e) {
      if (e.hasOwnProperty("responseText") && (e = e.responseText), !e) return toastr.error("Fething proxies failed", "Failed", {
        onShown: function() {
          Loading(!1)
        }
      });
      Loading(!1), toastr.success("Proxy list refreshed", "Fetching proxies suceeded", {
        onShown: function() {
          setTimeout(function() {
            wrapper.val(parse_proxy(e).join("\r\n"))
          }, 500)
        }
      })
    }
  })
}), $("#proxies").on("change", function() {
  var e = parse_proxy($(this).val());
  $(this).val(e.join("\n"))
}), $("input#maxres").inputFilter(function(e) {
  return /^\d*$/.test(e)
});
var proxy_index = 0,
  proxy_queue = [],
  proxy_start = !1,
  isLast = 0;

function proxy_updater() {
  $.post("/AGC/proxy/index?updater", {
    update: !0
  }, function(e) {
    $("#freshProxy").is(":checked") && wrapper.val(e[0].join("\r\n")), blogger.removeClass("d-none").removeAttr("disabled")
  })
}

function pseudo_builder(e) {
  if (e) return e.replace(/[\W\s]/gm, "")
}
$("#proxies-test").on("click", function() {
  proxy_start = !0;
  var e = $("textarea#proxies"),
    t = $("input#maxres"),
    r = t.val() ? t.val().toString().trim() : 0,
    o = $("#proxies_result tbody");
  if (o.find(".checking").length) toastr.error("Another proxy is in the checking process, please be patient waiting for it to finish", "Duplicate checker");
  else {
    e.prop("readonly", !0), get_proxy_button.prop("disabled", !0);
    var n = e.val().toString().trim(),
      a = parse_proxy(n);
    a = array_shuffle(a);
    var i = "";
    if (100 < r) return toastr.error("Preventing excedeed process, were not allowed more than 100 proxies at once", "Too many maximum results");
    for (var s = 0; s < r; s++)
      if (a[s]) {
        var l = a[s].toString().trim(),
          d = pseudo_builder(l);
        if (!inArray(l, proxy_done) && !$("#" + d).length && (proxy_done.push(l), proxy_queue.push(l), i += "<tr><td>" + l + '</td><td id="' + d + '"><div class="hovering ld-ext-right running checking"><span>Checking</span><div class="ld ld-ring ld-spin"></div></div></td></tr>', s >= a.length - 1 || r - 1 <= s || 100 <= s)) {
          isLast = s + 1, requester(), e.val(a.join("\r\n"));
          break
        }
      } o.find(".checking,.checked").length ? o.append(i) : o.html(i)
  }
}), setInterval(proxy_updater, 3e5);
var requester_try = {
  proxy: "count"
};

function requester() {
  var a = proxy_queue[proxy_index];
  proxy_start && a && (void 0 === requester_try[a] && (requester_try[a] = 1), $.ajax({
    url: "/AGC/proxy/index",
    method: "POST",
    data: {
      single: a
    },
    beforeSend: function() {
      toastr.info("Checking proxy " + (proxy_index + 1) + "  of " + isLast)
    },
    success: function(e) {
      void 0 !== e[0] && (e = e[0]);
      var t = e,
        r = $("td#" + pseudo_builder(a)),
        o = $("textarea#proxies"),
        n = o.val() ? o.val().toString().replace(a, "").trim() : "";
      t ? void 0 !== t.proxy && r.length && void 0 !== t.google && (200 == t.google ? (inArray(a, working_proxy) || working_proxy.push(a), t.google = '<i class="fas fa-check w3-text-green checked working-proxy"></i>') : (inArray(a, dead_proxy) || dead_proxy.push(a), t.google = '<i class="fas fa-times w3-text-red checked dead-proxy"></i>'), r.html(t.google)) : r.length && r.html('<i class="fas fa-times w3-text-red checked dead-proxy"></i>'), o.val(parse_proxy(n).join("\r\n"))
    },
    error: function() {
      if (requester_try[a]++, 5 < requester_try[a]) return $("#" + pseudo_builder(a)).remove(), void toastr.error("Proxy: " + a + " error on checking, deleting.", "Proxy Deleted");
      toastr.warning("Proxy: " + a + " error on checking, retrying.", "Proxy Retry"), requester()
    },
    complete: function() {
      proxy_index < proxy_queue.length && (proxy_index++, requester()), isLast == proxy_index && (proxy_updater(), wrapper.prop("readonly", !1), get_proxy_button.prop("disabled", !1), proxy_index = 0, proxy_start = !(proxy_queue = []))
    }
  }))
}