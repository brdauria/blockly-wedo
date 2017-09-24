define(["require", "exports"], function (Require, Exports) {
    function connect(port) {
        return new Promise(function (resolve, reject) {
            var params = {bitrate: 25600, dataBits: "eight", stopBits: "one", parityBit: "no", ctsFlowControl: !1};
            chrome.serial.connect(port, params, function (connectionInfo) {
                chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(connectionInfo.connectionId)
            })
        })
    }

    function getPortPath() {
        return new Promise(function (resolve, reject) {
            chrome.serial.getDevices(function (ports) {
                var _value;
                ports.some(function (value) {
                    return 9304 == value.vendorId && 1 == value.productId ? (_value = value, !0) : !1
                }), _value ? resolve(_value.path) : reject(new Error("BLED112 not found"))
            })
        })
    }

    function start() {
        return getPortPath().then(function (port) {
            return connect(port)
        })
    }

    Exports.start = start
})