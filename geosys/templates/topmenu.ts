

export const topmenu:string= `
<div ng-controller="topmenuCtrl as ctrl1"> 
    <div class="topmenu" id="topmenu">
        <div class="envDiv">
            <md-select 
            class="envSelect"
            ng-change="ctrl1.setEnv()" 
            ng-model="ctrl1.selectedItemENT" 
            id="env" 
            placeholder="{{ 'plugins.geosys.envir' | translate }}">
                <md-option ng-repeat="item in ctrl1.itemsENT" ng-value="item.value" ng-selected="ctrl1.itemsENT.indexOf(item) == 0">
                    {{ item.name }}
                </md-option>
            </md-select>
        </div>
        <div class="infoDiv" ng-click="ctrl1.openInfoUser()">
            <span>info user</span>
        </div>
        <div class="helpDiv" ng-click="ctrl1.openHelpUser()">
            <span>Help</span>
        </div>
    </div> 
`;