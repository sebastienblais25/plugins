export default class Test{

    //initiation
    init(api: any) {
        this.mapApi = api;
        this.config = this._RV.getConfig('plugins').test;
        this.config.language = this._RV.getCurrentLang();

        /*let myBundlePromise = (<any>RAMP).GAPI.esriLoadApiClasses([['esri/dijit/LayerSwipe', 'layerSwipe']]);
        myBundlePromise.then(myBundle => {
            this.listenToAlert();
        });*/
        this.listenToAlert();
    }

    //alert when clicked
    listenToAlert(){
        this.mapApi.click.subscribe(function(pointObject){
            alert('You clicked on point ' + pointObject.x + " "+ pointObject.y);
        });
    }
};

export default interface Test{
    mapApi: any,
    _RV: any,
    config: any
};

(<any>window).test = Test;
