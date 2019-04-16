var OSDP = /** @class */ (function () {
    function OSDP() {
    }
    OSDP.prototype.init = function (api) {
        this.api = api;
        console.log('yepidou I am in!');
    };
    return OSDP;
}());
window.osdp = OSDP;
