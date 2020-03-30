"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apiConnect_1 = require("../apiConnect");
var url_1 = require("../config/url");
var Valider = /** @class */ (function () {
    function Valider() {
        this._conn = new apiConnect_1.connexion();
    }
    ;
    Valider.prototype.submitForm = function (form, log) {
        console.log(form.get('fichier_data'));
        var apire = this._conn.connexionAPIFormData(log.getToken(), form, log.constructUrl(url_1.urlValidateMD), 'Post');
        //alert(apire);
        //for test
        if (apire == 'success') {
            //alert( this.getinfo());
            return apire;
        }
        else {
            //alert(this.getinfo().status);
            return apire.status;
        }
    };
    return Valider;
}());
exports.Valider = Valider;
