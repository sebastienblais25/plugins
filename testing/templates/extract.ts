


export const formExtraireP:string = 
`<div ng-controller="SubmitCtrl as ctrl3">
    <div ng-style="SelectedMenu" class="divButton" ng-click="ctrl3.ShowHide()">
        <h2>{{ 'plugins.testing.extrac' | translate }}</h2>
    </div>
    <div ng-show="IsVisible" ng-style="bgEnv" class="extractspace">
        <div class="rv-subsection">
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl3.selectedItemA" 
                ng-change="ctrl3.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.testing.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl3.itemsA" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.idUT' | translate }}</label>
                <md-select
                ng-model="ctrl3.selectedItemB"
                ng-change="ctrl3.setListB()"
                placeholder="{{ 'plugins.testing.idUT' | translate }}">
                    <md-option ng-repeat="item in ctrl3.itemsB" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="submitbtn">
                <md-button class="md-primary md-button"
                ng-click="ctrl3.submitForm()">
                    {{ 'plugins.testing.submit' | translate }}
                    <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>        
</div>`;


export const formExtraireSR:string = 
`<div ng-controller="SubmitExCtrl as ctrl4">
    <div ng-style="SelectedMenu" class="divButton" ng-click="ctrl4.ShowHide()">
        <h2>{{ 'plugins.testing.extract' | translate }}</h2>
    </div>
    <div ng-show="IsVisible" ng-style="bgEnv">
        <div class="rv-subsection">
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl4.selectedItemA" 
                ng-change="ctrl4.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.testing.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl4.itemsA" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
            
            <div>
                <span class="classeslistEX">{{ 'plugins.testing.classe' | translate }}</span><md-checkbox aria-label="checkall" ng-model="ctrl4.listeclasse" class="md-secondary checklist" ng-click="ctrl4.toggleAll()"></md-checkbox>
                <div class="divclasse">
                    <md-list-item class="itemlist" ng-repeat="class in ctrl4.classes">
                        <span class="largeurlist">{{ class.name }}</span>
                        <md-checkbox class="md-secondary checklist" aria-label="{{ class.name }}" ng-model="class.wanted"></md-checkbox>
                    </md-list-item>
                </div>
            </div>

            <md-input-container class="cbAlone">
                    <span class="classeslistEX">{{ 'plugins.testing.clip' | translate }}</span><md-checkbox class="md-secondary checklist" ng-model="ctrl4.cbClip" aria-label="{{ 'plugins.testing.clip' | translate }}"></md-checkbox>
            </md-input-container>

            <md-input-container class="largeur">
                <label>{{ 'plugins.testing.where' | translate }}</label>
                <div><input type="text" ng-model="ctrl4.whereclause" value="" placeholder="Where ..."/></div>
            </md-input-container>
        
            <md-input-container class="largeur">
                <label>{{ 'plugins.testing.geome' | translate }}</label>
                <div><input type="text" id="geomEx" ng-model="geomSR " placeholder="geom"/></div>
            </md-input-container>

            <label>Shapefile(.zip)</label>
            <input  type="file" id="fileshpEX" ng-model="ctrl4.filshp" accept=".zip"/>
            <md-button ng-click="ctrl4.loadshpEX()">add shp</md-button>

            <md-input-container class="submitbtn">
                <md-button class="md-primary md-button"
                ng-click="ctrl4.submitSRForm()">
                    {{ 'plugins.testing.submit' | translate }}
                    <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>        
</div>`;
