"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Testing = /** @class */ (function () {
    function Testing() {
    }
    //initiation
    Testing.prototype.init = function (api) {
        this.mapApi = api;
        this.config = this._RV.getConfig('plugins').test;
        //this.config.language = this._RV.getCurrentLang();
        /*let myBundlePromise = (<any>RAMP).GAPI.esriLoadApiClasses([['esri/dijit/LayerSwipe', 'layerSwipe']]);
        myBundlePromise.then(myBundle => {
            this.listenToAlert();
        });*/
        this.listenToAlert();
    };
    //alert when clicked
    Testing.prototype.listenToAlert = function () {
        var _this = this;
        /*this.mapApi.click.subscribe(function(pointObject:any){

            alert('You clicked on point ' + pointObject.X + " "+ pointObject.Y);
        });*/
        this.mapApi.click.subscribe(function (clickEvent) { return _this.clickHandler(clickEvent); });
    };
    Testing.prototype.clickHandler = function (clickEvent) {
        // get current language
        var lang = this._RV.getCurrentLang();
        // get point in lat/long
        var pt = clickEvent.xy; //this._RV.projectGeometry(clickEvent.mapPoint, 4326);
        pt.spatialReference = 4326;
        alert('You clicked on point ' + pt.X + " " + pt.Y);
    };
    return Testing;
}());
exports.default = Testing;
;
;
window.testing = Testing;
