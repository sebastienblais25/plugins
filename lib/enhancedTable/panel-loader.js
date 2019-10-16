"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templates_1 = require("./templates");
/**
 * Creates and manages one api panel instance to display the loading indicator before the `enhancedTable` is loaded.
 */
class PanelLoader {
    constructor(mapApi, legendBlock) {
        this.mapApi = mapApi;
        this.legendBlock = legendBlock;
        this.panel = this.mapApi.panels.create('enhancedTableLoader');
        this.panel.element.css({
            top: '0px',
            left: '410px'
        });
        this.panel.allowUnderlay = false;
        this.prepareHeader();
        this.prepareBody();
        this.hidden = true;
    }
    setSize(maximized) {
        if (maximized) {
            this.panel.element.css({ bottom: '0' });
            ;
        }
        else {
            this.panel.element.css({ bottom: '50%' });
            ;
        }
    }
    prepareHeader() {
        this.panel.header.title = this.legendBlock.name;
        this.panel.header.closeButton;
    }
    open() {
        this.panel.open();
        this.hidden = false;
    }
    prepareBody() {
        let template = templates_1.TABLE_LOADING_TEMPLATE(this.legendBlock);
        this.panel.body = template;
    }
    close() {
        this.panel.close();
    }
}
exports.PanelLoader = PanelLoader;
