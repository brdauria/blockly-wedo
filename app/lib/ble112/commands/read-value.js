define(["require", "exports", "bglib", "ble112dir/send-command", "ble112dir/rx-listener"],
    function (e, t, n, r, i) {
    function readValueCmd(e, t) {
        var a, o = i.waitForEventType("_bgEventAttClientAttributeValue", function (e) {
            return "0" == e.response.type ? (a = e.response.value.buffer, !0) : void 0
        }), s = i.waitForEventType("_bgEventAttClientProcedureCompleted");
        return r.sendCommand(n.api.attClientReadByHandle, [e, t]).then(function () {
            return Promise.race([o, s])
        }).then(function () {
            return Promise.resolve(a)
        })
    }

    t.readValueCmd = readValueCmd
})