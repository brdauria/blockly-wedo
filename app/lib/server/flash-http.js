define(["./http"], function (e) {
    function makeCrossDomain() {
        var t = "";
        return t += "<cross-domain-policy>\n", t += '<allow-access-from domain="*" to-ports="' + e.server.port + '"/>\n', t += "</cross-domain-policy>", t += "\x00"
    }

    e.requestMade.add(function (t, n, r, i) {
        "/crossdomain.xml" == r && e.send(t, makeCrossDomain())
    })
})