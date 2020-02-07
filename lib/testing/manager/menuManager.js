"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****** Import ******/
var ControllerManager_1 = require("./ControllerManager");
var html_assets_1 = require("../config/html-assets");
var menuManager = /** @class */ (function () {
    function menuManager(log, panel, mapApi, config) {
        this._compiler = new ControllerManager_1.manageController();
        var outputExt;
        var outputPlan;
        var outputDeli;
        var outputTopmenu;
        var menuprincipal;
        outputExt = this.extractManager(log, mapApi);
        outputPlan = this.planifManager(log, mapApi, config);
        outputDeli = this.deliManager(log, mapApi);
        outputTopmenu = this.topMenuManager(log, mapApi);
        menuprincipal = "<div>" + outputTopmenu + outputPlan + outputExt + outputDeli + "</div>";
        this._compiler.compileTemplate(menuprincipal, mapApi);
        panel.body = menuprincipal;
    }
    menuManager.prototype.extractManager = function (log, mapApi) {
        this._compiler.extrairecontrols(log, mapApi);
        //add the dropdown list for the form
        var output = html_assets_1.formExtraire;
        return output;
    };
    menuManager.prototype.planifManager = function (log, mapApi, config) {
        this._compiler.planControl(log, mapApi, config);
        //add the dropdown list for the form
        var output = html_assets_1.formPlanifier;
        return output;
    };
    menuManager.prototype.deliManager = function (log, mapApi) {
        var listserver = log.getenvAcc();
        this._compiler.deliControl(log, mapApi);
        var output = html_assets_1.formDelivery;
        //mb.compileTemplate(output,mapApi);
        return output;
    };
    menuManager.prototype.topMenuManager = function (log, mapApi) {
        this._compiler.topmenuControl(log, mapApi);
        var output = html_assets_1.topmenu;
        //mb.compileTemplate(output,mapApi);
        return output;
    };
    return menuManager;
}());
exports.menuManager = menuManager;
