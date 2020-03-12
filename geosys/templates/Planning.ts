export const formPlanifier = `
<div ng-controller="submitFromP as ctrl2">
    <div ng-style="SelectedMenuP" class="divButton" ng-click="ctrl1.ShowHide()">
        <h2>{{ 'plugins.geosys.planif' | translate }}</h2>
    </div>
    <div ng-show="IsVisibleP" ng-style="bgEnv">
    <form name="planning">
        <div>
            <md-input-container class="ddlshow">
                <label>{{ 'plugins.geosys.themet' | translate }}</label>
                <md-select 
                
                ng-model="ctrl2.selectedItemC" 
                ng-change="ctrl2.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.geosys.themet' | translate }}" >
                    <md-option ng-repeat="item in ctrl2.itemsC" ng-value="item.value" ng-selected="ctrl2.itemsC.indexOf(item) == 0">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
        </div>

        <div>
        <md-input-container class="largeur">
            <label>{{ 'plugins.geosys.idUT' | translate }}<span class="errormess" ng-show="erridwuvs"> *you must add a working unit</span></label>
            <input type="text" name="idUt" id="idUt" ng-value="ctrl2.idut" placeholder="Where ...">
        </md-input-container>
        </div>

        <div>
            <md-input-container class="largeur">
                <label>{{ 'plugins.geosys.typeTrv' | translate }}<span class="errormess" ng-show="errwork"> *you must choose a working type</span></label>
                <md-select 
                name="typetrv"
                ng-model="ctrl2.selectedItemD"  
                placeholder="{{ 'plugins.geosys.typeTrv' | translate }}">
                    <md-option ng-repeat="item in ctrl2.itemsD" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
        </div>

        <div>
                <span class="classeslist"><span class="advanced">{{ 'plugins.geosys.classe' | translate }}</span><span class="errormess sizeerror" ng-show="errclass"> *you must choose at least one class</span></span><md-checkbox ng-model="ctrl2.listeclasse" aria-label="checkall" class="md-secondary checklist" ng-click="ctrl2.toggleAll()"></md-checkbox>
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
            <md-datepicker name="dfp" ng-model="ctrl2.dfp"></md-datepicker>
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
                    <input type="text" name="geomp" ng-model="ctrl2.geomp" class="geominput" aria-label="geometry" ng-disabled="!(ctrl2.inputchecked)" required> 
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
            ng-click="ctrl2.submitFormP(); ctrl1.ShowHide()" ng-disabled="planning.geomp.$invalid">
                {{ 'plugins.geosys.submit' | translate }}
                <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
            </md-button>
        </md-input-container>
        </div>
    </form>
    </div>
</div>`;