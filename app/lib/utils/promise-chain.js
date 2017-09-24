define(["require", "exports"], function (e, t) {
    function addPromise(e) {
        n = n ? n.then(e)["catch"](function (e) {
            return console.error(e), n = null, null
        }) : e()
    }

    var n;
    t.addPromise = addPromise
})