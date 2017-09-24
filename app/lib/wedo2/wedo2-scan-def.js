define(["require",
    "exports",
    "ble112dir/device-manager",
    "ble112dir/ble112",
    "wedo2/wedo2-vendor"], function (Require, Exports, deviceManager, ble112, wedo2) {
    var f = function () {
        function WeDo2ScanDef() {
            this.handlerId = wedo2.WeDo2.ID
        }

        return WeDo2ScanDef.prototype.check = function (e) {
            var t = !1, i = !1, response = e.responses[ble112.SCAN_HEADER_FLAGS.GAP_SCAN_HEADER_ADV_IND];
            if (response) {
                var object = response.data[2];
                i = object && object.data && object.data.join && "2315000000000000" === object.data.join("")
            }
            var s = e.responses[ble112.SCAN_HEADER_FLAGS.GAP_SCAN_HEADER_SCAN_RSP];
            return s && (this.name = deviceManager.DeviceManager.getCompleteLocalName(s.data), t = !0), t && i
        }, WeDo2ScanDef
    }();
    Exports.WeDo2ScanDef = f
})