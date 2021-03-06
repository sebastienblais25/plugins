/**
 * Manages the status to be displayed at any given time for an enhancedTable. One PanelStatusManager is created for one PanelManager.
 *
 * Status is updated based on layer visibility, symbol visibilty, text filters, scrolling, and table min/maxing.
 */
export class PanelStatusManager {

    constructor(panelManager: any) {
        this.panelManager = panelManager;
        this.tableOptions = panelManager.tableOptions;
    }

    // sets watches for when table filters are changed, or the table is scrolled
    // updates the panel status accordingly
    setFilterAndScrollWatch() {
        let tableOptions = this.tableOptions;
        let that = this;

        let oldFilterChanged = tableOptions.onFilterChanged.bind(tableOptions);
        tableOptions.onFilterChanged = function (event) {
            if (tableOptions && tableOptions.api) {
                tableOptions.api.selectAllFiltered();
                that.getFilterStatus();
                tableOptions.api.deselectAllFiltered();
            }
            oldFilterChanged(event);
        }

        tableOptions.onBodyScroll = function (event) {
            that.getScrollRange();
        }
    }

    // gets the updated text to display for the enhancedTable's filter status
    getFilterStatus() {
        let text: string;

        if (this.tableOptions.api && this.tableOptions.api.getDisplayedRowCount() < this.tableOptions.rowData.length) {
            text = `${this.tableOptions.api.getDisplayedRowCount()} records shown (filtered from ${this.tableOptions.rowData.length} records)`;
            this.panelManager.legendBlock.filter = true; // add filter flag if rows are filtered
        }
        else {
            text = `${this.tableOptions.rowData.length} records shown`;
            this.panelManager.legendBlock.filter = false; // clear filter flag if all rows shown
        }

        // if (this.panelManager.panel.panelControls.find('.filterRecords')[0]) {
        //     this.panelManager.panel.panelControls.find('.filterRecords')[0].innerHTML = text;
        // }
        this.getScrollRange();
        this.panelManager.recordCountScope.filterRecords = text;
        return text;
    }

    // gets the updated row range to get as table is scrolled vertically (example "showing 1-10 of 50 entries")
    getScrollRange() {
        let rowRange: string;
        if (this.tableOptions.api) {
            const topPixel = this.tableOptions.api.getVerticalPixelRange().top;
            const bottomPixel = this.tableOptions.api.getVerticalPixelRange().bottom;
            let firstRow;
            let lastRow;
            this.tableOptions.api.getRenderedNodes().forEach(row => {
                //if the top row is greater than the top pixel plus a little (to account rows that are just a little cut off) then broadcast its index in the status
                if (firstRow === undefined && row.rowTop > topPixel - (row.rowHeight / 2)) {
                    firstRow = parseInt(row.rowIndex) + 1;
                }
                //if the bottom row is less than the bottom pixel plus a little (to account rows that are just a little cut off) then broadcast its index in the status
                if ((row.rowTop + row.rowHeight) < bottomPixel + (row.rowHeight / 2)) {
                    lastRow = parseInt(row.rowIndex) + 1;
                }
            });
            if ((firstRow === undefined && lastRow === undefined) || topPixel === bottomPixel) {
                firstRow = 0;
                lastRow = 0;
            }
            rowRange = firstRow.toString() + " - " + lastRow.toString();
        }
        else {
            rowRange = this.panelManager.maximized ? '1 - 15' : '1 - 5';
        }
        // if (this.panelManager.panel.panelControls.find('.scrollRecords')[0]) {
        //     this.panelManager.panel.panelControls.find('.scrollRecords')[0].innerHTML = rowRange;
        // }
        this.panelManager.recordCountScope.scrollRecords = rowRange;
        return rowRange;
    }
}

export interface PanelStatusManager {
    panelManager: any;
    tableOptions: any;
}
