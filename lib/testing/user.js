"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("./config/url");
var apiConnect_1 = require("./apiConnect");
var idWU_1 = require("./manager/idWU");
var environnement_1 = require("./manager/environnement");
var apireturn_1 = require("./apireturn");
var User = /** @class */ (function () {
    /**
     *Creates an instance of User. with only the username and a password for the connections
     * @param {string} [username] name of the user
     * @param {string} [password] password of the user
     * @memberof User
     */
    function User(username, password) {
        /** Send to APi **/
        this._username = 'hello';
        this._password = 'hello';
        /** Connexion **/
        this._conn = new apiConnect_1.connexion();
        this._expired = 3600;
        /** List **/
        this._themeAcc = [];
        this._envAcc = [];
        this._workinType = [];
        this._username = username;
        this._password = password;
    }
    /**
     *Contruct an url with the environnement selected and the url for the action
     * @param {string} url url of the action
     * @param {string} [adding] add the theme or id at the end (optional)
     * @returns {string}
     * @memberof User
     */
    User.prototype.constructUrl = function (url, adding) {
        if (adding === void 0) { adding = ''; }
        return /*this._urlEnvselected*/ url + adding;
    };
    /**
     * With the connexion to the APi send a json file with the username and the password in the header to get
     * the token for the rest of the connexion.
     * @returns {*} the data from the API. we dont know the return of the API so ANY.
     * @memberof User
     */
    User.prototype.submitForm = function () {
        //To Change
        //create a json and save the file in the download folder 
        var json = '';
        var header = this.getInformationToHeader();
        var data = this._conn.connexionAPILogin(this.constructUrl(url_1.urlLoginGet), header);
        //Getting the list of environnement and their URL
        this.setListEnv(this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(url_1.urlEnvList), 'Get'));
        //alert(data.access_token);
        if (!data.code) {
            this.setDataFromAPI(data.access_token, data.token_type, data.expired, data.scope, data.theme, data.equipe);
        }
        else {
            alert(data.code);
        }
        return data;
    };
    ;
    /**
     * Create the list of environnement and their url and place the PRO environnment in first
     * @param {*} output its the data from API.
     * @memberof User
     */
    User.prototype.setListEnv = function (output) {
        for (var i in output) {
            if (output[i].env === 'PRO') {
                this._envAcc.push(new environnement_1.Environnement(output[i].env, output[i].url));
                break;
            }
        }
        for (var i in output) {
            if (output[i].env != 'PRO') {
                this._envAcc.push(new environnement_1.Environnement(output[i].env, output[i].url));
            }
        }
    };
    /**
     * Set the environnement url to a properties with the environnement selected
     * @param {string} env the environnement selected by the user
     * @memberof User
     */
    User.prototype.setEnvironnementSelected = function (env) {
        for (var i in this._envAcc) {
            if (this._envAcc[i]._env === env) {
                this._urlEnvselected = this._envAcc[i]._urlEnv;
                //alert(this._urlEnvselected);
                break;
            }
        }
    };
    /**
     * put the information of the user in a header for the first connexion to the API
     * @returns {*}
     * @memberof User
     */
    User.prototype.getInformationToHeader = function () {
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
    /**
     * sett all the info information obtain form a login into the properties of the class
     *
     * @param {string} token
     * @param {string} token_type
     * @param {number} expired
     * @param {string[]} scope
     * @param {string[]} theme
     * @param {string} equipe
     * @memberof User
     */
    User.prototype.setDataFromAPI = function (token, token_type, expired, scope, theme, equipe) {
        this._token = token;
        this._tokentype = token_type;
        this._expired = expired;
        this._rightRead = scope[0];
        this._rightWrite = scope[1];
        this._equipe = equipe;
        //alert(this._rightRead + " " + this._rightWrite);
        for (var i in theme) {
            this._themeAcc.push(new apireturn_1.Apireturn(theme[i]));
            this.getinfoForCode(theme[i], i);
        }
    };
    /**
     * Get all the information of a code into the properties _themeAcc
     * @param {string} theme the code of the theme to get all of his info
     * @param {string} rank the rankl of the list _themeAcc
     * @memberof User
     */
    User.prototype.getinfoForCode = function (theme, rank) {
        var json = '';
        var data;
        data = this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(url_1.urlGetCode, theme), 'Get');
        this._themeAcc[rank].setRemaining(data.id_liste_code, data.nom, data.desc_en, data.desc_fr);
    };
    //build the list of working unit 
    /**
     * build the object for the working unit id and setting the theme in front for the mocking
     * and set a list for the dropdown list int the forms.
     * @param {string} theme the theme selected by the user
     * @returns return a list of working unit id with a name and a value for a dropdownlist
     * @memberof User
     */
    User.prototype.setidUTtheme = function (theme) {
        //json file
        var json = "";
        //set the new url and get the connection 
        var output = this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(url_1.urlgetidWu + theme), 'Get');
        this._idUt = new idWU_1.idWu(theme, output.value);
        //À enlever Mocking Only
        for (var j in this._idUt._wUnit) {
            this._idUt._wUnit[j] = this._idUt._theme + ' - ' + this._idUt._wUnit[j];
        }
        var list = [];
        for (var j in this._idUt._wUnit) {
            list.push({ name: this._idUt._wUnit[j], value: this._idUt._wUnit[j] });
        }
        return list;
    };
    //build a list of workingtype
    /**
     * build the list for the working type and
     * and set a list for the dropdown list int the forms.
     * @param {string} theme the theme selected by the user
     * @returns return a list of working type name with a name and a value for a dropdownlist
     * @memberof User
     */
    User.prototype.setworkingtype = function (theme) {
        //json file
        var json = "";
        //set the new url and get the connection
        var output = this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(url_1.urlWorkingType + theme), 'Get');
        for (var j in output) {
            this._workinType.push(new apireturn_1.Apireturn(output[j].id));
            this._workinType[j].setRemaining(output[j].id_list_code, output[j].nom, output[j].desc_en, output[j].desc_fr);
        }
        var list = [];
        for (var j in this._workinType) {
            list.push({ name: this._workinType[j]._nom, value: this._workinType[j]._id });
        }
        return list;
    };
    /**
     * create a json file for getting a list of classes
     * mostly hardcoded.
     * @param {string} theme the theme selected by the user
     * @returns {string} return a raw json
     * @memberof User
     */
    User.prototype.createJsonRessources = function (theme /*, path:string */) {
        var output = {
            "fichiers": theme,
            "chemin_recherche": [
                "ressources/liste_classes"
            ]
        };
        var json = JSON.stringify(output);
        return json;
    };
    /**
     * the call to get the classes needed from the API
     * @param {string} theme the theme selected by the user
     * @memberof User
     */
    User.prototype.getlistofclasses = function (theme /*,path:string*/) {
        var listS = [];
        theme = theme + ':ress.json';
        var json = this.createJsonRessources(theme /*,path */);
        var data = this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(url_1.urlClassesList), 'GET');
        this._classeslist = data.value.liste_classe;
        for (var i in this._classeslist) {
            listS.push({ name: this._classeslist[i], wanted: false });
        }
        return listS;
    };
    //accessor
    /*Username */
    User.prototype.getusername = function () {
        return this._username;
    };
    User.prototype.setusername = function (value) {
        this._username = value;
    };
    /*Password */
    User.prototype.getpassword = function () {
        return this._password;
    };
    User.prototype.setpassword = function (value) {
        this._password = value;
    };
    /*Conn */
    User.prototype.getconn = function () {
        return this._conn;
    };
    User.prototype.setconn = function (value) {
        this._conn = value;
    };
    /*Token */
    User.prototype.gettoken = function () {
        return this._token;
    };
    User.prototype.settoken = function (value) {
        this._token = value;
    };
    /*Tokentype */
    User.prototype.gettokentype = function () {
        return this._tokentype;
    };
    User.prototype.settokentype = function (value) {
        this._tokentype = value;
    };
    /*Expired */
    User.prototype.getexpired = function () {
        return this._expired;
    };
    User.prototype.setexpired = function (value) {
        this._expired = value;
    };
    /* RightRead*/
    User.prototype.getrightRead = function () {
        return this._rightRead;
    };
    User.prototype.setrightRead = function (value) {
        this._rightRead = value;
    };
    /*RightWrite */
    User.prototype.getrightWrite = function () {
        return this._rightWrite;
    };
    User.prototype.setrightWrite = function (value) {
        this._rightWrite = value;
    };
    //List de theme
    User.prototype.getthemeAcc = function () {
        return this._themeAcc[0]._nom;
    };
    User.prototype.setthemeAcc = function (value) {
        this._themeAcc[0]._nom = value;
    };
    //liste d' environnement
    User.prototype.getenvAcc = function () {
        return this._envAcc;
    };
    User.prototype.setenvAcc = function (value) {
        this._envAcc = value;
    };
    return User;
}());
exports.User = User;
