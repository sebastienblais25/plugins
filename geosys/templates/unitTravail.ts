

export const uniteTravail:string = `
<div ng-controller="WorkUnit as ctrl14">
    <div ng-style="SelectedMenuUT" class="divButtonUti" ng-click="ctrl1.ShowHideUT()">
        <h2>{{ 'plugins.geosys.unit' | translate }}</h2>
    </div>
    <div ng-show="IsVisibleUT" ng-style="bgEnv" class="extractspace">
        <form name="utform">
            <md-input-container>
                <label>Query to add a working zone in the map</label>
                <textarea type="text" style="height: 30px; width: 354px;" name="text" ng-model="ctrl14.query" required></textarea>
                <md-button class="md-raised md-primary btnShape" style="margin-top:15px;" ng-click="ctrl14.addGeom()" ng-disabled="utform.text.$invalid">Add</md-button>
            </md-input-container>
        </form>
        <div>
        </div>
        
    </div>
<div>
`