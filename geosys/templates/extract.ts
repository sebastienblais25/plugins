


export const formExtraireP:string = 
`<div ng-controller="SubmitCtrl as ctrl3">
    <div ng-style="SelectedMenuE" class="divButton" ng-click="ctrl1.ShowHideEX()">
        <h2>{{ 'plugins.geosys.extrac' | translate }}</h2>
    </div>
    <div ng-show="IsVisibleEP" ng-style="bgEnv" class="extractspace">
        <div class="rv-subsection">
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.geosys.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl3.selectedItemA" 
                ng-change="ctrl3.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.geosys.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl3.itemsA" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.geosys.idUT' | translate }}</label>
                <md-select
                ng-model="ctrl3.selectedItemB"
                ng-change="ctrl3.setListB()"
                placeholder="{{ 'plugins.geosys.idUT' | translate }}">
                    <md-option ng-repeat="item in ctrl3.itemsB" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <div ng-click="ctrl3.ShowHideAdvanced()" class="advanced">
                <span>Advanced Settings</span>
            </div>
            <div ng-show="IsVisibleASP">
                <md-input-container class="ddlshowEX">
                    <label>{{ 'plugins.geosys.envir' | translate }}</label>
                    <md-select 
                    class="envSelect"
                    ng-model="ctrl3.selectedItemENT" 
                    id="envE" 
                    placeholder="{{ 'plugins.geosys.envir' | translate }}">
                        <md-option ng-repeat="item in ctrl3.itemsENT" ng-value="item.value">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>
            </div>
            

            <md-input-container class="submitbtn">
                <md-button class="md-primary md-raised" style="float: right;"
                ng-click="ctrl3.submitForm()">
                    {{ 'plugins.geosys.submit' | translate }}
                    <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>        
</div>`;


export const formExtraireSR:string = 
`<div ng-controller="SubmitExCtrl as ctrl4">
    <div ng-style="SelectedMenuEU" class="divButton" ng-click="ctrl1.ShowHideEXSR()">
        <h2>{{ 'plugins.geosys.extract' | translate }}</h2>
    </div>
    <div ng-show="IsVisibleSR" ng-style="bgEnv">
        <div class="rv-subsection">
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.geosys.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl4.selectedItemA" 
                ng-change="ctrl4.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.geosys.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl4.itemsA" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
            
            <div>
                <span class="classeslistEX">{{ 'plugins.geosys.classe' | translate }}</span><md-checkbox aria-label="checkall" ng-model="ctrl4.listeclasse" class="md-secondary checklist" ng-click="ctrl4.toggleAll()"></md-checkbox>
                <div class="divclasse">
                    <md-list-item class="itemlist" ng-repeat="class in ctrl4.classes">
                        <span class="largeurlist">{{ class.name }}</span>
                        <md-checkbox class="md-secondary checklist" aria-label="{{ class.name }}" ng-model="class.wanted"></md-checkbox>
                    </md-list-item>
                </div>
            </div>

            <md-input-container class="cbAlone">
                    <span class="classeslistEX">{{ 'plugins.geosys.clip' | translate }}</span><md-checkbox class="md-secondary checklist" ng-model="ctrl4.cbClip" aria-label="{{ 'plugins.geosys.clip' | translate }}"></md-checkbox>
            </md-input-container>

            <md-input-container class="largeur">
                <label>{{ 'plugins.geosys.where' | translate }}</label>
                <div><input type="text" ng-model="ctrl4.whereclause" value="" placeholder="Where ..."/></div>
            </md-input-container>
        
            <md-input-container class="largeur">
                <label>{{ 'plugins.geosys.geome' | translate }}</label>
                <div><input type="text" id="geomEx" ng-model="ctrl4.geomSR " placeholder="geom" class="inputshape"/></div>
                <md-button ng-click="ctrl4.copyToClip()" class="btnCopy md-raised">Copy</md-button>
            </md-input-container>

            <label>Shapefile(.zip)</label>
            <input  type="file" id="fileshpEX" ng-model="ctrl4.filshp" accept=".zip" class="inputshape"/>
            <md-button ng-click="ctrl4.loadshpEX()" class="btnShape md-raised">add shp</md-button>

            <div ng-click="ctrl4.ShowHideAdvanced()" class="advanced">
                <span>Advanced Settings</span>
            </div>
            <div ng-show="IsVisibleASP">
                <md-input-container class="ddlshowEX">
                    <label>{{ 'plugins.geosys.envir' | translate }}</label>
                    <md-select 
                    class="envSelect"
                    ng-model="ctrl4.selectedItemENT" 
                    id="envE" 
                    placeholder="{{ 'plugins.geosys.envir' | translate }}">
                        <md-option ng-repeat="item in ctrl4.itemsENT" ng-value="item.value">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>
            </div>

            <md-input-container class="submitbtn">
                <md-button class="md-primary md-raised" style="float: right;"
                ng-click="ctrl4.submitSRForm()">
                    {{ 'plugins.geosys.submit' | translate }}
                    <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>        
</div>`;
