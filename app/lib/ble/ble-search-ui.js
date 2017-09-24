define(["jquery", "signals",
    "text!partials/_ble-search-dialog.html",
    "text!partials/_ble-device-item.html"], function ($, Signals, dialogHtml, itemHtml) {
    var dialog, disableClass = "disabled", itemList = {}, self = {};
    return self.itemClicked = new Signals,
        self.closed = new Signals,
        self.resetButtonClicked = new Signals,
        self.shown = new Signals,
        self.selectedDevice = null,
        self.show = function (t) {
            dialog = $(dialogHtml.replace("{small-header}", t)).modal({backdrop: "static"}).appendTo($("body")),
                dialog.find(".close").click(function () {
                    self.closed.dispatch()
                }), dialog.find(".btn-close").click(function () {
                self.closed.dispatch()
            }), dialog.find(".btn-reset").click(function () {
                self.resetButtonClicked.dispatch()
            }), dialog.on("hidden.bs.modal", function () {
                dialog.remove()
            }), self.shown.dispatch()
        }, self.addDevice = function (name, address, enabled) {
        var div = $(dialog).find("#device-list"),
            item = $(itemHtml.replace("{name}", name).replace("{address}", address));
        console.log('Device added: ', name, ' address: ', address);
        enabled ? item.prependTo(div) : item.appendTo(div), item.click(function () {
            $(this).hasClass(disableClass) || self.itemClicked.dispatch(address)
        }), item.toggleClass(disableClass, !enabled),
            itemList[address] = item
    }, self.updateDevice = function (e, t) {
        var n = itemList[e];
        n.toggleClass("connected", t >= 2),
            n.toggleClass("pending", 1 == t)
    }, self.deleteItem = function (e) {
        var t = itemList[e];
        t.remove()
    }, self.clearItems = function () {
        var e = Object.keys(itemList);
        e.forEach(function (e) {
            var t = itemList[e];
            t.remove(), delete itemList[e]
        })
    }, self
})