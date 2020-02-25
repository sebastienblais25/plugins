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
        mapApi.agControllerRegister('SubmitCtrl', function ($scope) {
            var _this = this;
            $scope.IsVisible = false;
            $scope.ISVisibleASP = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function () {
                if (log._environnementSel != '') {
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if ($scope.IsVisible == true) {
                        $scope.SelectedMenuE = {
                            "opacity": "1",
                        };
                    }
                    else {
                        $scope.SelectedMenuE = {};
                    }
                }
            };
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
                    $scope.IsVisible = false;
                    $scope.SelectedMenuE = {
                        "background-color": "green",
                    };
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
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function () {
                if (log._environnementSel != '') {
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if ($scope.IsVisible == true) {
                        $scope.SelectedMenuEU = {
                            "opacity": "1",
                        };
                    }
                    else {
                        $scope.SelectedMenuEU = {};
                    }
                }
            };
            /************** interactive List ***************/
            this.selectedItemA = '';
            this.whereclause = '';
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
            /************** subscribe to the drawing event ***************/
            window.drawObs.drawPolygon.subscribe(function (value) {
                console.log("Polygon added: " + JSON.stringify(value));
                //log.createGeoJson('ESPG:3978',value.rings)
                var arcGIS = require('terraformer-arcgis-parser');
                var primitive = arcGIS.parse({
                    "rings": [[[243517.11899923813, 1216032.5833121669], [1640519.9130048268, 1279532.7103124205], [934081.0001270007, 390530.9323088648], [243517.11899923813, 1216032.5833121669]]], "spatialReference": { "wkid": 3978 }
                });
                console.log(JSON.stringify(primitive));
                JSON.stringify(value);
                //this.geomSR = JSON.stringify(log.createGeoJson('ESPG:3978',value.rings));
                //alert(JSON.stringify(value));
                log._geom = JSON.stringify(value);
                //(<HTMLInputElement>document.getElementById('geomEx')).value= JSON.stringify(value);
            });
            /************** Copy to clipboard ***************/
            this.copyToClip = function () {
                var copyElement = document.createElement("span");
                copyElement.appendChild(document.createTextNode(log._geom));
                copyElement.id = 'tempCopyToClipboard';
                document.body.append(copyElement);
                // select the text
                var range = document.createRange();
                range.selectNode(copyElement);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                // copy & cleanup
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
                copyElement.remove();
            };
            /************** Shapefile load ***************/
            this.loadshpEX = function () {
                var geom;
                //get the files in the input
                var files = document.getElementById('fileshpEX').files;
                //if there is no file
                if (files.length == 0) {
                    alert('hello');
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
                            shp(reader_1.result).then(function (dta) {
                                //console.log(dta);
                                geom = JSON.stringify(dta);
                                log.createGeoJson('EPSG:4326', dta.features[0].geometry.coordinates[0]);
                                log._geom = JSON.stringify(dta);
                                document.getElementById('geomEx').value = geom;
                                this.geomSR = geom;
                            });
                        }
                    };
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
                var siClip;
                if (this.cbClip == true) {
                    siClip = 'oui';
                }
                else {
                    siClip = 'non';
                }
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
                    $scope.IsVisible = false;
                    $scope.SelectedMenuEU = {
                        "background-color": "green",
                    };
                }
            };
        });
    };
    return ExtractController;
}());
exports.ExtractController = ExtractController;
