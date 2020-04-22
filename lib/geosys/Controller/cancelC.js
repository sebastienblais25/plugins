"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { Cancel } from "../operation/cancel";
var CancelController = /** @class */ (function () {
    function CancelController() {
    }
    ;
    /**
    * The controoller for to cancel function
    * @param {User} log getting all the information of the user and getting the envrionnemnt h'es already in
    * @param {*} mapApi need the mapApi for setting the controller.
    * @memberof manageController
    */
    CancelController.prototype.cancelcontrols = function (log, mapApi) {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('cancelStep', function ($scope) {
            var _this = this;
            /************** interactive List ***************/
            //theme
            this.selectedItemA = '';
            //working unit ID
            this.selectedItemB = '';
            //Step for the cancel
            this.stepCan = '';
            //Set up for the list of theme
            this.itemsA = [];
            for (var i in log.getThemeAcc()) {
                this.itemsA.push({ name: log.getThemeAcc()[i].getId(), value: log.getThemeAcc()[i].getId() });
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
                //log.setbaseTheme(this.selectedItemA);
            };
            /**************** From Submission ***************/
            this.submitCan = function () {
                //get all the information of the form into the class
                /*let ext = new Extraire(
                     this.selectedItemA
                    ,this.selectedItemB);
                let ApiReturn:any = ext.submitForm(log);
                log.resetBaseTheme();
                if (ApiReturn != 'success'){
                    alert(ApiReturn.statusText)
                }
                }*/
                //alert(this._ApiReturn.value);    
            };
        });
    };
    return CancelController;
}());
exports.CancelController = CancelController;
