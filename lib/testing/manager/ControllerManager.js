"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****** Import ******/
var extraire_1 = require("../operation/extraire");
var menuManager_1 = require("./menuManager");
var planifier_1 = require("../operation/planifier");
var manageController = /** @class */ (function () {
    function manageController() {
    }
    ;
    //Submit controller
    manageController.prototype.extrairecontrols = function (log, panel /* À enlever */, mapApi) {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitCtrl', function ($scope) {
            //List theme and idut
            /*$scope.theme = ["hydro_50k","corint_250k"];

            $scope.themes = [];
            $scope.themes.hydro_50k = log._idUt[0]._wUnit;
            $scope.themes.corint_250k = log._idUt[1]._wUnit; */
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function () {
                $scope.IsVisible = $scope.IsVisible ? false : true;
            };
            //Envoie le formulaire a l'Api
            this.submitForm = function () {
                //get all the information of the form into the class
                var ext = new extraire_1.Extraire(document.getElementById("env").value, document.getElementById("theme").value, document.getElementById("idUt").value, document.getElementById("clip").value, document.getElementById("whereclause").value, document.getElementById("geom").value);
                var apireturn = ext.submitForm(log._token);
                if (apireturn != 'success') {
                    alert(apireturn.statusText);
                }
                else {
                    $scope.IsVisible = false;
                    console.log(log._token);
                }
                //alert(this._apireturn.value);    
            };
            //Ouvre le fromulaire dans un nouveau panel a changer pour pour mettre dans la classe menu si choisi
            this.openplan = function () {
                var menu = new menuManager_1.menuManager();
                var outputPlan;
                outputPlan = menu.planifManager(log, panel, mapApi);
                panel.body = "<div>" + outputPlan + "</div>";
            };
        });
        /************** ***************/
    };
    manageController.prototype.listeExtraire = function (log, mapApi) {
        mapApi.agControllerRegister('autoCtrl', function ($scope) {
            var _this = this;
            this.selectedItemA = '';
            this.selectedItemB = '';
            this.itemsA = [
                { name: 'item 1', value: 'value1' },
                { name: 'item 2', value: 'value2' },
                { name: 'item 3', value: 'value3' }
            ];
            var newList = {
                value1: [{ name: 'a', value: 'a1' }, { name: 'b', value: 'b1' }, { name: 'c', value: 'c1' }],
                value2: [{ name: '1', value: '11' }, { name: '2', value: '21' }, { name: '3', value: '31' }],
                value3: [{ name: '@', value: '@1' }, { name: '#', value: '#1' }, { name: '$', value: '$1' }]
            };
            this.itemsB = [];
            this.setList = function () {
                console.log("set: " + _this.selectedItemA);
                // populate list b with new items
                _this.itemsB.length = 0;
                newList[_this.selectedItemA].forEach(function (item) { return _this.itemsB.push(item); });
            };
        });
    };
    manageController.prototype.planControl = function (log, panel /* À enlever */, mapApi) {
        mapApi.agControllerRegister('submitFromP', function ($scope) {
            //Envoie le fromulaire a l'API
            this.submitFormP = function () {
                //get all the information of the form into the class
                var plan = new planifier_1.planifier(document.getElementById("envp").value, document.getElementById("themep").value, document.getElementById("idUtp").value, document.getElementById("ttv").value, document.getElementById("classes").value, document.getElementById("dfp").value, document.getElementById("wherep").value, document.getElementById("geomp").value);
                //alert(log.gettoken());
                var apireturn = plan.submitForm(log.gettoken());
                if (apireturn != undefined) {
                    alert(apireturn + ' 4');
                    console.log(apireturn);
                }
                else {
                    console.log(log.gettoken());
                }
            };
            //a changer si choisi pour que çca soit plus interactif
            this.cancelFormP = function () {
                var menu = new menuManager_1.menuManager();
                var outputExt;
                outputExt = menu.extractManager(log, panel, mapApi);
                panel.body = "<div>" + outputExt + "</div>";
            };
        });
    };
    //Compilateur de HTML avec les variables pour les boutons
    manageController.prototype.compileTemplate = function (template, mapApi) {
        var temp = $(template);
        mapApi.$compile(temp);
        return temp;
    };
    return manageController;
}());
exports.manageController = manageController;
