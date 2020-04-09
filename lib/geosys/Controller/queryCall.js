"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apiConnect_1 = require("../apiConnect");
var url_1 = require("../config/url");
var QueryCall = /** @class */ (function () {
    function QueryCall() {
        this._conn = new apiConnect_1.Connexion();
    }
    QueryCall.prototype.submitquery = function (log) {
        var json = '';
        this._conn.connexionAPI(log.getToken(), json, log.constructUrl(url_1.urlQuery), 'Get');
    };
    /***** Accessor ******/
    QueryCall.prototype.getConn = function () {
        return this._conn;
    };
    QueryCall.prototype.setConn = function (value) {
        this._conn = value;
    };
    return QueryCall;
}());
exports.QueryCall = QueryCall;
