define(["require", "exports",
    "bglib", "utilsLib/data-utils",
    "ble112dir/instance-registry", "ble112dir/send-command", "ble112dir/rx-listener"],
    function (e, t, n, r, i, a, o) {
    function getDescriptorsCmd(e) {
        var t = e.service, s = [], c = o.listenForEventType("_bgEventAttClientFindInformationFound", function (n) {
            var a = n.response, o = a.uuid, c = r.dataUtils.reverseToHex(o), d = {
                uuid: r.dataUtils.reverseToHex(o),
                characteristic: e,
                chrhandle: a.chrhandle,
                uuidBytes: o,
                instanceId: i.makeInstanceId(t.connection, e.uuid + ":" + c)
            };
            s.push(d), i.addDescriptor(d)
        }), d = o.waitForEventType("_bgEventAttClientProcedureCompleted"), l = e.nextAttHandle;
        if (null == l) {
            var t = e.service;
            l = t.end
        } else l -= 2;
        return a.sendCommand(n.api.attClientFindInformation, [t.connection, e.atthandle + 1, l]).then(function (e) {
            return d
        }).then(function () {
            return c(), Promise.resolve(s)
        })
    }

    Object.defineProperty(t, "__esModule", {value: !0}), t["default"] = getDescriptorsCmd
})