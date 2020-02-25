"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var idWu = /** @class */ (function () {
    function idWu(theme, wUnit) {
        this._theme = theme;
        this._wUnit = wUnit;
    }
    idWu.prototype.getTheme = function () {
        return this._theme;
    };
    idWu.prototype.getwUnit = function () {
        return this._wUnit;
    };
    idWu.prototype.getspecificwUnit = function (rank) {
        return this._wUnit[rank];
    };
    idWu.prototype.setTheme = function (theme) {
        this._theme = theme;
    };
    idWu.prototype.setwUnit = function (wUnit) {
        this._wUnit = wUnit;
    };
    idWu.prototype.setspecificwUnit = function (wUnit, rank) {
        this._wUnit[rank] = wUnit;
    };
    return idWu;
}());
exports.idWu = idWu;
