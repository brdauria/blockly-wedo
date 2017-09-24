define(["signals", "utilsLib/getModules"], function (Signals, getModules) {
    var deviceManager, r = null, i = 0, self = {};
    return self.INTERNAL_BLE_PORT = "INTERNAL_BLE_PORT",
        self.INTERNAL_BLE_MODULE_ID = "INTERNAL_BLE_PORT",
        self.BLED112_MODULE_ID = "INTERNAL_BLE_PORT",
        self.disconnected = new Signals,
        self.connected = new Signals,
        self.ready = new Signals,
        self.setDevice = new Signals,
        self.init = function (facade) {
            deviceManager = facade.getDeviceManager();
            var ble112 = facade.getBle();
            getModules(["utilsLib/promise-chain", "device-manager/att-registry"]).then(function (arrayModules) {
                var _promiseChain = arrayModules[0], _attRegistry = arrayModules[1];
                deviceManager.onDeviceConnected.add(function (device) {
                    var devHandler = device ? device.handlerId : null;
                    _promiseChain.addPromise(function () {
                        return _attRegistry.notifyConnected(device, ble112, deviceManager).then(function () {
                            return self.connected.dispatch(devHandler, device), Promise.resolve()
                        })
                    })
                })
            }), deviceManager.onDeviceDisconnected.add(function (e) {
                var t = e ? e.handlerId : null;
                self.disconnected.dispatch(t, e)
            }), self.ready.dispatch(deviceManager, ble112)
        }, self.makePlatformFacade = function (e) {
        var n, r = "ble112dir/ble112-facade", i = "Ble112Facade";
        return getModules([r]).then(function (e) {
            return n = new e[0][i], n.init()
        }).then(function (e) {
            return self.init(n), Promise.resolve(n)
        })
    }, self.isBLEDPort = function (e) {
        return e && 9304 == e.vendorId && 1 == e.productId
    }, self.isChromeInternalBlePort = function (e) {
        return e && e.id == self.INTERNAL_BLE_PORT
    }, self.hasChromeInternalBle = function (e) {
        return -1 != window.navigator.appVersion.toLowerCase().indexOf("cros")
    }, self.setActiveHandler = function (e, t) {
        r = e, i = t
    }, self.getActiveHandlerId = function () {
        return r
    }, self.getMaxConnections = function () {
        return i
    }, self.getSelectedDevices = function () {
        return deviceManager ? deviceManager.connectedDevices.filter(function (e) {
            return e.handlerId == r
        }) : []
    }, require(["utilsLib/app-utils"], function (e) {
        e.addCloseHandler(function (e) {
            deviceManager.destroy(e)
        })
    }), self
})