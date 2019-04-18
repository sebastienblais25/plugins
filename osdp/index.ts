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
        this._RV.loadRcsLayers([uuid]);
    }

    setDefinitonQuery(mapId: string, layerId: string, query: string): void {
        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)
        // it is not implemented in the interface yet, need a little bit of cheating
        const myMap = (<any>window).RZ.mapById(mapId);
        const myLayer = myMap.layers.getLayersById(layerId)[0];
        const myProxy = myLayer._layerProxy;  // cheating!
        myProxy.filter.setSql('myUniqueAppCode', query);
    }

    resetDefinitionQuery(mapId: string, layerId: string): void {
        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)
        // it is not implemented in the interface yet, need a little bit of cheating
        const myMap = (<any>window).RZ.mapById(mapId);
        const myLayer = myMap.layers.getLayersById(layerId)[0];
        const myProxy = myLayer._layerProxy;  // cheating!
        myProxy.filter.setSql('myUniqueAppCode', '');
    }

    initUpdateExtentBox() {
        // set extent box change handler by extChangeHandler
        // Also initialyse the value of extentbox variable holder
        var parent = this;
        parent.api.esriMap.on("extent-change", extChangeHandler);
        parent.extentbox = parent.api.boundsObj;
        
        function extChangeHandler() {
            parent.extentbox = parent.api.boundsObj;
        }
    }

    getExtentBox(): any {
        //returns the extentbox variable holder
        return this.extentbox;
    }

    saveState(mapid: string) {
        // save bookmark in local storage so it is restored when user returns
        sessionStorage.setItem(mapid, this._RV.getBookmark());
    }

    loadState() {
        const storage = JSON.parse(JSON.stringify(sessionStorage.getItem('mapOSDPBuilder')));

        this._RV.useBookmark(storage);
        //this._RV.initialBookmark(storage);
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