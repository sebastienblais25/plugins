"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Creer = /** @class */ (function () {
    function Creer(theme, idut, nomCata, prodDesc, descProj, listSource, listPrecision, listCont) {
        this._theme = theme;
        this._idUt = idut;
        this._nomCatalogue = nomCata;
        this._prod_desc = prodDesc;
        this._descriptionProjet = descProj;
        this._listIdSource = listSource;
        this._listIdPrecision = listPrecision;
        this._listIdContrLegale = listCont;
    }
    Creer.prototype.submitFrom = function (log) {
    };
    /********* Accessor **********/
    Creer.prototype.getData = function () {
        return this._data;
    };
    Creer.prototype.setData = function (data) {
        this._data = data;
    };
    return Creer;
}());
exports.Creer = Creer;
