"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLIDER_TEMPLATE = "\n<div>\n    <div class=\"rv-slider-content\">\n    <div id=\"drawing\"></div>\n        <div class=\"rv-slider-buttons\">\n            <md-button\n                ng-controller=\"ShowLayerCtrl as ctrl\"\n                aria-label=\"{{ 'plugins.slider.settings' | translate }}\"\n                class=\"md-icon-button primary\"\n                ng-click=\"ctrl.toggleSettings()\">\n                <md-tooltip>{{ 'plugins.slider.settings' | translate }}</md-tooltip>\n                <md-icon md-svg-src=\"maps:layers\"></md-icon>\n            </md-button>\n            <md-button\n                aria-label=\"{{ 'plugins.slider.histo' | translate }}\"\n                class=\"md-icon-button primary\"\n                ng-click=\"self.toggleHisto()\">\n                <md-tooltip>{{ 'plugins.slider.histo' | translate }}</md-tooltip>\n                <md-icon md-svg-src=\"image:photo\"></md-icon>\n            </md-button>\n        </div>\n        <div class=\"rv-slider-controls\">\n            <div class=\"rv-slider-histo\" ng-show=\"self.sliderService.isHistoOpen\">\n                <div id=\"histo\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n";
exports.TOGGLE_SETTINGS_TEMPLATE = "\n<div class=\"slider-control\">\n    <md-button\n        ng-controller=\"ToggleSettingCtrl as ctrl\"\n        aria-label=\"{{ 'plugins.slider.settings' | translate }}\"\n        class=\"md-icon-button black\"\n        ng-click=\"ctrl.toggleSettings()\">\n        <md-tooltip>{{ 'plugins.slider.settings' | translate }}</md-tooltip>\n        <md-icon md-svg-src=\"maps:layers\"></md-icon>\n    </md-button>\n</div>\n";
exports.TOGGLE_HISTO_TEMPLATE = "\n\n";
exports.LOCK_SLIDER_TEMPLATE = "\n\n";
exports.PREVIOUS_SLIDER_TEMPLATE = "\n\n";
exports.NEXT_SLIDER_TEMPLATE = "\n\n";
exports.PLAY_SLIDER_TEMPLATE = "\n\n";
exports.PAUSE_SLIDER_TEMPLATE = "\n\n";
exports.REFRESH_SLIDER_TEMPLATE = "\n\n";
exports.DELAY_SLIDER_TEMPLATE = "\n\n";
// // export const SLIDER_TEMPLATE = `
// <div ng-if="self.isActive">
//     <rv-slider-setting></rv-slider-setting>
//     <div class="rv-slider-content">
//         <div class="rv-slider-buttons">
//             <md-button
//ng-controller="ShowLayerCtrl as ctrl"
//                 aria-label="{{ 'plugins.timeSlider.settings' | translate }}"
//                 class="md-icon-button primary"
//                 ng-click="ctrl.toggleSettings()">
//                 <md-tooltip>{{ 'plugins.timeSlider.settings' | translate }}</md-tooltip>
//                 <md-icon md-svg-src="maps:layers"></md-icon>
//             </md-button>
//             <md-button
//                 aria-label="{{ 'plugins.timeSlider.settings' | translate }}"
//                 class="md-icon-button primary"
//                 ng-click="self.toggleHisto()">
//                 <md-tooltip>{{ 'plugins.timeSlider.settings' | translate }}</md-tooltip>
//                 <md-icon md-svg-src="image:photo"></md-icon>
//             </md-button>
//         </div>
//         <div class="rv-slider-controls">
//             <div class="rv-slider-histo" ng-show="self.sliderService.isHistoOpen">
//                 <div id="drawing"></div>
//             </div>
//             <rzslider rz-slider-model="self.sliderService.slider.minValue"
//                 rz-slider-high="self.sliderService.slider.maxValue"
//                 rz-slider-options="self.sliderService.slider.options">
//             </rzslider>
//             <rv-slider-bar></rv-slider-bar>
//         </div>
//     </div>
// </div>
// `;
// export const SETTING_TEMPLATE = `
// <div ng-show="self.sliderService.isSettingOpen">
//     <div class="rv-slider-limits" style="display:flex">
//             <md-input-container class="md-block" md-no-float flex>
//                 <label>{{ 'slider.settings.interval' | translate }}</label>
//                 <md-select
//                     aria-label="{{ 'slider.settings.interval' | translate }}" translate
//                     ng-model="self.activeLayer.slider.interval"
//                     md-on-close="self.updateInterval()">
//                     <md-option ng-repeat="(key, value) in {} | rvRange: '2':'100'" ng-value="{{ key }}" ng-selected="{{ key }} === 10">
//                         {{ value }}
//                         </md-option>
//                 </md-select>
//             </md-input-container>
//             <div ng-if="self.selectedType === 'number'">
//                 <md-input-container>
//                     <input type="number" md-no-asterisk="true"
//                         aria-label="{{ 'slider.settings.limitmin' | translate }}" translate
//                         ng-pattern="/\d/"
//                         step="any"
//                         placeholder="{{ 'slider.settings.limitmin' | translate }}"
//                         ng-model="self.activeLayer.slider.limits.number.min"
//                         ng-model-options="{ debounce: { default: 750, blur: 0 } }"
//                         ng-change="self.updateLimits()">
//                  </md-input-container>
//                 <md-input-container>
//                     <input type="number" md-no-asterisk="true"
//                         aria-label="{{ 'slider.settings.limitmax' | translate }}" translate
//                         ng-pattern="/\d/"
//                         step="any"
//                         placeholder="{{ 'slider.settings.limitmax' | translate }}"
//                         ng-model="self.activeLayer.slider.limits.number.max"
//                         ng-model-options="{ debounce: { default: 750, blur: 0 } }"
//                         ng-change="self.updateLimits()">
//                 </md-input-container>
//             </div>
//             <div ng-if="self.selectedType === 'date'">
//                 <md-input-container>
//                     <label>{{ 'slider.settings.limitmin' | translate }}</label>
//                     <md-datepicker
//                         ng-click="self.prevent($event)"
//                         ng-change="self.updateLimits()"
//                         ng-model="self.activeLayer.slider.limits.date.min"
//                         md-placeholder="{{ 'slider.settings.limitmin' | translate }}">
//                 </md-datepicker>
//                 </md-input-container>
//                 <md-input-container>
//                     <label>{{ 'slider.settings.limitmax' | translate }}</label>
//                     <md-datepicker
//                         ng-click="self.prevent($event)"
//                         ng-change="self.updateLimits()"
//                         ng-model="self.activeLayer.slider.limits.date.max"
//                         md-placeholder="{{ 'slider.settings.limitmax' | translate }}">
//                     </md-datepicker>
//                 </md-input-container>
//             </div>
//     </div>
//     <md-divider></md-divider>
//     <ul class="rv-list rv-slider-list">
//         <li class="rv-slider-list-item">
//             <div class="rv-slider-item-name">
//                 <md-input-container class="md-block" md-no-float flex>
//                     <label>{{ 'slider.settings.layer' | translate }}</label>
//                     <md-select
//                         aria-label="{{ 'slider.settings.layer' | translate }}" translate
//                         ng-model="self.selectedLayerId"
//                         ng-change="self.updateLayer()">
//                         <md-option ng-repeat="(key, value) in self.sliderService.layersName" ng-value="key" ng-selected="$index === 0">
//                                 {{ value }}
//                         </md-option>
//                     </md-select>
//                 </md-input-container>
//             </div>
//             <div class="rv-slider-item-filter">
//                 <md-input-container class="md-block" md-no-float flex>
//                     <label>{{ 'slider.settings.field' | translate }}</label>
//                     <md-select
//                         aria-label="{{ 'slider.settings.field' | translate }}" translate
//                         ng-model="self.activeLayer.slider.field"
//                         md-on-close="self.updateAttribute()">
//                         <md-option ng-repeat="(key, value) in self.activeLayer.slider.fields" ng-value="key">
//                                 {{ value }}
//                         </md-option>
//                     </md-select>
//                 </md-input-container>
//             </div>
//             <div ng-if="self.selectedType === 'number'">
//                 <md-input-container>
//                     <input type="number" md-no-asterisk="true"
//                         aria-label="{{ 'slider.settings.rangemin' | translate }}" translate
//                         ng-pattern="/\d/"
//                         step="any"
//                         placeholder="{{ 'slider.settings.rangemin' | translate }}"
//                         ng-model="self.activeLayer.slider.ranges.number.min"
//                         ng-model-options="{ debounce: { default: 750, blur: 0 } }"
//                         ng-change="self.updateRange()">
//                 </md-input-container>
//                 <md-input-container>
//                     <input type="number" md-no-asterisk="true"
//                         aria-label="{{ 'slider.settings.rangemax' | translate }}" translate
//                         ng-pattern="/\d/"
//                         step="any"
//                         placeholder="{{ 'slider.settings.rangemax' | translate }}"
//                         ng-model="self.activeLayer.slider.ranges.number.max"
//                         ng-model-options="{ debounce: { default: 750, blur: 0 } }"
//                         ng-change="self.updateRange()">
//                 </md-input-container>
//             </div>
//             <div ng-if="self.selectedType === 'date'">
//                 <md-input-container>
//                     <label>{{ 'slider.settings.rangemin' | translate }}</label>
//                     <md-datepicker
//                         ng-click="self.prevent($event)"
//                         ng-change="self.updateRange()"
//                         ng-model="self.activeLayer.slider.ranges.date.min"
//                         md-placeholder="{{ 'slider.settings.rangemin' | translate }">
//                     </md-datepicker>
//                 </md-input-container>
//                 <md-input-container>
//                     <label>{{ 'slider.settings.rangemax' | translate }}</label>
//                     <md-datepicker
//                         ng-click="self.prevent($event)"
//                         ng-change="self.updateRange()"
//                         ng-model="self.activeLayer.slider.ranges.date.max"
//                         md-placeholder="{{ 'slider.settings.rangemax' | translate }}">
//                     </md-datepicker>
//                 </md-input-container>
//             </div>
//             <md-input-container>
//                 <label>{{ 'slider.settings.selected' | translate }}</label>
//                 <input type="string" readonly
//                     aria-label="{{ 'slider.settings.selected' | translate }}" translate
//                     value="{{ self.activeLayer.slider.selectCount }} - {{ self.activeLayer.slider.percentCount }}%">
//                 </input>
//             </md-input-container>
//         </li>
//     </ul>
//     <md-divider></md-divider>
// </div>
// `;
// export const BAR_TEMPLATE = `
// <md-button
//     ng-if="self.isLocked"
//     aria-label="{{ 'slider.bar.lock' | translate }}"
//     class="md-icon-button primary"
//     ng-click="self.lock()">
//     <md-tooltip>{{ 'slider.bar.lock' | translate }}</md-tooltip>
//     <md-icon md-svg-src="action:lock"></md-icon>
// </md-button>
// <md-button
//     ng-if="!self.isLocked"
//     aria-label="{{ 'slider.bar.unlock' | translate }}"
//     class="md-icon-button primary"
//     ng-click="self.lock()">
//     <md-tooltip>{{ 'slider.bar.unlock' | translate }}</md-tooltip>
//     <md-icon md-svg-src="action:lock_open"></md-icon>
// </md-button>
// <div class="rv-slider-barcontrols">
//     <md-button
//         aria-label="{{ 'slider.bar.previous' | translate }}"
//         class="md-icon-button primary"
//         ng-click="self.step('down')">
//         <md-tooltip>{{ 'slider.bar.previous' | translate }}</md-tooltip>
//          <md-icon md-svg-src="av:skip_previous"></md-icon>
//     </md-button>
//     <md-button
//         ng-if="self.isPlaying"
//         aria-label="{{ 'slider.bar.play' | translate }}"
//         class="md-icon-button primary"
//         ng-click="self.pause()">
//         <md-tooltip>{{ 'slider.bar.play' | translate }}</md-tooltip>
//         <md-icon md-svg-src="av:pause"></md-icon>
//     </md-button>
//     <md-button
//         ng-if="!self.isPlaying"
//         aria-label="{{ 'slider.bar.pause' | translate }}"
//         class="md-icon-button primary"
//         ng-click="self.play()">
//         <md-tooltip>{{ 'slider.bar.pause' | translate }}</md-tooltip>
//         <md-icon md-svg-src="av:play_arrow"></md-icon>
//     </md-button>
//     <md-button
//         aria-label="{{ 'slider.bar.foward' | translate }}"
//         class="md-icon-button primary"
//         ng-click="self.step('up')">
//         <md-tooltip>{{ 'slider.bar.foward' | translate }}</md-tooltip>
//         <md-icon md-svg-src="av:skip_next"></md-icon>
//     </md-button>
//     <md-input-container class="md-block" md-no-float flex>
//         <label>{{ 'slider.bar.delay' | translate }}</label>
//         <md-select
//             aria-label="{{ 'slider.bar.delay' | translate }}"
//             ng-model="self.selectedDelay">
//             <md-option ng-repeat="(key, value) in {} | rvRange: '3':'10':'1':'1000':' sec'" ng-value="{{ key }}" ng-selected="{{ key }} === 5000">
//                 {{ value }}
//             </md-option>
//             </md-select>
//         </md-input-container>
// </div>
// <md-switch
//     aria-label="Gif"
//     class="rv-slider-switch"
//     ng-class="md-primary"
//     ng-model="self.gif">
//     {{ 'slider.bar.gif' | translate }}
//     <md-tooltip>{{ 'slider.tooltip.gif' | translate }}</md-tooltip>
// </md-switch>
// <md-button
//     aria-label="{{ 'slider.bar.refresh' | translate }}"
//     class="md-icon-button primary rv-slider-refresh"
//     ng-click="self.refresh()">
//     <md-tooltip>{{ 'slider.bar.refresh' | translate }}</md-tooltip>
//     <md-icon md-svg-src="navigation:refresh"></md-icon>
// </md-button>
// `;
