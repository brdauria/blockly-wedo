define(["bglibLib/bglib-errors", "buffer", "bleadvertise"], function (e, t, n) {
    function _bgEventSystemBoot(e) {
        this.major = t.readUInt16LE(e, 0), this.minor = t.readUInt16LE(e, 2), this.patch = t.readUInt16LE(e, 4), this.build = t.readUInt16LE(e, 6), this.ll_version = t.readUInt16LE(e, 8), this.protocol_version = t.readUInt8(e, 10), this.hw = t.readUInt8(e, 11)
    }

    function _bgEventSystemEndpointWatermarkRx(e) {
        this.endpoint = t.readUInt8(e, 0), this.data = t.readUInt8(e, 1)
    }

    function _bgEventSystemEndpointWatermarkTx(e) {
        this.endpoint = t.readUInt8(e, 0), this.data = t.readUInt8(e, 1)
    }

    function _bgEventSystemScriptFailure(n) {
        this.address = t.readUInt16LE(n, 0), this.reason = e.getErrorFromCode(t.readUInt16LE(n, 2))
    }

    function _bgEventSystemNoLicenseKey(e) {
    }

    function _bgEventSystemProtocolError(n) {
        this.reason = e.getErrorFromCode(t.readUInt16LE(n, 0))
    }

    function _bgEventFlashPSKey(e) {
        this.key = t.readUInt16LE(e, 0), this.value = e.slice(3, e[2])
    }

    function _bgEventAttributesValue(e) {
        this.connection = t.readUInt8(e, 0), this.reason = t.readUInt8(e, 1), this.handle = t.readUInt16LE(e, 2), this.offset = t.readUInt16LE(e, 4), this.value = e.slice(7, 7 + e[6])
    }

    function _bgEventAttributesUserReadRequest(e) {
        this.connection = t.readUInt8(e, 0), this.handle = t.readUInt16LE(e, 1), this.offset = t.readUInt16LE(e, 3), this.maxsize = t.readUInt8(e, 5)
    }

    function _bgEventAtributesStatus(e) {
        this.handle = t.readUInt16LE(e, 0), this.flags = t.readUInt8(e, 2)
    }

    function _bgEventConnectionStatus(e) {
        this.connection = t.readUInt8(e, 0), this.flags = t.readUInt8(e, 1), this.address = e.slice(2, 8), this.address_type = t.readUInt8(e, 8), this.conn_interval = t.readUInt16LE(e, 9), this.timeout = t.readUInt16LE(e, 11), this.latency = t.readUInt16LE(e, 13), this.bonding = t.readUInt8(e, 15)
    }

    function _bgEventConnectionVersionInd(e) {
        this.connection = t.readUInt8(e, 0), this.version_nr = t.readUInt8(e, 1), this.comp_id = t.readUInt16LE(e, 2), this.sub_vers_nr = t.readUInt16LE(e, 4)
    }

    function _bgEventConnectionFeatureInd(e) {
        this.connection = t.readUInt8(e, 0), this.features = e.slice(1, e.length)
    }

    function _bgEventConnectionDisconnected(n) {
        this.connection = t.readUInt8(n, 0), this.reason = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }

    function _bgEventAttClientIndicated(e) {
        this.connection = t.readUInt8(e, 0), this.attrhandle = t.readUInt16LE(e, 1)
    }

    function _bgEventAttClientProcedureCompleted(n) {
        this.connection = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1)), this.chrhandle = t.readUInt16LE(n, 3)
    }

    function _bgEventAttClientGroupFound(e) {
        this.connection = t.readUInt8(e, 0), this.start = t.readUInt16LE(e, 1), this.end = t.readUInt16LE(e, 3), this.uuid = e.slice(6, 6 + e[5])
    }

    function _bgEventAttClientFindInformationFound(e) {
        this.connection = t.readUInt8(e, 0), this.chrhandle = t.readUInt16LE(e, 1), this.uuid = e.slice(4, 4 + e[3])
    }

    function _bgEventAttClientAttributeValue(e) {
        this.connection = t.readUInt8(e, 0), this.atthandle = t.readUInt16LE(e, 1), this.type = t.readUInt8(e, 3), this.value = e.slice(5, 5 + e[4])
    }

    function _bgEventAttClientReadMultipleResponse(e) {
        this.connection = t.readUInt8(e, 0), this.handles = e.slice(2, 2 + e[1])
    }

    function _bgEventSMBondingFail(n) {
        this.handle = t.readUInt8(n, 0), this.result = e.getErrorFromCode(t.readUInt16LE(n, 1))
    }

    function _bgEventSMPasskeyDisplay(e) {
        this.handle = t.readUInt8(e, 0), this.passkey = t.readUInt32LE(e, 1)
    }

    function _bgEventSMPasskeyRequest(e) {
        this.handle = t.readUInt8(e, 0)
    }

    function _bgEventSMBondStatus(e) {
        this.bond = t.readUInt8(e, 0), this.keysize = t.readUInt8(e, 1), this.mitm = t.readUInt8(e, 2), this.keys = t.readUInt8(e, 3)
    }

    function _bgEventGAPScanResponse(e) {
        this.rssi = t.readInt8(e, 0), this.packet_type = t.readUInt8(e, 1), this.sender = e.slice(2, 8), this.address_type = t.readUInt8(e, 8), this.bond = t.readUInt8(e, 9), this.data = n.parseBE(e.slice(10, e.length))
    }

    function _bgEventHWIOPortStatus(e) {
        this.timestamp = t.readUInt32LE(e, 0), this.port = t.readUInt8(e, 4), this.irq = t.readUInt8(e, 5), this.state = t.readInt8(e, 6)
    }

    function _bgEventhWSoftTimer(e) {
        this.handle = t.readUint8(e, 0)
    }

    function _bgEventHWADCResult(e) {
        this.input = t.readUInt8(e, 0), this.value = t.readInt16LE(e, 1)
    }

    function _bgEventDFUBoot(e) {
        this.version = t.readUInt32LE(e, 0)
    }

    var r = {
        0: [_bgEventSystemBoot, null, _bgEventSystemEndpointWatermarkRx, _bgEventSystemEndpointWatermarkTx, _bgEventSystemScriptFailure, _bgEventSystemNoLicenseKey, _bgEventSystemProtocolError],
        1: [_bgEventFlashPSKey],
        2: [_bgEventAttributesValue, _bgEventAttributesUserReadRequest, _bgEventAtributesStatus],
        3: [_bgEventConnectionStatus, _bgEventConnectionVersionInd, _bgEventConnectionFeatureInd, null, _bgEventConnectionDisconnected],
        4: [_bgEventAttClientIndicated, _bgEventAttClientProcedureCompleted, _bgEventAttClientGroupFound, null, _bgEventAttClientFindInformationFound, _bgEventAttClientAttributeValue, _bgEventAttClientReadMultipleResponse],
        5: [null, _bgEventSMBondingFail, _bgEventSMPasskeyDisplay, _bgEventSMPasskeyRequest, _bgEventSMBondStatus],
        6: [_bgEventGAPScanResponse],
        7: [_bgEventHWIOPortStatus, _bgEventhWSoftTimer, _bgEventHWADCResult],
        8: null,
        9: [_bgEventDFUBoot]
    };
    return {Events: r}
})