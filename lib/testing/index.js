"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var html_assets_1 = require("./html-assets");
var Testing = /** @class */ (function () {
    function Testing() {
        this.showpanel = false;
    }
    //initiation
    Testing.prototype.init = function (api) {
        //set la variable api pour le plugin
        this.mapApi = api;
        this.config = this._RV.getConfig('plugins').test;
        //set la langue pour le plugin
        //this.config.language = this._RV.getCurrentLang();
        //création d'un button
        var hello = 'test';
        this.button = this.mapApi.mapI.addPluginButton(Testing.prototype.translations[ /*this._RV.getCurrentLang()*/'en-CA'].testbutton, this.onMenuItemClick());
        //code from coord-info
        // check to see if this init is due to projection change or language switch
        /*const activeNode = this.mapApi.mapDiv[0].getAttributeNode('coord-info-active');
        if (activeNode !== null) {
            this.mapApi.layers.identifyMode = 'none';
            // if coordinate info was active, turn it on again
            if (this.panel !== undefined) {
                // destroy old panel so that new one gets created
                this.panel.close({ destroy: true });
                this.panel = undefined;
            }
        }*/
        this.listenToAlert();
    };
    //add side menu item
    Testing.prototype.onMenuItemClick = function () {
        var _this = this;
        return function () {
            _this.button.isActive = !_this.button.isActive;
            _this._RV.toggleSideNav('close');
            //(<any>document).getElementsByClassName('rv-mapnav-draw-content')[0].style.display = this.button.isActive ? 'block' : 'none';
            // show the panel only when the button is checked
            if (_this.showpanel === false) {
                _this.showpanel = true;
                //add a panel to the viewer
                _this.createPanel();
            }
            else {
                _this.showpanel = false;
            }
        };
    };
    //add a panel with a form
    Testing.prototype.createPanel = function () {
        if (!this.panel) {
            // make sure both header and body have a digest cycle run on them
            this.panel = this.mapApi.panels.create('Test');
            this.panel.element.css({
                bottom: '0em',
                width: '400px'
            });
            this.panel.element.addClass('mobile-fullscreen');
            var closeBtn = this.panel.header.closeButton;
            this.panel.header.title = 'test';
        }
        else {
            this.panel.close();
        }
        this.panel.body = html_assets_1.form;
        this.panel.open();
    };
    //alert when clicked
    Testing.prototype.listenToAlert = function () {
        var _this = this;
        /*this.mapApi.click.subscribe(function(pointObject:any){

            alert('You clicked on point ' + pointObject.X + " "+ pointObject.Y);
        });*/
        this.mapApi.click.subscribe(function (clickEvent) { return _this.clickHandler(clickEvent); });
    };
    Testing.prototype.clickHandler = function (clickEvent) {
        // get current language
        var lang = this._RV.getCurrentLang();
        // get point in lat/long
        var pt = clickEvent.xy; //this._RV.projectGeometry(clickEvent.mapPoint, 4326);
        pt.spatialReference = 4326;
        alert('You clicked on point ' + pt.X + " " + pt.Y);
    };
    return Testing;
}());
exports.default = Testing;
;
;
Testing.prototype.translations = {
    'en-CA': {
        testbutton: 'Testing',
    },
    'fr-CA': {
        testbutton: 'testing',
    }
};
function submitForm() {
    $(document).ready(function () {
        // click on button submit
        $("#submit").on('click', function () {
            // send ajax
            $.ajax({
                url: 'http://localhost:6001/testing/sample/',
                type: "POST",
                dataType: 'json',
                data: $("#form").serialize(),
                success: function (result) {
                    // you can see the result from the console
                    // tab of the developer tools
                    console.log(result);
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        });
    });
}
window.testing = Testing;
