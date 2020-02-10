/*
loginmenu = The form for the login
formExtraire = The form for extraction
formPlanifier =  The form for the planning
formDelivery = The from for the delivery
*/

export const loginmenu:string= `

<div ng-controller="connexionCtrl as ctrl0">
    <div><h2>{{ 'plugins.testing.login' | translate }}</h2></div>
    <div>{{ 'plugins.testing.username' | translate }} : </div>
    <div><input type="text" id="username" placeholder="{{ 'plugins.testing.username' | translate }}"/></div>
    <div>{{ 'plugins.testing.password ' | translate }} : </div>
    <div><input type="password" id="password" placeholder="{{ 'plugins.testing.password ' | translate }}"/></div>

    <div class="rv-subsection">
        <md-button class="md-primary md-button"
        ng-click="ctrl0.submitConn()">
            {{ 'plugins.testing.submit' | translate }}
            <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
        </md-button>

    </div>
</div>`;

export const topmenu:string= `
<div ng-controller="topmenuCtrl as ctrl1"> 
    <div class="largeur">
        <md-select 
        ng-change="ctrl1.setEnv()" 
        ng-model="ctrl1.selectedItemENT" 
        id="env" 
        placeholder="{{ 'plugins.testing.envir' | translate }}">
            <md-option ng-repeat="item in ctrl1.itemsENT" ng-value="item.value" ng-selected="ctrl1.itemsENT.indexOf(item) == 0">
                {{ item.name }}
            </md-option>
        </md-select>
    </div>
    
`;

export const formPlanifier = `
<div ng-controller="submitFromP as ctrl2">
    <div class="divButton" ng-click="ctrl2.ShowHide()">
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
                    placeholder="Select a theme">
                        <md-option ng-repeat="item in ctrl2.itemsC" ng-value="item.value">
                            {{ item.name }}
                        </md-option>
                    </md-select>
                </md-container>
            </div>
            <div>
            <md-input-container class="largeur">
                <label>{{ 'plugins.testing.idUT' | translate }}</label>
                <input type="text" name="idUt" id="idUt" ng-value="ctrl2.idut" placeholder="Where ...">
            </md-container>
            </div>
            <div>
            <md-input-container class="largeur">
                <label>{{ 'plugins.testing.typeTrv' | translate }}</label>
                <input type="text" name="ttv" id="ttv" value="" placeholder="Where ...">
            </md-container>
            </div>

            <div>
                    <span class="classeslist">{{ 'plugins.testing.classe' | translate }}</span><md-checkbox class="md-secondary checklist" ng-model="ctrl2.classes.wanted"></md-checkbox>
                    <md-list-item class="itemlist" ng-repeat="class in ctrl2.classes">
                        <span class="largeurlist">{{ class.name }}</span>
                        <md-checkbox class="md-secondary checklist" aria-label="{{ class.name }}" ng-model="class.wanted"></md-checkbox>
                    </md-list-item>
            </div>
            
            <div>
            <md-input-container class="largeur">
                <label>{{ 'plugins.testing.datefinprv' | translate }}</label>
                <input type="date" name="dfp" id="dfp" value="" placeholder="">
            </md-container>
            </div>
            <div>
            <md-input-container class="largeur">
                <label>{{ 'plugins.testing.where' | translate }}</label>
                <input type="text" name="wherep" id="wherep" value="" placeholder="Where ...">
            </md-container>
            </div>
            <div>
            <md-input-container class="largeur">
                <label>{{ 'plugins.testing.geome' | translate }}</label>
                <input type="text" name="geomp" id="geomp" value="" placeholder="Geom"> 
            </md-container>
            <md-input-container>
                <md-checkbox ng-model="ctrl2.checkTool" ng-click="ctrl2.toggleDraw()">
                    Drawing
                </md-checkbox>
            </md-container>
            </div>
            <div>
            <md-input-container>
                <md-button class="md-primary md-button"
                ng-click="ctrl2.submitFormP()">
                    {{ 'plugins.testing.submit' | translate }}
                    <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
                </md-button>
            </md-container>
            </div>
        
    </div>
</div>`;


export const formExtraire:string = 
`<div ng-controller="SubmitCtrl as ctrl3">
    <div class="divButton" ng-click="ctrl3.ShowHide()">
        <h2>{{ 'plugins.testing.extrac' | translate }}</h2>
    </div>
    <div ng-show="IsVisible" ng-style="bgEnv">
        <div class="rv-subsection">

            <div>{{ 'plugins.testing.themet' | translate }}</div>
            <md-select 
             ng-model="ctrl3.selectedItemA" 
             ng-change="ctrl3.setList()" 
             id="theme" 
             placeholder="{{ 'plugins.testing.themet' | translate }}">
                <md-option ng-repeat="item in ctrl3.itemsA" ng-value="item.value">
                    {{ item.name }}
                </md-option>
            </md-select>
            
            <div>{{ 'plugins.testing.idUT' | translate }}</div>
            <md-select
             ng-model="ctrl3.selectedItemB"
             ng-change="ctrl3.setListB()"
             placeholder="{{ 'plugins.testing.idUT' | translate }}">
                <md-option ng-repeat="item in ctrl3.itemsB" ng-value="item.value">
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
            ng-click="ctrl3.submitForm()">
                {{ 'plugins.testing.submit' | translate }}
                <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
            </md-button>

        </div>
    </div>        
</div>`;


export const formDelivery = `
<div <div ng-controller="submitFromD as ctrl4">
    <div class="divButton" ng-click="ctrl4.ShowHide()">
        <h2>{{ 'plugins.testing.delivery' | translate }}</h2>
    </div>
    <div ng-show="IsVisible" ng-style="bgEnv">
        <div class="rv-subsection">
            <div>{{ 'plugins.testing.themet' | translate }}</div>
            <md-select 
            ng-model="ctrl4.selectedItemE" 
            ng-change="ctrl4.setList()" 
            id="theme" 
            placeholder="{{ 'plugins.testing.themet' | translate }}">
                <md-option ng-repeat="item in ctrl4.itemsE" ng-value="item.value">
                    {{ item.name }}
                </md-option>
            </md-select>
            </br>
            <div>{{ 'plugins.testing.idUT' | translate }}</div>
            <md-select
            ng-model="ctrl4.selectedItemF"
            ng-change="ctrl4.setList()"
            placeholder="{{ 'plugins.testing.idUT' | translate }}">
                <md-option ng-repeat="item in ctrl4.itemsF" ng-value="item.value">
                    {{ item.name }}
                </md-option>
            </md-select>
        </div>
    </div>
</div>
</div>
`;
