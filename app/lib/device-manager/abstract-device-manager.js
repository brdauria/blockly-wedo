define(["require", "exports",
    "device-manager/device-manager",
    "utilsLib/data-utils",
    "signals"], function (Require, Exports, deviceManager, dataUtils, Signals) {
    var self = function () {
        function AbstractDeviceManager() {
            this.onDeviceFound = new Signals.Signal,
                this.onDeviceConnected = new Signals.Signal,
                this.onDeviceDisconnected = new Signals.Signal,
                this.foundDevices = [],
                this.connectedDevices = [],
                this.devicesByKey = {}
        }

        return AbstractDeviceManager.prototype.getConnectedDeviceByAddress = function (e) {
            return this.getDeviceByAddress(this.connectedDevices, e)
        }, AbstractDeviceManager.prototype.getDeviceByAddress = function (e, t) {
            return e.find(function (e) {
                return e.macAddress == t
            })
        }, AbstractDeviceManager.prototype.addConnectedDevice = function (e) {
            dataUtils.dataUtils.removeFromArray(this.foundDevices, e),
                e.state = deviceManager.EConnectionState.CONNECTED,
                this.connectedDevices.push(e),
                this.onDeviceConnected.dispatch(e)
        }, AbstractDeviceManager.prototype.removeConnectedDevice = function (e) {
            dataUtils.dataUtils.removeFromArray(this.connectedDevices, e),
                e.state = deviceManager.EConnectionState.NOT_CONNECTED,
                this.onDeviceDisconnected.dispatch(e)
        }, AbstractDeviceManager.prototype.addFoundDevice = function (e, t) {
            this.devicesByKey[e] = t,
                this.foundDevices.push(t),
                this.onDeviceFound.dispatch(t)
        }, AbstractDeviceManager.prototype.removeFoundDevice = function (e, t) {
            delete this.devicesByKey[e],
                dataUtils.dataUtils.removeFromArray(this.foundDevices, t)
        }, AbstractDeviceManager.prototype.resetFoundDevices = function () {
            this.devicesByKey = {},
                this.foundDevices.splice(0)
        }, AbstractDeviceManager
    }();
    Exports.AbstractDeviceManager = self
})