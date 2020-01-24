"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var panel = /** @class */ (function () {
    function panel() {
    }
    panel.prototype.createPanel = function (panel, mapApi, panelname, paneltitle) {
        if (!panel) {
            // make sure both header and body have a digest cycle run on them
            panel = mapApi.panels.create(panelname);
            panel.element.css({
                bottom: '0em',
                width: '400px'
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
