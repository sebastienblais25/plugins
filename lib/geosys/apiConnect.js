"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connexion = /** @class */ (function () {
    function connexion() {
    }
    /**
     *the connexion to the Api for the login
     * @param {string} urlgoto the url for the login
     * @param {*} header the header with the username and the password
     * @returns {*} return the infromation of the user
     * @memberof connexion
     */
    connexion.prototype.connexionAPILogin = function (urlgoto, header) {
        var outputValue;
        //console.log("hello");
        /********* API CALL Login **********/
        //no promise still
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: /*'http://132.156.9.78:8080/geosys-api/v1/securite/login',*/ urlgoto,
                headers: {
                    header: header
                },
                type: 'GET',
                async: false,
                //cache:false,
                //data:json,
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
        //alert(outputValue)
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
    connexion.prototype.connexionAPI = function (token, jsonstring, urlgoto, typeConn, optEnv) {
        if (optEnv === void 0) { optEnv = ''; }
        var outputValue;
        /********* API CALL **********/
        //no promise still
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: urlgoto,
                headers: {
                    'Authorization': "Bearer " + token,
                    'contentType': 'application/json',
                    optEnv: optEnv
                },
                type: typeConn,
                async: false,
                //cache:false,
                //contentType: "application/json; charset=utf-8",
                data: jsonstring,
                dataType: 'json',
                processData: false,
                success: //data => resolve()
                function (response, jqXHR) {
                    if (response == undefined) {
                        outputValue = 'success';
                    }
                    else {
                        if (response.message != undefined) {
                            outputValue = jqXHR;
                        }
                        else {
                            //alert(response + ' 2')
                            outputValue = response;
                        }
                    }
                },
                error: function (xhr) {
                    //alert(xhr.statusText);
                    outputValue = xhr;
                    //console.log($('#recommandation').val());
                }
            });
        }));
        Promise.all(promises).then(function (values) {
            console.log(values);
        });
        //alert(outputValue + ' 123')
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
    connexion.prototype.connexionAPIFormData = function (token, formdata, urlgoto, typeConn, optEnv) {
        if (optEnv === void 0) { optEnv = ''; }
        var outputValue;
        /********* API CALL **********/
        //no promise still
        /*let cors = require('cors')
     
         app.use(cors())*/
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: 'http://132.156.9.78:8080/geosys-api/v1/geodata/toto',
                headers: {
                    'Authorization': "Bearer " + token,
                    optEnv: optEnv
                },
                type: 'POST',
                async: false,
                data: formdata,
                cache: false,
                contentType: false,
                processData: false,
                success: //data => resolve()
                function (response, jqXHR) {
                    if (response.message != undefined) {
                        //alert(response.message + ' 123')
                        outputValue = jqXHR;
                    }
                    else {
                        //alert(response + ' 2')
                        outputValue = response;
                    }
                },
                error: function (xhr) {
                    alert(xhr.statusText);
                    outputValue = xhr;
                    //console.log($('#recommandation').val());
                }
            });
        }));
        Promise.all(promises).then(function (values) {
            console.log(values);
        });
        return outputValue;
    };
    ;
    connexion.prototype.connexionAPIFileMAnager = function (token, urltogo) {
        var outputValue;
        /********* API CALL **********/
        //no promise still
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: urltogo,
                headers: {
                    'Authorization': "Bearer " + token,
                    'contentType': 'application/json'
                },
                type: 'Get',
                async: false,
                //cache:false,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                processData: false,
                success: //data => resolve()
                function (response, jqXHR) {
                    //console.log(response)
                    outputValue = response;
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
    connexion.prototype.connexionAPIFileDownloadDelete = function (token, urltogo, operatio, content) {
        var outputValue;
        /********* API CALL **********/
        //no promise still
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: urltogo,
                headers: {
                    'Authorization': "Bearer " + token,
                    'contentType': content
                },
                type: operatio,
                async: false,
                //cache:false,
                //contentType: "application/json; charset=utf-8",
                //dataType:'json',
                processData: false,
                success: //data => resolve()
                function (response, jqXHR) {
                    if (response == undefined) {
                        outputValue = 'success';
                    }
                    else {
                        if (response.message != undefined) {
                            outputValue = jqXHR;
                        }
                        else {
                            //alert(response + ' 2')
                            outputValue = response;
                        }
                    }
                },
                error: function (xhr) {
                    //alert(xhr.statusText);
                    outputValue = xhr;
                    //console.log($('#recommandation').val());
                }
            });
        }));
        Promise.all(promises).then(function (values) {
            console.log(values);
        });
        //alert(outputValue + ' 123')
        return outputValue;
    };
    connexion.prototype.connexionAPIFileUplaod = function (token, urltogo, file) {
        var outputValue;
        /********* API CALL **********/
        //no promise still
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: urltogo,
                headers: {
                    'Authorization': "Bearer " + token,
                    'contentType': 'application/json'
                },
                type: 'POST',
                async: false,
                //cache:false,
                //contentType: "application/json; charset=utf-8",
                dataType: 'application/octet-stream',
                data: file,
                processData: false,
                success: //data => resolve()
                function (response, jqXHR) {
                    if (response == undefined) {
                        outputValue = 'success';
                    }
                    else {
                        if (response.message != undefined) {
                            outputValue = jqXHR;
                        }
                        else {
                            //alert(response + ' 2')
                            outputValue = response;
                        }
                    }
                },
                error: function (xhr) {
                    //alert(xhr.statusText);
                    outputValue = xhr;
                    //console.log($('#recommandation').val());
                }
            });
        }));
        Promise.all(promises).then(function (values) {
            console.log(values);
        });
        //alert(outputValue + ' 123')
        return outputValue;
    };
    return connexion;
}());
exports.connexion = connexion;
