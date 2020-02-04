/*
loginmenu = The form for the login
formExtraire = The form for extraction
formPlanifier =  The form for the planning
formDelivery = The from for the delivery
*/

export const loginmenu:string= `
<div ng-controller="connexionCtrl as ctrl">
    <div><h2>{{ 'plugins.testing.login' | translate }}</h2></div>
    <div>{{ 'plugins.testing.username' | translate }} : </div>
    <div><input type="text" id="username" placeholder="{{ 'plugins.testing.username' | translate }}"/></div>
    <div>{{ 'plugins.testing.password ' | translate }} : </div>
    <div><input type="password" id="password" placeholder="{{ 'plugins.testing.password ' | translate }}"/></div>

    <div class="rv-subsection">
        <md-button class="md-primary md-button"
        ng-click="ctrl.submitConn()">
            {{ 'plugins.testing.submit' | translate }}
            <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
        </md-button>

    </div>
</div>
`


export const formExtraire:string = 
`<div ng-controller="SubmitCtrl as ctrl">
    <div class="divButton" id="testclick" ng-click="ctrl.openplan()">
        <h2>{{ 'plugins.testing.planif' | translate }}</h2>
        à enlever
    </div> 

    <div class="divButton" ng-click="ctrl.ShowHide()">
        <h2>{{ 'plugins.testing.extrac' | translate }}</h2>
    </div>
    <div ng-show="IsVisible">
        <div class="rv-subsection">
            <div>{{ 'plugins.testing.envir' | translate }}</div>
            <div>
                <select type="text" id="env" placeholder="Select something">
                    {dropdownenv}
                </select>
            </div>
        </div>
        
        <div class="rv-subsection">
            <div>{{ 'plugins.testing.themet' | translate }}</div>
            <md-select 
             ng-model="ctrl.selectedItemA" 
             ng-change="ctrl.setList()" 
             id="theme" 
             placeholder="Select something">
                <md-option ng-repeat="item in ctrl.itemsA" ng-value="item.value">
                    {{ item.name }}
                </md-option>
            </md-select>
            </br>
            <div>{{ 'plugins.testing.idUT' | translate }}</div>
            <md-select
             ng-model="ctrl.selectedItemB"
             ng-change="ctrl.setListB()">
                <md-option ng-repeat="item in ctrl.itemsB" ng-value="item.value">
                    {{ item.name }}
                </md-option>
            </md-select>

        </div>
            
        <div class="rv-subsection">
            <div>{{ 'plugins.testing.clip' | translate }}</div>
            <div><input type="checkbox" name="clip" id="clip" value="non" checked="oui"/></div>
        </div>

        <div class="rv-subsection">
            <div>{{ 'plugins.testing.where' | translate }}</div>
            <div><input type="text" name="whereclause" id="whereclause" value="" placeholder="Where ..."/></div>
        </div>
        
        <div class="rv-subsection">
            <div>{{ 'plugins.testing.geome' | translate }}</div>
            <div><input type="text" name="geom" id="geom" value="geom"/></div>
        </div>
        
        <div class="rv-subsection">
            <md-button class="md-primary md-button"
            ng-click="ctrl.submitForm()">
                {{ 'plugins.testing.submit' | translate }}
                <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
            </md-button>

        </div>
    </div>        
</div>`;


export const formPlanifier = `
<div ng-controller="submitFromP as ctrl">
<div id="testclick"><h2>{{ 'plugins.testing.planif' | translate }}</h2></div>
<div class="">
    <div class="rv-subsection">
        <div>{{ 'plugins.testing.envir' | translate }}</div>
        <div>
            <select type="text" id="envp" placeholder="Select something">
                {dropdownenv}
            </select>
        </div>
    </div>

    <div class="rv-subsection">
        <div>{{ 'plugins.testing.themet' | translate }}</div>
        <div>
            <select type="text" id="themep" placeholder="Select something">
                {dropdowntheme}
            </select>
        </div>
    </div>

    <div class="rv-subsection">
        <div>{{ 'plugins.testing.idUT' | translate }}</div>
        <div>
            <select type="text" id="idUtp" placeholder="Select something">
                {dropdownid}
            </select>
        </div>
    </div>

    <div class="rv-subsection">
        <div>{{ 'plugins.testing.typeTrv' | translate }}</div>
        <div><input type="text" name="ttv" id="ttv" value="" placeholder="Where ..."/></div>
    </div>

    <div class="rv-subsection">
        <div>{{ 'plugins.testing.classe' | translate }}</div>
        <div><input type="text" name="classes" id="classes" value="" placeholder="List of classes"/></div>
    </div>

    <div class="rv-subsection">
        <div>{{ 'plugins.testing.datefinprv' | translate }}</div>
        <div><input type="date" name="dfp" id="dfp" value="" placeholder=""/></div>
    </div>

    <div class="rv-subsection"> 
        <div>{{ 'plugins.testing.where' | translate }}</div>
        <div><input type="text" name="wherep" id="wherep" value="" placeholder="Where ..."/></div>
    </div>

    <div class="rv-subsection">
        <div>{{ 'plugins.testing.geome' | translate }}</div>
        <div><input type="text" name="geomp" id="geomp" value="" placeholder="Geom"/></div>
    </div>

    <div class="rv-subsection">
        <md-button class="md-primary md-button"
        ng-click="ctrl.cancelFormP()">
            {{ 'plugins.testing.cancel' | translate }}
            <md-tooltip>{{ 'plugins.testing.cancel' | translate }}</md-tooltip>
        </md-button>

        <md-button class="md-primary md-button"
        ng-click="ctrl.submitFormP()">
            {{ 'plugins.testing.submit' | translate }}
            <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
        </md-button>
    </div>
</div>
</div>`;


export const formDevilvery = `
<div>
    <div>
        <h2></h2>
    </div>



</div>
`;
