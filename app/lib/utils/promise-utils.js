define(["require", "exports"], function (e, t) {
    function reduce(e) {
        return e.reduce(function (e, t) {
            return e.then(t)
        }, Promise.resolve())
    }

    function makeDelay(e) {
        return new Promise(function (t, n) {
            setTimeout(function () {
                t()
            }, e)
        })
    }

    t.reduce = reduce, t.makeDelay = makeDelay
})