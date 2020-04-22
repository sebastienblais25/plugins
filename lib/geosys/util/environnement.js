"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Environnement = /** @class */ (function () {
    function Environnement(env, urlEnv) {
        this._env = env;
        this._urlEnv = urlEnv;
    }
    Environnement.prototype.getenv = function () {
        return this._env;
    };
    Environnement.prototype.setenv = function (value) {
        this._env = value;
    };
    Environnement.prototype.geturlEnv_1 = function () {
        return this._urlEnv;
    };
    Environnement.prototype.seturlEnv_1 = function (value) {
        this._urlEnv = value;
    };
    return Environnement;
}());
exports.Environnement = Environnement;
;
