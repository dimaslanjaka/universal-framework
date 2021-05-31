/// <reference path="globals.d.ts" />

function linkify(
    string: string,
    buildHashtagUrl: linkifyConfig["hashtagUrlBuilder"],
    includeW3: linkifyConfig["includeW3"],
    target: linkifyConfig["target"],
    noFollow: linkifyConfig["noFollow"]
) {
    let relNoFollow = "";
    if (noFollow) {
        relNoFollow = ' rel="nofollow"';
    }

    if (string.toLowerCase().indexOf("www.") === 0 && includeW3) {
        string = '<a href="http://' + string + '" target="' + target + '"' + relNoFollow + ">" + string + "</a>";
    } else {
        string = '<a href="' + string + '" target="' + target + '"' + relNoFollow + ">" + string + "</a>";
    }

    if (buildHashtagUrl) {
        string = string.replace(
            /\B#(\w+)/g,
            "<a href=" + buildHashtagUrl("$1") + ' target="' + target + '"' + relNoFollow + ">#$1</a>"
        );
    }
    return string;
}

if (!isnode()) {
    (function ($) {
        $.fn.linkify = function (opts: linkifyConfig) {
            return this.each(function () {
                var buildHashtagUrl: linkifyConfig["hashtagUrlBuilder"];
                var includeW3 = true;
                var target = "_self";
                var noFollow = true;
                var regex =
                    /((http|https|ftp)\:\/\/|\bw{3}\.)[a-z0-9\-\.]+\.[a-z]{2,3}(:[a-z0-9]*)?\/?([a-z\u00C0-\u017F0-9\-\._\?\,\'\/\\\+&amp;%\$#\=~])*/gi;
                var txt = this.innerHTML;
                var output = "";
                var replacement: string;
                var matchLen: number;
                var lastIndex = 0;

                if (opts) {
                    if (typeof opts == "function") {
                        buildHashtagUrl = opts;
                    } else {
                        if (typeof opts.hashtagUrlBuilder == "function") {
                            buildHashtagUrl = opts.hashtagUrlBuilder;
                        }
                        if (typeof opts.includeW3 == "boolean") {
                            includeW3 = opts.includeW3;
                        }
                        if (typeof opts.target == "string") {
                            target = opts.target;
                        }
                        if (typeof opts.noFollow == "boolean") {
                            noFollow = opts.noFollow;
                        }
                    }
                }

                let match: RegExpExecArray;
                while ((match = regex.exec(txt)) !== null) {
                    matchLen = match[0].length;
                    replacement = linkify(match[0], buildHashtagUrl, includeW3, target, noFollow);
                    output += txt.substring(lastIndex, match.index + matchLen).replace(match[0], replacement);
                    lastIndex = match.index + matchLen;
                }

                // Include the rest of the text.
                if (lastIndex !== txt.length) {
                    output += txt.substring(lastIndex);
                }

                $(this).html(output);
            });
        };
    })(jQuery);
}
