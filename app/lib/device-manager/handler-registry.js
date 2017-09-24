define(["require", "exports", "wedo2/wedo2-vendor"],
    function (Require, Exports, devWedo2) {
    function makeHandler(e, t, n) {
        var r = self[e], i = new r;
        return i.init(t, n), i
    }

    var self = {};
        self[devWedo2.WeDo2.ID] = devWedo2.WeDo2,
        Exports.makeHandler = makeHandler
})