define(["require", "exports", "bglib", "utilsLib/data-utils",
    "ble112dir/instance-registry", "ble112dir/send-command", "ble112dir/rx-listener"],
    function (e, t, n, r, i, a, o) {
    function getProperties(e) {
        var t = [];
        return 1 & e && t.push("broadcast"), 2 & e && t.push("read"), 4 & e && t.push("writeWithoutResponse"), 8 & e && t.push("write"), 16 & e && t.push("notify"), 32 & e && t.push("indicate"), 64 & e && t.push("authenticatedSignedWrites"), 128 & e && t.push("extendedProperties"), t
    }

    function getCharacteristicsCmd(e) {
        var t, s = [3, 40], c = [], d = o.listenForEventType("_bgEventAttClientAttributeValue", function (n) {
            if ("3" == n.response.type) {
                var a = n.response, o = a.value, s = r.dataUtils.reverseToHex(o.slice(3)), d = {
                    properties: getProperties(o[0]),
                    atthandle: o[1],
                    uuid: s,
                    value: o,
                    service: e,
                    instanceId: i.makeInstanceId(e.connection, s),
                    nextAttHandle: e.end + 1
                };
                i.addCharacteristic(d), c.push(d), t && (t.nextAttHandle = d.atthandle), t = d
            }
        }), l = o.waitForEventType("_bgEventAttClientProcedureCompleted");
        return a.sendCommand(n.api.attClientReadByType, [e.connection, e.start, e.end, s]).then(function (e) {
            return l
        }).then(function () {
            return d(), Promise.resolve(c)
        })
    }

    t.getCharacteristicsCmd = getCharacteristicsCmd
})