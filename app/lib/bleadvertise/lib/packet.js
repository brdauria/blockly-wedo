define(["buffer"], function (e) {
    function Packet(t, n, r) {
        if (this.typeFlag = t, this.raw = n, this.byteOrder = r, n && !e.isBuffer(n)) throw new Error("Data must be a buffer");
        var i = Packet.ADTypes[t];
        i ? (this.type = i.name, this.data = i.resolve ? i.resolve(n, t, r) : n) : (this.type = "Unknown", this.data = n)
    }

    function toStringArray(e) {
        var t = [];
        return e ? (1 & e[0] && t.push("LE Limited Discoverable Mode"), 2 & e[0] && t.push("LE General Discoverable Mode"), 4 & e[0] && t.push("BR/EDR Not Supported"), 8 & e[0] && t.push("Simultaneous LE and BR/EDR to Same Device Capable (Controller)"), 16 & e[0] && t.push("Simultaneous LE and BR/EDR to Same Device Capable (Host)"), t.length || t.push("None")) : t.push("None"), t
    }

    function toOctetStringArray(e, t, n, r) {
        var i = [];
        if (!t) return [];
        if (e > t.length) throw new Error("Not enough bytes for single UUID");
        if (t.length % e) throw new Error("Not enough bytes to complete each UUID. Needs to be multiple of " + e.toString());
        for (; t;) {
            var a = toOctetString(e, t, n, r);
            i.push(a), t = t.slice(e, t.length), t && t.length || (t = null)
        }
        return i
    }

    function toString(e) {
        return e.toString("utf8")
    }

    function toSignedInt(t) {
        return t ? e.readInt8(t, 0) : 0
    }

    function toOctetString(t, n, r, i) {
        for (var a = [], o = 0; t > o; o++) {
            var s = e.readUInt8(n, o).toString(16);
            1 == s.length && (s = "0" + s), a.push(s)
        }
        "BE" == i && a.reverse();
        var c = a.join("");
        return c
    }

    return Packet.ADTypes = {
        1: {name: "Flags", resolve: toStringArray},
        2: {name: "Incomplete List of 16-bit Service Class UUIDs", resolve: toOctetStringArray.bind(null, 2)},
        3: {name: "Complete List of 16-bit Service Class UUIDs", resolve: toOctetStringArray.bind(null, 2)},
        4: {name: "Incomplete List of 32-bit Service Class UUIDs", resolve: toOctetStringArray.bind(null, 4)},
        5: {name: "Complete List of 32-bit Service Class UUIDs", resolve: toOctetStringArray.bind(null, 4)},
        6: {name: "Incomplete List of 128-bit Service Class UUIDs", resolve: toOctetStringArray.bind(null, 16)},
        7: {name: "Complete List of 128-bit Service Class UUIDs", resolve: toOctetStringArray.bind(null, 16)},
        8: {name: "Shortened Local Name", resolve: toString},
        9: {name: "Complete Local Name", resolve: toString},
        10: {name: "Tx Power Level", resolve: toSignedInt},
        13: {name: "Class of Device", resolve: toOctetString.bind(null, 3)},
        14: {name: "Simple Pairing Hash C", resolve: toOctetString.bind(null, 16)},
        15: {name: "Simple Pairing Randomizer R", resolve: toOctetString.bind(null, 16)},
        16: {name: "Device ID", resolve: toOctetString.bind(null, 16)},
        17: {name: "Security Manager Out of Band Flags", resolve: toOctetString.bind(null, 16)},
        18: {name: "Slave Connection Interval Range", resolve: toOctetStringArray.bind(null, 2)},
        20: {name: "List of 16-bit Service Solicitation UUIDs", resolve: toOctetStringArray.bind(null, 2)},
        31: {name: "List of 32-bit Service Solicitation UUIDs", resolve: toOctetStringArray.bind(null, 4)},
        21: {name: "List of 128-bit Service Solicitation UUIDs", resolve: toOctetStringArray.bind(null, 8)},
        22: {name: "Service Data", resolve: toOctetStringArray.bind(null, 1)},
        23: {name: "Public Target Address", resolve: toOctetStringArray.bind(null, 6)},
        24: {name: "Random Target Address", resolve: toOctetStringArray.bind(null, 6)},
        25: {name: "Appearance", resolve: null},
        26: {name: "Advertising Interval", resolve: toOctetStringArray.bind(null, 2)},
        27: {name: "LE Bluetooth Device Address", resolve: toOctetStringArray.bind(null, 6)},
        28: {name: "LE Role", resolve: null},
        29: {name: "Simple Pairing Hash C-256", resolve: toOctetStringArray.bind(null, 16)},
        30: {name: "Simple Pairing Randomizer R-256", resolve: toOctetStringArray.bind(null, 16)},
        32: {name: "Service Data - 32-bit UUID", resolve: toOctetStringArray.bind(null, 4)},
        33: {name: "Service Data - 128-bit UUID", resolve: toOctetStringArray.bind(null, 16)},
        61: {name: "3D Information Data", resolve: null},
        255: {name: "Manufacturer Specific Data", resolve: null}
    }, {Packet: Packet, toOctetStringArray: toOctetStringArray}
})