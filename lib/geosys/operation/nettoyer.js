"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apiConnect_1 = require("../apiConnect");
var url_1 = require("../config/url");
var Cleaning = /** @class */ (function () {
    function Cleaning(theme, idut) {
        this._json = '';
        this._conn = new apiConnect_1.connexion();
        this._theme = theme;
        this._idUt = idut;
    }
    Cleaning.prototype.submitForm = function (log) {
        this.setData(this._conn.connexionAPI(log.getToken(), this.getJson(), log.constructUrl(url_1.urlDeleteClean, this.getIdUt()), 'Delete'));
        return this.getData();
    };
    /******* Accessor ********/
    Cleaning.prototype.getData = function () {
        return this._data;
    };
    Cleaning.prototype.setData = function (data) {
        this._data = data;
    };
    Cleaning.prototype.getTheme = function () {
        return this._theme;
    };
    Cleaning.prototype.setTheme = function (theme) {
        this._theme = theme;
    };
    Cleaning.prototype.getIdUt = function () {
        return this._idUt;
    };
    Cleaning.prototype.setIdUt = function (idut) {
        this._idUt = idut;
    };
    Cleaning.prototype.getJson = function () {
        return this._json;
    };
    Cleaning.prototype.setJson = function (json) {
        this._json = json;
    };
    return Cleaning;
}());
exports.Cleaning = Cleaning;
