export const validateform:string = `
<div ng-controller="submitFromV as ctrl9">
    <div ng-style="SelectedMenu" class="divButton" ng-click="ctrl9.ShowHide()">
        <h2>{{ 'plugins.testing.valider' | translate }}</h2>
    </div>
    <div ng-show="IsVisible" ng-style="bgEnv">
        <div class="rv-subsection">
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl9.selectedItemE" 
                ng-change="ctrl9.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.testing.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl9.itemsE" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.idUT' | translate }}</label>
                <md-select
                ng-model="ctrl9.selectedItemF"
                ng-change="ctrl9.setList()"
                placeholder="{{ 'plugins.testing.idUT' | translate }}">
                    <md-option ng-repeat="item in ctrl9.itemsF" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            
                <label>{{ 'plugins.testing.filejson' | translate }}</label>
                <input  type="file" id="fileJSON" accept=".json"/>
            
            <md-input-container class="submitbtn">
                <md-button class="md-primary md-button"
                ng-click="ctrl9.submitFormD()">
                    {{ 'plugins.testing.submit' | translate }}
                    <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>
</div>
`;