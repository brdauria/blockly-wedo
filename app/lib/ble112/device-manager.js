define(["require", "exports",
        "bglib",
        "ble112dir/send-command",
        "device-manager/device-manager",
        "utilsLib/data-utils",
        "ble112dir/instance-registry",
        "ble112dir/rx-listener",
        "ble112dir/commands/start-scanning",
        "ble112dir/commands/stop-scanning",
        "ble112dir/commands/start",
        "ble112dir/commands/connect",
        "ble112dir/commands/disconnect",
        "utilsLib/promise-utils",
        "device-manager/abstract-device-manager",
        "utilsLib/extends-utils"],
    function (Require, Exports, bglib, bleSendCommand,
              deviceManager, dataUtils, bleInstanceRegistry, bleRxListener,
              bleCmdStartScanning, bleCmdStopScanning, bleCmdStart, bleCmdConnect, bleCmdDisconnect,
              promiseUtils, AbstractDeviceManager, extendsUtils) {
        var v = function (e) {
            function DeviceManager() {
                e.call(this), this.scanData = {}, this.deviceScanDefs = []
            }

            return extendsUtils(DeviceManager, e), DeviceManager.getCompleteLocalName = function (e) {
                var t;
                e.some(function (e) {
                    return "Complete Local Name" == e.type ? (t = dataUtils.dataUtils.ua2text(e.raw), !0) : !1
                });
                return t
            }, DeviceManager.prototype.setScanDefs = function (e) {
                this.deviceScanDefs = e
            }, DeviceManager.prototype.formatUuidName = function (e) {
                return -1 == e.indexOf("-") ? e : e.toLowerCase().replace(/-/g, "")
            }, DeviceManager.prototype.init = function () {
                var _this = this;
                return bleCmdStart.start().then(function (connectionId) {
                    return _this.serialConnectionId = connectionId,
                        bleSendCommand.setSerialConnectionId(connectionId),
                        bleRxListener.listenForEventType("_bgEventConnectionDisconnected",
                            function (t) {
                                var n = _this.getDeviceByConnection(t.response.connection);
                                _this.notifyDisconnect(n)
                                // }), Promise.resolve("BLED112")
                            }), bleCmdDisconnect["default"](0, !1).then(function () {
                        return bleCmdDisconnect["default"](1, !1)
                    }).then(function () {
                        return bleCmdDisconnect["default"](2, !1)
                    }).then(function () {
                        return Promise.resolve("BLED112")
                    })
                })
            }, DeviceManager.prototype.destroy = function (e) {
                this.onDeviceFound.removeAll(), this.connectedDevices.forEach(function (e) {
                    bleSendCommand.sendCommand(bglib.api.connectionDisconnect, [e.connectionHandle])
                });
                var t = this.serialConnectionId;
                e.setTimeout(function () {
                    e.chrome.serial.disconnect(t, function (t) {
                        e.console.log("serial disconnected")
                    })
                }, 1e3)
            }, DeviceManager.prototype.notifyDisconnect = function (e) {
                e && (e.connectionHandle = null, this.removeConnectedDevice(e))
            }, DeviceManager.prototype.connect = function (macAddress) {
                var _this = this, selDevice = this.getDeviceByAddress(this.foundDevices, macAddress);
                return selDevice ? (selDevice.state = deviceManager.EConnectionState.PENDING,
                    bleCmdConnect["default"](selDevice.macAddressBytes, selDevice.addressType, 1e4, selDevice.scanDef.connectFlag, selDevice.scanDef.conInterval).then(
                        function (resolve) {
                            return selDevice.connectionHandle = resolve,
                                _this.addConnectedDevice(selDevice),
                                Promise.resolve()
                        }, function (reject) {
                            return selDevice.state = deviceManager.EConnectionState.NOT_CONNECTED,
                                Promise.reject(new Error("Couldn't connect. " + reject.message))
                        })) : Promise.reject(new Error("Device no longer available"))
            }, DeviceManager.prototype.disconnect = function (e) {
                var t = this.getConnectedDeviceByAddress(e);
                return t.state = deviceManager.EConnectionState.PENDING, bleInstanceRegistry.removeAtConnection(t.connectionHandle), bleCmdDisconnect["default"](t.connectionHandle, !0)
            }, DeviceManager.prototype.reset = function () {
                var e = this, t = this.connectedDevices.map(function (t) {
                    return function () {
                        return e.disconnect(t.macAddress)
                    }
                });
                return promiseUtils.reduce(t)
            }, DeviceManager.prototype.startScanning = function () {
                return this.resetFoundDevices(),
                    this.scanData = {},
                    bleRxListener.onEvent.add(this.onScanEvent, this),
                    bleCmdStartScanning["default"]()
            }, DeviceManager.prototype.stopScanning = function () {
                return bleRxListener.onEvent.remove(this.onScanEvent, this), bleCmdStopScanning["default"]()
            }, DeviceManager.prototype.getDeviceByConnection = function (e) {
                return this.connectedDevices.find(function (t) {
                    return t.connectionHandle == e
                })
            }, DeviceManager.prototype.checkNew = function (e) {
                var t = e.sender.toString(),
                    n = this.scanData[t];
                if (n) {
                    if (n.found) return
                } else {
                    n = {responses: {}, found: !1}, this.scanData[t] = n;
                }
                n.responses[e.packet_type] = e;
                var r = this.deviceScanDefs.find(function (e) {
                    return e.check(n)
                });
                if (r) {
                    n.found = !0;
                    var i = dataUtils.dataUtils.reverseToHex(e.sender),
                        s = {
                            handlerId: r.handlerId,
                            displayName: r.name,
                            macAddress: i,
                            timeAdded: new Date,
                            addressType: e.address_type,
                            macAddressBytes: e.sender,
                            state: deviceManager.EConnectionState.NOT_CONNECTED,
                            scanDef: r,
                            handler: null
                        };
                    this.addFoundDevice(t, s)
                }
            }, DeviceManager.prototype.onScanEvent = function (e) {
                "_bgEventGAPScanResponse" == e.response.constructor.name && this.checkNew(e.response)
            }, DeviceManager
        }(AbstractDeviceManager.AbstractDeviceManager);
        Exports.DeviceManager = v
    })