"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var planifier_1 = require("../operation/planifier");
var PlanningController = /** @class */ (function () {
    function PlanningController() {
    }
    ;
    /**
     *the controller for all the function in planning templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @memberof manageController
     */
    PlanningController.prototype.planControl = function (log, mapApi) {
        mapApi.agControllerRegister('submitFromP', function () {
            var _this = this;
            var that = this;
            this.erridwuvs = false;
            this.errclass = false;
            this.errwork = false;
            /************** interactive List ***************/
            this.selectedItemC = '';
            this.selectedItemD = '';
            this.dfp = '';
            this.geomp = '';
            this.geomEPSG = '';
            this.wherep = '';
            this.itemsC = [];
            this.idut = '';
            //theme list
            for (var i in log.getThemeAcc()) {
                this.itemsC.push({ name: log.getThemeAcc()[i].getnom(), value: log.getThemeAcc()[i].getId() });
            }
            //List of working type
            this.itemsD = [];
            //the group of classes for a theme
            this.classes = [];
            //function ng-chage of the theme list
            this.setList = function () {
                _this.selectedItemD = '';
                //set the today's date
                var today = new Date();
                var dd = String(today.getDate());
                var mm = String(today.getMonth() + 1); //January is 0!
                var yyyy = String(today.getFullYear());
                if (dd.length < 2) {
                    dd = '0' + dd;
                }
                if (mm.length < 2) {
                    mm = '0' + mm;
                }
                //add the name of the theme
                var slectedthem;
                for (var i in _this.itemsC) {
                    if (_this.itemsC[i].value == _this.selectedItemC) {
                        slectedthem = _this.itemsC[i].name;
                    }
                }
                //Populate the input of the working unit
                _this.idut = slectedthem + '_' + yyyy + mm + dd + '_';
                //populate the working type list
                var listTT = [];
                listTT = log.setworkingtype(_this.selectedItemC);
                /** liste de classes **/
                var list = [];
                list = log.getlistofclasses(_this.selectedItemC);
                _this.classes.length = 0;
                _this.itemsD.length = 0;
                //add the new list in list for the template
                _this.classes = list;
                _this.itemsD = listTT;
            };
            //for claases list select all the info
            this.toggleAll = function () {
                if (_this.listeclasse == true) {
                    for (var i in _this.classes) {
                        _this.classes[i].wanted = false;
                    }
                }
                else {
                    for (var i in _this.classes) {
                        _this.classes[i].wanted = true;
                    }
                }
            };
            // Checkbox behave like radio button
            this.inputchck = function () {
                _this.drawingchecked = false;
                _this.filechecked = false;
            };
            this.drawchck = function () {
                _this.geomp = '';
                _this.inputchecked = false;
                _this.filechecked = false;
            };
            this.importchck = function () {
                _this.geomp = '';
                _this.drawingchecked = false;
                _this.inputchecked = false;
            };
            //subscribe for the drawing
            window.drawObs.drawPolygon.subscribe(function (value) {
                //create a geojson with the infromation obtain
                if (_this.drawingchecked == true) {
                    //show the geo json in the input 
                    _this.geomp = JSON.stringify(value.rings);
                    _this.geomEPSG = value.spatialReference.wkid;
                }
            });
            /************** Shapefile Load ***************/
            this.loadshp = function () {
                var files = document.getElementById('fileshp').files;
                if (files.length == 0) {
                    alert('No file');
                }
                else {
                    var file = files[0];
                    var reader_1 = new FileReader();
                    reader_1.onload = function (e) {
                        if (reader_1.readyState != 2 || reader_1.error) {
                            alert('Wrong file');
                            return;
                        }
                        else {
                            //package to read a shapefile and get a geojson
                            var shp = require("shpjs");
                            //read the zip shapefile
                            shp(reader_1.result).then(function (dta) {
                                //set a variable with the coordinates for the drawing
                                var geomDR = dta.features[0].geometry.coordinates[0];
                                //set a variable with the coordinates for the geojson
                                var geomGEOJSON = dta.features[0].geometry.coordinates;
                                //set the geojson in the input
                                that.geomp = JSON.stringify(geomGEOJSON);
                                that.geomEPSG = '4326';
                                //create the polygon in the viewer with a zoom on it
                                log.createPolygons(mapApi.id, geomDR);
                            });
                        }
                    };
                    reader_1.readAsArrayBuffer(file);
                }
            };
            /********** Form submission ************/
            //Envoie le fromulaire a l'API
            this.submitFormP = function () {
                //get all the information of the form into the class
                var listofclass = [];
                for (var i in _this.classes) {
                    if (_this.classes[i].wanted == true) {
                        listofclass.push(_this.classes[i].name);
                    }
                }
                if (document.getElementById("idUt").value === '') {
                    _this.erridwuvs = true;
                    log.setCloseable(false);
                }
                else if (_this.selectedItemD === '') {
                    _this.errwork = true;
                    log.setCloseable(false);
                }
                else if (listofclass.length < 1) {
                    _this.errclass = true;
                    log.setCloseable(false);
                }
                else {
                    //set the information in the the json 
                    log.createGeoJson('EPSG:' + _this.geomEPSG, JSON.parse(_this.geomp));
                    log.setCloseable(true);
                    var plan = new planifier_1.planifier(_this.selectedItemC, document.getElementById("idUt").value, _this.selectedItemD, listofclass, _this.dfp, log.getGeom(), _this.wherep);
                    //submit the form to the API
                    var ApiReturn = plan.submitForm(log);
                    //If the return isn't a succes
                    if (ApiReturn != 'success') {
                        alert(ApiReturn.status);
                        log.setCloseable(false);
                    }
                }
            };
        });
    };
    return PlanningController;
}());
exports.PlanningController = PlanningController;
