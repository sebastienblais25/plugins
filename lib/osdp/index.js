"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OSDP = /** @class */ (function () {
    function OSDP() {
    }
    OSDP.prototype.init = function (api) {
        this.api = api;
        this.initUpdateExtentBox();
        OSDP.instances[this.api.id] = this;
    };
    OSDP.prototype.addLayerByUUID = function (uuid) {
        // only works on legacy API for the moment
        // We can use add this.api.fgpMapObj.addConfigLayer(JSON) if we have the JSON object
        this._RV.loadRcsLayers([uuid]);
    };
    OSDP.prototype.addLayerByConfig = function (mapId, config) {
        var myMap = window.RAMP.mapById(mapId);
        // If you want to add a layer by configuration you can use this
        var layerJSON = {
            'id': 'examplelayer',
            'name': 'An exemplary Layer',
            'layerType': 'esriFeature',
            'controls': [
                'remove',
                'visibility'
            ],
            'state': {
                'visibility': true,
                'boundingBox': false
            },
            'url': 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_resource_potential_of_north_america_en/MapServer/0'
        };
        var myConfigLayer = myMap.layers.addLayer(layerJSON);
    };
    // function to fire on add layer and remove layer
    OSDP.prototype.layersEvents = function (myFunction) {
        var _this = this;
        var myInter = setInterval(function () {
            if (typeof _this.api !== 'undefined') {
                _this.api.layersObj.layerAdded.subscribe(function (layer) { return myFunction(layer); });
                _this.api.layersObj.layerRemoved.subscribe(function (layer) { return myFunction(layer); });
                clearInterval(myInter);
            }
        }, 100);
    };
    OSDP.prototype.setDefinitonQuery = function (mapId, layerId, query) {
        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)
        var myMap = window.RAMP.mapById(mapId);
        var myLayer = myMap.layers.getLayersById(layerId)[0];
        myLayer.setFilterSql('OSDPFilter', query);
    };
    OSDP.prototype.resetDefinitionQuery = function (mapId, layerId) {
        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)
        var myMap = window.RAMP.mapById(mapId);
        var myLayer = myMap.layers.getLayersById(layerId)[0];
        myLayer.setFilterSql('OSDPFilter', '');
    };
    OSDP.prototype.initUpdateExtentBox = function () {
        // set extent box change handler by extChangeHandler
        // also initialyse the value of extentbox variable holder
        var parent = this;
        parent.api.esriMap.on('extent-change', extChangeHandler);
        parent.extentbox = parent.api.boundsObj;
        function extChangeHandler() {
            parent.extentbox = parent.api.boundsObj;
        }
    };
    OSDP.prototype.getExtentBox = function () {
        //returns the extentbox variable holder
        return this.extentbox;
    };
    OSDP.prototype.zoomPt = function (mapId, value) {
        var myMap = window.RAMP.mapById(mapId);
        var ramp = window.RAMP;
        var split = value.split(' ');
        var x = split[0].substring(split[0].indexOf('(') + 1, split[0].length - 1);
        var y = split[2].substring(0, split[2].length - 1);
        var pt = new ramp.GEO.XY(parseFloat(x), parseFloat(y));
        myMap.zoom = 13;
        myMap.setCenter(pt);
    };
    OSDP.prototype.zoomPoly = function (mapId, value) {
        var myMap = window.RAMP.mapById(mapId);
        var ramp = window.RAMP;
        var split = value.substring(value.indexOf('((') + 2, value.length - 2).split(',');
        // for each coord, create a pair and add it to the coords array
        var coords = [];
        split.forEach(function (item) {
            var pair = item.split(' ');
            coords.push([parseFloat(pair[0]), parseFloat(pair[1])]);
        });
        // project values
        var poly = ramp.GAPI.proj.localProjectGeometry('EPSG:3978', {
            'rings': [coords], 'spatialReference': { 'wkid': 4326 }
        });
        // get array of x and y
        var x = [];
        var y = [];
        poly.rings[0].forEach(function (item) { x.push(item[0]); y.push(item[1]); });
        // set extent
        myMap.setExtent({
            'xmin': Math.min.apply(Math, x), 'ymin': Math.min.apply(Math, y), 'xmax': Math.max.apply(Math, x), 'ymax': Math.max.apply(Math, y),
            'spatialReference': { 'wkid': 3978 }
        });
    };
    OSDP.prototype.saveState = function (mapid) {
        // save bookmark in session storage so it is restored when user loads it
        sessionStorage.setItem(mapid, this._RV.getBookmark());
    };
    OSDP.prototype.loadState = function (mapid) {
        // load bookmark from session storage and apply it
        var storage = JSON.parse(JSON.stringify(sessionStorage.getItem(mapid)));
        // use a timeout to wait until code finish to run. If no timeout, RV is not define
        setTimeout(function () { return window.RV.getMap(mapid).initialBookmark(storage); });
    };
    // a store of the instances of OSDP, 1 per map
    OSDP.instances = {};
    return OSDP;
}());
exports.default = OSDP;
window.osdp = new OSDP();
