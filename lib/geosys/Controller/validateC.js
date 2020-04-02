"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var valider_1 = require("../operation/valider");
var ValidateController = /** @class */ (function () {
    function ValidateController() {
    }
    ;
    /**
   * The controller for all the function in the delivery templates
   * @param {User} log All the information of the user
   * @param {*} mapApi The api of of the viewer to set the controller
   * @memberof manageController
   */
    ValidateController.prototype.valiControl = function (log, mapApi) {
        //mapApi.agDirectiveRegister()
        mapApi.agControllerRegister('submitFromV', function () {
            var _this = this;
            this.errJSON = false;
            /************** interactive List ***************/
            this.selectedItemE = '';
            this.selectedItemF = '';
            this.itemsE = [];
            for (var i in log.getThemeAcc()) {
                this.itemsE.push({ name: log.getThemeAcc()[i].getnom(), value: log.getThemeAcc()[i].getId() });
            }
            this.itemsF = [];
            this.setList = function () {
                _this.selectedItemF = '';
                // populate list b with new items
                _this.itemsF.length = 0;
                var list = log.setidUTtheme(_this.selectedItemE);
                for (var i in list) {
                    _this.itemsF.push(list[i]);
                }
            };
            //Envoie le fromulaire a l'API
            this.submitFormV = function () {
                if (document.getElementById('fileJSON').files.length === 0) {
                    _this.errJSON = true;
                    log.setCloseable(false);
                }
                else {
                    //get all the information of the form into the class
                    var formdata = new FormData();
                    log.setCloseable(true);
                    formdata.append('theme', _this.selectedItemE);
                    formdata.append('id_ut', _this.selectedItemF);
                    formdata.append('fichier_json', document.getElementById('fileJSON').files[0]);
                    var vali = new valider_1.Valider();
                    var api = vali.submitForm(formdata, log);
                    if (api !== undefined) {
                        alert(api);
                        log.setCloseable(false);
                    }
                }
            };
        });
    };
    return ValidateController;
}());
exports.ValidateController = ValidateController;
