"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnitTravC = /** @class */ (function () {
    function UnitTravC() {
    }
    ;
    UnitTravC.prototype.unitControl = function (log, mapApi) {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('WorkUnit', function ($scope) {
            var _this = this;
            this.addGeom = function () {
                var regexD = /(?:^|\W)drop(?:$|\W)/gi;
                var regexA = /(?:^|\W)alter(?:$|\W)/gi;
                var regexU = /(?:^|\W)update(?:$|\W)/gi;
                var regexI = /(?:^|\W)insert(?:$|\W)/gi;
                var query = _this.query;
                console.log(_this.query);
                if (query.search(regexD) == -1) {
                    if (query.search(regexA) == -1) {
                        if (query.search(regexU) == -1) {
                            if (query.search(regexI) == -1) {
                                alert('good');
                                var myMap = window.RAMP.mapById(mapApi.id);
                                var layerJSON = {
                                    "id": "0",
                                    "name": "Graphics",
                                    "layerType": "esriFeature",
                                    "fileType": "geojson",
                                    "url": "http://localhost:6001/geosys/tempgeojson/geojson.json"
                                };
                                var myConfigLayer = myMap.layers.addLayer(layerJSON);
                            }
                            else {
                                alert('no good');
                            }
                        }
                        else {
                            alert('no good');
                        }
                    }
                    else {
                        alert('no good');
                    }
                }
                else {
                    alert('no good');
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
            };
        });
    };
    return UnitTravC;
}());
exports.UnitTravC = UnitTravC;
