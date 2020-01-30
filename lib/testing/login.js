"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("./url");
var apiConnect_1 = require("./apiConnect");
var login = /** @class */ (function () {
    //Constructor with only username and pasword for the login
    function login(username, password) {
        /** Send to APi **/
        this._username = 'hello';
        this._password = 'hello';
        this._conn = new apiConnect_1.connexion();
        this._expired = 3600;
        this._envAcc = ['Dev', 'Tst', 'Pro'];
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
            this.setDataFromAPI(data.access_token, data.token_type, data.expired, data.scope);
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
            "usager": this._username,
            "mot_de_passe": this._password,
            "duree_token": this._expired
        };
        //let json:any = JSON.stringify(output)
        return output;
    };
    //Ajoute le reste des données obtenu par le login
    login.prototype.setDataFromAPI = function (token, token_type, expired, scope) {
        this._token = token;
        this._tokentype = token_type;
        this._expired = expired;
        this._rightRead = scope[0];
        this._rightWrite = scope[1];
        alert(this._rightRead + " " + this._rightWrite);
    };
    //accessor
    /*Username */
    login.prototype.getusername = function () {
        return this._username;
    };
    login.prototype.setusername = function (value) {
        this._username = value;
    };
    /*Password */
    login.prototype.getpassword = function () {
        return this._password;
    };
    login.prototype.setpassword = function (value) {
        this._password = value;
    };
    /*Conn */
    login.prototype.getconn = function () {
        return this._conn;
    };
    login.prototype.setconn = function (value) {
        this._conn = value;
    };
    /*Token */
    login.prototype.gettoken = function () {
        return this._token;
    };
    login.prototype.settoken = function (value) {
        this._token = value;
    };
    /*Tokentype */
    login.prototype.gettokentype = function () {
        return this._tokentype;
    };
    login.prototype.settokentype = function (value) {
        this._tokentype = value;
    };
    /*Expired */
    login.prototype.getexpired = function () {
        return this._expired;
    };
    login.prototype.setexpired = function (value) {
        this._expired = value;
    };
    /* RightRead*/
    login.prototype.getrightRead = function () {
        return this._rightRead;
    };
    login.prototype.setrightRead = function (value) {
        this._rightRead = value;
    };
    /*RightWrite */
    login.prototype.getrightWrite = function () {
        return this._rightWrite;
    };
    login.prototype.setrightWrite = function (value) {
        this._rightWrite = value;
    };
    return login;
}());
exports.login = login;
