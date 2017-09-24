define([
    "./wedo-usb"
    , "./wedo-names"
    , "../../block-editor/block-audio"
    , "wedo2/wedo2-ble" // BERNARDO
], function (usb
    , names
    , blocklyAudio
    , wedo2 // BERNARDO
) {

    function outputName(type, slot) {
        return type + " " + slot;
    }

    var api = {
        wedo: {
            reset: function () {
                usb.resetAll();
                blocklyAudio.stop();
                // chrome.tts.stop();
            },
            getInput: function (slot) {
                // return usb.getSensorAt(slot);
                return wedo2.getSensorValue(1,slot);
            },
            get: function (slot) {
                return usb.getSensorAt(slot);
            },
            set: function (slot, state) {
                usb.setAt(slot, state);
            },
            setMotor: function (slot, state) {
                //usb.setAt(slot, state);
                wedo2.doCommand("motor", [slot, state]); // BERNARDO
            },
            setPower: function (slot, value) {
                usb.powerAt(slot, parseFloat(value));
            },
            setDirection: function (slot, value) {
                // usb.directionAt(slot, value);
                wedo2.doCommand("setMotorDirection", [slot, value]); // BERNARDO
            },
            setLED: function (wedoSlot, color) {
                //TODO
                wedo2.doCommand("setLED", [color, wedoSlot]); // BERNARDO
            },
            playNote: function (wedoSlot, note, octave, time) {
                //TODO
            },
            getButton: function (wedoSlot) {
                //TODO return usb.getSensorAt(slot);
            },
            playFile: function (file) {
                var path = "../../res/MP3/" + file; // + ".mp3";
                blocklyAudio.stop();
                blocklyAudio.playFile(path);
            },
            playStop: function () {
                blocklyAudio.stop();
            }
        }
    }

    return api;


});
