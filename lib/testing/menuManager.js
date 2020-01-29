"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extraire_1 = require("./extraire");
var manageMenu = /** @class */ (function () {
    function manageMenu() {
    }
    ;
    //Submit controller
    manageMenu.prototype.angularcontrols = function (ext, token, mapApi) {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitCtrl', function ($scope) {
            this.submitForm = function () {
                //get all the information of the form into the class
                ext = new extraire_1.Extraire(document.getElementById("env").value, document.getElementById("theme").value, document.getElementById("idlot").value, document.getElementById("clip").value, document.getElementById("whereclause").value, document.getElementById("geom").value);
                this._apireturn = ext.submitForm(this._tokenbearer);
                console.log(token);
                //alert(this._apireturn.value);    
            };
        });
        /************** ***************/
    };
    manageMenu.prototype.compileTemplate = function (template, mapApi) {
        var temp = $(template);
        mapApi.$compile(temp);
        return temp;
    };
    return manageMenu;
}());
exports.manageMenu = manageMenu;
