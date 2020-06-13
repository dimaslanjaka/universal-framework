function load_disqus(disqus_shortname) {
    var disqus_trigger = $('#disqus_trigger'), disqus_target = $('#disqus_thread');
    if (disqus_target.length) {
        framework().js('//' + disqus_shortname + '.disqus.com/embed.js', null);
        disqus_trigger.remove();
    }
    else {
        if (typeof toastr != 'undefined') {
            toastr.error('disqus container not exists', 'disqus comment');
        }
    }
}
//# sourceMappingURL=disqus.js.map