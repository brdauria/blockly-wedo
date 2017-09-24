define(["require", "exports", "bglib", "ble112dir/send-command", "ble112dir/rx-listener"], function (e, t, n, r, i) {
    function disconnectCmd(e, t) {
        return r.sendCommand(n.api.connectionDisconnect, [e]).then(function () {
            return t ? i.waitForEventType("_bgEventConnectionDisconnected") : Promise.resolve()
        })
    }

    Object.defineProperty(t, "__esModule", {value: !0}), t["default"] = disconnectCmd
})