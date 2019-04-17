export default class OSDP {
    // A store of the instances of OSDP, 1 per map
    static instances: { [id: string]: OSDP } = {};

    init(api: any): void {
        this.api = api;
        this.OnBoundingBoxChange();
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

    OnBoundingBoxChange(): void {
       // detect any change on the extent box
        var ramAPI = this.api;
        var mapExtentChange = ramAPI.esriMap.on("extent-change", changeHandler);

        document.getElementById("coordNE").innerText = "Bounding Box: NE [" + ramAPI.boundsObj.northEast + "]";
        document.getElementById("coordSW").innerText = "SW [" + ramAPI.boundsObj.southWest + "]";

        function changeHandler(evt: any) {
            //var extent = evt.extent,
            //    zoomed = evt.levelChange;
            document.getElementById("coordNE").innerText = "Bounding Box: NE [" + ramAPI.boundsObj.northEast + "]";
            document.getElementById("coordSW").innerText = "SW [" + ramAPI.boundsObj.southWest + "]"; console.log("Bounding Box: " + ramAPI.boundsObj.toString());
        }
    }
}

export default interface OSDP {
    api: any;
    translations: any;
    _RV: any;
    handler: any;
    panel: any;
    button: any;
}

(<any>window).osdp = new OSDP();
