

export const uniteTravail:string = `
<div ng-controller="WorkUnit as ctrl14">
    <div ng-style="SelectedMenuUT" class="divButtonUti" ng-click="ctrl1.ShowHideUT()">
        <h2>{{ 'plugins.geosys.unit' | translate }}</h2>
    </div>
    <div ng-show="IsVisibleUT" ng-style="bgEnv" class="extractspace">
        <md-input-container>
            <label>Testing</label>
            <input type="text"/>
            <md-button ng-click="ctrl14.addGeom()">Add</md-button>
        </md-input-container>
    </div>
<div>
`