define(["require", "exports",
    "bglib",
    "utilsLib/data-utils",
    "ble112dir/instance-registry",
    "ble112dir/send-command",
    "ble112dir/rx-listener"], function (e, t, n, r, i, a, o) {
    function discoverServicesCmd(e) {
        var t = 1, s = 65535, c = new Uint8Array([0, 40]), d = [],
            l = o.listenForEventType("_bgEventAttClientGroupFound", function (t) {
                var n = t.response.uuid, a = r.dataUtils.reverseToHex(n), o = {
                    uuid: a,
                    isPrimary: !0,
                    uuidBytes: n,
                    connection: e,
                    start: t.response.start,
                    end: t.response.end,
                    instanceId: i.makeInstanceId(e, a)
                };
                i.addService(o), d.push(o)
            }), u = o.waitForEventType("_bgEventAttClientProcedureCompleted");
        return a.sendCommand(n.api.attClientReadByGroupType, [e, t, s, c]).then(function (e) {
            return u
        }).then(function () {
            return l(), Promise.resolve(d)
        })
    }

    Object.defineProperty(t, "__esModule", {value: !0}), t["default"] = discoverServicesCmd
})