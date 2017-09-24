define(["bglibLib/bglib-errors", "buffer"], function (e, t) {
    var n = function (e) {
        this.dfu = t.readUInt8(e, 0)
    }, r = function (e) {
    }, i = function (e) {
        this.address = e
    }, a = function (e) {
        this.txok = t.readUInt8(e, 0), this.txretry = t.readUInt8(e, 1), this.rxok = t.readUInt8(e, 2), this.rxfail = t.readUInt8(e, 3), this.mbuf = t.readUInt8(e, 4)
    }, o = function (e) {
        this.maxconn = t.readUInt8(e, 0)
    }, s = function (e) {
        this.major = t.readUInt16LE(e, 0), this.minor = t.readUInt16LE(e, 2), this.patch = t.readUInt16LE(e, 4), this.build = t.readUInt16LE(e, 6), this.llversion = t.readUInt16LE(e, 8), this.protocol_version = t.readUInt8(e, 10), this.hw = t.readUInt8(e, 11)
    }, c = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, d = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, l = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, u = function (e) {
    }, f = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0)), this.size = t.readUInt8(n, 2)
    }, h = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, p = function (e) {
    }, m = function (e) {
    }, v = function (e) {
    }, g = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, b = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0)), this.value = n.slice(3, 3 + n[2])
    }, y = function (e) {
    }, _ = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, E = function (n) {
        this.handle = t.readUInt16LE(n, 0), this.offset = t.readUInt16LE(n, 2), this.result = e.getErrorFromCode(t.readUInt16LE(n, 4)), this.value = n.slice(7, 7 + n[6])
    }, C = function (n) {
        this.handle = t.readUInt16LE(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 2)), this.value = n.slice(5, 5 + n[4])
    }, S = function (e) {
    }, T = function (e) {
    }, w = function (n) {
        this.connection = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, D = function (e) {
        this.connection = t.readUInt8(e, 0), this.rssi = t.readInt8(e, 1)
    }, A = function (n) {
        this.connection = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }, x = function (n) {
        this.connection = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }, I = function (e) {
        this.connection = t.readUInt8(e, 0)
    }, O = function (n) {
        this.connection = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }, k = function (n) {
        this.connection = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }, R = function (n) {
        this.connection = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }, L = function (n) {
        this.connection = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }, P = function (n) {
        this.connection = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }, N = function (n) {
        this.connection = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }, M = function (n) {
        this.connection = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }, B = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, U = function (n) {
        this.connection = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }, F = function (n) {
        this.connection = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }, H = function (n) {
        this.connection = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }, q = function (n) {
        this.connection = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }, V = function (n) {
        this.handle = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }, G = function (e) {
    }, j = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, z = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, W = function (e) {
        this.bonds = t.readUInt8(e, 0)
    }, $ = function (e) {
    }, Y = function (e) {
    }, X = function (e) {
    }, Z = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, K = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, Q = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0)), this.connection_handle = t.readUInt8(n, 2)
    }, J = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, ee = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0)), this.connection_handle = t.readUInt8(n, 2)
    }, te = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, ne = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, re = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, ie = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, ae = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, oe = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, se = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, ce = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, de = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, le = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, ue = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, fe = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, he = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0)), this.port = t.readUInt8(n, 2), this.data = t.readUInt8(n, 3)
    }, pe = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, me = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0)), this.channel = t.readUInt8(n, 2), this.data = n.slice(4, 4 + n[3])
    }, ve = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0)), this.data = n.slice(3, 3 + n[2])
    }, ge = function (e) {
        this.written = t.readUInt8(e, 0)
    }, be = function (e) {
    }, ye = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, _e = function (e) {
    }, Ee = function (e) {
        this.channel_map = t.readUInt8(e, 0)
    }, Ce = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, Se = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, Te = function (n) {
        this.result = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }, we = {
        0: [n, r, i, null, null, a, o, null, s, c, d, l, u, f, h],
        1: [p, m, v, g, b, y],
        2: [_, E, C, S, T],
        3: [w, D, A, x, null, null, null, I],
        4: [O, k, R, L, P, N, M, B, U, F, H, q],
        5: [V, G, j, Y, z, W, $],
        6: [X, Z, K, Q, J, ee, te, ne, re, ie, ae],
        7: [oe, se, ce, de, le, ue, fe, he, pe, me, ve, ge, be, ye],
        8: [null, null, null, null, Ee, null, _e],
        9: [null, Ce, Se, Te]
    };
    return {Responses: we}
})