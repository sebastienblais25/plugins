import { User } from "../user";
import { QueryCall } from "../operation/queryCall";
const FileSaver = require('file-saver'); // le import

export class QueryCallC{
    
    constructor(){};

    unitControl(log: User, mapApi: any) {
        /************ À placer en fonction ou class ***********/
        mapApi.agControllerRegister('WorkUnit', function() {
            this.output = '';
            this.simply = false
            this.query = ``;
            this.addGeom = () => {
                let regexD = /(?:^|\W)drop(?:$|\W)/gi;
                let regexA = /(?:^|\W)alter(?:$|\W)/gi;
                let regexU = /(?:^|\W)update(?:$|\W)/gi;
                let regexI = /(?:^|\W)insert(?:$|\W)/gi;
                let query: string = this.query;
                if (query.search(regexD) == -1) {
                    if (query.search(regexA) == -1) {
                        if (query.search(regexU) == -1) {
                            if (query.search(regexI) == -1) {
                                let queryCall: QueryCall = new QueryCall();
                                queryCall.constructJson(query);
                                let json = queryCall.submitquery(log, this.output, this.simply);
                                console.log(json)
                                json = JSON.stringify(json)
                                if (this.output = 'geojson') {
                                    let file = new Blob([json]);
                                    const objURL = URL.createObjectURL(file);
                                    const myMap = (<any>window).RAMP.mapById(mapApi.id);
                                    const layerJSON = {
                                        "id": "0",
                                        "name": "Graphics",
                                        "layerType": "esriFeature",
                                        "fileType": "geojson",
                                        "url": objURL
                                    };
                                    const myConfigLayer = myMap.layers.addLayer(layerJSON);
                                }else {
                                    let file = new Blob([json]);
                                    FileSaver.saveAs(file,'Query.json')
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
                } else {
                    alert('no good')
                }
            }
        });
    }
}