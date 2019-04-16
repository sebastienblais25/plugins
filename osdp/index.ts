import { indexOf } from 'benchmark';

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

    zoomPt(mapId: string, value: string): void {
        const myMap = (<any>window).RAMP.mapById(mapId);
        const ramp = (<any>window).RAMP;
        const split = value.split(' ')
        const x = split[0].substring(split[0].indexOf('(') + 1, split[0].length -1);
        const y = split[2].substring(0, split[2].length -1);

        const pt = new ramp.GEO.XY(parseFloat(x), parseFloat(y));
        myMap.zoom = 13;
        myMap.setCenter(pt);
    }

    zoomPoly(mapId: string, value: string): void {
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
            'rings': [coords], 'spatialReference': {'wkid': 4326 }});

        // get array of x and y
        const x = [];
        const y = [];
        poly.rings[0].forEach((item: any) => { x.push(item[0]); y.push(item[1]); });

        // set extent
        myMap.setExtent( {
            'xmin': Math.min(...x), 'ymin': Math.min(...y), 'xmax': Math.max(...x), 'ymax': Math.max(...y),
            'spatialReference': { 'wkid': 3978 }
        });
    }

    saveState(mapid: string): void {
        // save bookmark in session storage so it is restored when user loads it
        sessionStorage.setItem(mapid, this._RV.getBookmark());
    }

    loadState(mapid: string): void{
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