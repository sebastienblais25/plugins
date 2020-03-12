


export const formExtraireP:string = 
`<div ng-controller="SubmitCtrl as ctrl3">
    <div ng-style="SelectedMenuE" class="divButton" ng-click="ctrl1.ShowHideEX()">
        <h2>{{ 'plugins.geosys.extrac' | translate }}</h2>
    </div>
    <div ng-show="IsVisibleEP" ng-style="bgEnv" class="extractspace">
        <form name="extractGeosys">
            <div class="rv-subsection">
                <md-input-container class="ddlshowEX">
                    <label>{{ 'plugins.geosys.themet' | translate }}</label>
                    <md-select 
                    ng-model="ctrl3.selectedItemA" 
                    ng-change="ctrl3.setList()" 
                    id="theme" 
                    required>
                        <md-option ng-repeat="item in ctrl3.itemsA" ng-value="item.value" ng-selected="ctrl3.itemsA.indexOf(item) == 0">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>

                <md-input-container class="ddlshowEX">
                    <label>{{ 'plugins.geosys.idUT' | translate }}</label><span class="errormess" ng-show="ErrorEx">you must add a working unit</span>
                    <md-select
                    ng-model="ctrl3.selectedItemB"
                    ng-change="ctrl3.setListB()"
                    required>
                        <md-option ng-repeat="item in ctrl3.itemsB" ng-value="item.value">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>

                <div ng-show="AdvancedVisible" ng-click="ctrl3.ShowHideAdvanced()" class="advanced">
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
                    ng-click="ctrl3.submitForm(); ctrl1.ShowHideEX()" ng-disabled="extractGeosys.$invalid">
                        {{ 'plugins.geosys.submit' | translate }}
                        <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                    </md-button>
                </md-input-container>
            </div>
        </form>
    </div>        
</div>`;


export const formExtraireSR:string = 
`<div ng-controller="SubmitExCtrl as ctrl4">
    <div ng-style="SelectedMenuEU" class="divButtonUti" ng-click="ctrl1.ShowHideEXSR()">
        <h2>{{ 'plugins.geosys.extract' | translate }}</h2>
    </div>
    <div ng-show="IsVisibleSR" ng-style="bgEnv">
        <form name="exSRform">
            <div class="rv-subsection">
                <md-input-container class="ddlshowEX">
                    <label>{{ 'plugins.geosys.themet' | translate }}</label>
                    <md-select 
                    ng-model="ctrl4.selectedItemA" 
                    ng-change="ctrl4.setList()" 
                    id="theme" 
                    placeholder="{{ 'plugins.geosys.themet' | translate }}">
                        <md-option ng-repeat="item in ctrl4.itemsA" ng-value="item.value" ng-selected="ctrl4.itemsA.indexOf(item) == 0">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-input-container>
                
                <div>
                <span class="classeslist"><span class="advanced">{{ 'plugins.geosys.classe' | translate }}</span><span class="errormess sizeerror" ng-show="errclassEX"> *you must choose at least one class</span></span><md-checkbox aria-label="checkall" ng-model="ctrl4.listeclasse" class="md-secondary checklist" ng-click="ctrl4.toggleAll()"></md-checkbox>
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
            
                <span style="margin-top: 0px;" class="advanced">{{ 'plugins.geosys.geome' | translate }}</span>
                <div class='geomMenu'>
                    <div class="geomDivIn1">
                        <md-checkbox class="geomCB" ng-model="ctrl4.inputchecked" aria-label="inputchk" ng-click='ctrl4.inputchck()'></md-checkbox>
                        <md-input-container class="containerclass1"> 
                            <input type="text" name="geomSR" ng-model="ctrl4.geomSR" class="geominput" aria-label="geometry" ng-disabled="!(ctrl4.inputchecked)" required> 
                        </md-input-container>
                    </div>
                    <div class="geomDivIn1">
                        <md-checkbox class="geomCB" ng-model="ctrl4.drawingchecked" aria-label="drwchk" ng-click='ctrl4.drawchck()'></md-checkbox>
                        <div style="padding-top: 10px;" ">Drawing</div>
                        <div style="margin-left:35px; padding-top:5px;margin-top: 0px;" class="advanced"> Shapefile(.zip)</div>
                    </div>
                    <div class="geomDivIn">
                        <div class="containerclass"> 
                            <md-checkbox class="geomCB" ng-model="ctrl4.filechecked" aria-label="mptchk" ng-click='ctrl4.importchck()'></md-checkbox>
                            <input  type="file" id="fileshpEX" ng-model="ctrl4.filshp" accept=".zip" class="inputshape" ng-disabled="!(ctrl4.filechecked)"/>
                            <md-button ng-click="ctrl4.loadshpEX()" class="btnShape md-raised" ng-disabled="!(ctrl4.filechecked)">Import</md-button>
                        </div>
                    </div>
                </div>

                <div ng-show="AdvancedVisible" ng-click="ctrl4.ShowHideAdvanced()" class="advanced">
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
                    ng-click="ctrl4.submitSRForm(); ctrl1.ShowHideEXSR()" ng-disabled="exSRform.geomSR.$invalid">
                        {{ 'plugins.geosys.submit' | translate }}
                        <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                    </md-button>
                </md-input-container>
            </div>
        </form>
    </div>        
</div>`;


