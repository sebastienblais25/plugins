"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Opens the table by clicking on layer `layer`
 * If no layer is provided, open the first layer in the legend.
 */
function open(remote) {
    return __awaiter(this, void 0, void 0, function* () {
        yield remote.sleep(10000);
        const layer = yield remote.findByCssSelector('rv-legend-control > button');
        yield layer.click();
        yield remote.sleep(5000);
    });
}
exports.open = open;
function agBody(remote) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield remote.findByCssSelector('.ag-body-container');
    });
}
exports.agBody = agBody;
/**
* Return the element containing the datepicker button
*/
function datepickerButton(remote) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield remote.findByCssSelector('.md-datepicker-button');
    });
}
exports.datepickerButton = datepickerButton;
/**
 * Returns the first selector drop down
 */
function selectorDropDown(remote) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield remote.findByCssSelector('.md-select-value');
    });
}
exports.selectorDropDown = selectorDropDown;
/**
 * Return the element containing the dateInput
 */
function dateInput(remote) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield remote.findByCssSelector('.md-datepicker-input');
    });
}
exports.dateInput = dateInput;
function minNumberInput(remote) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield remote.findByCssSelector('.rv-min');
    });
}
exports.minNumberInput = minNumberInput;
function maxNumberInput(remote) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield remote.findByCssSelector('.rv-max');
    });
}
exports.maxNumberInput = maxNumberInput;
/**
 * Returns the first details button
 */
function detailsButton(remote) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield remote.findByCssSelector('.enhanced-table-details');
    });
}
exports.detailsButton = detailsButton;
/**
 * Returns the first zoom button
 */
function zoomButton(remote) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield remote.findByCssSelector('.enhanced-table-zoom');
    });
}
exports.zoomButton = zoomButton;
/**
 * Returns the panel element the table is in.
 */
function panel(remote) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield remote.findByCssSelector('#enhancedTable');
    });
}
exports.panel = panel;
/**
 * Return move left button for the first column
 */
function firstColumnLeftButton(remote) {
    return __awaiter(this, void 0, void 0, function* () {
        const cols = yield remote.findAllByCssSelector('.move-left');
        return cols[0];
    });
}
exports.firstColumnLeftButton = firstColumnLeftButton;
/**
 * Return move right button for the last column
 */
function lastColumnRightButton(remote) {
    return __awaiter(this, void 0, void 0, function* () {
        let list = yield remote.findAllByCssSelector('.move-right');
        return list[list.length - 1];
    });
}
exports.lastColumnRightButton = lastColumnRightButton;
/**
 * Return a move column button that isn't disabled
 */
function nonDisabledMoveButton(remote) {
    return __awaiter(this, void 0, void 0, function* () {
        const btn = yield remote.findAllByCssSelector('.move-left:not(:disabled)');
        return btn[1];
    });
}
exports.nonDisabledMoveButton = nonDisabledMoveButton;
