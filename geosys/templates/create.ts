


export const formCreerMD:string = `
<div ng-controller="submitFromC as ctrl6">
    <div id="create" ng-style="ctrl1.SelectedMenuCr" class="Geosys-div-Button-Uti" ng-click="ctrl1.ShowHideCr()">
        <h2>{{ 'plugins.geosys.creer' | translate }}</h2>
    </div>
    <div ng-show="ctrl1.IsVisibleCR" ng-style="bgEnv">
        <div class="rv-subsection">

            <md-input-container class="Geosys-ddlshowEX">
                <label>{{ 'plugins.geosys.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl6.selectedItemE" 
                ng-change="ctrl6.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.geosys.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl6.itemsE" ng-value="item.value" ng-selected="ctrl6.itemsE.indexOf(item) == 0">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
            <md-input-container class="Geosys-ddlshowEX">
                <label>{{ 'plugins.geosys.idUT' | translate }}</label>
                <md-select
                ng-model="ctrl6.selectedItemF"
                ng-change="ctrl6.setList()"
                placeholder="{{ 'plugins.geosys.idUT' | translate }}">
                    <md-option ng-repeat="item in ctrl6.itemsF" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <div>
                <span class="Geosys-classeslistEX">{{ 'plugins.geosys.source' | translate }}</span><md-checkbox aria-label="checkall" ng-model="ctrl6.listeSources" class="md-secondary Geosys-checklist" ng-click="ctrl6.toggleAllS()"></md-checkbox>
                <div class="Geosys-div-classe">
                    <md-list-item class="Geosys-itemlist" ng-repeat="source in ctrl6.sources">
                        <span class="Geosys-largeurlist">{{ source.name }}</span>
                        <md-checkbox class="md-secondary Geosys-checklist" aria-label="{{ source.name }}" ng-model="source.wanted"></md-checkbox>
                    </md-list-item>
                </div>
            </div>

            <div>
                <span class="Geosys-classeslistEX">{{ 'plugins.geosys.precision' | translate }}</span><md-checkbox aria-label="checkall" ng-model="ctrl6.listePrecision" class="md-secondary Geosys-checklist" ng-click="ctrl6.toggleAllP()"></md-checkbox>
                <div class="Geosys-div-classe">
                    <md-list-item class="Geosys-itemlist" ng-repeat="precision in ctrl6.precisions">
                        <span class="Geosys-largeurlist">{{ precision.name }}</span>
                        <md-checkbox class="md-secondary Geosys-checklist" aria-label="{{ precision.name }}" ng-model="precision.wanted"></md-checkbox>
                    </md-list-item>
                </div>
            </div>

            <div>
                <span class="Geosys-classeslistEX">{{ 'plugins.geosys.contrainte' | translate }}</span><md-checkbox aria-label="checkall" ng-model="ctrl6.listeContrainte" class="md-secondary Geosys-checklist" ng-click="ctrl6.toggleAllC()"></md-checkbox>
                <div class="Geosys-div-classe">
                    <md-list-item class="Geosys-itemlist" ng-repeat="contrainte in ctrl6.contraintes">
                        <span class="Geosys-largeurlist">{{ contrainte.name }}</span>
                        <md-checkbox class="md-secondary Geosys-checklist" aria-label="{{ contrainte.name }}" ng-model="contrainte.wanted"></md-checkbox>
                    </md-list-item>
                </div>
            </div>

            
            <md-input-container class="Geosys-submitbtn">
                <md-button class="md-primary md-raised" style="float: right;"
                ng-click="ctrl6.submitFormC(); ctrl1.ShowHideCr(); ctrl1.setColorCr()">
                    {{ 'plugins.geosys.submit' | translate }}
                    <md-tooltip>{{ 'plugins.geosys.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>
</div>

`;