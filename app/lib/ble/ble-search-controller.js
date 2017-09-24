define(["ble/ble", "ble/ble-search-ui"], function (ble, bleSearchUi) {
    function findByAddress(deviceList, address) {
        return deviceList.find(function (item) {
            return item.macAddress == address
        })
    }

    function deviceFound(device) {
        var r = ble.getSelectedDevices().length;
        bleSearchUi.addDevice(device.displayName, device.macAddress,
            device.handlerId == ble.getActiveHandlerId() && r < ble.getMaxConnections())
    }

    function scanDeviceUpdated(device) {
        bleSearchUi.updateDevice(device.macAddress, device.state)
    }

    function addConnectedItems() {
        bleSearchUi.clearItems(), _devManager.connectedDevices.forEach(function (e) {
            bleSearchUi.addDevice(e.displayName, e.macAddress, !0), bleSearchUi.updateDevice(e.macAddress, e.state)
        })
    }

    var _devManager, _promiseChain, _ble112;
    ble.ready.add(function (devManager, ble112) {
        _devManager = devManager, _ble112 = ble112
    }), require(["utilsLib/promise-chain"], function (promiseChain) {
        _promiseChain = promiseChain
    });
    var a = !1;
    bleSearchUi.shown.add(function () {
        a = !0, addConnectedItems(), _promiseChain.addPromise(function () {
            return _devManager.startScanning()
        }),
            _devManager.onDeviceFound.add(deviceFound),
            _devManager.onDeviceConnected.add(scanDeviceUpdated),
            _devManager.onDeviceDisconnected.add(scanDeviceUpdated)
    }), bleSearchUi.closed.add(function () {
        a = !1, _promiseChain.addPromise(function () {
            return _devManager.stopScanning()
        }), _devManager.onDeviceFound.remove(deviceFound), _devManager.onDeviceConnected.remove(scanDeviceUpdated), _devManager.onDeviceDisconnected.remove(scanDeviceUpdated)
    }), bleSearchUi.resetButtonClicked.add(function () {
        _promiseChain.addPromise(function () {
            return _devManager.reset().then(function () {
                return bleSearchUi.clearItems(), _devManager.startScanning()
            })
        })
    }), bleSearchUi.itemClicked.add(function (address) {
        var selectedDevice = findByAddress(_devManager.foundDevices, address);
        return selectedDevice || (selectedDevice = findByAddress(_devManager.connectedDevices, address)),
            selectedDevice ? void(selectedDevice.state >= 2 ? _promiseChain.addPromise(function () {
            return _ble112.disconnect(selectedDevice.macAddress).then(function () {
                bleSearchUi.deleteItem(selectedDevice.macAddress)
            })
        }) : 0 == selectedDevice.state && (bleSearchUi.updateDevice(selectedDevice.macAddress, 1),
            _promiseChain.addPromise(function () {
            return _ble112.connect(selectedDevice.macAddress, {persistent: !1})["catch"](function (e) {
                console.warn("couldn't connect")
            }).then(function () {
                return a ? (addConnectedItems(), _devManager.startScanning()) : Promise.resolve()
            })
        }))) : void console.error("Couldn't find selected device")
    })
})