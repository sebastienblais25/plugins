/*
loginmenu = 
startmenu = 
form =
*/

export const loginmenu:string= `
<div ng-controller="connexionCtrl as ctrl">
    <div>username : </div>
    <div><input type="text" id="username" placeholder="username"/></div>
    <div>Password : </div>
    <div><input type="password" id="password" placeholder="password"/></div>

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


export const form:string = 
`<div ng-controller="SubmitCtrl as ctrl">

    <div class="rv-subsection">
        <div>{{ 'plugins.testing.envir' | translate }}</div>
        <div><input type="text" id="env" value="Pro"/></div>
    </div>
    
    <div class="rv-subsection">
        <div>{{ 'plugins.testing.themet' | translate }}</div>
        <select type="text" id="theme" placeholder="Select something">
            {dropdowntheme}
        </select>
    </div>
    
    <div class="rv-subsection">
        <div>{{ 'plugins.testing.idlot' | translate }}</div>
        <input type="text" name="idlot" id="idlot" value="1"/>
    </div>
    
    <div class="rv-subsection">
        Si Clip:<br>
        <input type="text" name="clip" id="clip" value="Oui"/>
    </div>

    <div class="rv-subsection">
        Entrez un where clause:<br>
        <input type="text" name="whereclause" id="whereclause" value="Ajout"/>
    </div>
    
    <div class="rv-subsection">
        <div>{{ 'plugins.testing.idlot' | translate }}</div>
        <input type="text" name="geom" id="geom" value="geom"/>
    </div>
    
    <div class="rv-subsection">
        <md-button class="md-primary md-button"
        ng-click="ctrl.submitForm()">
            {{ 'plugins.testing.submit' | translate }}
            <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
        </md-button>

    </div>
            
</div>`;
