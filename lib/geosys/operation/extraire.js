"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileSaver = require('file-saver'); // le import
var url_1 = require("../config/url");
var apiConnect_1 = require("../apiConnect");
var Extraire = /** @class */ (function () {
    /************* Constructor *************/
    /**
     *Creates an instance of Extraire.
     * @param {string} theme le thème sélectionner par l'utilisateur
     * @param {string} [idUT] le identifiant d'unité de travail sélectioner par l'utilisateur
     * @param {string} [clip] Si l'utilisateur veut un clip lors de l'Extraction
     * @param {string} [whereClause] si l'utilisateur a mis un where clause
     * @param {string} [geom] la géométrie entré par l'utilisateur.
     * @memberof Extraire
     */
    function Extraire(theme, idUT, clip, whereClause, geom) {
        /*********** Properties ***********/
        this._conn = new apiConnect_1.Connexion();
        this._envopt = '';
        this._theme = theme;
        this._idUT = idUT;
        this._clip = clip;
        this._whereClause = whereClause;
        this._geom = geom;
    }
    /************* Methods *************/
    /**
     * Envoie un raw json a l'Api s'il s'agit d'un extraction sans retour ou envoie aucun json, mais
     * envoie l'identifiant d'unité de travail dans le url s'il s'agit d'une extraction planifié
     * @param {User} log le sparamtere de l'utilisateur
     * @returns {*} retorune le succes ou l'erreur de l'opération un avec un message
     * @memberof Extraire
     */
    Extraire.prototype.submitForm = function (log) {
        //create a json and save the file in the download folder 
        var url;
        //if idUt is empty send an unplanned extract
        if (this._idUT === "") {
            this.getInformationToJsonSR();
            url = log.constructUrl(url_1.urlgeoDataGet);
            alert(this.getJson());
            //if idUt is set sent the idUt in the url and the json is empty
        }
        else {
            url = log.constructUrl(url_1.urlgeoDatGetId + this._idUT);
            alert('extract planned');
        }
        //this.saveJson(json)
        //Call to the Api
        console.log(this._envopt);
        this.setData(this._conn.connexionAPI(log.getToken(), this.getJson(), url, 'Get', this._envopt));
        return this.getData();
    };
    ;
    /**
     * Set an optionnal environnement for the header of the json
     * @param {string} env the optionnal environnement
     * @memberof Extraire
     */
    Extraire.prototype.setOptionnalEnvironnement = function (env) {
        var optEnv = "'env_app' : " + env;
        //console.log(optEnv);
        this._envopt = optEnv;
    };
    /**
     *set toutes les propriété pour une extraction sans retour
     * @param {string[]} list la liste de classe sélectionner par l'utilisatuer
     * @param {string} clip si l'utilisateur veut un clip de ses données
     * @param {string} whereClause
     * @param {string} geom
     * @memberof Extraire
     */
    Extraire.prototype.setInfoForSR = function (list, clip, whereClause, geom) {
        this._idUT = "";
        this._listClasses = list;
        this._clip = clip;
        this._whereClause = whereClause;
        this._geom = geom;
    };
    /**
     *Creation d'un fichier json pour faire l'appel à l'API
     * @returns {*} retourne un raw Json pour l'API
     * @memberof Extraire
     */
    Extraire.prototype.getInformationToJsonSR = function () {
        //get de properties
        var output = {
            "theme": this._theme,
            "liste_classes": this._listClasses,
            "clip": this._clip,
            "where_clause": this._whereClause,
            "geom": this._geom
        };
        this._json = JSON.stringify(output);
    };
    /**
     *put a json string into a blob and export into a json file in download file
     * @param {*} output the file to save
     * @memberof Extraire
     */
    Extraire.prototype.saveJson = function (output) {
        var blob = new Blob([output], { type: "application/json" });
        FileSaver.saveAs(blob, 'export.json');
    };
    /*************** Accessors ***********************/
    Extraire.prototype.setEnvOpt = function (env) {
        this._envopt = env;
    };
    Extraire.prototype.getEnvOpt = function () {
        return this._envopt;
    };
    Extraire.prototype.getJson = function () {
        return this._json;
    };
    Extraire.prototype.setJson = function (json) {
        this._json = json;
    };
    Extraire.prototype.getData = function () {
        return this._data;
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
