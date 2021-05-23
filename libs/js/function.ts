/// <reference path="./_Prototype-Array.ts" />
/// <reference path="./_Prototype-Object.ts" />

/**
 * php equivalent http_build_query
 * @param obj
 */
function http_build_query(obj: Object) {
    if (typeof obj != "object") {
        throw "http_build_query need parameter of object instead of " + typeof obj;
    }
    const queryString = Object.keys(obj)
        .map(function (key) {
            return key + "=" + obj[key];
        })
        .join("&");
    return queryString;
}

/**
 * Check current framework running at localhost
 */
function is_localhost() {
    const is_local = location.host.match(/^localhost|^127|(apotek|php|git).io$/s);
    return is_local;
}

if (!isnode()) {
    if (is_localhost()) {
        setTimeout(function () {
            $.ajax({
                url: "/server/clean?latest=s&force=true",
            });
        }, 5000);
    } else {
        $.ajax({
            url: "/server/clean?latest=" + new Date(),
            silent: true,
            indicator: false,
        });
    }
}

/**
 * Force HTTPS
 */
function forceSSL() {
    if (location.protocol !== "https:" && !is_localhost()) {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }
}

/**
 * json decode fails return false
 * @param  obj
 */
function json_decode(obj: string) {
    try {
        return JSON.parse(obj);
    } catch (error) {
        return false;
    }
}

if (isnode()) {
    module.exports = isJSON;
}

interface HTMLScriptAttribute {
    async?: boolean;
    defer?: boolean;
    /**
     * Script Type
     * @example
     * {type: "text/javascript"} // type="text/javascript"
     */
    type?: "application/json" | "text/plain" | "application/javascript" | "text/javascript";
}

interface LoadScriptOptions {
    url: string | string[];
    /**
     * Html script attributes
     */
    options?: HTMLScriptAttribute | null;
    /**
     * Callback after all scripts loaded
     */
    callback?: null | Function;
}

const LoadScriptLoaded: any[] = [];

/**
 * Load script asynchronously
 * @param urls
 * @param callback
 */
function LoadScript(config: LoadScriptOptions): typeof LoadScriptLoaded {
    const urls: string[] = [];
    if (typeof config.url == "string") {
        urls.add(config.url);
    } else if (Array.isArray(config.url)) {
        urls.addAll(config.url);
    }

    const defaultConfig: LoadScriptOptions = {
        url: [],
        options: {
            type: "text/javascript",
        },
        callback: null,
    };
    config = Object.assign(defaultConfig, config);

    console.log(`Script in queue ${urls.length}`);
    /**
     * Callback onreadystatechange
     * @description queue javascript calls
     * @param event
     */
    const callthis = function (event?: Event) {
        //console.log(this.readyState, event);

        // remove first url
        urls.shift();

        if (!urls.length) {
            config.callback();
        } else if (urls.length) {
            LoadScript({
                url: urls,
                options: config.options,
                callback: config.callback,
            });
        }

        //LoadScriptLoaded[urls[0]]["status"] = true;
    };

    if (!urls.isEmpty()) {
        const script = document.createElement("script");

        // script src from first url
        script.src = urls[0];
        LoadScriptLoaded[urls[0]] = {
            status: undefined,
            onerror: undefined,
            onabort: undefined,
            oncancel: undefined,
        };

        if (typeof config.options == "object") {
            // add attriubutes options
            if (config.options.hasOwnProperty("async")) {
                script.async = config.options.async;
            }
            if (config.options.hasOwnProperty("defer")) {
                script.defer = config.options.defer;
            }
            if (config.options.hasOwnProperty("type")) {
                script.type = config.options.type;
            }
        }

        //console.info(`loading script(${script.src})`);
        script.onload = script.onreadystatechange = callthis;

        script.onerror = function () {
            LoadScriptLoaded[script.src]["onerror"] = false;
            console.error(`error while loading ${script.src}`);
        };
        script.onabort = function () {
            LoadScriptLoaded[script.src]["onabort"] = false;
            console.error(`error while loading ${script.src}`);
        };
        script.oncancel = function () {
            LoadScriptLoaded[script.src]["oncancel"] = false;
            console.error(`error while loading ${script.src}`);
        };

        document.body.appendChild(script);
    }

    return LoadScriptLoaded;
}

const loadedCss: string[] = [];

/**
 * Load CSS async
 * @param href
 * @param callback
 */
function loadCSS(href: string | string[], callback?: any) {
    if (typeof href == "string") {
        href = [href];
    }
    const htm = document.querySelector("html");
    const cache = htm.getAttribute("cache").toString().trim();
    if (Array.isArray(href)) {
        const hrefs = href;
        if (!loadedCss.contains(hrefs[0])) {
            const link = document.createElement("link");
            link.media = "print";
            link.rel = "stylesheet";
            link.href = cache.length ? hrefs[0] + "?cache=" + cache : hrefs[0];
            link.onload = function () {
                link.media = "all";
                hrefs.shift();
                loadedCss.add(hrefs[0]);
                if (!hrefs.length) {
                    if (typeof callback == "function") {
                        callback(link, href);
                    }
                } else {
                    loadCSS(hrefs, callback);
                }
            };
            document.head.appendChild(link);
        } else {
            hrefs.shift();
            loadCSS(hrefs, callback);
        }
    }
}
