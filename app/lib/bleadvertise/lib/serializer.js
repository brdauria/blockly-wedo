define([], function () {
    function intArrayToByte(e) {
        for (var t = 0, n = 0; n < e.length; n++) t |= e[n];
        return Buffer([t])
    }

    function stringToBuffer(e) {
        return new Buffer(e)
    }

    function octectStringToBuffer(e) {
        var t = e.length / 2, n = new Buffer(t);
        if (t % 2) throw new Error("Invalid UUID" + e + ".");
        for (var r = 0; t > r; r++) n.writeUInt8(parseInt(e.substr(2 * r, 2), 16), t - r - 1);
        return n
    }

    function octetStringArrayToBuffer(e) {
        for (var t = [], n = 0; n < e.length; n++) t.push(octectStringToBuffer(e[n]));
        return Buffer.concat(t)
    }

    function signedIntToBuffer(e) {
        var t = new Buffer(1);
        return t.writeInt8(e, 0), t
    }

    function arrayToBuffer(e) {
        return new Buffer(e)
    }

    function serialize(e) {
        var t = [];
        Object.keys(e).forEach(function (n) {
            typeFlag = ADTypes[n].typeFlag, data = ADTypes[n].resolve(e[n]), t.push(new Buffer([data.length + 1, typeFlag])), t.push(data)
        });
        var n = Buffer.concat(t);
        if (n.length > 32) throw new Error("Packet exceeds maximum length of 32 bytes");
        return n
    }

    return ADTypes = {
        flags: {typeFlag: 1, resolve: intArrayToByte},
        incompleteUUID16: {typeFlag: 2, resolve: octetStringArrayToBuffer},
        completeUUID16: {typeFlag: 3, resolve: octetStringArrayToBuffer},
        incompleteUUID32: {typeFlag: 4, resolve: octetStringArrayToBuffer},
        completeUUID32: {typeFlag: 5, resolve: octetStringArrayToBuffer},
        incompleteUUID128: {typeFlag: 6, resolve: octetStringArrayToBuffer},
        completeUUID128: {typeFlag: 7, resolve: octetStringArrayToBuffer},
        shortName: {typeFlag: 8, resolve: stringToBuffer},
        completeName: {typeFlag: 9, resolve: stringToBuffer},
        txPower: {typeFlag: 10, resolve: signedIntToBuffer},
        deviceClass: {typeFlag: 13, resolve: octectStringToBuffer},
        pairingHashC: {typeFlag: 14, resolve: octectStringToBuffer},
        pairingRandomizerR: {typeFlag: 15, resolve: octectStringToBuffer},
        deviceId: {typeFlag: 16, resolve: octectStringToBuffer},
        smOOBFlags: {typeFlag: 17, resolve: octectStringToBuffer},
        intervalRange: {typeFlag: 18, resolve: octetStringArrayToBuffer},
        solicitationUUID16: {typeFlag: 20, resolve: octetStringArrayToBuffer},
        solicitationUUID32: {typeFlag: 31, resolve: octetStringArrayToBuffer},
        solicitationUUID128: {typeFlag: 21, resolve: octetStringArrayToBuffer},
        serviceData: {typeFlag: 22, resolve: octetStringArrayToBuffer},
        publicAddress: {typeFlag: 23, resolve: octetStringArrayToBuffer},
        randomAddress: {typeFlag: 24, resolve: octetStringArrayToBuffer},
        appearance: {typeFlag: 25, resolve: arrayToBuffer},
        interval: {typeFlag: 26, resolve: octetStringArrayToBuffer},
        deviceAddress: {typeFlag: 27, resolve: octetStringArrayToBuffer},
        role: {typeFlag: 28, resolve: arrayToBuffer},
        pairingHashC256: {typeFlag: 29, resolve: octetStringArrayToBuffer},
        pairingRandomizerR256: {typeFlag: 30, resolve: octetStringArrayToBuffer},
        serviceUUID32: {typeFlag: 32, resolve: octetStringArrayToBuffer},
        serviceUUID128: {typeFlag: 33, resolve: octetStringArrayToBuffer},
        _3dInfo: {typeFlag: 61, resolve: arrayToBuffer},
        mfrData: {typeFlag: 255, resolve: arrayToBuffer}
    }, {serialize: serialize}
})