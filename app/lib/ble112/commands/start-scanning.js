define(["require", "exports", "bglib", "ble112dir/send-command"],
    function (Require, Exports, bglib, sendCmd) {
    function startScanningCmd() {
        var e = function () {
            return sendCmd.sendCommand(bglib.api.gapSetMode, [0, 0])
        };
        return sendCmd.sendCommand(bglib.api.gapEndProcedure).then(e, e).then(function (e) {
            var t = 200, i = 200, a = !0;
            return sendCmd.sendCommand(bglib.api.gapSetScanParameters, [t, i, a ? 1 : 0])
        }).then(function (e) {
            return sendCmd.sendCommand(bglib.api.gapDiscover, [1])
        })
    }

    Object.defineProperty(Exports, "__esModule", {value: !0}), Exports["default"] = startScanningCmd
})