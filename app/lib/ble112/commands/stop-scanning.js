define(["require", "exports", "bglib", "ble112dir/send-command"], function (e, t, n, r) {
    function resolve() {
        return Promise.resolve()
    }

    function stopScanningCmd() {
        return r.sendCommand(n.api.gapEndProcedure).then(resolve, resolve)
    }

    Object.defineProperty(t, "__esModule", {value: !0}), t["default"] = stopScanningCmd
})