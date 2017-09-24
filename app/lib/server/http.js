define(["server/server", "signals"], function (e, t) {
    function ab2str(e) {
        return String.fromCharCode.apply(null, new Uint8Array(e))
    }

    function str2ab(e) {
        for (var t = new Uint8Array(e.length), n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
        return t.buffer
    }

    var n = "\n";
    e.received.add(function (e, t) {
        var n = ab2str(t), i = n.split("\n"), a = i[0], o = a.split(" "), s = o[0], c = o[1];
        r.requestMade.dispatch(e, s, c, n)
    });
    var r = {};
    return r.server = e, r.requestMade = new t, r.send = function (t, r) {
        var i = "";
        i += "HTTP/1.1 200 OK" + n, i += "Content-Type: text/html; charset=ISO-8859-1" + n, i += "Content-Length: " + r.length + n, i += "Access-Control-Allow-Origin: *" + n, i += n;
        var a = i + r;
        e.send(t, str2ab(a))
    }, r
})