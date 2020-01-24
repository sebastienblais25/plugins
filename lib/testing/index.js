"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var info_1 = require("./info");
var panelManager_1 = require("./panelManager");
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
        //appel une fonction pour faire un alert lors d'un clic sur la map
        //this.listenToAlert();
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
        var name = 'planifiezZT';
        var hello = new info_1.Info('', '', '', '', '');
        //add panel
        this.panel = this._panel.createPanel(this.panel, this.mapApi, name, Testing.prototype.translations[this._RV.getCurrentLang()].testbutton);
        this.panel.body = hello.getFormPanifiez(hello.interactiveDropDownList());
        //add panel to this
        this.panel.open();
        var topElement = $('ul class="rv-list"</ul>');
        var currBtn = topElement.find('button').last();
        currBtn.click(function () { return (alert("heloo")); });
        //this.angularControls();
        //hello.getInformation();
    };
    //alert when clicked
    /*listenToAlert(){
        //this.mapApi.click.subscribe(clickEvent => this.clickHandler(clickEvent));
    }*/
    //clickHandler(clickEvent) {
    Testing.prototype.listenToAlert = function () {
        // get current language
        var lang = this._RV.getCurrentLang();
        alert('You clicked on point ');
        //var blob = new Blob(["Hello, world!"], {type:"application/json"});
        //FileSaver.saveAs(blob, "hello world.json");
        //create a json and save the file in the download folder
        var output = {
            "env": document.getElementById("env").value,
            "theme": document.getElementById("theme").value,
            "id_lot": document.getElementById("ZT").value,
            "clip": "oui",
            "geom": document.getElementById("geom").value
        };
        var json = JSON.stringify(output);
        var blob = new Blob([json], { type: "application/json" });
        FileSaver.saveAs(blob, 'export.json');
        //appel à l'API
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: '',
                cache: false,
                data: json,
                dataType: 'json',
                success: function (data) { return resolve(); }
            });
        }));
        Promise.all(promises).then(function (values) {
            alert('all good');
        });
    };
    Testing.prototype.angularControls = function () {
        var that = this;
        this.mapApi.agControllerRegister('SubmitPlanZT', function () {
            this.control = {
                submit: {
                    name: 'submit',
                    label: 'submit',
                    action: function () {
                        alert("hello");
                    }
                }
            };
        });
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
/*function submitForm(){
    $(document).ready(function(){
        // click on button submit
        $("#submit").on('click', function(){
            // send ajax
            $.ajax({
                url: 'http://localhost:6001/testing/sample/', // url where to submit the request
                type : "POST", // type of action POST || GET
                dataType : 'json', // data type
                data : $("#form").serialize(), // post data || get data
                success : function(result) {
                    // you can see the result from the console
                    // tab of the developer tools
                    console.log(result);
                },
                error: function(xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            })
        });
    });
}*/
window.testing = Testing;
