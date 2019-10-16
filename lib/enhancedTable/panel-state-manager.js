"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Saves relevant enhancedTable states so that it can be reset on reload/reopen. A PanelStateManager is linked to a BaseLayer.
 * setters are called each time enhancedTable states are updated, getters are called each time enhancedTable is reloaded/reopened.
 * States to save and reset:
 *      - displayed rows (on symbology and layer visibility updates)
 *      - column filters
 *      - column sorts
 *      - whether table maximized is in maximized or split view
 */
class PanelStateManager {
    constructor(baseLayer, legendBlock) {
        this.baseLayer = baseLayer;
        this.isMaximized = baseLayer.table.maximize || false;
        this.showFilter = baseLayer.table.showFilter;
        this.filterByExtent = baseLayer.table.filterByExtent || false;
        this.columnFilters = {};
        this.open = true;
        this.storedBlock = legendBlock;
        this.columnState = null;
    }
    getColumnFilter(colDefField) {
        return this.columnFilters[colDefField];
    }
    setColumnFilter(colDefField, filterValue) {
        let newFilterValue = filterValue;
        if (filterValue && typeof filterValue === 'string') {
            const escRegex = /[(!"#$%&\'+,.\\\/:;<=>?@[\]^`{|}~)]/g;
            newFilterValue = filterValue.replace(escRegex, '\\$&');
        }
        this.columnFilters[colDefField] = newFilterValue;
    }
    get sortModel() {
        return this.storedSortModel;
    }
    set sortModel(sortModel) {
        this.storedSortModel = sortModel;
    }
    set maximized(maximized) {
        this.isMaximized = maximized;
    }
    get maximized() {
        return this.isMaximized;
    }
    get colFilter() {
        return this.showFilter;
    }
    set colFilter(show) {
        this.showFilter = show;
    }
    set isOpen(isOpen) {
        this.open = isOpen;
    }
    get isOpen() {
        return this.open;
    }
    get legendBlock() {
        return this.storedBlock;
    }
}
exports.PanelStateManager = PanelStateManager;
