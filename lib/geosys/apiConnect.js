"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Connexion = /** @class */ (function () {
    function Connexion() {
    }
    /**
     * The connexion to the Api for the login
     * @param {string} urlgoto The url for the login
     * @param {*} header The header with the username and the password
     * @returns {*} Return the infromation of the user
     * @memberof connexion
     */
    Connexion.prototype.connexionAPILogin = function (urlgoto, username, password) {
        var outputValue;
        /********* API CALL Login **********/
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: urlgoto,
                headers: {
                    'usager': username,
                    'mot_de_passe': password,
                    'duree_token': '8000'
                },
                type: 'GET',
                async: false,
                dataType: 'json',
                success: //data => resolve()
                function (response) {
                    outputValue = response;
                    //console.log(outputValue);
                },
                error: function (xhr) {
                    alert(xhr.statusText);
                    outputValue = xhr;
                }
            });
        }));
        Promise.all(promises).then(function (values) {
            console.log(values);
        });
        return outputValue;
    };
    ;
    /**
     * connection to the Api with ajax and promises
     * @param {string} token the token for the connection
     * @param {*} jsonstring the body in json
     * @param {string} urlgoto the url to jion the API
     * @param {string} typeConn the type of connection Get, Post, put ...
     * @returns {*} return all the information we get from the Api
     * @memberof connexion
     */
    Connexion.prototype.connexionAPI = function (token, jsonString, urlgoto, typeConn, optEnv) {
        if (optEnv === void 0) { optEnv = ''; }
        var outputValue;
        /********* API CALL **********/
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: urlgoto,
                headers: {
                    'Authorization': "Bearer " + token,
                    'content-Type': 'application/json',
                    optEnv: optEnv
                },
                type: typeConn,
                async: false,
                data: jsonString,
                dataType: 'json',
                processData: false,
                success: //data => resolve()
                function (response, jqXHR) {
                    if (response === undefined) {
                        outputValue = 'success';
                    }
                    else {
                        if (response.message !== undefined) {
                            outputValue = jqXHR;
                        }
                        else {
                            outputValue = response;
                        }
                    }
                },
                error: function (response, xhr) {
                    console.log(response.responseJSON.message);
                    outputValue = xhr;
                }
            });
        }));
        Promise.all(promises).then(function (values) {
            console.log(values);
        });
        return outputValue;
    };
    ;
    /**
      * connection to the Api with ajax and promises for files
      * @param {string} token the token for the connection
      * @param {*} jsonstring the body in formdata (File)
      * @param {string} urlgoto the url to join the API
      * @param {string} typeConn the type of connection Get, Post, put ...
      * @returns {*} return all the information we get from the Api
     * @memberof connexion
     */
    Connexion.prototype.connexionAPIFormData = function (token, formdata, urlgoto, typeConn, optEnv) {
        if (optEnv === void 0) { optEnv = ''; }
        var outputValue;
        /********* API CALL **********/
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: urlgoto,
                headers: {
                    'Authorization': "Bearer " + token,
                    optEnv: optEnv
                },
                type: typeConn,
                async: false,
                data: formdata,
                cache: false,
                contentType: false,
                processData: false,
                success: //data => resolve()
                function (response, jqXHR) {
                    if (response.message !== undefined) {
                        outputValue = jqXHR;
                    }
                    else {
                        outputValue = response;
                    }
                },
                error: function (response, xhr) {
                    console.log(response.responseJSON.message);
                    outputValue = xhr;
                }
            });
        }));
        Promise.all(promises).then(function (values) {
            console.log(values);
        });
        return outputValue;
    };
    ;
    return Connexion;
}());
exports.Connexion = Connexion;
