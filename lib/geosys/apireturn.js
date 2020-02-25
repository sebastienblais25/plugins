"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Apireturn = /** @class */ (function () {
    function Apireturn(id) {
        this._id = id;
    }
    Apireturn.prototype.setRemaining = function (idListCode, nom, descEn, descFr) {
        this._idListeCode = idListCode;
        this._nom = nom;
        this._descEn = descEn;
        this._descFr = descFr;
    };
    return Apireturn;
}());
exports.Apireturn = Apireturn;
