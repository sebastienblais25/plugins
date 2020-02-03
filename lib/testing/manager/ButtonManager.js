"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****** Import ******/
var extraire_1 = require("../operation/extraire");
var menuManager_1 = require("./menuManager");
var manageButton = /** @class */ (function () {
    function manageButton() {
    }
    ;
    //Submit controller
    manageButton.prototype.extrairecontrols = function (log, panel /* À enlever */, mapApi) {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitCtrl', function ($scope) {
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
                if (apireturn.status == 401) {
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
    manageButton.prototype.planControl = function (log, panel /* À enlever */, mapApi) {
        mapApi.agControllerRegister('submitFromP', function ($scope) {
            //Envoie le fromulaire a l'API
            this.submitFormP = function () {
                //get all the information of the form into the class
                /*let apireturn:any = ext.submitForm(this._tokenbearer);
                if (apireturn.status == 401){
                    alert(apireturn.statusText)
                }else{
                    console.log(token);
                }*/
                //alert("hello"/*this._apireturn.value*/);    
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
    manageButton.prototype.compileTemplate = function (template, mapApi) {
        var temp = $(template);
        mapApi.$compile(temp);
        return temp;
    };
    return manageButton;
}());
exports.manageButton = manageButton;
