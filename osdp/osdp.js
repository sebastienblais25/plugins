/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./osdp/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./osdp/index.ts":
/*!***********************!*\
  !*** ./osdp/index.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar OSDP = /** @class */ (function () {\n    function OSDP() {\n    }\n    OSDP.prototype.init = function (api) {\n        var _this = this;\n        this.api = api;\n        this.initUpdateExtentBox();\n        // add the OSDP grapic layer\n        var myInter = setInterval(function () {\n            if (typeof window.RAMP.mapById(_this.api.id) !== 'undefined') {\n                window.RAMP.mapById(_this.api.id).layersObj.addLayer('graphicsOSDP');\n                // subscribe to add layer even to reorder the layers so graphicOSDP is always on top\n                _this.api.layersObj.layerAdded.subscribe(function (layer) {\n                    var map = window.RAMP.mapById(_this.api.id);\n                    var pos = map.esriMap.graphicsLayerIds.length - 2;\n                    // use a timeout because viewer always try to reoder graphic layers...\n                    // if timeout is not an option, reoder layer when we add a new geometry\n                    // pos is kind of optional, we can put 1000 and we know it will be always on top\n                    setTimeout(function () {\n                        map.esriMap.reorderLayer('graphicsOSDP', pos);\n                    }, 5000);\n                });\n                // if config is empty-config, prevent zoom to append\n                if (document.getElementById('mapOSDP').getAttribute('rv-config') === 'empty-config.json') {\n                    _this.preventZoom(window.RAMP.mapById(_this.api.id));\n                }\n                // need to call later because if called before map initilize, rest of function is skipped\n                _this.setZoomEndEvent(window.RAMP.mapById(_this.api.id));\n                clearInterval(myInter);\n            }\n        }, 100);\n        OSDP.instances[this.api.id] = this;\n        // test url before trying to load\n        this.testService({ 'url': 'https://geoportal.gc.ca/arcgis/rest/services/FGP/CSAS_CoralsSponges2010_EN/MapServer/18' });\n        this.testService({ 'url': 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_resource_potential_of_north_america_en/MapServer/0' });\n    };\n    OSDP.prototype.setZoomEndEvent = function (mapi) {\n        mapi.esriMap.on('zoom-end', function (evt) {\n            console.log(\"zoom level:  \" + evt.level + \", new extent: \" + JSON.stringify(evt.extent));\n        });\n        // I think you have already the code the extent change but I added it in case\n        mapi.extentChanged.subscribe(function (evt) {\n            console.log(\"new extent: \" + JSON.stringify(evt));\n        });\n    };\n    OSDP.prototype.preventZoom = function (mapi) {\n        // disable mouse and touch navigation\n        mapi.esriMap.disableMapNavigation();\n        mapi.esriMap.disablePinchZoom();\n        // set display none to +/- button to zoom in and out\n        var elem = document.getElementsByClassName('rv-mapnav-content')[0];\n        elem.style.display = 'none';\n    };\n    OSDP.prototype.addLayerByUUID = function (uuid) {\n        // only works on legacy API for the moment\n        // We can use add this.api.fgpMapObj.addConfigLayer(JSON) if we have the JSON object\n        this._RV.loadRcsLayers([uuid]);\n    };\n    OSDP.prototype.addLayerByConfig = function (mapId, config) {\n        var myMap = window.RAMP.mapById(mapId);\n        // If you want to add a layer by configuration you can use this\n        var layerJSON = {\n            'id': 'examplelayer',\n            'name': 'An exemplary Layer',\n            'layerType': 'esriFeature',\n            'controls': [\n                'remove',\n                'visibility'\n            ],\n            'state': {\n                'visibility': true,\n                'boundingBox': false\n            },\n            'url': 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_resource_potential_of_north_america_en/MapServer/0'\n        };\n        var myConfigLayer = myMap.layers.addLayer(layerJSON);\n    };\n    OSDP.prototype.removeLayers = function (mapId) {\n        var myMap = window.RAMP.mapById(mapId);\n        // remove all layers from the using the legend block\n        // will also remove bad layers\n        var legentItem = myMap.ui.configLegend.children.slice();\n        for (var _i = 0, legentItem_1 = legentItem; _i < legentItem_1.length; _i++) {\n            var item = legentItem_1[_i];\n            myMap.layersObj.removeLayer(item._legendBlock._blockConfig._layerId);\n        }\n        // close legend\n        myMap.panels.legend.close();\n    };\n    // function to fire on add layer and remove layer\n    OSDP.prototype.layersEvents = function (myFunction) {\n        var _this = this;\n        var myInter = setInterval(function () {\n            if (typeof _this.api !== 'undefined') {\n                _this.api.layersObj.layerAdded.subscribe(function (layer) { return myFunction(layer); });\n                _this.api.layersObj.layerRemoved.subscribe(function (layer) { return myFunction(layer); });\n                clearInterval(myInter);\n            }\n        }, 100);\n    };\n    OSDP.prototype.testService = function (layer) {\n        var request = new XMLHttpRequest();\n        request.open('GET', layer.url + \"?f=json\", true);\n        request.onreadystatechange = function () {\n            if (request.readyState === 4) {\n                if (request.response.contains('\"code\":500')) {\n                    console.log(\"Error handling service request :Could not find a service with the name '\" + layer.url + \"'\\n                        in the configured clusters. Service may be stopped or ArcGIS Server may not be running.\");\n                }\n                else {\n                    console.log(\"Layer '\" + layer.url + \"' should load properly.\");\n                }\n            }\n        };\n        request.send();\n    };\n    OSDP.prototype.setDefinitonQuery = function (mapId, layerId, query) {\n        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)\n        var myMap = window.RAMP.mapById(mapId);\n        var myLayer = myMap.layers.getLayersById(layerId)[0];\n        myLayer.setFilterSql('OSDPFilter', query);\n    };\n    OSDP.prototype.resetDefinitionQuery = function (mapId, layerId) {\n        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)\n        var myMap = window.RAMP.mapById(mapId);\n        var myLayer = myMap.layers.getLayersById(layerId)[0];\n        myLayer.setFilterSql('OSDPFilter', '');\n    };\n    OSDP.prototype.initUpdateExtentBox = function () {\n        // set extent box change handler by extChangeHandler\n        // also initialyse the value of extentbox variable holder\n        var parent = this;\n        parent.api.esriMap.on('extent-change', extChangeHandler);\n        parent.extentbox = parent.api.boundsObj;\n        function extChangeHandler() {\n            parent.extentbox = parent.api.boundsObj;\n        }\n    };\n    OSDP.prototype.getExtentBox = function () {\n        //returns the extentbox variable holder\n        return this.extentbox;\n    };\n    OSDP.prototype.inputParse = function (values, parseType) {\n        var arrayPoly = values.split(';');\n        arrayPoly.forEach(function (element, index, arr) {\n            var elt = element;\n            elt = elt.replace(parseType, '').replace(/\\( */g, '[').replace(/ *\\)/g, ']');\n            elt = elt.trim();\n            elt = elt.replace(/, */g, '],['); // specific for polygons\n            elt = elt.replace(/ +/g, ', ');\n            arr[index] = elt;\n        });\n        return \"[\" + arrayPoly + \"]\";\n    };\n    OSDP.prototype.addPointsGeometry = function (mapId, values) {\n        var myMap = window.RAMP.mapById(mapId);\n        var input = this.inputParse(values, 'POINT');\n        var icon = 'M 50 0 100 100 50 200 0 100 Z';\n        var ptcords = JSON.parse(input);\n        var graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];\n        for (var _i = 0, ptcords_1 = ptcords; _i < ptcords_1.length; _i++) {\n            var value = ptcords_1[_i];\n            // create a point with unique id, we'll use an svg path for the icon\n            var pt = new window.RAMP.GEO.Point(\"location\" + Math.round(Math.random() * 100000), [value[0], value[1]], { style: 'ICON', icon: icon, colour: [255, 0, 0, 0.75], width: 25 });\n            // add the point to the graphic layer\n            graphicsOSDP.addGeometry(pt);\n        }\n        // zoom to extent of point(s)\n        if (ptcords.length === 1) {\n            this.zoomPt(mapId, values);\n        }\n        else {\n            this.zoomExtent(mapId, ptcords);\n        }\n    };\n    OSDP.prototype.addPolygonsGeometry = function (mapId, values) {\n        var myMap = window.RAMP.mapById(mapId);\n        var input = this.inputParse(values, 'POLYGON');\n        var poly1 = new window.RAMP.GEO.Polygon(0, JSON.parse(input));\n        // create a multipolygon with unique id\n        var polyAll = new window.RAMP.GEO.MultiPolygon(\"location\" + Math.round(Math.random() * 100000), [poly1], { outlineColor: [255, 0, 0], outlineWidth: 3 });\n        // add the multipolygon to the graphic layer\n        var graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];\n        graphicsOSDP.addGeometry([polyAll]);\n        // zoom to extent of polygon(s)\n        this.zoomExtent(mapId, JSON.parse(input)[0], 1.25);\n    };\n    OSDP.prototype.removeGeometries = function (mapId) {\n        var myMap = window.RAMP.mapById(mapId);\n        var graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];\n        graphicsOSDP.removeGeometry();\n        // remove hightlight marker and haze\n        myMap.esriMap._layerDivs.rv_hilight.clear();\n        if (typeof document.querySelectorAll('#mapOSDP .rv-map-highlight')[0] !== 'undefined') {\n            document.querySelectorAll('#mapOSDP .rv-map-highlight')[0].classList.toggle('rv-map-highlight');\n        }\n    };\n    OSDP.prototype.zoomPt = function (mapId, value) {\n        var myMap = window.RAMP.mapById(mapId);\n        var ramp = window.RAMP;\n        var input = this.inputParse(value, 'POINT');\n        var ptcoords = JSON.parse(input);\n        var pt = new ramp.GEO.XY(parseFloat(ptcoords[0][0]), parseFloat(ptcoords[0][1]));\n        myMap.zoom = 13;\n        myMap.setCenter(pt);\n    };\n    OSDP.prototype.zoomExtent = function (mapId, coords, expand) {\n        if (expand === void 0) { expand = 1; }\n        var myMap = window.RAMP.mapById(mapId);\n        var ramp = window.RAMP;\n        var x = [];\n        var y = [];\n        coords.forEach(function (item) {\n            x.push(item[0]);\n            y.push(item[1]);\n        });\n        var ext = ramp.GAPI.proj.projectEsriExtent({\n            'xmin': Math.min.apply(Math, x), 'ymin': Math.min.apply(Math, y), 'xmax': Math.max.apply(Math, x), 'ymax': Math.max.apply(Math, y),\n            'spatialReference': { 'wkid': 4326 }\n        }, myMap.esriMap.spatialReference);\n        myMap.setExtent(ext.expand(expand));\n    };\n    OSDP.prototype.zoomWkt = function (mapId, values, type) {\n        var input = this.inputParse(values, type);\n        // zoom to extent of wkt points or polygon(s)\n        this.zoomExtent(mapId, JSON.parse(input)[0]);\n    };\n    OSDP.prototype.saveState = function (mapid) {\n        // save bookmark in session storage so it is restored when user loads it\n        sessionStorage.setItem(mapid, this._RV.getBookmark());\n    };\n    OSDP.prototype.loadState = function (mapid) {\n        // load bookmark from session storage and apply it\n        var storage = JSON.parse(JSON.stringify(sessionStorage.getItem(mapid)));\n        // use a timeout to wait until code finish to run. If no timeout, RV is not define\n        setTimeout(function () { return window.RV.getMap(mapid).initialBookmark(storage); });\n    };\n    // a store of the instances of OSDP, 1 per map\n    OSDP.instances = {};\n    return OSDP;\n}());\nexports.default = OSDP;\nwindow.osdp = new OSDP();\n\n\n//# sourceURL=webpack:///./osdp/index.ts?");

/***/ })

/******/ });