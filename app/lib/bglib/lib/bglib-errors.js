define([], function () {
    function getErrorFromCode(e) {
        var t = new BGLibError;
        switch (e) {
            case 0:
                return 0;
            case 384:
                return t.message = "Invalid Parameter", t.detail = "Command contained invalid parameter", t;
            case 385:
                return t.message = "Device in Wrong State", t.detail = "Device is in wrong state to receive command", t;
            case 386:
                return t.message = "Out Of Memory", t.detail = "Device has run out of memory", t;
            case 387:
                return t.message = "Feature Not Implemented", t.detail = "Feature is not implemented", t;
            case 388:
                return t.message = "Command Not Recognized", t.detail = "Command was not recognized", t;
            case 389:
                return t.message = "Timeout", t.detail = "Command or Procedure failed due to timeout", t;
            case 390:
                return t.message = "Not Connected", t.detail = "Connection handle passed to command is not a valid handle", t;
            case 391:
                return t.message = "Flow", t.detail = "Command would cause either underflow or overflow error", t;
            case 392:
                return t.message = "User Attribute", t.detail = "User attribute was accessed through API which is not supported", t;
            case 393:
                return t.message = "Invalid License Key", t.detail = "No valid license key found", t;
            case 394:
                return t.message = "Command Too Long", t.detail = "Command would cause either underflow or overflow error", t;
            case 391:
                return t.message = "Out of Bonds", t.detail = "Bonding procedure can't be started because device has no space left for bond.", t;
            case 517:
                return t.message = "Authentication Failure", t.detail = "Pairing or authentication failed due to incorrect results in the pairing or authentication procedure. This could be due to an incorrect PIN or Link Key", t;
            case 518:
                return t.message = "Pin or Key Missing", t.detail = "Pairing failed because of missing PIN, or authentication failed because of missing Key.", t;
            case 519:
                return t.message = "Memory Capacity Exceeded", t.detail = "Controller is out of memory.", t;
            case 520:
                return t.message = "Connection Timeout", t.detail = "Link supervision timeout has expired.", t;
            case 521:
                return t.message = "Connection Limit Exceeded", t.detail = "Controller is at limit of connections it can support.", t;
            case 524:
                return t.message = "Command Disallowed", t.detail = "Command requested cannot be executed because the Controller is in a state where it cannot process this command at this time.", t;
            case 530:
                return t.message = "Invalid Command Parameters", t.detail = "Command contained invalid parameters.", t;
            case 531:
                return t.message = "Remote User Terminated Connection", t.detail = "User on the remote device terminated the connection.", t;
            case 534:
                return t.message = "Connection Terminated by Local Host", t.detail = "Local device terminated the connection.", t;
            case 546:
                return t.message = "LL Response Timeout", t.detail = "CConnection terminated due to link-layer procedure timeout.", t;
            case 552:
                return t.message = "LL Instant Passed", t.detail = "Received link-layer control packet where instant was in the past.", t;
            case 570:
                return t.message = "Controller Busy", t.detail = "Operation was rejected because the controller is busy and unable to process the request.", t;
            case 571:
                return t.message = "Unacceptable Connection Interval", t.detail = "The Unacceptable Connection Interval error code indicates that the remote device terminated the connection because of an unacceptable connection interval.", t;
            case 572:
                return t.message = "Directed Advertising Timeout", t.detail = "Directed advertising completed without a connection being created.", t;
            case 573:
                return t.message = "MIC Failure", t.detail = "Connection was terminated because the Message Integrity Check (MIC) failed on a received packet.", t;
            case 574:
                return t.message = "Connection Failed to be Established", t.detail = "LL initiated a connection but the connection has failed to be established. Controller did not receive any packets from remote end.", t;
            case 769:
                return t.message = "Passkey Entry Failed", t.detail = "The user input of passkey failed, for example, the user cancelled the operation", t;
            case 770:
                return t.message = "OOB Data is not available", t.detail = "Out of Band data is not available for authentication.", t;
            case 771:
                return t.message = "Authentication Requirements", t.detail = "The pairing procedure cannot be performed as authentication requirements cannot be met due to IO capabilities of one or both devices", t;
            case 772:
                return t.message = "Confirm Value Failed", t.detail = "The confirm value does not match the calculated compare value.", t;
            case 773:
                return t.message = "Pairing Not Supported", t.detail = "Pairing is not supported by the device.", t;
            case 774:
                return t.message = "Encryption Key Size", t.detail = "The resultant encryption key size is insufficient for the security requirements of this device.", t;
            case 775:
                return t.message = "Command Not Supported", t.detail = "The SMP command received is not supported on this device.", t;
            case 776:
                return t.message = "Unspecified Reason", t.detail = "Pairing failed due to an unspecified reason.", t;
            case 777:
                return t.message = "Repeated Attempts", t.detail = "Pairing or authentication procedure is disallowed because too little time has elapsed since last pairing request or security request.", t;
            case 778:
                return t.message = "Invalid Parameters", t.detail = "The Invalid Parameters error code indicates: the command length is invalid or a parameter is outside of the specified range.", t;
            case 1025:
                return t.message = "Invalid Handle", t.detail = "The attribute handle given was not valid on this server.", t;
            case 1026:
                return t.message = "Read Not Permitted", t.detail = "The attribute cannot be read.", t;
            case 1027:
                return t.message = "Write Not Permitted ", t.detail = "The attribute cannot be written.", t;
            case 1028:
                return t.message = "Invalid PDU", t.detail = "The attribute PDU was invalid.", t;
            case 1029:
                return t.message = "Insufficient Authentication", t.detail = "The attribute requires authentication before it can be read or written.", t;
            case 1030:
                return t.message = "Request Not Supported", t.detail = "Attribute Server does not support the request received from the client.", t;
            case 1031:
                return t.message = "Invalid Offset", t.detail = "Offset specified was past the end of the attribute.", t;
            case 1032:
                return t.message = "Insufficient Authorization", t.detail = "The attribute requires authorization before it can be read or written.", t;
            case 1033:
                return t.message = "Prepare Queue Full", t.detail = "Too many prepare writes have been queued.", t;
            case 1034:
                return t.message = "Attribute Not Found", t.detail = "No attribute found within the given attribute handle range.", t;
            case 1035:
                return t.message = "Attribute Not Long", t.detail = "The attribute cannot be read or written using the Read Blob Request.", t;
            case 1036:
                return t.message = "Insufficient Encryption Key Size", t.detail = "The Encryption Key Size used for encrypting this link is insufficient.", t;
            case 1037:
                return t.message = "Invalid Attribute Value Length", t.detail = "The attribute value length is invalid for the operation.", t;
            case 1038:
                return t.message = "Unlikely Error", t.detail = "The attribute request that was requested has encountered an error that was unlikely, and therefore could not be completed as requested.", t;
            case 1039:
                return t.message = "Insufficient Encryption", t.detail = "The attribute requires encryption before it can be read or written.", t;
            case 1040:
                return t.message = "Unsupported Group Type", t.detail = "The attribute type is not a supported grouping attribute as defined by a higher layer specification.", t;
            case 1041:
                return t.message = "Insufficient Resources", t.detail = "Insufficient Resources to complete the request.", t;
            case 1152:
                return t.message = "Application Error Codes", t.detail = "Application error code defined by a higher layer specification.", t
        }
        return -1
    }

    function BGLibError() {
        this.name = "BGLibError", this.message = "Generic BGLib Error", this.detail = ""
    }

    return BGLibError.prototype = new Error, BGLibError.prototype.constructor = BGLibError, {getErrorFromCode: getErrorFromCode}
})