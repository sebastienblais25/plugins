"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connexion = /** @class */ (function () {
    function connexion() {
    }
    /**
     * connection to the Api with ajax and promises
     * @param {string} token the token for the connection
     * @param {*} jsonstring the body in json
     * @param {string} urlgoto the url to jion the API
     * @param {string} typeConn the type of connection Get, Post, put ...
     * @returns {*} return all the information we get from the Api
     * @memberof connexion
     */
    connexion.prototype.connexionAPI = function (token, jsonstring, urlgoto, typeConn) {
        var outputValue;
        /********* API CALL **********/
        //no promise still
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: urlgoto,
                headers: {
                    'Authorization': "Bearer " + token,
                    'contentType': 'application/json'
                },
                type: typeConn,
                async: false,
                //cache:false,
                contentType: "application/json; charset=utf-8",
                data: jsonstring,
                dataType: 'json',
                processData: false,
                success: //data => resolve()
                function (response, jqXHR) {
                    if (response == undefined) {
                        outputValue = 'success';
                        alert('delete');
                    }
                    else {
                        if (response.message != undefined) {
                            alert('Planning and extract');
                            outputValue = jqXHR;
                        }
                        else {
                            //alert(response + ' 2')
                            outputValue = response;
                        }
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
        //alert(outputValue + ' 123')
        return outputValue;
    };
    ;
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
                url: urlgoto,
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
                    console.log(outputValue);
                },
                error: function (xhr) {
                    alert(xhr.statusText);
                    outputValue = xhr;
                }
            });
            /*.done(function(data){
                console.log('success', data)
                outputValue = data;
            })
            .fail(function(xhr){
                console.log('error',xhr)
            });*/
        }));
        Promise.all(promises).then(function (values) {
            console.log(values);
        });
        //alert(outputValue)
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
    connexion.prototype.connexionAPIFormData = function (token, formdata, urlgoto, typeConn) {
        var outputValue;
        /********* API CALL **********/
        //no promise still
        var promises = [];
        promises.push(new Promise(function (resolve) {
            $.ajax({
                url: urlgoto,
                headers: {
                    'Authorization': "Bearer " + token,
                },
                type: typeConn,
                async: false,
                //cache:false,
                mimeType: "multipart/form-data",
                contentType: false,
                data: formdata,
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
            /*.done(function(data){
                console.log('success', data)
                outputValue = data;
            })
            .fail(function(xhr){
                console.log('error',xhr)
            });*/
        }));
        Promise.all(promises).then(function (values) {
            console.log(values);
        });
        return outputValue;
    };
    ;
    return connexion;
}());
exports.connexion = connexion;
