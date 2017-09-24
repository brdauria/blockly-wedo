define(["require", "exports", "bglib", "ble112dir/send-command", "ble112dir/rx-listener"],
    function (Require, Exports, bglib, sendCmd, rxListner) {
    function connectCmd(macAddressBytes, addressType, timeOut, connectFlag, conInterval) {
        void 0 === connectFlag && (connectFlag = 9), void 0 === conInterval && (conInterval = 75);
        var c, d = Math.floor(conInterval / 1.25), l = Math.floor(80), u = 100, f = 0, h = "_bgEventConnectionStatus",
            p = rxListner.waitForEventType(h, function (e) {
                return e.response.flags === connectFlag
            }), m = new Date;
        return sendCmd.sendCommand(bglib.api.gapConnectDirect, [macAddressBytes, addressType, d, l, u, f]).then(function (e) {
            return c = e.response.connection_handle, console.log("connect echo received"),
                Promise.race([p, new Promise(function (resolve, reject) {
                setTimeout(function () {
                    reject(new Error("Connection timed out after " + timeOut + "ms"))
                }, timeOut)
            })])
        }).then(function () {
            return console.log("connect event received after ", (new Date).getTime() - m.getTime(), " ms"), Promise.resolve(c)
        })
    }

    Object.defineProperty(Exports, "__esModule", {value: !0}), Exports["default"] = connectCmd
})