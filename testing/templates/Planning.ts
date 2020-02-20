export const formPlanifier = `
<div ng-controller="submitFromP as ctrl2">
    <div ng-style="SelectedMenu" class="divButton" ng-click="ctrl2.ShowHide()">
        <h2>{{ 'plugins.testing.planif' | translate }}</h2>
    </div>
    <div ng-show="IsVisible" ng-style="bgEnv">
        <div>
            <md-input-container class="ddlshow">
                <label>{{ 'plugins.testing.themet' | translate }}</label>
                <md-select 
                
                ng-model="ctrl2.selectedItemC" 
                ng-change="ctrl2.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.testing.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl2.itemsC" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
        </div>

        <div>
        <md-input-container class="largeur">
            <label>{{ 'plugins.testing.idUT' | translate }}</label>
            <input type="text" name="idUt" id="idUt" ng-value="ctrl2.idut" placeholder="Where ...">
        </md-input-container>
        </div>

        <div>
            <md-input-container class="largeur">
                <label>{{ 'plugins.testing.typeTrv' | translate }}</label>
                <md-select 
                
                ng-model="ctrl2.selectedItemD" 
                id="theme" 
                placeholder="{{ 'plugins.testing.typeTrv' | translate }}">
                    <md-option ng-repeat="item in ctrl2.itemsD" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
        </div>

        <div>
                <span class="classeslist">{{ 'plugins.testing.classe' | translate }}</span><md-checkbox ng-model="ctrl2.listeclasse" aria-label="checkall" class="md-secondary checklist" ng-click="ctrl2.toggleAll()"></md-checkbox>
                <div class="planning">
                    <md-list-item class="itemlist" ng-repeat="class in ctrl2.classes">
                        <span class="largeurlist">{{ class.name }}</span>
                        <md-checkbox class="md-secondary checklist" aria-label="{{ class.name }}" ng-model="class.wanted"></md-checkbox>
                    </md-list-item>
                </div>
        </div>
        
        <div>
        <md-input-container class="datfinfield">
            <label>{{ 'plugins.testing.datefinprv' | translate }}</label>
            <md-datepicker type="date" name="dfp" ng-model="ctrl2.dfp" placeholder="{{ 'plugins.testing.datefinprv' | translate }}"></md-datepicker>
        </md-input-container>
        </div>

        <div>
        <md-input-container class="largeur">
            <label>{{ 'plugins.testing.where' | translate }}</label>
            <input type="text" name="wherep" ng-model="ctrl2.wherep" value="" placeholder="Where ...">
        </md-input-container>
        </div>

        <div>
        <md-input-container class="largeur">
            <label>{{ 'plugins.testing.geome' | translate }}</label>
            <input type="text" name="geomp" ng-model="ctrl2.geomp" value="" placeholder="Geom"> 
        </md-input-container>
        <md-input-container class="largeur">
            <md-checkbox ng-model="ctrl2.checkTool" ng-click="ctrl2.toggleDraw()">
                Drawing
            </md-checkbox>
        </md-input-container>
        </div>
        
        <label>Shapefile(.zip)</label>
        <input  type="file" id="fileshp" ng-model="ctrl2.filshp" accept=".zip"/>
        <md-button ng-click="ctrl2.loadshp()">add shp</md-button>
        
        <div>
        <md-input-container class="submitbtn">
            <md-button class="md-primary md-button"
            ng-click="ctrl2.submitFormP()">
                {{ 'plugins.testing.submit' | translate }}
                <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
            </md-button>
        </md-input-container>
        </div>
    </div>
</div>`;