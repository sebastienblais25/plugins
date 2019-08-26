import { indexOf } from 'benchmark';
import { runInThisContext } from 'vm';

export default class OSDP {
    // a store of the instances of OSDP, 1 per map
    static instances: { [id: string]: OSDP } = {};

    init(api: any): void {
        this.api = api;
        this.initUpdateExtentBox();

        OSDP.instances[this.api.id] = this;
    }

    addLayerByUUID(uuid: string): void {
        // only works on legacy API for the moment
        // We can use add this.api.fgpMapObj.addConfigLayer(JSON) if we have the JSON object
        this._RV.loadRcsLayers([uuid]);
    }

    addLayerByConfig(mapId: string, config: any): void {
        const myMap = (<any>window).RAMP.mapById(mapId);
        // If you want to add a layer by configuration you can use this
        const layerJSON = {
            'id': 'examplelayer',
            'name': 'An exemplary Layer',
            'layerType': 'esriFeature',
            'controls': [
                'remove',
                'visibility'
            ],
            'state': {
                'visibility': true,
                'boundingBox': false
            },
            'url': 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_resource_potential_of_north_america_en/MapServer/0'
        };
        const myConfigLayer = myMap.layers.addLayer(layerJSON);
    }

    // function to fire on add layer and remove layer
    layersEvents(myFunction: any): void {
        const myInter = setInterval(() => {
            if (typeof this.api !== 'undefined') {
                this.api.layersObj.layerAdded.subscribe((layer: any) => myFunction(layer));
                this.api.layersObj.layerRemoved.subscribe((layer: any) => myFunction(layer));
                clearInterval(myInter);
            }
        }, 100);
    }

    setDefinitonQuery(mapId: string, layerId: string, query: string): void {
        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)
        const myMap = (<any>window).RAMP.mapById(mapId);
        const myLayer = myMap.layers.getLayersById(layerId)[0];
        myLayer.setFilterSql('OSDPFilter', query);
    }

    resetDefinitionQuery(mapId: string, layerId: string): void {
        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)
        const myMap = (<any>window).RAMP.mapById(mapId);
        const myLayer = myMap.layers.getLayersById(layerId)[0];
        myLayer.setFilterSql('OSDPFilter', '');
    }

    initUpdateExtentBox() {
        // set extent box change handler by extChangeHandler
        // also initialyse the value of extentbox variable holder
        var parent = this;
        parent.api.esriMap.on('extent-change', extChangeHandler);
        parent.extentbox = parent.api.boundsObj;

        function extChangeHandler() {
            parent.extentbox = parent.api.boundsObj;
        }
    }

    getExtentBox(): any {
        //returns the extentbox variable holder
        return this.extentbox;
    }

    inputParsePoints(values:string):any{
        var arrayPt = values.split(';');
        arrayPt.forEach((element, index, arr) => {
            var elt = element;
            elt = elt.trim();
            elt = elt.replace('POINT', '').replace('(', '[').replace(')', ']');
            elt = elt.replace(" ",","); 
            arr[index] = elt;
        });
        return "["+arrayPt+"]";
    }

    inputParsePolygons(values:string):any{
        debugger
        var arrayPoly = values.split(';');
        arrayPoly.forEach((element, index, arr) => {
            debugger
            var elt = element;
            elt = elt.trim();
            elt = elt.replace('POLYGON', '').replace('((', '[[').replace('))', ']]');
            elt = elt.replace(",", "];[");
            elt = elt.replace(" ",",");
            elt = elt.replace(";",","); 
            arr[index] = elt;
        });
        return "["+arrayPoly+"]";
    }

    addPointsGeometry(mapId: string, values: string): void {
        const input = this.inputParsePoints(values);
        const myMap = (<any>window).RAMP.mapById(mapId);
        const icon = 'M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2-.89 2-2 2c-1.1 0-2-.9-2-2zM5 20v2h14v-2H5z';
        var ptcords = JSON.parse(input);

        let graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        if (typeof graphicsOSDP === 'undefined') {
            // add graphic layer
            myMap.layers.addLayer('graphicsOSDP');
            graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        }

        const points = [];
        for (let value of ptcords) {
            // create a point with unique id, we'll use an svg path for the icon
            const x = value[0];
            const y = value[1];
            let pt = new (<any>window).RAMP.GEO.Point(`location${Math.round(Math.random() * 100000)}`, [x, y], { icon });
            // add the point to the simple layer
            graphicsOSDP.addGeometry(pt);
            points.push(pt)
        }

        // get the extent geometry from multi-point
        if (points.length === 1) {
            this.zoomPt(mapId, input);
        } else {
            const extent = this.createExtentGeom(points);
            this.zoomPoints(mapId, extent);
        }
    }

    addPolygonsGeometry(mapId: string, values: string): void {
        debugger
        const input = this.inputParsePolygons(values);
        const poly1 = new (<any>window).RAMP.GEO.Polygon(201, JSON.parse(values));
        const polyAll = new (<any>window).RAMP.GEO.MultiPolygon(206, [poly1]);
        const myMap = (<any>window).RAMP.mapById(mapId);
        const icon = 'M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2-.89 2-2 2c-1.1 0-2-.9-2-2zM5 20v2h14v-2H5z';

        let graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        if (typeof graphicsOSDP === 'undefined') {
            // add graphic layer
            myMap.layers.addLayer('graphicsOSDP');
            graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        }

        const polygons = [];
        graphicsOSDP.addGeometry([polyAll]);
        this.zoomPoly(mapId, polyAll.polygonArray);
    }

    removeGeometries(mapId: string) {
        const myMap = (<any>window).RAMP.mapById(mapId);

        const graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        if (typeof graphicsOSDP !== 'undefined') {
            // add graphic layer
            graphicsOSDP.removeGeometry();
        }
    }

    createExtentGeom(values: any) {
        let xMin = -999;
        let yMin = -999;
        let xMax = -999;
        let yMax = -999;

        let arraylist = values;
        if (values.type === "Polygon") {
            arraylist = values.ringArray;
        }

        for (let value of arraylist) {
            let x = value._xy.x;
            let y = value._xy.y;

            if (x < xMin || xMin === -999) {
                xMin = x;
            }
            if (y < yMin || yMin === -999) {
                yMin = y;
            }
            if (x > xMax || xMax === -999) {
                xMax = x;
            }
            if (y > yMax || yMax === -999) {
                yMax = y;
            }
        }

        // we already have function to zoom to WKT so create the extent in this format
        return `POLYGON((${xMin} ${yMin},${xMin} ${yMax},${xMax} ${yMax},${xMax} ${yMin},${xMin} ${yMin}))`
    }

    zoomPt(mapId: string, value: string): void {
        debugger
        const myMap = (<any>window).RAMP.mapById(mapId);
        const ramp = (<any>window).RAMP;
        var ptcoords = JSON.parse(value)[0];
        const pt = new ramp.GEO.XY(parseFloat(ptcoords[0]), parseFloat(ptcoords[1]));
        myMap.zoom = 13;
        myMap.setCenter(pt);
    }

    zoomPoly(mapId: string, value: any): void {
        const myMap = (<any>window).RAMP.mapById(mapId);
        const ramp = (<any>window).RAMP;
        const polyarray = value;
        const ext_x = [];
        const ext_y = [];
        const coords = polyarray[0].ringArray[0].pointArray;
        coords.forEach((item: any) => {
            ext_x.push(item._xy.x);
            ext_y.push(item._xy.y);
        });

        // project values
        const extentbox = [[Math.min(...ext_x), Math.min(...ext_y)], [Math.min(...ext_x), Math.max(...ext_y)],
        [Math.max(...ext_x), Math.max(...ext_y)], [Math.max(...ext_x), Math.min(...ext_y)],
        [Math.min(...ext_x), Math.min(...ext_y)]];

        const poly = ramp.GAPI.proj.localProjectGeometry('EPSG:3978', {
            'rings': [extentbox], 'spatialReference': { 'wkid': 4326 }
        });

        const xarray = [];
        const yarray = [];
        poly.rings[0].forEach((item: any) => { xarray.push(item[0]); yarray.push(item[1]); });

        myMap.setExtent({
            'xmin': Math.min(...xarray), 'ymin': Math.min(...yarray), 'xmax': Math.max(...xarray), 'ymax': Math.max(...yarray),
            'spatialReference': { 'wkid': 3978 }
        });

    }

    zoomPoints(mapId: string, value: string): void {
        const myMap = (<any>window).RAMP.mapById(mapId);
        const ramp = (<any>window).RAMP;
        const split = value.substring(value.indexOf('((') + 2, value.length - 2).split(',');

        // for each coord, create a pair and add it to the coords array
        const coords = [];
        split.forEach((item) => {
            const pair = item.split(' ');
            coords.push([parseFloat(pair[0]), parseFloat(pair[1])]);
        });

        // project values
        const poly = ramp.GAPI.proj.localProjectGeometry('EPSG:3978', {
            'rings': [coords], 'spatialReference': { 'wkid': 4326 }
        });

        // get array of x and y
        const xarray = [];
        const yarray = [];
        poly.rings[0].forEach((item: any) => { xarray.push(item[0]); yarray.push(item[1]); });

        // set extent
        myMap.setExtent({
            'xmin': Math.min(...xarray), 'ymin': Math.min(...yarray), 'xmax': Math.max(...xarray), 'ymax': Math.max(...yarray),
            'spatialReference': { 'wkid': 3978 }
        });
    }

    saveState(mapid: string): void {
        // save bookmark in session storage so it is restored when user loads it
        sessionStorage.setItem(mapid, this._RV.getBookmark());
    }

    loadState(mapid: string): void {
        // load bookmark from session storage and apply it
        const storage = JSON.parse(JSON.stringify(sessionStorage.getItem(mapid)));

        // use a timeout to wait until code finish to run. If no timeout, RV is not define
        setTimeout(() => (<any>window).RV.getMap(mapid).initialBookmark(storage));
    }

    validate(values: string) {
        var ck_strarray = /^\[[+-]?\d+(\.\d+)?\,+[+-]?\d+(\.\d+)?\]$/
        var strarray = values;
        var errors = [];

        debugger
        if (!ck_strarray.test(strarray)) {
            errors[errors.length] = "You must enter a valid array of point: [123.55,321.66]";
        }

        if (errors.length > 0) {
            this.reportErrors(errors);
            return false;
        }
        return true;
    }

    reportErrors(errors: any) {
        var msg = "Please Enter Valide Data...\n";
        for (var i = 0; i < errors.length; i++) {
            var numError = i + 1;
            msg += "\n" + numError + ". " + errors[i];
        }
        alert(msg);
    }
}

export default interface OSDP {
    api: any;
    translations: any;
    _RV: any;
    handler: any;
    panel: any;
    button: any;
    extentbox: any;
}

(<any>window).osdp = new OSDP();