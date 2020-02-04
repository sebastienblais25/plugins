"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****** Import ******/
var FileSaver = require('file-saver'); // le import
var apiConnect_1 = require("../apiConnect");
var url_1 = require("../config/url");
var planifier = /** @class */ (function () {
    /*********** Constructor ***********/
    function planifier(env, theme, idut, tt, classes, datefin, wc, geom) {
        /*********** Properties ***********/
        this._conn = new apiConnect_1.connexion();
        this._environnement = env;
        this._theme = theme;
        this._idUT = idut;
        this._typetravail = tt;
        this._classes = classes;
        this._datefinpre = datefin;
        this._whereclause = wc;
        this._geom = geom;
    }
    /************* Methods *************/
    //Send a json to the API and return with the information 
    planifier.prototype.submitForm = function (token) {
        var json = this.getInformationToJson();
        //this.saveJson(json);
        this.setdata(this._conn.connexionAPIPost(token, json, url_1.urlPlaniPost, 'POST'));
        //for test
        if (this.getdata().status != undefined) {
            return this.getdata();
        }
        else {
            alert(this.getdata().value + ' 9');
            return this.getdata().value;
        }
    };
    //get the infromation out of the form into a string json
    planifier.prototype.getInformationToJson = function () {
        //get de properties
        var classes = ['no value'];
        var output = {
            "env": this.getenvironnement(),
            "theme": this.gettheme(),
            "id_ut": this.getidUT(),
            "type_travail": this.gettypetravail(),
            "liste_classes": classes,
            "date_fin_prevue": this.getdatefinpre(),
            "where_clause": this.getzonetravail(),
            "geom": this.getgeom()
        };
        /*let output:any = {
                "env": "string"
          };*/
        var json = JSON.stringify(output);
        return json;
    };
    planifier.prototype.saveJson = function (output) {
        var blob = new Blob([output], { type: "application/json" });
        FileSaver.saveAs(blob, 'export.json');
    };
    planifier.prototype.setClassesIntoList = function () {
        var classes;
        return classes;
    };
    /******** Accessors *********/
    planifier.prototype.getdata = function () {
        return this._data;
    };
    planifier.prototype.setdata = function (value) {
        this._data = value;
    };
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
        return this._whereclause;
    };
    planifier.prototype.setzonetravail = function (value) {
        this._whereclause = value;
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
    planifier.prototype.getgeom = function () {
        return this._geom;
    };
    planifier.prototype.setgeom = function (value) {
        this._geom = value;
    };
    return planifier;
}());
exports.planifier = planifier;
