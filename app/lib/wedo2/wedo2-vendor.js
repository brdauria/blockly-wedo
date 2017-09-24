define(["require", "exports",
        "device-manager/device-definition",
        "utilsLib/promise-chain", "utilsLib/data-utils", "utilsLib/extends-utils"],
    function (Require, Exports, deviceDefinition, promiseChain, dataUtils, extendsUtils) {
        var a = {};
        a[0] = "1800",
            a[1] = "1801",
            a[2] = "00001523-1212-efde-1523-785feabcd123",
            a[3] = "00004f0e-1212-efde-1523-785feabcd123",
            a[4] = "180a",
            a[5] = "180f";
        var wedo2_battery = "WEDO2_BATTERY",
            wedo2_btnChar = "WEDO2_BUTTON_CHAR",
            wedo2_inpCmd = "WEDO2_INPUT_COMMAND",
            wedo2_outCmd = "WEDO2_OUTPUT_COMMAND",
            wedo2_portTypeChar = "WEDO2_PORT_TYPE_CHAR",
            wedo2_sensorValue = "WEDO2_SENSOR_VALUE",
            wedo2_writeName = "WEDO2_WRITE_NAME",
            none = "none",
            motor = "motor",
            distance = "distance",
            tilt = "tilt",
            generic = "generic",
            unknown = "unknown",
            current = "current",
            voltage = "voltage",
            piezo = "piezo",
            rgb = "rgb",
            btn = "button",
            battery = "battery",
            valuesArray = {};
        valuesArray[0] = none, valuesArray[1] = motor, valuesArray[34] = tilt, valuesArray[35] = distance, valuesArray[36] = generic, valuesArray[21] = current, valuesArray[20] = voltage, valuesArray[22] = piezo, valuesArray[23] = rgb;
        var D = 9, A = 7, x = 5, I = 2, O = 4, k = 1, R = 6, L = 7, P = 1, N = 0, M = 0, B = 0, U = 0, F = 2,
            self = function (e) {
                function WeDo2() {
                    e.apply(this, arguments)
                }

                return extendsUtils(WeDo2, e),
                    WeDo2.prototype.init = function (t, n) {
                        var _this = this;
                        e.prototype.init.call(this, t, n),
                        this.resetState(),
                            this.addCharacteristicDefinition({
                                name: wedo2_btnChar,
                                uuidStr: "00001526-1212-efde-1523-785feabcd123",
                                notifcationHandler: function (e) {
                                    if (1 == e.length) {
                                        var t = _this.state[R];
                                        t.value;
                                        t.value = 1 == e[0]
                                    }
                                }
                            }), this.addCharacteristicDefinition({
                            name: wedo2_battery, uuidStr: "2a19",
                            notifcationHandler: function (e) {
                                if (1 == e.length) {
                                    var t = _this.state[L];
                                    t.value = e[0]
                                }
                            }
                        }), this.addCharacteristicDefinition({
                            name: wedo2_inpCmd,
                            uuidStr: "00001563-1212-efde-1523-785feabcd123"
                        }), this.addCharacteristicDefinition({
                            name: wedo2_outCmd,
                            uuidStr: "00001565-1212-efde-1523-785feabcd123"
                        }), this.addCharacteristicDefinition({
                            name: wedo2_portTypeChar,
                            uuidStr: "00001527-1212-efde-1523-785feabcd123",
                            notifcationHandler: function (e) {
                                var t = e[0] - 1, n = _this.state[t];
                                if (n) {
                                    var i = n.type, a = unknown;
                                    2 == e.length ? 0 == e[1] && (console.log("empty", e),
                                        n.type = none,
                                        n.typeNum = 0,
                                        n.value = 0) : 12 == e.length && 1 == e[1] && (a = valuesArray[e[3]], a != i && (n.type = a, n.typeNum = e[3], _this.sendCommands(t)))
                                }
                            }
                        }), this.addCharacteristicDefinition({
                            name: wedo2_sensorValue,
                            uuidStr: "00001560-1212-efde-1523-785feabcd123",
                            notifcationHandler: function (e) {
                                if (6 == e.length) {
                                    var t = e[1] - 1, n = new Float32Array(e.slice(2, 6).buffer), a = n[0],
                                        o = _this.state[t],
                                        s = o.type;
                                    if (s == tilt) switch (a) {
                                        case x:
                                            a = I;
                                            break;
                                        case A:
                                            a = O;
                                            break;
                                        case D:
                                            a = k
                                    } else s == distance ? a *= 10 : s == voltage ? a = dataUtils.dataUtils.roundToPlaces(a / 1e3, 2) + "V" : s == current && (a = Math.round(a) + "mA");
                                    o.value = a
                                }
                            }
                        }), this.addCharacteristicDefinition({
                            name: wedo2_writeName,
                            uuidStr: "00001524-1212-efde-1523-785feabcd123"
                        }), this.addCommand({
                            name: WeDo2.SET_NAME, execute: function () {
                                for (var e = [], t = 0; t < arguments.length; t++) e[t - 0] = arguments[t];
                                return _this.writeCharacteristicValue(wedo2_writeName, e)
                            }
                        }), this.addCommand({
                            name: WeDo2.SET_LED, execute: function (e) {
                                return _this.setLED(e)
                            }
                        }), this.addCommand({
                            name: WeDo2.LED_RED, test: !0, execute: function () {
                                return _this.setLED(9)
                            }
                        }), this.addCommand({
                            name: WeDo2.LED_BLUE, test: !0, execute: function () {
                                return _this.setLED(3)
                            }
                        }), this.addCommand({
                            name: WeDo2.PLAY_SOUND, execute: function (e, t) {
                                var n = Math.floor(e / 256), i = e % 256, a = Math.floor(t / 256), o = t % 256;
                                return _this.writeCharacteristicValue(o, [5, 2, 4, i, n, o, a])
                            }
                        }), this.addCommand({
                            name: WeDo2.SET_MOTORS, execute: function (e, t, n, i) {
                                return _this.writeCharacteristicValue(wedo2_outCmd, [e, t, n, i])
                            }
                        }), this.addCommand({
                            name: WeDo2.MOTORS_ON, test: !0, execute: function () {
                                return _this.writeCharacteristicValue(wedo2_outCmd, [1, 1, 1, 100]).then(function () {
                                    return _this.writeCharacteristicValue(wedo2_outCmd, [2, 1, 1, 100])
                                })
                            }
                        }), this.addCommand({
                            name: WeDo2.MOTORS_OFF, test: !0, execute: function () {
                                return _this.writeCharacteristicValue(wedo2_outCmd, [1, 1, 1, 127]).then(function () {
                                    return _this.writeCharacteristicValue(wedo2_outCmd, [2, 1, 1, 127])
                                })
                            }
                        }), this.addCommand({
                            name: WeDo2.RESET, execute: function () {
                                return _this.writeCharacteristicValue(wedo2_outCmd, [1, 1, 1, 127]).then(function () {
                                    return _this.writeCharacteristicValue(wedo2_outCmd, [2, 1, 1, 127])
                                })
                            }
                        })
                    },
                    WeDo2.prototype.setLED = function (e) {
                        return this.writeCharacteristicValue(wedo2_outCmd, [6, 4, 1, e])
                    },
                    WeDo2.prototype.sendCommands = function (e) {
                        var t = this, n = this.state[e], i = n.type;
                        if (i != none) {
                            var a = 0, o = 0, s = 1, d = F;
                            if (i == tilt) a = n.typeNum, o = P; else if (i == distance) o = N; else if (i == rgb) o = M, d = U; else {
                                if (i != current && i != voltage) return;
                                o = B, s = 30
                            }
                            promiseChain.addPromise(function () {
                                return t.writeCharacteristicValue(wedo2_inpCmd, [1, 2, e + 1, a, o, s, 0, 0, 0, d, 1]).then(function () {
                                    return t.writeCharacteristicValue(wedo2_inpCmd, [0, 1, e + 1])
                                })
                            })
                        }
                    },
                    WeDo2.prototype.notifyDisconnected = function (e) {
                        this.resetState()
                    },
                    WeDo2.prototype.resetState = function () {
                        var e = this.state;
                        e[0] = {type: none, value: 0, typeNum: 0}, e[1] = {type: none, value: 0, typeNum: 0}, e[2] = {
                            type: none,
                            value: 0,
                            typeNum: 0
                        }, e[3] = {type: none, value: 0, typeNum: 0}, e[4] = {
                            type: none,
                            value: 0,
                            typeNum: 0
                        }, e[5] = {
                            type: none,
                            value: 0,
                            typeNum: 0
                        }, e[6] = {type: btn, value: 0, typeNum: 0}, e[7] = {type: battery, value: 100, typeNum: 0}
                    },
                    WeDo2.prototype.getSensorValue = function (e) {
                        var t = this.state[e];
                        return t ? t.value : 0
                    },
                    WeDo2.prototype.getSensorType = function (e) {
                        var t = this.state[e];
                        return t ? t.type : none
                    },
                    WeDo2.ID = "wedo2",
                    WeDo2.SET_NAME = "SET_NAME",
                    WeDo2.SET_LED = "SET_LED",
                    WeDo2.SET_MOTORS = "SET_MOTORS",
                    WeDo2.LED_RED = "LED_RED",
                    WeDo2.LED_BLUE = "LED_BLUE",
                    WeDo2.PLAY_SOUND = "PLAY_SOUND",
                    WeDo2.MOTORS_ON = "MOTORS_ON",
                    WeDo2.MOTORS_OFF = "MOTORS_OFF",
                    WeDo2.RESET = "RESET",
                    WeDo2
            }(deviceDefinition.DeviceDefinition);
        Exports.WeDo2 = self
    })