export const validateform:string = `
<div ng-controller="submitFromV as ctrl9">
    <div ng-style="SelectedMenuV" class="divButtonUti" ng-click="ctrl1.ShowHideV()">
        <h2>{{ 'plugins.geosys.valider' | translate }}</h2>
    </div>
    <div ng-show="IsVisibleV" ng-style="bgEnv">
        <form name="valiform">
            <div class="rv-subsection">
                <md-input-container class="ddlshowEX">
                    <label>{{ 'plugins.geosys.themet' | translate }}</label>
                    <md-select 
                    ng-model="ctrl9.selectedItemE" 
                    ng-change="ctrl9.setList()" 
                    id="theme" 
                    required>
                        <md-option ng-repeat="item in ctrl9.itemsE" ng-value="item.value" ng-selected="ctrl9.itemsE.indexOf(item) == 0">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container class="ddlshowEX">
                    <label>{{ 'plugins.geosys.idUT' | translate }}</label>
                    <md-select
                    ng-model="ctrl9.selectedItemF"
                    ng-change="ctrl9.setList()"
                    required>
                        <md-option ng-repeat="item in ctrl9.itemsF" ng-value="item.value">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>

                
                    <label class="advanced">{{ 'plugins.geosys.filejson' | translate }}</label>
                    <input  type="file" id="fileJSON" accept=".json"/>
                
                <md-input-container class="submitbtn">
                    <md-button class="md-primary md-raised" style="float: right;"
                    ng-click="ctrl9.submitFormV(); ctrl1.ShowHideV()" ng-disabled="valiform.$invalid">
                        {{ 'plugins.geosys.submit' | translate }}
                        <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                    </md-button>
                </md-input-container>
            </div>
        </form>
    </div>
</div>
`;