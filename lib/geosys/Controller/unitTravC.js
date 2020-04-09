"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnitTravC = /** @class */ (function () {
    function UnitTravC() {
    }
    ;
    UnitTravC.prototype.unitControl = function (log, mapApi) {
        /************ À placer en fonction ou class ***********/
        mapApi.agControllerRegister('WorkUnit', function () {
            var _this = this;
            this.output = '';
            this.simply = false;
            this.addGeom = function () {
                var regexD = /(?:^|\W)drop(?:$|\W)/gi;
                var regexA = /(?:^|\W)alter(?:$|\W)/gi;
                var regexU = /(?:^|\W)update(?:$|\W)/gi;
                var regexI = /(?:^|\W)insert(?:$|\W)/gi;
                var query = _this.query;
                if (query.search(regexD) == -1) {
                    if (query.search(regexA) == -1) {
                        if (query.search(regexU) == -1) {
                            if (query.search(regexI) == -1) {
                                console.log(_this.output);
                                console.log(_this.simply);
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
            };
        });
    };
    return UnitTravC;
}());
exports.UnitTravC = UnitTravC;
