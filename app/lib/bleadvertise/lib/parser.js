define(["bleadvertiseLib/packet", "buffer"], function (e, t) {
    function split(e) {
        for (var n = [], r = 0, i = e[r++]; i > r;) {
            var a = e[r++], o = e[r++], s = a - 1, c = t.makeBuffer(s);
            t.copy(e, c, 0, r, r + s), n.push({type: o, data: c}), r += s
        }
        return n
    }

    function parse(e, r, i) {
        if (r = r ? r : "BE", "BE" != r && "LE" != r) return void(i && i(new Error("Invalid Byte Order. Must be 'BE' or 'LE'")));
        if (!t.isBuffer(e)) return void(i && i(new Error("Data must be a buffer")));
        var a = split(e), o = [];
        return a.forEach(function (e) {
            o.push(new n(e.type, e.data, r))
        }), i && i(null, o), o
    }

    function parseLE(e) {
        return parse(e, "LE")
    }

    function parseBE(e) {
        return parse(e, "BE")
    }

    var n = e.Packet;
    return {split: split, parse: parse, parseLE: parseLE, parseBE: parseBE}
})