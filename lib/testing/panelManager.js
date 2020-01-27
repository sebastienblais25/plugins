"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var panel = /** @class */ (function () {
    function panel() {
    }
    panel.prototype.createPanel = function (panel, mapApi, panelname, paneltitle, panelBottom, panelwidth) {
        if (panelBottom === void 0) { panelBottom = '0em'; }
        if (panelwidth === void 0) { panelwidth = '400px'; }
        this._panel = panel;
        this._panelname = panelname;
        this._panelBottom = panelBottom;
        this._panelTitle = paneltitle;
        this._panelWidth = panelwidth;
        if (!this._panel) {
            // make sure both header and body have a digest cycle run on them
            this._panel = mapApi.panels.create(this._panelname);
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
    return panel;
}());
exports.panel = panel;
