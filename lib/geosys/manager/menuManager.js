"use strict";
/****** Import ******/
Object.defineProperty(exports, "__esModule", { value: true });
var planning_1 = require("../templates/planning");
var extract_1 = require("../templates/extract");
var create_1 = require("../templates/create");
var delivery_1 = require("../templates/delivery");
var topmenu_1 = require("../templates/topmenu");
var cleaning_1 = require("../templates/cleaning");
var cancel_1 = require("../templates/cancel");
var validate_1 = require("../templates/validate");
var fileManager_1 = require("../templates/fileManager");
var planningC_1 = require("../controller/planningC");
var extractC_1 = require("../controller/extractC");
var createC_1 = require("../controller/createC");
var deliveryC_1 = require("../controller/deliveryC");
var cleaningC_1 = require("../controller/cleaningC");
var cancelC_1 = require("../controller/cancelC");
var topmenuC_1 = require("../controller/topmenuC");
var validateC_1 = require("../controller/validateC");
var fileManagerC_1 = require("../controller/fileManagerC");
var testFile_1 = require("../testFile");
var menuManager = /** @class */ (function () {
    /**
     *Creates an instance of menuManager. and create the main menu for the plugins
     * @param {User} log all the user information
     * @param {*} panel the panel of the plugins
     * @param {*} mapApi the APi of the viewer
     * @param {*} config the config of the viewer
     * @memberof menuManager
     */
    function menuManager(log, panel, mapApi, config) {
        //set the manage controller
        this._compiler = new topmenuC_1.TopMenuController();
        this._planning = new planningC_1.PlanningController();
        this._extract = new extractC_1.ExtractController();
        this._create = new createC_1.CreateController();
        this._delivery = new deliveryC_1.DeliveryController();
        this._cleaning = new cleaningC_1.CleaningController();
        this._cancel = new cancelC_1.CancelController();
        this._validate = new validateC_1.ValidateController();
        this._fileManager = new fileManagerC_1.FileManagerController();
        //varaible for the form
        var outputExt = this.extractManager(log, mapApi);
        var outputExtSR = this.extractSRManager(log, mapApi);
        var outputPlan = this.planifManager(log, mapApi, config);
        var outputDeli = this.deliManager(log, mapApi);
        var outputVali = this.validateManager(log, mapApi);
        var outputCreer = this.creerMDManager(log, mapApi);
        var outputNettoyage = this.nettoyageManager(log, mapApi);
        var outputCancel = this.cancelManager(log, mapApi);
        var outputTopmenu = this.topMenuManager(log, mapApi, panel);
        var outputFileManager = this.fileExplorerManager(log, mapApi);
        var menuprincipal;
        //compile the form together
        menuprincipal = "<div>"
            + outputTopmenu
            + "<div class=\"section\">Processus Geosys</div>"
            + outputPlan
            + outputExt
            + outputDeli
            + outputNettoyage
            + "<div class=\"section\">Utilitaire</div>"
            + outputExtSR
            + outputCreer
            + outputVali
            + outputCancel
            + outputFileManager
            + "</div>";
        this._compiler.compileTemplate(menuprincipal, mapApi);
        //put the form in the panel
        panel.body = menuprincipal;
    }
    /**
     * Compile the output and the controller for the planned extraction and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @returns {string} the compile output
     * @memberof menuManager
     */
    menuManager.prototype.extractManager = function (log, mapApi) {
        this._extract.extrairecontrols(log, mapApi);
        //add the dropdown list for the form
        var output = extract_1.formExtraireP;
        return output;
    };
    /**
     * Compile the output and the controller for the planning and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @param {*} config send the config for the drawinf potentially
     * @returns {string} the compile output
     * @memberof menuManager
     */
    menuManager.prototype.planifManager = function (log, mapApi, config) {
        this._planning.planControl(log, mapApi, config);
        //add the dropdown list for the form
        var output = planning_1.formPlanifier;
        return output;
    };
    /**
     * Compile the output and the controller for the delivery and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @returns {string} the compile output
     * @memberof menuManager
     */
    menuManager.prototype.deliManager = function (log, mapApi) {
        this._delivery.deliControl(log, mapApi);
        var output = delivery_1.formDelivery;
        //mb.compileTemplate(output,mapApi);
        return output;
    };
    /**
     * Compile the output and the controller for the the top menu and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @returns {string} the compile output
     * @memberof menuManager
     */
    menuManager.prototype.topMenuManager = function (log, mapApi, panel) {
        this._compiler.topmenuControl(log, mapApi, panel);
        var output = topmenu_1.topmenu;
        //mb.compileTemplate(output,mapApi);
        return output;
    };
    /**
     * Compile the output and the controller for the extraction without planning and return it all compile
     * @param {User} log the user info for the controller
     * @param {*} mapApi th viewer api for the controller
     * @returns {string} the compile output
     * @memberof menuManager
     */
    menuManager.prototype.extractSRManager = function (log, mapApi) {
        this._extract.extraireSRcontrols(log, mapApi);
        var output = extract_1.formExtraireSR;
        return output;
    };
    /**
     * Set the template of the create From
     * @param {User} log all the info of the user
     * @param {*} mapApi the Api of the user
     * @returns {string} return the compiled output
     * @memberof menuManager
     */
    menuManager.prototype.creerMDManager = function (log, mapApi) {
        this._create.creerControl(log, mapApi);
        var output = create_1.formCreerMD;
        return output;
    };
    /**
     *
     * @param {User} log
     * @param {*} mapApi
     * @returns {string}
     * @memberof menuManager
     */
    menuManager.prototype.nettoyageManager = function (log, mapApi) {
        this._cleaning.nettoyagecontrols(log, mapApi);
        var output = cleaning_1.formNettoyage;
        return output;
    };
    /**
     *
     * @param {User} log
     * @param {*} mapApi
     * @returns {string}
     * @memberof menuManager
     */
    menuManager.prototype.cancelManager = function (log, mapApi) {
        this._cancel.cancelcontrols(log, mapApi);
        var output = cancel_1.formCancel;
        return output;
    };
    /**
     *
     *
     * @param {User} log
     * @param {*} mapApi
     * @returns {string}
     * @memberof menuManager
     */
    menuManager.prototype.validateManager = function (log, mapApi) {
        this._validate.valiControl(log, mapApi);
        var output = validate_1.validateform;
        return output;
    };
    /**
     *
     *
     * @param {User} log
     * @param {*} mapApi
     * @returns {string}
     * @memberof menuManager
     */
    menuManager.prototype.fileExplorerManager = function (log, mapApi) {
        var tfm = new testFile_1.TestFile();
        this._fileManager.fileManagercontrols(log, mapApi, tfm);
        var output = fileManager_1.menuFileExplorer;
        return output;
    };
    return menuManager;
}());
exports.menuManager = menuManager;
