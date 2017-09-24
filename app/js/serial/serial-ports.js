define(["signals"], function(Signal){

    var self = {};
    var list = [];

    function sortPortsByDigits() {
        //from http://stackoverflow.com/questions/8107226/
        var re = /\D/g;
        list.sort(function(a, b) {
          return(parseInt(a.name.replace(re, ""), 10) - parseInt(b.name.replace(re, ""), 10));
        });
    }

    function listToConsole() {
        console.log('a ver');
        for (var index = 0; index < list.length; index++) {
            var item = list[index];
            console.log(item);
        }
    }

    function checkAndAdd(item) {
        var id = list.length + 1;
        var found = list.some(function (el) {
            return el.name === item.name;
        });
        if (!found) { list.push({name:item.name, id:item.id}); }
    }

    self.requestList = function(callback) {
      chrome.serial.getDevices(function(ports){
        var selectedIndex = -1;
        ports.forEach(function(item, index){
            var path = item.path;
            var name = path.replace("/dev/","");
            // Windows    COMX
            // Linux CrOS /dev/ttyACMX
            // Mac        /dev/cu.usbmodemX
            // console.log('port: ', name);
            if (name.indexOf("cu.") == 0) return;
            // console.log('port: ', name);
            name = name.replace("tty.","");
            // console.log('port: ', name, 'vendor: ', item.vendorId, 'productId: ', item.productId, 'path: ', item.path);

            // For bluetooth work we only want the BLED112 dongle to be found, ignore all other ports
            // BLED112 has a VID of 9304 and PID of 1
            // TODO check VID/PID are actually available on Mac and Linux?
            if (item.vendorId && item.productId && item.vendorId==9304 && item.productId==1) {
                name = "BLED112 " + name;
                checkAndAdd({name:name, id:path});
            }
            if (name == 'usbmodem1') {
                name = "BLED112 " + name;
                checkAndAdd({name:name, id:path});
            }
        });

        sortPortsByDigits();

        //If low energy API supported we can also add the internal bluetooth adapter
        if (chrome.bluetoothLowEnergy && typeof chrome.bluetoothLowEnergy.connect == "function") {
          chrome.bluetooth.getAdapterState(function(adapter) {
            name = "Internal " + adapter.name;
            if (adapter.available) {
                // console.log("Chromium found: ", {name:name, id:adapter.address});
                checkAndAdd({name:name, id:adapter.address});
                listToConsole();
                self.value = adapter.address;
                callback(list, selectedIndex);
            }
          });
        }
    
        var selectedIndex = -1;
        for (var index = 0; index < list.length; index++) {
          var item = list[index];
          if (self.value == item.id)
          {
            selectedIndex = index;
            break;
          } else if (selectedIndex == -1)
          {
            //if (item.name.indexOf("COM") === 0 || item.name.indexOf("usbmodem") === 0 || item.name.indexOf("ttyACM") === 0) selectedIndex = index;
            if (item.name.indexOf("BLED112") === 0 || item.name.indexOf("Internal") === 0) selectedIndex = index;
          }
        }
        callback(list, selectedIndex);
      });
    }

    return self;
});
