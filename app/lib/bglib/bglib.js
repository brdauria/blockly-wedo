define(["bglibLib/bglib-responses", "bglibLib/bglib-events", "buffer"], function (e, t, buffer) {
    function Packet(e, t, n, r, i, a) {
        this.mType = e, this.tType = t, this.payloadHighBits = i.length >> 8, this.payloadLowBits = 255 & i.length, this.cClass = n, this.cID = r, this.payload = i, this.packetMode = a, this.callback = null
    }

    function bglib() {
        this.resetParser(), this.packetMode = !1
    }

    var r = 0, i = {Command: 0, Response: 0, Event: 128}, a = {Bluetooth: 0, WiFi: 8}, o = {
        System: 0,
        PersistentStore: 1,
        AttributeDatabase: 2,
        Connection: 3,
        AttributeClient: 4,
        SecurityManager: 5,
        GenericAccessProfile: 6,
        Hardware: 7,
        Test: 8,
        DFU: 9
    }, s = {
        System_Reset: 0,
        System_Hello: 1,
        System_Address_Get: 2,
        System_Reg_Write: 3,
        System_Reg_Read: 4,
        System_Get_Counters: 5,
        System_Get_Connections: 6,
        System_Read_Memory: 7,
        System_Get_Info: 8,
        System_Endpoint_Tx: 9,
        System_Whitelist_Append: 10,
        System_Whitelist_Remove: 11,
        System_Whitelist_Clear: 12,
        System_Endpoint_Rx: 13,
        System_Set_Watermarks: 14,
        Flash_PS_Defrag: 0,
        Flash_PS_Dump: 1,
        Flash_PS_Erase_All: 2,
        Flash_PS_Save: 3,
        Flash_PS_Load: 4,
        Flash_PS_Erase: 5,
        Flash_Erase_Page: 6,
        Flash_Write_Words: 7,
        Attributes_Write: 0,
        Attributes_Read: 1,
        Attributes_Read_Type: 2,
        Attributes_User_Read_Response: 3,
        Attributes_User_Write_Response: 4,
        Connection_Disconnect: 0,
        Connection_Get_RSSI: 1,
        Connection_Update: 2,
        Connection_Version_Update: 3,
        Connection_Channel_Map_Get: 4,
        Connection_Channel_Map_Set: 5,
        Connection_Features_Get: 6,
        Connection_Get_Status: 7,
        Connection_Raw_Tx: 8,
        Attclient_Find_By_Type_Value: 0,
        Attclient_Read_By_Group_Type: 1,
        Attclient_Read_By_Type: 2,
        Attclient_Find_Information: 3,
        Attclient_Read_By_Handle: 4,
        Attclient_Attribute_Write: 5,
        Attclient_Write_Command: 6,
        Attclient_Indicate_Confirm: 7,
        Attclient_Read_Long: 8,
        Attclient_Prepare_Write: 9,
        Attclient_Execute_Write: 10,
        Attclient_Read_Multiple: 11,
        SM_Encrypt_Start: 0,
        SM_Set_Bondable_Mode: 1,
        SM_Delete_Bonding: 2,
        SM_Set_Parameters: 3,
        SM_Passkey_Entry: 4,
        SM_Get_Bonds: 5,
        SM_Set_OOB_Data: 6,
        GAP_Set_Privacy_Flags: 0,
        GAP_Set_Mode: 1,
        GAP_Discover: 2,
        GAP_Connect_Direct: 3,
        GAP_End_Procedure: 4,
        GAP_Connect_Selective: 5,
        GAP_Set_Filtering: 6,
        GAP_Set_Scan_Parameters: 7,
        GAP_Set_Adv_Parameters: 8,
        GAP_Set_Adv_Data: 9,
        GAP_Set_Directed_Connectable_Mode: 10,
        HW_IO_Port_Config_IRQ: 0,
        HW_Set_Soft_Timer: 1,
        HW_ADC_Read: 2,
        HW_IO_Port_Config_Direction: 3,
        HW_IO_Port_Config_Function: 4,
        HW_IO_Port_Config_Pull: 5,
        HW_IO_Port_Write: 6,
        HW_IO_Port_Read: 7,
        HW_SPI_Config: 8,
        HW_SPI_Transfer: 9,
        HW_I2C_Read: 10,
        HW_I2C_Write: 11,
        HW_Set_Tx_Power: 12,
        HW_Timer_Comparator: 13,
        Test_Phy_Tx: 0,
        Test_Phy_Rx: 1,
        Test_Phy_End: 2,
        Test_Phy_Reset: 3,
        Test_Get_Channel_Map: 4,
        Test_Debug: 5,
        Test_Channel_Mode: 5,
        DFU_Reset: 0,
        DFU_Flash_Set_Address: 1,
        DFU_Flash_Upload: 2,
        DFU_Flash_Upload_Finish: 3
    };
    bglib.prototype.Endpoints = {
        system_endpoint_api: 0,
        system_endpoint_test: 1,
        system_endpoint_script: 2,
        system_endpoint_usb: 3,
        system_endpoint_uart0: 4,
        system_endpoint_uart1: 5
    }, bglib.prototype.AttributeChangeReason = {
        attributes_attribute_change_reason_write_request: 0,
        attributes_attribute_change_reason_write_command: 1,
        attributes_attribute_change_reason_write_request_user: 2
    }, bglib.prototype.AttributeStatusFlags = {
        attributes_attribute_status_flag_notify: 1,
        attributes_attribute_status_flag_indicate: 2
    }, bglib.prototype.ConnectionStatus = {
        connection_connected: 1,
        connection_encrypted: 2,
        connection_completed: 4,
        connection_parameters_change: 8
    }, bglib.prototype.AttributeValueType = {
        attclient_attribute_value_type_read: 0,
        attclient_attribute_value_type_notify: 1,
        attclient_attribute_value_type_indicate: 2,
        attclient_attribute_value_type_read_by_type: 3,
        attclient_attribute_value_type_read_blob: 4,
        attclient_attribute_value_type_indicate_rsp_req: 5
    }, bglib.prototype.BondingKeys = {
        sm_bonding_key_ltk: 1,
        sm_bonding_key_addr_public: 2,
        sm_bonding_key_addr_static: 4,
        sm_bonding_key_irk: 8,
        sm_bonding_key_edivrand: 16,
        sm_bonding_key_csrk: 32,
        sm_bonding_key_masterid: 64
    }, bglib.prototype.SMPIO = {
        sm_io_capability_displayonly: 0,
        sm_io_capability_displayyesno: 1,
        sm_io_capability_keyboardonly: 2,
        sm_io_capability_noinputnooutput: 3,
        sm_io_capability_keyboarddisplay: 4
    }, bglib.prototype.AD_Flags = {
        GAP_AD_FLAG_LIMITED_DISCOVERABLE: 1,
        GAP_AD_FLAG_GENERAL_DISCOVERABLE: 2,
        GAP_AD_FLAG_BREDR_NOT_SUPPORTED: 4,
        GAP_AD_FLAG_SIMULTANEOUS_LEBREDR_CTRL: 16,
        GAP_AD_FLAG_SIMULTANEOUS_LEBREDR_HOST: 32,
        GAP_AD_FLAG_MASK: 31
    }, bglib.prototype.ADTypeFlags = {
        gap_ad_type_none: 0,
        gap_ad_type_flags: 1,
        gap_ad_type_services_16bit_more: 2,
        gap_ad_type_services_16bit_all: 3,
        gap_ad_type_services_32bit_more: 4,
        gap_ad_type_services_32bit_al: 5,
        gap_ad_type_services_128bit_more: 6,
        gap_ad_type_services_128bit_all: 7,
        gap_ad_type_localname_short: 8,
        gap_ad_type_localname_complete: 9,
        gap_ad_type_txpower: 10
    }, bglib.prototype.AdvertistingPolicy = {
        gap_adv_policy_all: 0,
        gap_adv_policy_whitelist_scan: 1,
        gap_adv_policy_whitelist_connect: 2,
        gap_adv_policy_whitelist_all: 3
    }, bglib.prototype.BluetoothAddressTypes = {
        gap_address_type_public: 0,
        gap_address_type_random: 1
    }, bglib.prototype.GAPConnectableMode = {
        gap_non_connectable: 0,
        gap_directed_connectable: 1,
        gap_undirected_connectable: 2,
        gap_scannable_connectable: 3
    }, bglib.prototype.GAPDiscoverableModes = {
        gap_non_discoverable: 0,
        gap_limited_discoverable: 1,
        gap_general_discoverable: 2,
        gap_broadcast: 3,
        gap_user_data: 4,
        gap_enhanced_broadcasting: 128
    }, bglib.prototype.GAPDiscoverMode = {
        gap_discover_limited: 0,
        gap_discover_generic: 1,
        gap_discover_observation: 2
    }, bglib.prototype.SCAN_HEADER_FLAGS = {
        GAP_SCAN_HEADER_ADV_IND: 0,
        GAP_SCAN_HEADER_ADV_DIRECT_IND: 1,
        GAP_SCAN_HEADER_ADV_NONCONN_IND: 2,
        GAP_SCAN_HEADER_SCAN_REQ: 3,
        GAP_SCAN_HEADER_SCAN_RSP: 4,
        GAP_SCAN_HEADER_CONNECT_REQ: 5,
        GAP_SCAN_HEADER_ADV_DISCOVER_IND: 6
    }, bglib.prototype.ScanPolicy = {
        gap_scan_policy_all: 0,
        gap_scan_policy_whitelist: 1
    }, Packet.prototype.getByteArray = function (e) {
        var t, r = 4, i = 0;
        this.packetMode ? (r++, t = buffer.makeBuffer(r), t[i++] = this.payload.length + 4) : t = buffer.makeBuffer(r), t[i++] = this.mType | this.tType | this.payload.length >> 8, t[i++] = 255 & this.payload.length, t[i++] = this.cClass, t[i++] = this.cID;
        var a = buffer.concatBuffers(t, this.payload), o = buffer.getByteArray(a);
        return e && e(o), o
    };
    var c = function (e, t, n) {
        this.packet = e, this.responseType = t, this.response = n
    };
    return bglib.prototype.resetParser = function () {
        this.bgapiRXBuffer = [], this.bgapiRXBufferPos = 0, this.bgapiRXDataLen = 0
    }, bglib.prototype.setPacketMode = function (e) {
        this.packetMode = e
    }, bglib.prototype.parseIncoming = function (n, i) {
        this.reconstructPackets(n, function (n, a) {
            var s = [];
            if (n) return r && console.log("There was an issue constructing a packet..."), i && i(n, null);
            for (var d = 0; d < a.length; d++) {
                var l, u = a[d];
                if (u.cClass < 0 || u.cClass > Object.keys(o).length) r && console.log("Packet with invalid class"), r && console.log("Popping packet with class: ", u.cClass), a.splice(d, 1), d--; else if (128 == (128 & u.mType)) {
                    r && console.log("We have an event!");
                    try {
                        var f;
                        if (!(f = t.Events[u.cClass][u.cID])) throw new Error("No existing event creator for packet of class " + u.cClass + " and command id " + u.cID);
                        l = new f(u.payload), s.push(new c(u, "Event", l))
                    } catch (h) {
                        console.log(h);
                        continue
                    }
                } else if (0 == (128 & u.mType)) {
                    r && console.log("We have a response!"), r && console.log("Class: ", u.cClass, "command", u.cID);
                    try {
                        var p;
                        if (!(p = e.Responses[u.cClass][u.cID])) throw new Error("No existing response creator for packet of class " + u.cClass + " and command id " + u.cID);
                        l = new p(u.payload), s.push(new c(u, "Response", l))
                    } catch (h) {
                        console.log(h);
                        continue
                    }
                } else r && console.log("What's up with this mType?: ", u.mType), i(new Error("Packet Parsing Error"), null)
            }
            return i && i(n, s), s
        })
    }, bglib.prototype.reconstructPackets = function (e, t) {
        e || t(new Error("No bytes passed into packet reconstruction"));
        for (var i = [], a = 0; a < e.length; a++) {
            var o = e[a];
            if (0 == this.bgapiRXBufferPos) {
                if (128 != o && 0 != o) {
                    for (r && console.log("Warning: Packet Frame Issue."); a < e.length;) {
                        if (128 == e[a] || 0 == e[a]) {
                            a--;
                            break
                        }
                        a++
                    }
                    continue
                }
                this.bgapiRXBuffer[this.bgapiRXBufferPos++] = o
            } else if (this.bgapiRXBuffer[this.bgapiRXBufferPos++] = o, 2 == this.bgapiRXBufferPos) this.bgapiRXDataLen = o + ((7 & this.bgapiRXBuffer[0]) << 8); else if (this.bgapiRXBufferPos == this.bgapiRXDataLen + 4) {
                this.bgapiRXBufferPos = 0;
                for (var s = this.bgapiRXBuffer[0], c = this.bgapiRXBuffer[1], d = this.bgapiRXBuffer[2], l = this.bgapiRXBuffer[3], u = c > this.bgapiRXBuffer.length - 4 ? this.bgapiRXBuffer.length - 4 : c, f = buffer.makeBuffer(u), h = 0; u > h; h++) f[h] = this.bgapiRXBuffer[4 + h];
                var p = new Packet(128 & s, 8 & s, d, l, f, this.packetMode);
                p ? (i.push(p), r && console.log("added packet: ", p)) : console.log("Warning, packet creation was obstructed somehow.")
            }
        }
        t(null, i)
    }, bglib.prototype.debugPacket = function (e) {
        for (var t = 0; t < e.length; t++) console.log("Byte at index", t, "is", e[t])
    }, bglib.prototype.getPacket = function (e, t, r) {
        (!r && "function" == typeof t || !t && !r) && (r = t, t = []), this.verifyParams(e.paramCode, t, function (o) {
            var s = buffer.makeBuffer(0);
            if (o) return void(r && r(o, null));
            for (var c = e.paramCode; c;) {
                var d = t.shift();
                switch (15 & c) {
                    case 7:
                    case 6:
                        if (Array.isArray(d)) s = buffer.concatBuffers(s, buffer.makeBuffer(d)); else {
                            var l = buffer.makeBuffer(4);
                            buffer.writeUInt32LE(l, d, 0), s = buffer.concatBuffers(s, l)
                        }
                        break;
                    case 5:
                    case 4:
                        if (Array.isArray(d)) s = buffer.concatBuffers(s, buffer.makeBuffer(d)); else {
                            var l = buffer.makeBuffer(2);
                            buffer.writeUInt16LE(l, d, 0), s = buffer.concatBuffers(s, l)
                        }
                        break;
                    case 3:
                    case 2:
                        var l = buffer.makeBuffer(1);
                        buffer.writeUInt8(l, d, 0), s = buffer.concatBuffers(s, l);
                        break;
                    case 9:
                    case 8:
                        var u;
                        if (buffer.isBuffer(d)) u = d; else {
                            if (!Array.isArray(d) && "string" != typeof d) return r && r(new Error("Invalid parameter type. Should be an Array or string"));
                            u = buffer.makeBuffer(d)
                        }
                        var f = u.length, h = f + e.header.lolen;
                        e.header.payloadLowBits = 255 & h, e.header.payloadHighBits = h >> 8, u = buffer.concatBuffers(buffer.makeBuffer([f]), u, f + 1), s = buffer.concatBuffers(s, u);
                        break;
                    case 10:
                        var p;
                        Array.isArray(d) && (p = buffer.makeBuffer(p)), buffer.isBuffer(d) && (p = d), s = buffer.concatBuffers(s, p);
                        break;
                    case 11:
                        var u;
                        if (buffer.isBuffer(d)) u = d; else {
                            if (!Array.isArray(d) && "string" != typeof d) return r && r(new Error("Invalid parameter type. Should be an Array or string"));
                            u = buffer.makeBuffer(d)
                        }
                        var f = 2 * d.length, h = f + e.header.lolen;
                        e.header.payloadLowBits = 255 & h, e.header.payloadHighBits = h >> 8, u = buffer.concatBuffers(buffer.makeBuffer([f]), buffer.makeBuffer(u), f + 1), s = buffer.concatBuffers(s, u)
                }
                c >>= 4
            }
            var m = new Packet(i.Command, a.Bluetooth, e.header.cls, e.header.command, s, this.packetMode);
            return r && r(null, m), m
        }.bind(this))
    }, bglib.prototype.verifyParams = function (e, t, n) {
        if (!t) return n(e ? new Error("Need to pass in parameters") : null);
        var r = this.numParamsFromCode(e);
        return n(r != t.length ? new Error("Invalid number of parameters passed for method") : null)
    }, bglib.prototype.numParamsFromCode = function (e) {
        for (var t = 0; 15 & e;) t++, e >>= 4;
        return t
    }, bglib.api = {
        systemReset: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.System,
                command: s.System_Reset
            }, paramCode: 2
        },
        systemHello: {
            header: {tType: a.Bluetooth, mType: i.Command, lolen: 0, cls: o.System, command: s.System_Hello},
            paramCode: 0
        },
        systemAddressGet: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 0,
                cls: o.System,
                command: s.System_Address_Get
            }, paramCode: 0
        },
        systemRegisterWrite: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 3,
                cls: o.System,
                command: s.System_Reg_Write
            }, paramCode: 36
        },
        systemRegisterRead: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.System,
                command: s.System_Reg_Read
            }, paramCode: 4
        },
        systemGetCounters: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 0,
                cls: o.System,
                command: s.System_Get_Counters
            }, paramCode: 0
        },
        systemGetConnections: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 0,
                cls: o.System,
                command: s.System_Get_Connections
            }, paramCode: 0
        },
        systemReadMemory: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 5,
                cls: o.System,
                command: s.System_Read_Memory
            }, paramCode: 38
        },
        systemGetInfo: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 0,
                cls: o.System,
                command: s.System_Get_Info
            }, paramCode: 0
        },
        systemEndpointTx: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.System,
                command: s.System_Endpoint_Tx
            }, paramCode: 130
        },
        systemWhitelistAppend: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 7,
                cls: o.System,
                command: s.System_Whitelist_Append
            }, paramCode: 42
        },
        systemWhitelistRemove: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 7,
                cls: o.System,
                command: s.System_Whitelist_Remove
            }, paramCode: 42
        },
        systemWhiteListClear: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 0,
                cls: o.System,
                command: s.System_Whitelist_Clear
            }, paramCode: 0
        },
        systemEndpointRx: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.System,
                command: s.System_Endpoint_Rx
            }, paramCode: 34
        },
        systemEndpointSetWatermarks: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 3,
                cls: o.System,
                command: s.System_Reg_Write
            }, paramCode: 546
        },
        psDefrag: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 0,
                cls: o.PersistentStore,
                command: s.Flash_PS_Defrag
            }, paramCode: 0
        },
        psDump: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 0,
                cls: o.PersistentStore,
                command: s.Flash_PS_Dump
            }, paramCode: 0
        },
        psEraseAll: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 0,
                cls: o.PersistentStore,
                command: s.Flash_PS_Erase_All
            }, paramCode: 0
        },
        psSave: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 3,
                cls: o.PersistentStore,
                command: s.Flash_PS_Save
            }, paramCode: 132
        },
        psLoad: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.PersistentStore,
                command: s.Flash_PS_Load
            }, paramCode: 4
        },
        psErase: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.PersistentStore,
                command: s.Flash_PS_Erase
            }, paramCode: 4
        },
        flashErasePage: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.PersistentStore,
                command: s.Flash_Erase_Page
            }, paramCode: 2
        },
        flashWriteWords: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 3,
                cls: o.PersistentStore,
                command: s.Flash_Write_Words
            }, paramCode: 132
        },
        attributesWrite: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 4,
                cls: o.AttributeDatabase,
                command: s.Attributes_Write
            }, paramCode: 2084
        },
        attributesRead: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 4,
                cls: o.AttributeDatabase,
                command: s.Attributes_Read
            }, paramCode: 68
        },
        attributesReadType: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.AttributeDatabase,
                command: s.Attributes_Read_Type
            }, paramCode: 4
        },
        attributesUserReadResponse: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 3,
                cls: o.AttributeDatabase,
                command: s.Attributes_User_Read_Response
            }, paramCode: 2082
        },
        attributesUserWriteResponse: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.AttributeDatabase,
                command: s.Attributes_User_Write_Response
            }, paramCode: 34
        },
        connectionDisconnect: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.Connection,
                command: s.Connection_Disconnect
            }, paramCode: 2
        },
        connectionGetRSSI: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.Connection,
                command: s.Connection_Get_RSSI
            }, paramCode: 2
        },
        connectionUpdate: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 9,
                cls: o.Connection,
                command: s.Connection_Update
            }, paramCode: 279618
        },
        connectionVersion: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.Connection,
                command: s.Connection_Version_Update
            }, paramCode: 2
        },
        connectionChannelMapGet: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.Connection,
                command: s.Connection_Channel_Map_Get
            }, paramCode: 2
        },
        connectionChannelMapSet: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.Connection,
                command: s.Connection_Channel_Map_Set
            }, paramCode: 130
        },
        connectionFeaturesGet: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.Connection,
                command: s.Connection_Features_Get
            }, paramCode: 2
        },
        connectionGetStatus: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.Connection,
                command: s.Connection_Get_Status
            }, paramCode: 2
        },
        connectionRawTx: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.Connection,
                command: s.Connection_Raw_Tx
            }, paramCode: 130
        },
        attClientFindByTypeValue: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 8,
                cls: o.AttributeClient,
                command: s.Attclient_Find_By_Type_Value
            }, paramCode: 541762
        },
        attClientReadByGroupType: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 6,
                cls: o.AttributeClient,
                command: s.Attclient_Read_By_Group_Type
            }, paramCode: 33858
        },
        attClientReadByType: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 6,
                cls: o.AttributeClient,
                command: s.Attclient_Read_By_Type
            }, paramCode: 33858
        },
        attClientFindInformation: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 5,
                cls: o.AttributeClient,
                command: s.Attclient_Find_Information
            }, paramCode: 1090
        },
        attClientReadByHandle: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 3,
                cls: o.AttributeClient,
                command: s.Attclient_Read_By_Handle
            }, paramCode: 66
        },
        attClientAttributeWrite: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 4,
                cls: o.AttributeClient,
                command: s.Attclient_Attribute_Write
            }, paramCode: 2114
        },
        attClientWriteCommand: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 4,
                cls: o.AttributeClient,
                command: s.Attclient_Write_Command
            }, paramCode: 2114
        },
        attClientIndicateConfirm: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.AttributeClient,
                command: s.Attclient_Indicate_Confirm
            }, paramCode: 2
        },
        attClientReadLong: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 3,
                cls: o.AttributeClient,
                command: s.Attclient_Read_Long
            }, paramCode: 66
        },
        attClientPrepareWrite: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 6,
                cls: o.AttributeClient,
                command: s.Attclient_Prepare_Write
            }, paramCode: 33858
        },
        attClientExecuteWrite: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.AttributeClient,
                command: s.Attclient_Execute_Write
            }, paramCode: 34
        },
        attClientReadMultiple: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.AttributeClient,
                command: s.Attclient_Read_Multiple
            }, paramCode: 130
        },
        smEncryptStart: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.SecurityManager,
                command: s.SM_Encrypt_Start
            }, paramCode: 34
        },
        smSetBondableMode: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.SecurityManager,
                command: s.SM_Set_Bondable_Mode
            }, paramCode: 2
        },
        smDeleteBonding: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.SecurityManager,
                command: s.SM_Delete_Bonding
            }, paramCode: 2
        },
        smSetParameters: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 3,
                cls: o.SecurityManager,
                command: s.SM_Set_Parameters
            }, paramCode: 546
        },
        smPasskeyEntry: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 5,
                cls: o.SecurityManager,
                command: s.SM_Passkey_Entry
            }, paramCode: 98
        },
        smGetBonds: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 0,
                cls: o.SecurityManager,
                command: s.SM_Get_Bonds
            }, paramCode: 0
        },
        smSetOOBData: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.SecurityManager,
                command: s.SM_Set_OOB_Data
            }, paramCode: 8
        },
        gapSetPrivacyFlags: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.GenericAccessProfile,
                command: s.GAP_Set_Privacy_Flags
            }, paramCode: 34
        },
        gapSetMode: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.GenericAccessProfile,
                command: s.GAP_Set_Mode
            }, paramCode: 34
        },
        gapDiscover: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.GenericAccessProfile,
                command: s.GAP_Discover
            }, paramCode: 2
        },
        gapConnectDirect: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 15,
                cls: o.GenericAccessProfile,
                command: s.GAP_Connect_Direct
            }, paramCode: 4473898
        },
        gapEndProcedure: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 0,
                cls: o.GenericAccessProfile,
                command: s.GAP_End_Procedure
            }, paramCode: 0
        },
        gapConnectSelective: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 8,
                cls: o.GenericAccessProfile,
                command: s.GAP_Connect_Selective
            }, paramCode: 17476
        },
        gapSetFiltering: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 3,
                cls: o.GenericAccessProfile,
                command: s.GAP_Set_Filtering
            }, paramCode: 546
        },
        gapSetScanParameters: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 5,
                cls: o.GenericAccessProfile,
                command: s.GAP_Set_Scan_Parameters
            }, paramCode: 580
        },
        gapSetAdvParameters: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 5,
                cls: o.GenericAccessProfile,
                command: s.GAP_Set_Adv_Parameters
            }, paramCode: 580
        },
        gapSetAdvData: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.GenericAccessProfile,
                command: s.GAP_Set_Adv_Data
            }, paramCode: 130
        },
        gapSetDirectedConnectable: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 7,
                cls: o.GenericAccessProfile,
                command: s.GAP_Set_Directed_Connectable_Mode
            }, paramCode: 42
        },
        hwIOPortConfigIRQ: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 3,
                cls: o.Hardware,
                command: s.HW_IO_Port_Config_IRQ
            }, paramCode: 546
        },
        hwSetSoftTimer: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 6,
                cls: o.Hardware,
                command: s.HW_Set_Soft_Timer
            }, paramCode: 550
        },
        hwADCRead: {
            header: {tType: a.Bluetooth, mType: i.Command, lolen: 3, cls: o.Hardware, command: s.HW_ADC_Read},
            paramCode: 546
        },
        hwIOPortConfigDirection: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.Hardware,
                command: s.HW_IO_Port_Config_Direction
            }, paramCode: 34
        },
        hwIOPortConfigFunction: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.Hardware,
                command: s.HW_IO_Port_Config_Function
            }, paramCode: 34
        },
        hwIOPortConfigPull: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 3,
                cls: o.Hardware,
                command: s.HW_IO_Port_Config_Pull
            }, paramCode: 546
        },
        hwIOPortWrite: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 3,
                cls: o.Hardware,
                command: s.HW_IO_Port_Write
            }, paramCode: 546
        },
        hwIOPortRead: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.Hardware,
                command: s.HW_IO_Port_Read
            }, paramCode: 34
        },
        hwSPIConfig: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 6,
                cls: o.Hardware,
                command: s.HW_SPI_Config
            }, paramCode: 2236962
        },
        hwSPITransfer: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 2,
                cls: o.Hardware,
                command: s.HW_SPI_Transfer
            }, paramCode: 2084
        },
        hwI2CRead: {
            header: {tType: a.Bluetooth, mType: i.Command, lolen: 3, cls: o.Hardware, command: s.HW_I2C_Read},
            paramCode: 546
        },
        hwI2CWrite: {
            header: {tType: a.Bluetooth, mType: i.Command, lolen: 3, cls: o.Hardware, command: s.HW_I2C_Write},
            paramCode: 2082
        },
        hwSetTxPower: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.Hardware,
                command: s.HW_Set_Tx_Power
            }, paramCode: 2
        },
        hwTimerComparator: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 5,
                cls: o.Hardware,
                command: s.HW_Timer_Comparator
            }, paramCode: 16930
        },
        testPhyTx: {
            header: {tType: a.Bluetooth, mType: i.Command, lolen: 3, cls: o.Test, command: s.Test_Phy_Tx},
            paramCode: 0
        },
        testPhyRx: {
            header: {tType: a.Bluetooth, mType: i.Command, lolen: 1, cls: o.Test, command: s.Test_Phy_Rx},
            paramCode: 0
        },
        testPhyEnd: {
            header: {tType: a.Bluetooth, mType: i.Command, lolen: 0, cls: o.Test, command: s.Test_Phy_End},
            paramCode: 4
        },
        testPhyReset: {
            header: {tType: a.Bluetooth, mType: i.Command, lolen: 0, cls: o.Test, command: s.Test_Phy_Reset},
            paramCode: 0
        },
        testGetChannelMap: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 0,
                cls: o.Test,
                command: s.Test_Get_Channel_Map
            }, paramCode: 8
        },
        testDebug: {
            header: {tType: a.Bluetooth, mType: i.Command, lolen: 1, cls: o.Test, command: s.Test_Debug},
            paramCode: 8
        },
        testgetChannelMode: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.Test,
                command: s.Test_Channel_Mode
            }, paramCode: 0
        },
        dfuReset: {
            header: {tType: a.Bluetooth, mType: i.Command, lolen: 1, cls: o.DFU, command: s.DFU_Reset},
            paramCode: 2
        },
        dfuFlashSetAddress: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 4,
                cls: o.DFU,
                command: s.DFU_Flash_Set_Address
            }, paramCode: 6
        },
        dfuFlashUpload: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 1,
                cls: o.DFU,
                command: s.DFU_Flash_Upload
            }, paramCode: 8
        },
        dfuFlashUploadFinish: {
            header: {
                tType: a.Bluetooth,
                mType: i.Command,
                lolen: 0,
                cls: o.DFU,
                command: s.DFU_Flash_Upload_Finish
            }, paramCode: 0
        }
    }, bglib
})