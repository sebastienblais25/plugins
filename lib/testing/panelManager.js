"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileSaver = require('file-saver'); // le import
var panelMod = /** @class */ (function () {
    function panelMod() {
    }
    panelMod.prototype.createPanel = function (panel, mapApi, panelname, paneltitle, panelBottom, panelwidth) {
        if (panelBottom === void 0) { panelBottom = '0em'; }
        if (panelwidth === void 0) { panelwidth = '400px'; }
        this._panelname = panelname;
        this._panelBottom = panelBottom;
        this._panelTitle = paneltitle;
        this._panelWidth = panelwidth;
        if (!panel) {
            // make sure both header and body have a digest cycle run on them
            panel = mapApi.panels.create(this._panelname);
            panel.element.css({
                bottom: this._panelBottom,
                width: this._panelWidth
            });
            panel.element.addClass('mobile-fullscreen');
            var closeBtn = panel.header.closeButton;
            panel.header.title = paneltitle;
        }
        else {
            panel.close();
        }
        return panel;
    };
    //add method for the body of the panel
    //add method for title
    //add method for the submit button
    //si le button est pas en Angular
    panelMod.prototype.submitForm = function (_RV) {
        // get current language
        var lang = _RV.getCurrentLang();
    };
    ;
    return panelMod;
}());
exports.panelMod = panelMod;
