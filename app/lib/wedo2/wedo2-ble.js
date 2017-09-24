define(["signals",
        "utilsLib/data-utils", "ble/ble",
        "utilsLib/scratch-utils", "wedo2/wedo2-constants", "wedo2/wedo2-http"],
    function (Signal, dataUtils, ble, scratchUtils, wedo2Const, wedo2Http) {
        function getMotors(motorName) {
            var motorNum = motorNames.indexOf(motorName);
            return motorNum > -1 ? [speedValues[motorNum]] : speedValues
        }

        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function getWeDoIndex(wedoName) {
            if (isNumber(wedoName)) {
                return (wedoName - 1);
            } else {
                var t = wedos.indexOf(wedoName.toLowerCase());
                return t > -1 ? t : 0
            }
        }

        function startPoll() {
            stopPoll(), C = setInterval(function () {
                deviceList.forEach(function (e, t) {
                    self.polled.dispatch(e.handler.state, t)
                })
            }, p1)
        }

        function stopPoll() {
            clearInterval(C), C = null
        }

        function writeName(e, t) {
            var n = getWeDoIndex(e), r = deviceList[n].handler;
            if (!r) return void console.warn("writeName. device not ready");
            var i = bleDataUtils.text2array(t), a = r.getCommand(wedo2.SET_NAME);
            _promisedChain.addPromise(function () {
                return a.execute.apply(a, i)
            })
        }

        function setSoundOn(e, t, n) {
            var r = getWeDoIndex(e), i = deviceList[r].handler;
            if (!i) return void console.warn("setSoundOn. device not ready");
            var a = i.getCommand(wedo2.PLAY_SOUND);
            _promisedChain.addPromise(function () {
                return a.execute.apply(a, [t, n])
            })
        }

        function setSoundOff(e) {
        }

        function setLed(e, t) {
            var n = getWeDoIndex(e), r = deviceList[n].handler;
            if (!r) return void console.warn("setLed. device not ready");
            var i = r.getCommand(wedo2.SET_LED), a = colorNames.indexOf(t);
            if ("random" == t && (a = Math.floor(10 * Math.random() + 1)), -1 != a) {
                if (p2[n] == a) return;
                p2[n] = a, _promisedChain.addPromise(function () {
                    return i.execute.apply(i, [a])
                })
            }
        }

        function setMotorOn(e, t) {
            var n = getMotors(e);
            n.forEach(function (e) {
                e.on = t
            }), setMotors()
        }

        function setMotors() {
            for (var e = speedValues.map(function (e) {
                return getMotorSpeedByte(e.on, e.speed, e.dir)
            }), t = deviceList.length, n = 0; t > n; n++) {
                var r = deviceList[n].handler;
                if (!r) return void console.warn("setMotors. device not ready");
                for (var i = 0; 2 > i; i++) {
                    var a = 2 * n + i;
                    e[a] != p3[a] && (p3[a] = e[a], addMotorPromise(r, i + 1, e[a]))
                }
            }
        }

        function addMotorPromise(e, t, n) {
            var r = [t, 1, 1, n], i = e.getCommand(wedo2.SET_MOTORS);
            _promisedChain.addPromise(function () {
                return i.execute.apply(i, r)
            })
        }

        function getMotorSpeedByte(e, t, n) {
            return e ? (t = Math.min(Math.max(t, 0), 100), t = Math.floor(t), 0 > n && (t = 256 - t & 255), t) : 127
        }

        var p1 = 150, CR = "\n", p2 = [3, 3, 3], p3 = [0, 0, 0, 0, 0, 0];
        const one = 1, two = 2, three = 3, four = 4;
        var _promisedChain, _reduce;

        require(["utilsLib/promise-chain", "utilsLib/promise-utils", "utilsLib/data-utils"], function (promiseChain, promiseUtils, dataUtils) {
            _promisedChain = promiseChain, _reduce = promiseUtils.reduce, bleDataUtils = dataUtils.dataUtils
        });
        var wedo2,
            colorNames = ["off", "pink", "purple", "blue", "sky blue", "teal", "green", "yellow", "orange", "red", "white"],
            speedValues = [
                {speed: 100, dir: 0, on: !1},
                {speed: 100, dir: 0, on: !1},
                {speed: 100, dir: 0, on: !1},
                {speed: 100, dir: 0, on: !1},
                {speed: 100, dir: 0, on: !1},
                {speed: 100, dir: 0, on: !1}],
            motorNames = ["motor A", "motor B", "motor C", "motor D", "motor E", "motor F"],
            wedos = ["wedo 1", "wedo 2", "wedo 3"],
            deviceList = [];

        require(["wedo2/wedo2-vendor"],
            function (wedo2Vendor) {
                wedo2 = wedo2Vendor.WeDo2
            }),
            ble.connected.add(function (devHandler, device) {
                device.handlerId == wedo2Const.NAME && (deviceList.push(device), null == C && startPoll())
            }),
            ble.disconnected.add(function (e, n) {
                -1 != deviceList.indexOf(n) && (dataUtils.deleteValue(deviceList, n), 0 == deviceList.length && stopPoll())
            });
        var C, self = {};
        return self.polled = new Signal,
            self.getConnectionCount = function () {
                return deviceList.length
            },
            self.getSensorValue = function (wedoName, sensorId) {
                // console.log("SensorID: ",sensorId); // BERNARDO
                // console.log("Sensors: ",self.getSensorValues()); // BERNARDO
                ix = getWeDoIndex(wedoName);
                var _handler = deviceList[ix].handler;
                return _handler.getSensorValue(sensorId.charCodeAt(0) - 65 - 2 * ix);
            },
                self.getSensorValues = function () {
                for (var text = "", t = 0, n = 0, max = deviceList.length, devNum = 0; max > devNum; devNum++) {
                    var _handler = deviceList[devNum].handler;
                    if (!_handler) return text;
                    for (var sensorNum = 0; 2 > sensorNum; sensorNum++) {
                        var c = 2 * devNum + sensorNum,
                            sensorChar = String.fromCharCode(65 + c),
                            value = _handler.getSensorValue(sensorNum);
                        switch (_handler.getSensorType(sensorNum)) {
                            case"tilt":
                                n = value;
                                break;
                            case"distance":
                                t = value;
                                break;
                            case"motor":
                                value = speedValues[c].on ? speedValues[c].speed : 0
                        }
                        var m = "sensor" + sensorChar + " " + value + CR;
                        text += m
                    }
                    value = _handler.getSensorValue(6),
                        m = "button" + (devNum + 1) + " " + (1 == value ? "true" : "false") + CR,
                        text += m,
                        value = _handler.getSensorValue(2),
                        m = "current" + (devNum + 1) + " " + value + CR,
                        m = m.replace("mA", ""), text += m,
                        value = _handler.getSensorValue(3),
                        m = "voltage" + (devNum + 1) + " " + value + CR,
                        m = m.replace("V", ""), text += m
                }
                switch (text += "distance " + t + CR, text += "tilt " + n + CR, n) {
                    case one:
                        text += "isTilted/any true" + CR, text += "isTilted/up false" + CR, text += "isTilted/down true" + CR, text += "isTilted/left false" + CR, text += "isTilted/right false" + CR;
                        break;
                    case two:
                        text += "isTilted/any true" + CR, text += "isTilted/up false" + CR, text += "isTilted/down false" + CR, text += "isTilted/left false" + CR, text += "isTilted/right true" + CR;
                        break;
                    case three:
                        text += "isTilted/any true" + CR, text += "isTilted/up true" + CR, text += "isTilted/down false" + CR, text += "isTilted/left false" + CR, text += "isTilted/right false" + CR;
                        break;
                    case four:
                        text += "isTilted/any true" + CR, text += "isTilted/up false" + CR, text += "isTilted/down false" + CR, text += "isTilted/left true" + CR, text += "isTilted/right false" + CR;
                        break;
                    default:
                        text += "isTilted/any false" + CR, text += "isTilted/up false" + CR, text += "isTilted/down false" + CR, text += "isTilted/left false" + CR, text += "isTilted/right false" + CR
                }
                return text
            },
            self.doCommand = function (cmd, params) {
                switch (cmd) {
                    case"reset_all":
                        setMotorOn("everything", !1);
                        break;
                    case"motor":
                        setMotorOn(params[0], params[1]);
                        break;
                    case"motorOnFor":
                        setMotorOn(params[1], !0), scratchUtils.doAfterDelay(wedo2Const.NAME, params[0], function () {
                            setMotorOn(params[1], !1)
                        }, parseFloat(params[2]));
                        break;
                    case"motorOn":
                        setMotorOn(params[0], !0);
                        break;
                    case"motorOff":
                        setMotorOn(params[0], !1);
                        break;
                    case"startMotorPower":
                        var n = params[0], a = params[1], o = getMotors(n);
                        o.forEach(function (e) {
                            e.on = !0, e.speed = a
                        }), setMotors();
                        break;
                    case"setMotorDirection":
                        var s, n = params[0], c = params[1];
                        switch (c) {
                            case"this way":
                                s = 1;
                                break;
                            case"that way":
                                s = -1;
                                break;
                            case"reverse":
                            case"other way":
                                s = 0;
                                break;
                            default:
                                return
                        }
                        var o = getMotors(n);
                        o.forEach(function (e) {
                            e.on = !0, -1 == s || 1 == s ? e.dir = s : 0 == s && (e.dir = -e.dir)
                        }), setMotors();
                        break;
                    case"setLight":
                    case"setLED":
                        var d = params[0], l = params[1];
                        null == l && (l = "WeDo 1"), setLed(l, d);
                        break;
                    case"playSound":
                        var u = params[1].replace("%23", "#"), f = params[2], h = parseFloat(params[3]), l = params[4];
                        null == l && (l = "WeDo 1");
                        var p = 0;
                        switch (u) {
                            case"C":
                                p = 16.351;
                                break;
                            case"C#":
                            case"Db":
                                p = 17.324;
                                break;
                            case"D":
                                p = 18.354;
                                break;
                            case"D#":
                            case"Eb":
                                p = 19.445;
                                break;
                            case"E":
                                p = 20.601;
                                break;
                            case"F":
                                p = 21.827;
                                break;
                            case"F#":
                            case"Gb":
                                p = 23.124;
                                break;
                            case"G":
                                p = 24.499;
                                break;
                            case"G#":
                            case"Ab":
                                p = 25.956;
                                break;
                            case"A":
                                p = 27.5;
                                break;
                            case"A#":
                            case"Bb":
                                p = 29.135;
                                break;
                            case"B":
                                p = 30.868
                        }
                        var m = 0;
                        switch (f) {
                            case"0":
                                m = Math.floor(1 * p);
                                break;
                            case"1":
                                m = Math.floor(2 * p);
                                break;
                            case"2":
                                m = Math.floor(4 * p);
                                break;
                            case"3":
                                m = Math.floor(8 * p);
                                break;
                            case"4":
                                m = Math.floor(16 * p);
                                break;
                            case"5":
                                m = Math.floor(32 * p);
                                break;
                            case"6":
                                m = Math.floor(64 * p);
                                break;
                            case"7":
                                m = Math.floor(128 * p);
                                break;
                            case"8":
                                m = Math.floor(256 * p)
                        }
                        setSoundOn(l, m, 1e3 * h), scratchUtils.doAfterDelay(wedo2Const.NAME, params[0], function () {
                            setSoundOff(l)
                        }, h);
                        break;
                    case"playNote":
                        var m = parseFloat(params[1]), h = parseFloat(params[2]), l = params[3];
                        null == l && (l = "WeDo 1"), setSoundOn(l, m, 1e3 * h), scratchUtils.doAfterDelay(wedo2Const.NAME, params[0], function () {
                            setSoundOff(l)
                        }, h);
                        break;
                    case"writeName":
                        var v = params[0], l = params[1];
                        null == l && (l = "WeDo 1"), v && writeName(l, decodeURIComponent(v));
                        break;
                    default:
                        console.warn("doCommand", cmd, "not recognised")
                }
            },
            wedo2Http.setDeviceHandler(self),
            self
    })