"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ...
 */
var PanelHisto = /** @class */ (function () {
    function PanelHisto(panelManager, template, config) {
        this.open = config.open;
        this.histoPanel = panelManager.body.find('.slider-content').prepend(template).find('.slider-histo');
        this.isOpen = this.open;
    }
    Object.defineProperty(PanelHisto.prototype, "isOpen", {
        get: function () {
            return this.open;
        },
        set: function (isOpen) {
            this.open = isOpen;
            isOpen ? this.histoPanel.show() : this.histoPanel.hide();
        },
        enumerable: true,
        configurable: true
    });
    return PanelHisto;
}());
exports.PanelHisto = PanelHisto;
