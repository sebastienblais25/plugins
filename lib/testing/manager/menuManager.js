"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ButtonManager_1 = require("./ButtonManager");
var html_assets_1 = require("../config/html-assets");
var menuManager = /** @class */ (function () {
    function menuManager() {
    }
    menuManager.prototype.extractManager = function (log, panel, mapApi) {
        var list = log.getthemeAcc();
        var listserver = log.getenvAcc();
        /************* Extraire ***************/
        //let ext = new Extraire('','','','','','');
        var mb = new ButtonManager_1.manageButton();
        //activate the controls for Extraction
        //A enlever le panel
        mb.extrairecontrols(log, panel, mapApi);
        //set the dropdown list for the form
        var ddlEnv = this.interactiveDropDownList(listserver);
        var ddltheme = this.interactiveDropDownList(list);
        //add the dropdown list for the form
        var output = html_assets_1.formExtraire.replace(/{dropdowntheme}/, ddltheme);
        output = output.replace(/{dropdownenv}/, ddlEnv);
        /******** add the drop down list with the theme selected *********/
        var listiduw = log.getUtravail(log._idUt[0].getTheme());
        var ddlid = this.interactiveDropDownList(listiduw);
        //this.setDDLidWorkingUnit()
        output = output.replace(/{dropdownid}/, ddlid);
        // TODO: compiler ton code pour que la directive Angular soit associe a ton code.
        // Append element
        mb.compileTemplate(output, mapApi);
        //add the compile template to the panel
        return output;
    };
    menuManager.prototype.planifManager = function (log, panel, mapApi) {
        var list = log.getthemeAcc();
        var listserver = log.getenvAcc();
        /********* Planifier *********/
        var mb = new ButtonManager_1.manageButton();
        //A Enlever le panel
        mb.planControl(log, panel, mapApi);
        var ddlEnv = this.interactiveDropDownList(listserver);
        var ddltheme = this.interactiveDropDownList(list);
        //add the dropdown list for the form
        var output = html_assets_1.formPlanifier.replace(/{dropdowntheme}/, ddltheme);
        output = output.replace(/{dropdownenv}/, ddlEnv);
        //let plan:planifier = new planifier('','','','','','','','');
        var listiduw = log.getUtravail(log._idUt[0].getTheme());
        var ddlid = this.interactiveDropDownList(listiduw);
        this.setDDLidWorkingUnit();
        output = output.replace(/{dropdownid}/, ddlid);
        // TODO: compiler ton code pour que la directive Angular soit associe a ton code.
        // Append element
        mb.compileTemplate(output, mapApi);
        //add the compile template to the panel
        return output;
    };
    //create a drop list for the template
    menuManager.prototype.interactiveDropDownList = function (list) {
        var ddl = "";
        for (var i in list) {
            ddl += "<option value=\"" + list[i] + "\">" + list[i] + "</option>";
        }
        ;
        return ddl;
    };
    menuManager.prototype.setDDLidWorkingUnit = function () {
        $("#testclick").click(function () {
            alert('hello');
        });
    };
    return menuManager;
}());
exports.menuManager = menuManager;
