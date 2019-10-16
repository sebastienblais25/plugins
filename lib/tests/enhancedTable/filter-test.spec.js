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
const Page = require("./etPage");
const { describe, it, before } = intern.getPlugin('interface.bdd');
const { expect } = intern.getPlugin('chai');
describe('the enhancedTable filters', () => {
    before(function ({ remote }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield remote.get('http://localhost:6001/enhancedTable/samples/et-test.html');
            yield Page.open(remote);
        });
    });
    it('should have a selector dropdown', function ({ remote }) {
        return __awaiter(this, void 0, void 0, function* () {
            const selector = yield Page.selectorDropDown(remote);
            expect(yield selector.isEnabled()).to.be.true;
        });
    });
    it('should have a number filter with min', function ({ remote }) {
        return __awaiter(this, void 0, void 0, function* () {
            const numSelector = yield Page.minNumberInput(remote);
            expect(yield numSelector.isEnabled()).to.be.true;
        });
    });
    it('should have a number filter with max', function ({ remote }) {
        return __awaiter(this, void 0, void 0, function* () {
            const numSelector = yield Page.maxNumberInput(remote);
            expect(yield numSelector.isEnabled()).to.be.true;
        });
    });
});
