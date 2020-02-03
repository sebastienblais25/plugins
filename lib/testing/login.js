"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("./config/url");
var apiConnect_1 = require("./apiConnect");
var idWU_1 = require("./config/idWU");
var login = /** @class */ (function () {
    //Constructor with only username and pasword for the login
    function login(username, password) {
        /** Send to APi **/
        this._username = 'hello';
        this._password = 'hello';
        this._conn = new apiConnect_1.connexion();
        this._expired = 3600;
        this._envAcc = ['Dev', 'Tst', 'Pro'];
        this._idUt = [];
        this._username = username;
        this._password = password;
    }
    //submit the from to the API
    login.prototype.submitForm = function () {
        //To Change
        //create a json and save the file in the download folder 
        var header = this.getInformationToHeader();
        var data = this._conn.connexionAPILogin(url_1.urlLoginGet, header);
        //alert(data.access_token);
        if (!data.code) {
            this.setDataFromAPI(data.access_token, data.token_type, data.expired, data.scope, data.theme);
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
    login.prototype.setDataFromAPI = function (token, token_type, expired, scope, theme) {
        this._token = token;
        this._tokentype = token_type;
        this._expired = expired;
        this._rightRead = scope[0];
        this._rightWrite = scope[1];
        this._themeAcc = theme;
        //alert(this._rightRead + " " + this._rightWrite);
        this.setidUTtheme();
    };
    //build the list of working unit 
    login.prototype.setidUTtheme = function () {
        var list = this.getthemeAcc();
        var json = "";
        for (var i in list) {
            this._idUt[i] = new idWU_1.idWu(list[i], list);
            var newUrl = url_1.urlgetidWu + list[i];
            var output = this._conn.connexionAPI(this.gettoken(), json, newUrl);
            //console.log(output.value);
            this._idUt[i]._wUnit = output.value;
        }
        for (var i in this._idUt) {
            for (var j in this._idUt[i]._wUnit) {
                this._idUt[i]._wUnit[j] = this._idUt[i]._theme + ' - ' + this._idUt[i]._wUnit[j];
            }
        }
    };
    //Return a list of a theme selected
    login.prototype.getUtravail = function (theme) {
        for (var i in this._idUt) {
            if (this._idUt[i].getTheme() == theme) {
                return this._idUt[0]._wUnit;
            }
        }
        var ret = ['No value'];
        return ret;
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
    //List de theme
    login.prototype.getthemeAcc = function () {
        return this._themeAcc;
    };
    login.prototype.setthemeAcc = function (value) {
        this._themeAcc = value;
    };
    //liste d' environnement
    login.prototype.getenvAcc = function () {
        return this._envAcc;
    };
    login.prototype.setenvAcc = function (value) {
        this._envAcc = value;
    };
    return login;
}());
exports.login = login;
