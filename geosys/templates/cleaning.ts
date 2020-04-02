



export const formNettoyage:string = 
`<div ng-controller="SubmitNetCtrl as ctrl7">
    <div ng-style="ctrl1.SelectedMenuC" class="Geosys-div-Button" ng-click="ctrl1.ShowHideCl()">
        <h2>{{ 'plugins.geosys.nettoyage' | translate }}</h2>
    </div>
    <div ng-show="ctrl1.IsVisibleCL" ng-style="ctrl1.bgEnv" class="Geosys-extractspace">
        <form name="cleaningform">
            <div class="rv-subsection">
                <md-input-container class="Geosys-ddlshowEX">
                    <label>{{ 'plugins.geosys.themet' | translate }}</label>
                    <md-select 
                    ng-model="ctrl7.selectedItemA" 
                    ng-change="ctrl7.setList()" 
                    id="theme" 
                    required>
                        <md-option ng-repeat="item in ctrl7.itemsA" ng-value="item.value" ng-selected="ctrl7.itemsA.indexOf(item) == 0">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>

                <md-input-container class="Geosys-ddlshowEX">
                    <label>{{ 'plugins.geosys.idUT' | translate }}</label>
                    <md-select
                    ng-model="ctrl7.selectedItemB"
                    required>
                        <md-option ng-repeat="item in ctrl7.itemsB" ng-value="item.value">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>

                <md-input-container class="Geosys-submitbtn">
                    <md-button class="md-primary md-raised" style="float: right;"
                    ng-click="ctrl7.submitNett(); ctrl1.ShowHideCl(); ctrl1.setColorCl()" ng-disabled="cleaningform.$invalid">
                        {{ 'plugins.geosys.submit' | translate }}
                        <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                    </md-button>
                </md-input-container>
            </div>
        </form>
    </div>        
</div>
`;