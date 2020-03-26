"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("./config/url");
var apiConnect_1 = require("./apiConnect");
var idWU_1 = require("./manager/idWU");
var environnement_1 = require("./manager/environnement");
var ApiReturn_1 = require("./ApiReturn");
var User = /** @class */ (function () {
    /**
     *Creates an instance of User. with only the username and a password for the connections
     * @param {string} [username] name of the user
     * @param {string} [password] password of the user
     * @memberof User
     */
    function User(username, password) {
        /** Connexion **/
        this._conn = new apiConnect_1.connexion();
        this._expired = 3600;
        /** List **/
        this._themeAcc = [];
        this._envAcc = [];
        this._workinType = [];
        this._advanced = false;
        this._closeable = true;
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
        return /*this._urlEnvselected*/ 'http://127.0.0.1:4010/' + url + adding;
    };
    /**
     * With the connexion to the APi send a json file with the username and the password in the header to get
     * the token for the rest of the connexion.
     * @returns {*} the data from the API. we dont know the return of the API so ANY.
     * @memberof User
     */
    User.prototype.submitForm = function (config) {
        //To Change
        //create a json and save the file in the download folder 
        var json = '';
        var header = this.getInformationToHeader();
        var data = this._conn.connexionAPILogin(this.constructUrl(url_1.urlLoginGet), header);
        //Getting the list of environnement and their URL
        this.setListEnv(this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(url_1.urlEnvList), 'Get'));
        //alert(data.access_token);
        if (!data.code) {
            this.setDataFromAPI(data.access_token, data.token_type, data.expired, data.scope, data.theme, data.equipe, config);
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
    /**
     * sett all the info information obtain form a login into the properties of the class
     * @param {string} token
     * @param {string} token_type
     * @param {number} expired
     * @param {string[]} scope
     * @param {string[]} theme
     * @param {string} equipe
     * @memberof User
     */
    User.prototype.setDataFromAPI = function (token, token_type, expired, scope, theme, equipe, config) {
        this._token = token;
        this._tokentype = token_type;
        this._expired = expired;
        this._rightRead = new ApiReturn_1.ApiReturn(scope[0]);
        this._rightWrite = new ApiReturn_1.ApiReturn(scope[1]);
        this._equipe = new ApiReturn_1.ApiReturn(equipe);
        this._basetheme = config.base_theme;
        //alert(this._rightRead + " " + this._rightWrite);
        var ordertheme = this.orderThemeList(theme, config);
        for (var i in ordertheme) {
            this._themeAcc.push(new ApiReturn_1.ApiReturn(ordertheme[i]));
            this.getinfoForCode(ordertheme[i], i);
        }
        this.callAPIWorkingUnit(this._basetheme);
        this.callAPIListeClasse(this._basetheme);
        this.callAPIWorkingType(this._basetheme);
    };
    /**
     * call Api for a list of working unit
     * @param {string} theme the theme related to the working unit
     * @memberof User
     */
    User.prototype.callAPIWorkingUnit = function (theme) {
        var json = '';
        var output = this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(url_1.urlgetidWu + theme), 'Get');
        this._idUt = new idWU_1.idWu(theme, output.value);
        //À enlever Mocking Only
        for (var j in this._idUt._wUnit) {
            this._idUt._wUnit[j] = this._idUt._theme + ' - ' + this._idUt._wUnit[j];
        }
    };
    /**
     * call the API for a list of classes
     * @param {string} theme the theme related to the list of classes
     * @memberof User
     */
    User.prototype.callAPIListeClasse = function (theme) {
        var resstheme = theme + ':ress.json';
        var ressjson = this.createJsonRessources(resstheme /*,path */);
        var data = this._conn.connexionAPI(this.gettoken(), ressjson, this.constructUrl(url_1.urlClassesList), 'Get');
        this._classeslist = data.value.liste_classe;
    };
    /**
     * call the API for a list of working type
     * @param {string} theme the theme related to the working type
     * @memberof User
     */
    User.prototype.callAPIWorkingType = function (theme) {
        var json = '';
        var ttoutput = this._conn.connexionAPI(this.gettoken(), json, this.constructUrl(url_1.urlWorkingType + theme), 'Get');
        this._workinType = [];
        for (var j in ttoutput) {
            this._workinType.push(new ApiReturn_1.ApiReturn(ttoutput[j].id));
            this._workinType[j].setRemaining(ttoutput[j].id_list_code, ttoutput[j].nom, ttoutput[j].desc_en, ttoutput[j].desc_fr);
        }
    };
    /**
     * ordering the list to set the base theme in first place
     * @param {string[]} theme list of theme
     * @param {*} config the base theme
     * @returns
     * @memberof User
     */
    User.prototype.orderThemeList = function (theme, config) {
        var newtheme = [];
        for (var i in theme) {
            if (theme[i] === config.base_theme) {
                newtheme.push(theme[i]);
                break;
            }
        }
        for (var i in theme) {
            if (theme[i] != config.base_theme) {
                newtheme.push(theme[i]);
            }
        }
        return newtheme;
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
        //set outside of this function
        this._themeAcc[rank].setRemaining(data.id_liste_code, data.nom, data.desc_en, data.desc_fr);
    };
    /**
     * build the object for the working unit id and setting the theme in front for the mocking
     * and set a list for the dropdown list int the forms.
     * @param {string} theme the theme selected by the user
     * @returns return a list of working unit id with a name and a value for a dropdownlist
     * @memberof User
     */
    User.prototype.setidUTtheme = function (theme) {
        //set the new url and get the connection
        if (theme.toString() != this._basetheme.toString()) {
            this.callAPIWorkingUnit(theme);
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
        //set the new url and get the connection
        if (theme != this._basetheme) {
            this.callAPIWorkingType(theme);
        }
        var list = [];
        for (var j in this._workinType) {
            list.push({ name: this._workinType[j]._nom, value: this._workinType[j]._id });
        }
        return list;
    };
    /**************** Reading Ressources files *********************/
    /**
     * create a json file for getting a list of classes
     * mostly hardcoded.
     * @param {string} theme the theme selected by the user
     * @returns {string} return a raw json
     * @memberof User
     */
    User.prototype.createJsonRessources = function (theme /*, path:string */) {
        var output = {
            "fichiers": [
                "hydro_50k:ress_hydro.json",
                "general:ress.json"
            ],
            "chemin_recherche": [
                "ressources/liste_classes"
            ]
        }; /*{
          "fichiers" : [theme],
          "chemin_recherche":[
              "ressources/liste_classes"
          ]
      };*/
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
        if (theme != this._basetheme) {
            this.callAPIListeClasse(theme);
        }
        for (var i in this._classeslist) {
            listS.push({ name: this._classeslist[i], wanted: false });
        }
        return listS;
    };
    /************************* For Geometry ******************************/
    /**
     * Work around for a follow-up duplicates
     * @param {*} coord coordinates with a follow-up duplicates
     * @returns {*} reyurn the coordinates with no folow-up duplicates
     * @memberof User
     */
    User.prototype.eliminateFollowUpDuplicate = function (coord) {
        //create a list to push the non-duplicates
        var nodupes = [];
        //search the array
        for (var i in coord[0]) {
            var j = +i;
            //check the postion is not 0(for no previous)
            if (j != 0) {
                //check if not duplicates with the previous one
                if (coord[0][i][0] !== coord[0][j - 1][0] && coord[0][i][1] !== coord[0][j - 1][1]) {
                    //push in the non-duplicates array
                    nodupes.push(coord[0][i]);
                }
            }
            else {
                //always push the first into the non-duplicates array
                nodupes.push(coord[0][i]);
            }
        }
        var newCoord = [nodupes];
        return newCoord;
    };
    /**
     *Create a geojson for a drawing geometry or the imported geometry
     * @memberof planifier
     */
    User.prototype.createGeoJson = function (crs, coord) {
        coord = this.eliminateFollowUpDuplicate(coord);
        var geojson = {
            "type": 'Polygon',
            "crs": {
                "type": "name",
                "properties": {
                    "name": crs
                }
            },
            "coordinates": coord
        };
        this._geom = JSON.stringify(geojson);
    };
    /**
     * Create a layer in the viewer to add a polygon in viewer
     * @param {string} mapId the map ID of the viewer
     * @param {*} values the coordinates of the drawing
     * @memberof User
     */
    User.prototype.createPolygons = function (mapId, values) {
        //create a constant to get the map in the viewer
        var myMap = window.RAMP.mapById(mapId);
        //create a layer in the map in the viewer
        window.RAMP.mapById(mapId).layersObj.addLayer('shpUpload');
        //create a polygons with all the coordinates(the coordinates needs to be in lat/lon)
        var poly1 = new window.RAMP.GEO.Polygon(0, values);
        //create a multipolygon with an id
        var polyAll = new window.RAMP.GEO.MultiPolygon("location" + Math.round(Math.random() * 100000), [poly1], { outlineColor: [55, 50, 200], outlineWidth: 3 });
        // add the multipolygon to the graphic layer
        var shpUpload = myMap.layers.getLayersById('shpUpload')[0];
        //add the geometry in the layer created
        shpUpload.addGeometry([polyAll]);
        //zoom to extent of polygon(s)
        this.zoomExtent(mapId, values, 2);
        //console.log(shpUpload)
    };
    /**
     * zoom in the polygon in the viewer
     * @param {string} mapId the id of the map in the viewer
     * @param {[]} coords the coordinates of the polygon
     * @param {number} [expand=1] the zoom
     * @memberof User
     */
    User.prototype.zoomExtent = function (mapId, coords, expand) {
        if (expand === void 0) { expand = 1; }
        var myMap = window.RAMP.mapById(mapId);
        var ramp = window.RAMP;
        var x = [];
        var y = [];
        //set coordinates of the polygons
        coords.forEach(function (item) {
            x.push(item[0]);
            y.push(item[1]);
        });
        //set the coordinates for the windows
        var ext = ramp.GAPI.proj.projectEsriExtent({
            'xmin': Math.min.apply(Math, x), 'ymin': Math.min.apply(Math, y), 'xmax': Math.max.apply(Math, x), 'ymax': Math.max.apply(Math, y),
            'spatialReference': { 'wkid': 4326 }
        }, myMap.esriMap.spatialReference);
        //the zoom on the polygon
        myMap.setExtent(ext.expand(expand));
    };
    /*************** Accessors ***********************/
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
        return this._rightRead._nom;
    };
    User.prototype.setrightRead = function (value) {
        this._rightRead._nom = value;
    };
    /*RightWrite */
    User.prototype.getrightWrite = function () {
        return this._rightWrite._nom;
    };
    User.prototype.setrightWrite = function (value) {
        this._rightWrite._nom = value;
    };
    //List de theme
    User.prototype.getthemeAcc = function () {
        return this._themeAcc;
    };
    User.prototype.getAllThemeNAme = function () {
        var output;
        output = this.getthemeAcc()[0]._nom;
        for (var i in this.getthemeAcc()) {
            if (i != '0')
                output += '<div>' + this.getthemeAcc()[i]._nom + '</div>';
        }
        return output;
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
