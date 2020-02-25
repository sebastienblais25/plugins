export const formPlanifier = `
<div ng-controller="submitFromP as ctrl2">
    <div ng-style="SelectedMenuP" class="divButton" ng-click="ctrl2.ShowHide()">
        <h2>{{ 'plugins.geosys.planif' | translate }}</h2>
    </div>
    <div ng-show="IsVisible" ng-style="bgEnv">
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

        <div>
        <md-input-container class="largeur">
            <label>{{ 'plugins.geosys.geome' | translate }}</label>
            <input type="text" name="geomp" ng-model="ctrl2.geomp" placeholder="Geom" class="inputshape"> 
            <md-button ng-click="ctrl2.toggleDraw()" class="btnCopy md-raised">Copy</md-button>
        </md-input-container>
        
        <label class="advanced">Shapefile(.zip)</label>
        <input  type="file" id="fileshp" ng-model="ctrl2.filshp" accept=".zip" class="inputshape"/>
        <md-button ng-click="ctrl2.loadshp()" class="btnShape md-raised">add shp</md-button>
        
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