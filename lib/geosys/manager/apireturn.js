"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiReturn = /** @class */ (function () {
    /**
     * Creates an instance of ApiReturn with only an id
     * @param {string} id Id of the response of the API
     * @memberof ApiReturn
     */
    function ApiReturn(id) {
        this._id = id;
    }
    /**
     * When a call to the API is done with the code. this will set the remaining of the information
     * @param {string} idListCode A code for a list
     * @param {string} nom The name in the db
     * @param {string} descEn English description
     * @param {string} descFr French description
     * @memberof ApiReturn
     */
    ApiReturn.prototype.setRemaining = function (idListCode, nom, descEn, descFr) {
        this._idListeCode = idListCode;
        this._nom = nom;
        this._descEn = descEn;
        this._descFr = descFr;
    };
    /******* Accessor *******/
    ApiReturn.prototype.getId = function () {
        return this._id;
    };
    ApiReturn.prototype.setId = function (id) {
        this._id = id;
    };
    ApiReturn.prototype.getnom = function () {
        return this._nom;
    };
    ApiReturn.prototype.setnom = function (nom) {
        this._nom = nom;
    };
    return ApiReturn;
}());
exports.ApiReturn = ApiReturn;
