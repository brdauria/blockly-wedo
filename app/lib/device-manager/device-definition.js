define(["require", "exports", "utilsLib/promise-utils"], function (e, t, n) {
    var r = function () {
        function DeviceDefinition() {
            this.state = [], this.characteristicDefinitions = [], this.descriptorDefinitions = [], this.characteristicDefsByName = {}, this.characteristicDefsByUuid = {}, this.descriptorDefsByName = {}, this.descriptorDefsByUuid = {}, this.commands = {}, this.testCommands = {}
        }

        return DeviceDefinition.prototype.init = function (e, t) {
            this.ble = e, this.deviceManager = t
        }, Object.defineProperty(DeviceDefinition.prototype, "testCommandNames", {
            get: function () {
                return Object.keys(this.testCommands)
            }, enumerable: !0, configurable: !0
        }), DeviceDefinition.prototype.getCommand = function (e) {
            return this.commands[e]
        }, DeviceDefinition.prototype.notifyReady = function () {
            return this.ble.onCharacteristicValueChanged.add(this.notificationHandler, this), this.startNotifications()
        }, DeviceDefinition.prototype.notifyDisconnected = function (e) {
            this.ble.onCharacteristicValueChanged.remove(this.notificationHandler, this)
        }, DeviceDefinition.prototype.getCharacteristicByUuid = function (e) {
            return this.characteristicDefsByUuid[e]
        }, DeviceDefinition.prototype.getDescriptorByUuid = function (e) {
            return this.descriptorDefsByUuid[e]
        }, DeviceDefinition.prototype.addCommand = function (e) {
            this.commands[e.name] = e, e.test && (this.testCommands[e.name] = e)
        }, DeviceDefinition.prototype.addCharacteristicDefinition = function (e) {
            e.uuid = this.deviceManager.formatUuidName(e.uuidStr), this.characteristicDefinitions.push(e), this.characteristicDefsByName[e.name] = e, this.characteristicDefsByUuid[e.uuid] = e
        }, DeviceDefinition.prototype.addDescriptorDefinition = function (e) {
            e.uuid = this.deviceManager.formatUuidName(e.uuidStr), this.descriptorDefinitions.push(e), this.descriptorDefsByName[e.name] = e, this.descriptorDefsByUuid[e.uuid] = e
        }, DeviceDefinition.prototype.writeCharacteristicValue = function (e, t) {
            var n = this.characteristicDefsByName[e], r = new Uint8Array(t).buffer;
            return this.ble.writeCharacteristicValue(n.characteristic.instanceId, r)
        }, DeviceDefinition.prototype.writeDescriptorValue = function (e, t) {
            var n = this.descriptorDefsByName[e], r = new Uint8Array(t).buffer;
            return this.ble.writeDescriptorValue(n.descriptor.instanceId, r)
        }, DeviceDefinition.prototype.notificationHandler = function (e) {
            var t = this.characteristicDefsByUuid[e.uuid];
            if (t && e.instanceId == t.characteristic.instanceId && t.notifcationHandler) {
                var n = new Uint8Array(e.value);
                t.notifcationHandler(n)
            }
        }, DeviceDefinition.prototype.startNotifications = function () {
            var e = this, t = Object.keys(this.characteristicDefsByUuid), r = [];
            return t.forEach(function (t) {
                var n = e.characteristicDefsByUuid[t];
                n.notifcationHandler && r.push(function () {
                    return e.ble.startCharacteristicNotifications(n.characteristic.instanceId)
                })
            }), n.reduce(r)
        }, DeviceDefinition
    }();
    t.DeviceDefinition = r
})