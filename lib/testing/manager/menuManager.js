"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****** Import ******/
var ControllerManager_1 = require("./ControllerManager");
var html_assets_1 = require("../config/html-assets");
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
        this._compiler = new ControllerManager_1.manageController();
        //varaible for the form
        var outputExt = this.extractManager(log, mapApi);
        var outputExtSR = this.extractSRManager(log, mapApi);
        var outputPlan = this.planifManager(log, mapApi, config);
        var outputDeli = this.deliManager(log, mapApi);
        var outputCreer = this.creerMDManager(log, mapApi);
        var outputNettoyage = this.nettoyageManager(log, mapApi);
        var outputCancel = this.cancelManager(log, mapApi);
        var outputTopmenu = this.topMenuManager(log, mapApi);
        var menuprincipal;
        //compile the form together
        menuprincipal = "<div>" + outputTopmenu + outputPlan + outputExt + outputExtSR + outputDeli + outputCreer + outputNettoyage + outputCancel + "</div>";
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
        this._compiler.extrairecontrols(log, mapApi);
        //add the dropdown list for the form
        var output = html_assets_1.formExtraireP;
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
        this._compiler.planControl(log, mapApi, config);
        //add the dropdown list for the form
        var output = html_assets_1.formPlanifier;
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
        this._compiler.deliControl(log, mapApi);
        var output = html_assets_1.formDelivery;
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
    menuManager.prototype.topMenuManager = function (log, mapApi) {
        this._compiler.topmenuControl(log, mapApi);
        var output = html_assets_1.topmenu;
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
        this._compiler.extraireSRcontrols(log, mapApi);
        var output = html_assets_1.formExtraireSR;
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
        this._compiler.creerControl(log, mapApi);
        var output = html_assets_1.formCreerMD;
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
        this._compiler.nettoyagecontrols(log, mapApi);
        var output = html_assets_1.formNettoyage;
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
        this._compiler.cancelcontrols(log, mapApi);
        var output = html_assets_1.formCancel;
        return output;
    };
    return menuManager;
}());
exports.menuManager = menuManager;
