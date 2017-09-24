define(["signals", "utilsLib/data-utils"], function (e, t) {
    function info(e) {
        console.info(e)
    }

    function error(e) {
        console.error(e)
    }

    function log(e) {
        console.log(e)
    }

    function onReceiveError(e) {
        error("chrome.sockets.tcp.onReceiveError (" + e.resultCode + ") on socket " + e.socketId), chrome.sockets.tcp.setPaused(e.socketId, !1), -100 == e.resultCode && close(e.socketId)
    }

    function onReceive(e) {
        var t = findConnection(e.socketId);
        info("received data on " + e.socketId), t.lastClient = e.socketId, a.received.dispatch(t.port, e.data)
    }

    function close(e) {
        chrome.sockets.tcp.disconnect(e, function () {
            info("disconnected " + e), chrome.sockets.tcp.close(e, function () {
                info("closed " + e);
                var n = findConnection(e);
                n && t.deleteValue(n.clients, e)
            })
        })
    }

    function onAccept(e) {
        var t = r[e.socketId];
        if (t) {
            var n = e.clientSocketId;
            t.clients.push(n), chrome.sockets.tcp.setKeepAlive(n, !1, 0, function (e) {
                info("keep alive result code " + e)
            }), log("port " + t.port + " connection made on client socket " + n), chrome.sockets.tcp.setPaused(n, !1)
        }
    }

    function findConnection(e) {
        for (var t in i) {
            var n = i[t];
            if (-1 != n.clients.indexOf(e)) return n
        }
    }

    function createSocket(e) {
        var t = {port: e, clients: []};
        i[e] = t, chrome.sockets.tcpServer.create({}, function (i) {
            info("socket created"), t.server = i.socketId, r[t.server] = t, chrome.sockets.tcpServer.listen(t.server, n, e, function (n) {
                return 0 > n ? void error("Error listening:" + chrome.runtime.lastError.message) : void info("listening on server socket " + t.server + " for port " + e)
            })
        })
    }

    var n = "127.0.0.1", r = {}, i = {};
    chrome.sockets.tcp.onReceiveError.addListener(onReceiveError), chrome.sockets.tcp.onReceive.addListener(onReceive), chrome.sockets.tcpServer.onAccept.addListener(onAccept);
    var a = {};
    return a.received = new e, a.start = function (e) {
        function checkServer() {
            chrome.sockets.tcpServer.getSockets(function (t) {
                var n = !1;
                t.forEach(function (t) {
                    t.localPort == e && (info("closing pre-existing server socket"), console.dir(t), n = !0, chrome.sockets.tcpServer.close(t.socketId, function () {
                        checkClient()
                    }))
                }), n || checkClient()
            })
        }

        function checkClient() {
            chrome.sockets.tcp.getSockets(function (n) {
                var r = !1;
                n.forEach(function (n) {
                    n.localPort == e && (info("closing pre-existing client socket"), console.dir(n), r = !0, chrome.sockets.tcp.close(n.socketId, function () {
                        t()
                    }))
                }), r || t()
            })
        }

        var t = function () {
            createSocket(e)
        };
        checkServer()
    }, a.send = function (e, t) {
        var n = i[e], r = n.lastClient;
        null != chrome.runtime.lastError ? error("server error @send:" + chrome.runtime.lastError.message + ", clientId:" + r) : chrome.sockets.tcp.send(r, t, function (e) {
            null != chrome.runtime.lastError && error("server error @send callback:" + chrome.runtime.lastError.message + ", clientId:" + r)
        })
    }, a
})