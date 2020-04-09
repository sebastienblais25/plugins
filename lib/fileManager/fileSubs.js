"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var FileSubs = /** @class */ (function () {
    function FileSubs() {
        this._filemanager = new rxjs_1.Subject();
    }
    // observable function
    FileSubs.prototype.subsDrawPoint = function (file) {
        this._filemanager.next(file);
    };
    return FileSubs;
}());
exports.FileSubs = FileSubs;
