//import { SliderBar } from './slider-bar';

/**
 * ...
 */
export class SliderControls {

    constructor(mapApi: any, panelManager: any, templates: any, slider: any) {
        this.mapApi = mapApi;

        mapApi.agControllerRegister('LockSliderCtrl', function($scope: any) {
            // because ng-if not accessible from within the element, create scope on the parent element
            $scope.$parent.ctrl = { value: { isLocked: slider.lock }}

            // toggle lock setting to lock left anchor
            this.lock = () => {
                slider.lock = !slider.lock;
                $scope.$parent.ctrl.value.isLocked = !$scope.$parent.ctrl.value.isLocked;
            };
        });

        mapApi.agControllerRegister('LoopSliderCtrl', function($scope: any) {
            // because ng-if not accessible from within the element, create scope on the parent element
            $scope.$parent.ctrl = { value: { isLooped: slider.loop }}

            // toggle loop setting to play animation in loop
            this.loop = () => {
                slider.loop = !slider.loop;
                $scope.$parent.ctrl.value.isLooped = !$scope.$parent.ctrl.value.isLooped;

                // set class to show button is active/inactive
                const elem = mapApi.fgpMapObj.esriMap.root.parentElement.parentElement.getElementsByClassName('slider-loop-control')[0];
                elem.getElementsByTagName('md-icon')[0].classList.toggle('slider-loop-control-active');
            };
        });

        mapApi.agControllerRegister('StepSliderCtrl', function() {
            // step previous or next
            this.step = (direction: string) => { slider.step(direction); }
        });

        mapApi.agControllerRegister('PlaySliderCtrl', function($scope: any) {
            // because ng-if not accessible from within the element, create scope on the parent element
            $scope.$parent.ctrl = { value: { isPlaying: false }}

            // get play state from observable and force update
            slider.getPlayState().subscribe(value => {
                $scope.$parent.ctrl.value.isPlaying = value;

                // apply timeout because sometime scope is not applied
                setTimeout(() => { $scope.$parent.$apply(); });
            });

            // start play
            this.play = () => {
                slider.play(!$scope.$parent.ctrl.value.isPlaying);
            }
        });

        mapApi.agControllerRegister('RefreshSliderCtrl', function() {
            // toggle settings panel
            this.refresh = () => { slider.refresh(); }
        });

        mapApi.agControllerRegister('DelaySliderCtrl', function() {
            // set selected delay
            this.selectedDelay = slider.delay;
            this.selectDelay = () => { slider.delay =  this.selectedDelay; }
        });

        mapApi.agControllerRegister('ExportSliderCtrl', function() {
            // toggle export gif switch
            this.export = slider.export;
            this.selectExport = () => { slider.export = this.export; }
        });

        const barControls = panelManager.body.find('.slider-controls');
        for (let template of templates) {
            if (template.includes('slider-delay-control')) {
                // add delay control to play control div
                barControls.find('.slider-play-control').append(this.compileTemplate(template));
            } else if (template.includes('slider-loop-control')) {
                // add loop control to play control div
                barControls.find('.slider-play-control').prepend(this.compileTemplate(template));
            } else {
                barControls.append(this.compileTemplate(template));
            }
        }
    }

    compileTemplate(template): JQuery<HTMLElement> {
        let temp = $(template);
        this.mapApi.$compile(temp);
        return temp;
    }
}

export interface SliderControls {
    mapApi: any;
}
