define(["jquery",
        "./devices/wedo/wedo-ui",
        "ble/ble",
        "wedo2/wedo2-ble"
    ],
    function ($, wedoUI, ble, wedo2Ble ) {

        $(document).ready(function () {
            function enableTemplateLink() {
                wedoUI.updateConnection(wedo2Ble.getConnectionCount());
            }

            function setAlwaysOnTop(e) {
                chrome.app.window.current().setAlwaysOnTop(e)
            }

            ble.connected.add(enableTemplateLink),
                ble.disconnected.add(enableTemplateLink)
        })
    })