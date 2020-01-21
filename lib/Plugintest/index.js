"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test = /** @class */ (function () {
    function Test() {
    }
    //initiation
    Test.prototype.init = function (api) {
        var _this = this;
        this.mapApi = api;
        this.config = this._RV.getConfig('plugins').test;
        this.config.language = this._RV.getCurrentLang();
        var myBundlePromise = RAMP.GAPI.esriLoadApiClasses([['esri/dijit/LayerSwipe', 'layerSwipe']]);
        myBundlePromise.then(function (myBundle) {
            _this.listenToAlert();
        });
        this.listenToAlert();
    };
    //alert when clicked
    Test.prototype.listenToAlert = function () {
        this.mapApi.click.subscribe(function (pointObject) {
            alert('You clicked on point ' + pointObject.x + " " + pointObject.y);
        });
    };
    return Test;
}());
exports.default = Test;
;
;
window.test = Test;
