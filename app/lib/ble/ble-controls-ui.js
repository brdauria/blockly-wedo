define(["jquery", "signals"], function ($, Signals) {
    var btnFind = $("#ble-find"),
        btnStop = $("#ble-stop"),
        btnTest = $("#ble-test"),
        self = {};
    return self.searchButtonClicked = new Signals,
        self.stopButtonClicked = new Signals,
        self.testButtonClicked = new Signals,
        btnFind.click(function () {
            self.searchButtonClicked.dispatch()
        }),
        btnStop.click(function () {
            self.stopButtonClicked.dispatch()
        }),
        btnTest.click(function () {
            self.testButtonClicked.dispatch()
        }),
        self.enableFindButton = function () {
            btnFind.removeClass("disabled").addClass("btn-success").text("Scan for devices")
        },
        self.showSearchButton = function (e) {
            btnFind.toggle(e)
        },
        self.showStopButton = function (e) {
            btnStop.toggle(e)
        },
        self.showTestButton = function (e) {
            btnTest.toggle(e)
        },
        self
})