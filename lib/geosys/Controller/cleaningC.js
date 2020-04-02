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
        mapApi.agControllerRegister('SubmitNetCtrl', function ($scope) {
            var _this = this;
            /************** interactive List ***************/
            //theme
            this.selectedItemA = '';
            //working unit ID
            this.selectedItemB = '';
            //set up the theme list
            this.itemsA = [];
            for (var i in log.getThemeAcc()) {
                this.itemsA.push({ name: log.getThemeAcc()[i].getnom(), value: log.getThemeAcc()[i].getId() });
            }
            this.itemsB = [];
            //création de la liste pour les unité de travail
            this.setList = function () {
                _this.selectedItemB = '';
                // populate list of working unit id
                _this.itemsB.length = 0;
                var list = log.setidUTtheme(_this.selectedItemA);
                for (var i in list) {
                    _this.itemsB.push(list[i]);
                }
            };
            /**************** From Submission ***************/
            this.submitNett = function () {
                //Double confirmation
                var deleted = confirm('Confirmez le nettoyage ? / Confirm the cleaning ? ');
                if (deleted) {
                    log.setCloseable(true);
                    var nettoyage = new nettoyer_1.Cleaning(_this.selectedItemA, _this.selectedItemB);
                    var renet = nettoyage.submitForm(log);
                    if (renet != 'success') {
                        log.setCloseable(false);
                        alert(renet.statusText);
                    }
                }
            };
        });
    };
    return CleaningController;
}());
exports.CleaningController = CleaningController;
