"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var valider_1 = require("../operation/valider");
var ValidateController = /** @class */ (function () {
    function ValidateController() {
    }
    ;
    /**
   *the controller for all the function in the delivery templates
   * @param {User} log All the information of the user
   * @param {*} mapApi the api of of the viewer to set the controller
   * @memberof manageController
   */
    ValidateController.prototype.valiControl = function (log, mapApi) {
        //mapApi.agDirectiveRegister()
        mapApi.agControllerRegister('submitFromV', function ($scope) {
            var _this = this;
            /************** interactive List ***************/
            this.selectedItemE = '';
            this.selectedItemF = '';
            this.itemsE = [];
            for (var i in log._themeAcc) {
                this.itemsE.push({ name: log._themeAcc[i]._nom, value: log._themeAcc[i]._id });
            }
            this.itemsF = [];
            this.setList = function () {
                // populate list b with new items
                _this.itemsF.length = 0;
                var list = log.setidUTtheme(_this.selectedItemE);
                for (var i in list) {
                    _this.itemsF.push(list[i]);
                }
            };
            //Envoie le fromulaire a l'API
            this.submitFormV = function (element) {
                if (this.selectedItemF == '') {
                    alert("Sélectionner un identifiant d'unité de travail");
                }
                else if (document.getElementById('fileJSON').files.length == 0) {
                    alert("Ajoute un fichier de métadonnée");
                }
                else {
                    //get all the information of the form into the class
                    var formdata = new FormData();
                    formdata.append('theme', this.selectedItemE);
                    formdata.append('id_ut', this.selectedItemF);
                    formdata.append('fichier_json', document.getElementById('fileJSON').files[0]);
                    formdata.append('logfile', 'blahblahblah');
                    var vali = new valider_1.Valider();
                    var api = vali.submitForm(formdata, log);
                    if (api != undefined) {
                        alert(api);
                        console.log(api);
                        $scope.SelectedMenuV = {
                            "background-color": "red",
                        };
                    }
                    else {
                        console.log(log.gettoken());
                        $scope.SelectedMenuV = {
                            "background-color": "green",
                        };
                    }
                }
            };
        });
    };
    return ValidateController;
}());
exports.ValidateController = ValidateController;
