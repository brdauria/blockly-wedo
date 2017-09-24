define(["require", "exports",
    "utilsLib/data-utils",
    "device-manager/device-manager",
    "utilsLib/promise-utils",
    "device-manager/handler-registry"],
    function (Require, Exports, dataUtils, deviceManager, promiseUtils, handlerRegistry) {
    function notifyBleReady(e) {
        e.onDeviceDisconnected.add(function (e) {
            if (e) {
                var t = e.handler;
                t && (t.notifyDisconnected(name), delete e.handler)
            }
        })
    }

    function notifyConnected(e, t, o) {
        var s = handlerRegistry.makeHandler(e.handlerId, t, o);
        return s ? t.getServices(e.macAddress).then(function (a) {
            var o = [], c = [];
            return a.forEach(function (e) {
                o.push(function () {
                    return t.getCharacteristics(e.instanceId).then(function (e) {
                        return e.forEach(function (e) {
                            var r = s.getCharacteristicByUuid(dataUtils.dataUtils.convertUUID(e.uuid));
                            r && (r.characteristic = e), c.push(function () {
                                return t.getDescriptors(e.instanceId).then(function (e) {
                                    return e.forEach(function (e) {
                                        var t = s.getDescriptorByUuid(dataUtils.dataUtils.convertUUID(e.uuid));
                                        t && (t.descriptor = e)
                                    }), Promise.resolve()
                                })
                            })
                        }), Promise.resolve()
                    })
                })
            }), promiseUtils.reduce(o).then(function () {
                return promiseUtils.reduce(c)
            }).then(function () {
                return s.notifyReady()
            }).then(function () {
                return e.handler = s, e.state = deviceManager.EConnectionState.READY, Promise.resolve()
            })
        }) : Promise.reject(new Error("No handler for " + e.handlerId))
    }

    Exports.notifyBleReady = notifyBleReady, Exports.notifyConnected = notifyConnected
})