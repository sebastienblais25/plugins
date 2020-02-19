

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