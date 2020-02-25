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
            $scope.IsVisible = false;
            //permet d'afficher ou chacher le formulaire en cliquanr sur le titre
            this.ShowHide = function () {
                if (log._environnementSel != '') {
                    $scope.IsVisible = $scope.IsVisible ? false : true;
                    if ($scope.IsVisible == true) {
                        $scope.SelectedMenuV = {
                            "opacity": "1",
                        };
                    }
                    else {
                        $scope.SelectedMenuV = {};
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
            this.filechanged = function () {
                _this.fileSelect.trigger('click');
            };
            //Envoie le fromulaire a l'API
            this.submitFormD = function (element) {
                //get all the information of the form into the class
                var formdata = new FormData();
                formdata.append('theme', this.selectedItemE);
                formdata.append('id_ut', this.selectedItemF);
                formdata.append('fichier_json', document.getElementById('fileJSON').files[0]);
                formdata.append('logfile', 'blahblahblah');
                var vali = new valider_1.Valider();
                var api = vali.submitForm(formdata, log);
                if (api != undefined) {
                    alert(api + ' 4');
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
            };
        });
    };
    return ValidateController;
}());
exports.ValidateController = ValidateController;
