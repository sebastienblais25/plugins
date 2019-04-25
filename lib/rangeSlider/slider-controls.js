"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slider_bar_1 = require("./slider-bar");
/**
 * ...
 */
var SliderControls = /** @class */ (function () {
    function SliderControls(mapApi, panelManager, templates) {
        this.mapApi = mapApi;
        mapApi.agControllerRegister('LockSliderCtrl', function ($scope) {
            var _this = this;
            this.a = {
                isLocked: true
            };
            // toggle lock setting to lock left anchor
            this.lock = function () { slider_bar_1.SliderBar.getInstance().lock = !slider_bar_1.SliderBar.getInstance().lock; _this.a.isLocked = !_this.a.isLocked; console.log("isLocked: " + _this.a.isLocked); };
        });
        mapApi.agControllerRegister('StepSliderCtrl', function () {
            // toggle settings panel
            this.step = function (direction) { slider_bar_1.SliderBar.getInstance().step(direction); };
        });
        mapApi.agControllerRegister('PlaySliderCtrl', function () {
            // toggle settings panel
            this.play = function () { console.log('play'); };
        });
        mapApi.agControllerRegister('RefreshSliderCtrl', function () {
            // toggle settings panel
            this.refresh = function () { console.log('refresh'); };
        });
        mapApi.agControllerRegister('DelaySliderCtrl', function () {
            var _this = this;
            // toggle settings panel
            // TODO: check ng-model
            this.selectedDelay = function () { console.log('select ' + _this.selectedDelay); };
            this.selectDelay = function () { console.log('select ' + _this.selectedDelay); };
        });
        mapApi.agControllerRegister('ExportSliderCtrl', function () {
            // toggle settings panel
            this.export = function () { console.log('export'); };
        });
        var barControls = panelManager.body.find('.slider-controls');
        for (var _i = 0, templates_1 = templates; _i < templates_1.length; _i++) {
            var template = templates_1[_i];
            barControls.append(this.compileTemplate(template));
        }
    }
    SliderControls.prototype.compileTemplate = function (template) {
        var temp = $(template);
        this.mapApi.$compile(temp);
        return temp;
    };
    return SliderControls;
}());
exports.SliderControls = SliderControls;
