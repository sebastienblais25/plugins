"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileSaver = require('file-saver'); // le import
var Info = /** @class */ (function () {
    function Info(env, theme, zonet, typet, datefin) {
        this._environnement = env;
        this._theme = theme;
        this._zonetravail = zonet;
        this._typetravail = typet;
        this._datefinpr = datefin;
    }
    Info.prototype.getEnvironnement = function () {
        return this._environnement;
    };
    Info.prototype.getTheme = function () {
        return this._theme;
    };
    Info.prototype.getZonetravail = function () {
        return this._zonetravail;
    };
    Info.prototype.getTypetravail = function () {
        return this._typetravail;
    };
    Info.prototype.getdatefinpr = function () {
        return this._datefinpr;
    };
    Info.prototype.setEnvironnement = function (env) {
        this._environnement = env;
    };
    Info.prototype.setTheme = function (them) {
        this._theme = them;
    };
    Info.prototype.setZonetravail = function (zt) {
        this._zonetravail = zt;
    };
    Info.prototype.setTypetravail = function (tt) {
        this._typetravail = tt;
    };
    Info.prototype.setdatefinpr = function (v) {
        this._datefinpr = v;
    };
    /*setAll(en:string, th:string, zt:string, tt:string, datf:string):void{
        this._environnement =en;
        this._theme = th;
        this._zonetravail = zt;
        this._typetravail = tt;
        this._datefinpr = datf;
    }*/
    Info.prototype.getInformation = function () {
        var output = "{\n            \"env\": \"" + document.getElementById("env").value + "\"\n        }";
        var json = JSON.stringify(output);
        return json;
    };
    Info.prototype.transfromIntoJson = function () {
        var blob = new Blob([this.getInformation()], { type: "application/json" });
        FileSaver.saveAs(blob, 'export.json');
    };
    Info.prototype.interactiveDropDownList = function () {
        var list = ["Hydro", "Route", "building"];
        var ddl = "";
        for (var i in list) {
            ddl += "<option value=\"" + list[i] + "\">" + list[i] + "</option>";
        }
        return ddl;
    };
    Info.prototype.getFormPanifiez = function (dropdown) {
        this._form = "<div tabindex=\"-2\"><ul class=\"rv-list\">\n        <li>\n        <form id=\"form\" method=\"POST\">\n          Environnement:<br>\n          <input type=\"text\" name=\"env\" id=\"env\" value=\"Pro\">\n          <br>\n          S\u00E9lectionner le th\u00E8me:<br>\n          <select type=\"text\" name=\"theme\" id=\"theme\" placeholder=\"Select something\">\n          " + dropdown + "\n          </select>\n          <br>\n          S\u00E9lectionner la source de la zone de travail:<br>\n          <input type=\"text\" name=\"ZT\" id=\"ZT\" value=\"1\">\n          <br>\n          S\u00E9lectionner le type de travail:<br>\n          <input type=\"text\" name=\"TT\" value=\"Ajout\">\n          <br>\n          Ajouter une g\u00E9om\u00E9trie:<br>\n          <input type=\"text\" name=\"geom\" id=\"geom\" value=\"geom\">\n          <br>\n          Date de fin pr\u00E9vue:<br>\n          <input type=\"date\" name=\"datefin\" value=\"\">\n          <br><br>\n          <md-button name=\"submit\" id=\"submit\" ng-click=\"control.action($event)\"\">Submit</md-button>\n        </form> \n        </li>\n        </ul></div>";
        return this._form;
    };
    return Info;
}());
exports.Info = Info;
//translate form english to french
Info.prototype.translations = {
    'en-CA': {
        testbutton: 'Testing',
        envir: 'Environnement1',
        themet: 'Theme',
        zoneTrv: 'Working Zone',
        typeTrv: 'Working Type',
        datefinprv: 'Final date planned',
        geome: 'Geometry'
    },
    'fr-CA': {
        testbutton: 'testing',
        envir: 'Environnement2',
        themet: 'Theme',
        zoneTrv: 'Zone de travail',
        typeTrv: 'Type de travail',
        datefinprv: 'Date fin prévue',
        geome: 'Géométrie'
    }
};
