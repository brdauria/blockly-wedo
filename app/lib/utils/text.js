define(["module"], function (e) {
    function useDefault(e, t) {
        return void 0 === e || "" === e ? t : e
    }

    function isSamePort(e, t, n, r) {
        if (t === r) return !0;
        if (e === n) {
            if ("http" === e) return useDefault(t, "80") === useDefault(r, "80");
            if ("https" === e) return useDefault(t, "443") === useDefault(r, "443")
        }
        return !1
    }

    var t, n, r, i, a, o = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
        s = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, c = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        d = "undefined" != typeof location && location.href,
        l = d && location.protocol && location.protocol.replace(/\:/, ""), u = d && location.hostname,
        f = d && (location.port || void 0), h = {}, p = e.config && e.config() || {};
    return t = {
        version: "2.0.15", strip: function (e) {
            if (e) {
                e = e.replace(s, "");
                var t = e.match(c);
                t && (e = t[1])
            } else e = "";
            return e
        }, jsEscape: function (e) {
            return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
        }, createXhr: p.createXhr || function () {
            var e, t, n;
            if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
            if ("undefined" != typeof ActiveXObject) for (t = 0; 3 > t; t += 1) {
                n = o[t];
                try {
                    e = new ActiveXObject(n)
                } catch (r) {
                }
                if (e) {
                    o = [n];
                    break
                }
            }
            return e
        }, parseName: function (e) {
            var t, n, r, i = !1, a = e.lastIndexOf("."), o = 0 === e.indexOf("./") || 0 === e.indexOf("../");
            return -1 !== a && (!o || a > 1) ? (t = e.substring(0, a), n = e.substring(a + 1)) : t = e, r = n || t, a = r.indexOf("!"), -1 !== a && (i = "strip" === r.substring(a + 1), r = r.substring(0, a), n ? n = r : t = r), {
                moduleName: t,
                ext: n,
                strip: i
            }
        }, xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/, useXhr: function (e, n, r, i) {
            var a, o, s, c = t.xdRegExp.exec(e);
            return c ? (a = c[2], o = c[3], o = o.split(":"), s = o[1], o = o[0], (!a || a === n) && (!o || o.toLowerCase() === r.toLowerCase()) && (!s && !o || isSamePort(a, s, n, i))) : !0
        }, finishLoad: function (e, n, r, i) {
            r = n ? t.strip(r) : r, p.isBuild && (h[e] = r), i(r)
        }, load: function (e, n, r, i) {
            if (i && i.isBuild && !i.inlineText) return void r();
            p.isBuild = i && i.isBuild;
            var a = t.parseName(e), o = a.moduleName + (a.ext ? "." + a.ext : ""), s = n.toUrl(o),
                c = p.useXhr || t.useXhr;
            return 0 === s.indexOf("empty:") ? void r() : void(!d || c(s, l, u, f) ? t.get(s, function (n) {
                t.finishLoad(e, a.strip, n, r)
            }, function (e) {
                r.error && r.error(e)
            }) : n([o], function (e) {
                t.finishLoad(a.moduleName + "." + a.ext, a.strip, e, r)
            }))
        }, write: function (e, n, r, i) {
            if (h.hasOwnProperty(n)) {
                var a = t.jsEscape(h[n]);
                r.asModule(e + "!" + n, "define(function () { return '" + a + "';});\n")
            }
        }, writeFile: function (e, n, r, i, a) {
            var o = t.parseName(n), s = o.ext ? "." + o.ext : "", c = o.moduleName + s,
                d = r.toUrl(o.moduleName + s) + ".js";
            t.load(c, r, function (n) {
                var r = function (e) {
                    return i(d, e)
                };
                r.asModule = function (e, t) {
                    return i.asModule(e, d, t)
                }, t.write(e, c, r, a)
            }, a)
        }
    }, "node" === p.env || !p.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] && !process.versions["atom-shell"] ? (n = require.nodeRequire("fs"), t.get = function (e, t, r) {
        try {
            var i = n.readFileSync(e, "utf8");
            "\ufeff" === i[0] && (i = i.substring(1)), t(i)
        } catch (a) {
            r && r(a)
        }
    }) : "xhr" === p.env || !p.env && t.createXhr() ? t.get = function (e, n, r, i) {
        var a, o = t.createXhr();
        if (o.open("GET", e, !0), i) for (a in i) i.hasOwnProperty(a) && o.setRequestHeader(a.toLowerCase(), i[a]);
        p.onXhr && p.onXhr(o, e), o.onreadystatechange = function (t) {
            var i, a;
            4 === o.readyState && (i = o.status || 0, i > 399 && 600 > i ? (a = new Error(e + " HTTP status: " + i), a.xhr = o, r && r(a)) : n(o.responseText), p.onXhrComplete && p.onXhrComplete(o, e))
        }, o.send(null)
    } : "rhino" === p.env || !p.env && "undefined" != typeof Packages && "undefined" != typeof java ? t.get = function (e, t) {
        var n, r, i = "utf-8", a = new java.io.File(e), o = java.lang.System.getProperty("line.separator"),
            s = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(a), i)), c = "";
        try {
            for (n = new java.lang.StringBuffer, r = s.readLine(), r && r.length() && 65279 === r.charAt(0) && (r = r.substring(1)), null !== r && n.append(r); null !== (r = s.readLine());) n.append(o), n.append(r);
            c = String(n.toString())
        } finally {
            s.close()
        }
        t(c)
    } : ("xpconnect" === p.env || !p.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (r = Components.classes, i = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), a = "@mozilla.org/windows-registry-key;1" in r, t.get = function (e, t) {
        var n, o, s, c = {};
        a && (e = e.replace(/\//g, "\\")), s = new FileUtils.File(e);
        try {
            n = r["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream), n.init(s, 1, 0, !1), o = r["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream), o.init(n, "utf-8", n.available(), i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), o.readString(n.available(), c), o.close(), n.close(), t(c.value)
        } catch (d) {
            throw new Error((s && s.path || "") + ": " + d)
        }
    }), t
})