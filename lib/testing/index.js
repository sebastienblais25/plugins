"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var html_assets_1 = require("./html-assets");
var planifier_1 = require("./planifier");
//import { panelMod } from './panelManager';
var FileSaver = require('file-saver');
var Testing = /** @class */ (function () {
    function Testing() {
        this._tokenbearer = "toto";
    }
    //initiation
    Testing.prototype.init = function (api) {
        //set la variable api pour le plugin
        this.mapApi = api;
        //set _RV
        this.config = this._RV.getConfig('plugins').testing;
        //set la langue pour le plugin
        this.config.language = this._RV.getCurrentLang();
        //création d'un button d'accès à partir du menu
        this.button = this.mapApi.mapI.addPluginButton(Testing.prototype.translations[this._RV.getCurrentLang()].testbutton, this.onMenuItemClick());
        this.addLoginPanel();
        //this.addPanelOption();  
    };
    //add side menu item
    Testing.prototype.onMenuItemClick = function () {
        var _this = this;
        return function () {
            _this.button.isActive = !_this.button.isActive;
            _this._RV.toggleSideNav('close');
            _this.panel.open();
        };
    };
    Testing.prototype.addLoginPanel = function () {
        var output = html_assets_1.loginmenu;
        if (!this.panel) {
            //creating the panel
            this.panel = this.mapApi.panels.create('Test Login');
            this.panel.element.css({ bottom: '0em', width: '400px', top: '50px' });
            this.panel.header.title = 'Test Login';
        }
        else {
            this.panel.close();
        }
        //add control here
        this.connexionControls();
        //add compiler here
        this.compileTemplate(output);
        var closeBtn = this.panel.header.closeButton;
        //add the template
        this.panel.body = output;
    };
    //add a panel with a form
    Testing.prototype.addPanelOption = function () {
        //à enlever plus tard
        var name = 'planifiezZT';
        var plan = new planifier_1.Planifier('', '', '', '', '', '');
        var APIreturn;
        //add panel
        if (!this.panel) {
            // TODO: Creer le panel
            this.panel = this.mapApi.panels.create('Test Submit');
            this.panel.element.css({ bottom: '0em', width: '400px', top: '50px' });
            this.panel.header.title = name;
        }
        else {
            this.panel.close;
        }
        var list = ["Hydro", "Route", "building"];
        this.angularcontrols(plan);
        var ddl = this.interactiveDropDownList(list);
        var output = html_assets_1.form.replace(/{dropdowntheme}/, ddl);
        // TODO: compiler ton code pour que la directive Angular soit associe a ton code.
        // Append element
        this.compileTemplate(output);
        var closeBtn = this.panel.header.closeButton;
        //Add the from template to the 
        this.panel.body = output;
    };
    //Submit controller
    Testing.prototype.angularcontrols = function (plan) {
        /************ À placer en fonction ou class ***********/
        // TODO: creer la directive avant de compiler le code
        this.mapApi.agControllerRegister('SubmitCtrl', function ($scope) {
            this.submitForm = function () {
                //get all the information of the form into the class
                plan = new planifier_1.Planifier(document.getElementById("env").value, document.getElementById("theme").value, document.getElementById("idlot").value, document.getElementById("clip").value, document.getElementById("whereclause").value, document.getElementById("geom").value);
                this._apireturn = plan.submitForm(this._tokenbearer);
                alert(this._apireturn.value);
            };
        });
        /************** ***************/
    };
    Testing.prototype.connexionControls = function () {
        var value = true;
        this.mapApi.agControllerRegister('connexionCtrl', function ($scope) {
            this.submitConn = function () {
                //get all the information of the form into the class
                alert('allgood');
            };
        });
        if (value == true) {
            this.panel.close();
            this.addPanelOption();
        }
    };
    Testing.prototype.compileTemplate = function (template) {
        var temp = $(template);
        this.mapApi.$compile(temp);
        return temp;
    };
    //create a drop list for the template
    Testing.prototype.interactiveDropDownList = function (list) {
        var ddl = "";
        for (var i in list) {
            ddl += "<option value=\"" + list[i] + "\">" + list[i] + "</option>";
        }
        return ddl;
    };
    //First test with an alert
    //Event when a click is done on the map
    Testing.prototype.listenToAlert = function () {
        var _this = this;
        this.mapApi.click.subscribe(function (clickEvent) { return _this.clickHandler(clickEvent); });
    };
    Testing.prototype.clickHandler = function (clickEvent) {
        // get current language
        var lang = this._RV.getCurrentLang();
        alert('You clicked on point ');
        //var blob = new Blob(["Hello, world!"], {type:"application/json"});
        //FileSaver.saveAs(blob, "hello world.json");
        //create a json and save the file in the download folder
    };
    return Testing;
}());
exports.default = Testing;
;
;
Testing.prototype.translations = {
    'en-CA': {
        testbutton: 'Planning Work Place',
        envir: 'Environnement',
        themet: 'Select a theme',
        idlot: 'Select an id',
        typeTrv: 'working type',
        datefinprv: 'Final date planned',
        geome: 'Add your Geometry',
        submit: 'Submit'
    },
    'fr-CA': {
        testbutton: 'Planifiez zone de travail',
        envir: 'Environnement',
        themet: 'Theme',
        idlot: 'Selectionne un id de lot',
        typeTrv: 'Type de travail',
        datefinprv: 'Date fin prévue',
        geome: 'Ajouter votre Géométrie',
        submit: 'Soumettre'
    }
};
window.testing = Testing;
