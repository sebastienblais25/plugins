


export const formCancel:string = `
<div ng-controller="cancelStep as ctrl8">
    <div ng-style="SelectedMenuCa" class="Geosys-div-Button-Uti" ng-click="ctrl1.ShowHideCa()">
        <h2>{{ 'plugins.geosys.annuler' | translate }}</h2>
    </div>
    <div ng-show="IsVisibleCA" ng-style="bgEnv" class="Geosys-extractspace">
        <div class="rv-subsection">
            <md-input-container class="Geosys-ddlshowEX">
                <label>{{ 'plugins.geosys.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl8.selectedItemA" 
                ng-change="ctrl8.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.geosys.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl8.itemsA" ng-value="item.value" ng-selected="ctrl8.itemsA.indexOf(item) == 0">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="Geosys-ddlshowEX">
                <label>{{ 'plugins.geosys.idUT' | translate }}</label>
                <md-select
                ng-model="ctrl8.selectedItemB"
                ng-change="ctrl8.setListB()"
                placeholder="{{ 'plugins.geosys.idUT' | translate }}">
                    <md-option ng-repeat="item in ctrl8.itemsB" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="Geosys-ddlshowEX">
                <label>{{ 'plugins.geosys.postput' | translate }}</label>
                <md-select
                ng-model="ctrl8.stepCan"
                placeholder="{{ 'plugins.geosys.postput' | translate }}">
                    <md-option value="P">Planning</md-option>
                    <md-option value="E">Extract</md-option>
                    <md-option value="D">Delivery</md-option>
                    <md-option value="C">Create</md-option>
                    <md-option value="V">Validate</md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="Geosys-submitbtn">
                <md-button class="md-primary md-raised" style="float: right;"
                ng-click="ctrl8.submitCan(); ctrl1.ShowHideCa()">
                    {{ 'plugins.geosys.submit' | translate }}
                    <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>    
</div>
`;