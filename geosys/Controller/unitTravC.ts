import { User } from "../user";

export class UnitTravC{
    
    constructor(){};

    unitControl(log: User, mapApi: any) {
        /************ À placer en fonction ou class ***********/
        mapApi.agControllerRegister('WorkUnit', function($scope) {
            this.addGeom = () => {
                let regexD = /(?:^|\W)drop(?:$|\W)/gi;
                let regexA = /(?:^|\W)alter(?:$|\W)/gi;
                let regexU = /(?:^|\W)update(?:$|\W)/gi;
                let regexI = /(?:^|\W)insert(?:$|\W)/gi;
                let query:string = this.query;
                console.log(this.query)
                if (query.search(regexD) == -1) {
                    if (query.search(regexA) == -1) {
                        if (query.search(regexU) == -1) {
                            if (query.search(regexI) == -1) {
                                alert('good');
                                const myMap = (<any>window).RAMP.mapById(mapApi.id);
                                const layerJSON = {
                                    "id": "0",
                                    "name": "Graphics",
                                    "layerType": "esriFeature",
                                    "fileType": "geojson",
                                    "url": "http://localhost:6001/geosys/tempgeojson/geojson.json"
                                };
                                const myConfigLayer = myMap.layers.addLayer(layerJSON);
                            } else {
                                alert('no good')
                            }
                        } else {
                            alert('no good')
                        }
                    } else {
                        alert('no good')
                    }
                } else {
                    alert('no good')
                }
                /*const myMap = (<any>window).RAMP.mapById(mapApi.id);
                // If you want to add a layer by configuration you can use this
                const layerJSON = {
                    "id": "0",
                    "name": "Graphics",
                    "layerType": "esriFeature",
                    "fileType": "geojson",
                    "url": "C:\\Users\\jbruneau\\Downloads\\Geojson.json"
                };
                const myConfigLayer = myMap.layers.addLayer(layerJSON);*/
            }
        });
    }
}