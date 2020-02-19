


export const formCreerMD:string = `
<div ng-controller="submitFromC as ctrl6">
    <div ng-style="SelectedMenu" class="divButton" ng-click="ctrl6.ShowHide()">
        <h2>{{ 'plugins.testing.creer' | translate }}</h2>
    </div>
    <div ng-show="IsVisible" ng-style="bgEnv">
        <div class="rv-subsection">

            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl6.selectedItemE" 
                ng-change="ctrl6.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.testing.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl6.itemsE" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.idUT' | translate }}</label>
                <md-select
                ng-model="ctrl6.selectedItemF"
                ng-change="ctrl6.setList()"
                placeholder="{{ 'plugins.testing.idUT' | translate }}">
                    <md-option ng-repeat="item in ctrl6.itemsF" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <div>
                <span class="classeslistEX">{{ 'plugins.testing.source' | translate }}</span><md-checkbox aria-label="checkall" ng-model="ctrl6.listeSources" class="md-secondary checklist" ng-click="ctrl6.toggleAllS()"></md-checkbox>
                <div class="divclasse">
                    <md-list-item class="itemlist" ng-repeat="source in ctrl6.sources">
                        <span class="largeurlist">{{ source.name }}</span>
                        <md-checkbox class="md-secondary checklist" aria-label="{{ source.name }}" ng-model="source.wanted"></md-checkbox>
                    </md-list-item>
                </div>
            </div>

            <div>
                <span class="classeslistEX">{{ 'plugins.testing.precision' | translate }}</span><md-checkbox aria-label="checkall" ng-model="ctrl6.listePrecision" class="md-secondary checklist" ng-click="ctrl6.toggleAllP()"></md-checkbox>
                <div class="divclasse">
                    <md-list-item class="itemlist" ng-repeat="precision in ctrl6.precisions">
                        <span class="largeurlist">{{ precision.name }}</span>
                        <md-checkbox class="md-secondary checklist" aria-label="{{ precision.name }}" ng-model="precision.wanted"></md-checkbox>
                    </md-list-item>
                </div>
            </div>

            <div>
                <span class="classeslistEX">{{ 'plugins.testing.contrainte' | translate }}</span><md-checkbox aria-label="checkall" ng-model="ctrl6.listeContrainte" class="md-secondary checklist" ng-click="ctrl6.toggleAllC()"></md-checkbox>
                <div class="divclasse">
                    <md-list-item class="itemlist" ng-repeat="contrainte in ctrl6.contraintes">
                        <span class="largeurlist">{{ contrainte.name }}</span>
                        <md-checkbox class="md-secondary checklist" aria-label="{{ contrainte.name }}" ng-model="contrainte.wanted"></md-checkbox>
                    </md-list-item>
                </div>
            </div>

            
            <md-input-container class="submitbtn">
                <md-button class="md-primary md-button"
                ng-click="ctrl6.submitFormC()">
                    {{ 'plugins.testing.submit' | translate }}
                    <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>
</div>

`;