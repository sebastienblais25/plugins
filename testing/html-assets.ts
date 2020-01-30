/*
loginmenu = The form for the login
startmenu = 
form = Teh from fro extraction
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


export const startmenu:string=`
<div>
    <ul>
    </u>
</div>`


export const formExtraire:string = 
`<div ng-controller="SubmitCtrl as ctrl">
    
    <div><h2>{{ 'plugins.testing.extrac' | translate }}</h2></div>
    <div class="">
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
            <select type="text" id="theme" placeholder="Select something">
                {dropdowntheme}
            </select>
        </div>
        
        <div class="rv-subsection">
            <div>{{ 'plugins.testing.idUT' | translate }}</div>
            <input type="text" name="idlot" id="idlot" value="1"/>
        </div>
        
        <div class="rv-subsection">
            <div>{{ 'plugins.testing.clip' | translate }}</div>
            <div><input type="checkbox" name="clip" id="clip" value="non" checked="oui"/></div>
        </div>

        <div class="rv-subsection">
            <div>{{ 'plugins.testing.where' | translate }}<br></div>
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

export const fromPlanifier = `
<div ng-controller="submitFromP as ctrl">
<div>
    <div>{{ 'plugins.testing.envir' | translate }}</div>
    <div></div>
</div>
<div>
    <div>{{ 'plugins.testing.themet' | translate }}</div>
    <div></div>
</div>
<div>
    <div>{{ 'plugins.testing.zoneTrv' | translate }}</div>
    <div></div>
</div>
<div>
    <div>{{ 'plugins.testing.idUT' | translate }}</div>
    <div></div>
</div>
<div>
    <div>{{ 'plugins.testing.typeTrv' | translate }}</div>
    <div></div>
</div>
<div>
    <div>{{ 'plugins.testing.classe' | translate }}</div>
    <div></div>
</div>
<div>
    <div>{{ 'plugins.testing.datefinprv' | translate }}</div>
    <div></div>
</div>
<div>
    <div>{{ 'plugins.testing.log' | translate }}</div>
    <div></div>
</div>
<div>
    <md-button class="md-primary md-button"
    ng-click="ctrl.submitFormP()">
        {{ 'plugins.testing.submit' | translate }}
        <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
    </md-button>
</div>

</div>`;
