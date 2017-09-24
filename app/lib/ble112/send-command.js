define(["require", "exports", "ble112dir/ble112", "ble112dir/rx-listener"],
    function (Require, Exports, ble112, rxListener) {
    function setSerialConnectionId(id) {
        connectionId = id
    }

    function sendCommand(cmd, callback) {
        return void 0 === callback && (callback = []), new Promise(function (resolve, reject) {
            ble112.parser.getPacket(cmd, callback,
                function (e, t) {
                e ? reject(e) : chromeRef.serial.send(connectionId, getByteArray(t.getByteArray(null)).buffer, function (e) {
                    resolve(t)
                })
            })
        }).then(function (e) {
            return rxListener.waitForEcho(e)
        })
    }

    function getByteArray(data) {
        return "undefined" != typeof Buffer ? new Uint8Array(data) : data
    }

    var connectionId, chromeRef, backgroundPage;
    chrome.runtime.getBackgroundPage(function (bgPage) {
        backgroundPage = bgPage, chromeRef = bgPage.chrome
    }),
        Exports.setSerialConnectionId = setSerialConnectionId,
        Exports.sendCommand = sendCommand
})