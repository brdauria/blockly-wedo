define([], function () {
    return function (module) {
        return new Promise(function (t, n) {
            require(module, function () {
                t(Array.from(arguments))
            })
        })
    }
})