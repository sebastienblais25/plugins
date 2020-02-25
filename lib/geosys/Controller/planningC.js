"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var planifier_1 = require("../operation/planifier");
//const FileReader = require('filereader')
var PlanningController = /** @class */ (function () {
    function PlanningController() {
    }
    ;
    /**
     *the controller for all the function in planning templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @param {*} config the config is for drawing
     * @memberof manageController
     */
    PlanningController.prototype.planControl = function (log, mapApi, config) {
        mapApi.agControllerRegister('submitFromP', function ($scope) {
            var _this = this;
            var that = this;
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquant sur le titre
            this.ShowHide = function () {
                if (log._environnementSel != '') {
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if ($scope.IsVisible == true) {
                        $scope.SelectedMenuP = {
                            "opacity": "1",
                        };
                    }
                    else {
                        $scope.SelectedMenuP = {};
                    }
                }
            };
            /************** interactive List ***************/
            this.selectedItemC = '';
            this.selectedItemD = '';
            this.dfp = '';
            this.geomp = '';
            this.wherep = '';
            this.itemsC = [];
            //theme list
            for (var i in log._themeAcc) {
                this.itemsC.push({ name: log._themeAcc[i]._nom, value: log._themeAcc[i]._id });
            }
            //List of working type
            this.itemsD = [];
            //the group of classes for a theme
            this.classes = [];
            //function ng-chage of the theme list
            this.setList = function () {
                console.log("set: " + _this.selectedItemC);
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
                _this.idut = slectedthem + '_' + dd + mm + yyyy + '_';
                //populate the working type list
                _this.itemsD.length = 0;
                _this.itemsD = log.setworkingtype(_this.selectedItemC);
                /** liste de classes **/
                var list = [];
                list = log.getlistofclasses(_this.selectedItemC);
                _this.classes.length = 0;
                //add the new list in list for the template
                _this.classes = list;
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
            //subscribe for the drawing
            window.drawObs.drawPolygon.subscribe(function (value) {
                var ArcGIS = require('terraformer-arcgis-parser');
                _this.geomp = JSON.stringify(ArcGIS.parse(value));
            });
            this.toggleDraw = function () {
                var copyElement = document.createElement("span");
                copyElement.appendChild(document.createTextNode(this.geomp));
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
            /************** Shapefile Load ***************/
            this.loadshp = function () {
                var files = document.getElementById('fileshp').files;
                if (files.length == 0) {
                    alert('hello');
                }
                else {
                    var file = files[0];
                    var reader_1 = new FileReader();
                    reader_1.onload = function (e) {
                        if (reader_1.readyState != 2 || reader_1.error) {
                            alert('hello');
                            return;
                        }
                        else {
                            alert('working');
                            var myMap_1 = window.RAMP.mapById(mapApi.id);
                            window.RAMP.mapById(mapApi.id).layersObj.addLayer('demoPolygon');
                            var testLayer = mapApi.layers.getLayersById('demoPolygon')[0];
                            var shp = require("shpjs");
                            shp(reader_1.result).then(function (dta) {
                                //console.log(JSON.stringify(dta.features[0].geometry.coordinates[0][0][0]));
                                //let coord = JSON.stringify(dta.features[0].geometry.coordinates[0]);
                                var test = "{\"type\":\"polygon\",\"rings\":[[[680080.4921259843,1739908.6310642622],[2759709.6513843033,1724033.5993141988],[2696209.5243840497,985844.622936246],[822955.7778765559,938219.5276860553],[680080.4921259843,1739908.6310642622]]],\"_ring\":0,\"spatialReference\":{\"wkid\":3978}}";
                                log.createPolygons(mapApi.id, test);
                                console.log(myMap_1);
                                this.geomp = JSON.stringify(dta);
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
                for (var i in this.classes) {
                    if (this.classes[i].wanted == true) {
                        listofclass.push(this.classes[i].name);
                    }
                }
                //set the information in the the json 
                var plan = new planifier_1.planifier(this.selectedItemC, document.getElementById("idUt").value, this.selectedItemD, listofclass, this.dfp, this.geomp, this.wherep);
                //submit the form to the API
                var apireturn = plan.submitForm(log);
                //If the return isn't a succes
                if (apireturn != 'success') {
                    $scope.SelectedMenuP = {
                        "background-color": "red",
                    };
                }
                else {
                    $scope.IsVisible = false;
                    $scope.SelectedMenuP = {
                        "background-color": "green",
                    };
                }
            };
        });
    };
    return PlanningController;
}());
exports.PlanningController = PlanningController;
