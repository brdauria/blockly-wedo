define(["require", "exports", "signals",
    "ble112dir/rx-listener",
    "ble112dir/instance-registry",
    "ble112dir/commands/discover-services",
    "ble112dir/commands/get-characteristics",
    "ble112dir/commands/get-descriptors",
    "ble112dir/commands/write-characteristic-value",
    "ble112dir/commands/set-characteristic-notification",
    "ble112dir/commands/write-descriptor-value",
    "ble112dir/commands/read-value",
    "bglib"],
    function (Require, Exports, Signals,
              exListener, instanceRegistry, discoverServices, getCharacteristics,
              getDescriptors, writeCharacteristicValue,
              setCharacteristicNotification, writeDescriptorValue, readValue, bglib) {
    Exports.parser = new bglib,
        Exports.parser.setPacketMode(!1),
        Exports.SCAN_HEADER_FLAGS =
            Exports.parser.SCAN_HEADER_FLAGS;
    var self = function () {
        function ble112(devManager) {
            var t = this;
            this.onServiceAdded = new Signals.Signal,
                this.onSetDevice = new Signals.Signal,
                this.onServiceChanged = new Signals.Signal,
                this.onServiceRemoved = new Signals.Signal,
                this.onCharacteristicValueChanged = new Signals.Signal,
                this.onDescriptorValueChanged = new Signals.Signal,
                this.deviceManager = devManager,
                exListener.listenForEventType("_bgEventAttClientAttributeValue", function (e) {
                if ("1" == e.response.type || "2" == e.response.type) {
                    var n = (e.response.connection, instanceRegistry.getCharacteristicByHandle(e.response.connection, e.response.atthandle));
                    if (n) n.value = e.response.value.buffer, t.onCharacteristicValueChanged.dispatch(n); else {
                        var r = instanceRegistry.getDescriptorByHandle(e.response.connection, e.response.atthandle);
                        r && (r.value = e.response.value.buffer, t.onDescriptorValueChanged.dispatch(r))
                    }
                }
            })
        }

        return ble112.prototype.connect = function (macAddress, attrib) {
            return this.deviceManager.connect(macAddress)
        }, ble112.prototype.disconnect = function (e) {
            return this.deviceManager.disconnect(e)
        }, ble112.prototype.getService = function (e) {
            return Promise.resolve(instanceRegistry.getService(e))
        }, ble112.prototype.getServices = function (e) {
            var t = this.deviceManager.getConnectedDeviceByAddress(e);
            if (!t) throw new Error("No device found for deviceAddress " + e);
            return discoverServices["default"](t.connectionHandle)
        }, ble112.prototype.getCharacteristic = function (e) {
            return Promise.resolve(instanceRegistry.getCharacteristic(e))
        }, ble112.prototype.getCharacteristics = function (e) {
            var t = instanceRegistry.getService(e);
            if (!t) throw new Error("No service found for serviceId " + e);
            return getCharacteristics.getCharacteristicsCmd(t)
        }, ble112.prototype.getIncludedServices = function (e) {
            return Promise.resolve()
        }, ble112.prototype.getDescriptor = function (e) {
            return Promise.resolve(instanceRegistry.getDescriptor(e))
        }, ble112.prototype.getDescriptors = function (e) {
            return getDescriptors["default"](instanceRegistry.getCharacteristic(e))
        }, ble112.prototype.readCharacteristicValue = function (e) {
            var t = this, n = instanceRegistry.getCharacteristic(e), r = n.service;
            return readValue.readValueCmd(r.connection, n.atthandle).then(function (e) {
                return null != e ? (n.value = e, t.onCharacteristicValueChanged.dispatch(n),
                    Promise.resolve(n)) : Promise.reject(new Error("chrome.bluetoothLowEnergy.Characteristic not found"))
            })
        }, ble112.prototype.writeCharacteristicValue = function (e, t) {
            return writeCharacteristicValue.writeCharacteristicValueCmd(instanceRegistry.getCharacteristic(e), new Uint8Array(t))
        }, ble112.prototype.startCharacteristicNotifications = function (e, t) {
            return setCharacteristicNotification.setCharacteristicNotificationCmd(instanceRegistry.getCharacteristic(e), !0)
        }, ble112.prototype.stopCharacteristicNotifications = function (e) {
            return setCharacteristicNotification.setCharacteristicNotificationCmd(instanceRegistry.getCharacteristic(e), !1)
        }, ble112.prototype.readDescriptorValue = function (e) {
            var t = this, n = instanceRegistry.getDescriptor(e), r = n.characteristic.service;
            return readValue.readValueCmd(r.connection, n.chrhandle).then(function (e) {
                return null != e ? (n.value = e, t.onDescriptorValueChanged.dispatch(n), Promise.resolve(n)) : Promise.reject(new Error("chrome.bluetoothLowEnergy.Characteristic not found"))
            })
        }, ble112.prototype.writeDescriptorValue = function (e, t) {
            return writeDescriptorValue.writeDescriptorValueCmd(instanceRegistry.getDescriptor(e), new Uint8Array(t))
        }, ble112
    }();
    Exports.ble112 = self
})