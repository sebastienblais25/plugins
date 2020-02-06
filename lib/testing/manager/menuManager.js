"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****** Import ******/
var ControllerManager_1 = require("./ControllerManager");
var html_assets_1 = require("../config/html-assets");
var menuManager = /** @class */ (function () {
    function menuManager() {
    }
    menuManager.prototype.extractManager = function (log, mapApi) {
        /************* Extraire ***************/
        //let ext = new Extraire('','','','','','');
        var mb = new ControllerManager_1.manageController();
        //activate the controls for Extraction
        //A enlever le panel
        mb.extrairecontrols(log, mapApi);
        //add the dropdown list for the form
        var output = html_assets_1.formExtraire;
        //output = output.replace(/{dropdownenv}/,ddlEnv);
        //mb.compileTemplate(output,mapApi);
        //add the compile template to the panel
        return output;
    };
    menuManager.prototype.planifManager = function (log, mapApi, config) {
        /********* Planifier *********/
        var mb = new ControllerManager_1.manageController();
        //A Enlever le panel
        mb.planControl(log, mapApi, config);
        //add the dropdown list for the form
        var output = html_assets_1.formPlanifier;
        //mb.compileTemplate(output,mapApi);
        //add the compile template to the panel
        return output;
    };
    menuManager.prototype.deliManager = function (log, mapApi) {
        var listserver = log.getenvAcc();
        var mb = new ControllerManager_1.manageController();
        mb.deliControl(log, mapApi);
        var output = html_assets_1.formDelivery;
        //mb.compileTemplate(output,mapApi);
        return output;
    };
    menuManager.prototype.topMenuManager = function (log, mapApi) {
        var mb = new ControllerManager_1.manageController();
        mb.topmenuControl(log, mapApi);
        var output = html_assets_1.topmenu;
        //mb.compileTemplate(output,mapApi);
        return output;
    };
    return menuManager;
}());
exports.menuManager = menuManager;
