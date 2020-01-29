"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileSaver = require('file-saver'); // le import
var url_1 = require("./url");
var apiConnect_1 = require("./apiConnect");
var Extraire = /** @class */ (function () {
    //Constructor
    function Extraire(env, theme, idLot, clip, whereClause, geom) {
        this._conn = new apiConnect_1.connexion();
        this._environnement = env;
        this._theme = theme;
        this._idLot = idLot;
        this._clip = clip;
        this._whereClause = whereClause;
        this._geom = geom;
    }
    //Send json form to API in ajax
    Extraire.prototype.submitForm = function (token) {
        //To Change
        //create a json and save the file in the download folder 
        var json = this.getInformationToJson();
        var data = this._conn.connexionAPI(token, json, url_1.urlgeoDataGet);
        //for test
        if (data.value) {
            alert(data.value);
        }
        return data;
    };
    ;
    Extraire.prototype.setHeader = function (token) {
        return "'Authorization': " + ("Bearer " + token);
    };
    //create a drop list for the template
    Extraire.prototype.interactiveDropDownList = function (list) {
        var ddl = "";
        for (var i in list) {
            ddl += "<option value=\"" + list[i] + "\">" + list[i] + "</option>";
        }
        return ddl;
    };
    Extraire.prototype.getinfo = function (data) {
        this._data = data;
    };
    Extraire.prototype.getEnvironnement = function () {
        return this._environnement;
    };
    Extraire.prototype.getTheme = function () {
        return this._theme;
    };
    Extraire.prototype.getidLot = function () {
        return this._idLot;
    };
    Extraire.prototype.getclip = function () {
        return this._clip;
    };
    Extraire.prototype.getwhereClause = function () {
        return this._whereClause;
    };
    Extraire.prototype.getgeom = function () {
        return this._geom;
    };
    Extraire.prototype.setEnvironnement = function (env) {
        this._environnement = env;
    };
    Extraire.prototype.setTheme = function (them) {
        this._theme = them;
    };
    Extraire.prototype.setidLot = function (zt) {
        this._idLot = zt;
    };
    Extraire.prototype.setclip = function (clip) {
        this._clip = clip;
    };
    Extraire.prototype.setdatefinpr = function (v) {
        this._whereClause = v;
    };
    Extraire.prototype.setgeom = function (value) {
        this._geom = value;
    };
    //get the infromation out of the form into a string json
    Extraire.prototype.getInformationToJson = function () {
        //get de properties
        var output = {
            "env": this._environnement,
            "theme": this._theme,
            "id_lot": this._idLot,
            "clip": this._clip,
            "where_clause": this._whereClause,
            "geom": this._geom
        };
        var json = JSON.stringify(output);
        return json;
    };
    //put a json string into a blob and export into a json file in download file
    Extraire.prototype.saveJson = function (output) {
        var blob = new Blob([output], { type: "application/json" });
        FileSaver.saveAs(blob, 'export.json');
    };
    return Extraire;
}());
exports.Extraire = Extraire;
