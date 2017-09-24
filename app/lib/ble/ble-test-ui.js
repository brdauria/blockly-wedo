define(["jquery", "signals", "text!partials/_ble-test-dialog.html"], function ($, Signals, html) {
    var dialog, self = {};
    return self.commandClicked = new Signals,
        self.closed = new Signals,
        self.show = function () {
            dialog = $(html).modal({backdrop: "static"}).appendTo($("body")),
                dialog.on("hidden.bs.modal", function () {
                    dialog.remove(), self.closed.dispatch()
                });
            for (var div = dialog.find(".device-commands"), ix = 0; ix < arguments.length; ix += 3) {
                var o = arguments[ix + 1],
                    item = '<div class="list-group-item list-group-item-info">' + arguments[ix] + " (" + o + ")</div>";
                $(item).appendTo(div);
                var c = arguments[ix + 2];
                c.forEach(function (n) {
                    var btn = '<button class="list-group-item">' + n + "</button>",
                        onClick = self.commandClicked.dispatch.bind(self.commandClicked, o, n);
                    $(btn).appendTo(div).click(function () {
                        onClick()
                    })
                })
            }
        }, self
})