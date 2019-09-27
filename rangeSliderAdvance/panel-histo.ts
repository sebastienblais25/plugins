/**
 * ...
 */
export class PanelHisto {

    constructor(panelManager: any, template: string, config: any) {
        this.open = config.open;
        this.histoPanel = panelManager.body.find('.slider-content').prepend(template).find('.slider-histo');
        this.isOpen = this.open;
    }

    set isOpen(isOpen: boolean) {
        this.open = isOpen;
        isOpen ? this.histoPanel.show() : this.histoPanel.hide();
    }

    get isOpen(): boolean {
        return this.open;
    }
}

export interface PanelHisto {
    open: boolean;
    histoPanel: any;
}
