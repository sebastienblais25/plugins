export const formPlanifier = `
<div ng-controller="submitFromP as ctrl2">
    <div ng-style="SelectedMenuP" class="divButton" ng-click="ctrl1.ShowHide()">
        <h2>{{ 'plugins.geosys.planif' | translate }}</h2>
    </div>
    <div ng-show="IsVisibleP" ng-style="bgEnv">
        <div>
            <md-input-container class="ddlshow">
                <label>{{ 'plugins.geosys.themet' | translate }}</label>
                <md-select 
                
                ng-model="ctrl2.selectedItemC" 
                ng-change="ctrl2.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.geosys.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl2.itemsC" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
        </div>

        <div>
        <md-input-container class="largeur">
            <label>{{ 'plugins.geosys.idUT' | translate }}</label>
            <input type="text" name="idUt" id="idUt" ng-value="ctrl2.idut" placeholder="Where ...">
        </md-input-container>
        </div>

        <div>
            <md-input-container class="largeur">
                <label>{{ 'plugins.geosys.typeTrv' | translate }}</label>
                <md-select 
                
                ng-model="ctrl2.selectedItemD" 
                id="theme" 
                placeholder="{{ 'plugins.geosys.typeTrv' | translate }}">
                    <md-option ng-repeat="item in ctrl2.itemsD" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
        </div>

        <div>
                <span class="classeslist advanced">{{ 'plugins.geosys.classe' | translate }}</span><md-checkbox ng-model="ctrl2.listeclasse" aria-label="checkall" class="md-secondary checklist" ng-click="ctrl2.toggleAll()"></md-checkbox>
                <div class="planning">
                    <md-list-item class="itemlist" ng-repeat="class in ctrl2.classes">
                        <span class="largeurlist">{{ class.name }}</span>
                        <md-checkbox class="md-secondary checklist" aria-label="{{ class.name }}" ng-model="class.wanted"></md-checkbox>
                    </md-list-item>
                </div>
        </div>
        
        <div>
        <md-input-container class="datfinfield">
            <label>{{ 'plugins.geosys.datefinprv' | translate }}</label>
            <md-datepicker type="date" name="dfp" ng-model="ctrl2.dfp" placeholder="{{ 'plugins.geosys.datefinprv' | translate }}"></md-datepicker>
        </md-input-container>
        </div>

        <div>
        <md-input-container class="largeur">
            <label>{{ 'plugins.geosys.where' | translate }}</label>
            <input type="text" name="wherep" ng-model="ctrl2.wherep" value="" placeholder="Where ...">
        </md-input-container>
        </div>
        <span style="margin-top: 0px;" class="advanced">{{ 'plugins.geosys.geome' | translate }}</span>
        <div class='geomMenu'>
            <div class="geomDivIn1">
                <md-checkbox class="geomCB" ng-model="ctrl2.inputchecked" aria-label="inputchk" ng-click='ctrl2.inputchck()'></md-checkbox>
                <md-input-container class="containerclass1"> 
                    <input type="text" name="geomp" ng-model="ctrl2.geomp" class="geominput" aria-label="geometry" ng-disabled="!(ctrl2.inputchecked)"> 
                </md-input-container>
            </div>
            <div class="geomDivIn1">
                <md-checkbox class="geomCB" ng-model="ctrl2.drawingchecked" aria-label="drwchk" ng-click='ctrl2.drawchck()'></md-checkbox>
                <div style="padding-top: 10px;" ">Drawing</div>
                <div style="margin-left:35px; padding-top:5px;margin-top: 0px;" class="advanced"> Shapefile(.zip)</div>
            </div>
            <div class="geomDivIn">
                <div class="containerclass"> 
                    <md-checkbox class="geomCB" ng-model="ctrl2.filechecked" aria-label="mptchk" ng-click='ctrl2.importchck()'></md-checkbox>
                    <input  type="file" id="fileshp" ng-model="ctrl2.filshp" accept=".zip" class="inputshape" ng-disabled="!(ctrl2.filechecked)"/>
                    <md-button ng-click="ctrl2.loadshp()" class="btnShape md-raised" ng-disabled="!(ctrl2.filechecked)">Import</md-button>
                </div>
            </div>
        </div>
        
        <div>
        <md-input-container class="submitbtn">
            <md-button class="md-primary md-raised" style="float: right;"
            ng-click="ctrl2.submitFormP()">
                {{ 'plugins.geosys.submit' | translate }}
                <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
            </md-button>
        </md-input-container>
        </div>
    </div>
</div>`;