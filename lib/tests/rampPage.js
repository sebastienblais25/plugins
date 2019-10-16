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
function legendLayer() {
    return function () {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.parent.findByCssSelector('rv-legend-control > button');
        });
    };
}
exports.legendLayer = legendLayer;
function toggleButton() {
    return function () {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.parent.findByCssSelector('.data-test-toggle-button');
        });
    };
}
exports.toggleButton = toggleButton;
function expandSymbologyStackButton() {
    return function () {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.parent.findByCssSelector('.rv-symbol-trigger');
        });
    };
}
exports.expandSymbologyStackButton = expandSymbologyStackButton;
function toggleSymbologyButton() {
    return function () {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.parent.findByCssSelector('.data-test-symbol-toggle-button');
        });
    };
}
exports.toggleSymbologyButton = toggleSymbologyButton;
