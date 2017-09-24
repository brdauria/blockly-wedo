// Copyright 2014 Technical Machine, Inc. See the COPYRIGHT
// file at the top-level directory of this distribution.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

define(function (require, exports, module) {

var PacketParser = require('bleadvertiseLib/parser');
var PacketBuilder = require('bleadvertiseLib/serializer');

module.exports.parse = PacketParser.parse;
module.exports.parseLE = PacketParser.parseLE;
module.exports.parseBE = PacketParser.parseBE;
module.exports.serialize = PacketBuilder.serialize;

// For testing only
module.exports.split = PacketParser.split;
})