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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar OSDP = /** @class */ (function () {\n    function OSDP() {\n    }\n    OSDP.prototype.init = function (api) {\n        this.api = api;\n        this.initUpdateExtentBox();\n        OSDP.instances[this.api.id] = this;\n    };\n    OSDP.prototype.addLayerByUUID = function (uuid) {\n        // only works on legacy API for the moment\n        // We can use add this.api.fgpMapObj.addConfigLayer(JSON) if we have the JSON object\n        this._RV.loadRcsLayers([uuid]);\n    };\n    OSDP.prototype.addLayerByConfig = function (mapId, config) {\n        var myMap = window.RAMP.mapById(mapId);\n        // If you want to add a layer by configuration you can use this\n        var layerJSON = {\n            'id': 'examplelayer',\n            'name': 'An exemplary Layer',\n            'layerType': 'esriFeature',\n            'controls': [\n                'remove',\n                'visibility'\n            ],\n            'state': {\n                'visibility': true,\n                'boundingBox': false\n            },\n            'url': 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_resource_potential_of_north_america_en/MapServer/0'\n        };\n        var myConfigLayer = myMap.layers.addLayer(layerJSON);\n    };\n    // function to fire on add layer and remove layer\n    OSDP.prototype.layersEvents = function (myFunction) {\n        var _this = this;\n        var myInter = setInterval(function () {\n            if (typeof _this.api !== 'undefined') {\n                _this.api.layersObj.layerAdded.subscribe(function (layer) { return myFunction(layer); });\n                _this.api.layersObj.layerRemoved.subscribe(function (layer) { return myFunction(layer); });\n                clearInterval(myInter);\n            }\n        }, 100);\n    };\n    OSDP.prototype.setDefinitonQuery = function (mapId, layerId, query) {\n        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)\n        var myMap = window.RAMP.mapById(mapId);\n        var myLayer = myMap.layers.getLayersById(layerId)[0];\n        myLayer.setFilterSql('OSDPFilter', query);\n    };\n    OSDP.prototype.resetDefinitionQuery = function (mapId, layerId) {\n        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)\n        var myMap = window.RAMP.mapById(mapId);\n        var myLayer = myMap.layers.getLayersById(layerId)[0];\n        myLayer.setFilterSql('OSDPFilter', '');\n    };\n    OSDP.prototype.initUpdateExtentBox = function () {\n        // set extent box change handler by extChangeHandler\n        // also initialyse the value of extentbox variable holder\n        var parent = this;\n        parent.api.esriMap.on('extent-change', extChangeHandler);\n        parent.extentbox = parent.api.boundsObj;\n        function extChangeHandler() {\n            parent.extentbox = parent.api.boundsObj;\n        }\n    };\n    OSDP.prototype.getExtentBox = function () {\n        //returns the extentbox variable holder\n        return this.extentbox;\n    };\n    OSDP.prototype.zoomPt = function (mapId, value) {\n        var myMap = window.RAMP.mapById(mapId);\n        var ramp = window.RAMP;\n        var split = value.split(' ');\n        var x = split[0].substring(split[0].indexOf('(') + 1, split[0].length - 1);\n        var y = split[2].substring(0, split[2].length - 1);\n        var pt = new ramp.GEO.XY(parseFloat(x), parseFloat(y));\n        myMap.zoom = 13;\n        myMap.setCenter(pt);\n    };\n    OSDP.prototype.zoomPoly = function (mapId, value) {\n        var myMap = window.RAMP.mapById(mapId);\n        var ramp = window.RAMP;\n        var split = value.substring(value.indexOf('((') + 2, value.length - 2).split(',');\n        // for each coord, create a pair and add it to the coords array\n        var coords = [];\n        split.forEach(function (item) {\n            var pair = item.split(' ');\n            coords.push([parseFloat(pair[0]), parseFloat(pair[1])]);\n        });\n        // project values\n        var poly = ramp.GAPI.proj.localProjectGeometry('EPSG:3978', {\n            'rings': [coords], 'spatialReference': { 'wkid': 4326 }\n        });\n        // get array of x and y\n        var x = [];\n        var y = [];\n        poly.rings[0].forEach(function (item) { x.push(item[0]); y.push(item[1]); });\n        // set extent\n        myMap.setExtent({\n            'xmin': Math.min.apply(Math, x), 'ymin': Math.min.apply(Math, y), 'xmax': Math.max.apply(Math, x), 'ymax': Math.max.apply(Math, y),\n            'spatialReference': { 'wkid': 3978 }\n        });\n    };\n    OSDP.prototype.saveState = function (mapid) {\n        // save bookmark in session storage so it is restored when user loads it\n        sessionStorage.setItem(mapid, this._RV.getBookmark());\n    };\n    OSDP.prototype.loadState = function (mapid) {\n        // load bookmark from session storage and apply it\n        var storage = JSON.parse(JSON.stringify(sessionStorage.getItem(mapid)));\n        // use a timeout to wait until code finish to run. If no timeout, RV is not define\n        setTimeout(function () { return window.RV.getMap(mapid).initialBookmark(storage); });\n    };\n    // a store of the instances of OSDP, 1 per map\n    OSDP.instances = {};\n    return OSDP;\n}());\nexports.default = OSDP;\nwindow.osdp = new OSDP();\n\n\n//# sourceURL=webpack:///./osdp/index.ts?");

/***/ })

/******/ });