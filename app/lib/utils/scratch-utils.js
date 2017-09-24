define(["utilsLib/data-utils"], function (e) {
    function getBusyList(e) {
        var t = r[e];
        return t || (t = r[e] = []), t
    }

    var t = "\n", n = " ", r = {}, i = {};
    return i.doAfterDelay = function (t, n, r, i) {
        var a = getBusyList(t);
        a.push(n), setTimeout(function () {
            e.deleteValue(a, n), r()
        }, 1e3 * i)
    }, i.getBusy = function (e) {
        var i = r[e];
        return i && i.length ? "_busy " + i.join(n) + t : ""
    }, i.getPathParts = function (e) {
        return e = e.replace(/%20/g, " "), e.substr(1).split("/")
    }, i.getStatus = function (e, n) {
        return 0 == n ? "_problem Chrome helper app not communicating with " + e + t : "_success " + e + " Connected" + t
    }, i
})