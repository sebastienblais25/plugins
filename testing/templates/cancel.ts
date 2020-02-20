


export const formCancel:string = `
<div ng-controller="cancelStep as ctrl8">
    <div ng-style="SelectedMenu" class="divButton" ng-click="ctrl8.ShowHide()">
        <h2>{{ 'plugins.testing.annuler' | translate }}</h2>
    </div>
    <div ng-show="IsVisible" ng-style="bgEnv" class="extractspace">
        <div class="rv-subsection">
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl8.selectedItemA" 
                ng-change="ctrl8.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.testing.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl8.itemsA" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.idUT' | translate }}</label>
                <md-select
                ng-model="ctrl8.selectedItemB"
                ng-change="ctrl8.setListB()"
                placeholder="{{ 'plugins.testing.idUT' | translate }}">
                    <md-option ng-repeat="item in ctrl8.itemsB" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.postput' | translate }}</label>
                <md-select
                ng-model="ctrl8.stepCan"
                placeholder="{{ 'plugins.testing.postput' | translate }}">
                    <md-option value="P">Planning</md-option>
                    <md-option value="E">Extract</md-option>
                    <md-option value="D">Delivery</md-option>
                    <md-option value="C">Create</md-option>
                    <md-option value="V">Validate</md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="submitbtn">
                <md-button class="md-primary md-button"
                ng-click="ctrl8.submitCan()">
                    {{ 'plugins.testing.submit' | translate }}
                    <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>    
</div>
</div>
`;