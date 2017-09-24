define(["require", "exports",
    "ble112dir/ble112",
    "ble112dir/device-manager",
    "wedo2/wedo2-scan-def"
    ],
    function (Require, Exports, ble112, deviceManager,wedo2ScanDef) {
    var self = function () {
        function Ble112Facade() {
        }

        return Ble112Facade.prototype.init = function () {
            var _this = this;
            return this.deviceManager = new deviceManager.DeviceManager,
                this.deviceManager.init().then(function (promise) {
                var scanDefArray = [new wedo2ScanDef.WeDo2ScanDef];
                return _this.deviceManager.setScanDefs(scanDefArray),
                    _this.ble = new ble112.ble112(_this.deviceManager),
                    Promise.resolve(promise)
            })
        }, Ble112Facade.prototype.getBle = function () {
            return this.ble
        }, Ble112Facade.prototype.getDeviceManager = function () {
            return this.deviceManager
        }, Ble112Facade
    }();
    Exports.Ble112Facade = self
})