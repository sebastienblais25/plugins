"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var templates_1 = require("./templates");
/*
 * ...
 */
var PanelSettings = /** @class */ (function () {
    function PanelSettings(mapApi, panelManager, template, config) {
        this.mapApi = mapApi;
        this.open = config.open;
        this.settingsPanel = panelManager.body.find('.slider-content').prepend(template).find('.slider-settings');
        this.isOpen = this.open;
        // set global controls section
        var globalSection = this.settingsPanel.find('.slider-global');
        this.mapApi.agControllerRegister('IntervalCtrl', function () {
            var _this = this;
            // update slider interval
            this.updateInterval = function () { console.log("updateInterval " + _this.activeLayer.interval); };
            // set array of intervals
            this.intervals = Array.from(range(2, 100, 2)); //Array.apply(null, { length: 101 }).map(Number.call, Number).splice(2, 99);
            function range(start, end, step) {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(start < end)) return [3 /*break*/, 2];
                            return [4 /*yield*/, start];
                        case 1:
                            _a.sent();
                            start += step;
                            return [3 /*break*/, 0];
                        case 2: return [2 /*return*/];
                    }
                });
            }
        });
        this.mapApi.agControllerRegister('LimitCtrl', function () {
            this.selectedType = 'number';
        });
        globalSection.append(this.compileTemplate(templates_1.INTERVAL_TEMPLATE));
        globalSection.append(this.compileTemplate(templates_1.LIMITS_TEMPLATE));
        // set layers controls section
        var layersSection = this.settingsPanel.find('.slider-layers');
        this.mapApi.agControllerRegister('LayersListCtrl', function () {
        });
        this.mapApi.agControllerRegister('LayersFieldsCtrl', function () {
        });
        this.mapApi.agControllerRegister('RangeCtrl', function () {
            this.selectedType = 'number';
        });
        layersSection.append(this.compileTemplate(templates_1.LAYERS_LIST_TEMPLATE));
        layersSection.append(this.compileTemplate(templates_1.LAYERS_FIELDS_TEMPLATE));
        layersSection.append(this.compileTemplate(templates_1.LAYERS_RANGE_TEMPLATE));
    }
    PanelSettings.prototype.compileTemplate = function (template) {
        var temp = $(template);
        this.mapApi.$compile(temp);
        return temp;
    };
    Object.defineProperty(PanelSettings.prototype, "isOpen", {
        get: function () {
            return this.open;
        },
        set: function (isOpen) {
            this.open = isOpen;
            isOpen ? this.settingsPanel.show() : this.settingsPanel.hide();
        },
        enumerable: true,
        configurable: true
    });
    return PanelSettings;
}());
exports.PanelSettings = PanelSettings;
