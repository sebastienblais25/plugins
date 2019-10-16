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
/******/ 	return __webpack_require__(__webpack_require__.s = "./chart/loader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./chart/index.ts":
/*!************************!*\
  !*** ./chart/index.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// decided to first use chartjs because of is simplicity. TODO: look for D3 https://www.slant.co/versus/10578/10577/~chart-js_vs_d3-js\n// https://en.wikipedia.org/wiki/Comparison_of_JavaScript_charting_libraries\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar templates_1 = __webpack_require__(/*! ./templates */ \"./chart/templates.ts\");\nvar Chart = /** @class */ (function () {\n    function Chart() {\n    }\n    Chart.prototype.init = function (mapApi) {\n        this.mapApi = mapApi;\n        this.panel = this.mapApi.panels.create('rangchartechartSlider');\n        // this.panel.element.css(RangeSlider.prototype.panelOptions);\n        this.panel.body = templates_1.CHART_TEMPLATE;\n        // set slider bar controls\n        this.config = this._RV.getConfig('plugins').chart;\n        // add/merge configuration for range, limit and delay\n        //this.extendConfig = {...RangeSlider.prototype.layerOptions, ...this.config.params};\n        //this.extendConfig.language = this._RV.getCurrentLang();\n        // get array of id(s) and set layer(s)\n        //const ids = this.config.layers.map(layer => layer.id);\n        //this.mapApi.layersObj.layerAdded.subscribe((layer: any) => this.setLayer(layer, this.config.layers, ids));\n    };\n    Chart.prototype.compileTemplate = function (template) {\n        var temp = $(template);\n        this.mapApi.$compile(temp);\n        return temp;\n    };\n    return Chart;\n}());\nexports.default = Chart;\nChart.prototype.translations = {\n    'en-CA': {\n        test: 'test-en'\n    },\n    'fr-CA': {\n        test: 'tset-fr'\n    }\n};\nwindow.chart = Chart;\n\n\n//# sourceURL=webpack:///./chart/index.ts?");

/***/ }),

/***/ "./chart/loader.js":
/*!*************************!*\
  !*** ./chart/loader.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.ts */ \"./chart/index.ts\");\n/* harmony import */ var _index_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.scss */ \"./chart/main.scss\");\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_main_scss__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n//# sourceURL=webpack:///./chart/loader.js?");

/***/ }),

/***/ "./chart/main.scss":
/*!*************************!*\
  !*** ./chart/main.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./chart/main.scss?");

/***/ }),

/***/ "./chart/templates.ts":
/*!****************************!*\
  !*** ./chart/templates.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n// panels templates: chart holder\nexports.CHART_TEMPLATE = \"\\n<div rv-focus-member class=\\\"rv-chart\\\">\\n    <div class=\\\"chart-content\\\">\\n        'TEST'\\n    </div>\\n</div>\";\n\n\n//# sourceURL=webpack:///./chart/templates.ts?");

/***/ })

/******/ });