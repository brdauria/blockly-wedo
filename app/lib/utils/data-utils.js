define(["require", "exports"], function (Require, Exports) {
    var n, r = /0000([A-Fa-f0-9]{4})-0000-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}/;
    !function (self) {
        function convertUUID(data) {
            return data.replace(r, "$1")
        }

        function ua2hex(string) {
            var result = "";
            return string.forEach(function (char) {
                result += "0".concat(char.toString(16)).substr(-2)
            }), result
        }

        function ua2text(string) {
            for (var result = "", n = 0; n < string.length; n++) result += String.fromCharCode(string[n]);
            return result
        }

        function reverseToHex(string) {
            return this.ua2hex(string.slice().reverse())
        }

        function text2array(string) {
            for (var t = [], n = 0; n < string.length; n++) t.push(string.charCodeAt(n));
            return t
        }

        function removeFromArray(array, item) {
            for (; ;) {
                var n = array.indexOf(item);
                if (!(n > -1)) break;
                array.splice(n, 1)
            }
        }

        function roundToPlaces(num, prec) {
            var n = Math.pow(10, prec);
            return Math.round(num * n) / n
        }

        function mixin(dest, source) {
            for (var n in source) dest[n] = source[n]
        }

        function insertArrayInto (e, t, n) {
            e.splice.apply(e, [n, 0].concat(t))
        }
        
        function deleteValue(e, t) {
            for (; ;) {
                var n = e.indexOf(t);
                if (-1 == n) return;
                e.splice(n, 1)
            }
        }
        
        function appendBuffer(e, t) {
            var n = new Uint8Array(e.byteLength + t.byteLength);
            return n.set(new Uint8Array(e), 0), n.set(new Uint8Array(t), e.byteLength), n.buffer
        }
        
        function base64ToArrayBuffer(e) {
            for (var t = window.atob(e.replace(/\s/g, "")), n = t.length, r = new Uint8Array(n), i = 0; n > i; i++) r[i] = t.charCodeAt(i);
            return r.buffer
        }
        
        function flatten(e) {
            return e.reduce(function (e, t) {
                return e.concat(t)
            }, [])
        }

        self.convertUUID = convertUUID,
            self.ua2hex = ua2hex,
            self.ua2text = ua2text,
            self.reverseToHex = reverseToHex,
            self.text2array = text2array,
            self.removeFromArray = removeFromArray,
            self.roundToPlaces = roundToPlaces,
            self.mixin = mixin,
            self.insertArrayInto = insertArrayInto,
            self.deleteValue = deleteValue,
            self.appendBuffer = appendBuffer,
            self.base64ToArrayBuffer = base64ToArrayBuffer,
            self.flatten = flatten
            
    }(n = Exports.dataUtils || (Exports.dataUtils = {}))
})