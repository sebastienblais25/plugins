"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var queryCall_1 = require("../operation/queryCall");
var FileSaver = require('file-saver'); // le import
var QueryCallC = /** @class */ (function () {
    function QueryCallC() {
    }
    ;
    QueryCallC.prototype.unitControl = function (log, mapApi) {
        /************ À placer en fonction ou class ***********/
        mapApi.agControllerRegister('WorkUnit', function () {
            var _this = this;
            this.output = '';
            this.simply = false;
            this.query = "";
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
                                var queryCall = new queryCall_1.QueryCall();
                                queryCall.constructJson(query);
                                var json = queryCall.submitquery(log, _this.output, _this.simply);
                                console.log(json);
                                json = JSON.stringify(json);
                                if (_this.output = 'geojson') {
                                    var file = new Blob([json]);
                                    var objURL = URL.createObjectURL(file);
                                    var myMap = window.RAMP.mapById(mapApi.id);
                                    var layerJSON = {
                                        "id": "0",
                                        "name": "Graphics",
                                        "layerType": "esriFeature",
                                        "fileType": "geojson",
                                        "url": objURL
                                    };
                                    var myConfigLayer = myMap.layers.addLayer(layerJSON);
                                }
                                else {
                                    var file = new Blob([json]);
                                    FileSaver.saveAs(file, 'Query.json');
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
                }
                else {
                    alert('no good');
                }
            };
        });
    };
    return QueryCallC;
}());
exports.QueryCallC = QueryCallC;
