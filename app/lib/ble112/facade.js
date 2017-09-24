define(["require", "exports", "ble112dir/ble112-facade"],
    function (Require, Exports, ble112Facade) {
    var self = function () {

        function Facade() {
        }

        return Facade.prototype.init = function () {
            var _this = this;
            return this.platformFacade = new ble112Facade.Ble112Facade,
                this.platformFacade.init().then(function (resolve) {
                return console.log("Made Ble112 facade"), Promise.resolve(resolve)
            }, function (reject) {
                return console.error(reject)
            })
        }, Facade.prototype.getBle = function () {
            return this.platformFacade.getBle()
        }, Facade.prototype.getDeviceManager = function () {
            return this.platformFacade.getDeviceManager()
        }, Facade
    }();
    Exports.Facade = self
})