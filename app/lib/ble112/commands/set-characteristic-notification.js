define(["require", "exports", "bglib", "ble112dir/send-command", "ble112dir/rx-listener"],
    function (e, t, n, r, i) {
    function setCharacteristicNotificationCmd(e, t) {
        function waitForComplete() {
            return i.waitForEventType("_bgEventAttClientProcedureCompleted")
        }

        var a, o, s = i.listenForEventType("_bgEventAttClientAttributeValue", function (e) {
            a || "3" != e.response.type || (a = e.response.atthandle)
        }), c = waitForComplete(), d = e.atthandle, l = e.nextAttHandle;
        if (null == l) {
            var u = e.service;
            l = u.end + 1
        } else l -= 1;
        a = null;
        var f = 0;
        e.properties.indexOf("notify") > -1 && (f |= 1), e.properties.indexOf("indicate") > -1 && (f |= 2);
        var h = [t ? f : 0, 0];
        return r.sendCommand(n.api.attClientReadByType, [e.service.connection, d, l, [2, 41]]).then(function (e) {
            return c
        }).then(function () {
            return s(), o = waitForComplete(), r.sendCommand(n.api.attClientAttributeWrite, [e.service.connection, a, h])
        }).then(function () {
            return o
        }).then(function () {
            return Promise.resolve({})
        })
    }

    t.setCharacteristicNotificationCmd = setCharacteristicNotificationCmd
})