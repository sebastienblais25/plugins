"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("./url");
var apiConnect_1 = require("./apiConnect");
var login = /** @class */ (function () {
    function login(username, password) {
        this._username = 'hello';
        this._password = 'hello';
        this._conn = new apiConnect_1.connexion();
        this._expired = 3600;
        this._username = username;
        this._password = password;
    }
    //submit the from to the API
    login.prototype.submitForm = function () {
        //To Change
        //create a json and save the file in the download folder 
        var header = this.getInformationToHeader();
        var data = this._conn.connexionAPILogin(url_1.urlLoginGet, header);
        alert(data.access_token);
        if (!data.code) {
            this._token = data.access_token;
            this._tokentype = data.token_type;
            this._expired = data.expired;
        }
        else {
            alert(data.code);
        }
        return data;
    };
    ;
    //get the infromation out of the form into a string json
    login.prototype.getInformationToHeader = function () {
        //get de properties
        var output = {
            "username": this._username,
            "password": this._password,
            "duree_token": this._expired
        };
        //let json:any = JSON.stringify(output)
        return output;
    };
    return login;
}());
exports.login = login;
