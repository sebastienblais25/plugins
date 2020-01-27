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
    Info.prototype.getFormPanifiez = function (dropdown) {
        this._form =
            "<div tabindex=\"-2\" ng-controller=\"SubmitPlanZT as ctrl\">\n            <ul class=\"rv-list\">\n                <li>\n                    \n                        Environnement:<br>\n                        <input type=\"text\" name=\"env\" id=\"env\" value=\"Pro\">\n                        <br>\n\n                        S\u00E9lectionner le th\u00E8me:<br>\n                        <select type=\"text\" name=\"theme\" id=\"theme\" placeholder=\"Select something\">\n                        " + dropdown + "\n                        </select>\n                        <br>\n\n                        S\u00E9lectionner la source de la zone de travail:<br>\n                        <input type=\"text\" name=\"ZT\" id=\"ZT\" value=\"1\">\n                        <br>\n\n                        S\u00E9lectionner le type de travail:<br>\n                        <input type=\"text\" name=\"TT\" value=\"Ajout\">\n                        <br>\n\n                        Ajouter une g\u00E9om\u00E9trie:<br>\n                        <input type=\"text\" name=\"geom\" id=\"geom\" value=\"geom\">\n                        <br>\n\n                        Date de fin pr\u00E9vue:<br>\n                        <input type=\"date\" name=\"datefin\" value=\"\">\n                        <br><br>\n                \n                \n                        <md-button name=\"submit\" id=\"submit\" value=\"Submit ng-click=\"\">Submit</md-button>\n                </li>   \n            </ul>\n        </div>";
        return this._form;
    };
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
    //get the infromation out of the form into a string json
    Info.prototype.getInformationToJson = function () {
        //get de properties
        /***** Tochange ********/
        var output = {
            "env": document.getElementById("env").value,
            "theme": document.getElementById("theme").value,
            "id_lot": document.getElementById("ZT").value,
            "clip": "oui",
            "geom": document.getElementById("geom").value
        };
        /************ **********/
        var json = JSON.stringify(output);
        return json;
    };
    //put a json string into a blob and export into a json file in download file
    Info.prototype.transfromIntoJson = function () {
        var blob = new Blob([this.getInformationToJson()], { type: "application/json" });
        FileSaver.saveAs(blob, 'export.json');
    };
    Info.prototype.interactiveDropDownList = function ( /* parametre du json */) {
        var list = ["Hydro", "Route", "building"];
        var ddl = "";
        for (var i in list) {
            ddl += "<option value=\"" + list[i] + "\">" + list[i] + "</option>";
        }
        return ddl;
    };
    //si le button est pas en Angular
    Info.prototype.submitForm = function (_RV) {
        // get current language
        var lang = _RV.getCurrentLang();
        //To Change
        $("#submit").click(function () {
            alert('You clicked on point ');
            //var blob = new Blob(["Hello, world!"], {type:"application/json"});
            //FileSaver.saveAs(blob, "hello world.json");
            //create a json and save the file in the download folder
            var output = {
                "env": document.getElementById("env").value,
                "theme": document.getElementById("theme").value,
                "id_lot": document.getElementById("ZT").value,
                "clip": "oui",
                "geom": document.getElementById("geom").value
            };
            var json = JSON.stringify(output);
            var blob = new Blob([json], { type: "application/json" });
            FileSaver.saveAs(blob, 'export.json');
            // pour appel à l'API
            /*const promises = [];
            promises.push(
                new Promise(resolve =>{
                $.ajax({
                    url: '',
                    cache:false,
                    data:json,
                    dataType:'json',
                    success: data=>resolve()
                });
            })
            );
            Promise.all(promises).then(values => {
                alert('all good');
            });*/
        });
    };
    ;
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
