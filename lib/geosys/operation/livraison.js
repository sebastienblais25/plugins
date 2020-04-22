"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apiConnect_1 = require("../apiConnect");
var url_1 = require("../config/url");
var Livraison = /** @class */ (function () {
    function Livraison(idut, theme, typeconn) {
        this._conn = new apiConnect_1.Connexion();
        this._envopt = '';
        this._idUt = idut;
        this._theme = theme;
        this._typeConn = typeconn;
    }
    ;
    Livraison.prototype.submitForm = function (form, log) {
        var method;
        if (this._typeConn === 'Update') {
            method = 'Put';
        }
        else {
            method = 'Post';
        }
        var apire = this._conn.connexionAPIFormData(log.getToken(), form, log.constructUrl(url_1.urlDeliveryUpdate, this._idUt), method);
        //for test
        if (apire == 'success') {
            //alert( this.getinfo());
            return apire;
        }
        else {
            //alert(this.getinfo().status);
            return apire;
        }
    };
    /**
    * Set an optionnal environnement for the header of the json
    * @param {string} env the optionnal environnement
    * @memberof Livraison
    */
    Livraison.prototype.setOptionnalEnvironnement = function (env) {
        var optEnv = "'env_app' : " + env;
        //console.log(optEnv);
        this._envopt = optEnv;
    };
    return Livraison;
}());
exports.Livraison = Livraison;
