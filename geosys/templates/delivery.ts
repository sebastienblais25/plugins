

export const formDelivery = `
<div ng-controller="submitFromD as ctrl5">
    <div ng-style="SelectedMenuD" class="divButton" ng-click="ctrl1.ShowHideD()">
        <h2>{{ 'plugins.geosys.delivery' | translate }}</h2>
    </div>
    <div ng-show="IsVisibleD" ng-style="bgEnv">
        <form name="deliform">
            <div class="rv-subsection">
                
                <md-input-container class="ddlshowEX">
                    <label>{{ 'plugins.geosys.postput' | translate }}</label>
                    <md-select
                    ng-model="ctrl5.typeOper"
                    required>
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
                    required>
                        <md-option ng-repeat="item in ctrl5.itemsE" ng-value="item.value" ng-selected="ctrl5.itemsE.indexOf(item) == 0">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>
                <md-input-container class="ddlshowEX">
                    <label>{{ 'plugins.geosys.idUT' | translate }}</label>
                    <md-select
                    ng-model="ctrl5.selectedItemF"
                    required>
                        <md-option ng-repeat="item in ctrl5.itemsF" ng-value="item.value">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>

                <div>
                    <span><span class="advanced">{{ 'plugins.geosys.fileMD' | translate }}</span><span class="errormess sizeerror" ng-show="errMD">{{ 'plugins.geosys.errorFMD' | translate }}</span></span>
                    <input  type="file" id="fileMD" accept="json"/>
                </div>
                <div>
                    <span><span class="advanced">{{ 'plugins.geosys.fileGDB' | translate }}</span><span class="errormess sizeerror" ng-show="errFGDB">{{ 'plugins.geosys.errorFGDB' | translate }}</span></span>
                    <input type="file" id="filefgdb" accept="zip"/>
                </div>
                
                <div ng-show="AdvancedVisible" ng-click="ctrl5.ShowHideAdvanced()" class="advanced">
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
                            <md-option ng-repeat="item in ctrl5.itemsENT" ng-value="item.value" >
                                {{ item.name }}
                            </md-option>
                        </md-select>
                    </md-input-container>
                </div>
                
                <md-input-container class="submitbtn">
                    <md-button class="md-primary md-raised" style="float: right;"
                    ng-click="ctrl5.submitFormD(); ctrl1.ShowHideD()" ng-disabled="deliform.$invalid">
                        {{ 'plugins.geosys.submit' | translate }}
                        <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                    </md-button>
                </md-input-container>
            </div>
        </form>
    </div>
</div>

`;