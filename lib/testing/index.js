"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****** Import ******/
var html_assets_1 = require("./config/html-assets");
var ControllerManager_1 = require("./manager/ControllerManager");
var login_1 = require("./login");
var menuManager_1 = require("./manager/menuManager");
var Testing = /** @class */ (function () {
    function Testing() {
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
        //Ajoute un panel
        this.addLoginPanel();
    };
    //add side menu item
    Testing.prototype.onMenuItemClick = function () {
        var _this = this;
        return function () {
            //this.button.isActive = !this.button.isActive;
            _this._RV.toggleSideNav('close');
            //open the panel
            _this.panel.open();
        };
    };
    //Creating a login menu
    Testing.prototype.addLoginPanel = function () {
        //permet d'Activer le bouton connexion/ login
        var mb = new ControllerManager_1.manageController();
        var output = html_assets_1.loginmenu;
        //creating the panel with the dimension and a title for the application
        this.panel = this.mapApi.panels.create('Test Login');
        this.panel.element.css({ bottom: '0em', width: '400px', top: '50px' });
        this.panel.header.title = 'Generic Title';
        //add control for the login button
        this.connexionControls(this.panel, this.mapApi);
        //compile the login template
        mb.compileTemplate(output, this.mapApi);
        //add a close button 
        var closeBtn = this.panel.header.closeButton;
        //add a toggle button
        var toggleBtn = this.panel.header.toggleButton;
        //add the template to the panel
        this.panel.body = output;
    };
    Testing.prototype.connexionControls = function (panel, mapApi) {
        //ajoute un controller au formulaire html
        this.mapApi.agControllerRegister('connexionCtrl', function ($scope) {
            //ajoute la fonction sous le controller au formulaire html
            this.submitConn = function () {
                //prends les informations des input pour envoyer a l'API
                var log = new login_1.login(document.getElementById("username").value, document.getElementById("password").value);
                //Envoie le formulaire a l API
                var loginfo = log.submitForm();
                //si le retour ne contient pas de code d'erreur continue
                if (loginfo.status != 401) {
                    alert('Connected');
                    var menu = new menuManager_1.menuManager();
                    var outputExt = void 0;
                    var outputPlan = void 0;
                    var outputDeli = void 0;
                    outputExt = menu.extractManager(log, panel, mapApi);
                    outputPlan = menu.planifManager(log, panel, mapApi);
                    outputDeli = menu.deliManager(log, panel, mapApi);
                    //$('rv-mapnav').append('<div><h2>Livraison</h2></div>')
                    panel.body = "<div>" + outputPlan + outputExt + outputDeli + "</div>";
                    //si le retour de l'API contient un code d'erreur et le message
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
        //Commun
        envir: 'Select an environnement :',
        themet: 'Select a theme :',
        idUT: 'Select a working unity id :',
        geome: 'Add your Geometry :',
        submit: 'Submit',
        cancel: 'Cancel',
        where: 'Enter a Where Clause :',
        //Extraction seulement
        extrac: 'Extract',
        clip: 'If clip :',
        //Planifier seulement
        testbutton: 'Planning Work Place',
        planif: 'Planning',
        zoneTrv: 'Working Zone :',
        typeTrv: 'working type :',
        classe: 'Select a class :',
        datefinprv: 'Final date planned :',
        //Login seulement
        login: 'Login',
        username: "username",
        password: 'password',
        //Livraison seulement
        delivery: 'Delivery',
    },
    'fr-CA': {
        //Commun
        envir: 'Environnement :',
        themet: 'Theme :',
        idUT: 'Selectionne un identifiant d unité de travail :',
        geome: 'Ajouter votre Géométrie :',
        submit: 'Soumettre',
        cancel: 'Annuler',
        where: 'Entrer une Where Clause :',
        //Extraction seulement
        extrac: 'Extraction',
        clip: 'Si clip :',
        //Planifier seulement
        testbutton: 'Planifiez zone de travail',
        planif: 'Planifier',
        typeTrv: 'Type de travail :',
        classe: 'selectionne une classe :',
        datefinprv: 'Date fin prévue :',
        //Login seulement
        login: 'connexion :',
        username: "nom d'usager",
        password: 'mot de passe',
        //Livraison seulement 
        delivery: 'Livraison',
    }
};
//accès du plugins à l'application
window.testing = Testing;
