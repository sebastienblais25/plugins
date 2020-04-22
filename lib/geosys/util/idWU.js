"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IdWu = /** @class */ (function () {
    function IdWu(theme, wUnit) {
        this._theme = theme;
        this._wUnit = wUnit;
    }
    IdWu.prototype.getTheme = function () {
        return this._theme;
    };
    IdWu.prototype.getwUnit = function () {
        return this._wUnit;
    };
    IdWu.prototype.getspecificwUnit = function (rank) {
        return this._wUnit[rank];
    };
    IdWu.prototype.setTheme = function (theme) {
        this._theme = theme;
    };
    IdWu.prototype.setwUnit = function (wUnit) {
        this._wUnit = wUnit;
    };
    IdWu.prototype.setspecificwUnit = function (wUnit, rank) {
        this._wUnit[rank] = wUnit;
    };
    return IdWu;
}());
exports.IdWu = IdWu;
