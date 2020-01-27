"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { form } from './html-assets';
var info_1 = require("./info");
var panelManager_1 = require("./panelManager");
//import { resolve } from 'dns';
var FileSaver = require('file-saver');
var Testing = /** @class */ (function () {
    function Testing() {
        this._panel = new panelManager_1.panel();
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
    };
    //add side menu item
    Testing.prototype.onMenuItemClick = function () {
        var _this = this;
        return function () {
            //this.button.isActive = !this.button.isActive;
            _this._RV.toggleSideNav('close');
            _this.addPanel();
        };
    };
    //add a panel with a form
    Testing.prototype.addPanel = function () {
        //à enlever plus tard
        var name = 'planifiezZT';
        var hello = new info_1.Info('', '', '', '', '');
        //add panel
        this.panel = this._panel.createPanel(this.panel, this.mapApi, name, Testing.prototype.translations[this._RV.getCurrentLang()].testbutton);
        //set the from inside the panel
        this.panel.body = hello.getFormPanifiez(hello.interactiveDropDownList());
        //open the panel in the viewer
        this.panel.open();
        //submit form Plan
        hello.submitForm(this._RV);
        /************ TEST *************/
        //this.angularControls();
        //hello.getInformation();
    };
    /*angularControls(){
        const that = this;
        this.mapApi.agControllerRegister('SubmitPlanZT', function(){
            this.control = {
                submit:{
                    name: 'submit',
                    label: 'submit',
                    action: () =>{
                        alert("hello");
                    }
                }
            }
        })
    }*/
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
    },
    'fr-CA': {
        testbutton: 'Planifiez zone de travail',
    }
};
window.testing = Testing;
