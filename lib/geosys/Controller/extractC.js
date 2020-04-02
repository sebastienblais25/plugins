"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extraire_1 = require("../operation/extraire");
var ExtractController = /** @class */ (function () {
    function ExtractController() {
    }
    ;
    /**
     * the controller for all the function in the planned extract templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @memberof manageController
     */
    ExtractController.prototype.extrairecontrols = function (log, mapApi) {
        /************ À placer en fonction ou class ***********/
        mapApi.agControllerRegister('SubmitCtrl', function () {
            var _this = this;
            // Error message if problem with the slect working unit ID
            this.ErrorEx = false;
            /************** interactive List ***************/
            // Theme
            this.selectedItemA = '';
            // Working unit ID
            this.selectedItemB = '';
            // Set up the theme list
            this.itemsA = [];
            for (var i in log.getThemeAcc()) {
                this.itemsA.push({ name: log.getThemeAcc()[i].getnom(), value: log.getThemeAcc()[i].getId() });
            }
            this.itemsB = [];
            // Création de la liste pour les unité de travail
            this.setList = function () {
                _this.selectedItemB = '';
                // Populate list of working unit id
                _this.itemsB.length = 0;
                var list = log.setidUTtheme(_this.selectedItemA);
                for (var i in list) {
                    _this.itemsB.push(list[i]);
                }
            };
            /************** Advanced Setting ***************/
            this.ShowHideAdvanced = function () {
                if (log.getEnvironnementSel() !== '') {
                    _this.IsVisibleASP = _this.IsVisibleASP ? false : true;
                }
            };
            /************** interactive List Advanced Setting ***************/
            this.selectedItemENT = '';
            this.itemsENT = [];
            // Changement
            for (var i in log.getEnvAcc()) {
                this.itemsENT.push({ name: log.getEnvAcc()[i]._env, value: log.getEnvAcc()[i]._env });
            }
            /**************** From Submission ***************/
            this.submitForm = function () {
                console.log(_this.selectedItemB);
                // Get all the information of the form into the class
                if (_this.selectedItemB == '') {
                    _this.ErrorEx = true;
                    log.setCloseable(false);
                }
                else {
                    log.setCloseable(true);
                    var ext = new extraire_1.Extraire(_this.selectedItemA, _this.selectedItemB);
                    ext.setOptionnalEnvironnement(_this.selectedItemENT);
                    var ApiReturn = ext.submitForm(log);
                    // If the conection to the API is a success
                    if (ApiReturn != 'success') {
                        alert(ApiReturn.statusText);
                        log.setCloseable(false);
                    }
                }
            };
        });
    };
    /**
     *the controller fro all the function in the unplanned extract templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @memberof manageController
     */
    ExtractController.prototype.extraireSRcontrols = function (log, mapApi) {
        /************ Bouton Extraire ***********/
        mapApi.agControllerRegister('SubmitExCtrl', function () {
            var _this = this;
            // To acces elemnent in the reader file
            var that = this;
            // Error message for the list of the classes
            this.errclassEX = false;
            /************** interactive List ***************/
            // Theme
            this.selectedItemA = '';
            // Where Clause
            this.whereclause = '';
            // Geom Coordinates
            this.geomSR = '';
            // Set up the list of theme
            this.itemsA = [];
            for (var i in log.getThemeAcc()) {
                this.itemsA.push({ name: log.getThemeAcc()[i].getnom(), value: log.getThemeAcc()[i].getId() });
            }
            // Set of a list of classes
            this.classes = [];
            // Création de la liste pour les unité de travail
            this.setList = function () {
                var list = [];
                list = log.getlistofclasses(_this.selectedItemA);
                _this.classes.length = 0;
                // Add the new list in list for the template
                _this.classes = list;
            };
            // Select all the classes in the list
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
            /************** Subscribe to the drawing event ***************/
            window.drawObs.drawPolygon.subscribe(function (value) {
                // Create a geojson with the information obtain if the checkbox for drawinf is check
                if (_this.drawingchecked == true) {
                    log.createGeoJson('ESPG:' + value.spatialReference.wkid, value.rings);
                    // Show the geo json in the input 
                    that.geomSR = log.getGeom();
                }
            });
            /************** Shapefile load ***************/
            this.loadshpEX = function () {
                // Get the files in the input
                var files = document.getElementById('fileshpEX').files;
                // If there is no file
                if (files.length == 0) {
                    alert('No files');
                }
                else {
                    var file = files[0];
                    // A file reader
                    var reader_1 = new FileReader();
                    // Fonction for the file reader
                    reader_1.onload = function (e) {
                        if (reader_1.readyState != 2 || reader_1.error) {
                            return;
                        }
                        else {
                            // Package to read a shapefile and get a geojson
                            var shp = require("shpjs");
                            // Read the zip shapefile
                            shp(reader_1.result).then(function (dta) {
                                // Set a variable with the coordinates for the drawing
                                var geomDR = dta.features[0].geometry.coordinates[0];
                                // Set a variable with the coordinates for the geojson
                                var geomGEOJSON = dta.features[0].geometry.coordinates;
                                // Create a geojson with the onfromation of the shapefile
                                log.createGeoJson('EPSG:4326', geomGEOJSON);
                                // Set the geojson in the input
                                that.geomSR = log.getGeom();
                                // Create the polygon in the viewer with a zoom on it
                                log.createPolygons(mapApi.id, geomDR);
                            });
                        }
                    };
                    // Read the file
                    reader_1.readAsArrayBuffer(file);
                }
            };
            /************** Advanced Setting ***************/
            this.ShowHideAdvanced = function () {
                if (log.getEnvironnementSel() !== '') {
                    _this.IsVisibleASP = _this.IsVisibleASP ? false : true;
                }
            };
            /************** interactive List Advanced Setting ***************/
            this.selectedItemENT = '';
            this.itemsENT = [];
            // Changement
            for (var i in log.getEnvAcc()) {
                this.itemsENT.push({ name: log.getEnvAcc()[i]._env, value: log.getEnvAcc()[i]._env });
            }
            /**************** From Submission ***************/
            // Envoie le formulaire a l'Api
            this.submitSRForm = function () {
                // Get all the information of the form into the class
                _this.geomSR = log.getGeom();
                var listofclass = [];
                for (var i in _this.classes) {
                    if (_this.classes[i].wanted == true) {
                        listofclass.push(_this.classes[i].name);
                    }
                }
                // If the user want a clip
                var siClip;
                if (_this.cbClip == true) {
                    siClip = 'oui';
                }
                else {
                    siClip = 'non';
                }
                if (listofclass.length < 1) {
                    _this.errclassEX = true;
                    log.setCloseable(false);
                }
                else {
                    // Console.log(this.geomSR)
                    log.setCloseable(true);
                    var extsr = new extraire_1.Extraire(_this.selectedItemA);
                    extsr.setInfoForSR(listofclass, siClip, _this.whereclause, _this.geomSR);
                    extsr.setOptionnalEnvironnement(_this.selectedItemENT);
                    // If the connection to the API is a Success
                    var ApiReturn = extsr.submitForm(log);
                    if (ApiReturn != 'success') {
                        alert(ApiReturn.statusText);
                        log.setCloseable(false);
                    }
                }
            };
        });
    };
    return ExtractController;
}());
exports.ExtractController = ExtractController;
