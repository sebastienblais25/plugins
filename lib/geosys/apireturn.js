"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Apireturn = /** @class */ (function () {
    /**
     *Creates an instance of Apireturn with only an id
     * @param {string} id id of the response of the API
     * @memberof Apireturn
     */
    function Apireturn(id) {
        this._id = id;
    }
    /**
     * when a call to the API is done with the code. this will set the remaining of the information
     * @param {string} idListCode a code for a list
     * @param {string} nom the name in the db
     * @param {string} descEn english description
     * @param {string} descFr french description
     * @memberof Apireturn
     */
    Apireturn.prototype.setRemaining = function (idListCode, nom, descEn, descFr) {
        this._idListeCode = idListCode;
        this._nom = nom;
        this._descEn = descEn;
        this._descFr = descFr;
    };
    return Apireturn;
}());
exports.Apireturn = Apireturn;
