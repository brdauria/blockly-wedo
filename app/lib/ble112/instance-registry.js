define(["require", "exports"], function (e, t) {
    function makeInstanceId(e, t) {
        return e + s + t
    }

    function removeAtConnection(e) {
        var t = e + s;
        removeWithPrefix(n, t), removeWithPrefix(a, t);
        var c = removeWithPrefix(r, t);
        c.forEach(function (e) {
            delete i[e.atthandle]
        });
        var d = removeWithPrefix(a, t);
        d.forEach(function (e) {
            delete o[e.chrhandle]
        })
    }

    function addService(e) {
        n[e.instanceId] = e
    }

    function getService(e) {
        return n[e]
    }

    function addCharacteristic(e) {
        r[e.instanceId] = e;
        var t = e.service, n = t.connection + s + e.atthandle;
        i[n] = e
    }

    function getCharacteristic(e) {
        return r[e]
    }

    function getCharacteristicByHandle(e, t) {
        var n = e + s + t;
        return i[n]
    }

    function addDescriptor(e) {
        a[e.instanceId] = e;
        var t = e.characteristic.service, n = t.connection + s + e.chrhandle;
        o[n] = e
    }

    function getDescriptor(e) {
        return a[e]
    }

    function getDescriptorByHandle(e, t) {
        var n = e + s + t;
        return o[n]
    }

    function removeWithPrefix(e, t) {
        var n = [];
        return Object.keys(e).forEach(function (r) {
            0 == r.indexOf(t) && (n.push(e[r]), delete e[r])
        }), n
    }

    var n = {}, r = {}, i = {}, a = {}, o = {}, s = ":";
    t.makeInstanceId = makeInstanceId, t.removeAtConnection = removeAtConnection, t.addService = addService, t.getService = getService, t.addCharacteristic = addCharacteristic, t.getCharacteristic = getCharacteristic, t.getCharacteristicByHandle = getCharacteristicByHandle, t.addDescriptor = addDescriptor, t.getDescriptor = getDescriptor, t.getDescriptorByHandle = getDescriptorByHandle
})