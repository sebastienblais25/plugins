

export const uniteTravail:string = `
<div ng-controller="WorkUnit as ctrl14">
    <div ng-style="ctrl1.SelectedMenuUT" class="Geosys-div-Button-Uti" ng-click="ctrl1.ShowHideUT()">
        <h2>{{ 'plugins.geosys.unit' | translate }}</h2>
    </div>
    <div ng-show="ctrl1.IsVisibleUT" ng-style="ctrl1.bgEnv" class="Geosys-extractspace">
        <form name="utform">
            <br/>
            <md-input-container class="Geosys-largeur">
                <label>Query to add a working zone in the map</label>
                <textarea type="text" style="height: 30px; width: 354px;" name="text" ng-model="ctrl14.query" required></textarea>
            </md-input-container>
            <md-input-container class="Geosys-ddlshowEX">
                <label>Choose the output of your query : </label>
                <md-select
                ng-model="ctrl14.output" 
                required>
                    <md-option value="geojson">GeoJson</md-option>
                    <md-option value="json">Json</md-option>
                </md-select>
            </md-input-container>
            <md-checkbox ng-model="ctrl14.simply" style="padding-top:10px;"­>Simplifier</md-checkbox>
            <md-input-container class="Geosys-submitbtn">
                <md-button class="md-raised md-primary" style="float: right;" ng-click="ctrl14.addGeom()" ng-disabled="utform.text.$invalid">Send query</md-button>
            </md-input-container>
        </form>
    </div>
<div>
`