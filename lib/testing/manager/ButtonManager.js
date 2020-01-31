"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extraire_1 = require("../operation/extraire");
var manageButton = /** @class */ (function () {
    function manageButton() {
    }
    ;
    //Submit controller
    manageButton.prototype.angularcontrols = function (ext, token, mapApi) {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        mapApi.agControllerRegister('SubmitCtrl', function ($scope) {
            this.submitForm = function () {
                //get all the information of the form into the class
                ext = new extraire_1.Extraire(document.getElementById("env").value, document.getElementById("theme").value, document.getElementById("idUt").value, document.getElementById("clip").value, document.getElementById("whereclause").value, document.getElementById("geom").value);
                var apireturn = ext.submitForm(this._tokenbearer);
                if (apireturn.status == 401) {
                    alert(apireturn.statusText);
                }
                else {
                    console.log(token);
                }
                //alert(this._apireturn.value);    
            };
        });
        /************** ***************/
    };
    manageButton.prototype.compileTemplate = function (template, mapApi) {
        var temp = $(template);
        mapApi.$compile(temp);
        return temp;
    };
    return manageButton;
}());
exports.manageButton = manageButton;
