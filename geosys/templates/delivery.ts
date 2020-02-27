

export const formDelivery = `
<div ng-controller="submitFromD as ctrl5">
    <div ng-style="SelectedMenuD" class="divButton" ng-click="ctrl1.ShowHideD()">
        <h2>{{ 'plugins.geosys.delivery' | translate }}</h2>
    </div>
    <div ng-show="IsVisibleD" ng-style="bgEnv">
        <div class="rv-subsection">
            
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.geosys.postput' | translate }}</label>
                <md-select
                ng-model="ctrl5.typeOper"
                placeholder="{{ 'plugins.geosys.postput' | translate }}">
                    <md-option value="Insert">{{ 'plugins.geosys.insert' | translate }}</md-option>
                    <md-option value="Update">{{ 'plugins.geosys.update' | translate }}</md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.geosys.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl5.selectedItemE" 
                ng-change="ctrl5.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.geosys.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl5.itemsE" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.geosys.idUT' | translate }}</label>
                <md-select
                ng-model="ctrl5.selectedItemF"
                ng-change="ctrl5.setList()"
                placeholder="{{ 'plugins.geosys.idUT' | translate }}">
                    <md-option ng-repeat="item in ctrl5.itemsF" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <div>
                <label class="advanced">{{ 'plugins.geosys.fileMD' | translate }}</label>
                <input  type="file" id="fileMD"/>
            </div>
            <div>
                <label class="advanced">{{ 'plugins.geosys.fileGDB' | translate }}</label>
                <input type="file" id="filefgdb"/>
            </div>
            
            <div ng-click="ctrl5.ShowHideAdvanced()" class="advanced">
                <span>Advanced Settings</span>
            </div>
            <div ng-show="IsVisibleASP">
                <md-input-container class="ddlshowEX">
                    <label>{{ 'plugins.geosys.envir' | translate }}</label>
                    <md-select 
                    class="envSelect"
                    ng-model="ctrl5.selectedItemENT" 
                    id="envE" 
                    placeholder="{{ 'plugins.geosys.envir' | translate }}">
                        <md-option ng-repeat="item in ctrl5.itemsENT" ng-value="item.value">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>
            </div>
            
            <md-input-container class="submitbtn">
                <md-button class="md-primary md-raised" style="float: right;"
                ng-click="ctrl5.submitFormD()">
                    {{ 'plugins.geosys.submit' | translate }}
                    <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>
</div>

`;