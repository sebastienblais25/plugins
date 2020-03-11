import { User } from "../user";

export class UnitTravC{
    
    constructor(){};

    unitControl(log:User, mapApi:any){
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('WorkUnit', function($scope){ 
            
            this.addGeom = () =>{
                const myMap = (<any>window).RAMP.mapById(mapApi.id);

                // If you want to add a layer by configuration you can use this
                const layerJSON = {
                    "id": "0",
                    "name": "Graphics",
                    "layerType": "esriFeature",
                    "fileType": "geojson",
                    "url": "C:\\Users\\jbruneau\\Downloads\\Geojson.json"
                };
                const myConfigLayer = myMap.layers.addLayer(layerJSON);

            }

        });
    }
}