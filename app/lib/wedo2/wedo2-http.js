define([
    "server/http",
    "server/flash-http",
    "server/server",
    "server/connection",
    "utilsLib/scratch-utils",
    "wedo2/wedo2-constants"], function (http, flashHttp, server, connection, scratchUtils, wedo2Constants) {
    function handleRequest(port, n, r, d) {
        if (port == wedo2Port) {
            var l = scratchUtils.getPathParts(r), u = l.shift(), f = "";
            if (s && s.getConnectionCount() > 0) {
                switch (u) {
                    case"poll":
                        f = s.getSensorValues(), f += scratchUtils.getBusy(wedo2Constants.NAME), self.connection.reset();
                        break;
                    default:
                        s.doCommand(u, l)
                }
                f += scratchUtils.getStatus(wedo2Constants.NAME, s.getConnectionCount())
            } else f = scratchUtils.getStatus(wedo2Constants.NAME, 0), self.connection.reset();
            http.send(port, f)
        }
    }

    var wedo2Port = 17311;
    http.requestMade.add(handleRequest);
    var s, self = {};
    return self.setDeviceHandler = function (e) {
        s = e
    }, self.connection = new connection(2e3), server.start(wedo2Port), self
})