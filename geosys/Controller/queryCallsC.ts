import { User } from "../user";
import { QueryCall } from "../operation/queryCall";

export class QueryCallC{
    
    constructor(){};

    unitControl(log: User, mapApi: any) {
        /************ À placer en fonction ou class ***********/
        mapApi.agControllerRegister('WorkUnit', function() {
            this.output = '';
            this.simply = false
            this.query = `select
                lot.id,
                lot.theme_cl,
                code.nom,
                lot.statut_lot_cl,
                unite_travail_2.id as id_ut,
                unite_travail_2.shape
            from
                jmp.lot,
                jmp.unite_travail_2,
                jmp.code
            where
                     unite_travail_2.id in ('AUTO_BUILDING_20181211_NBDNR16', 'AUTO_BUILDING_20181211_LCOUNTY')
                and lot.id = unite_travail_2.id_lot
                and lot.theme_cl = code.id
            `;
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
                                if (this.output = 'geojson') {
                                    let file = new Blob([json]);
                                    const objURL = URL.createObjectURL(file);
                                    const myMap = (<any>window).RAMP.mapById(mapApi.id);
                                    const layerJSON = {
                                        "id": "0",
                                        "name": "Graphics",
                                        "layerType": "esriFeature",
                                        "fileType": "geojson",
                                        "url": "http://localhost:6001/geosys/tempgeojson/geojson.json"
                                    };
                                    const myConfigLayer = myMap.layers.addLayer(layerJSON);
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