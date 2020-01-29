"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var html_assets_1 = require("./html-assets");
var extraire_1 = require("./extraire");
//import {urlgeoDataGet} from './url';
var menuManager_1 = require("./menuManager");
var login_1 = require("./login");
//const FileSaver = require('file-saver');
var Testing = /** @class */ (function () {
    function Testing() {
        /****** À enlever ******/
        this._navigation = 0;
    }
    /*********** ***********/
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
        //Ajoute un panel
        this.addLoginPanel();
        //console.log(this._navigation);
    };
    //add side menu item
    Testing.prototype.onMenuItemClick = function () {
        var _this = this;
        return function () {
            //this.button.isActive = !this.button.isActive;
            _this._RV.toggleSideNav('close');
            _this.panel.open();
        };
    };
    //Creating a login menu
    Testing.prototype.addLoginPanel = function () {
        var mp = new menuManager_1.manageMenu();
        var output = html_assets_1.loginmenu;
        if (!this.panel) {
            //creating the panel
            this.panel = this.mapApi.panels.create('Test Login');
            this.panel.element.css({ bottom: '0em', width: '400px', top: '50px' });
            this.panel.header.title = 'Generic Title';
        }
        else {
            this.panel.close();
        }
        //add control here   
        this.connexionControls(this._navigation, this.panel, this.mapApi);
        //compile the login template
        mp.compileTemplate(output, this.mapApi);
        //add a close button 
        var closeBtn = this.panel.header.closeButton;
        //add the template
        this.panel.body = output;
    };
    Testing.prototype.connexionControls = function (navigation, panel, mapApi) {
        //ajoute un controller (html)
        this.mapApi.agControllerRegister('connexionCtrl', function ($scope) {
            //ajoute la focntion sous le controller(html)
            this.submitConn = function () {
                //get all the information of the form into the class
                var log = new login_1.login(document.getElementById("username").value, document.getElementById("password").value);
                console.log(log._username, log._password);
                //submit the form to the API
                var loginfo = log.submitForm();
                //si le retour ne contient pas de code d'erreur
                if (!loginfo.code) {
                    alert('Connected');
                    /** signet **/
                    navigation++;
                    /****** List a recevoir *******/
                    var list = ["Hydro", "Route", "building"];
                    var listserver = ["Dev", "Tst", "Pro"];
                    /****** Extraire *******/
                    var ext = new extraire_1.Extraire('', '', '', '', '', '');
                    var mp = new menuManager_1.manageMenu();
                    //activate the controls for Extraction
                    mp.angularcontrols(ext, log._token, mapApi);
                    //set the dropdown list for the form
                    var ddlEnv = ext.interactiveDropDownList(listserver);
                    var ddltheme = ext.interactiveDropDownList(list);
                    //add the dropdown list for the form
                    var output = html_assets_1.form.replace(/{dropdowntheme}/, ddltheme);
                    output = output.replace(/{dropdownenv}/, ddlEnv);
                    //console.log('hello', ddltheme);
                    //alert(output)
                    // TODO: compiler ton code pour que la directive Angular soit associe a ton code.
                    // Append element
                    mp.compileTemplate(output, mapApi);
                    //add the compile template to the panel
                    panel.body = output;
                    //si le retour de l'API contient un code d'erreur
                }
                else {
                    alert(loginfo.code);
                    alert(loginfo.message);
                }
            };
        });
    };
    return Testing;
}());
exports.default = Testing;
;
;
//translate label
Testing.prototype.translations = {
    'en-CA': {
        testbutton: 'Planning Work Place',
        envir: 'Environnement',
        themet: 'Select a theme',
        idlot: 'Select an id',
        typeTrv: 'working type',
        datefinprv: 'Final date planned',
        geome: 'Add your Geometry',
        submit: 'Submit',
        extrac: 'Extract',
        login: 'Login'
    },
    'fr-CA': {
        testbutton: 'Planifiez zone de travail',
        envir: 'Environnement',
        themet: 'Theme',
        idlot: 'Selectionne un id de lot',
        typeTrv: 'Type de travail',
        datefinprv: 'Date fin prévue',
        geome: 'Ajouter votre Géométrie',
        submit: 'Soumettre',
        extrac: 'Extraction',
        login: 'connexion'
    }
};
window.testing = Testing;
