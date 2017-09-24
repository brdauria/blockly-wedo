(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        define(factory);
    } else {
        module.exports = factory();
    }
}(this, function() {

    var isNode = typeof Buffer !== "undefined";

    if (isNode)
    {
        return {
            makeBuffer: function(length) {
                return new Buffer(length);
            },
            isBuffer: function(obj) {
                return Buffer.isBuffer(obj);
            },
            copy: function(sourceBuffer, targetBuffer, targetStart, sourceStart, sourceEnd) {
                sourceBuffer.copy(targetBuffer, targetStart, sourceStart, sourceEnd);
            },
            readUInt8: function(arr, offset) {
                return arr.readUInt8(offset);
            },
            readInt8: function(arr, offset) {
                return arr.readInt8(offset);
            },
            readUInt32LE: function(arr, offset) {
                return arr.readUInt32LE(offset);
            },
            readUInt16LE: function(arr, offset) {
                return arr.readUInt16LE(offset);
            },
            getByteArray: function(o) {
                return new Uint8Array(o);
            },
            concatBuffers: function(a, b, len) {
                if (typeof len === "undefined") len = a.byteLength + b.byteLength;
                return Buffer.concat([a,b], len);
            },
            writeUInt32LE: function(arr, value, offset) {
                arr.writeUInt32LE(value, offset);
            },
            writeUInt16LE: function(arr, value, offset) {
                arr.writeUInt16LE(value, offset);
            },
            writeUInt8: function(arr, value, offset) {
                arr.writeUInt8(value, offset);
            }

        }
    } else {
        return {
            makeBuffer: function(length) {
                return new Uint8Array(length)
            },
            isBuffer: function(obj) {
                return obj.byteLength !== undefined;
            },
            copy: function(sourceBuffer, targetBuffer, targetStart, sourceStart, sourceEnd) {
                var slice = sourceBuffer.slice(sourceStart, sourceEnd);
                targetBuffer.set(slice, targetStart);
            },
            readUInt8: function(arr, offset) {
                return new DataView(arr.buffer).getUint8(offset);
            },
            readInt8: function(arr, offset) {
                return new DataView(arr.buffer).getInt8(offset);
            },
            readUInt32LE: function(arr, offset) {
                return new DataView(arr.buffer).getUint32(offset, true);
            },
            readUInt16LE: function(arr, offset) {
                return new DataView(arr.buffer).getUint16(offset, true);
            },
            getByteArray: function(o) {
                return o;
            },
            concatBuffers: function(a, b, len) {
                if (typeof len === "undefined") len = a.byteLength + b.byteLength;
                var c = new Uint8Array(len);
                c.set(new Uint8Array(a),0);
                c.set(new Uint8Array(b), a.byteLength);
                return c;
            },
            writeUInt32LE: function(arr, value, offset) {
                new DataView(arr.buffer).setUint32(offset, value, true);
            },
            writeUInt16LE: function(arr, value, offset) {
                new DataView(arr.buffer).setUint16(offset, value, true);
            },
            writeUInt8: function(arr, value, offset) {
                new DataView(arr.buffer).setUint8(offset, value);
            }
        }
    }

}));