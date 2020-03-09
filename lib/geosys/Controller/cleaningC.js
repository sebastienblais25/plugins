"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nettoyer_1 = require("../operation/nettoyer");
var CleaningController = /** @class */ (function () {
    function CleaningController() {
    }
    ;
    /**
     * the controller for the cleaning function
     * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
     * @param {*} mapApi need the mapApi for setting the controller.
     * @memberof manageController
     */
    CleaningController.prototype.nettoyagecontrols = function (log, mapApi) {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitNetCtrl', function ($scope) {
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
                // populate list of working unit id
                _this.itemsB.length = 0;
                var list = log.setidUTtheme(_this.selectedItemA);
                for (var i in list) {
                    _this.itemsB.push(list[i]);
                }
            };
            /**************** From Submission ***************/
            this.submitNett = function () {
                if (this.selectedItemB == '') {
                    alert("Sélectionner un identifiant d'unité de travail");
                }
                else {
                    var deleted = confirm('Confirmez le nettoyage ? / Confirm the cleaning ? ');
                    if (deleted) {
                        var nettoyage = new nettoyer_1.Cleaning(this.selectedItemA, this.selectedItemB);
                        var renet = nettoyage.submitForm(log);
                        if (renet != 'success') {
                            alert(renet.statusText);
                            $scope.SelectedMenuC = {
                                "background-color": "red",
                            };
                        }
                        else {
                            //$scope.IsVisibleCL = false;
                            //console.log(log._token);
                            alert("Deleted");
                            $scope.SelectedMenuC = {
                                "background-color": "green",
                            };
                        }
                    }
                }
            };
        });
    };
    return CleaningController;
}());
exports.CleaningController = CleaningController;
