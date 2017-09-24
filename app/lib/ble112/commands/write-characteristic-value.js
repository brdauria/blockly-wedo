define(["require", "exports", "bglib", "ble112dir/send-command", "ble112dir/rx-listener"],
    function (e, t, n, r, i) {
    function writeCharacteristicValueCmd(e, t) {
        var a = e.service, o = i.waitForEventType("_bgEventAttClientProcedureCompleted");
        return r.sendCommand(n.api.attClientAttributeWrite, [a.connection, e.atthandle, t]).then(function (e) {
            return o
        })
    }

    t.writeCharacteristicValueCmd = writeCharacteristicValueCmd
})