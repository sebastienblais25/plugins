"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****** Import ******/
var FileSaver = require('file-saver'); // le import
var apiConnect_1 = require("../apiConnect");
var url_1 = require("../config/url");
var planifier = /** @class */ (function () {
    /*********** Constructor ***********/
    /**
     *Creates an instance of planifier.
     * @param {string} theme un theme choisi par l'utilisateur parmi la liste
     * @param {string} idut un id avec préfixe du theme et de la date créer avant le nom
     * @param {string} tt un type de travail sélectionner selon une liste créer par sélectio d'un theme
     * @param {string[]} classes une liste de classes sélectionner relier a un theme
     * @param {string} datefin une date de fin prévu entré par l'utilisateur
     * @param {string} wc si un where clause est entré par l'tuilsateur
     * @param {string} geom une geométrie entré par l'utilisateur
     * @memberof planifier
     */
    function planifier(theme, idut, tt, classes, datefin, wc, geom) {
        /*********** Properties ***********/
        this._conn = new apiConnect_1.connexion();
        this._json = '';
        this._theme = theme;
        this._idUT = idut;
        this._typetravail = tt;
        this._classes = classes;
        this._datefinpre = datefin;
        this._whereclause = wc;
        this._geom = geom;
    }
    /************* Methods *************/
    /**
     *Send a json to the API and return with the information
     *
     * @param {User} log les parametre de l'utilisateur de la classe user
     * @returns {*} retourne les informations de l'API si le fromulaire a été envoyé avec succès ou non
     * @memberof planifier
     */
    planifier.prototype.submitForm = function (log) {
        this.getInformationToJson();
        //this.saveJson(json);
        this.setdata(this._conn.connexionAPI(log.gettoken(), this.getJson(), log.constructUrl(url_1.urlPlaniPost), 'POST'));
        //what we get from the API
        return this.getdata();
    };
    /**
     * Transfrome les infromation du formulaire en fichier raw json
     * @param {User} log
     * @returns {*} retourne un raw json pour envoyer a l'Api
     * @memberof planifier
     */
    planifier.prototype.getInformationToJson = function () {
        //get de properties
        //alert(this.getclasses());
        var output = {
            "theme": this.gettheme(),
            "id_ut": this.getidUT(),
            "type_travail": this.gettypetravail().toString(),
            "liste_classes": this.getclasses(),
            "date_fin_prevue": this.getdatefinpre(),
            "where_clause": this.getzonetravail(),
            "geom": this.getgeom()
        };
        this._json = JSON.stringify(output);
    };
    /**
     * sauvegarde un fichier json dans le fichier de download de l'utilisateur
     * @param {*} output le fichier json a sauvegarder.
     * @memberof planifier
     */
    planifier.prototype.saveJson = function () {
        var blob = new Blob([this._json], { type: "application/json" });
        FileSaver.saveAs(blob, 'export.json');
    };
    /******** Accessors *********/
    planifier.prototype.getJson = function () {
        return this._json;
    };
    planifier.prototype.setJson = function (json) {
        this._json = json;
    };
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
