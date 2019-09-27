import { SliderBar } from './slider-bar';

/**
 * ...
 */
export class SliderControls {

    constructor(mapApi: any, panelManager: any, templates: any) {
        this.mapApi = mapApi;

        mapApi.agControllerRegister('LockSliderCtrl', function($scope) {
            this.a = {
                isLocked: true
            };

            // toggle lock setting to lock left anchor
            this.lock = () => { SliderBar.getInstance().lock = !SliderBar.getInstance().lock; this.a.isLocked = !this.a.isLocked; console.log(`isLocked: ${this.a.isLocked}`)};
        });

        mapApi.agControllerRegister('StepSliderCtrl', function() {
            // toggle settings panel
            this.step = (direction: string) => { SliderBar.getInstance().step(direction); }
        });

        mapApi.agControllerRegister('PlaySliderCtrl', function() {
            // toggle settings panel
            this.play = () => { console.log('play'); }
        });

        mapApi.agControllerRegister('RefreshSliderCtrl', function() {
            // toggle settings panel
            this.refresh = () => { console.log('refresh'); }
        });

        mapApi.agControllerRegister('DelaySliderCtrl', function() {
            // toggle settings panel
            // TODO: check ng-model
            this.selectedDelay = () => { console.log('select ' + this.selectedDelay); }
            this.selectDelay =() => { console.log('select ' + this.selectedDelay); }
        });

        mapApi.agControllerRegister('ExportSliderCtrl', function() {
            // toggle settings panel
            this.export = () => { console.log('export'); }
        });

        const barControls = panelManager.body.find('.slider-controls');
        for (let template of templates) {
            barControls.append(this.compileTemplate(template));
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
