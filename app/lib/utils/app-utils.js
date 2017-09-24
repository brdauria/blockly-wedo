define([], function () {
    var e = {};
    return e.addCloseHandler = function (e) {
        chrome.runtime.getBackgroundPage(function (t) {
            chrome.app.window.current().onClosed.addListener(function () {
                e(t)
            })
        })
    }, e
})