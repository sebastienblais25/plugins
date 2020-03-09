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
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitCtrl', function ($scope, $rootScope) {
            var _this = this;
            /************** interactive List ***************/
            this.selectedItemA = '';
            this.selectedItemB = '';
            this.itemsA = [];
            for (var i in log._themeAcc) {
                this.itemsA.push({ name: log._themeAcc[i]._nom, value: log._themeAcc[i]._id });
            }
            this.itemsB = [];
            //création de la liste pour les unité de travail
            this.setList = function () {
                console.log("set: " + _this.selectedItemA);
                // populate list of working unit id
                _this.itemsB.length = 0;
                var list = log.setidUTtheme(_this.selectedItemA);
                for (var i in list) {
                    _this.itemsB.push(list[i]);
                }
            };
            /************** Advanced Setting ***************/
            this.ShowHideAdvanced = function () {
                if (log._environnementSel != '') {
                    $scope.IsVisibleASP = $scope.IsVisibleASP ? false : true;
                    /*if($scope.IsVisibleASP == true){
                       
                    }else{
                        
                    }*/
                }
            };
            /************** interactive List Advanced Setting ***************/
            this.selectedItemENT = '';
            this.itemsENT = [];
            //changement
            for (var i in log._envAcc) {
                this.itemsENT.push({ name: log._envAcc[i]._env, value: log._envAcc[i]._env });
            }
            /**************** From Submission ***************/
            this.submitForm = function () {
                //get all the information of the form into the class
                if (this.selectedItemB == '') {
                    alert('Sélectionnez un identifiant de travail');
                }
                else {
                    var ext = new extraire_1.Extraire(this.selectedItemA, this.selectedItemB);
                    ext.setOptionnalEnvironnement(this.selectedItemENT);
                    var apireturn = ext.submitForm(log);
                    //if the conection to the API is a success
                    if (apireturn != 'success') {
                        alert(apireturn.statusText);
                        $scope.SelectedMenuE = {
                            "background-color": "red",
                        };
                    }
                    else {
                        //$scope.IsVisibleEP = false;
                        $scope.SelectedMenuE = {
                            "background-color": "green",
                        };
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
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitExCtrl', function ($scope) {
            var _this = this;
            var that = this;
            /************** interactive List ***************/
            this.selectedItemA = '';
            this.whereclause = '';
            this.geomSR = '';
            //this.geomSR = '';
            this.itemsA = [];
            for (var i in log._themeAcc) {
                this.itemsA.push({ name: log._themeAcc[i]._nom, value: log._themeAcc[i]._id });
            }
            this.classes = [];
            //création de la liste pour les unité de travail
            this.setList = function () {
                var list = [];
                list = log.getlistofclasses(_this.selectedItemC);
                _this.classes.length = 0;
                //add the new list in list for the template
                _this.classes = list;
            };
            //select all the classes in the list
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
                //this.geomp = '';
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
            /************** subscribe to the drawing event ***************/
            window.drawObs.drawPolygon.subscribe(function (value) {
                //create a geojson with the infromation obtain
                if (_this.drawingchecked == true) {
                    log.createGeoJson('ESPG:' + value.spatialReference.wkid, value.rings);
                    //show the geo json in the input 
                    that.geomSR = log._geom;
                }
            });
            /************** Shapefile load ***************/
            this.loadshpEX = function () {
                var geom;
                //get the files in the input
                var files = document.getElementById('fileshpEX').files;
                //if there is no file
                if (files.length == 0) {
                    alert('No files');
                }
                else {
                    var file = files[0];
                    //A file reader
                    var reader_1 = new FileReader();
                    //fonction for the file reader
                    reader_1.onload = function (e) {
                        if (reader_1.readyState != 2 || reader_1.error) {
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
                                //Create a geojson with the onfromation of the shapefile
                                log.createGeoJson('EPSG:4326', geomGEOJSON);
                                //set the geojson in the input
                                that.geomSR = log._geom;
                                //create the polygon in the viewer with a zoom on it
                                log.createPolygons(mapApi.id, geomDR);
                            });
                        }
                    };
                    //read the file
                    reader_1.readAsArrayBuffer(file);
                }
            };
            /************** Advanced Setting ***************/
            this.ShowHideAdvanced = function () {
                if (log._environnementSel != '') {
                    $scope.IsVisibleASP = $scope.IsVisibleASP ? false : true;
                }
            };
            /************** interactive List Advanced Setting ***************/
            this.selectedItemENT = '';
            this.itemsENT = [];
            //changement
            for (var i in log._envAcc) {
                this.itemsENT.push({ name: log._envAcc[i]._env, value: log._envAcc[i]._env });
            }
            /**************** From Submission ***************/
            //Envoie le formulaire a l'Api
            this.submitSRForm = function () {
                //get all the information of the form into the class
                this.geomSR = log._geom;
                var listofclass = [];
                for (var i in this.classes) {
                    if (this.classes[i].wanted == true) {
                        listofclass.push(this.classes[i].name);
                    }
                }
                //if the user want a clip
                var siClip;
                if (this.cbClip == true) {
                    siClip = 'oui';
                }
                else {
                    siClip = 'non';
                }
                if (this.idut == '') {
                    alert("plugins.geosys.themet");
                }
                else if (this.selectedItemD == '') {
                    alert("plugins.geosys.themet");
                }
                else if (listofclass.length < 1) {
                    alert('plugins.geosys.themet');
                }
                else {
                    //console.log(this.geomSR)
                    var extsr = new extraire_1.Extraire(this.selectedItemA);
                    extsr.setInfoForSR(listofclass, siClip, this.whereclause, this.geomSR);
                    extsr.setOptionnalEnvironnement(this.selectedItemENT);
                    //If the connection to the API is a Success
                    var apireturn = extsr.submitForm(log);
                    if (apireturn != 'success') {
                        alert(apireturn.statusText);
                        $scope.SelectedMenuEU = {
                            "background-color": "red",
                        };
                    }
                    else {
                        //$scope.IsVisibleSR = false;
                        $scope.SelectedMenuEU = {
                            "background-color": "green",
                        };
                    }
                }
            };
        });
    };
    return ExtractController;
}());
exports.ExtractController = ExtractController;
