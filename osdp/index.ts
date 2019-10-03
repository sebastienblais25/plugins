import { indexOf } from 'benchmark';
import { runInThisContext } from 'vm';

export default class OSDP {
    // a store of the instances of OSDP, 1 per map
    static instances: { [id: string]: OSDP } = {};

    init(api: any): void {
        this.api = api;
        this.initUpdateExtentBox();

        // subscribe to add layer even to reorder the layers so graphicOSDP is always on top
        this.api.layers.layerAdded.subscribe(layer => {
            const map = (<any>window).RAMP.mapById(this.api.id);
            const pos = Object.keys(map.esriMap._layers).length - 1;
            map.fgpMapObj.reorderLayer('graphicsOSDP', pos)
        });

        // add the OSDP grapic layer
        const myInter = setInterval(() => {
            if (typeof (<any>window).RAMP.mapById(this.api.id) !== 'undefined') {
                (<any>window).RAMP.mapById(this.api.id).layersObj.addLayer('graphicsOSDP');

                // need to call later because if called before map initilize, rest of function is skipped
                this.setZoomEndEvent((<any>window).RAMP.mapById(this.api.id));

                clearInterval(myInter);
            }
        }, 100);

        OSDP.instances[this.api.id] = this;

        // test url before trying to load
        this.testService({ 'url': 'https://geoportal.gc.ca/arcgis/rest/services/FGP/CSAS_CoralsSponges2010_EN/MapServer/18' });
        this.testService({ 'url': 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_resource_potential_of_north_america_en/MapServer/0' });
    }

    setZoomEndEvent(mapi: any): void {
        mapi.esriMap.on('zoom-end', evt => {
            console.log(`zoom level:  ${evt.level}, new extent: ${JSON.stringify(evt.extent)}`);
        });

        // I think you have already the code the extent change but I added it in case
        mapi.extentChanged.subscribe(evt => {
            console.log(`new extent: ${JSON.stringify(evt)}`);
        });
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

    testService(layer: any) {
        const request = new XMLHttpRequest();
        request.open('GET', `${layer.url}?f=json`, true);
        request.onreadystatechange = function(){
            if (request.readyState === 4){
                if (request.response.contains('"code":500')) {
                    console.log(`Error handling service request :Could not find a service with the name '${layer.url}'
                        in the configured clusters. Service may be stopped or ArcGIS Server may not be running.`);
                } else {
                    console.log(`Layer '${layer.url}' should load properly.`);
                }
            }
        };
        request.send();
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
        const parent = this;
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

    inputParsePoints(values:string): any{
        const arrayPt = values.split(';');
        arrayPt.forEach((element, index, arr) => {
            let elt = element;
            elt = elt.replace('POINT', '').replace(/\( */g, '[').replace(/ *\)/g, ']');
            elt = elt.trim();
            elt = elt.replace(/ +/g,', ');
            arr[index] = elt;
        });
        return `[${arrayPt}]`;
    }

    inputParsePolygons(values:string): any{
        const arrayPoly = values.split(';');
        arrayPoly.forEach((element, index, arr) => {
            let elt = element;
            elt = elt.replace('POLYGON', '').replace(/\( *\( */g,'[[').replace(/ *\) *\)/g, ']]');
            elt = elt.trim();
            elt = elt.replace(/, */g, '],[');
            elt = elt.replace(/ +/g,', ');
            arr[index] = elt;
        });
        return `[${arrayPoly}]`;
    }

    addPointsGeometry(mapId: string, values: string): void {
        const input = this.inputParsePoints(values);
        const myMap = (<any>window).RAMP.mapById(mapId);
        const icon = 'M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2-.89 2-2 2c-1.1 0-2-.9-2-2zM5 20v2h14v-2H5z';
        const ptcords = JSON.parse(input);

        const graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        const points = [];
        for (let value of ptcords) {
            // create a point with unique id, we'll use an svg path for the icon
            const x = value[0];
            const y = value[1];
            let pt = new (<any>window).RAMP.GEO.Point(`location${Math.round(Math.random() * 100000)}`, [x, y], { style: 'ICON', icon: icon, colour: [255, 0, 0], width: 30 });
            // add the point to the simple layer
            graphicsOSDP.addGeometry(pt);
            points.push(pt)
        }

        // get the extent geometry from multi-point
        if (points.length === 1) {
            this.zoomPt(mapId, values);
        } else {
            const extent = this.createExtentGeom(points);
            this.zoomPoints(mapId, extent);
        }
    }

    addPolygonsGeometry(mapId: string, values: string): void {
        const input = this.inputParsePolygons(values);
        const poly1 = new (<any>window).RAMP.GEO.Polygon(0, JSON.parse(input));
        const polyAll = new (<any>window).RAMP.GEO.MultiPolygon(`location${Math.round(Math.random() * 100000)}`, [poly1], { outlineColor: [255, 0, 0], outlineWidth: 3 });
        const myMap = (<any>window).RAMP.mapById(mapId);

        const graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        graphicsOSDP.addGeometry([polyAll]);
        this.zoomPoly(mapId, values);
    }

    removeGeometries(mapId: string) {
        const myMap = (<any>window).RAMP.mapById(mapId);
        const graphicsOSDP = myMap.layers.getLayersById('graphicsOSDP')[0];
        graphicsOSDP.removeGeometry();
    }

    createExtentGeom(values: any) {
        let xMin = -999;
        let yMin = -999;
        let xMax = -999;
        let yMax = -999;

        let arraylist = values;
        if (values.type === 'Polygon') {
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
        const myMap = (<any>window).RAMP.mapById(mapId);
        const ramp = (<any>window).RAMP;
        const input = this.inputParsePoints(value);
        const ptcoords = JSON.parse(input);
        const pt = new ramp.GEO.XY(parseFloat(ptcoords[0][0]), parseFloat(ptcoords[0][1]));

        myMap.zoom = 13;
        myMap.setCenter(pt);
    }

    zoomPoly(mapId: string, value: string): void {
        const input = this.inputParsePolygons(value);
        const poly1 = new (<any>window).RAMP.GEO.Polygon(201, JSON.parse(input));
        const polyAll = new (<any>window).RAMP.GEO.MultiPolygon(206, [poly1]);
        const myMap = (<any>window).RAMP.mapById(mapId);
        const ramp = (<any>window).RAMP;
        const polyarray =  polyAll.polygonArray;
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