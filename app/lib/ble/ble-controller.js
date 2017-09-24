define(["utilsLib/data-utils",
        "ble/ble",
        "ble/ble-controls-ui",
        "ble/ble-search-ui",
        "ble/ble-search-controller",
        "ble/ble-test-ui",
        "wedo2/wedo2-constants",
        "wedo2/wedo2-http"],
    function (dataUtils, ble, bleCtrlUi, bleSearchUi, bleSearchCtrl, bleTestUi, wedo2Consts, wedo2Http) {
        function addDevice(deviceInfo, deviceHandler) {
            devices[deviceInfo.NAME] = deviceInfo,
                devicesHandlers[deviceInfo.NAME] = deviceHandler.connection
        }

        function setDeviceButtonState() {
            var e = ble.getSelectedDevices().length > 0 && !selDeviceHandler.isConnected;
            bleCtrlUi.showTestButton(e), bleCtrlUi.showStopButton(!1)
        }

        function stopHttpListen() {
            selDeviceHandler && (selDeviceHandler.connected.remove(setDeviceButtonState, this), selDeviceHandler.disconnected.remove(setDeviceButtonState, this), selDeviceHandler = null)
        }

        function resetSelectedDevices() {
            ble.getSelectedDevices().forEach(function (e) {
                _promiseChain.addPromise(function () {
                    e.handler.getCommand("RESET").execute()
                })
            })
        }

        // var r, o, i -> var bleCtrlUi, bleTestUi, bleSearchUi
        var selDevice, devices = {}, devicesHandlers = {};
        addDevice(wedo2Consts, wedo2Http);
        var selDeviceHandler, devManInstance, bleInstance, _promiseChain;
        require(["ble112dir/facade", "utilsLib/promise-chain"], function (facade, promiseChain) {
            var _facade = new facade.Facade;
            _facade.init().then(function () {
                devManInstance = _facade.getDeviceManager(),
                    bleInstance = _facade.getBle(),
                    ble.init(_facade),
                    bleCtrlUi.enableFindButton()
            }), _promiseChain = promiseChain
        }), ble.connected.add(function (e, t) {
            setDeviceButtonState()
        }), ble.disconnected.add(function (e) {
            setDeviceButtonState()
        }),  ble.setDevice.add(function (devName) {
            devManInstance && devManInstance.reset(), stopHttpListen(), selDevice = devName;
            var selDeviceInfo = devices[selDevice];
            selDeviceInfo ? (bleCtrlUi.showSearchButton(!0),
                ble.setActiveHandler(selDeviceInfo.HANDLER_NAME || selDevice, selDeviceInfo.MAX_CONNECTIONS || 1),
                selDeviceHandler = devicesHandlers[selDevice],
                selDeviceHandler.connected.add(setDeviceButtonState, this),
                selDeviceHandler.disconnected.add(setDeviceButtonState, this),
                setDeviceButtonState()) : null != ble.getActiveHandlerId() && (ble.setActiveHandler(null), bleCtrlUi.showSearchButton(!1),
                bleCtrlUi.showTestButton(!1), bleCtrlUi.showStopButton(!1))
        }), bleCtrlUi.stopButtonClicked.add(function () {
                resetSelectedDevices()
            }), bleCtrlUi.searchButtonClicked.add(function () {
            var selDeviceInfo = devices[selDevice], text = "Scanning for devices...";
            selDeviceInfo && selDeviceInfo.SMALL_HEADER && (text = selDeviceInfo.SMALL_HEADER),
                bleSearchUi.show(text)
        }), bleCtrlUi.testButtonClicked.add(function () {
            var e = [];
            ble.getSelectedDevices().forEach(function (t) {
                e = e.concat([t.displayName, t.macAddress, t.handler.testCommandNames])
            }), bleTestUi.show.apply(this, e)
        }), bleTestUi.closed.add(function () {
            resetSelectedDevices()
        }), bleTestUi.commandClicked.add(function (e, t) {
            var n = devManInstance.connectedDevices.find(function (t) {
                return t.macAddress == e
            });
            _promiseChain.addPromise(function () {
                return n.handler.getCommand(t).execute()
            })
        })
    })