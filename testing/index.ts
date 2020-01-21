export default class Testing{

    //initiation
    init(api: any) {
        this.mapApi = api;
        this.config = this._RV.getConfig('plugins').test;
        //this.config.language = this._RV.getCurrentLang();

        /*let myBundlePromise = (<any>RAMP).GAPI.esriLoadApiClasses([['esri/dijit/LayerSwipe', 'layerSwipe']]);
        myBundlePromise.then(myBundle => {
            this.listenToAlert();
        });*/
        this.listenToAlert();
    }

    //alert when clicked
    listenToAlert(){
        /*this.mapApi.click.subscribe(function(pointObject:any){

            alert('You clicked on point ' + pointObject.X + " "+ pointObject.Y);
        });*/
        this.mapApi.click.subscribe(clickEvent => this.clickHandler(clickEvent));
    }

    clickHandler(clickEvent) {
        // get current language
        const lang = this._RV.getCurrentLang();

        // get point in lat/long
        let pt = clickEvent.xy; //this._RV.projectGeometry(clickEvent.mapPoint, 4326);
        pt.spatialReference = 4326;
        alert('You clicked on point ' + pt.X + " "+ pt.Y);
    }
};

export default interface Testing{
    mapApi: any,
    _RV: any,
    config: any,
    pointObject :any
};

(<any>window).testing = Testing;
