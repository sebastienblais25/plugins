"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OSDP = /** @class */ (function () {
    function OSDP() {
    }
    OSDP.prototype.init = function (api) {
        this.api = api;
        this.OnBoundingBoxChange();
        OSDP.instances[this.api.id] = this;
    };
    OSDP.prototype.addLayerByUUID = function (uuid) {
        // only works on legacy API for the moment
        this._RV.loadRcsLayers([uuid]);
    };
    OSDP.prototype.setDefinitonQuery = function (mapId, layerId, query) {
        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)
        // it is not implemented in the interface yet, need a little bit of cheating
        var myMap = window.RZ.mapById(mapId);
        var myLayer = myMap.layers.getLayersById(layerId)[0];
        var myProxy = myLayer._layerProxy; // cheating!
        myProxy.filter.setSql('myUniqueAppCode', query);
    };
    OSDP.prototype.resetDefinitionQuery = function (mapId, layerId) {
        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)
        // it is not implemented in the interface yet, need a little bit of cheating
        var myMap = window.RZ.mapById(mapId);
        var myLayer = myMap.layers.getLayersById(layerId)[0];
        var myProxy = myLayer._layerProxy; // cheating!
        myProxy.filter.setSql('myUniqueAppCode', '');
    };
    OSDP.prototype.OnBoundingBoxChange = function () {
        // detect any change on the extent box
        var ramAPI = this.api;
        var mapExtentChange = ramAPI.esriMap.on("extent-change", changeHandler);
        document.getElementById("coordNE").innerText = "Bounding Box: NE [" + ramAPI.boundsObj.northEast + "]";
        document.getElementById("coordSW").innerText = "SW [" + ramAPI.boundsObj.southWest + "]";
        function changeHandler(evt) {
            //var extent = evt.extent,
            //    zoomed = evt.levelChange;
            document.getElementById("coordNE").innerText = "Bounding Box: NE [" + ramAPI.boundsObj.northEast + "]";
            document.getElementById("coordSW").innerText = "SW [" + ramAPI.boundsObj.southWest + "]";
            console.log("Bounding Box: " + ramAPI.boundsObj.toString());
        }
    };
    // A store of the instances of OSDP, 1 per map
    OSDP.instances = {};
    return OSDP;
}());
exports.default = OSDP;
window.osdp = new OSDP();
