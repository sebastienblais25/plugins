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
    manageController.prototype.planControl = function (log, panel /* À enlever */, mapApi) {
        mapApi.agControllerRegister('submitFromP', function ($scope) {
            var _this = this;
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function () {
                $scope.IsVisible = $scope.IsVisible ? false : true;
            };
            //Envoie le fromulaire a l'API
            this.submitFormP = function () {
                //get all the information of the form into the class
                var plan = new planifier_1.planifier(document.getElementById("envp").value, this.selectedItemC, this.selectedItemD, document.getElementById("ttv").value, document.getElementById("classes").value, document.getElementById("dfp").value, document.getElementById("wherep").value, document.getElementById("geomp").value);
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
            /************** interactive List ***************/
            this.selectedItemC = '';
            this.selectedItemD = '';
            this.itemsC = [];
            for (var i in log._themeAcc) {
                this.itemsC.push({ name: log._themeAcc[i], value: log._themeAcc[i] });
            }
            this.itemsD = [];
            this.setList = function () {
                console.log("set: " + _this.selectedItemC);
                // populate list b with new items
                _this.itemsD.length = 0;
                var list = log.setidUtToDDL(_this.selectedItemC);
                for (var i in list) {
                    _this.itemsD.push(list[i]);
                }
                //newList[this.selectedItemA].forEach(item => this.itemsB.push(item))
            };
        });
    };
    //Submit controller
    manageController.prototype.extrairecontrols = function (log, panel /* À enlever */, mapApi) {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitCtrl', function ($scope) {
            var _this = this;
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function () {
                $scope.IsVisible = $scope.IsVisible ? false : true;
            };
            //Envoie le formulaire a l'Api
            this.submitForm = function () {
                //get all the information of the form into the class
                alert(this.selectedItemEN + this.selectedItemA + this.selectedItemB);
                var ext = new extraire_1.Extraire(this.selectedItemEN, this.selectedItemA, this.selectedItemB, document.getElementById("clip").value, document.getElementById("whereclause").value, document.getElementById("geom").value);
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
            //test
            //Ouvre le fromulaire dans un nouveau panel a changer pour pour mettre dans la classe menu si choisi
            this.openplan = function () {
                var menu = new menuManager_1.menuManager();
                var outputPlan;
                outputPlan = menu.planifManager(log, panel, mapApi);
                panel.body = "<div>" + outputPlan + "</div>";
            };
            /************** interactive List ***************/
            this.selectedItemA = '';
            this.selectedItemB = '';
            this.selectedItemEN = '';
            this.itemsEN = [];
            for (var i in log._envAcc) {
                this.itemsEN.push({ name: log._envAcc[i], value: log._envAcc[i] });
            }
            this.itemsA = [];
            for (var i in log._themeAcc) {
                this.itemsA.push({ name: log._themeAcc[i], value: log._themeAcc[i] });
            }
            this.itemsB = [];
            //création de la liste pour les unité de travail
            this.setList = function () {
                console.log("set: " + _this.selectedItemA);
                // populate list b with new items
                _this.itemsB.length = 0;
                var list = log.setidUtToDDL(_this.selectedItemA);
                for (var i in list) {
                    _this.itemsB.push(list[i]);
                }
                //newList[this.selectedItemA].forEach(item => this.itemsB.push(item))
            };
        });
    };
    manageController.prototype.deliControl = function (log, panel /* À enlever */, mapApi) {
        mapApi.agControllerRegister('submitFromD', function ($scope) {
            var _this = this;
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function () {
                $scope.IsVisible = $scope.IsVisible ? false : true;
            };
            //Envoie le fromulaire a l'API
            /*this.submitFormP = function() {
                //get all the information of the form into the class
                
                let plan:planifier = new planifier(
                    (<HTMLInputElement>document.getElementById("envp")).value,
                    this.selectedItemC,
                    this.selectedItemD,
                    (<HTMLInputElement>document.getElementById("ttv")).value,
                    (<HTMLInputElement>document.getElementById("classes")).value,
                    (<HTMLInputElement>document.getElementById("dfp")).value,
                    (<HTMLInputElement>document.getElementById("wherep")).value,
                    (<HTMLInputElement>document.getElementById("geomp")).value);
                //alert(log.gettoken());
                let apireturn:any = plan.submitForm(log.gettoken());
                
                if (apireturn != undefined){
                    alert(apireturn + ' 4');
                    console.log(apireturn);
                }else{
                    console.log(log.gettoken());
                }
            };*/
            /************** interactive List ***************/
            this.selectedItemE = '';
            this.selectedItemF = '';
            this.selectedItemEND = '';
            this.itemsEND = [];
            for (var i in log._envAcc) {
                this.itemsEND.push({ name: log._envAcc[i], value: log._envAcc[i] });
            }
            this.itemsE = [];
            for (var i in log._themeAcc) {
                this.itemsE.push({ name: log._themeAcc[i], value: log._themeAcc[i] });
            }
            this.itemsF = [];
            this.setList = function () {
                console.log("set: " + _this.selectedItemE);
                // populate list b with new items
                _this.itemsF.length = 0;
                var list = log.setidUtToDDL(_this.selectedItemE);
                for (var i in list) {
                    _this.itemsF.push(list[i]);
                }
                //newList[this.selectedItemA].forEach(item => this.itemsB.push(item))
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
