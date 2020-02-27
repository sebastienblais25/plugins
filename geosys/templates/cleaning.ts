



export const formNettoyage:string = 
`<div ng-controller="SubmitNetCtrl as ctrl7">
    <div ng-style="SelectedMenuC" class="divButton" ng-click="ctrl1.ShowHideCl()">
        <h2>{{ 'plugins.geosys.nettoyage' | translate }}</h2>
    </div>
    <div ng-show="IsVisibleCL" ng-style="bgEnv" class="extractspace">
        <div class="rv-subsection">
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.geosys.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl7.selectedItemA" 
                ng-change="ctrl7.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.geosys.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl7.itemsA" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.geosys.idUT' | translate }}</label>
                <md-select
                ng-model="ctrl7.selectedItemB"
                ng-change="ctrl7.setListB()"
                placeholder="{{ 'plugins.geosys.idUT' | translate }}">
                    <md-option ng-repeat="item in ctrl7.itemsB" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="submitbtn">
                <md-button class="md-primary md-raised" style="float: right;"
                ng-click="ctrl7.submitNett()">
                    {{ 'plugins.geosys.submit' | translate }}
                    <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>        
</div>
`;