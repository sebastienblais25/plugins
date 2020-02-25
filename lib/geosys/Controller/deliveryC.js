"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var livraison_1 = require("../operation/livraison");
var DeliveryController = /** @class */ (function () {
    function DeliveryController() {
    }
    ;
    /**
   *the controller for all the function in the delivery templates
   * @param {User} log All the information of the user
   * @param {*} mapApi the api of of the viewer to set the controller
   * @memberof manageController
   */
    DeliveryController.prototype.deliControl = function (log, mapApi) {
        //mapApi.agDirectiveRegister()
        mapApi.agControllerRegister('submitFromD', function ($scope) {
            var _this = this;
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function () {
                if (log._environnementSel != '') {
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if ($scope.IsVisible == true) {
                        $scope.SelectedMenuD = {
                            "opacity": "1",
                        };
                    }
                    else {
                        $scope.SelectedMenuD = {};
                    }
                }
            };
            /************** interactive List ***************/
            this.typeOper = '';
            this.selectedItemE = '';
            this.selectedItemF = '';
            this.itemsE = [];
            for (var i in log._themeAcc) {
                this.itemsE.push({ name: log._themeAcc[i]._nom, value: log._themeAcc[i]._id });
            }
            this.itemsF = [];
            this.setList = function () {
                console.log("set: " + _this.selectedItemE);
                console.log("set: " + _this.typeOper);
                // populate list b with new items
                _this.itemsF.length = 0;
                var list = log.setidUTtheme(_this.selectedItemE);
                for (var i in list) {
                    _this.itemsF.push(list[i]);
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
            //Envoie le fromulaire a l'API
            this.submitFormD = function (element) {
                //get all the information of the form into the class
                var formdata = new FormData();
                formdata.append('fichier_data', document.getElementById('fileMD').files[0]);
                formdata.append('fichier_meta', document.getElementById('filefgdb').files[0]);
                var livre = new livraison_1.Livraison(this.selectedItemF, this.selectedItemE, this.typeOper);
                livre.setOptionnalEnvironnement(this.selectedItemENT);
                var apireturn = livre.submitForm(formdata, log);
                if (apireturn != undefined) {
                    alert(apireturn + ' 4');
                    console.log(apireturn);
                    $scope.SelectedMenuD = {
                        "background-color": "red",
                    };
                }
                else {
                    console.log(log.gettoken());
                    $scope.SelectedMenuD = {
                        "background-color": "green",
                    };
                }
            };
        });
    };
    return DeliveryController;
}());
exports.DeliveryController = DeliveryController;
