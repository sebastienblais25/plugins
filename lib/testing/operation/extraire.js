"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileSaver = require('file-saver'); // le import
var url_1 = require("../config/url");
var apiConnect_1 = require("../apiConnect");
var Extraire = /** @class */ (function () {
    /************* Constructor *************/
    function Extraire(env, theme, idUT, clip, whereClause, geom) {
        /*********** Properties ***********/
        this._conn = new apiConnect_1.connexion();
        this._environnement = env;
        this._theme = theme;
        alert(theme);
        this._idUT = idUT;
        alert(idUT);
        this._clip = clip;
        this._whereClause = whereClause;
        this._geom = geom;
    }
    /************* Methods *************/
    //Send json form to API in ajax
    Extraire.prototype.submitForm = function (token) {
        //To Change
        //create a json and save the file in the download folder 
        var json = this.getInformationToJson();
        //this.saveJson(json)
        this.setData(this._conn.connexionAPI(token, json, url_1.urlgeoDataGet, 'Get'));
        //for test
        if (this.getinfo() == 'success') {
            return this.getinfo();
        }
        else {
            alert(this.getinfo().status);
            return this.getinfo().status;
        }
    };
    ;
    /*setHeader(token:string):string{
        let output:any ={
         'Authorization': `Bearer ${token}`
        };
         return output;
    }*/
    //get the infromation out of the form into a string json
    Extraire.prototype.getInformationToJson = function () {
        //get de properties
        var output = {
            "env": this._environnement,
            "theme": this._theme,
            "id_lot": this._idUT,
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
    /*************** Accessors ***********************/
    Extraire.prototype.getinfo = function () {
        return this._data;
    };
    Extraire.prototype.getEnvironnement = function () {
        return this._environnement;
    };
    Extraire.prototype.getTheme = function () {
        return this._theme;
    };
    Extraire.prototype.getidUT = function () {
        return this._idUT;
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
    Extraire.prototype.setidUT = function (idUT) {
        this._idUT = idUT;
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
    Extraire.prototype.setData = function (data) {
        this._data = data;
    };
    return Extraire;
}());
exports.Extraire = Extraire;
