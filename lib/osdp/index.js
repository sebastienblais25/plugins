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
    OSDP.prototype.addPointsGeometry = function (mapId, values) {
        var myMap = window.RAMP.mapById(mapId);
        var icon = 'M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2-.89 2-2 2c-1.1 0-2-.9-2-2zM5 20v2h14v-2H5z';
        var myData = JSON.parse(values);
        var cordslist = myData.map(function (x) {
            return [x[0], x[1]];
        });
        var graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        if (typeof graphicsOSDP === 'undefined') {
            // add graphic layer
            myMap.layers.addLayer('graphicsOSDP');
            graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        }
        var points = [];
        for (var _i = 0, cordslist_1 = cordslist; _i < cordslist_1.length; _i++) {
            var value = cordslist_1[_i];
            // create a point with unique id, we'll use an svg path for the icon
            var pt = new window.RAMP.GEO.Point("location" + Math.round(Math.random() * 100000), value, { icon: icon });
            // add the point to the simple layer
            graphicsOSDP.addGeometry(pt);
            points.push(pt);
        }

        // get the extent geometry from multi-point
        if (points.length === 1) {
            this.zoomPt(mapId, values);
        }
        else {
            var extent = this.createExtentGeom(points);
            this.zoomPoints(mapId, extent);
        }
    };
    OSDP.prototype.addPolygonsGeometry = function (mapId, values) {
        var poly1 = new window.RAMP.GEO.Polygon(201, JSON.parse(values));
        var polyAll = new window.RAMP.GEO.MultiPolygon(206, [poly1]);
        var myMap = window.RAMP.mapById(mapId);
        var icon = 'M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2-.89 2-2 2c-1.1 0-2-.9-2-2zM5 20v2h14v-2H5z';
        var graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        if (typeof graphicsOSDP === 'undefined') {
            // add graphic layer
            myMap.layers.addLayer('graphicsOSDP');
            graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        }
        var polygons = [];
        graphicsOSDP.addGeometry([polyAll]);
        this.zoomPoly(mapId, polyAll.polygonArray);
    };
    OSDP.prototype.removeGeometries = function (mapId) {
        var myMap = window.RAMP.mapById(mapId);
        var graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        if (typeof graphicsOSDP !== 'undefined') {
            // add graphic layer
            graphicsOSDP.removeGeometry();
        }
    };
    OSDP.prototype.createExtentGeom = function (values) {
        var xMin = -999;
        var yMin = -999;
        var xMax = -999;
        var yMax = -999;
        var arraylist = values;
        if (values.type === "Polygon") {
            arraylist = values.ringArray;
        }
        for (var _i = 0, arraylist_1 = arraylist; _i < arraylist_1.length; _i++) {
            var value = arraylist_1[_i];
            var x = value._xy.x;
            var y = value._xy.y;
            if (x < xMin || xMin === -999) {
                xMin = x;
            }
            if (y < yMin || yMin === -999) {
                yMin = y;
            }
            if (x > xMax || xMax === -999) {
                xMax = x;
            }
            if (y > yMax || yMax === -999) {
                yMax = y;
            }
        }
        // we already have function to zoom to WKT so create the extent in this format
        return "POLYGON((" + xMin + " " + yMin + "," + xMin + " " + yMax + "," + xMax + " " + yMax + "," + xMax + " " + yMin + "," + xMin + " " + yMin + "))";
    };
    OSDP.prototype.zoomPt = function (mapId, value) {
        var myMap = window.RAMP.mapById(mapId);
        var ramp = window.RAMP;
        /*
        const split = value.split(' ')
        const x = split[0].substring(split[0].indexOf('(') + 1, split[0].length);
        const y = split[1].substring(0, split[1].length - 1);*/
        var myData = JSON.parse(value);
        var pt = new ramp.GEO.XY(parseFloat(myData[0]), parseFloat(myData[1]));
        //myMap.zoom = 13;
        myMap.setCenter(pt);
    };
    OSDP.prototype.zoomPoly = function (mapId, value) {
        var myMap = window.RAMP.mapById(mapId);
        var ramp = window.RAMP;
        var polyarray = value;
        var ext_x = [];
        var ext_y = [];
        var coords = polyarray[0].ringArray[0].pointArray;
        coords.forEach(function (item) {
            ext_x.push(item._xy.x);
            ext_y.push(item._xy.y);
        });
        // project values
        var extentbox = [[Math.min.apply(Math, ext_x), Math.min.apply(Math, ext_y)], [Math.min.apply(Math, ext_x), Math.max.apply(Math, ext_y)],
            [Math.max.apply(Math, ext_x), Math.max.apply(Math, ext_y)], [Math.max.apply(Math, ext_x), Math.min.apply(Math, ext_y)],
            [Math.min.apply(Math, ext_x), Math.min.apply(Math, ext_y)]];
        var poly = ramp.GAPI.proj.localProjectGeometry('EPSG:3978', {
            'rings': [extentbox], 'spatialReference': { 'wkid': 4326 }
        });
        var xarray = [];
        var yarray = [];
        poly.rings[0].forEach(function (item) { xarray.push(item[0]); yarray.push(item[1]); });
        myMap.setExtent({
            'xmin': Math.min.apply(Math, xarray), 'ymin': Math.min.apply(Math, yarray), 'xmax': Math.max.apply(Math, xarray), 'ymax': Math.max.apply(Math, yarray),
            'spatialReference': { 'wkid': 3978 }
        });
    };
    OSDP.prototype.zoomPoints = function (mapId, value) {
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
        var xarray = [];
        var yarray = [];
        poly.rings[0].forEach(function (item) { xarray.push(item[0]); yarray.push(item[1]); });
        // set extent
        myMap.setExtent({
            'xmin': Math.min.apply(Math, xarray), 'ymin': Math.min.apply(Math, yarray), 'xmax': Math.max.apply(Math, xarray), 'ymax': Math.max.apply(Math, yarray),
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
