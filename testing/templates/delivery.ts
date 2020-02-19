

export const formDelivery = `
<div ng-controller="submitFromD as ctrl5">
    <div ng-style="SelectedMenu" class="divButton" ng-click="ctrl5.ShowHide()">
        <h2>{{ 'plugins.testing.delivery' | translate }}</h2>
    </div>
    <div ng-show="IsVisible" ng-style="bgEnv">
        <div class="rv-subsection">
            
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.postput' | translate }}</label>
                <md-select
                ng-model="ctrl5.typeOper"
                placeholder="{{ 'plugins.testing.postput' | translate }}">
                    <md-option value="Insert">{{ 'plugins.testing.insert' | translate }}</md-option>
                    <md-option value="Update">{{ 'plugins.testing.update' | translate }}</md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl5.selectedItemE" 
                ng-change="ctrl5.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.testing.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl5.itemsE" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.idUT' | translate }}</label>
                <md-select
                ng-model="ctrl5.selectedItemF"
                ng-change="ctrl5.setList()"
                placeholder="{{ 'plugins.testing.idUT' | translate }}">
                    <md-option ng-repeat="item in ctrl5.itemsF" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            
                <label>{{ 'plugins.testing.fileMD' | translate }}</label>
                <input  type="file" id="fileMD"/>
        
            
                <label>{{ 'plugins.testing.fileGDB' | translate }}</label>
                <input type="file" id="filefgdb"/>
            
            <md-input-container class="submitbtn">
                <md-button class="md-primary md-button"
                ng-click="ctrl5.submitFormD()">
                    {{ 'plugins.testing.submit' | translate }}
                    <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>
</div>

`;