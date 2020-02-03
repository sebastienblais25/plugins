"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****** Import ******/
var apiConnect_1 = require("../apiConnect");
var planifier = /** @class */ (function () {
    /*********** Constructor ***********/
    function planifier(env, theme, zt, idut, tt, classes, datefin, logfile) {
        /*********** Properties ***********/
        this._conn = new apiConnect_1.connexion();
        this._environnement;
        this._theme;
        this._zonetravail;
        this._idUT;
        this._typetravail;
    }
    /************* Methods *************/
    //Send a json to the API and return with the information 
    //get the infromation out of the form into a string json
    planifier.prototype.getInformationToJson = function () {
        //get de properties
        var output = {
            "env": this.getenvironnement(),
            "theme": this.gettheme(),
            "zonetravail": this.getzonetravail(),
            "id_ut": this.getidUT(),
            "typetravail": this.gettypetravail(),
            "classes": this.getclasses(),
            "date_fin_prevu": this.getdatefinpre(),
            "log": this.getlogfile()
        };
        var json = JSON.stringify(output);
        return json;
    };
    /******** Accessors *********/
    //Connexion a l'API
    planifier.prototype.getconn = function () {
        return this._conn;
    };
    planifier.prototype.setconn = function (value) {
        this._conn = value;
    };
    //Environnement
    planifier.prototype.getenvironnement = function () {
        return this._environnement;
    };
    planifier.prototype.setenvironnement = function (value) {
        this._environnement = value;
    };
    //theme
    planifier.prototype.gettheme = function () {
        return this._theme;
    };
    planifier.prototype.settheme = function (value) {
        this._theme = value;
    };
    //zone de travail
    planifier.prototype.getzonetravail = function () {
        return this._zonetravail;
    };
    planifier.prototype.setzonetravail = function (value) {
        this._zonetravail = value;
    };
    //identifiant d'unité de travail
    planifier.prototype.getidUT = function () {
        return this._idUT;
    };
    planifier.prototype.setidUT = function (value) {
        this._idUT = value;
    };
    //type de travail
    planifier.prototype.gettypetravail = function () {
        return this._typetravail;
    };
    planifier.prototype.settypetravail = function (value) {
        this._typetravail = value;
    };
    //classes
    planifier.prototype.getclasses = function () {
        return this._classes;
    };
    planifier.prototype.setclasses = function (value) {
        this._classes = value;
    };
    //datefinprevu
    planifier.prototype.getdatefinpre = function () {
        return this._datefinpre;
    };
    planifier.prototype.setdatefinpre = function (value) {
        this._datefinpre = value;
    };
    //logfile
    planifier.prototype.getlogfile = function () {
        return this._logfile;
    };
    planifier.prototype.setlogfile = function (value) {
        this._logfile = value;
    };
    return planifier;
}());
exports.planifier = planifier;
