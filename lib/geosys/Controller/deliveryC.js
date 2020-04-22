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
        mapApi.agControllerRegister('submitFromD', function () {
            var _this = this;
            //error message for the metadata file
            this.errMD = false;
            //error message for the fgbd
            this.errFGDB = false;
            /************** interactive List ***************/
            //operation type on the DB
            this.typeOper = '';
            //theme
            this.selectedItemE = '';
            //Working unit ID
            this.selectedItemF = '';
            //set up theme list
            this.itemsE = [];
            for (var i in log.getThemeAcc()) {
                this.itemsE.push({ name: log.getThemeAcc()[i].getnom(), value: log.getThemeAcc()[i].getId() });
            }
            this.itemsF = [];
            this.setList = function () {
                // populate list b with new items
                _this.selectedItemF = '';
                _this.itemsF.length = 0;
                var list = log.setidUTtheme(_this.selectedItemE);
                for (var i in list) {
                    _this.itemsF.push(list[i]);
                }
                //log.setbaseTheme(this.selectedItemE);
            };
            /************** Advanced Setting ***************/
            this.ShowHideAdvanced = function () {
                if (log.getEnvironnementSel() !== '') {
                    this.IsVisibleASP = this.IsVisibleASP ? false : true;
                }
            };
            /************** interactive List Advanced Setting ***************/
            this.selectedItemENT = '';
            this.itemsENT = [];
            //changement
            for (var i in log.getEnvAcc()) {
                this.itemsENT.push({ name: log.getEnvAcc()[i]._env, value: log.getEnvAcc()[i]._env });
            }
            //Envoie le formulaire a l'API
            this.submitFormD = function () {
                //get all the information of the form into the class
                if (document.getElementById('fileMD').files.length === 0) {
                    this.errMD = true;
                    log.setCloseable(false);
                }
                else if (document.getElementById('filefgdb').files.length === 0) {
                    this.errFGDB = true;
                    log.setCloseable(false);
                }
                else {
                    var formdata = new FormData();
                    log.setCloseable(true);
                    formdata.append('fichier_data', document.getElementById('fileMD').files[0]);
                    formdata.append('fichier_meta', document.getElementById('filefgdb').files[0]);
                    var livre = new livraison_1.Livraison(this.selectedItemF, this.selectedItemE, this.typeOper);
                    livre.setOptionnalEnvironnement(this.selectedItemENT);
                    //submit form
                    var ApiReturn = livre.submitForm(formdata, log);
                    if (ApiReturn != undefined) {
                        log.setCloseable(false);
                        alert(ApiReturn);
                    }
                }
            };
        });
    };
    return DeliveryController;
}());
exports.DeliveryController = DeliveryController;
