



export const formNettoyage:string = 
`<div ng-controller="SubmitNetCtrl as ctrl7">
    <div ng-style="SelectedMenu" class="divButton" ng-click="ctrl7.ShowHide()">
        <h2>{{ 'plugins.testing.nettoyage' | translate }}</h2>
    </div>
    <div ng-show="IsVisible" ng-style="bgEnv" class="extractspace">
        <div class="rv-subsection">
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl7.selectedItemA" 
                ng-change="ctrl7.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.testing.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl7.itemsA" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.idUT' | translate }}</label>
                <md-select
                ng-model="ctrl7.selectedItemB"
                ng-change="ctrl7.setListB()"
                placeholder="{{ 'plugins.testing.idUT' | translate }}">
                    <md-option ng-repeat="item in ctrl7.itemsB" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="submitbtn">
                <md-button class="md-primary md-button"
                ng-click="ctrl7.submitNett()">
                    {{ 'plugins.testing.submit' | translate }}
                    <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>        
</div>
</div>`;