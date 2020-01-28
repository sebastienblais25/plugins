"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileSaver = require('file-saver'); // le import
var url_1 = require("./url");
var Planifier = /** @class */ (function () {
    //Constructor
    function Planifier(env, theme, idLot, clip, whereClause, geom) {
        this._environnement = env;
        this._theme = theme;
        this._idLot = idLot;
        this._clip = clip;
        this._whereClause = whereClause;
        this._geom = geom;
    }
    //Send json form to API in ajax
    Planifier.prototype.submitForm = function (token) {
        var outputValue;
        //To Change
        //create a json and save the file in the download folder
        var json = this.getInformationToJson();
        //this.saveJson(json);
        //console.log("hello");
        /********* API CALL **********/
        //no promise still
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: url_1.urlgeoDataGet,
                headers: {
                    'Authorization': "Bearer " + token,
                },
                type: 'GET',
                async: false,
                cache: false,
                data: json,
                dataType: 'json',
                success: //data => resolve()
                function (response) {
                    outputValue = response;
                    console.log(outputValue.value);
                }
            });
            /*.done(function(data){
                console.log('success', data)
                outputValue = data;
            })
            .fail(function(xhr){
                console.log('error',xhr)
            });*/
        }));
        Promise.all(promises).then(function (values) {
            console.log(values[1]);
        });
        console.log();
        return outputValue;
    };
    ;
    Planifier.prototype.getinfo = function (data) {
        this._data = data;
    };
    Planifier.prototype.getEnvironnement = function () {
        return this._environnement;
    };
    Planifier.prototype.getTheme = function () {
        return this._theme;
    };
    Planifier.prototype.getidLot = function () {
        return this._idLot;
    };
    Planifier.prototype.getclip = function () {
        return this._clip;
    };
    Planifier.prototype.getwhereClause = function () {
        return this._whereClause;
    };
    Planifier.prototype.getgeom = function () {
        return this._geom;
    };
    Planifier.prototype.setEnvironnement = function (env) {
        this._environnement = env;
    };
    Planifier.prototype.setTheme = function (them) {
        this._theme = them;
    };
    Planifier.prototype.setidLot = function (zt) {
        this._idLot = zt;
    };
    Planifier.prototype.setclip = function (clip) {
        this._clip = clip;
    };
    Planifier.prototype.setdatefinpr = function (v) {
        this._whereClause = v;
    };
    Planifier.prototype.setgeom = function (value) {
        this._geom = value;
    };
    //get the infromation out of the form into a string json
    Planifier.prototype.getInformationToJson = function () {
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
    Planifier.prototype.saveJson = function (output) {
        var blob = new Blob([output], { type: "application/json" });
        FileSaver.saveAs(blob, 'export.json');
    };
    return Planifier;
}());
exports.Planifier = Planifier;
