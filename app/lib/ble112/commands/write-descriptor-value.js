define(["require", "exports", "bglib", "ble112dir/send-command", "ble112dir/rx-listener"], function (e, t, n, r, i) {
    function writeDescriptorValueCmd(e, t) {
        var a = e.characteristic.service, o = i.waitForEventType("_bgEventAttClientProcedureCompleted");
        return r.sendCommand(n.api.attClientAttributeWrite, [a.connection, e.chrhandle, t]).then(function (e) {
            return o
        })
    }

    t.writeDescriptorValueCmd = writeDescriptorValueCmd
})