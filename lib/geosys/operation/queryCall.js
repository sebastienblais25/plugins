"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apiConnect_1 = require("../apiConnect");
var url_1 = require("../config/url");
var QueryCall = /** @class */ (function () {
    function QueryCall() {
        this._conn = new apiConnect_1.Connexion();
    }
    /**
     * Send the query top the API
     * @param {User} log
     * @param {string} format
     * @param {Boolean} simply
     * @memberof QueryCall
     */
    QueryCall.prototype.submitquery = function (log, format, simply) {
        return this._conn.connexionAPI(log.getToken(), this._json, /*"http://127.0.0.1:8080/geosys-api/v1/suivi-prod/requete-bd?output_format=geojson&simplifier=True"*/ log.constructUrl(url_1.urlQuery, '?output_format=' + format + '&simplifier=' + simply), 'Post');
    };
    /**
     * Construct the json for the query
     * @param {string} query
     * @memberof QueryCall
     */
    QueryCall.prototype.constructJson = function (query) {
        this._json = {
            'sql': query
        };
        this._json = JSON.stringify(this._json);
    };
    /***** Accessor ******/
    QueryCall.prototype.getConn = function () {
        return this._conn;
    };
    QueryCall.prototype.setConn = function (value) {
        this._conn = value;
    };
    QueryCall.prototype.getjson = function () {
        return this._json;
    };
    QueryCall.prototype.setjson = function (value) {
        this._json = value;
    };
    return QueryCall;
}());
exports.QueryCall = QueryCall;
