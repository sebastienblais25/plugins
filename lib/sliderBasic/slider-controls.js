"use strict";
//import { SliderBar } from './slider-bar';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ...
 */
var SliderControls = /** @class */ (function () {
    function SliderControls(mapApi, panelManager, templates, slider) {
        this.mapApi = mapApi;
        mapApi.agControllerRegister('LockSliderCtrl', function ($scope) {
            // because ng-if not accessible from within the element, create scope on the parent element
            $scope.$parent.ctrl = { value: { isLocked: slider.lock } };
            // toggle lock setting to lock left anchor
            this.lock = function () {
                slider.lock = !slider.lock;
                $scope.$parent.ctrl.value.isLocked = !$scope.$parent.ctrl.value.isLocked;
            };
        });
        mapApi.agControllerRegister('LoopSliderCtrl', function ($scope) {
            // because ng-if not accessible from within the element, create scope on the parent element
            $scope.$parent.ctrl = { value: { isLooped: slider.loop } };
            // toggle loop setting to play animation in loop
            this.loop = function () {
                slider.loop = !slider.loop;
                $scope.$parent.ctrl.value.isLooped = !$scope.$parent.ctrl.value.isLooped;
                // set class to show button is active/inactive
                var elem = mapApi.fgpMapObj.esriMap.root.parentElement.parentElement.getElementsByClassName('slider-loop-control')[0];
                elem.getElementsByTagName('md-icon')[0].classList.toggle('slider-loop-control-active');
            };
        });
        mapApi.agControllerRegister('StepSliderCtrl', function () {
            // step previous or next
            this.step = function (direction) { slider.step(direction); };
        });
        mapApi.agControllerRegister('PlaySliderCtrl', function ($scope) {
            // because ng-if not accessible from within the element, create scope on the parent element
            $scope.$parent.ctrl = { value: { isPlaying: false } };
            // get play state from observable and force update
            slider.getPlayState().subscribe(function (value) {
                $scope.$parent.ctrl.value.isPlaying = value;
                // apply timeout because sometime scope is not applied
                setTimeout(function () { $scope.$parent.$apply(); });
            });
            // start play
            this.play = function () {
                slider.play(!$scope.$parent.ctrl.value.isPlaying);
            };
        });
        mapApi.agControllerRegister('RefreshSliderCtrl', function () {
            // toggle settings panel
            this.refresh = function () { slider.refresh(); };
        });
        mapApi.agControllerRegister('DelaySliderCtrl', function () {
            var _this = this;
            // set selected delay
            this.selectedDelay = slider.delay;
            this.selectDelay = function () { slider.delay = _this.selectedDelay; };
        });
        mapApi.agControllerRegister('ExportSliderCtrl', function () {
            var _this = this;
            // toggle export gif switch
            this.export = slider.export;
            this.selectExport = function () { slider.export = _this.export; };
        });
        var barControls = panelManager.body.find('.slider-controls');
        for (var _i = 0, templates_1 = templates; _i < templates_1.length; _i++) {
            var template = templates_1[_i];
            if (template.includes('slider-delay-control')) {
                // add delay control to play control div
                barControls.find('.slider-play-control').append(this.compileTemplate(template));
            }
            else if (template.includes('slider-loop-control')) {
                // add loop control to play control div
                barControls.find('.slider-play-control').prepend(this.compileTemplate(template));
            }
            else {
                barControls.append(this.compileTemplate(template));
            }
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
