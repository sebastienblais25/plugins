// panels templates: slider (bar and controls), hitogram and settings
export const SLIDER_TEMPLATE = `
<div rv-focus-exempt class="rv-rangeslider">
    <div class="toggle-control"></div>
    <div class="slider-content">
        <div class="slider-bar">
            <div id="nouislider" class="slider-widget"></div>
            <div class="slider-controls"></div>
        </div>
    </div>
</div>`;

export  const SETTINGS_PANEL_TEMPLATE = `
<div class="slider-settings">
    <div class="slider-global"></div>
    <div class="slider-layers"></div>
</div>`;

export  const HISTO_PANEL_TEMPLATE = `
<div class="slider-histo">
    <div id="histo">HISTOGRAM</div>
</div>`;

// toggle controls to show/hide settings and histogram panels
export const TOGGLE_SETTINGS_TEMPLATE = `
<div class="slider-control">
    <md-button
        ng-controller="ToggleSettingCtrl as ctrl"
        aria-label="{{ 'plugins.rangeSlider.settings' | translate }}"
        class="md-icon-button primary"
        ng-click="ctrl.toggleSettings()">
        <md-tooltip>{{ 'plugins.rangeSlider.settings' | translate }}</md-tooltip>
        <md-icon md-svg-src="maps:layers"></md-icon>
    </md-button>
</div>`;

export const TOGGLE_HISTO_TEMPLATE = `
<div class="slider-control">
    <md-button
        ng-controller="ToggleHistoCtrl as ctrl"
        aria-label="{{ 'plugins.rangeSlider.histo' | translate }}"
        class="md-icon-button primary"
        ng-click="ctrl.toggleHisto()">
        <md-tooltip>{{ 'plugins.rangeSlider.histo' | translate }}</md-tooltip>
        <md-icon>${createSVG('histo')}</md-icon>
    </md-button>
</div>`;

// slider bar controls (lock, previous, next, play/pause, refresh, delay, export gif)
export const LOCK_BAR_TEMPLATE = `
<div class="slider-bar-control slider-lock-control">
    <md-button
        ng-controller="LockSliderCtrl as ctrl"
        ng-if="ctrl.a.isLocked === true"
        aria-label="{{ 'plugins.rangeSlider.bar.lock' | translate }}"
        class="md-icon-button primary"
        ng-click="ctrl.lock()">
        <md-tooltip>{{ 'plugins.rangeSlider.bar.lock' | translate }}</md-tooltip>
        <md-icon>${createSVG('lock')}</md-icon>
    </md-button>
    <md-button
        ng-controller="LockSliderCtrl as ctrl"
        ng-if="!ctrl.a.isLocked"
        aria-label="{{ 'plugins.rangeSlider.bar.unlock' | translate }}"
        class="md-icon-button primary"
        ng-click="ctrl.lock()">
        <md-tooltip>{{ 'plugins.rangeSlider.bar.unlock' | translate }}</md-tooltip>
        <md-icon>${createSVG('lockOpen')}</md-icon>
    </md-button>
</div>`;

export const PREVIOUS_BAR_TEMPLATE = `
<div class="slider-bar-control">
    <md-button
        ng-controller="StepSliderCtrl as ctrl"
        aria-label="{{ 'plugins.rangeSlider.bar.previous' | translate }}"
        class="md-icon-button primary"
        ng-click="ctrl.step('down')">
        <md-tooltip>{{ 'plugins.rangeSlider.bar.previous' | translate }}</md-tooltip>
        <md-icon>${createSVG('previous')}</md-icon>
    </md-button>
</div>`;

export const NEXT_BAR_TEMPLATE = `
<div class="slider-bar-control">
    <md-button
        ng-controller="StepSliderCtrl as ctrl"
        aria-label="{{ 'plugins.rangeSlider.bar.foward' | translate }}"
        class="md-icon-button primary"
        ng-click="ctrl.step('up')">
        <md-tooltip>{{ 'plugins.rangeSlider.bar.foward' | translate }}</md-tooltip>
        <md-icon>${createSVG('next')}</md-icon>
    </md-button>
</div>`;

export const PLAY_BAR_TEMPLATE = `
<div class="slider-bar-control">
    <md-button
        ng-controller="PlaySliderCtrl as ctrl"
        ng-if="self.isPlaying"
        aria-label="{{ 'plugins.rangeSlider.bar.play' | translate }}"
        class="md-icon-button primary"
        ng-click="ctrl.pause()">
        <md-tooltip>{{ 'plugins.rangeSlider.bar.play' | translate }}</md-tooltip>
        <md-icon>${createSVG('play')}</md-icon>
    </md-button>
    <md-button
        ng-controller="PlaySliderCtrl as ctrl"
        ng-if="!self.isPlaying"
        aria-label="{{ 'plugins.rangeSlider.bar.pause' | translate }}"
        class="md-icon-button primary"
        ng-click="ctrl.play()">
        <md-tooltip>{{ 'plugins.rangeSlider.bar.pause' | translate }}</md-tooltip>
        <md-icon>${createSVG('pause')}</md-icon>
    </md-button>
</div>`;

export const REFRESH_BAR_TEMPLATE = `
<div class="slider-bar-control slider-refresh-control">
    <md-button
        ng-controller="RefreshSliderCtrl as ctrl"
        aria-label="{{ 'plugins.rangeSlider.bar.refresh' | translate }}"
        class="md-icon-button primary rv-slider-refresh"
        ng-click="ctrl.refresh()">
        <md-tooltip>{{ 'plugins.rangeSlider.bar.refresh' | translate }}</md-tooltip>
        <md-icon>${createSVG('refresh')}</md-icon>
    </md-button>
</div>`;

export const DELAY_BAR_TEMPLATE = `
<div ng-controller="DelaySliderCtrl as ctrl" class="slider-bar-control">
    <md-input-container class="md-block" md-no-float flex>
        <label>{{ 'plugins.rangeSlider.bar.delay' | translate }}</label>
        <md-select
            aria-label="{{ 'plugins.rangeSlider.bar.delay' | translate }}"
            ng-model="ctrl.selectedDelay"
            ng-change="ctrl.selectDelay()">
            <md-option ng-repeat="(key, value) in { 3000: '3 sec', 5000: '5 sec', 7000: '7 sec' }" ng-value="{{ key }}" ng-selected="{{ key }} === 5000">
                {{ value }}
            </md-option>
        </md-select>
    </md-input-container>
</div>`;

export const EXPORT_BAR_TEMPLATE = `
<div class="slider-bar-control">
    <md-switch
        ng-controller="ExportSliderCtrl as ctrl"
        aria-label="{{ 'plugins.rangeSlider.histo' | translate }}"
        class="rv-slider-switch"
        ng-class="md-primary"
        ng-model="ctrl.export">
        {{ 'plugins.rangeSlider.histo' | translate }}
        <md-tooltip>{{ 'plugins.rangeSlider.histo' | translate }}</md-tooltip>
    </md-switchn>
</div>`;

function createSVG(icon): string {
    const svg = {
        'histo': '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path>',
        'lock': '<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>',
        'lockOpen': '<path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"></path>',
        'next': '<path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path>',
        'previous': '<path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path>',
        'play': '<path d="M8 5v14l11-7z"></path>',
        'pause': '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>',
        'refresh': '<path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path>'
    };

    return `<svg xmlns="http://www.w3.org/2000/svg" fit="" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" focusable="false">
            <g id="slider${icon}">${svg[icon]}</g></svg>`;
}

// slider settings controls (type, interval, limit)
export const INTERVAL_TEMPLATE = `
<div ng-controller="IntervalCtrl as ctrl">
    <md-input-container class="md-block" md-no-float flex>
        <label>{{ 'plugins.rangeSlider.histo' | translate }}</label>
        <md-select
            aria-label="{{ 'plugins.rangeSlider.histo' | translate }}" translate
            ng-model="ctrl.activeLayer.interval"
            md-on-close="ctrl.updateInterval()">
            <md-option ng-repeat="t in ctrl.intervals" ng-value="{{ t }}" ng-selected="{{ t }} === 10">
                {{ t }}
            </md-option>
        </md-select>
    </md-input-container>
</div>`;

export const LIMITS_TEMPLATE = createControl('limit');

// layers settings controls (layers, fields, range )
export const LAYERS_LIST_TEMPLATE = `
<div ng-controller="LayersListCtrl as ctrl" class="slider-item-name">
    <md-input-container class="md-block" md-no-float flex>
        <label>{{ 'slider.settings.layer' | translate }}</label>
        <md-select
            aria-label="{{ 'slider.settings.layer' | translate }}" translate
            ng-model="self.selectedLayerId"
            ng-change="self.updateLayer()">
            <md-option ng-repeat="(key, value) in self.sliderService.layersName" ng-value="key" ng-selected="$index === 0">
                    {{ value }}
            </md-option>
        </md-select>
    </md-input-container>
</div>`;

export const LAYERS_FIELDS_TEMPLATE = `
<div ng-controller="LayersFieldsCtrl as ctrl" class="slider-item-filter">
    <md-input-container class="md-block" md-no-float flex>
        <label>{{ 'slider.settings.field' | translate }}</label>
        <md-select
            aria-label="{{ 'slider.settings.field' | translate }}" translate
            ng-model="self.activeLayer.slider.field"
            md-on-close="self.updateAttribute()">
            <md-option ng-repeat="(key, value) in self.activeLayer.slider.fields" ng-value="key">
                    {{ value }}
            </md-option>
        </md-select>
    </md-input-container>
</div>`;

export const LAYERS_RANGE_TEMPLATE = createControl('range');

function createControl(type: string) {
    return `<div ng-controller="${type.charAt(0).toUpperCase()}${type.slice(1)}Ctrl as ctrl">
                <div ng-if="ctrl.selectedType === 'number'">
                    <md-input-container>
                        <input type="number" md-no-asterisk="true"
                            aria-label="{{ 'slider.settings.${type}min' | translate }}" translate
                            ng-pattern="/\d/"
                            step="any"
                            placeholder="{{ 'slider.settings.${type}min' | translate }}"
                            ng-model="ctrl.activeLayer.slider.${type}.number.min"
                            ng-model-options="{ debounce: { default: 750, blur: 0 } }"
                            ng-change="ctrl.update${type}()">
                    </md-input-container>
                    <md-input-container>
                        <input type="number" md-no-asterisk="true"
                            aria-label="{{ 'slider.settings.limitmax' | translate }}" translate
                            ng-pattern="/\d/"
                            step="any"
                            placeholder="{{ 'slider.settings.limitmax' | translate }}"
                            ng-model="ctrl.activeLayer.slider.${type}.number.max"
                            ng-model-options="{ debounce: { default: 750, blur: 0 } }"
                            ng-change="ctrl.update${type}()">
                    </md-input-container>
                </div>
                <div ng-if="ctrl.selectedType === 'date'">
                    <md-input-container>
                        <label>{{ 'slider.settings.${type}min' | translate }}</label>
                        <md-datepicker
                            ng-click="ctrl.prevent($event)"
                            ng-change="ctrl.update${type}()"
                            ng-model="ctrl.activeLayer.slider.${type}.date.min"
                            md-placeholder="{{ 'slider.settings.${type}min' | translate }}">
                    </md-datepicker>
                    </md-input-container>
                    <md-input-container>
                        <label>{{ 'slider.settings.${type}max' | translate }}</label>
                        <md-datepicker
                            ng-click="ctrl.prevent($event)"
                            ng-change="ctrl.update${type}()"
                            ng-model="ctrl.activeLayer.slider.${type}.date.max"
                            md-placeholder="{{ 'slider.settings.${type}max' | translate }}">
                        </md-datepicker>
                    </md-input-container>
                </div>
            </div>`
};

export const SETTING_TEMPLATEZZZ = `
<div ng-show="self.sliderService.isSettingOpen">
    <div class="rv-slider-limits" style="display:flex">

            <div ng-if="self.selectedType === 'number'">
                <md-input-container>
                    <input type="number" md-no-asterisk="true"
                        aria-label="{{ 'slider.settings.limitmin' | translate }}" translate
                        ng-pattern="/\d/"
                        step="any"
                        placeholder="{{ 'slider.settings.limitmin' | translate }}"
                        ng-model="self.activeLayer.slider.limits.number.min"
                        ng-model-options="{ debounce: { default: 750, blur: 0 } }"
                        ng-change="self.updateLimits()">
                 </md-input-container>
                <md-input-container>
                    <input type="number" md-no-asterisk="true"
                        aria-label="{{ 'slider.settings.limitmax' | translate }}" translate
                        ng-pattern="/\d/"
                        step="any"
                        placeholder="{{ 'slider.settings.limitmax' | translate }}"
                        ng-model="self.activeLayer.slider.limits.number.max"
                        ng-model-options="{ debounce: { default: 750, blur: 0 } }"
                        ng-change="self.updateLimits()">
                </md-input-container>
            </div>
            <div ng-if="self.selectedType === 'date'">
                <md-input-container>
                    <label>{{ 'slider.settings.limitmin' | translate }}</label>
                    <md-datepicker
                        ng-click="self.prevent($event)"
                        ng-change="self.updateLimits()"
                        ng-model="self.activeLayer.slider.limits.date.min"
                        md-placeholder="{{ 'slider.settings.limitmin' | translate }}">
                </md-datepicker>
                </md-input-container>
                <md-input-container>
                    <label>{{ 'slider.settings.limitmax' | translate }}</label>
                    <md-datepicker
                        ng-click="self.prevent($event)"
                        ng-change="self.updateLimits()"
                        ng-model="self.activeLayer.slider.limits.date.max"
                        md-placeholder="{{ 'slider.settings.limitmax' | translate }}">
                    </md-datepicker>
                </md-input-container>
            </div>
    </div>
    <md-divider></md-divider>
    <ul class="rv-list rv-slider-list">
        <li class="rv-slider-list-item">

            <div ng-if="self.selectedType === 'number'">
                <md-input-container>
                    <input type="number" md-no-asterisk="true"
                        aria-label="{{ 'slider.settings.rangemin' | translate }}" translate
                        ng-pattern="/\d/"
                        step="any"
                        placeholder="{{ 'slider.settings.rangemin' | translate }}"
                        ng-model="self.activeLayer.slider.ranges.number.min"
                        ng-model-options="{ debounce: { default: 750, blur: 0 } }"
                        ng-change="self.updateRange()">
                </md-input-container>
                <md-input-container>
                    <input type="number" md-no-asterisk="true"
                        aria-label="{{ 'slider.settings.rangemax' | translate }}" translate
                        ng-pattern="/\d/"
                        step="any"
                        placeholder="{{ 'slider.settings.rangemax' | translate }}"
                        ng-model="self.activeLayer.slider.ranges.number.max"
                        ng-model-options="{ debounce: { default: 750, blur: 0 } }"
                        ng-change="self.updateRange()">
                </md-input-container>
            </div>
            <div ng-if="self.selectedType === 'date'">
                <md-input-container>
                    <label>{{ 'slider.settings.rangemin' | translate }}</label>
                    <md-datepicker
                        ng-click="self.prevent($event)"
                        ng-change="self.updateRange()"
                        ng-model="self.activeLayer.slider.ranges.date.min"
                        md-placeholder="{{ 'slider.settings.rangemin' | translate }">
                    </md-datepicker>
                </md-input-container>
                <md-input-container>
                    <label>{{ 'slider.settings.rangemax' | translate }}</label>
                    <md-datepicker
                        ng-click="self.prevent($event)"
                        ng-change="self.updateRange()"
                        ng-model="self.activeLayer.slider.ranges.date.max"
                        md-placeholder="{{ 'slider.settings.rangemax' | translate }}">
                    </md-datepicker>
                </md-input-container>
            </div>
            <md-input-container>
                <label>{{ 'slider.settings.selected' | translate }}</label>
                <input type="string" readonly
                    aria-label="{{ 'slider.settings.selected' | translate }}" translate
                    value="{{ self.activeLayer.slider.selectCount }} - {{ self.activeLayer.slider.percentCount }}%">
                </input>
            </md-input-container>
        </li>
    </ul>
    <md-divider></md-divider>
</div>
`;