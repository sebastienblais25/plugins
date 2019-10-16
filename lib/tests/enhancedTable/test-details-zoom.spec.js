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
describe('the enhancedTable rows', () => {
    let browser;
    before(function ({ remote }) {
        return __awaiter(this, void 0, void 0, function* () {
            browser = remote;
            yield remote.get('http://localhost:6001/enhancedTable/samples/et-test.html');
            yield Page.open(browser);
        });
    });
    it('should have a details button', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const btn = yield Page.detailsButton(browser);
            expect(yield btn.isEnabled()).to.be.true;
        });
    });
    it('should have a zoom button', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const btn = yield Page.zoomButton(browser);
            expect(yield btn.isEnabled()).to.be.true;
        });
    });
});
