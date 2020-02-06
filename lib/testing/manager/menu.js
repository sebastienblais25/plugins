"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var menuManager_1 = require("./menuManager");
var ControllerManager_1 = require("./ControllerManager");
var MenuPrincipal = /** @class */ (function () {
    function MenuPrincipal() {
    }
    ;
    MenuPrincipal.prototype.createMenuPrincipal = function (log, panel, mapApi, config) {
        var menu = new menuManager_1.menuManager();
        var compiler = new ControllerManager_1.manageController();
        var outputExt;
        var outputPlan;
        var outputDeli;
        var outputTopmenu;
        var menuprincipal;
        outputExt = menu.extractManager(log, mapApi);
        outputPlan = menu.planifManager(log, mapApi, config);
        outputDeli = menu.deliManager(log, mapApi);
        outputTopmenu = menu.topMenuManager(log, mapApi);
        menuprincipal = "<div>" + outputTopmenu + outputPlan + outputExt + outputDeli + "</div>";
        compiler.compileTemplate(menuprincipal, mapApi);
        return menuprincipal;
    };
    return MenuPrincipal;
}());
exports.MenuPrincipal = MenuPrincipal;
