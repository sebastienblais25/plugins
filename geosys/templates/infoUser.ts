

export const infoUser:String = `
<div ng-controller="infoUserCtrl as ctrl13">
    <div>
        {{ 'plugins.geosys.username' | translate }} : (username)
    </div>
    <div>
        {{ 'plugins.geosys.themeI' | translate }} : (theme)
    </div>
    <div>
        {{ 'plugins.geosys.right' | translate }} : (right)
    </div>
    <div>
        {{ 'plugins.geosys.equipe' | translate }} : (equipe)
    </div>
    <div>
        {{ 'plugins.geosys.enviro' | translate }} : (envir)
    </div>
    <div>
        <!--<md-input-container>
            <label>E-mail</label>
            <input type="text" ng-model="ctrl13.emailUser" />
            <md-button ng-click="ctrl13.changeEmail()">
                Change Email
            </md-button>
        </md-input-container>-->
        <md-input-container>
            <md-checkbox ng-model="ctrl13.checkAdvanced" ng-click="ctrl13.checkingAdvanced()">
                Advanced settings
            </md-checkbox>
        </md-input-containe>
    </div>
</div>
`;