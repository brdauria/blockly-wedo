define(["signals"], function (e) {
    function Connection(t) {
        this.timeoutId = -1, this.timeoutMs = t, this.isConnected = !1, this.connected = new e,
            this.disconnected = new e
    }

    return Connection.prototype.reset = function () {
        this.sendConnected(), this.startTimeout()
    }, Connection.prototype.startTimeout = function () {
        clearTimeout(this.timeoutId);
        var e = this;
        this.timeoutId = setTimeout(function () {
            e.sendDisconnected()
        }, this.timeoutMs)
    }, Connection.prototype.sendDisconnected = function () {
        this.isConnected && (this.isConnected = !1, this.disconnected.dispatch())
    }, Connection.prototype.sendConnected = function () {
        this.isConnected || (this.isConnected = !0, this.connected.dispatch())
    }, Connection
})