/*
loginmenu = The form for the login
topmenu = the menu on top to choose the environnement
formPlanifier =  The form for the planning
formExtraireP = The form for planned extraction
formExtraireP = The form for extraction without planning
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
    <div class="topmenu">
        <div class="envDiv">
            <md-select 
            class="envSelect"
            ng-change="ctrl1.setEnv()" 
            ng-model="ctrl1.selectedItemENT" 
            id="env" 
            placeholder="{{ 'plugins.testing.envir' | translate }}">
                <md-option ng-repeat="item in ctrl1.itemsENT" ng-value="item.value" ng-selected="ctrl1.itemsENT.indexOf(item) == 0">
                    {{ item.name }}
                </md-option>
            </md-select>
        </div>
        <div class="infoDiv">
            <span>info user</span>
        </div>
        <div class="helpDiv">
            <span>Help</span>
        </div>
    </div>   
`;

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
                <div class="divclasse">
                    <md-list-item class="itemlist" ng-repeat="class in ctrl2.classes">
                        <span class="largeurlist">{{ class.name }}</span>
                        <md-checkbox class="md-secondary checklist" aria-label="{{ class.name }}" ng-model="class.wanted"></md-checkbox>
                    </md-list-item>
                </div>
        </div>
        
        <div>
        <md-input-container class="datfinfield">
            <label>{{ 'plugins.testing.datefinprv' | translate }}</label>
            <input type="date" name="dfp" id="dfp" value="" placeholder="">
        </md-input-container>
        </div>

        <div>
        <md-input-container class="largeur">
            <label>{{ 'plugins.testing.where' | translate }}</label>
            <input type="text" name="wherep" id="wherep" value="" placeholder="Where ...">
        </md-input-container>
        </div>

        <div>
        <md-input-container class="largeur">
            <label>{{ 'plugins.testing.geome' | translate }}</label>
            <input type="text" name="geomp" id="geomp" value="" placeholder="Geom"> 
        </md-input-container>
        <md-input-container>
            <md-checkbox ng-model="ctrl2.checkTool" ng-click="ctrl2.toggleDraw()">
                Drawing
            </md-checkbox>
        </md-input-container>
        </div>

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
                <div><input type="text" name="whereclause" id="whereclause" value="" placeholder="Where ..."/></div>
            </md-input-container>
        
            <md-input-container class="largeur">
                <label>{{ 'plugins.testing.geome' | translate }}</label>
                <div><input type="text" name="geom" id="geom" placeholder="geom"/></div>
            </md-input-container>
        
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


export const formDelivery = `
<div <div ng-controller="submitFromD as ctrl5">
    <div ng-style="SelectedMenu" class="divButton" ng-click="ctrl5.ShowHide()">
        <h2>{{ 'plugins.testing.delivery' | translate }}</h2>
    </div>
    <div ng-show="IsVisible" ng-style="bgEnv">
        <div class="rv-subsection">
            
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.postput' | translate }}</label>
                <md-select
                ng-model="ctrl5.typeOper"
                placeholder="{{ 'plugins.testing.postput' | translate }}">
                    <md-option value="Insert">{{ 'plugins.testing.insert' | translate }}</md-option>
                    <md-option value="Update">{{ 'plugins.testing.update' | translate }}</md-option>
                </md-select>
            </md-input-container>

            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.themet' | translate }}</label>
                <md-select 
                ng-model="ctrl5.selectedItemE" 
                ng-change="ctrl5.setList()" 
                id="theme" 
                placeholder="{{ 'plugins.testing.themet' | translate }}">
                    <md-option ng-repeat="item in ctrl5.itemsE" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>
            <md-input-container class="ddlshowEX">
                <label>{{ 'plugins.testing.idUT' | translate }}</label>
                <md-select
                ng-model="ctrl5.selectedItemF"
                ng-change="ctrl5.setList()"
                placeholder="{{ 'plugins.testing.idUT' | translate }}">
                    <md-option ng-repeat="item in ctrl5.itemsF" ng-value="item.value">
                        {{ item.name }}
                    </md-option>
                </md-select>
            </md-input-container>

            <md-input-container>
                <label>File MD :</label>
                <input type="file" ng-model="ctrl5.fileMD"/>
            </md-input-container>

            <md-input-container>
                <label>File fgdb :</label>
                <input type="file" ng-model="ctrl5.fileFGDB"/>
            </md-input-container>

            <md-input-container class="submitbtn">
                <md-button class="md-primary md-button"
                ng-click="ctrl5.submitFormD()">
                    {{ 'plugins.testing.submit' | translate }}
                    <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
                </md-button>
            </md-input-container>
        </div>
    </div>
</div>
</div>
`;
