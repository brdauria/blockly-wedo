define(["require", "exports", "signals", "ble112dir/ble112"],
    function (Require, Exports, Signals, ble112) {
        function destroy() {
            chrome.serial.onReceive.removeListener(i),
                Exports.onResponse.removeAll(),
                Exports.onEvent.removeAll(),
                Exports.onError.removeAll()
        }

        function waitForEcho(e) {
            return new Promise(function (resolve, reject) {
                var i = function (a) {
                    a.packet.cClass == e.cClass && a.packet.cID == e.cID && (Exports.onResponse.remove(i), a.response && a.response.result && "BGLibError" == a.response.result.constructor.name ? reject(new Error(a.response.result.message)) : resolve(a))
                };
                Exports.onResponse.add(i)
            })
        }

        function waitForEventType(e, n) {
            return void 0 === n && (n = function () {
                return !0
            }), new Promise(function (resolve, reject) {
                var a = function (i) {
                    i.response.constructor.name == e && n(i) && (Exports.onEvent.remove(a), resolve(i))
                };
                Exports.onEvent.add(a)
            })
        }

        function listenForEventType(event, evListner) {
            var listner = function (param) {
                param.response.constructor.name == event && evListner(param)
            }, rmListner = function () {
                Exports.onEvent.remove(listner)
            };
            return Exports.onEvent.add(listner), rmListner
        }

        Exports.onResponse = new Signals.Signal,
            Exports.onEvent = new Signals.Signal,
            Exports.onError = new Signals.Signal;

        var i = function (e) {
            var n = e.data;
            if (n) {
                var i = new Uint8Array(n);
                ble112.parser.parseIncoming(i, function (e, n) {
                    e ? Exports.onError.dispatch(e) : n.forEach(function (e) {
                        "Response" == e.responseType ? Exports.onResponse.dispatch(e) : "Event" == e.responseType && Exports.onEvent.dispatch(e)
                    })
                })
            }
        };

        chrome.serial.onReceive.addListener(i),
            Exports.destroy = destroy,
            Exports.waitForEcho = waitForEcho,
            Exports.waitForEventType = waitForEventType,
            Exports.listenForEventType = listenForEventType
    })